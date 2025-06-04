import { Box, Typography } from "@mui/material";
export default function SettingsTab() {
    return (
        <Box>
            <Typography variant="h5" sx={{color: "#70e6ff"}}>
                Settings
            </Typography>
            <Typography color="textSecondary">
                This is a placeholder for user/app settings. Put your forms, toggles, etc here later.
            </Typography>
        </Box>
    );
}
