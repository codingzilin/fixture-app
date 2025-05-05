/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        setMessage(`uploaded ${data.count} fixtures`);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setMessage(data.error || "upload failed");
      }
    } catch (error) {
      setMessage("upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4 font-mono'>Upload Fixtures CSV</h2>
      <div className='space-y-4'>
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
          className='font-mono'
        >
          {uploading ? "uploading..." : "Upload file"}
        </Button>
      </div>
      {message && (
        <p
          className={`mt-2 font-mono ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
