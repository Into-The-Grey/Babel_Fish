// components/analytics/AnalyticsTab.tsx

import { Box, Divider, Typography } from "@mui/material";
import ActivityTimeline from "./ActivityTimeline";
import AnalyticsExportPanel from "./AnalyticsExportPanel";
import AnalyticsGraphsPlaceholder from "./AnalyticsGraphsPlaceholder";
import AnalyticsHealthNotice from "./AnalyticsHealthNotice";
import MostViewedResources from "./MostViewedResources";
import SummaryCards from "./SummaryCards";
import TagCloud from "./TagCloud";

export default function AnalyticsTab() {
    return (
        <Box sx={{p: {xs: 2, md: 5}, fontFamily: "var(--font-main)"}}>
            <Typography variant="h4" sx={{fontFamily: "var(--font-title)", mb: 3}}>
                📊 Analytics
            </Typography>

            <SummaryCards />
            <ActivityTimeline />
            <MostViewedResources />
            <TagCloud />
            <AnalyticsGraphsPlaceholder />
            <AnalyticsExportPanel />
            <Divider sx={{my: 5, opacity: 0.25}} />
            <AnalyticsHealthNotice />

            <Box sx={{mt: 5}}>
                <Typography sx={{color: "#7af9ff", fontSize: 17, opacity: 0.6}}>
                    More analytics (trends, correlations, custom filters) coming after backend is finalized.
                </Typography>
            </Box>
        </Box>
    );
}
