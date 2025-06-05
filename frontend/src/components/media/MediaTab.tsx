// components/media/MediaTab.tsx

import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import DuplicatesManager from "./DuplicatesManager";
import MediaEditor from "./MediaEditor";
import MediaList from "./MediaList";
import MediaUploader from "./MediaUploader";
import MediaViewer from "./MediaViewer";
import MetadataPanel from "./MetadataPanel";

// Demo types, adjust as you build out logic
export interface MediaFile {
    id: string;
    name: string;
    type: "image" | "video" | "audio" | "other";
    url: string;
    tags?: string[];
    faces?: string[];
    metadata?: Record<string, unknown>;
    duplicate?: boolean;
    editedVersions?: MediaFile[];
    originalId?: string;
    description?: string;
    author?: string;
}

export default function MediaTab() {
    const [media, setMedia] = useState<MediaFile[]>([]);
    const [selected, setSelected] = useState<MediaFile | null>(null);
    const [editing, setEditing] = useState<MediaFile | null>(null);
    const [showDups, setShowDups] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);

    // Upload handler (shared by button & drag/drop)
    const handleUpload = (newFiles: MediaFile[]) => {
        setMedia((prev) => [...prev, ...newFiles]);
    };

    // Drag-and-drop logic
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files ?? []);
        if (files.length) {
            const mediaFiles: MediaFile[] = files.map((file, idx) => ({
                id: `${Date.now()}-${idx}`,
                name: file.name,
                type: file.type.startsWith("image")
                    ? "image"
                    : file.type.startsWith("audio")
                    ? "audio"
                    : file.type.startsWith("video")
                    ? "video"
                    : "other",
                url: URL.createObjectURL(file),
            }));
            handleUpload(mediaFiles);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // "Edit Complete" keeps filetype and extension the same
    const handleEditComplete = (edited: MediaFile, fileBlob?: Blob) => {
        if (fileBlob) {
            console.log("Edited fileBlob:", fileBlob); // Temporary usage to avoid unused warning
        }
        setMedia((prev) => [...prev, edited]);
        setEditing(null);
    };

    return (
        <Box
            ref={dropRef}
            sx={{p: {xs: 2, md: 4}, position: "relative"}}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <Typography variant="h4" sx={{fontFamily: "var(--font-title)", mb: 2}}>
                📸 Media Library
            </Typography>

            <Stack direction={{xs: "column", md: "row"}} spacing={3} mb={3} alignItems="flex-start">
                {/* Uploader */}
                <MediaUploader onUpload={handleUpload} />

                {/* "Find Duplicates" Button */}
                <Button
                    variant="outlined"
                    sx={{fontWeight: 600, fontFamily: "var(--font-title)", minWidth: 160}}
                    onClick={() => setShowDups(true)}
                >
                    Find Duplicates
                </Button>
            </Stack>

            <Divider sx={{my: 2}} />

            {/* Main Media List/Library */}
            <MediaList media={media} onSelect={setSelected} onEdit={setEditing} />

            {/* Metadata/Tags/People for selected media */}
            {selected && (
                <MetadataPanel
                    file={selected}
                    onChange={(changes) => {
                        setMedia((prev) => prev.map((f) => (f.id === selected.id ? {...f, ...changes} : f)));
                        setSelected((prev) => (prev ? {...prev, ...changes} : prev));
                    }}
                    onClose={() => setSelected(null)}
                />
            )}

            {/* Inline media viewer */}
            {selected && (
                <MediaViewer file={selected} onClose={() => setSelected(null)} onEdit={() => setEditing(selected)} />
            )}

            {/* Inline media editor */}
            {editing && (
                <MediaEditor
                    file={editing}
                    onSave={(edited, fileBlob) => handleEditComplete(edited, fileBlob)}
                    onCancel={() => setEditing(null)}
                />
            )}

            {/* Duplicates Manager */}
            {showDups && (
                <DuplicatesManager
                    duplicates={media}
                    onClose={() => setShowDups(false)}
                    onDelete={(ids: string[]) => setMedia((prev) => prev.filter((f) => !ids.includes(f.id)))}
                    onRestore={(ids: string[]) => {
                        setMedia((prev) => prev.map((f) => (ids.includes(f.id) ? {...f, duplicate: false} : f)));
                    }}
                />
            )}

            {/* Overlay for drag-and-drop feedback */}
            {/* Optional: Add a visible dropzone/fade-in overlay on drag if you want */}
        </Box>
    );
}
// This is a simplified version of a media management tab that includes uploading, viewing, editing, and managing duplicates.
