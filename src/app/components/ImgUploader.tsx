"use client";

import { useState } from "react";
import { useImgStore } from "../_store/imgStore";

export default function ImgUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { setImgData } = useImgStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // 로컬 미리보기
    }
  };

  async function handleUpload(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      setUploadedUrl(`${process.env.NEXT_PUBLIC_API_URL}/${result?.path}`);

      setImgData(
        result?.filename,
        `${process.env.NEXT_PUBLIC_API_URL}/${result?.path}`
      );
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <img src={previewUrl} alt="preview" style={{ width: 150 }} />
      )}
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
      {uploadedUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={uploadedUrl} alt="uploaded" style={{ width: 150 }} />
        </div>
      )}
    </div>
  );
}
