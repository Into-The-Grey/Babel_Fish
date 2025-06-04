import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Text-to-speech helper
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

    // Extract text from current page for TTS
    const extractText = async (url: string, pageNumber: number) => {
        const loadingTask = pdfjs.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();
        setPageText(textContent.items.map((item) => ("str" in item ? item.str : "")).join(" "));
    };

    // On doc or page change, update page text
    useEffect(() => {
        if (!url) return;
        extractText(url, pageNumber);
    }, [url, pageNumber]);

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
                <Button color="success" onClick={() => speak(pageText)}>
                    Read Aloud
                </Button>
                <Button color="error" onClick={onClose}>
                    Close
                </Button>
            </Stack>
            <Document file={url} onLoadSuccess={({numPages}) => setNumPages(numPages)}>
                <Page pageNumber={pageNumber} width={700} />
            </Document>
        </Box>
    );
}
