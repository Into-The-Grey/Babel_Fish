// components/docs/DocsTab.tsx

import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Stack,
    TextField,
    Typography,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
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

    // Remove a doc from list (for now, just this session)
    const handleRemove = (doc: DocFile) => {
        setDocs((prev) => prev.filter((d) => d.url !== doc.url));
        if (selected?.url === doc.url) setSelected(null);
    };

    // Filter docs by name
    const filtered = docs
    .filter((d) => d.name.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Box>
            <Stack direction="row" gap={2} mb={2} alignItems="center">
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
                <Typography sx={{ml: 2, color: "#7af9ff", fontWeight: 500, fontFamily: "var(--font-mono)"}}>
                    {filtered.length} / {docs.length} PDFs
                </Typography>
            </Stack>
            {filtered.length === 0 ? (
                <Typography color="textSecondary">No PDFs found.</Typography>
            ) : (
                <List>
                    {filtered.map((doc) => (
                        <ListItem
                            disablePadding
                            key={doc.url}
                            sx={{
                                bgcolor: selected?.url === doc.url ? "rgba(26,244,255,0.10)" : undefined,
                                borderRadius: 2,
                                mb: 0.5,
                                transition: "background 0.15s",
                            }}
                            secondaryAction={
                                <Tooltip title="Remove from library">
                                    <IconButton edge="end" onClick={() => handleRemove(doc)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <ListItemButton
                                selected={selected?.url === doc.url}
                                onClick={() => setSelected(doc)}
                                sx={{borderRadius: 2}}
                            >
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
