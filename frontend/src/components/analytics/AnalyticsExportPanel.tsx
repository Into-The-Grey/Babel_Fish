// components/analytics/AnalyticsExportPanel.tsx

import {Box, Button, Stack, Typography} from "@mui/material";

export default function AnalyticsExportPanel() {
    return (
        <Box sx={{my: 3, textAlign: "center"}}>
            <Typography variant="h6" sx={{mb: 2, color: "#bafff5", fontFamily: "var(--font-title)"}}>
                📤 Export / Download
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center">
                <Button variant="contained" color="primary" disabled>
                    Download Report
                </Button>
                <Button variant="outlined" color="secondary" disabled>
                    Export Chart Image
                </Button>
            </Stack>
            <Typography sx={{fontSize: 13, color: "#90caf9", mt: 1}}>
                (Export features will be enabled after full backend integration.)
            </Typography>
        </Box>
    );
}
