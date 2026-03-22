import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)

    // 🔄 cargar sesión guardada
    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const login = (username, password) => {

        // 👉 login simple (después podés conectar backend)
        if (username === "admin" && password === "admin123") {
            const userData = { name: "Admin" }

            setUser(userData)
            localStorage.setItem("user", JSON.stringify(userData))
        } else {
            alert("Credenciales incorrectas")
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


// import { createContext, useState } from "react"

// export const AuthContext = createContext()

// export function AuthProvider({ children }) {

//     const [user, setUser] = useState(null)

//     const login = (username, password) => {
//         if (username === "admin" && password === "admin123") {
//             setUser({ name: "Admin" })
//         }
//     }

//     const logout = () => {
//         setUser(null)
//     }

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }