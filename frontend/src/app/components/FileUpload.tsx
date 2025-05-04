"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setUploadStatus(`File selected: ${selectedFile.name}`);
    } else {
      setUploadStatus("Please select a CSV file");
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading file:", (file as File).name);
    }
  };

  return (
    <div>
      <Input
        type='file'
        accept='.csv'
        onChange={handleFileChange}
        id='csv-upload'
      />
      <label htmlFor='csv-upload'>Choose CSV File</label>
      {uploadStatus && <p>{uploadStatus}</p>}
      <Button onClick={handleUpload} disabled={!file}>
        Upload File
      </Button>
    </div>
  );
}
