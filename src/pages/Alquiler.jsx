import PropertyList from "../components/PropertyList"

function Alquiler() {

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">
                Propiedades en alquiler
            </h1>
            <PropertyList operationType="alquiler" />
        </div>
    )
}

export default Alquiler


