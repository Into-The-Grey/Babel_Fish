// components/backup/ExportImportPanel.tsx

import { Box, Button, Typography } from "@mui/material";

export default function ExportImportPanel() {
    return (
        <Box sx={{my: 3}}>
            <Typography variant="h6" sx={{fontFamily: "var(--font-title)"}}>
                Export / Import
            </Typography>
            <Button variant="outlined" sx={{mr: 2}} disabled>
                Export (Coming soon)
            </Button>
            <Button variant="outlined" disabled>
                Import (Coming soon)
            </Button>
        </Box>
    );
}
// This component will eventually allow users to export their backup data or import existing backups