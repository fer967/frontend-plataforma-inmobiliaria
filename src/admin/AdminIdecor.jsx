import { useState } from "react"

function AdminIdecor() {
    const [numero, setNumero] = useState("")
    const [data, setData] = useState(null)
    const API_URL = import.meta.env.VITE_API_URL

    async function buscar() {
        if (!numero) return alert("Ingresar número de cuenta")
        const res = await fetch(`${API_URL}/idecor/parcela/${numero}`)
        const json = await res.json()
        setData(json)
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Consulta IDECOR</h1>
            <input
                type="text"
                placeholder="Número de cuenta"
                className="w-full border p-2 mb-2"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
            />
            <button
                onClick={buscar}
                className="bg-purple-600 text-white px-4 py-2 rounded w-full"
            >
                Buscar
            </button>
            {data?.idecor && (
                <div className="mt-4 bg-gray-100 p-4 rounded space-y-2">
                    <p><b>Cuenta:</b> {data.idecor.cuenta}</p>
                    <p><b>Nomenclatura:</b> {data.idecor.nomenclatura}</p>
                    <p><b>Designación:</b> {data.idecor.designacion}</p>
                    <p><b>Tipo:</b> {data.idecor.tipo_inmueble}</p>
                    <p><b>Estado:</b> {data.idecor.estado}</p>
                    <p><b>Sup. Terreno:</b> {data.idecor.superficie_terreno} m²</p>
                    <p><b>Sup. Edificada:</b> {data.idecor.superficie_mejoras} m²</p>
                    <p><b>Valuación:</b> ${data.idecor.valuacion_total}</p>
                    {/* BOTONES */}
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(data.idecor.cuenta)
                            window.open(
                                "https://www.rentascordoba.gob.ar/gestiones/informe/detalle/inmueble",
                                "_blank"
                            )
                        }}
                        className="bg-blue-600 text-white px-3 py-2 rounded w-full"
                    >
                        Descargar informe impositivo
                    </button>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(data.idecor.cuenta)
                            window.open(
                                "https://www.rentascordoba.gob.ar/emision/ver-y-pagar/inmobiliario",
                                "_blank"
                            )
                        }}
                        className="bg-yellow-600 text-white px-3 py-2 rounded w-full"
                    >
                        Ver estado impositivo
                    </button>
                    <button
                        onClick={() =>
                            window.open(`${API_URL}/idecor/kml/${numero}`, "_blank")
                        }
                        className="bg-green-600 text-white px-3 py-2 rounded w-full"
                    >
                        Ver en Google Earth
                    </button>
                </div>
            )}
        </div>
    )
}

export default AdminIdecor