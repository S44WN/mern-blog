import axios from "axios";

export const uploadImage = async (img) => {
  let imgURL = null;

  await axios
    .get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
    .then(async ({ data: { uploadURL } }) => {
      // upload image to s3
      await axios({
        method: "PUT",
        url: uploadURL,
        data: img,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        // get the image URL
        .then(() => {
          imgURL = uploadURL.split("?")[0];
        });
    })

    .catch((err) => {
      console.log(err.message);
    });

  return imgURL;
};
