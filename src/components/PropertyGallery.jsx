import { useState } from "react"

function PropertyGallery({ mainImage, images }) {

    const allImages = [mainImage, ...images]
    const [current, setCurrent] = useState(mainImage)

    function nextImage() {
        const index = allImages.indexOf(current)
        const nextIndex = (index + 1) % allImages.length
        setCurrent(allImages[nextIndex])
    }

    function prevImage() {
        const index = allImages.indexOf(current)
        const prevIndex = (index - 1 + allImages.length) % allImages.length
        setCurrent(allImages[prevIndex])
    }

    return (
        <div>
            {/* imagen principal */}
            <div className="relative">
                <img
                    src={current}
                    className="w-full h-[400px] object-cover rounded-2xl"
                />
                {/* flechas */}
                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded"
                        >
                            ‹
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>
            {/* thumbnails */}
            <div className="flex gap-2 mt-3 overflow-x-auto">
                {allImages.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        onClick={() => setCurrent(img)}
                        className={`w-24 h-16 object-cover rounded cursor-pointer border-2 ${
                            current === img
                                ? "border-blue-500"
                                : "border-transparent"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default PropertyGallery



// import { useState } from "react"

// function PropertyGallery({ mainImage, images }) {

//     const [selectedImage, setSelectedImage] = useState(mainImage)

//     return (
//         <div>
//             <img
//                 src={selectedImage}
//                 className="w-full h-96 object-cover rounded-lg"
//             />

//             <div className="flex gap-3 mt-4 overflow-x-auto">
//                 {images.map((img, index) => (
//                     <img
//                         key={index}
//                         src={img}
//                         onClick={() => setSelectedImage(img)}
//                         className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }
// export default PropertyGallery