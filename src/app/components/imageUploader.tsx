"use client";

import { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import styles from "./imageUploader.module.css";
import Image from "next/image";

export default function ImageUploader() {
  const [file, setFile] = useState<(File & { preview: string }) | undefined>();

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <Dropzone onDropAccepted={onDropAccepted}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          {!file &&
            (isDragActive ? (
              <p>Drop the files here</p>
            ) : (
              <p>Drag {"n"} drop files here, or click to select files</p>
            ))}
          {file && (
            <img
              src={file.preview}
              alt="Uploaded image"
              className={styles.uploadedImage}
              onLoad={() => URL.revokeObjectURL(file.preview)}
            />
          )}
        </div>
      )}
    </Dropzone>
  );
}
