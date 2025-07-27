import React, { useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Button, Typography, IconButton } from "@mui/material";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "20px",
      }}
    >
      {file && (
        <>
          <IconButton onClick={handleRemoveFile} size="small">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ display: "inline", mr: 2 }}>{file.name}</Typography>
        </>
      )}
      <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        <DriveFolderUploadIcon fontSize="large" />
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx,.xls"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ display: "block", mt: 2 }}
        disabled={!file}
        onClick={handleSubmit}
      >
        Upload
      </Button>
    </div>
  );
};

export default FileUpload;
