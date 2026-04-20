import { useEffect, useState } from "react"
import { getLeads } from "../services/api"

function getStatusColor(status) {
    switch (status) {
        case "new":
            return "bg-blue-500"
        case "contacted":
            return "bg-yellow-500"
        case "closed":
            return "bg-green-600"
        default:
            return "bg-gray-400"
    }
}

function AdminLeads() {

    const [leads, setLeads] = useState([])
    const [filter, setFilter] = useState("all")
    const [analysis, setAnalysis] = useState(null)

    useEffect(() => {
        loadLeads()
    }, [])

    async function loadLeads() {
        const data = await getLeads()
        setLeads(data)
    }

    // const API_URL = "http://127.0.0.1:8000";
    const API_URL = import.meta.env.VITE_API_URL

    async function updateStatus(id, status) {
        await fetch(`${API_URL}/leads/${id}/status?status=${status}`, {
            method: "PUT"
        })
        loadLeads()
    }

    const filteredLeads = leads.filter(lead => {
        if (filter === "all") return true
        return lead.status === filter
    })


    async function analyzeLead(lead) {
        try {
            const res = await fetch(
                `${API_URL}/analysis/from-lead?message=${encodeURIComponent(lead.message)}`
            )
            const data = await res.json()
            if (!data) {
                alert("No se pudo obtener análisis")
                return
            }
            if (data.error) {
                alert("No hay datos suficientes")
                return
            }
            console.log("ANALYSIS RESPONSE:", data)
            alert(`
    📊 Análisis de mercado
    Promedio: USD ${data.avg_price || data.avg}
    Mín: USD ${data.min_price || data.min}
    Máx: USD ${data.max_price || data.max}
    Precio/m²: USD ${data.avg_m2 || "-"}
    Muestra: ${data.count || "-"}
            `)
        } catch (err) {
            console.error(err)
            alert("Error al analizar")
        }
    }


    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Leads
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">

                <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 rounded ${filter === "all" ? "bg-black text-white" : "bg-gray-200"}`}
                >
                    Todos
                </button>

                <button
                    onClick={() => setFilter("new")}
                    className={`px-3 py-1 rounded ${filter === "new" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Nuevos
                </button>

                <button
                    onClick={() => setFilter("contacted")}
                    className={`px-3 py-1 rounded ${filter === "contacted" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
                >
                    Contactados
                </button>

                <button
                    onClick={() => setFilter("closed")}
                    className={`px-3 py-1 rounded ${filter === "closed" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                    Cerrados
                </button>

            </div>

            {/* DESKTOP */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full bg-white shadow rounded">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Nombre</th>
                            <th className="p-3 text-left">Teléfono</th>
                            <th className="p-3 text-left">Mensaje</th>
                            <th className="p-3 text-left">Fuente</th>
                            <th className="p-3 text-left">Fecha</th>
                            <th className="p-3 text-left">Estado</th>
                            <th className="p-3 text-left">Análisis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="border-t">
                                <td className="p-3">{lead.name}</td>
                                <td className="p-3">{lead.phone}</td>
                                <td className="p-3">{lead.message}</td>

                                <td className="p-3">{lead.source || "-"}</td>

                                <td className="p-3">
                                    {lead.created_at
                                        ? new Date(lead.created_at).toLocaleString()
                                        : "-"}
                                </td>

                                <td className="p-3 space-y-1">
                                    <span className={`text-white px-2 py-1 rounded text-xs ${getStatusColor(lead.status)}`}>
                                        {lead.status || "new"}
                                    </span>
                                    <select
                                        value={lead.status}
                                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                                        className="border p-1 rounded w-full"
                                    >
                                        <option value="new">Nuevo</option>
                                        <option value="contacted">Contactado</option>
                                        <option value="closed">Cerrado</option>
                                    </select>
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => analyzeLead(lead)}
                                        className="bg-indigo-600 text-white px-2 py-1 rounded text-xs"
                                    >
                                        Analizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE */}
            <div className="md:hidden space-y-4">
                {filteredLeads.map((lead) => (
                    <div key={lead.id} className="bg-white p-4 rounded shadow">
                        <h2 className="font-semibold text-lg">
                            {lead.name}
                        </h2>
                        <p className="text-gray-600">
                            {lead.phone}
                        </p>
                        <p className="mt-2">
                            {lead.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Fuente: {lead.source}
                        </p>
                        <p className="text-xs text-gray-400">
                            {new Date(lead.created_at).toLocaleString()}
                        </p>
                        <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                            className="mt-2 border p-2 w-full rounded"
                        >
                            <option value="new">Nuevo</option>
                            <option value="contacted">Contactado</option>
                            <option value="closed">Cerrado</option>
                        </select>
                        <button
                            onClick={() => analyzeLead(lead)}
                            className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded w-full"
                        >
                            Analizar mercado
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminLeads




// setAnalysis(data)
// {
//     analysis && (
//         <div className="mt-4 p-4 bg-gray-100 rounded">
//             <h3 className="font-bold mb-2">📊 Análisis</h3>
//             <p>Promedio: USD {analysis.avg_price}</p>
//             <p>Rango: {analysis.min_price} - {analysis.max_price}</p>
//             <p>Precio/m²: USD {analysis.avg_m2}</p>
//         </div>
//     )
// }

//             alert(`
// 📊 Análisis de mercado
// Promedio: USD ${data.avg_price}
// Mín: USD ${data.min_price}
// Máx: USD ${data.max_price}
// Precio/m²: USD ${data.avg_m2}
// Muestra: ${data.count}
//         `)



