// components/backup/RestoreDialog.tsx

import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

export default function RestoreDialog() {
    // Hook up to backup selection in the future
    return (
        <Dialog open={false} onClose={() => {}}>
            <DialogTitle>Restore Backup</DialogTitle>
            <DialogContent>
                <Typography color="primary">Restore dialog coming soon.</Typography>
            </DialogContent>
        </Dialog>
    );
}
// This component will eventually allow users to confirm restoration of a selected backup