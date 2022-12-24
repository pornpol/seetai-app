import { useState, useRef, Fragment } from "react";
import { Camera } from "react-camera-pro";
import type { CameraType } from "react-camera-pro";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  showCamera: boolean;
  setShowCamera: (showCamera: boolean) => void;
};

const Component: React.FC<Props> = ({ showCamera, setShowCamera }) => {
  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<any>();

  const handleTakePhoto = () => {
    setImage(camera?.current?.takePhoto());
  };

  return (
    <Transition appear show={showCamera} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setShowCamera(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {/* <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title> */}
                <div className="mt-2">
                  <div className="w-full">
                    <div className="w-full">
                      {!image && (
                        <Camera
                          ref={camera}
                          aspectRatio={4 / 3}
                          facingMode="environment"
                          errorMessages={{
                            noCameraAccessible:
                              "No camera device accessible. Please connect your camera or try a different browser.",
                            permissionDenied:
                              "Permission denied. Please refresh and give camera permission.",
                            switchCamera:
                              "It is not possible to switch camera to different one because there is only one video device accessible.",
                            canvas: "Canvas is not supported.",
                          }}
                        />
                      )}
                    </div>
                    {image && (
                      <img src={image} alt="Taken" className="w-full" />
                    )}
                    <div className="flex w-full mt-2 justify-items-center">
                      <button
                        onClick={handleTakePhoto}
                        className="w-24 h-24 m-auto bg-gray-400 border-8 border-gray-200 rounded-full hover:bg-gray-500"
                      >
                        {/* {image ? "Retake photo" : "Take photo"} */}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8 space-x-8">
                  <button
                    type="button"
                    disabled={!image}
                    className="w-48 px-4 py-2 font-bold text-white rounded enabled:bg-blue-500 enabled:hover:bg-blue-700 disabled:bg-blue-200"
                    onClick={() => {
                      setShowCamera(false);
                      setImage(null);
                    }}
                  >
                    Save & Close
                  </button>
                  <button
                    type="button"
                    className="w-48 px-4 py-2 font-bold text-white bg-red-500 rounded enabled:hover:bg-red-700"
                    onClick={() => {
                      setShowCamera(false);
                      setImage(null);
                    }}
                  >
                    Cancel & Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Component;
