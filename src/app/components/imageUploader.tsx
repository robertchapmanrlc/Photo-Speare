"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Dropzone, { FileRejection } from "react-dropzone";
import SubmitButton from "./submitButton";
import { getPoem } from "@/actions/summary";

import styles from "./imageUploader.module.css";
import toast from "react-hot-toast";

export default function ImageUploader() {
  const [file, setFile] = useState<(File & { preview: string }) | undefined>();
  const [poem, setPoem] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);


  const onDropRejected = useCallback(async (rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 1) {
      toast.error('Only one image allowed');
      return;
    }

    const rejectedFile = rejectedFiles[0].file;
    if (rejectedFile.size >= 5000000) {
      toast.error('Image must be less than 5MB');
      return;
    }
  }, []);

  const onDropAccepted = useCallback(async (acceptedFiles: File[]) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(acceptedFiles[0]);
    if (formRef.current) {
      const input: HTMLInputElement | null =
        formRef.current.querySelector("input[type=file]");
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
    <div className={styles.dropzoneContent}>
      <form
        action={async (formData: FormData) => {
          const returnedPoem = await getPoem(formData);

          if (returnedPoem.poem) {
            setPoem(returnedPoem.poem);
          } else if (returnedPoem.error) {
            toast.error(returnedPoem.error);
          }
        }}
        className={styles.dropzoneForm}
        ref={formRef}
      >
        <Dropzone
          onDropAccepted={onDropAccepted}
          maxFiles={1}
          onDropRejected={onDropRejected}
          accept={{ "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] }}
          maxSize={5000000}
        >
          {({ getRootProps,getInputProps, isDragActive }) => (
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
        <SubmitButton />
      </form>
      <p className={styles.poem}>{poem}</p>
    </div>
  );
}
