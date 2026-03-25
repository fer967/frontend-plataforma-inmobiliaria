import { useState, useEffect } from "react"
import PropertyMap from "./PropertyMap"

function CreatePropertyModal({ isOpen, onClose, onCreated, property }) {

    const [title, setTitle] = useState(property?.title || "")
    const [description, setDescription] = useState(property?.description || "")
    const [price, setPrice] = useState(property?.price || "")
    const [city, setCity] = useState(property?.city || "")
    const [file, setFile] = useState(null)
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

    useEffect(() => {
        if (parcelData) {
            console.log("GEOMETRY:", parcelData.geometry)
        }
    }, [parcelData])

    async function buscarParcela() {
        if (!cadastralNumber) return alert("Ingresar número catastral")
        try {
            const res = await fetch(
                `https://real-estate-platform-backend-pzzd.onrender.com/idecor/parcela/${cadastralNumber}`
            )
            const data = await res.json()
            if (!data) {
                alert("No se encontró parcela")
                return
            }
            setParcelData(data)
            // autocompletar campos
            setArea(data.area || "")
            // si querés guardar coords después:
            // setLatitude(data.latitude)
            // setLongitude(data.longitude)
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
        // formData.append("file", file)
        formData.append("operation_type", operationType)
        formData.append("property_type", propertyType)
        formData.append("bedrooms", bedrooms)
        formData.append("bathrooms", bathrooms)
        formData.append("area_m2", area)
        formData.append("neighborhood", neighborhood)
        formData.append("featured", featured)
        formData.append("cadastral_number", cadastralNumber)
        if (parcelData) {
            formData.append("latitude", parcelData.latitude)
            formData.append("longitude", parcelData.longitude)
            formData.append("area_m2", parcelData.area)
        }

        try {
            let res
            if (property) {
                res = await fetch(
                    `https://real-estate-platform-backend-pzzd.onrender.com/properties/${property.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            title,
                            description,
                            price,
                            city
                        })
                    }
                )
            } else {
                res = await fetch(
                    "https://real-estate-platform-backend-pzzd.onrender.com/properties/create-with-image",
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
                        accept="image/*"
                        className="w-full"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Crear
                        </button>
                    </div>

                    <input
                        type="text"
                        placeholder="N° de cuenta"
                        className="w-full border p-2"
                        value={cadastralNumber}
                        onChange={(e) => setCadastralNumber(e.target.value)}
                    />
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setFiles([...e.target.files])}
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
                            <a
                                href={`https://www.rentascordoba.gob.ar/cs/${parcelData.idecor.cuenta}`}
                                target="_blank"
                                className="text-blue-600 underline"
                            >
                                Ver estado en Rentas
                            </a>
                            <a
                                href={`https://real-estate-platform-backend-pzzd.onrender.com/idecor/kml/${cadastralNumber}`}
                                target="_blank"
                                className="bg-green-600 text-white px-3 py-2 rounded w-full block text-center"
                            >
                                Descargar KML (Google Earth)
                            </a>
                            <p>Lat: {parcelData.latitude}</p>
                            <p>Lng: {parcelData.longitude}</p>
                            {/* <PropertyMap geometry={parcelData.geometry} /> */}
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default CreatePropertyModal




