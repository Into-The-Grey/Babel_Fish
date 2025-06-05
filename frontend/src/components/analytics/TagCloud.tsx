// components/analytics/TagCloud.tsx

import { Box, Chip, Typography } from "@mui/material";

export default function TagCloud() {
    // Placeholder tags—swap for real tags later
    const tags = [
        "linux",
        "usb",
        "osint",
        "windows",
        "payload",
        "nfc",
        "cloud",
        "wifi",
        "phishing",
        "encryption",
        "shell",
    ];

    return (
        <Box sx={{mb: 4}}>
            <Typography variant="h6" sx={{fontFamily: "var(--font-title)", mb: 1.5, color: "#aaf"}}>
                Tag Cloud
            </Typography>
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1.5}}>
                {tags.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        size="medium"
                        sx={{
                            fontSize: 15,
                            fontFamily: "var(--font-mono)",
                            bgcolor: "#101a2a",
                            color: "#7af9ff",
                            fontWeight: 600,
                            px: 1.5,
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
