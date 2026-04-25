import { useEffect, useState } from "react"
import PropertyCard from "../components/PropertyCard"
import { getProperties } from "../services/api"

function Home() {

    const [properties, setProperties] = useState([])
    const [operation, setOperation] = useState("")
    const [type, setType] = useState("")
    const [city, setCity] = useState("")

    useEffect(() => {
        loadProperties()
    }, [])

    const loadProperties = async () => {
        const data = await getProperties()
        setProperties(data.slice(0, 3))
    }

    const handleSearch = async () => {
        const data = await getProperties({
            operation,
            property_type: type,
            city
        })
        setProperties(data)
    }

    return (
        <div>
            {/* HERO */}

            <div
                className="h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa')"
                }}
            >
                {/* Overlay */}
                <div className="bg-black/50 p-4 md:p-6 rounded-xl w-[90%] md:w-auto">

                    <div className="flex flex-col md:flex-row gap-3">

                        <select
                            className="p-3 rounded-lg border-2 border-white/60 bg-white text-black font-medium"
                            value={operation}
                            onChange={(e) => setOperation(e.target.value)}
                        >
                            <option value="">Tipo de Operación</option>
                            <option value="venta">Consulta por propiedades en Venta</option>
                            <option value="alquiler">Consulta por propiedades en Alquiler</option>
                        </select>

                        <select
                            className="p-3 rounded-lg border-2 border-white/60 bg-white text-black font-medium"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Tipo de propiedad</option>
                            <option value="casa">Casa</option>
                            <option value="departamento">Departamento</option>
                            <option value="terreno">Terreno</option>
                            <option value="local">Local</option>
                        </select>

                        {/* <input
                            type="text"
                            placeholder="Ciudad..."
                            className="p-3 rounded-lg border-2 border-white/60 bg-white text-black"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        /> */}

                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-lg text-white font-semibold"
                        >
                            Buscar
                        </button>

                    </div>

                    {properties.length === 0 && (
                        <p className="text-white mt-3 text-sm">
                            No se encontraron propiedades
                        </p>
                    )}
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




{/* <div className="h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center text-white"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa')"
                }}
            >
                <div className="flex flex-col md:flex-row gap-3 justify-center">
                    <select
                        className="p-3 rounded text-black"
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                    >
                        <option value="">Operación</option>
                        <option value="venta">Venta</option>
                        <option value="alquiler">Alquiler</option>
                    </select>
                    <select
                        className="p-3 rounded text-black"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Tipo</option>
                        <option value="casa">Casa</option>
                        <option value="departamento">Departamento</option>
                        <option value="terreno">Terreno</option>
                        <option value="local">Local</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Ciudad..."
                        className="p-3 rounded text-black"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 px-4 py-3 rounded text-white"
                    >
                        Buscar
                    </button>
                    {properties.length === 0 && (
                        <p>No se encontraron propiedades</p>
                    )}
                </div>
            </div> */}


