// components/backup/DownloadHandler.tsx

import { Box, Button, Typography } from "@mui/material";

interface DownloadHandlerProps {
    selectedBackupName?: string;
    onDownload?: () => void;
}

export default function DownloadHandler({selectedBackupName, onDownload}: DownloadHandlerProps) {
    return (
        <Box sx={{my: 2}}>
            <Button variant="outlined" color="info" disabled onClick={onDownload}>
                Download{selectedBackupName ? `: ${selectedBackupName}` : " Selected Backup"} (Coming soon)
            </Button>
            <Typography variant="body2" color="textSecondary" sx={{mt: 1}}>
                Download or export your selected backup to your device.
            </Typography>
        </Box>
    );
}
// This component will eventually handle downloading selected backups.
