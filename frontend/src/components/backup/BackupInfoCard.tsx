// components/backup/BackupInfoCard.tsx

import { Card, CardContent, Stack, Typography } from "@mui/material";

export interface BackupInfo {
    lastBackup: string;
    backupType: string;
    backupCount: number;
    nextScheduled?: string;
}

interface BackupInfoCardProps {
    info?: BackupInfo;
}

const DEMO_INFO: BackupInfo = {
    lastBackup: new Date(Date.now() - 60 * 60 * 1000 * 5).toLocaleString(), // 5 hours ago
    backupType: "Full Snapshot",
    backupCount: 12,
    nextScheduled: new Date(Date.now() + 60 * 60 * 1000 * 7).toLocaleString(), // 7 hours from now
};

export default function BackupInfoCard({info = DEMO_INFO}: BackupInfoCardProps) {
    return (
        <Card sx={{mb: 3, background: "#23273b", color: "#eafcff"}}>
            <CardContent>
                <Typography variant="h6" sx={{fontFamily: "var(--font-title)", mb: 1}}>
                    Backup Info
                </Typography>
                <Stack spacing={1} sx={{fontFamily: "var(--font-main)"}}>
                    <Typography>
                        <b>Last Backup:</b> {info.lastBackup}
                    </Typography>
                    <Typography>
                        <b>Backup Type:</b> {info.backupType}
                    </Typography>
                    <Typography>
                        <b>Total Backups:</b> {info.backupCount}
                    </Typography>
                    {info.nextScheduled && (
                        <Typography>
                            <b>Next Scheduled:</b> {info.nextScheduled}
                        </Typography>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
// Swap out DEMO_INFO for real backend stats when ready!
