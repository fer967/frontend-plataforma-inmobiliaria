import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProperty } from "../services/api"
import PropertyGallery from "../components/PropertyGallery"

function PropertyDetail() {

    const { id } = useParams()
    const [property, setProperty] = useState(null)

    useEffect(() => {
        loadProperty()
    }, [id])

    async function loadProperty() {
        const data = await getProperty(id)
        setProperty(data)
    }

    if (!property) return <p>Cargando...</p>

    const images = [
        property.image_url,
        property.image_url,
        property.image_url
    ]

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* galería */}
            <PropertyGallery images={images} />
            {/* info propiedad */}
            <div className="mt-8">
                <h1 className="text-3xl font-bold">
                    {property.title}
                </h1>
                <p className="text-xl mt-2">
                    ${property.price?.toLocaleString()}
                </p>

                <a
                    href={`https://wa.me/5493516271526?text=Hola, quiero consultar por la propiedad ${property.title}`}
                    target="_blank"
                    className="inline-block mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
                >
                    Consultar por WhatsApp
                </a>

                <p className="text-gray-600 mt-2">
                    {property.city} {property.neighborhood && `- ${property.neighborhood}`}
                </p>
                <div className="flex gap-6 mt-4 text-gray-700">
                    {property.bedrooms && (
                        <span>🛏 {property.bedrooms} dormitorios</span>
                    )}
                    {property.bathrooms && (
                        <span>🛁 {property.bathrooms} baños</span>
                    )}
                    {property.area_m2 && (
                        <span>📐 {property.area_m2} m²</span>
                    )}
                </div>
                <p className="mt-6 text-gray-700">
                    {property.description}
                </p>
            </div>

            {(property.latitude && property.longitude) ? (
                <iframe
                    width="100%"
                    height="300"
                    className="rounded"
                    src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                />
            ) : (
                <iframe
                    width="100%"
                    height="300"
                    className="rounded"
                    src={`https://www.google.com/maps?q=${property.city} ${property.neighborhood}&z=15&output=embed`}
                />
            )}

        </div>
    )
}

export default PropertyDetail


// import { useParams } from "react-router-dom"
// import { useEffect, useState } from "react"

// const API_URL = "http://127.0.0.1:8000"

// function PropertyDetail() {

//     const { id } = useParams()
//     const [property, setProperty] = useState(null)


//     useEffect(() => {
//         loadProperty()
//     }, [])

//     const loadProperty = async () => {
//         const res = await fetch(`${API_URL}/properties/${id}`)
//         const data = await res.json()
//         setProperty(data)
//     }

//     if (!property) {
//         return <div className="p-8">Cargando propiedad...</div>
//     }

//     return (

//         <div className="max-w-6xl mx-auto p-6">

//             {/* Imagen */}
//             <img
//                 src={property.image_url}
//                 alt={property.title}
//                 className="w-full h-[300px] md:h-[450px] object-cover rounded-xl mb-6"
//             />

//             {/* Información */}
//             <div className="grid md:grid-cols-2 gap-8">

//                 <div>

//                     <h1 className="text-3xl font-bold mb-2">
//                         {property.title}
//                     </h1>

//                     <p className="text-gray-500 mb-4">
//                         📍 {property.location}
//                     </p>

//                     <p className="text-blue-600 text-2xl font-bold mb-6">
//                         USD {property.price}
//                     </p>

//                     <p className="text-gray-700">
//                         {property.description || "Descripción de la propiedad."}
//                     </p>

//                 </div>

//                 {/* Panel contacto */}
//                 <div className="bg-gray-100 p-6 rounded-xl">

//                     <h2 className="text-xl font-semibold mb-4">
//                         Consultar por esta propiedad
//                     </h2>

//                     <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-3 hover:bg-green-700">
//                         Contactar por WhatsApp
//                     </button>

//                     <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
//                         Enviar consulta
//                     </button>

//                 </div>

//             </div>

//             {/* Google Maps (placeholder) */}

//             <div className="mt-10">

//                 <h2 className="text-xl font-semibold mb-4">
//                     Ubicación
//                 </h2>

//                 <div className="w-full h-[300px] bg-gray-300 rounded-xl flex items-center justify-center">
//                     Google Maps aquí
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default PropertyDetail