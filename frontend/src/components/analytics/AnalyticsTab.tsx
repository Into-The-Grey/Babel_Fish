import { Box, Typography } from "@mui/material";

export default function AnalyticsTab() {
    return (
        <Box sx={{textAlign: "center", p: 5}}>
            <Typography variant="h4" sx={{fontFamily: "var(--font-title)", mb: 2}}>
                📊 Analytics
            </Typography>
            <Typography sx={{color: "#bafff5", fontFamily: "var(--font-main)"}}>
                Get stats, charts, and insights on your usage and resources.
                <br />
                <b>Coming soon:</b> Usage graphs, payload breakdowns, trend tracking.
            </Typography>
        </Box>
    );
}
