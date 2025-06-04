import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    convertPayload,
    createPayload,
    detectPayloadFormat,
    fetchPayload,
    listPayloadConversions,
    updatePayload,
} from "../api/payloads";

const PLATFORM_OPTIONS = ["Windows", "Linux", "MacOS", "Android", "iOS", "Other"];

export default function PayloadFormPage() {
    const navigate = useNavigate();
    const {id} = useParams<{id?: string}>();
    const editing = Boolean(id);

    const [fields, setFields] = useState({
        title: "",
        description: "",
        code: "",
        tags: "",
        platform: "",
        author: "",
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Conversion state
    const [format, setFormat] = useState<string | null>(null);
    const [possibleTargets, setPossibleTargets] = useState<string[]>([]);
    const [convertDialogOpen, setConvertDialogOpen] = useState(false);
    const [selectedTarget, setSelectedTarget] = useState("");
    const [converting, setConverting] = useState(false);
    const [conversionError, setConversionError] = useState<string | null>(null);

    // Debounce for code format detection
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Load for edit
    useEffect(() => {
        if (editing && id) {
            setFetching(true);
            fetchPayload(Number(id))
            .then((payload) => {
                setFields({
                    title: payload.title || "",
                    description: payload.description || "",
                    code: payload.code || "",
                    tags: (payload.tags || []).join(", "),
                    platform: payload.platform || "",
                    author: payload.author || "",
                });
            })
            .catch(() => setError("Failed to load payload for editing."))
            .finally(() => setFetching(false));
        }
    }, [editing, id]);

    // Detect code format and possible conversions when code changes
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (fields.code.trim().length > 0) {
            debounceRef.current = setTimeout(async () => {
                try {
                    setFormat(null);
                    setPossibleTargets([]);
                    setConversionError(null);
                    const {format} = await detectPayloadFormat(fields.code);
                    setFormat(format);
                    if (format) {
                        const targets = await listPayloadConversions(format);
                        setPossibleTargets(targets);
                    }
                } catch {
                    setFormat(null);
                    setPossibleTargets([]);
                }
            }, 500);
        } else {
            setFormat(null);
            setPossibleTargets([]);
        }
         
    }, [fields.code]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({...fields, [e.target.name]: e.target.value});
    };

    const validate = () => {
        if (!fields.title.trim()) return "Title is required";
        if (!fields.code.trim()) return "Payload code is required";
        if (!fields.platform.trim()) return "Platform is required";
        return "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        const errMsg = validate();
        if (errMsg) {
            setError(errMsg);
            return;
        }

        setLoading(true);
        try {
            const submitData = {
                ...fields,
                tags: fields.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            };

            if (editing && id) {
                await updatePayload(Number(id), submitData);
                setSuccess(true);
            } else {
                await createPayload(submitData);
                setSuccess(true);
                setFields({
                    title: "",
                    description: "",
                    code: "",
                    tags: "",
                    platform: "",
                    author: "",
                });
            }
        } catch (e: unknown) {
            interface AxiosError {
                response?: {
                    data?: {
                        detail?: string;
                    };
                };
            }
            if (
                typeof e === "object" &&
                e !== null &&
                "response" in e &&
                typeof (e as AxiosError).response === "object" &&
                (e as AxiosError).response !== null &&
                "data" in ((e as AxiosError).response ?? {})
            ) {
                setError((e as AxiosError).response?.data?.detail || "Failed to submit payload. Please try again.");
            } else {
                setError("Failed to submit payload. Please try again.");
            }
        }
        setLoading(false);
    };

    const handleOpenConvertDialog = () => {
        setSelectedTarget("");
        setConversionError(null);
        setConvertDialogOpen(true);
    };

    const handleConvert = async () => {
        setConverting(true);
        setConversionError(null);
        try {
            const {convertedCode} = await convertPayload(fields.code, format!, selectedTarget);
            setFields((f) => ({...f, code: convertedCode}));
            setConvertDialogOpen(false);
        } catch {
            setConversionError("Conversion failed. Try another format or check your payload.");
        }
        setConverting(false);
    };

    // Show loader while fetching (for edit)
    if (fetching) {
        return (
            <Box sx={{maxWidth: 700, mx: "auto", p: 2, textAlign: "center"}}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{maxWidth: 700, mx: "auto", p: 2}}>
            <Typography variant="h4" gutterBottom>
                {editing ? "Edit Payload" : "Submit a New Payload"}
            </Typography>
            <Paper sx={{p: 3, mb: 2}}>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && (
                            <Alert severity="success">
                                {editing ? "Payload updated successfully!" : "Payload submitted successfully!"}
                            </Alert>
                        )}
                        <TextField
                            label="Title"
                            name="title"
                            value={fields.title}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={fields.description}
                            onChange={handleChange}
                            multiline
                            minRows={2}
                            fullWidth
                        />
                        <TextField
                            label="Payload Code"
                            name="code"
                            value={fields.code}
                            onChange={handleChange}
                            required
                            fullWidth
                            multiline
                            minRows={4}
                        />
                        {/* Format Detection & Conversion UI */}
                        {fields.code.trim() && (
                            <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                                <Typography variant="body2" color="textSecondary">
                                    Detected format: <b>{format ? format : "Detecting..."}</b>
                                </Typography>
                                {possibleTargets.length > 0 && format && (
                                    <Button size="small" variant="outlined" onClick={handleOpenConvertDialog}>
                                        Convert to...
                                    </Button>
                                )}
                            </Box>
                        )}
                        <TextField
                            label="Tags (comma separated)"
                            name="tags"
                            value={fields.tags}
                            onChange={handleChange}
                            placeholder="e.g. persistence, privilege escalation"
                            fullWidth
                        />
                        <TextField
                            label="Platform"
                            name="platform"
                            value={fields.platform}
                            onChange={handleChange}
                            select
                            required
                            fullWidth
                        >
                            {PLATFORM_OPTIONS.map((p) => (
                                <MenuItem value={p} key={p}>
                                    {p}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Author"
                            name="author"
                            value={fields.author}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Box sx={{display: "flex", gap: 2, mt: 2}}>
                            <Button variant="contained" type="submit" color="primary" disabled={loading}>
                                {loading ? (editing ? "Saving..." : "Submitting...") : editing ? "Save" : "Submit"}
                            </Button>
                            <Button variant="outlined" onClick={() => navigate(-1)} disabled={loading}>
                                Cancel
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>

            {/* Conversion Dialog */}
            <Dialog open={convertDialogOpen} onClose={() => setConvertDialogOpen(false)}>
                <DialogTitle>Convert Payload Format</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{mb: 2}}>
                        Convert from <b>{format}</b> to:
                    </Typography>
                    <Select
                        fullWidth
                        value={selectedTarget}
                        onChange={(e) => setSelectedTarget(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Select target format
                        </MenuItem>
                        {possibleTargets.map((target) => (
                            <MenuItem key={target} value={target}>
                                {target}
                            </MenuItem>
                        ))}
                    </Select>
                    {conversionError && (
                        <Alert severity="error" sx={{mt: 2}}>
                            {conversionError}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConvertDialogOpen(false)}>Cancel</Button>
                    <Button disabled={!selectedTarget || converting} onClick={handleConvert} variant="contained">
                        {converting ? <CircularProgress size={20} /> : "Convert"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
