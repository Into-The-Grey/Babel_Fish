import { Box, Typography } from "@mui/material";

export default function TrashTab() {
    return (
        <Box sx={{textAlign: "center", p: 5}}>
            <Typography variant="h4" sx={{fontFamily: "var(--font-title)", mb: 2}}>
                🗑️ Trash & Recovery
            </Typography>
            <Typography sx={{color: "#ffadad", fontFamily: "var(--font-main)"}}>
                Deleted items go here for recovery or permanent deletion.
                <br />
                <b>Coming soon:</b> Restore files, manage retention, auto-cleanup.
            </Typography>
        </Box>
    );
}
