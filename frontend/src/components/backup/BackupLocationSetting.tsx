// components/backup/BackupLocationSetting.tsx

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function BackupLocationSetting() {
    return (
        <Box sx={{my: 3}}>
            <Typography variant="h6" sx={{fontFamily: "var(--font-title)", mb: 1}}>
                Backup Location
            </Typography>
            <Typography color="textSecondary" sx={{mb: 2}}>
                Configure where your backups are stored on disk or an external drive. (Coming soon)
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                    label="Current Backup Path"
                    value="/mnt/backup/babel_fish/"
                    disabled
                    sx={{
                        width: 380,
                        fontFamily: "var(--font-main)",
                        input: {color: "#cbeafe"},
                    }}
                />
                <Button variant="outlined" startIcon={<FolderOpenIcon />} disabled>
                    Change
                </Button>
            </Stack>
        </Box>
    );
}
// This component will eventually let the user set or browse for the backup storage location.
