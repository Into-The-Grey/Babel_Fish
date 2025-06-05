import { Box, Typography } from "@mui/material";

export default function MediaTab() {
    return (
        <Box sx={{textAlign: "center", p: 5}}>
            <Typography variant="h4" sx={{fontFamily: "var(--font-title)", mb: 2}}>
                📸 Media Library
            </Typography>
            <Typography sx={{color: "#8de3ff", fontFamily: "var(--font-main)"}}>
                Upload, view, and organize your images, audio, and videos.
                <br />
                <b>Coming soon:</b> Smart previews, metadata, and more.
            </Typography>
        </Box>
    );
}
