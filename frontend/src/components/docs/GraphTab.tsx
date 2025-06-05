// components/docs/GraphTab.tsx

import { Box, Typography } from "@mui/material";

export default function GraphTab() {
    return (
        <Box sx={{ p: 6, textAlign: "center", color: "#aaa" }}>
            <Typography variant="h4" sx={{ fontFamily: "var(--font-title)", mb: 2 }}>
                🕸️ Docs Knowledge Graph (Coming Soon)
            </Typography>
            <Typography sx={{ maxWidth: 540, mx: "auto", fontFamily: "var(--font-main)" }}>
                Interactive graphing, connections, and visualizations of your entire docs library
                will be available <b>after backend finalization</b>.
                <br /><br />
                <i>
                    For now, this is a placeholder. <br />
                    Do not touch, refactor, or attempt to enable this feature until the backend is
                    stable, schemas are finalized, and all other tabs are fully operational.
                </i>
            </Typography>
        </Box>
    );
}
