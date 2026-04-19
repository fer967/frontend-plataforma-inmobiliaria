import { useState } from "react"
import { toast } from "react-toastify"

function Tasaciones() {

    const [form, setForm] = useState({
        name: "",
        phone: "",
        city: "",
        type: "",
        message: ""
    })
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    function validate() {
        const newErrors = {}
        if (!form.name.trim()) {
            newErrors.name = "El nombre es obligatorio"
        }
        if (!form.phone.trim()) {
            newErrors.phone = "El teléfono es obligatorio"
        } else if (!/^[0-9]{8,15}$/.test(form.phone)) {
            newErrors.phone = "Teléfono inválido"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        const message = `
Solicitud de tasación:
Ciudad: ${form.city}
Tipo: ${form.type}
Detalle: ${form.message}
    `
        try {
            const res = await fetch("https://real-estate-platform-backend-pzzd.onrender.com/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: form.name,
                    phone: form.phone,
                    message: message,
                    source: "tasacion"
                })
            })
            if (res.ok) {
                toast.success("Solicitud enviada correctamente 🚀")
                setForm({
                    name: "",
                    phone: "",
                    city: "",
                    type: "",
                    message: ""
                })
            } else {
                toast.error("Error al enviar la solicitud")
            }
        } catch (error) {
            console.error(error)
            toast.error("Error de conexión")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Quiero tasar mi Propiedad
            </h1>
            {success && (
                <p className="bg-green-100 text-green-700 p-3 mb-4 rounded">
                    Solicitud enviada, un asesor lo contactara en breve, muchas gracias por confiar en nosotros!
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Ingrese su nombre" className="w-full border p-2" onChange={handleChange} value={form.name} required />
                <input name="phone" placeholder="Teléfono" className="w-full border p-2" onChange={handleChange} value={form.phone} required />
                <input name="city" placeholder="Ciudad" className="w-full border p-2" onChange={handleChange} value={form.city} />
                <select name="type" className="w-full border p-2" onChange={handleChange} value={form.type}>
                    <option value="">Tipo propiedad</option>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="terreno">Terreno</option>
                </select>
                <textarea name="message" placeholder="Detalles adicionales de su propiedad" className="w-full border p-2" onChange={handleChange} value={form.message} />
                <button
                    disabled={loading}
                    className={`px-4 py-2 rounded w-full text-white 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600"}`}
                >
                    {loading ? "Enviando..." : "Solicitar tasación"}
                </button>
            </form>
        </div>
    )
}

export default Tasaciones



