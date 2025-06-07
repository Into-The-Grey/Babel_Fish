// components/backup/CreateBackupPanel.tsx

import BackupIcon from "@mui/icons-material/Backup";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function CreateBackupPanel() {
    // In the future, you might show backup status, last run, or errors here.
    return (
        <Box sx={{mb: 3}}>
            <Typography variant="h6" sx={{fontFamily: "var(--font-title)", mb: 1}}>
                Create Backup
            </Typography>
            <Typography color="textSecondary" sx={{mb: 2}}>
                Generate a new backup snapshot of your current data. (Manual only, auto/schedule in another panel.)
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BackupIcon />}
                    disabled
                    sx={{fontFamily: "var(--font-title)", fontWeight: 700, letterSpacing: 1}}
                >
                    Create Backup (Coming Soon)
                </Button>
                <Typography color="info.main" sx={{ml: 2}}>
                    Last backup: <b>Not yet created</b>
                </Typography>
            </Stack>
        </Box>
    );
}
// This component will eventually allow users to trigger a manual backup and show last backup time/status.
