import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ImageGallery from "react-image-gallery";

import styles from "react-image-gallery/styles/css/image-gallery.css";

import Camera from "~/components/shared/camera";
import Button from "~/components/shared/button";

type Props = {
  images: string[];
};

const Image: React.FC<Props> = ({ images }) => {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [currentImages, setCurrentImages] = useState<string[]>(images ?? []);
  const [tempImages, setTempImages] = useState<string[]>([]);

  const refImg = useRef<any>(null);

  const { t } = useTranslation(["common"]);

  const handleAddImage = (image: any) => {
    setTempImages([...tempImages, image]);
  };

  const handleRemoveImage = () => {
    const currentImageLength = currentImages.length;
    const tempImageLength = tempImages.length;
    const totalLength = currentImageLength + tempImageLength;

    // reverse index because of react-image-gallery reverse image
    const currentIndex = totalLength - 1 - refImg?.current?.getCurrentIndex();

    if (currentIndex < currentImageLength) {
      setCurrentImages(
        currentImages.filter((_: any, index: any) => index !== currentIndex)
      );
    } else {
      setTempImages(
        tempImages.filter(
          (_, index) => index !== currentIndex - currentImageLength
        )
      );
    }
  };

  return (
    <>
      {/* {currentImages.length !== 0 && tempImages.length !== 0 && ( */}
      <div hidden={currentImages.length === 0 && tempImages.length === 0}>
        <ImageGallery
          ref={refImg}
          items={[...currentImages, ...tempImages]
            .reverse()
            .map((image: string) => ({
              original: image,
              // thumbnail: image,
            }))}
          showBullets={true}
        />
      </div>
      {/* )} */}
      {
        <Camera
          showCamera={showCamera}
          setShowCamera={setShowCamera}
          addImage={handleAddImage}
        />
      }
      <div className="flex justify-center mt-4 space-x-8">
        <Button
          type="button"
          color="blue"
          className="w-24"
          onClick={() => setShowCamera(true)}
        >
          {t("add")}
        </Button>
        <Button
          type="button"
          color="red"
          className="w-24"
          onClick={handleRemoveImage}
        >
          {t("delete")}
        </Button>
      </div>
      <input id="images" name={"images"} type="hidden" value={currentImages} />
      <input
        id="new_images"
        name="new_images"
        type="hidden"
        value={tempImages}
      />
    </>
  );
};

export default Image;

export { styles };
