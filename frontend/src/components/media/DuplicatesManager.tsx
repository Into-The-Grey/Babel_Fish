// components/media/DuplicatesManager.tsx

import { Avatar, Box, Button, Checkbox, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import type { MediaFile } from "./MediaTab";

interface DuplicatesManagerProps {
    duplicates: MediaFile[]; // Files flagged as dups (should include only dups, but we'll filter)
    onDelete: (ids: string[]) => void;
    onRestore: (ids: string[]) => void;
    onClose: () => void;
}

export default function DuplicatesManager({duplicates, onDelete, onRestore, onClose}: DuplicatesManagerProps) {
    // Filter only the ones flagged as duplicates
    const dups = duplicates.filter((f) => f.duplicate);

    const [selected, setSelected] = useState<string[]>([]);

    const allSelected = selected.length === dups.length && dups.length > 0;

    const toggleSelect = (id: string) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const handleSelectAll = () => {
        if (allSelected) {
            setSelected([]);
        } else {
            setSelected(dups.map((f) => f.id));
        }
    };

    const handleDelete = () => {
        if (selected.length > 0) onDelete(selected);
        setSelected([]);
    };

    const handleRestore = () => {
        if (selected.length > 0) onRestore(selected);
        setSelected([]);
    };

    return (
        <Box
            sx={{
                background: "#2c2534",
                borderRadius: 3,
                p: 3,
                boxShadow: 4,
                mx: "auto",
                my: 3,
                color: "#ffeedd",
                minWidth: 400,
                maxWidth: 700,
            }}
        >
            <Typography variant="h6" sx={{mb: 2, fontFamily: "var(--font-title)"}}>
                Possible Duplicates
            </Typography>
            <Typography sx={{mb: 2, fontFamily: "var(--font-main)", fontSize: 15}}>
                Found: <b>{dups.length}</b> &nbsp;&nbsp; | &nbsp;&nbsp; Selected: <b>{selected.length}</b>
            </Typography>
            {dups.length === 0 ? (
                <Typography color="textSecondary">No duplicates found!</Typography>
            ) : (
                <Paper sx={{mb: 2, background: "rgba(0,0,0,0.15)", p: 1}}>
                    <Stack direction="row" alignItems="center" gap={2} sx={{px: 2, py: 1}}>
                        <Checkbox
                            checked={allSelected}
                            indeterminate={selected.length > 0 && !allSelected}
                            onChange={handleSelectAll}
                            size="small"
                            sx={{mr: 1}}
                        />
                        <Typography sx={{flex: 1, fontWeight: 600, fontSize: 14, color: "#15f6ff"}}>
                            Select All
                        </Typography>
                    </Stack>
                    {dups.map((file) => (
                        <Stack
                            key={file.id}
                            direction="row"
                            alignItems="center"
                            gap={2}
                            sx={{
                                borderBottom: "1px solid #35345c55",
                                py: 1,
                                px: 2,
                                background: selected.includes(file.id) ? "rgba(22, 242, 250, 0.07)" : "inherit",
                                cursor: "pointer",
                                "&:hover": {background: "#183a4e44"},
                            }}
                            onClick={() => toggleSelect(file.id)}
                        >
                            <Checkbox
                                checked={selected.includes(file.id)}
                                onChange={() => toggleSelect(file.id)}
                                size="small"
                                sx={{mr: 1}}
                            />
                            {/* Preview thumbnail for images */}
                            {file.type === "image" ? (
                                <Avatar src={file.url} variant="rounded" sx={{width: 40, height: 40, mr: 1}} />
                            ) : (
                                <Avatar variant="rounded" sx={{width: 40, height: 40, mr: 1, bgcolor: "#292"}} />
                            )}
                            <Typography sx={{flex: 1, fontWeight: 600}}>{file.name}</Typography>
                            <Typography sx={{fontSize: 13, color: "#aaa"}}>{file.type}</Typography>
                        </Stack>
                    ))}
                </Paper>
            )}
            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="error" disabled={selected.length === 0} onClick={handleDelete}>
                    Delete Selected
                </Button>
                <Button variant="contained" color="success" disabled={selected.length === 0} onClick={handleRestore}>
                    Restore Selected
                </Button>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                    Close
                </Button>
            </Stack>
        </Box>
    );
}
// This component manages duplicates found in media files, allowing users to select, delete, or restore them.