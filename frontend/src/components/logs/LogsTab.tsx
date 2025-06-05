// components/logs/LogsTab.tsx

import { Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function LogsTab() {
    const [logs, setLogs] = useState<string[]>([]);
    const [logsLoading, setLogsLoading] = useState(false);
    const [logSearch, setLogSearch] = useState("");

    // Dummy log fetch (replace with real API call later)
    const fetchLogs = async () => {
        setLogsLoading(true);
        const data = [
            `[${new Date().toISOString()}] WebApp started`,
            `[${new Date().toISOString()}] User admin logged in`,
            `[${new Date().toISOString()}] New payload submitted`,
        ];
        setTimeout(() => {
            setLogs(data);
            setLogsLoading(false);
        }, 400);
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <Box>
            <Stack direction="row" spacing={2} mb={2}>
                <TextField
                    label="Search Logs"
                    value={logSearch}
                    onChange={(e) => setLogSearch(e.target.value)}
                    size="small"
                    sx={{
                        fontFamily: "var(--font-main)",
                        input: {color: "#e4edff", fontWeight: 500},
                    }}
                />
                <Button
                    variant="outlined"
                    onClick={fetchLogs}
                    sx={{
                        fontFamily: "var(--font-title)",
                        fontWeight: 600,
                        color: "#85f3ff",
                        borderColor: "#85f3ff",
                    }}
                >
                    Refresh
                </Button>
            </Stack>
            {logsLoading ? (
                <Box sx={{textAlign: "center", mt: 4}}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper
                    sx={{
                        p: 2,
                        minHeight: 300,
                        fontFamily: "var(--font-mono)",
                        fontSize: 16,
                        background: "rgba(26,26,32,0.90)",
                        borderRadius: 3,
                        color: "#bafff5",
                        boxShadow: "0 1.5px 8px #000b",
                    }}
                >
                    {logs.length === 0 ? (
                        <Typography color="textSecondary">No logs found.</Typography>
                    ) : (
                        <Box>
                            {logs
                            .filter((log) => (logSearch ? log.toLowerCase().includes(logSearch.toLowerCase()) : true))
                            .map((log, i) => (
                                <Typography
                                    key={i}
                                    sx={{
                                        fontFamily: "var(--font-mono)",
                                        color: log.includes("error") ? "#ffadad" : "#bafff5",
                                        fontSize: 15.5,
                                    }}
                                >
                                    {log}
                                </Typography>
                            ))}
                        </Box>
                    )}
                </Paper>
            )}
        </Box>
    );
}
