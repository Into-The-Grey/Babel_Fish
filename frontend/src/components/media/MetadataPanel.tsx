// components/media/MetadataPanel.tsx

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { MediaFile } from "./MediaTab";

// === Helper functions ===
function cleanFileName(name: string, existingNames: string[] = []) {
    let base = name
    // eslint-disable-next-line no-useless-escape
    .replace(/[^\w.\-]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/_+\./, ".")
    .replace(/^\.+/, "")
    .slice(0, 64);
    if (!base) base = "file";
    // Ensure unique (ignore case)
    let unique = base;
    let i = 1;
    const ext = base.includes(".") ? base.substring(base.lastIndexOf(".")) : "";
    const stem = base.replace(ext, "");
    while (existingNames.some((n) => n.toLowerCase() === unique.toLowerCase())) {
        unique = `${stem}_Copy${i}${ext}`;
        i++;
    }
    return unique;
}
function cleanTags(tags: string): string[] {
    return Array.from(
        new Set(
            tags
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean)
        )
    );
}

// === Panel Component ===
interface MetadataPanelProps {
    file: MediaFile;
    onChange: (changes: Partial<MediaFile>) => void;
    onClose: () => void;
    existingNames?: string[]; // pass media.map(m => m.name).filter(n => n !== file.name)
}
export default function MetadataPanel({file, onChange, onClose, existingNames = []}: MetadataPanelProps) {
    const [name, setName] = useState(file.name);
    const [tags, setTags] = useState(file.tags?.join(", ") || "");
    const [description, setDescription] = useState(file.description || "");
    const [author, setAuthor] = useState(file.author || "");
    const [custom, setCustom] = useState<Record<string, string>>(
        file.metadata ? Object.fromEntries(Object.entries(file.metadata).map(([k, v]) => [k, String(v)])) : {}
    );

    // Change handler for custom fields
    const handleCustomChange = (key: string, value: string) => {
        setCustom((prev) => ({...prev, [key]: value}));
    };

    // Clean and save
    const handleSave = () => {
        const cleanedName = cleanFileName(name, existingNames);
        const cleanedTags = cleanTags(tags);

        setName(cleanedName); // update UI if changed
        setTags(cleanedTags.join(", ")); // update UI if changed

        onChange({
            name: cleanedName,
            tags: cleanedTags,
            description: description.trim(),
            author: author.trim(),
            metadata: custom,
        });
        onClose();
    };

    return (
        <Box
            sx={{
                background: "#20232c",
                borderRadius: 3,
                p: 3,
                boxShadow: 4,
                minWidth: 350,
                mx: "auto",
                my: 3,
                color: "#d8eeff",
            }}
        >
            <Typography variant="h6" sx={{mb: 2, fontFamily: "var(--font-title)"}}>
                Edit Metadata
            </Typography>
            <Stack spacing={2}>
                <TextField label="File Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                <TextField
                    label="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    minRows={2}
                    fullWidth
                />
                <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth />
                {/* Render custom metadata fields if present */}
                {Object.keys(custom).map((key) => (
                    <TextField
                        key={key}
                        label={key}
                        value={custom[key]}
                        onChange={(e) => handleCustomChange(key, e.target.value)}
                        fullWidth
                    />
                ))}
                <Stack direction="row" spacing={2} mt={2}>
                    <Button variant="contained" color="success" onClick={handleSave}>
                        Save Metadata
                    </Button>
                    <Button variant="outlined" color="inherit" onClick={onClose}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
// This component allows editing metadata for media files, including name, tags, description, author, and custom fields.