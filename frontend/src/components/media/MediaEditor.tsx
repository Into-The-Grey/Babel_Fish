// components/media/MediaEditor.tsx

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import type { MediaFile } from "./MediaTab";

interface MediaEditorProps {
    file: MediaFile;
    onSave: (editedFile: MediaFile, fileBlob?: Blob) => void;
    onCancel: () => void;
}

function sanitizeFileName(name: string) {
    // Replace invalid filename chars, trim, etc.
    return name
    // eslint-disable-next-line no-useless-escape
    .replace(/[^a-zA-Z0-9 _\-\.]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export default function MediaEditor({file, onSave, onCancel}: MediaEditorProps) {
    // Remove extension and add _Copy1 if not already appended
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    const [newName, setNewName] = useState(baseName.endsWith("_Copy1") ? baseName : baseName + "_Copy1");
    const [tags, setTags] = useState(file.tags?.join(", ") || "");
    const [rotate, setRotate] = useState(0); // only for images

    // Reference for image DOM manipulation (future cropping/filters)
    const imgRef = useRef<HTMLImageElement>(null);

    // File name validation (basic: no slashes or illegal chars)
    const validName = !!sanitizeFileName(newName);
    const validTags = tags.split(",").every((t) => t.trim().length <= 64 && !/[^\w\- ]/.test(t.trim())); // only alphanumeric/tag-friendly chars

    const handleRotate = (deg: number) => setRotate((prev) => prev + deg);

    // Save as new file object (for now, just metadata)
    const handleSave = () => {
        if (!validName || !validTags) return;
        onSave({
            ...file,
            name: sanitizeFileName(newName),
            tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
            // TODO: Image data/cropping/filters goes here
        });
    };

    let editorContent = null;
    if (file.type === "image") {
        editorContent = (
            <Box>
                <Box sx={{textAlign: "center", mb: 2}}>
                    <img
                        ref={imgRef}
                        src={file.url}
                        alt={file.name}
                        style={{
                            maxWidth: 480,
                            maxHeight: 320,
                            borderRadius: 6,
                            transform: `rotate(${rotate}deg)`,
                            transition: "transform 0.3s",
                            boxShadow: "0 2px 12px #42c8ff22",
                        }}
                    />
                </Box>
                <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
                    <Button variant="outlined" onClick={() => handleRotate(-90)} startIcon={<RotateLeftIcon />}>
                        Rotate Left
                    </Button>
                    <Button variant="outlined" onClick={() => handleRotate(90)} startIcon={<RotateRightIcon />}>
                        Rotate Right
                    </Button>
                    {/* Future: Crop/filter here */}
                </Stack>
            </Box>
        );
    } else if (file.type === "audio" || file.type === "video") {
        editorContent = (
            <Typography sx={{mt: 3, mb: 2}} color="warning.main">
                Editing audio/video coming soon.
                <br />
                Currently you can only rename or change tags.
            </Typography>
        );
    } else {
        editorContent = (
            <Typography sx={{mt: 3}} color="error.main">
                Unsupported media type for editing.
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                p: 3,
                background: "#1a212e",
                borderRadius: 2,
                boxShadow: 4,
                maxWidth: 520,
                mx: "auto",
                my: 4,
                textAlign: "center",
            }}
        >
            <Typography variant="h6" mb={2}>
                Edit: {file.name}
            </Typography>
            {editorContent}
            <Stack spacing={2} mt={2}>
                <TextField
                    label="New File Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    error={!validName}
                    helperText={
                        !validName ? "Filename invalid (alphanumeric, dash, underscore, space, period only)" : ""
                    }
                    fullWidth
                />
                <TextField
                    label="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    error={!validTags}
                    helperText={
                        !validTags
                            ? "Tags must be under 64 chars and only use letters, numbers, spaces, dashes or underscores"
                            : ""
                    }
                    fullWidth
                />
            </Stack>
            <Stack direction="row" spacing={2} mt={3} justifyContent="center">
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    startIcon={<SaveIcon />}
                    disabled={!validName || !validTags}
                >
                    Save Copy
                </Button>
                <Button variant="outlined" color="error" onClick={onCancel}>
                    Cancel
                </Button>
            </Stack>
        </Box>
    );
}
// This component allows users to edit media files (images, audio, video) by renaming, tagging, and rotating images.