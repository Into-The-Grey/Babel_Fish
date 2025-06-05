// components/media/MediaViewer.tsx

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import type { MediaFile } from "./MediaTab";

interface MediaViewerProps {
    file: MediaFile;
    onClose: () => void;
    onEdit?: () => void;
    onDownload?: () => void;
}

export default function MediaViewer({file, onClose, onEdit, onDownload}: MediaViewerProps) {
    const [showConvert, setShowConvert] = useState(false);

    let content;
    switch (file.type) {
        case "image":
            content = (
                <img
                    src={file.url}
                    alt={file.name}
                    style={{
                        maxWidth: "100%",
                        maxHeight: 500,
                        borderRadius: 8,
                        background: "#222",
                        boxShadow: "0 2px 24px #1de1ff30",
                        margin: "0 auto",
                        display: "block",
                    }}
                />
            );
            break;
        case "audio":
            content = (
                <audio controls style={{width: "100%"}}>
                    <source src={file.url} />
                    Your browser does not support the audio element.
                </audio>
            );
            break;
        case "video":
            content = (
                <video controls style={{width: "100%", maxHeight: 420}}>
                    <source src={file.url} />
                    Your browser does not support the video tag.
                </video>
            );
            break;
        default:
            content = (
                <Box>
                    <Typography color="error" sx={{mt: 2}}>
                        Unsupported file type.
                    </Typography>
                    <Button color="info" variant="outlined" sx={{mt: 2}} onClick={() => setShowConvert(true)}>
                        Convert &amp; Preview
                    </Button>
                    {showConvert && (
                        <Typography sx={{color: "#22eaff", mt: 1}}>(Conversion logic coming soon!)</Typography>
                    )}
                </Box>
            );
    }

    // Download helper (downloads current file url)
    const handleDownload = () => {
        const a = document.createElement("a");
        a.href = file.url;
        a.download = file.name;
        a.click();
    };

    return (
        <Box
            sx={{
                p: 3,
                background: "#1a212e",
                borderRadius: 2,
                boxShadow: 4,
                maxWidth: 900,
                mx: "auto",
                my: 4,
                textAlign: "center",
            }}
        >
            <Typography variant="h6" sx={{mb: 2}}>
                {file.name}
            </Typography>
            {content}
            <Box sx={{mt: 3, display: "flex", justifyContent: "center", gap: 2}}>
                {onEdit && (
                    <Button color="warning" onClick={onEdit} variant="contained">
                        Edit
                    </Button>
                )}
                <Button color="primary" onClick={onDownload || handleDownload} variant="outlined">
                    Download
                </Button>
                <Button color="error" onClick={onClose} variant="outlined">
                    Close
                </Button>
            </Box>
        </Box>
    );
}
// This component displays a media file (image, audio, video) in a viewer with options to edit or download.