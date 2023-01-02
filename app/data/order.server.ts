import fs from "fs";

export const saveImage = (base64: string, id: string) => {
  const fileName = `./public/images/orders/${id}-${Date.now()}.jpg`;
  fs.writeFileSync(fileName, base64, "base64");
  return fileName.replace("./public", "");
};

export const deleteImage = (path: string) => {
  try {
    fs.unlinkSync(path.replace("/images", "./public/images"));
  } catch (error) {
    console.log(error);
  }
};
