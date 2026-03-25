import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import { useEffect, useRef } from "react"
import L from "leaflet"

function PropertyMap({ geometry }) {
    const mapRef = useRef()

    useEffect(() => {
        if (geometry && mapRef.current) {
            const layer = L.geoJSON(geometry)
            mapRef.current.fitBounds(layer.getBounds())
        }
    }, [geometry])

    if (!geometry) return null

    return (
        <div className="h-48 md:h-64 w-full mt-2">
            <MapContainer
                style={{ height: "100%", width: "100%" }}
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            >
                <TileLayer
                    attribution='© OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <GeoJSON
                    data={geometry}
                    style={{
                        color: "red",
                        weight: 3,
                        fillOpacity: 0.3
                    }}
                    onEachFeature={(feature, layer) => {
                        layer.bindPopup("Parcela IDECOR")
                    }}
                />

            </MapContainer>
        </div>
    )
}

export default PropertyMap



// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
// import { useEffect } from "react"

// function PropertyMap({ latitude, longitude }) {

//     if (!latitude || !longitude) {
//         console.log("NO COORDS:", latitude, longitude)
//         return null
//     }

//     function ResizeMap() {
//         const map = useMap()
//         useEffect(() => {
//             setTimeout(() => {
//                 map.invalidateSize()
//             }, 100)
//         }, [map])
//         return null
//     }

//     return (
//         <MapContainer
//             center={[latitude, longitude]}
//             zoom={17}
//             className="h-[300px] w-full rounded mt-2"
//         >
//             <ResizeMap />
//             <TileLayer
//                 attribution='&copy; OpenStreetMap'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={[latitude, longitude]}>
//                 <Popup>Ubicación de la propiedad</Popup>
//             </Marker>
//         </MapContainer>
//     )
// }

// export default PropertyMap





