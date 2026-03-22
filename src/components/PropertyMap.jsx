import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"

function PropertyMap({ geometry }) {

    if (!geometry) return null

    return (
        <MapContainer
            style={{ height: "250px", width: "100%" }}
            center={[-31.4, -64.2]} // 👈 fallback Córdoba
            zoom={16}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={geometry} />
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
//             style={{ height: "200px", width: "100%" }}
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