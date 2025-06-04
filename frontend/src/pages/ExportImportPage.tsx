import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exportPayloads, importPayloads, restorePayloads } from "../api/payloads";

export default function ExportImportPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState(false);
    const [importing, setImporting] = useState(false);
    const [restoring, setRestoring] = useState(false);
    const [alert, setAlert] = useState<{type: "success" | "error"; message: string} | null>(null);

    // EXPORT
    const handleExport = async () => {
        setLoading(true);
        setAlert(null);
        try {
            const blob = await exportPayloads();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `babel-fish-payloads-export-${new Date()
            .toISOString()
            .slice(0, 19)
            .replace(/[:T]/g, "-")}.json`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            setAlert({type: "success", message: "Exported payloads successfully!"});
        } catch {
            setAlert({type: "error", message: "Export failed. Try again."});
        }
        setLoading(false);
    };

    // IMPORT
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImporting(true);
        setAlert(null);
        try {
            await importPayloads(file);
            setAlert({type: "success", message: "Imported payloads successfully!"});
        } catch {
            setAlert({type: "error", message: "Import failed. Please check your file."});
        }
        setImporting(false);
        // Reset file input so user can upload again
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // RESTORE
    const handleRestore = async () => {
        setRestoring(true);
        setAlert(null);
        try {
            await restorePayloads();
            setAlert({type: "success", message: "Restored soft-deleted payloads!"});
        } catch {
            setAlert({type: "error", message: "Restore failed."});
        }
        setRestoring(false);
    };

    return (
        <Box sx={{maxWidth: 700, mx: "auto", p: 2}}>
            <Typography variant="h4" gutterBottom>
                Export / Import Payloads
            </Typography>
            <Paper sx={{p: 3, mb: 2}}>
                <Stack spacing={3}>
                    {alert && <Alert severity={alert.type}>{alert.message}</Alert>}

                    {/* EXPORT */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button variant="contained" color="primary" onClick={handleExport} disabled={loading}>
                            {loading ? <CircularProgress size={20} /> : "Export All as JSON"}
                        </Button>
                    </Stack>

                    {/* IMPORT */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <input
                            type="file"
                            accept="application/json"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={importing}
                        >
                            {importing ? <CircularProgress size={20} /> : "Import from JSON"}
                        </Button>
                        <Typography variant="body2" color="textSecondary">
                            (Uploads a .json file of payloads)
                        </Typography>
                    </Stack>

                    {/* RESTORE */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button variant="outlined" color="warning" onClick={handleRestore} disabled={restoring}>
                            {restoring ? <CircularProgress size={20} /> : "Restore Soft-Deleted"}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
            <Button variant="outlined" onClick={() => navigate(-1)}>
                Back
            </Button>
        </Box>
    );
}
