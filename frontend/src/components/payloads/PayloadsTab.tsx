// src/components/payloads/PayloadsTab.tsx

import {useState, useCallback, useEffect} from "react";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";
import {fetchPayloads} from "../../api/payloads"; // ← adjust if needed!

// You can move this to a types folder if reused elsewhere
export interface Payload {
    id: number;
    title: string;
    description?: string;
    code: string;
    tags?: string[];
    platform?: string;
    author?: string;
    created_at?: string;
}

export default function PayloadsTab() {
    const [payloads, setPayloads] = useState<Payload[]>([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");
    const [platform, setPlatform] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchPayloads({q, platform});
            setPayloads(data);
        } catch {
            setError("Error loading payloads");
        }
        setLoading(false);
    }, [q, platform]);

    useEffect(() => {
        fetchAll();
    }, [q, platform, fetchAll]);

    return (
        <Box>
            <Box sx={{display: "flex", gap: 2, mb: 2}}>
                <TextField
                    label="Search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton size="small">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        fontFamily: "var(--font-main)",
                        input: {color: "#f2fbff", fontWeight: 500, letterSpacing: 1},
                        ".MuiInputBase-root": {
                            background: "#23243a",
                            borderRadius: 2,
                            border: "1.5px solid #353f5c",
                            "&:hover": {borderColor: "#09e6fb"},
                            "&.Mui-focused": {borderColor: "#5ad0fa", boxShadow: "0 0 2px #36edff"},
                        },
                        label: {
                            color: "#6fcfff",
                            letterSpacing: 1.1,
                            textTransform: "uppercase",
                            fontWeight: 600,
                        },
                    }}
                />
                <TextField
                    label="Platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    size="small"
                    sx={{
                        fontFamily: "var(--font-main)",
                        input: {color: "#f2fbff", fontWeight: 500, letterSpacing: 1},
                        ".MuiInputBase-root": {
                            background: "#23243a",
                            borderRadius: 2,
                            border: "1.5px solid #353f5c",
                            "&:hover": {borderColor: "#09e6fb"},
                            "&.Mui-focused": {borderColor: "#5ad0fa", boxShadow: "0 0 2px #36edff"},
                        },
                        label: {
                            color: "#6fcfff",
                            letterSpacing: 1.1,
                            textTransform: "uppercase",
                            fontWeight: 600,
                        },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/submit")}
                    sx={{
                        fontFamily: "var(--font-title)",
                        fontWeight: 700,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        background: "linear-gradient(90deg, #19edfc 40%, #1578a3 100%)",
                        color: "#0c1427",
                        boxShadow: "0 2px 12px #20f6ff55",
                        "&:hover": {
                            background: "linear-gradient(90deg, #16b9d3 60%, #155076 100%)",
                            color: "#e6fbff",
                        },
                    }}
                >
                    Submit New
                </Button>
            </Box>
            {loading ? (
                <Box sx={{textAlign: "center", mt: 4}}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer
                    component={Paper}
                    sx={{
                        background: "rgba(20,22,30,0.8)",
                        borderRadius: 3,
                        boxShadow: "0 1.5px 8px #000b",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                {["Title", "Description", "Tags", "Platform", "Author", "Created", "Actions"].map(
                                    (header) => (
                                        <TableCell
                                            key={header}
                                            sx={{
                                                fontFamily: "var(--font-title)",
                                                fontWeight: 700,
                                                fontSize: 18,
                                                color: "#7af9ff",
                                                letterSpacing: 2,
                                                background: "rgba(18,21,31,0.8)",
                                                borderBottom: "2px solid #2233cc33",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            {header}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payloads.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    sx={{
                                        "&:hover": {background: "rgba(51, 156, 255, 0.08)"},
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            fontFamily: "var(--font-main)",
                                            fontWeight: 600,
                                            color: "#e0eefa",
                                        }}
                                    >
                                        {row.title}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            maxWidth: 200,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            fontFamily: "var(--font-main)",
                                            color: "#becbde",
                                        }}
                                    >
                                        {row.description}
                                    </TableCell>
                                    <TableCell>
                                        {row.tags && row.tags.length > 0
                                            ? row.tags.map((t) => (
                                                  <Chip
                                                      label={t}
                                                      size="small"
                                                      key={t}
                                                      sx={{
                                                          mr: 0.5,
                                                          fontFamily: "var(--font-mono)",
                                                          bgcolor: "#111",
                                                          color: "#8de3ff",
                                                          fontWeight: 700,
                                                      }}
                                                  />
                                              ))
                                            : ""}
                                    </TableCell>
                                    <TableCell sx={{fontFamily: "var(--font-main)", color: "#aac7e3"}}>
                                        {row.platform}
                                    </TableCell>
                                    <TableCell sx={{fontFamily: "var(--font-main)", color: "#8acfa2"}}>
                                        {row.author}
                                    </TableCell>
                                    <TableCell sx={{fontFamily: "var(--font-mono)", color: "#e0c8ff"}}>
                                        {row.created_at ? new Date(row.created_at).toLocaleDateString() : ""}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            onClick={() => navigate(`/payload/${row.id}`)}
                                            variant="outlined"
                                            sx={{
                                                fontFamily: "var(--font-title)",
                                                fontWeight: 600,
                                                color: "#00d6ff",
                                                borderColor: "#00d6ff",
                                                "&:hover": {bgcolor: "#00465b"},
                                            }}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
