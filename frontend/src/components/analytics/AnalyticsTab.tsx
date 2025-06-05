import { Box, Typography } from "@mui/material";
export default function AnalyticsTab() {
    return (
        <Box>
            <Typography variant="h5" sx={{color: "#70e6ff"}}>
                Analytics
            </Typography>
            <Typography color="textSecondary">
                This is a placeholder for future analytics/stats/charts. Connect your data and charting library here
                later.
            </Typography>
        </Box>
    );
}
