// components/backup/RecentBackupBanner.tsx

import { Alert, Box } from "@mui/material";

export default function RecentBackupBanner() {
    return (
        <Box sx={{mb: 2}}>
            <Alert severity="info" variant="filled">
                Most recent backup info will appear here. (Coming soon)
            </Alert>
        </Box>
    );
}
// This component will eventually display information about the most recent backup