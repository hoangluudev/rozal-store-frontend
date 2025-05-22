import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  ImageList,
  ImageListItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Close, CloudUpload } from "@mui/icons-material";
import { useUploadImageApi } from "@/hooks/api";

const UploadMultipleImagesComponent = ({
  value = [],
  onChange,
  maxFiles = 5,
  uploadFolder = "example",
}) => {
  const { uploadMultipleImages } = useUploadImageApi();
  const { uploadMultipleImagePending, imageUrls } = useUploadImageApi().state;

  const [isMultipleFilesError, setIsMultipleFilesError] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (imageUrls.length && selectedFiles.length > 0) {
      const newUploadedFiles = [...value, ...imageUrls];
      onChange(newUploadedFiles);
      setSelectedFiles([]);
    }
  }, [imageUrls, onChange, selectedFiles, value]);

  const onChangeImage = (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      onChange([]);
    } else {
      const newFiles = [...acceptedFiles].slice(0, maxFiles - value.length);
      setSelectedFiles(newFiles);
      uploadMultipleImages(newFiles, uploadFolder);
    }
  };

  const deleteImage = (index) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
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

      if (acceptedFiles.length + value.length > maxFiles) {
        setIsMultipleFilesError(true);
      } else if (rejectedFiles.length === 0 && acceptedFiles.length > 0) {
        onChangeImage(acceptedFiles);
      }
    },
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 1048576,
    maxFiles,
  });
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const srcset = (image, size, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  const itemData = value.map((url, index) => ({
    img: url,
    title: `Image ${index + 1}`,
    rows: 1,
    cols: 1,
  }));

  return (
    <Box
      p={2}
      border={isDragActive ? 3 : 2}
      borderColor={isDragActive ? "primary.main" : "grey.500"}
      sx={{ borderStyle: isDragActive ? "dashed" : "solid" }}
    >
      {isMultipleFilesError && (
        <Typography color="error" mt={1} textAlign="center">
          {`Only ${maxFiles} images can be uploaded.`}
        </Typography>
      )}
      {fileSizeError && (
        <Typography color="error" mt={1} textAlign="center">
          {"One or more images exceed the size limit of 1MB."}
        </Typography>
      )}
      {fileTypeError && (
        <Typography color="error" mt={1} textAlign="center">
          {" Only JPEG/PNG files are allowed."}
        </Typography>
      )}
      {!value.length && !uploadMultipleImagePending && (
        <Box {...getRootProps()} textAlign="center" sx={{ cursor: "pointer" }}>
          <input {...getInputProps()} />
          <IconButton color="primary">
            <CloudUpload fontSize="large" />
          </IconButton>
          <Typography>
            {isDragActive
              ? "Drag & drop your images here..."
              : "Drag & drop your images here"}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: "italic", fontSize: "small" }}
          >
            (Only *.JPEG/PNG below 1MB images will be accepted)
          </Typography>
        </Box>
      )}
      <ImageList
        sx={{
          width: "100%",
          height: "auto",
        }}
        variant="quilted"
        cols={isLgUp ? 4 : isMdUp ? 3 : isSmUp ? 2 : 1}
        rowHeight={isSmUp ? 150 : 200}
        gap={8}
      >
        {itemData.map((item, index) => (
          <ImageListItem key={index} cols={item.cols} rows={item.rows}>
            <img
              {...srcset(item.img, isSmUp ? 150 : 200, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              }}
            />
            <IconButton
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "white",
                border: "1px solid grey",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
              }}
              onClick={() => deleteImage(index)}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
          </ImageListItem>
        ))}
        {uploadMultipleImagePending && (
          <ImageListItem cols={1} rows={1}>
            <Box
              position="relative"
              bgcolor="grey.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          </ImageListItem>
        )}
        {value.length > 0 &&
          value.length < maxFiles &&
          !uploadMultipleImagePending && (
            <ImageListItem cols={1} rows={1} {...getRootProps()}>
              <Box
                border={2}
                borderColor={isDragActive ? "primary.main" : "grey.500"}
                textAlign="center"
                sx={{ cursor: "pointer" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <input {...getInputProps()} />
                <IconButton color="primary">
                  <CloudUpload fontSize="large" />
                </IconButton>
              </Box>
            </ImageListItem>
          )}
      </ImageList>
    </Box>
  );
};
export default UploadMultipleImagesComponent;
