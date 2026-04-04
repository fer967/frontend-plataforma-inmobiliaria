import { FaWhatsapp } from "react-icons/fa"

function WhatsAppButton() {
    const phone = "5493516184580"
    const message = "Hola, quisiera consultar por una propiedad"
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="
        fixed
        bottom-6
        right-6
        bg-green-500
        hover:bg-green-600
        text-white
        p-4
        rounded-full
        shadow-lg
        text-2xl
        transition
        "
        >
            <FaWhatsapp />
        </a>
    )
}

export default WhatsAppButton