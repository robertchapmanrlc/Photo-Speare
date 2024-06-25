"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { summarize } from "@/actions/summary";

import styles from "./imageUploader.module.css";

export default function ImageUploader() {
  const [file, setFile] = useState<(File & { preview: string }) | undefined>();
  const formRef = useRef<HTMLFormElement>(null);

  const onDropAccepted = useCallback(async (acceptedFiles: File[]) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(acceptedFiles[0]);
    if (formRef.current) {
      const input: HTMLInputElement | null = formRef.current.querySelector('input[type=file]');
      if (input) {
        input.files = dataTransfer.files;
      }
    }

    const preview = URL.createObjectURL(acceptedFiles[0]);

    setFile(
      Object.assign(acceptedFiles[0], {
        preview: preview,
      })
    );
  }, []);

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <form action={summarize} className={styles.dropzoneForm} ref={formRef}>
      <Dropzone onDropAccepted={onDropAccepted}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div {...getRootProps({ className: styles.dropzone })}>
            <input {...getInputProps({ type: "file", name: "image" })} />
            {!file &&
              (isDragActive ? (
                <p>Drop the files here</p>
              ) : (
                <p>Drag {"n"} drop files here, or click to select files</p>
              ))}
            {file && (
              <Image
                src={file.preview}
                className={styles.uploadedImage}
                alt="Uploaded Image"
                fill
                onLoad={() => URL.revokeObjectURL(file.preview)}
              />
            )}
          </div>
        )}
      </Dropzone>
      <button type="submit">Upload</button>
    </form>
  );
}
