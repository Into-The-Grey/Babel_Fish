import { Box, Typography } from "@mui/material";

export default function BackupTab() {
    return (
        <Box sx={{textAlign: "center", p: 5}}>
            <Typography variant="h4" sx={{fontFamily: "var(--font-title)", mb: 2}}>
                💾 Backup & Snapshots
            </Typography>
            <Typography sx={{color: "#cbeafe", fontFamily: "var(--font-main)"}}>
                Create, manage, and restore full app backups and snapshots.
                <br />
                <b>Coming soon:</b> One-click backup/restore, download/export, scheduled jobs.
            </Typography>
        </Box>
    );
}
