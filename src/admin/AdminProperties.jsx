import { useEffect, useState } from "react"
import { getProperties } from "../services/api"
import CreatePropertyModal from "../components/CreatePropertyModal"

function AdminProperties() {

    const [properties, setProperties] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadProperties()
    }, [])

    async function loadProperties() {
        const data = await getProperties()
        setProperties(data)
    }

    return (
        <div>
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">
                    Propiedades
                </h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Nueva Propiedad
                </button>
            </div>
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Título</th>
                        <th className="p-3 text-left">Precio</th>
                        <th className="p-3 text-left">Tipo</th>
                        <th className="p-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(p => (
                        <tr key={p.id} className="border-t">
                            <td className="p-3">{p.id}</td>
                            <td className="p-3">{p.title}</td>
                            <td className="p-3">{p.price}</td>
                            <td className="p-3">{p.property_type}</td>
                            <td className="p-3 space-x-2">
                                <button className="text-blue-600">
                                    Editar
                                </button>
                                <button className="text-red-600">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && <CreatePropertyModal closeModal={() => setShowModal(false)} refreshProperties={loadProperties} />}
        </div>
        )
        
}

export default AdminProperties