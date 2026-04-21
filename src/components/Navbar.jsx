import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* LOGO */}
                <h1 className="text-xl font-bold">
                    Servicios Inmobiliarios
                </h1>
                {/* MENÚ CENTRAL (DESTACADO) */}
                <div className="hidden md:flex gap-8 text-lg font-semibold">
                    <Link className="hover:text-blue-400" to="/ventas">Ventas</Link>
                    <Link className="hover:text-blue-400" to="/alquiler">Alquiler</Link>
                    <Link className="hover:text-blue-400" to="/tasaciones">Tasaciones</Link>
                    <Link className="hover:text-blue-400" to="/contacto">Contacto</Link>
                </div>
                {/* LOGIN (DISCRETO) */}
                <div className="hidden md:flex">
                    <Link
                        to="/login"
                        className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                        title="Acceso administrador"
                    >
                        🔒 Admin
                    </Link>
                </div>

                {/* MOBILE BUTTON */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>
            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden flex flex-col px-4 pb-4 space-y-3 bg-gray-800">
                    <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
                    <Link to="/ventas" onClick={() => setMenuOpen(false)}>Ventas</Link>
                    <Link to="/alquiler" onClick={() => setMenuOpen(false)}>Alquiler</Link>
                    <Link to="/tasaciones" onClick={() => setMenuOpen(false)}>Tasaciones</Link>
                    <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
                    {/* más discreto */}
                    <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-400 text-sm"
                    >
                        🔒 
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar



// import { Link } from "react-router-dom"
// import { useState } from "react"

// function Navbar() {

//     const [menuOpen, setMenuOpen] = useState(false)

//     return (
//         <nav className="bg-gray-900 text-white">
//             <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//                 {/* Logo */}
//                 <h1 className="text-xl font-bold">
//                     Servicios Inmobiliarios
//                 </h1>

//                 {/* Desktop menu */}
//                 <div className="hidden md:flex space-x-6">
//                     <Link to="/">Inicio</Link>
//                     <Link to="/ventas">Ventas</Link>
//                     <Link to="/alquiler">Alquiler</Link>
//                     <Link to="/tasaciones">Tasaciones</Link>
//                     <Link to="/contacto">Contacto</Link>
//                     <Link to="/login">Ingresar</Link>
//                 </div>

//                 {/* Mobile button */}
//                 <button
//                     className="md:hidden text-2xl"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                 >
//                     ☰
//                 </button>
//             </div>

//             {/* Mobile menu */}
//             {menuOpen && (
//                 <div className="md:hidden flex flex-col px-4 pb-4 space-y-3 bg-gray-800">
//                     <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
//                     <Link to="/ventas" onClick={() => setMenuOpen(false)}>Ventas</Link>
//                     <Link to="/alquiler" onClick={() => setMenuOpen(false)}>Alquiler</Link>
//                     <Link to="/tasaciones" onClick={() => setMenuOpen(false)}>Tasaciones</Link>
//                     <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
//                     <Link to="/login" onClick={() => setMenuOpen(false)}>Ingresar</Link>
//                 </div>
//             )}
//         </nav>
//     )
// }

// export default Navbar


