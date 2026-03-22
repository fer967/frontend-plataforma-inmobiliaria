import { useEffect, useState } from "react"
import PropertyCard from "../components/PropertyCard"
import { getProperties } from "../services/api"

function Home() {

    const [properties, setProperties] = useState([])

    useEffect(() => {
        loadProperties()
    }, [])

    const loadProperties = async () => {
        const data = await getProperties()

        // solo destacadas
        setProperties(data.slice(0, 3))
    }

    return (

        <div>

            {/* HERO */}

            <div className="h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center text-white"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa')"
                }}
            >

                <div className="text-center bg-black/50 p-6 rounded-xl">

                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        Encuentra tu propiedad ideal
                    </h1>

                    <input
                        type="text"
                        placeholder="Buscar por ciudad..."
                        className="p-3 rounded text-black w-64"
                    />

                </div>

            </div>

            {/* PROPIEDADES DESTACADAS */}

            <div className="max-w-7xl mx-auto p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Propiedades destacadas
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}

                </div>

            </div>

        </div>

    )
}

export default Home


// import { useEffect, useState } from "react"
// import { getProperties } from "../services/api"
// import PropertyCard from "../components/PropertyCard"

// function Home() {

//     const [properties, setProperties] = useState([])

//     useEffect(() => {
//         loadProperties()
//     }, [])

//     const loadProperties = async () => {
//         const data = await getProperties()
//         setProperties(data)
//     }

//     return (

//         <div className="p-8">

//             <h1 className="text-3xl font-bold mb-6">
//                 Propiedades disponibles
//             </h1>

//             <div className="grid grid-cols-3 gap-6">

//                 {properties.map((property) => (
//                     <PropertyCard
//                         key={property.id}
//                         property={property}
//                     />
//                 ))}

//             </div>

//         </div>
//     )
// }

// export default Home


// import PropertyCard from "../components/PropertyCard"

// function Home() {
//     return (
//         <div className="p-8">
//             <h1 className="text-3xl font-bold mb-6">
//                 Bienvenido a nuestra inmobiliaria
//             </h1>
//             <p className="text-gray-600">
//                 Encuentra la propiedad ideal para vos.
//             </p>

//         </div>
//     )
// }

// export default Home