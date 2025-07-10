// import { FileUploadOutlined } from "@mui/icons-material";
// import axios from "axios";

// export const FileUpload = () => (
//   <>
//     <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
//       <FileUploadOutlined />
//     </label>
//     <input
//       id="file-upload"
//       type="file"
//       accept=".xlsx,.xls"
//       style={{ display: "none" }}
//       onChange={async (e) => {
//         const file = e.target.files?.[0];
//         if (file) {
//           const formData = new FormData();
//           formData.append("file", file);
//           await axios.post("/api/girvi/upload", formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//         } else {
//           console.error("No file selected");
//         }
//       }}
//     />
//   </>
// );

import React, { useState } from "react";
import { FileUploadOutlined } from "@mui/icons-material";
import axios from "axios";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post("http://localhost:3001/girvi/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        alert("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      }
    } else {
      alert("No file selected");
    }
  };

  return (
    <>
      <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        <FileUploadOutlined />
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx,.xls"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={handleSubmit}>Upload</button>
    </>
  );
};

export default FileUpload;
