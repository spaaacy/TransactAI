"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadPDF = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = (acceptedFiles, rejectedFiles) => {
    setErrorMessage("");
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      setPdfFile(file);
    }
    if (rejectedFiles.length) {
      setErrorMessage("Please upload a valid PDF file.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    maxFiles: 1,
  });

  return (
    <div
      className="flex-align-center justify-content-center"
      style={{ padding: "20px" }}
    >
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <h1>Upload your bank statement</h1>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your PDF here...</p>
        ) : (
          <p>Drag and drop a PDF file here, or click to select one</p>
        )}
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => console.log(pdfFile)}
      >
        Analyze Bank Statement
      </button>
    </div>
  );
};

export default UploadPDF;
