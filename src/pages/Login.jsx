import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Login() {
    const { login, user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
        if (localStorage.getItem("token")) {
            navigate("/admin")
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/admin")
        }
    }, [user])

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Solo Administrador
                </h1>
                <input
                    type="text"
                    placeholder="Usuario"
                    className="w-full border p-2 mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        className="w-full border p-2 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                    >
                        {showPassword ? "🙈" : "👁"}
                    </button>
                </div>
                <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded">
                    Ingresar
                </button>
                <p className="text-sm text-center mt-4">
                    <button
                        type="button"
                        className="text-blue-600 underline"
                        onClick={() => alert("Funcionalidad próximamente")}
                    >
                        Cambiar contraseña
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Login



    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     login(username, password)
    //     // pequeño delay para asegurar estado actualizado
    //     setTimeout(() => {
    //         if (localStorage.getItem("user")) {
    //             navigate("/admin")
    //         }
    //     }, 100)
    // }