import React, { useState } from "react";
import axios from "axios";

function GalleryUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post("http://localhost:5000/api/public/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title"
        value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description"
        value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default GalleryUpload;
