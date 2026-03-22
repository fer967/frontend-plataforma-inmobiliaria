import PropertyList from "../components/PropertyList"

function Ventas() {

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">
                Propiedades en venta
            </h1>
            <PropertyList operationType="venta" />
        </div>
    )
}

export default Ventas