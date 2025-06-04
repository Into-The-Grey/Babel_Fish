import DnsIcon from "@mui/icons-material/Dns";
import MemoryIcon from "@mui/icons-material/Memory";
import StorageIcon from "@mui/icons-material/Storage";
import {AppBar, Avatar, Stack, Toolbar, Typography} from "@mui/material";

interface SystemStats {
    cpu: number;
    ram: number;
    disk: number;
}

interface NavBarProps {
    logoUrl: string;
    appName: string;
    date: Date;
    systemStats?: SystemStats | null;
}

export default function NavBar({logoUrl, appName, date, systemStats}: NavBarProps) {
    return (
        <AppBar
            position="sticky"
            elevation={3}
            sx={{
                background: "rgba(24,24,24,0.97)",
                zIndex: 10,
                backdropFilter: "blur(2.5px)",
                fontFamily: "var(--font-title)",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    px: {xs: 2, sm: 4, md: 8},
                    minHeight: {xs: 56, md: 72},
                }}
            >
                <Stack direction="row" alignItems="center" gap={2}>
                    <Avatar src={logoUrl} alt="Logo" sx={{width: 44, height: 44, bgcolor: "#292f36"}} />
                    <Typography
                        sx={{
                            fontFamily: "var(--font-title)",
                            fontWeight: 700,
                            fontSize: {xs: 24, sm: 30, md: 38, xl: 46},
                            letterSpacing: 2,
                            color: "#eef6ff",
                            textShadow: "0 1px 4px #0c0d16cc",
                            textTransform: "uppercase",
                        }}
                    >
                        {appName}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={{xs: 1, sm: 3}}>
                    <Typography
                        variant="body2"
                        sx={{
                            minWidth: 145,
                            fontFamily: "var(--font-main)",
                            fontSize: {xs: 13, md: 16},
                            color: "#b0b3ba",
                            letterSpacing: 0.5,
                        }}
                    >
                        {date.toLocaleString()}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <MemoryIcon fontSize="small" sx={{color: "#98ff98"}} />
                        <Typography variant="body2" sx={{color: "#b0f5c6", fontWeight: 500}}>
                            CPU: {systemStats ? `${systemStats.cpu}%` : "--"}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <StorageIcon fontSize="small" sx={{color: "#81d4fa"}} />
                        <Typography variant="body2" sx={{color: "#cbeafe", fontWeight: 500}}>
                            RAM: {systemStats ? `${systemStats.ram}%` : "--"}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <DnsIcon fontSize="small" sx={{color: "#ffd780"}} />
                        <Typography variant="body2" sx={{color: "#ffe29a", fontWeight: 500}}>
                            Disk: {systemStats ? `${systemStats.disk}%` : "--"}
                        </Typography>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

// No changes needed in this file. The logoUrl prop should be passed from the parent component.
// Make sure when you use <NavBar ... /> you provide:
//    logoUrl="/home/ncacord/Babel_Fish/frontend/src/assets/images/logo192.png"
