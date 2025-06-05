// components/analytics/AnalyticsHealthNotice.tsx

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Typography } from "@mui/material";

export default function AnalyticsHealthNotice() {
    return (
        <Box sx={{mt: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 2}}>
            <WarningAmberIcon color="warning" />
            <Typography sx={{color: "#ffd780", fontSize: 16}}>
                Some analytics features may be limited while backend integration is incomplete.
            </Typography>
        </Box>
    );
}
