import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

import { useEffect } from "react"

function Login() {

    const { login, user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        login(username, password)

        // pequeño delay para asegurar estado actualizado
        setTimeout(() => {
            if (localStorage.getItem("user")) {
                navigate("/admin")
            }
        }, 100)
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
                    Ingresar
                </h1>

                <input
                    type="text"
                    placeholder="Usuario"
                    className="w-full border p-2 mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border p-2 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Ingresar
                </button>
            </form>

        </div>
    )
}

export default Login