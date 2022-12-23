type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  return (
    <div>
      <div className="relative bg-gray-100">
        <div className="mx-auto w-96">
          {images.map((image, index) => (
            <div key={`${image}-${index}`}>
              <input
                className="sr-only peer"
                type="radio"
                name="carousel"
                id={`carousel-${index}`}
                defaultChecked
              />
              {/* content #1 */}
              <div className="absolute z-0 transition-all duration-300 transform -translate-x-1/2 bg-white rounded-lg shadow-lg opacity-0 w-96 top-1/2 left-1/2 peer-checked:opacity-100 peer-checked:z-10">
                <img className="h-64 rounded-t-lg w-96" src={image} alt="" />
                {/* controls */}
                {images.length > 1 && (
                  <div className="absolute z-20 flex justify-between w-full top-1/2">
                    <label
                      htmlFor={`carousel-${
                        (index - 1 + images.length) % images.length
                      }`}
                      className="inline-block text-red-600 cursor-pointer -translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                    <label
                      htmlFor={`carousel-${
                        (index + 1 + images.length) % images.length
                      }`}
                      className="inline-block text-red-600 cursor-pointer translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
