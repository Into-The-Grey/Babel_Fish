// components/analytics/MostViewedResources.tsx

import { Box, Typography, List, ListItem, ListItemText, Chip } from "@mui/material";

export default function MostViewedResources() {
    // Placeholder data
    const top = [
        { name: "Rubber Ducky - Lockout Bypass", type: "Payload", views: 27 },
        { name: "Linux Privilege Escalation.pdf", type: "Doc", views: 22 },
        { name: "OSINT Reference Sheet.pdf", type: "Doc", views: 17 },
        { name: "attack.mp4", type: "Media", views: 12 },
    ];
    return (
        <Box sx={{mb: 4}}>
            <Typography variant="h6" sx={{fontFamily: "var(--font-title)", mb: 1.5, color: "#fbf2c9"}}>
                Most Viewed
            </Typography>
            <List dense>
                {top.map((r, i) => (
                    <ListItem key={i} sx={{py: 0.7}}>
                        <ListItemText
                            primary={r.name}
                            secondary={r.type}
                            primaryTypographyProps={{sx: {color: "#e4edff"}}}
                            secondaryTypographyProps={{sx: {color: "#aaf", fontSize: 12}}}
                        />
                        <Chip label={`${r.views} views`} size="small" sx={{ml: 2, bgcolor: "#172442", color: "#7af9ff"}} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
