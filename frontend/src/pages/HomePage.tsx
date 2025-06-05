import BugReportIcon from "@mui/icons-material/BugReport";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DnsIcon from "@mui/icons-material/Dns";
import FeedIcon from "@mui/icons-material/Feed";
import MemoryIcon from "@mui/icons-material/Memory";
import SearchIcon from "@mui/icons-material/Search";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StorageIcon from "@mui/icons-material/Storage";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import LOGO_URL from "../assets/images/babel_fish_logo192.png";
import AITab from "../components/ai/AiTab";
import AnalyticsTab from "../components/analytics/AnalyticsTab";
import BackupTab from "../components/backup/BackupTab";
import DocsTab from "../components/docs/DocsTab";
import LogsTab from "../components/logs/LogsTab";
import MainTabs, { type MainTab } from "../components/MainTabs";
import MediaTab from "../components/media/MediaTab";
import NavBar from "../components/NavBar";
import ParticlesBackground from "../components/ParticlesBackground";
import PayloadsTab from "../components/payloads/PayloadsTab";
import SettingsTab from "../components/settings/SettingsTab";
import TrashTab from "../components/trash/TrashTab";

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

interface SystemStats {
    cpu: number; // %
    ram: number; // %
    disk: number; // %
}

export default function HomePage() {
    const [tab, setTab] = useState(mainTabs[0].value);
    const [date, setDate] = useState(() => new Date());
    const [systemStats, setSystemStats] = useState<SystemStats | null>(null);

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setSystemStats({cpu: 17, ram: 49, disk: 60}); // Dummy
    }, []);

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

            {/* Divider */}
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

                {tab === "payloads" && <PayloadsTab />}
                {tab === "logs" && <LogsTab />}
                {tab === "docs" && <DocsTab />}
                {tab === "media" && <MediaTab />}
                {tab === "analytics" && <AnalyticsTab />}
                {tab === "trash" && <TrashTab />}
                {tab === "ai" && <AITab />}
                {tab === "backup" && <BackupTab />}
                {tab === "settings" && <SettingsTab />}
            </Box>
        </Box>
    );
}
