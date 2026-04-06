import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CreatePropertyModal({ isOpen, onClose, onCreated, property }) {
    const navigate = useNavigate()

    const [title, setTitle] = useState(property?.title || "")
    const [description, setDescription] = useState(property?.description || "")
    const [price, setPrice] = useState(property?.price || "")
    const [city, setCity] = useState(property?.city || "")
    const [operationType, setOperationType] = useState("")
    const [propertyType, setPropertyType] = useState("")
    const [bedrooms, setBedrooms] = useState("")
    const [bathrooms, setBathrooms] = useState("")
    const [area, setArea] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [featured, setFeatured] = useState(false)
    const [cadastralNumber, setCadastralNumber] = useState("")
    const [parcelData, setParcelData] = useState(null)
    const [files, setFiles] = useState([])
    const [existingImages, setExistingImages] = useState([])

    // const API_URL = "http://127.0.0.1:8000";
    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (parcelData) {
            console.log("GEOMETRY:", parcelData.geometry)
        }
    }, [parcelData])


    useEffect(() => {
        if (property) {
            const imgs = property.images?.length
                ? property.images
                : property.image_url
                    ? [property.image_url]
                    : []
            // eliminar duplicados por si acaso
            const uniqueImgs = [...new Set(imgs)]
            setExistingImages(uniqueImgs)
            setTitle(property.title || "")
            setDescription(property.description || "")
            setPrice(property.price || "")
            setCity(property.city || "")
            setOperationType(property.operation_type || "")
            setPropertyType(property.property_type || "")
            setBedrooms(property.bedrooms || "")
            setBathrooms(property.bathrooms || "")
            setArea(property.area_m2 || "")
            setNeighborhood(property.neighborhood || "")
            setFeatured(property.featured || false)
            setCadastralNumber(property.cadastral_number || "")
        }
    }, [property])


    function removeExistingImage(index) {
        const updated = [...existingImages]
        updated.splice(index, 1)
        setExistingImages(updated)
    }


    async function buscarParcela() {
        if (!cadastralNumber) return alert("Ingresar número catastral")
        try {
            const res = await fetch(
                `${API_URL}/idecor/parcela/${cadastralNumber}`
            )
            const data = await res.json()
            if (!data) {
                alert("No se encontró parcela")
                return
            }
            setParcelData(data)
            // autocompletar campos
            setArea(data.area || "")
        } catch (error) {
            console.error(error)
        }
    }
    if (!isOpen) return null
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("city", city)
        files.forEach(file => {
            formData.append("files", file)
        })
        formData.append("operation_type", operationType)
        formData.append("property_type", propertyType)
        formData.append("bedrooms", bedrooms)
        formData.append("bathrooms", bathrooms)
        formData.append("area_m2", area)
        formData.append("neighborhood", neighborhood)
        formData.append("featured", featured)
        formData.append("cadastral_number", cadastralNumber)
        formData.append(
            "existing_images",
            JSON.stringify(existingImages)
        )
        if (parcelData) {
            formData.append("latitude", parcelData.latitude)
            formData.append("longitude", parcelData.longitude)
            formData.append("area_m2", parcelData.area)
        }
        try {
            let res
            if (property) {
                formData.append("title", title)
                formData.append("description", description)
                formData.append("price", price)
                formData.append("city", city)

                res = await fetch(
                    `${API_URL}/properties/${property.id}/with-images`,
                    {
                        method: "PUT",
                        body: formData
                    }
                )
            }
            else {
                res = await fetch(
                    `${API_URL}/properties/create-with-image`,
                    {
                        method: "POST",
                        body: formData
                    }
                )
            }
            const data = await res.json()
            console.log("Property created:", data)
            onCreated(data)
            onClose()
        } catch (error) {
            console.error("Error creating property:", error)
        }
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-96 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {property ? "Editar Propiedad" : "Nueva Propiedad"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Título"
                        className="w-full border p-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descripción"
                        className="w-full border p-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        className="w-full border p-2"
                        value={operationType}
                        onChange={(e) => setOperationType(e.target.value)}
                        required
                    >
                        <option value="">Operación</option>
                        <option value="venta">Venta</option>
                        <option value="alquiler">Alquiler</option>
                    </select>

                    <select
                        className="w-full border p-2"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        required
                    >
                        <option value="">Tipo propiedad</option>
                        <option value="casa">Casa</option>
                        <option value="departamento">Departamento</option>
                        <option value="local">Local</option>
                        <option value="terreno">Terreno</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Barrio"
                        className="w-full border p-2"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Dormitorios"
                        className="w-full border p-2"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Baños"
                        className="w-full border p-2"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Superficie m²"
                        className="w-full border p-2"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                        />
                        Propiedad destacada
                    </label>

                    <input
                        type="number"
                        placeholder="Precio"
                        className="w-full border p-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Ciudad"
                        className="w-full border p-2"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />


                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full border p-2"
                        onChange={(e) => setFiles([...e.target.files])}
                    />
                    <p className="text-xs text-gray-500">
                        Podés seleccionar múltiples imágenes (Ctrl + click o Shift + click)
                    </p>


                    {existingImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {existingImages.map((img, i) => (
                                <div key={i} className="relative">
                                    <img
                                        src={img}
                                        className="w-full h-20 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingImage(i)}
                                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}


                    {files.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {files.map((file, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    className="w-full h-20 object-cover rounded"
                                />
                            ))}
                        </div>
                    )}


                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button>
                            {property ? "Actualizar" : "Crear"}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="mb-4 text-blue-600 underline"
                    >
                        Volver 
                    </button>

                    {/* volverbutton admin dashboard */}
                    {/* ver hacer en otra vista -->  por ej: consultar */}

                    <input
                        type="text"
                        placeholder="N° de cuenta"
                        className="w-full border p-2"
                        value={cadastralNumber}
                        onChange={(e) => setCadastralNumber(e.target.value)}
                    />


                    <button
                        type="button"
                        onClick={buscarParcela}
                        className="bg-purple-600 text-white px-3 py-2 rounded w-full"
                    >
                        Buscar en IDECOR
                    </button>

                    {parcelData?.idecor && (
                        <div className="mt-4 text-sm bg-gray-50 p-3 rounded space-y-1">
                            <p><b>Cuenta:</b> {parcelData.idecor.cuenta}</p>
                            <p><b>Nomenclatura:</b> {parcelData.idecor.nomenclatura}</p>
                            <p><b>Designación:</b> {parcelData.idecor.designacion}</p>
                            <p><b>Tipo:</b> {parcelData.idecor.tipo_inmueble}</p>
                            <p><b>Estado:</b> {parcelData.idecor.estado}</p>
                            <p><b>Sup. Terreno:</b> {parcelData.idecor.superficie_terreno} m²</p>
                            <p><b>Sup. Edificada:</b> {parcelData.idecor.superficie_mejoras} m²</p>
                            <p><b>Valuación:</b> ${parcelData.idecor.valuacion_total}</p>

                            <div className="space-y-2 mt-2">

                                {/* 📄 INFORME DETALLADO */}
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(parcelData.idecor.cuenta)
                                        window.open(
                                            "https://www.rentascordoba.gob.ar/gestiones/informe/detalle/inmueble",
                                            "_blank"
                                        )
                                    }}
                                    className="bg-blue-600 text-white px-3 py-2 rounded w-full"
                                >
                                    📄 Informe impositivo (copia N° cuenta)
                                </button>

                                {/* 💳 VER DEUDA / PAGAR */}
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(parcelData.idecor.cuenta)
                                        window.open(
                                            "https://www.rentascordoba.gob.ar/emision/ver-y-pagar/inmobiliario",
                                            "_blank"
                                        )
                                    }}
                                    className="bg-yellow-600 text-white px-3 py-2 rounded w-full"
                                >
                                    💳 Ver deuda / pagar (copia N° cuenta)
                                </button>

                            </div>

                            <button
                                disabled={!cadastralNumber}
                                onClick={() => window.open(`${API_URL}/idecor/kml/${cadastralNumber}`, "_blank")}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Ver en Google Earth
                            </button>

                            <p>Lat: {parcelData.latitude}</p>
                            <p>Lng: {parcelData.longitude}</p>

                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default CreatePropertyModal



//  https://www.rentascordoba.gob.ar/gestiones/informe/detalle/inmueble    -->  descarga PDF


//  https://www.rentascordoba.gob.ar/emision/ver-y-pagar/inmobiliario     -->  muestra el estado del inmueble (deuda, pago, etc)



