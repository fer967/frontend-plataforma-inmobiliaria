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

                <div className="flex flex-col md:flex-row gap-3 justify-center">
                    <select className="p-3 rounded text-black">
                        <option value="">Operación</option>
                        <option value="venta">Venta</option>
                        <option value="alquiler">Alquiler</option>
                    </select>
                    <select className="p-3 rounded text-black">
                        <option value="">Tipo</option>
                        <option value="casa">Casa</option>
                        <option value="departamento">Departamento</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Ciudad..."
                        className="p-3 rounded text-black"
                    />
                    <button className="bg-blue-600 px-4 py-3 rounded text-white">
                        Buscar
                    </button>
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


