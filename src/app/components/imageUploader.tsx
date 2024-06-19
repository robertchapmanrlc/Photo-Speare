'use client'

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from './imageUploader.module.css';

export default function ImageUploader() {
  const onDrop = useCallback((acceptedFiles: unknown) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return <div {...getRootProps()} className={styles.dropzone}>
    <input {...getInputProps()} />
    {isDragActive ? <p>Drop the files here</p> : <p>Drag {'n'} drop files here, or click to select files</p>}
  </div>;
}
