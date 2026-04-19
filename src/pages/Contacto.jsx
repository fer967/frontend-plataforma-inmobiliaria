import { useState } from "react"

function Contacto() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({})

    function validate() {
        const newErrors = {}
        if (!form.name.trim()) {
            newErrors.name = "El nombre es obligatorio"
        } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s]+$/.test(form.name)) {
            newErrors.name = "El nombre contiene caracteres inválidos"
        }
        if (!form.phone.trim()) {
            newErrors.phone = "El teléfono es obligatorio"
        } else if (!/^[0-9]{8,15}$/.test(form.phone)) {
            newErrors.phone = "Teléfono inválido (solo números)"
        }
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Email inválido"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
        setErrors({
            ...errors,
            [name]: "" // limpia error al escribir
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!validate()) return
        try {
            const res = await fetch("https://real-estate-platform-backend-pzzd.onrender.com/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...form,
                    source: "web"
                })
            })
            if (res.ok) {
                setSuccess(true)
                setForm({ name: "", email: "", phone: "", message: "" })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Contacto</h1>
            {success && (
                <p className="bg-green-100 text-green-700 p-3 mb-4 rounded">
                    Consulta enviada correctamente
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Ingrese su nombre" className="w-full border p-2" onChange={handleChange} value={form.name} required />
                <input name="email" placeholder="Email" className="w-full border p-2" onChange={handleChange} value={form.email} />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Teléfono"
                    className="w-full border p-2"
                    onChange={handleChange}
                    value={form.phone}
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
                <textarea name="message" placeholder="Mensaje" className="w-full border p-2" onChange={handleChange} value={form.message} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                    Enviar
                </button>
            </form>
        </div>
    )
}

export default Contacto


