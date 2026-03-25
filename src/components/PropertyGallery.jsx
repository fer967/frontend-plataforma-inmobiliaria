import { useState } from "react"

function PropertyGallery({ images }) {

    const [selectedImage, setSelectedImage] = useState(images[0])

    return (
        <div>
            <img
                src={selectedImage}
                className="w-full h-96 object-cover rounded-lg"
            />
            <div className="flex gap-3 mt-4 overflow-x-auto">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        onClick={() => setSelectedImage(img)}
                        className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80"
                    />
                ))}
            </div>
        </div>
    )
}

export default PropertyGallery