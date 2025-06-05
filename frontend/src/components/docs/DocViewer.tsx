// components/docs/DocViewer.tsx

import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function speak(text: string) {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utter);
    }
}

interface DocViewerProps {
    url: string;
    onClose: () => void;
}

export default function DocViewer({url, onClose}: DocViewerProps) {
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageText, setPageText] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Reset to first page on new doc
    useEffect(() => {
        setPageNumber(1);
    }, [url]);

    // Extract text for TTS
    const extractText = useCallback(async (url: string, page: number) => {
        try {
            setLoading(true);
            setError(null);
            const loadingTask = pdfjs.getDocument(url);
            const pdf = await loadingTask.promise;
            const _page = await pdf.getPage(page);
            const textContent = await _page.getTextContent();
            setPageText(textContent.items.map((item) => ("str" in item ? item.str : "")).join(" "));
        } catch {
            setError("Failed to load page text.");
            setPageText("");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (url) extractText(url, pageNumber);
    }, [url, pageNumber, extractText]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") setPageNumber((p) => Math.max(1, p - 1));
            if (e.key === "ArrowRight") setPageNumber((p) => Math.min(numPages, p + 1));
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [numPages, onClose]);

    return (
        <Box sx={{background: "#181a22", p: 2, borderRadius: 2, boxShadow: 2}}>
            <Stack direction="row" gap={2} alignItems="center" mb={2}>
                <Typography sx={{fontWeight: 700}}>
                    Page {pageNumber} of {numPages}
                </Typography>
                <Button onClick={() => setPageNumber((p) => Math.max(1, p - 1))} disabled={pageNumber <= 1}>
                    Prev
                </Button>
                <Button
                    onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                    disabled={pageNumber >= numPages}
                >
                    Next
                </Button>
                <Button color="success" onClick={() => speak(pageText)} disabled={!pageText}>
                    Read Aloud
                </Button>
                <Button color="error" onClick={onClose}>
                    Close
                </Button>
            </Stack>
            {loading ? (
                <Box sx={{textAlign: "center", mt: 4}}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Document
                    file={url}
                    onLoadSuccess={({numPages}) => setNumPages(numPages)}
                    onLoadError={() => setError("Failed to load PDF.")}
                >
                    <Page pageNumber={pageNumber} width={700} />
                </Document>
            )}
        </Box>
    );
}
