import { FileUploadOutlined } from "@mui/icons-material";
import axios from "axios";

export const FileUpload = () => (
  <>
    <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
      <FileUploadOutlined />
    </label>
    <input
      id="file-upload"
      type="file"
      accept=".xlsx,.xls"
      style={{ display: "none" }}
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          await axios.post("/api/girvi/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          console.error("No file selected");
        }
      }}
    />
  </>
);
