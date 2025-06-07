// components/backup/BackupTab.tsx

import { Box, Divider, Stack, Typography } from "@mui/material";
import BackupHistoryTimeline from "./BackupHistoryTimeline";
import BackupInfoCard from "./BackupInfoCard";
import BackupList from "./BackupList";
import BackupLocationSetting from "./BackupLocationSetting";
import CreateBackupPanel from "./CreateBackupPanel";
import DeleteDialog from "./DeleteDialog";
import DownloadHandler from "./DownloadHandler";
import ExportImportPanel from "./ExportImportPanel";
import RecentBackupBanner from "./RecentBackupBanner";
import RestoreDialog from "./RestoreDialog";
import ScheduleBackupPanel from "./ScheduleBackupPanel";

export default function BackupTab() {
    return (
        <Box sx={{p: {xs: 2, md: 4}}}>
            <Typography variant="h4" sx={{fontFamily: "var(--font-title)", mb: 2}}>
                💾 Backup & Snapshots
            </Typography>
            <Typography sx={{color: "#cbeafe", fontFamily: "var(--font-main)", mb: 4}}>
                Create, manage, and restore full app backups and snapshots.
                <br />
                <b>Coming soon:</b> One-click backup/restore, download/export, scheduled jobs, and more.
            </Typography>

            {/* Most recent backup at top */}
            <RecentBackupBanner />

            <Divider sx={{my: 3}} />

            {/* Main backup info and actions */}
            <Stack direction={{xs: "column", md: "row"}} spacing={4} alignItems="flex-start">
                <Box sx={{flex: 2}}>
                    <CreateBackupPanel />
                    <BackupList />
                    <ExportImportPanel />
                </Box>
                <Box sx={{flex: 1, minWidth: 320}}>
                    <BackupInfoCard />
                    <ScheduleBackupPanel />
                    <BackupLocationSetting />
                </Box>
            </Stack>

            <Divider sx={{my: 3}} />

            {/* Backup history and restore */}
            <BackupHistoryTimeline />
            <RestoreDialog />
            <DownloadHandler />
            <DeleteDialog />
        </Box>
    );
}
