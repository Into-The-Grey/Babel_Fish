// components/analytics/AnalyticsGraphsPlaceholder.tsx

import { Paper, Typography } from "@mui/material";

export default function AnalyticsGraphsPlaceholder() {
    return (
        <Paper
            sx={{
                mt: 2,
                mb: 4,
                p: 4,
                borderRadius: 3,
                background: "rgba(24,30,42,0.96)",
                textAlign: "center",
                boxShadow: "0 2px 16px #11577722",
            }}
        >
            <Typography variant="h6" sx={{mb: 2, color: "#18eaff", fontFamily: "var(--font-title)"}}>
                📈 Usage Graphs (Coming Soon)
            </Typography>
            <Typography sx={{color: "#87eaff"}}>
                Interactive visualizations and trend analysis coming after backend integration!
            </Typography>
        </Paper>
    );
}
