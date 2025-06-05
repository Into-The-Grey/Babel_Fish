// components/analytics/ActivityTimeline.tsx

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function ActivityTimeline() {
    // Placeholder events—wire to backend later
    const events = [
        { time: "Just now", action: "Added new PDF: 'Red Team Cheatsheet.pdf'" },
        { time: "5 min ago", action: "Edited payload: 'Win-Admin-ReverseShell'" },
        { time: "13 min ago", action: "Uploaded image: 'badge-qr.png'" },
        { time: "Today", action: "Tagged media: 'blueprint.mp4' as 'diagram'" },
    ];

    return (
        <Box sx={{mb: 4}}>
            <Typography variant="h6" sx={{fontFamily: "var(--font-title)", mb: 1.5, color: "#99e2ff"}}>
                Recent Activity
            </Typography>
            <List dense>
                {events.map((ev, i) => (
                    <ListItem key={i} sx={{py: 0.5}}>
                        <ListItemText
                            primary={ev.action}
                            secondary={ev.time}
                            primaryTypographyProps={{sx: {color: "#e0f7fa"}}}
                            secondaryTypographyProps={{sx: {color: "#70aec8", fontSize: 13}}}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
