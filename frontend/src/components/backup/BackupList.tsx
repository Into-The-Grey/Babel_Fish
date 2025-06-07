// components/backup/BackupList.tsx

import { Box, Button, Paper, Stack, Typography } from "@mui/material";

export interface Backup {
    id: string;
    name: string;
    date: string;
    size: string;
    type: string;
    status?: string;
}

interface BackupListProps {
    backups?: Backup[];
    onRestore?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const DEMO_BACKUPS: Backup[] = [
    {
        id: "1",
        name: "Nightly-Snapshot-07-02",
        date: new Date(Date.now() - 86400000).toLocaleString(),
        size: "142 MB",
        type: "Auto",
        status: "OK",
    },
    {
        id: "2",
        name: "Manual-Config-07-01",
        date: new Date(Date.now() - 2 * 86400000).toLocaleString(),
        size: "130 MB",
        type: "Manual",
        status: "OK",
    },
    {
        id: "3",
        name: "System-Test",
        date: new Date(Date.now() - 3 * 86400000).toLocaleString(),
        size: "148 MB",
        type: "Test",
        status: "Corrupted",
    },
];

export default function BackupList({backups = DEMO_BACKUPS, onRestore, onDelete}: BackupListProps) {
    return (
        <Box sx={{my: 3}}>
            <Typography variant="h6" sx={{fontFamily: "var(--font-title)", mb: 1}}>
                Backup List
            </Typography>
            {backups.length === 0 ? (
                <Typography color="textSecondary">No backups found.</Typography>
            ) : (
                <Paper sx={{p: 2, background: "#23243a"}}>
                    <Stack spacing={2}>
                        {backups.map((b) => (
                            <Box
                                key={b.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    borderBottom: "1px solid #2e3858",
                                    pb: 1,
                                    mb: 1,
                                }}
                            >
                                <Box>
                                    <Typography sx={{fontWeight: 600, fontFamily: "var(--font-main)"}}>
                                        {b.name}
                                    </Typography>
                                    <Typography sx={{color: "#8de3ff", fontSize: 13}}>
                                        {b.date} • {b.size} • {b.type}
                                    </Typography>
                                    {b.status && (
                                        <Typography
                                            sx={{
                                                color: b.status === "OK" ? "#6effa2" : "#ffbaba",
                                                fontSize: 12,
                                                mt: 0.5,
                                            }}
                                        >
                                            Status: {b.status}
                                        </Typography>
                                    )}
                                </Box>
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        size="small"
                                        onClick={() => onRestore?.(b.id)}
                                    >
                                        Restore
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => onDelete?.(b.id)}
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Paper>
            )}
        </Box>
    );
}
// Replace DEMO_BACKUPS with real backend data when ready!
