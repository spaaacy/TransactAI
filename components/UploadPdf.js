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

  const handleSubmit = async () => {
    if (!pdfFile) {
      setErrorMessage("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const response = await fetch("/api/openai", {
        method: "GET",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to upload. Please try again.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    maxFiles: 1,
  });

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center w-80 m-auto rounded bg-light"
      style={{ padding: "20px" }}
    >
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <h5>Upload your bank statement</h5>
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
      {pdfFile && <p>{pdfFile.name}</p>}
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={handleSubmit}
      >
        Analyze Bank Statement
      </button>
    </div>
  );
};

export default UploadPDF;
