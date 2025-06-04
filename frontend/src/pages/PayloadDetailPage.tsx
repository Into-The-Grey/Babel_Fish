import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Chip, CircularProgress, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { downloadPayload, fetchPayload } from "../api/payloads";

export default function PayloadDetailPage() {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    interface Payload {
        id: number;
        title: string;
        description?: string;
        platform: string;
        author?: string;
        tags?: string[];
        created_at?: string;
        code: string;
        // Add other fields as needed
    }

    const [payload, setPayload] = useState<Payload | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError("");
        fetchPayload(Number(id))
        .then(setPayload)
        .catch(() => setError("Failed to load payload."))
        .finally(() => setLoading(false));
    }, [id]);

    const handleCopy = async () => {
        if (payload?.code) {
            await navigator.clipboard.writeText(payload.code);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 1200);
        }
    };

    const handleDownload = async () => {
        try {
            const blob = await downloadPayload(Number(id));
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${payload?.title || "payload"}.txt`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch {
            setError("Failed to download file.");
        }
    };

    if (loading) {
        return (
            <Box sx={{maxWidth: 800, mx: "auto", p: 2, textAlign: "center"}}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !payload) {
        return (
            <Box sx={{maxWidth: 800, mx: "auto", p: 2, textAlign: "center"}}>
                <Typography color="error">{error || "Payload not found."}</Typography>
                <Button sx={{mt: 2}} variant="outlined" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{maxWidth: 800, mx: "auto", p: 2}}>
            <Typography variant="h4" gutterBottom>
                Payload Details
            </Typography>
            <Paper sx={{p: 3, mb: 2}}>
                <Stack spacing={1}>
                    <Typography variant="subtitle1">
                        <strong>Title:</strong> {payload.title}
                    </Typography>
                    {payload.description && (
                        <Typography>
                            <strong>Description:</strong> {payload.description}
                        </Typography>
                    )}
                    <Typography>
                        <strong>Platform:</strong> {payload.platform}
                    </Typography>
                    {payload.author && (
                        <Typography>
                            <strong>Author:</strong> {payload.author}
                        </Typography>
                    )}
                    {payload.tags && payload.tags.length > 0 && (
                        <Box>
                            <strong>Tags:</strong>{" "}
                            {payload.tags.map((tag: string) => (
                                <Chip key={tag} label={tag} size="small" sx={{mr: 0.5}} />
                            ))}
                        </Box>
                    )}
                    <Typography>
                        <strong>Created:</strong>{" "}
                        {payload.created_at ? new Date(payload.created_at).toLocaleString() : "N/A"}
                    </Typography>
                </Stack>

                <Box sx={{mt: 3}}>
                    <Typography sx={{mb: 1}}>
                        <strong>Payload Code:</strong>
                    </Typography>
                    <Paper
                        sx={{
                            background: "#181818",
                            color: "#fff",
                            fontFamily: "monospace",
                            fontSize: 14,
                            p: 2,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all",
                            mb: 2,
                            position: "relative",
                        }}
                        elevation={1}
                    >
                        {payload.code}
                        <Box sx={{position: "absolute", top: 8, right: 8, display: "flex", gap: 1}}>
                            <Tooltip title="Copy code">
                                <IconButton
                                    color={copySuccess ? "success" : "default"}
                                    size="small"
                                    onClick={handleCopy}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Download code">
                                <IconButton color="primary" size="small" onClick={handleDownload}>
                                    <DownloadIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Paper>
                    {copySuccess && (
                        <Typography color="success.main" sx={{mb: 1}}>
                            Copied!
                        </Typography>
                    )}
                </Box>

                <Box sx={{display: "flex", gap: 2, mt: 2}}>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/edit/${payload.id}`)}
                    >
                        Edit
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
