"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";
import Image from "next/image";

const UploadPDF = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = () => setModal(!modal);

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
    setLoading(true);
    if (!pdfFile) {
      setErrorMessage("Please upload a PDF file.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/openai", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const jsonObject = JSON.parse(data.results);
        setResults(jsonObject.recurring_subscriptions);
        toggle();
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to upload. Please try again.");
    }
    setLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    maxFiles: 1,
  });

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center w-80 vh-100 m-auto rounded bg-light"
      style={{ padding: "20px" }}
    >
      <Image
        src="/images/transactAI-logo.png"
        alt="logo"
        width={150}
        height={150}
        className="mx-auto"
        style={{ marginTop: "-150px !important" }}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <h5 className="mb-2">Upload your bank statement</h5>
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
        className="btn btn-dark mt-2"
        onClick={handleSubmit}
      >
        {loading ? (
          <Spinner className="mx-5" size="sm" color="light" />
        ) : (
          "Analyze Bank Statement"
        )}
      </button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Detected Subscriptions</ModalHeader>
        <ModalBody>
          {results &&
            results.map((subscription) => (
              // <div key={subscription.description}>
              //   <h5>{subscription.description}</h5>
              //   <p>{subscription.price}</p>
              // </div>
              <Card
                style={{ fontSize: "0.7rem" }}
                key={subscription.description}
                className="mb-3"
              >
                <CardHeader style={{ fontSize: "0.7rem" }}>
                  {subscription.description}
                </CardHeader>
                <ListGroup flush>
                  <ListGroupItem
                    style={{ fontSize: "0.7rem" }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {subscription.price}
                    <Button style={{ fontSize: "0.7rem" }} color="danger">
                      Cancel
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            ))}
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ fontSize: "0.7rem" }}
            color="secondary"
            onClick={toggle}
            className="mx-auto"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UploadPDF;
