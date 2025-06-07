// components/backup/BackupHistoryTimeline.tsx

import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

// Demo event types for the timeline
type BackupEventType = "created" | "restored" | "deleted" | "scheduled" | "failed";

export interface BackupHistoryEvent {
    id: string;
    type: BackupEventType;
    timestamp: string;
    label: string;
    details?: string;
}

interface BackupHistoryTimelineProps {
    events?: BackupHistoryEvent[];
}

// Color and label for each type
const eventTypeStyles: Record<BackupEventType, {color: string; label: string}> = {
    created: {color: "#30ffb3", label: "Backup Created"},
    restored: {color: "#2ac8fa", label: "Backup Restored"},
    deleted: {color: "#ff5c7b", label: "Deleted"},
    scheduled: {color: "#ffe165", label: "Scheduled"},
    failed: {color: "#ff3e3e", label: "Failed"},
};

// Fallback demo events if none are provided
const DEMO_EVENTS: BackupHistoryEvent[] = [
    {
        id: "1",
        type: "created",
        timestamp: new Date(Date.now() - 3600_000 * 24 * 3).toISOString(),
        label: "Daily snapshot",
    },
    {
        id: "2",
        type: "restored",
        timestamp: new Date(Date.now() - 3600_000 * 24 * 2.5).toISOString(),
        label: "Restored from snapshot",
        details: "Restored before major update",
    },
    {
        id: "3",
        type: "failed",
        timestamp: new Date(Date.now() - 3600_000 * 24 * 2).toISOString(),
        label: "Failed scheduled backup",
        details: "Disk full",
    },
    {
        id: "4",
        type: "deleted",
        timestamp: new Date(Date.now() - 3600_000 * 24 * 1).toISOString(),
        label: "Old backup deleted",
        details: "Auto-prune: 30 day retention",
    },
    {
        id: "5",
        type: "created",
        timestamp: new Date(Date.now() - 3600_000 * 12).toISOString(),
        label: "Manual backup",
    },
];

export default function BackupHistoryTimeline({events = DEMO_EVENTS}: BackupHistoryTimelineProps) {
    return (
        <Box sx={{my: 4, px: 2, maxWidth: 620, mx: "auto"}}>
            <Typography variant="h6" sx={{fontFamily: "var(--font-title)", mb: 2}}>
                Backup History Timeline
            </Typography>
            {events.length === 0 ? (
                <Typography color="textSecondary" sx={{mb: 2}}>
                    No backup events yet.
                </Typography>
            ) : (
                <Stack spacing={3}>
                    {events
                    .slice() // don’t mutate original
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((event, idx) => {
                        const {color, label} = eventTypeStyles[event.type];
                        const time = new Date(event.timestamp).toLocaleString();
                        return (
                            <Box key={event.id} sx={{pl: 2, position: "relative"}}>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{
                                        position: "absolute",
                                        left: 8,
                                        top: 0,
                                        height: "100%",
                                        borderColor: "#1e2736",
                                        zIndex: 0,
                                    }}
                                />
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Chip
                                        label={label}
                                        sx={{
                                            bgcolor: color,
                                            color: "#112",
                                            fontWeight: 700,
                                            fontFamily: "var(--font-title)",
                                        }}
                                    />
                                    <Typography sx={{fontFamily: "var(--font-main)", fontWeight: 700}}>
                                        {event.label}
                                    </Typography>
                                    <Typography sx={{color: "#aaa", fontSize: 14}}>{time}</Typography>
                                </Stack>
                                {event.details && (
                                    <Typography sx={{ml: 10, color: "#9be8fa", fontSize: 15, mt: 0.5}}>
                                        {event.details}
                                    </Typography>
                                )}
                            </Box>
                        );
                    })}
                </Stack>
            )}
        </Box>
    );
}
// Replace DEMO_EVENTS with your actual history from the backend when ready.
