import { useState, useEffect } from "react"

function AdminContacts() {
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    const API_URL = import.meta.env.VITE_API_URL

    // 🔹 cargar contactos
    useEffect(() => {
        fetch(`${API_URL}/leads/contacts`)
            .then(res => res.json())
            .then(data => setContacts(data))
    }, [])

    // 🔹 cargar mensajes del contacto
    async function loadMessages(contactId) {
        const res = await fetch(`${API_URL}/leads/contact/${contactId}`)
        const data = await res.json()
        setMessages(data)
    }

    // 🔹 seleccionar contacto
    function handleSelectContact(contact) {
        setSelectedContact(contact)
        loadMessages(contact.id)
    }

    // 🔹 enviar mensaje
    async function handleSendMessage() {
        if (!newMessage.trim() || !selectedContact) return

        await fetch(`${API_URL}/whatsapp/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: selectedContact.phone,
                message: newMessage
            })
        })

        // 🔄 recargar mensajes
        await loadMessages(selectedContact.id)
        setNewMessage("")
    }

    return (
        <div className="flex h-[80vh]">

            {/* 📋 LISTA CONTACTOS */}
            <div className="w-1/3 border-r overflow-y-auto">
                {contacts.map(c => (
                    <div
                        key={c.id}
                        onClick={() => handleSelectContact(c)}
                        className="p-3 cursor-pointer hover:bg-gray-100 border-b"
                    >
                        <p className="font-bold">{c.name}</p>
                        <p className="text-sm text-gray-500">{c.phone}</p>
                    </div>
                ))}
            </div>

            {/* 💬 CHAT */}
            <div className="w-2/3 flex flex-col">
                {selectedContact ? (
                    <>
                        {/* HEADER */}
                        <div className="p-3 border-b font-bold">
                            {selectedContact.name}
                        </div>

                        {/* MENSAJES */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`p-2 rounded max-w-xs ${
                                        msg.status === "sent"
                                            ? "bg-green-200 ml-auto"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {msg.message}
                                </div>
                            ))}
                        </div>

                        {/* INPUT */}
                        <div className="p-3 border-t flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Escribir mensaje..."
                                className="flex-1 border p-2 rounded"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-green-600 text-white px-4 rounded"
                            >
                                Enviar
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Seleccionar un contacto
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminContacts



// import { useEffect, useState } from "react";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function AdminContacts() {
//     const [contacts, setContacts] = useState([]);
//     const [selectedContact, setSelectedContact] = useState(null);
//     const [leads, setLeads] = useState([]);

//     useEffect(() => {
//         fetchContacts();
//     }, []);

//     const fetchContacts = async () => {
//         try {
//             const res = await fetch(`${API_URL}/leads/contacts`);
//             const data = await res.json();
//             setContacts(data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const fetchLeads = async (contactId) => {
//         try {
//             const res = await fetch(`${API_URL}/leads/contact/${contactId}`);
//             const data = await res.json();
//             setLeads(data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleSelectContact = (contact) => {
//         setSelectedContact(contact);
//         fetchLeads(contact.id);
//     };

//     return (
//         <div className="flex h-full">
//             {/* LISTA CONTACTOS */}
//             <div className="w-1/3 border-r p-4 overflow-y-auto">
//                 <h2 className="text-xl font-bold mb-4">Contactos</h2>
//                 {contacts.map((c) => (
//                     <div
//                         key={c.id}
//                         onClick={() => handleSelectContact(c)}
//                         className={`p-3 mb-2 rounded cursor-pointer border hover:bg-gray-100 ${selectedContact?.id === c.id ? "bg-gray-200" : ""
//                             }`}
//                     >
//                         <p className="font-semibold">{c.name || "Sin nombre"}</p>
//                         <p className="text-sm text-gray-600">{c.phone}</p>
//                     </div>
//                 ))}
//             </div>

//             {/* DETALLE / CHAT */}
//             <div className="w-2/3 p-4 flex flex-col">
//                 {!selectedContact ? (
//                     <p className="text-gray-500">Seleccioná un contacto</p>
//                 ) : (
//                     <>
//                         <div className="border-b pb-3 mb-3">
//                             <h2 className="text-xl font-bold">
//                                 {selectedContact.name || "Sin nombre"}
//                             </h2>
//                             <p className="text-sm text-gray-600">
//                                 {selectedContact.phone}
//                             </p>
//                         </div>

//                         <div className="flex-1 overflow-y-auto space-y-2">
//                             {leads.map((lead) => (
//                                 <div
//                                     key={lead.id}
//                                     className="p-3 rounded bg-gray-100"
//                                 >
//                                     <p className="text-sm">{lead.message}</p>
//                                     <span className="text-xs text-gray-500">
//                                         {new Date(lead.created_at).toLocaleString()}
//                                     </span>
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }
