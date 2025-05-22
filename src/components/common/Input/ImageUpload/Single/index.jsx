import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
  Chip,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
  Close,
  Error as ErrorIcon,
  CameraAlt as CameraAltIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { useUploadImageApi } from "@/hooks/api";
import DividerComponent from "@/components/common/UI/Divider";

const UploadSingleImageComponent = ({
  value = null,
  onChange,
  uploadFolder = "example",
}) => {
  const { uploadSingleImage } = useUploadImageApi();
  const { imageUrl, uploadImagePending } = useUploadImageApi().state;

  const [isMultipleFilesError, setIsMultipleFilesError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (imageUrl && selectedFile) {
      onChange(imageUrl);
      setSelectedFile(null);
    }
  }, [imageUrl, onChange, selectedFile]);

  const onChangeImage = (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      onChange(null);
    } else {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        uploadSingleImage(file, uploadFolder);
      }
    }
  };

  const deleteImage = () => {
    onChange("");
    setSelectedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      setFileSizeError(false);
      setIsMultipleFilesError(false);
      setFileTypeError(false);
      rejectedFiles.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            setFileSizeError(true);
          }
          if (err.code === "file-invalid-type") {
            setFileTypeError(true);
          }
          if (err.code === "too-many-files") {
            setIsMultipleFilesError(true);
          }
        });
      });

      if (acceptedFiles.length > 0) {
        onChangeImage(acceptedFiles);
      }
    },
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 1048576,
    maxFiles: 1,
    multiple: false,
    noClick: true,
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChangeImage([file]);
    }
  };

  return (
    <Box p={2}>
      <Box mb={2}>
        <Typography
          color={
            isMultipleFilesError
              ? "error"
              : value
              ? "textPrimary"
              : "textSecondary"
          }
          display="flex"
          alignItems="center"
        >
          {isMultipleFilesError && <ErrorIcon fontSize="small" />}
          Only 1 image can be uploaded.
        </Typography>
        <Typography
          color={
            fileSizeError ? "error" : value ? "textPrimary" : "textSecondary"
          }
          display="flex"
          alignItems="center"
        >
          {fileSizeError && <ErrorIcon fontSize="small" />}
          Image size must not exceed the 1MB limit.
        </Typography>
        <Typography
          color={
            fileTypeError ? "error" : value ? "textPrimary" : "textSecondary"
          }
          display="flex"
          alignItems="center"
        >
          {fileTypeError && <ErrorIcon fontSize="small" />}
          Only JPEG/PNG files are allowed.
        </Typography>
      </Box>
      <Box
        {...getRootProps()}
        textAlign="center"
        sx={{
          border: isDragActive ? "2px dashed grey" : "2px solid grey",
          borderRadius: 1,
          width: "100%",
          height: 250,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.200",
          padding: "10px",
        }}
      >
        <input {...getInputProps()} style={{ display: "none" }} />
        {uploadImagePending ? (
          <CircularProgress />
        ) : value ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",

              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                backgroundColor: "white",
                border: "1px solid grey",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
              }}
              onClick={deleteImage}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
            <img
              src={value}
              alt="Uploaded"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ) : (
          <>
            <CameraAltIcon fontSize="large" color="action" />
            <Typography mt={1}>Drag & drop image here to upload</Typography>
            <DividerComponent>
              <Chip label="OR" size="small" sx={{ my: 1 }} />
            </DividerComponent>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Browse file
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UploadSingleImageComponent;
