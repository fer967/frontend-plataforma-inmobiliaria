import { useEffect, useState } from "react"
import { getProperties } from "../services/api"
import PropertyCard from "./PropertyCard"

function PropertyList({ operationType }) {
    const [properties, setProperties] = useState([])

    useEffect(() => {
        loadProperties()
    }, [])

    async function loadProperties() {
        const data = await getProperties()
        setProperties(data)
    }

    const filteredProperties = operationType
        ? properties.filter(
            property => property.operation_type === operationType
        )
        : properties

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
                <PropertyCard
                    key={property.id}
                    property={property}
                />
            ))}
        </div>
    )
}

export default PropertyList