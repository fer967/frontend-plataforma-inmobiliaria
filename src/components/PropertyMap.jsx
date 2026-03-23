import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect } from "react"

function PropertyMap({ latitude, longitude }) {

    if (!latitude || !longitude) {
        console.log("NO COORDS:", latitude, longitude)
        return null
    }

    function ResizeMap() {
        const map = useMap()
        useEffect(() => {
            setTimeout(() => {
                map.invalidateSize()
            }, 100)
        }, [map])
        return null
    }

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={17}
            className="h-[300px] w-full rounded mt-2"
        >
            <ResizeMap />
            <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
                <Popup>Ubicación de la propiedad</Popup>
            </Marker>
        </MapContainer>
    )
}

export default PropertyMap



// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
// import "leaflet/dist/leaflet.css"

// function PropertyMap({ geometry }) {

//     if (!geometry) return null

//     return (
//         <MapContainer
//             style={{ height: "250px", width: "100%" }}
//             center={[-31.4, -64.2]} // 👈 fallback Córdoba
//             zoom={16}
//         >
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <GeoJSON data={geometry} />
//         </MapContainer>
//     )
// }

// export default PropertyMap


