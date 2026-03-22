// Badge de operación + precio sobre la imagen
import { Link } from "react-router-dom"

function PropertyCard({ property }) {

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            {/* contenedor imagen */}
            <div className="relative">
                <img
                    src={property.image_url}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                />
                {/* badge operación */}
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {property.operation_type?.toUpperCase()}
                </span>
                {/* badge precio */}
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded">
                    ${property.price?.toLocaleString()}
                </span>
            </div>
            {/* contenido */}
            <div className="p-4">
                <p className="font-semibold text-gray-800">
                    {property.title}
                </p>
                <p className="text-sm text-gray-500">
                    {property.city} {property.neighborhood && `- ${property.neighborhood}`}
                </p>
                <div className="flex gap-4 text-sm text-gray-600 mt-3">
                    {property.bedrooms && (
                        <span>🛏 {property.bedrooms}</span>
                    )}
                    {property.bathrooms && (
                        <span>🛁 {property.bathrooms}</span>
                    )}
                    {property.area_m2 && (
                        <span>📐 {property.area_m2} m²</span>
                    )}
                </div>
                <Link
                    to={`/property/${property.id}`}
                    className="block text-center bg-gray-900 text-white mt-4 py-2 rounded hover:bg-gray-700"
                >
                    Ver detalles
                </Link>
            </div>
        </div>
    )
}

export default PropertyCard


// import { Link } from "react-router-dom"

// function PropertyCard({ property }) {

//     return (
//         <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">

//             <img
//                 src={property.image_url}
//                 alt={property.title}
//                 className="w-full h-48 object-cover"
//             />

//             <div className="p-4">

//                 {/* operación */}
//                 <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
//                     {property.operation_type?.toUpperCase()}
//                 </span>

//                 {/* precio */}
//                 <h2 className="text-xl font-bold mt-2">
//                     ${property.price?.toLocaleString()}
//                 </h2>

//                 {/* título */}
//                 <p className="text-gray-700 font-semibold">
//                     {property.title}
//                 </p>

//                 {/* ubicación */}
//                 <p className="text-sm text-gray-500">
//                     {property.city} {property.neighborhood && `- ${property.neighborhood}`}
//                 </p>

//                 {/* características */}
//                 <div className="flex justify-between text-sm text-gray-600 mt-3">

//                     {property.bedrooms && (
//                         <span>🛏 {property.bedrooms}</span>
//                     )}

//                     {property.bathrooms && (
//                         <span>🛁 {property.bathrooms}</span>
//                     )}

//                     {property.area_m2 && (
//                         <span>📐 {property.area_m2} m²</span>
//                     )}

//                 </div>

//                 {/* botón */}
//                 <Link
//                     to={`/property/${property.id}`}
//                     className="block text-center bg-gray-900 text-white mt-4 py-2 rounded hover:bg-gray-700"
//                 >
//                     Ver detalles
//                 </Link>

//             </div>

//         </div>
//     )
// }

// export default PropertyCard



// import { Link } from "react-router-dom"

// function PropertyCard({ property }) {

//     return (

//         <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

//             {/* Imagen */}
//             <div className="h-48 md:h-56 overflow-hidden">
//                 <img
//                     src={property.image_url}
//                     alt={property.title}
//                     className="w-full h-full object-cover hover:scale-105 transition duration-300"
//                 />
//             </div>

//             {/* Contenido */}
//             <div className="p-4">

//                 {/* Titulo */}
//                 <h2 className="text-lg md:text-xl font-semibold mb-1">
//                     {property.title}
//                 </h2>

//                 {/* Ubicación */}
//                 <p className="text-gray-500 text-sm mb-2">
//                     📍 {property.location}
//                 </p>

//                 {/* Precio */}
//                 <p className="text-blue-600 font-bold text-lg md:text-xl mb-3">
//                     USD {property.price}
//                 </p>

//                 {/* Botón */}
//                 <Link
//                     to={`/property/${property.id}`}
//                     className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                     Ver detalles
//                 </Link>

//             </div>

//         </div>

//     )
// }

// export default PropertyCard