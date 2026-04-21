import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()
const API_URL = import.meta.env.VITE_API_URL

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    // 🔄 cargar sesión guardada
    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        if (savedUser && token) {
            setUser(JSON.parse(savedUser))
        }
    }, [])


    const login = async (username, password) => {
        try {
            const res = await fetch(
                `${API_URL}/auth/login?username=${username}&password=${password}`,
                {
                    method: "POST"
                }
            )
            if (!res.ok) {
                throw new Error("Credenciales incorrectas")
            }
            const data = await res.json()
            // 🔐 guardar token
            localStorage.setItem("token", data.access_token)
            // 👤 guardar user básico
            const userData = {
                name: username,
                token: data.access_token
            }
            // const userData = { name: username }
            setUser(userData)
            localStorage.setItem("user", JSON.stringify(userData))
        } catch (err) {
            alert("Error de login")
            console.error(err)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


// const login = (username, password) => {
//     // 👉 login simple (después podés conectar backend)
//     if (username === "admin" && password === "admin123") {
//         const userData = { name: "Admin" }
//         setUser(userData)
//         localStorage.setItem("user", JSON.stringify(userData))
//     } else {
//         alert("Credenciales incorrectas")
//     }
// }


// useEffect(() => {
//     const savedUser = localStorage.getItem("user")
//     if (savedUser) {
//         setUser(JSON.parse(savedUser))
//     }
// }, [])


            // const res = await fetch(`${API_URL}/auth/login`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         username,
            //         password
            //     })
            // })

