import { useState, useEffect } from "react"
import CreatePropertyModal from "../components/CreatePropertyModal"

function AdminDashboard() {

    const [properties, setProperties] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null)

    // const API_URL = "http://127.0.0.1:8000";
    const API_URL = import.meta.env.VITE_API_URL

    async function loadProperties() {
        const res = await fetch(`${API_URL}/properties/`)
        const data = await res.json()
        setProperties(data)
    }

    useEffect(() => {
        loadProperties()
    }, [])

    async function deleteProperty(id) {
        if (!confirm("¿Eliminar propiedad?")) return
        await fetch(`${API_URL}/properties/${id}`, {
            method: "DELETE"
        })
        loadProperties()
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Panel Administrador
            </h1>
            <button
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded mb-6"
            >
                + Nueva Propiedad
            </button>
            <CreatePropertyModal
                isOpen={showModal}
                property={selectedProperty}
                onClose={() => {
                    setShowModal(false)
                    setSelectedProperty(null)
                }}
                onCreated={() => loadProperties()}
            />
            {/* 🔽 TABLA DESKTOP */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full bg-white shadow rounded">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Imagen</th>
                            <th className="p-3 text-left">Título</th>
                            <th className="p-3 text-left">Precio</th>
                            <th className="p-3 text-left">Ciudad</th>
                            <th className="p-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property.id} className="border-t">
                                <td className="p-3">
                                    <img
                                        src={property.image_url}
                                        className="w-20 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="p-3">{property.title}</td>
                                <td className="p-3">${property.price}</td>
                                <td className="p-3">{property.city}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedProperty(property)
                                            setShowModal(true)
                                        }}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteProperty(property.id)}
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* 🔽 CARDS MOBILE */}
            <div className="md:hidden space-y-4">
                {properties.map((property) => (
                    <div key={property.id} className="bg-white p-4 rounded shadow">
                        <img
                            src={property.image_url}
                            className="w-full h-40 object-cover rounded mb-3"
                        />
                        <h2 className="font-semibold text-lg">
                            {property.title}
                        </h2>
                        <p className="text-gray-600">
                            {property.city}
                        </p>
                        <p className="font-bold mt-2">
                            ${property.price}
                        </p>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => {
                                    setSelectedProperty(property)
                                    setShowModal(true)
                                }}
                                className="flex-1 bg-yellow-500 text-white py-2 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => deleteProperty(property.id)}
                                className="flex-1 bg-red-600 text-white py-2 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminDashboard











