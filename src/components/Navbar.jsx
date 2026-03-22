import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false)

    return (

        <nav className="bg-gray-900 text-white">

            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* Logo */}
                <h1 className="text-xl font-bold">
                    Inmobiliaria
                </h1>

                {/* Desktop menu */}
                <div className="hidden md:flex space-x-6">

                    <Link to="/">Inicio</Link>

                    <Link to="/ventas">Ventas</Link>

                    <Link to="/alquiler">Alquiler</Link>

                    <Link to="/tasaciones">Tasaciones</Link>

                    <Link to="/contacto">Contacto</Link>

                    <Link to="/login">Ingresar</Link>

                    <Link to="/admin">Admin</Link>

                </div>

                {/* Mobile button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

            </div>

            {/* Mobile menu */}

            {menuOpen && (

                <div className="md:hidden flex flex-col px-4 pb-4 space-y-3 bg-gray-800">

                    <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>

                    <Link to="/ventas" onClick={() => setMenuOpen(false)}>Ventas</Link>

                    <Link to="/alquiler" onClick={() => setMenuOpen(false)}>Alquiler</Link>

                    <Link to="/tasaciones" onClick={() => setMenuOpen(false)}>Tasaciones</Link>

                    <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>

                    <Link to="/login" onClick={() => setMenuOpen(false)}>Ingresar</Link>

                    <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>

                </div>

            )}

        </nav>

    )
}

export default Navbar


// import { Link } from "react-router-dom"

// function Navbar() {
//     return (
//         <nav className="bg-gray-900 text-white p-4 flex justify-between">
//             <h1 className="text-xl font-bold">
//                 Inmobiliaria
//             </h1>
//             <div className="space-x-4">
//                 <Link to="/">Inicio</Link>
//                 <Link to="/ventas">Ventas</Link>
//                 <Link to="/alquiler">Alquiler</Link>
//                 <Link to="/tasaciones">Tasaciones</Link>
//                 <Link to="/contacto">Contacto</Link>
//                 <Link to="/login">Ingresar</Link>
//                 <Link to="/admin">Admin</Link>
//                 <Link to="/property/:id">Ver Propiedad</Link>
//             </div>
//         </nav>
//     )
// }

// export default Navbar