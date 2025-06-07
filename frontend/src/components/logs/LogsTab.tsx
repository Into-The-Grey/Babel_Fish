// components/logs/LogsTab.tsx

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";

type LogSeverity = "all" | "error" | "warning" | "info";

interface LogEntry {
    text: string;
    severity: LogSeverity;
    timestamp: string; // ISO
}

const demoLogs: LogEntry[] = [
    {text: "WebApp started", severity: "info", timestamp: new Date().toISOString()},
    {text: "User admin logged in", severity: "info", timestamp: new Date().toISOString()},
    {text: "New payload submitted", severity: "info", timestamp: new Date().toISOString()},
    {text: "Disk space low", severity: "warning", timestamp: new Date().toISOString()},
    {text: "Database connection failed", severity: "error", timestamp: new Date().toISOString()},
];

export default function LogsTab() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [logsLoading, setLogsLoading] = useState(false);
    const [logSearch, setLogSearch] = useState("");
    const [severity, setSeverity] = useState<LogSeverity>("all");
    const [timestampFormat, setTimestampFormat] = useState<"iso" | "local">("local");

    useEffect(() => {
        setLogsLoading(true);
        // Replace with backend call later
        setTimeout(() => {
            setLogs(demoLogs);
            setLogsLoading(false);
        }, 350);
    }, []);

    // Filtering logic
    const filteredLogs = logs
    .filter((log) => severity === "all" || log.severity === severity)
    .filter((log) => log.text.toLowerCase().includes(logSearch.toLowerCase()));

    // Copy/export logic
    const logsToExport = filteredLogs
    .map(
        (log) =>
            `[${
                timestampFormat === "iso" ? log.timestamp : new Date(log.timestamp).toLocaleString()
            }] [${log.severity.toUpperCase()}] ${log.text}`
    )
    .join("\n");

    const handleCopy = () => {
        navigator.clipboard.writeText(logsToExport);
    };

    const handleExport = () => {
        const blob = new Blob([logsToExport], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "babel_fish_logs.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box>
            <Stack direction={{xs: "column", md: "row"}} spacing={2} mb={2} alignItems="center">
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
                <ToggleButtonGroup
                    value={severity}
                    exclusive
                    onChange={(_, val) => val && setSeverity(val)}
                    size="small"
                    sx={{mx: 2}}
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="info">Info</ToggleButton>
                    <ToggleButton value="warning">Warning</ToggleButton>
                    <ToggleButton value="error">Error</ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    value={timestampFormat}
                    exclusive
                    onChange={(_, val) => val && setTimestampFormat(val)}
                    size="small"
                    sx={{mx: 2}}
                >
                    <ToggleButton value="local">Local</ToggleButton>
                    <ToggleButton value="iso">ISO</ToggleButton>
                </ToggleButtonGroup>
                <Button startIcon={<ContentCopyIcon />} variant="outlined" onClick={handleCopy}>
                    Copy
                </Button>
                <Button startIcon={<DownloadIcon />} variant="outlined" onClick={handleExport}>
                    Export
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
                    {filteredLogs.length === 0 ? (
                        <Typography color="textSecondary">No logs found.</Typography>
                    ) : (
                        <Box>
                            {filteredLogs.map((log, i) => (
                                <Typography
                                    key={i}
                                    sx={{
                                        fontFamily: "var(--font-mono)",
                                        color:
                                            log.severity === "error"
                                                ? "#ffadad"
                                                : log.severity === "warning"
                                                ? "#ffe29a"
                                                : "#bafff5",
                                        fontSize: 15.5,
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    [
                                    {timestampFormat === "iso"
                                        ? log.timestamp
                                        : new Date(log.timestamp).toLocaleString()}
                                    ] [{log.severity.toUpperCase()}] {log.text}
                                </Typography>
                            ))}
                        </Box>
                    )}
                </Paper>
            )}
        </Box>
    );
}
