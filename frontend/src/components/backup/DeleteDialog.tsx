// components/backup/DeleteDialog.tsx

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

interface DeleteDialogProps {
    open: boolean;
    backupName?: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteDialog({open, backupName = "this backup", onClose, onConfirm}: DeleteDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Backup</DialogTitle>
            <DialogContent>
                <Typography color="error" sx={{mb: 2}}>
                    Are you sure you want to delete <b>{backupName}</b>?
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    This action cannot be undone. (Feature coming soon.)
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained" disabled>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
// This component will eventually allow users to confirm deletion of a selected backup.
