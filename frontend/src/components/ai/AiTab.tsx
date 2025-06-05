import { Box, Typography } from "@mui/material";

export default function AITab() {
    return (
        <Box sx={{textAlign: "center", p: 5}}>
            <Typography variant="h4" sx={{fontFamily: "var(--font-title)", mb: 2}}>
                🤖 AI Hub
            </Typography>
            <Typography sx={{color: "#e0c8ff", fontFamily: "var(--font-main)"}}>
                Run LLMs, chat, and Q&A on your docs. Private, local, powerful.
                <br />
                <b>Coming soon:</b> Prompting, embeddings, doc search, more.
            </Typography>
        </Box>
    );
}
