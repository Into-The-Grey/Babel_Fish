import BugReportIcon from "@mui/icons-material/BugReport";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DnsIcon from "@mui/icons-material/Dns";
import FeedIcon from "@mui/icons-material/Feed";
import MemoryIcon from "@mui/icons-material/Memory";
import SearchIcon from "@mui/icons-material/Search";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StorageIcon from "@mui/icons-material/Storage";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPayloads } from "../api/payloads";
import DocsTab from "../components/docs/DocsTab";
import MainTabs, { type MainTab } from "../components/MainTabs";
import MediaTab from "../components/MediaTab";
import NavBar from "../components/NavBar";
import ParticlesBackground from "../components/ParticlesBackground";
// import SettingsTab from "../components/settings/SettingsTab";
import LOGO_URL from "../assets/images/babel_fish_logo192.png";
import AnalyticsTab from "../components/AnalyticsTab";

const APP_NAME = "Babel Fish";

const mainTabs: MainTab[] = [
    {label: "Payloads", value: "payloads", icon: <BugReportIcon />},
    {label: "Docs", value: "docs", icon: <FeedIcon />},
    {label: "Media", value: "media", icon: <StorageIcon />},
    {label: "Logs", value: "logs", icon: <DnsIcon />},
    {label: "Settings", value: "settings", icon: <MemoryIcon />},
    {label: "Analytics", value: "analytics", icon: <SearchIcon />},
    {label: "Trash/Recovery", value: "trash", icon: <DeleteOutlineIcon />},
    {label: "AI", value: "ai", icon: <SmartToyIcon />},
    {label: "Backup", value: "backup", icon: <CloudUploadIcon />},
];

interface Payload {
    id: number;
    title: string;
    description?: string;
    code: string;
    tags?: string[];
    platform?: string;
    author?: string;
    created_at?: string;
}

interface SystemStats {
    cpu: number; // %
    ram: number; // %
    disk: number; // %
}

export default function HomePage() {
    const [payloads, setPayloads] = useState<Payload[]>([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");
    const [platform, setPlatform] = useState("");
    const [error, setError] = useState("");
    const [tab, setTab] = useState(mainTabs[0].value);
    const [date, setDate] = useState(() => new Date());
    const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [logSearch, setLogSearch] = useState("");
    const [logsLoading, setLogsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

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
        if (tab === "payloads") fetchAll();
    }, [q, platform, tab, fetchAll]);

    useEffect(() => {
        setSystemStats({cpu: 17, ram: 49, disk: 60}); // Dummy
    }, []);

    const fetchLogs = async () => {
        setLogsLoading(true);
        const data = [
            `[${new Date().toISOString()}] WebApp started`,
            `[${new Date().toISOString()}] User admin logged in`,
            `[${new Date().toISOString()}] New payload submitted`,
        ];
        setLogs(data);
        setLogsLoading(false);
    };
    useEffect(() => {
        if (tab === "logs") fetchLogs();
    }, [tab, logSearch]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#16171b",
                position: "relative",
                fontFamily: "var(--font-main)",
            }}
        >
            <ParticlesBackground />

            {/* NAV BAR */}
            <NavBar logoUrl={LOGO_URL} appName={APP_NAME} date={date} systemStats={systemStats} />

            {/* Optional: Divider for section separation */}
            <Box
                sx={{
                    width: "100%",
                    height: 2,
                    background: "linear-gradient(90deg, #15f6ff 0%, #212c44 100%)",
                    opacity: 0.18,
                    mb: 1,
                }}
            />

            {/* MAIN TABS & CONTENT */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: {
                        xs: "99vw",
                        sm: 900,
                        md: 1200,
                        xl: 1600,
                        "2xl": 2100,
                    },
                    mx: "auto",
                    mt: {xs: 2, md: 4, xl: 6},
                    mb: {xs: 3, md: 5},
                    p: {xs: 1.5, sm: 2.5, md: 4, xl: 6},
                    zIndex: 20,
                    position: "relative",
                    background: "rgba(25,28,41,0.98)",
                    borderRadius: {xs: 2, md: 4},
                    boxShadow: "0 4px 48px #001a2d55, 0 1.5px 8px #0e1b2b22",
                    minHeight: "65vh",
                    backdropFilter: "blur(6px)",
                    border: "1.5px solid #202c44",
                    transition: "background 0.22s, box-shadow 0.18s",
                }}
            >
                <MainTabs tabs={mainTabs} value={tab} onChange={setTab} />

                {/* PAYLOADS TAB */}
                {tab === "payloads" && (
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
                                            {[
                                                "Title",
                                                "Description",
                                                "Tags",
                                                "Platform",
                                                "Author",
                                                "Created",
                                                "Actions",
                                            ].map((header) => (
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
                                            ))}
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
                                                    {row.created_at
                                                        ? new Date(row.created_at).toLocaleDateString()
                                                        : ""}
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
                )}

                {/* LOGS TAB */}
                {tab === "logs" && (
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
                                        .filter((log) =>
                                            logSearch ? log.toLowerCase().includes(logSearch.toLowerCase()) : true
                                        )
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
                )}

                {/* Add these for other tabs */}
                {tab === "docs" && <DocsTab />}
                {tab === "media" && <MediaTab />}
                {/* {tab === "settings" && <SettingsTab />} */}
                {tab === "analytics" && <AnalyticsTab />}

                {/* Add similar blocks for other tabs as needed */}
            </Box>
        </Box>
    );
}
