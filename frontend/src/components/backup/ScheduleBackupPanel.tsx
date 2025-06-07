// components/backup/ScheduleBackupPanel.tsx

import { Box, Typography } from "@mui/material";

export default function ScheduleBackupPanel() {
    return (
        <Box sx={{my: 3}}>
            <Typography variant="h6" sx={{fontFamily: "var(--font-title)"}}>
                Backup Scheduling
            </Typography>
            <Typography color="textSecondary">Configure scheduled or recurring backups. (Coming soon)</Typography>
        </Box>
    );
}
// This component will eventually allow users to set up automatic backup schedules