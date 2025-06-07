// components/trash/TrashTab.tsx

import { Box, Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

// Replace with your actual types (MediaFile, Payload, etc.)
export interface TrashItem {
    id: string;
    name: string;
    type: "media" | "payload" | "doc" | "other";
    deletedAt: string; // ISO
}

const demoTrash: TrashItem[] = [
    { id: "1", name: "test_photo.jpg", type: "media", deletedAt: new Date().toISOString() },
    { id: "2", name: "Payload X", type: "payload", deletedAt: new Date().toISOString() },
    { id: "3", name: "2023-cheatsheet.pdf", type: "doc", deletedAt: new Date().toISOString() },
];

export default function TrashTab() {
    const [trash, setTrash] = useState<TrashItem[]>(demoTrash);
    const [selected, setSelected] = useState<string[]>([]);
    const [search, setSearch] = useState("");

    const handleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleRestore = () => {
        setTrash((prev) => prev.filter((item) => !selected.includes(item.id)));
        setSelected([]);
        // TODO: Push back to original table/resource
    };

    const handleDelete = () => {
        setTrash((prev) => prev.filter((item) => !selected.includes(item.id)));
        setSelected([]);
        // TODO: Actually delete from backend
    };

    const handleClearAll = () => {
        setTrash([]);
        setSelected([]);
        // TODO: Actually clear backend trash
    };

    const filteredTrash = trash.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: "auto" }}>
            <Typography variant="h4" sx={{ fontFamily: "var(--font-title)", mb: 2 }}>
                🗑️ Trash & Recovery
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2} alignItems="center">
                <TextField
                    size="small"
                    placeholder="Search deleted items"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearAll}
                    disabled={trash.length === 0}
                    startIcon={<DeleteForeverIcon />}
                >
                    Clear All
                </Button>
            </Stack>
            {filteredTrash.length === 0 ? (
                <Typography color="textSecondary" sx={{ mt: 5 }}>
                    Nothing in the trash!
                </Typography>
            ) : (
                <Paper sx={{ p: 2, background: "#231a2c", borderRadius: 3 }}>
                    {filteredTrash.map((item) => (
                        <Stack
                            key={item.id}
                            direction="row"
                            alignItems="center"
                            gap={2}
                            sx={{
                                borderBottom: "1px solid #35345c33",
                                py: 1.5,
                                px: 2,
                                background: selected.includes(item.id)
                                    ? "rgba(242, 242, 50, 0.10)"
                                    : "inherit",
                                "&:hover": { background: "#252d4166" },
                            }}
                            onClick={() => handleSelect(item.id)}
                        >
                            <Checkbox
                                checked={selected.includes(item.id)}
                                onChange={() => handleSelect(item.id)}
                                size="small"
                                sx={{ mr: 1 }}
                            />
                            <Typography sx={{ flex: 1, fontWeight: 600 }}>
                                {item.name}
                            </Typography>
                            <Typography sx={{ color: "#aaa", fontSize: 13 }}>
                                {item.type.toUpperCase()}
                            </Typography>
                            <Typography sx={{ color: "#bebed1", fontSize: 12, ml: 2 }}>
                                {new Date(item.deletedAt).toLocaleString()}
                            </Typography>
                        </Stack>
                    ))}
                    <Stack direction="row" spacing={2} mt={2}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleRestore}
                            disabled={selected.length === 0}
                            startIcon={<RestoreFromTrashIcon />}
                        >
                            Restore
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                            disabled={selected.length === 0}
                            startIcon={<DeleteForeverIcon />}
                        >
                            Delete Forever
                        </Button>
                    </Stack>
                </Paper>
            )}
        </Box>
    );
}
