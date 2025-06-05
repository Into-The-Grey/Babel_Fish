// components/media/MediaUploader.tsx

import { Button, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
import type { MediaFile } from "./MediaTab";

interface MediaUploaderProps {
    onUpload: (files: MediaFile[]) => void;
}

const ACCEPTED_MIME = [
    "image/",
    "audio/",
    "video/",
    // add more as needed
];

export default function MediaUploader({onUpload}: MediaUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [uploadCount, setUploadCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Simple validation/check for type
    const getType = (type: string) => {
        if (type.startsWith("image")) return "image";
        if (type.startsWith("audio")) return "audio";
        if (type.startsWith("video")) return "video";
        return "other";
    };

    const isSupported = (file: File) => ACCEPTED_MIME.some((mime) => file.type.startsWith(mime));

    const handleFiles = (files: FileList | File[]) => {
        const arr = Array.from(files);
        const newMedia: MediaFile[] = [];
        let rejected = 0;
        const now = Date.now();

        arr.forEach((file, idx) => {
            if (!isSupported(file)) {
                rejected++;
                // You could auto-convert here later
                return;
            }
            newMedia.push({
                id: `${now}-${idx}`,
                name: file.name,
                type: getType(file.type),
                url: URL.createObjectURL(file),
            });
        });

        if (newMedia.length > 0) {
            onUpload(newMedia);
            setUploadCount(newMedia.length);
        }
        setError(rejected > 0 ? `Skipped ${rejected} unsupported file(s).` : null);
        // Always reset input for Chrome re-upload issue
        if (inputRef.current) inputRef.current.value = "";
    };

    // Drag & Drop handlers
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>, on: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(on);
    };

    return (
        <Paper
            elevation={dragActive ? 10 : 3}
            sx={{
                p: 2,
                border: dragActive ? "2.5px solid #17edfc" : "1.5px solid #273343",
                borderRadius: 2,
                boxShadow: dragActive ? "0 0 24px #16e3fa99" : 3,
                background: dragActive ? "rgba(25,245,255,0.06)" : "#181a22",
                transition: "all 0.12s",
                mb: 1,
                minWidth: 200,
                minHeight: 82,
                textAlign: "center",
                outline: dragActive ? "2.5px dashed #16e3fa" : "none",
                cursor: "pointer",
            }}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragOver={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDrop={handleDrop}
        >
            <Button
                variant="contained"
                component="label"
                sx={{
                    fontWeight: 700,
                    fontFamily: "var(--font-title)",
                    my: 1,
                }}
            >
                Upload Media
                <input
                    hidden
                    ref={inputRef}
                    type="file"
                    multiple
                    accept="image/*,audio/*,video/*"
                    onChange={(e) => {
                        if (e.target.files) handleFiles(e.target.files);
                    }}
                />
            </Button>
            <Typography variant="body2" sx={{color: "#8de3ff"}}>
                Drag &amp; drop images, audio, or video here!
                <br />
                <span style={{fontSize: 13, color: "#c3faff"}}>
                    {uploadCount > 0 && `Added ${uploadCount} file${uploadCount !== 1 ? "s" : ""} in last upload.`}
                    {error && <span style={{color: "#ff9696", marginLeft: 6}}>{error}</span>}
                </span>
            </Typography>
        </Paper>
    );
}
// This component allows users to upload media files (images, audio, video) via drag-and-drop or file selection.