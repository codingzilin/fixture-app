/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("please select file firstly");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Uploaded ${data.count} fixtures`);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setMessage(data.error || "Upload failed");
      }
    } catch (error) {
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='max-w-xl mx-auto mt-8 p-9 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 font-mono'>Upload Fixtures CSV</h2>
      <div className='space-y-6'>
        <Input
          type='file'
          accept='.csv'
          onChange={handleFileChange}
          disabled={uploading}
          ref={fileInputRef}
          className='font-mono'
        />
        <Button
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          className='font-mono w-full px-6 py-3'
        >
          <IoCloudUploadOutline />
          {uploading ? "uploading..." : "Upload file"}
        </Button>
      </div>
      {message && (
        <p
          className={`mt-4 font-mono ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
