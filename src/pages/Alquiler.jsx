import PropertyList from "../components/PropertyList"

function Alquiler() {

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">
                Propiedades en alquiler
            </h1>
            <PropertyList operationType="alquiler" />
        </div>
    )
}

export default Alquiler


// import { useEffect, useState } from "react"
// import { getProperties } from "../services/api"
// import PropertyCard from "../components/PropertyCard"

// function Alquiler() {

//     const [properties, setProperties] = useState([])

//     useEffect(() => {
//         loadProperties()
//     }, [])

//     async function loadProperties() {
//         const data = await getProperties()
//         setProperties(data)
//     }

//     const alquiler = properties.filter(
//         property => property.operation_type === "alquiler"
//     )

//     return (
//         <div className="p-8">
//             <h1 className="text-3xl font-bold mb-8">
//                 Propiedades en alquiler
//             </h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {alquiler.map(property => (
//                     <PropertyCard
//                         key={property.id}
//                         property={property}
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Alquiler


// function Alquiler() {
//     const alquiler = properties.filter(
//         property => property.operation_type === "alquiler"
//     )
//     return (
//         <div className="p-8">
//             <h1 className="text-3xl font-bold">Propiedades en alquiler</h1>
//         </div>
//     )
// }

// export default Alquiler