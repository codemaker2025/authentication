import React, { useRef, useState, useEffect } from "react";
import { useField } from "informed";

const CustomFileInput = ({ name, label, required, accept, validate }) => {
  const parseAcceptProp = (accept) => {
    const extensions = accept?.split(",").map((ext) => ext.trim().toLowerCase());
    const mimeTypes = extensions
      ?.map((ext) => {
        if (ext.startsWith(".")) {
          switch (ext) {
            case ".pdf":
              return "application/pdf";
            case ".doc":
              return "application/msword";
            case ".docx":
              return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            default:
              return null;
          }
        }
        return ext;
      })
      .filter(Boolean);
    return { extensions, mimeTypes };
  };

  const { extensions, mimeTypes } = parseAcceptProp(accept);

  const defaultValidateFile = (value) => {
    if (required && !value) {
      return "This field is required";
    }

    if (value instanceof File) {
      const fileExtension = "." + value.name.split(".").pop().toLowerCase();
      const fileMimeType = value.type;

      if (
        (mimeTypes.length && !mimeTypes.includes(fileMimeType)) ||
        (extensions.length && !extensions.includes(fileExtension))
      ) {
        return `Only ${accept.replaceAll(",", ", ")} files are allowed`;
      }
    }
    return undefined;
  };

  const { fieldState, fieldApi, render } = useField({
    name,
    required,
    validate: validate || defaultValidateFile,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const { setValue, setTouched } = fieldApi;
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [prevValue, setPrevValue] = useState(fieldState.value);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      resetFileInput();
      setErrorMessage(required ? "This field is required" : null);
      return;
    }

    const validationResult = (validate || defaultValidateFile)(file);

    if (validationResult) {
      setErrorMessage(validationResult);
      setTouched(true);
      resetFileInput();
    } else {
      setErrorMessage(null);
      setValue(file);
      setTouched(true);
      setPrevValue(file);
      setFileType(file.type);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const resetFileInput = () => {
    setValue(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFileType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPrevValue(null);
  };

  useEffect(() => {
    if (!fieldState.value && fieldState.touched && fieldState.error) {
      setErrorMessage(fieldState.error);
    }
  }, [fieldState.value, fieldState.touched, fieldState.error]);

  if (
    !fieldState.value &&
    prevValue &&
    fileInputRef.current &&
    fileInputRef.current.value
  ) {
    fileInputRef.current.value = "";
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }

  return render(
    <div style={{ marginBottom: "16px" }}>
      <label
        htmlFor={name}
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        onBlur={() => setTouched(true)}
        id={name}
        ref={fileInputRef}
        style={{
          display: "block",
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          color: "#333",
          fontSize: "14px",
        }}
      />
      {fieldState.value && (
        <div style={{ marginTop: "8px" }}>
          <p style={{ margin: "0 0 4px", color: "#333" }}>
            Uploaded File:{" "}
            <span style={{ fontWeight: "bold" }}>{fieldState.value.name}</span>
          </p>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#007bff",
              textDecoration: "underline",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            View File
          </a>

          {previewUrl && fileType === "application/pdf" && (
            <div>
              <p style={{ margin: "0 0 4px", color: "#333" }}>PDF Preview:</p>
              <iframe
                src={previewUrl}
                title="PDF Preview"
                style={{
                  width: "100%",
                  height: "400px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}
        </div>
      )}
      {errorMessage && (
        <small style={{ color: "red", marginTop: "4px", display: "block" }}>
          {errorMessage}
        </small>
      )}
    </div>
  );
};

export default CustomFileInput;
