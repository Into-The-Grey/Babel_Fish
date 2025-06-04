import { Box, Button, List, ListItem, ListItemButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DocViewer from "./DocViewer";

interface DocFile {
    file: File;
    name: string;
    url: string;
}

export default function DocsTab() {
    const [docs, setDocs] = useState<DocFile[]>([]);
    const [selected, setSelected] = useState<DocFile | null>(null);
    const [search, setSearch] = useState("");

    // Handle file uploads
    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const newDocs: DocFile[] = Array.from(files).map((file) => ({
            file,
            name: file.name,
            url: URL.createObjectURL(file),
        }));
        setDocs((prev) => [...prev, ...newDocs]);
    };

    // Filter docs by name
    const filtered = docs.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <Box>
            <Stack direction="row" gap={2} mb={2}>
                <Button variant="contained" component="label" sx={{fontWeight: 700, fontFamily: "var(--font-title)"}}>
                    Upload PDF(s)
                    <input
                        hidden
                        type="file"
                        accept="application/pdf"
                        multiple
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                </Button>
                <TextField
                    size="small"
                    placeholder="Search by filename"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Stack>
            {filtered.length === 0 ? (
                <Typography color="textSecondary">No PDFs found.</Typography>
            ) : (
                <List>
                    {filtered.map((doc) => (
                        <ListItem disablePadding key={doc.url}>
                            <ListItemButton onClick={() => setSelected(doc)}>
                                <Typography>{doc.name}</Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Inline PDF viewer */}
            {selected && (
                <Box mt={4}>
                    <DocViewer url={selected.url} onClose={() => setSelected(null)} />
                </Box>
            )}
        </Box>
    );
}
