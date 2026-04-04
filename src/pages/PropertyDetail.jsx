import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProperty } from "../services/api"
import PropertyGallery from "../components/PropertyGallery"

function PropertyDetail() {

    const { id } = useParams()
    const [property, setProperty] = useState(null)
    const phone = "5493516184580" // 👈 tu número nuevo (sin +)
    const message = `Hola, quiero consultar por la propiedad:
    🏠 ${property.title}
    💰 $${property.price}
    📍 ${property.city}
    Link: ${window.location.href}`

    useEffect(() => {
        loadProperty()
    }, [id])

    async function loadProperty() {
        const data = await getProperty(id)
        setProperty(data)
    }

    if (!property) return <p>Cargando...</p>

    let images = property.images?.length
        ? property.images
        : [property.image_url]
            ? [property.image_url]
            : []
    // eliminar duplicados
    images = [...new Set(images)]
    // separar portada
    const mainImage = property.image_url || images[0]
    // thumbnails SIN la portada
    const galleryImages = images.filter(img => img !== mainImage)

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* galería */}
            <PropertyGallery
                mainImage={mainImage}
                images={galleryImages}
            />
            {/* info propiedad */}
            <div className="mt-8">
                <h1 className="text-3xl font-bold">
                    {property.title}
                </h1>
                <p className="text-xl mt-2">
                    ${property.price?.toLocaleString()}
                </p>

                <a
                    href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
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

