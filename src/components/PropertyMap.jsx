import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet"
import { useEffect } from "react"
import L from "leaflet"

function FitBounds({ geometry }) {
    const map = useMap()

    useEffect(() => {
        if (!geometry) return
        const layer = L.geoJSON(geometry)
        map.fitBounds(layer.getBounds())
    }, [geometry, map])
    return null
}

function PropertyMap({ geometry }) {
    if (!geometry) return null

    return (
        <div className="h-64 w-full mt-2">
            <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={[-31.4, -64.18]} // fallback Córdoba
                zoom={13}
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
                />
                <FitBounds geometry={geometry} />
            </MapContainer>
        </div>
    )
}

export default PropertyMap












