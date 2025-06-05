// components/media/MediaList.tsx

import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import EditIcon from "@mui/icons-material/Edit";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import BadgeIcon from "@mui/icons-material/Star";
import {
    Box,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    Stack
} from "@mui/material";
import { useMemo, useState } from "react";
import type { MediaFile } from "./MediaTab";

interface MediaListProps {
    media: MediaFile[];
    onSelect: (file: MediaFile) => void;
    onEdit?: (file: MediaFile) => void;
}

const SORT_OPTIONS = [
    {label: "A-Z", value: "name_asc"},
    {label: "Z-A", value: "name_desc"},
    {label: "Oldest", value: "date_asc"},
    {label: "Newest", value: "date_desc"},
];

const TYPE_OPTIONS = [
    {label: "All", value: ""},
    {label: "Image", value: "image"},
    {label: "Audio", value: "audio"},
    {label: "Video", value: "video"},
    {label: "Other", value: "other"},
];

function typeIcon(type: MediaFile["type"]) {
    switch (type) {
        case "image":
            return <ImageIcon sx={{color: "#5ad0fa"}} />;
        case "audio":
            return <AudiotrackIcon sx={{color: "#bafff5"}} />;
        case "video":
            return <MovieIcon sx={{color: "#7af9ff"}} />;
        default:
            return <HelpOutlineIcon sx={{color: "#e57373"}} />;
    }
}

export default function MediaList({media, onSelect, onEdit}: MediaListProps) {
    const [sortBy, setSortBy] = useState("name_asc");
    const [typeFilter, setTypeFilter] = useState("");

    // Derived: sorted and filtered
    const sortedFiltered = useMemo(() => {
        let items = media;
        if (typeFilter) {
            items = items.filter((file) => file.type === typeFilter);
        }
        items = [...items].sort((a, b) => {
            if (sortBy === "name_asc") return a.name.localeCompare(b.name);
            if (sortBy === "name_desc") return b.name.localeCompare(a.name);
            // We’ll assume "created" is in metadata, fallback to name
            const dateA = a.metadata?.createdAt ? +new Date(a.metadata.createdAt as string) : 0;
            const dateB = b.metadata?.createdAt ? +new Date(b.metadata.createdAt as string) : 0;
            if (sortBy === "date_asc") return dateA - dateB;
            if (sortBy === "date_desc") return dateB - dateA;
            return 0;
        });
        return items;
    }, [media, sortBy, typeFilter]);

    if (media.length === 0) {
        return <Box sx={{mt: 3, textAlign: "center", color: "#789"}}>No media uploaded yet.</Box>;
    }

    return (
        <Box>
            <Stack direction={{xs: "column", sm: "row"}} spacing={2} mb={2} alignItems="center">
                <FormControl size="small" sx={{minWidth: 120}}>
                    <InputLabel>Sort</InputLabel>
                    <Select value={sortBy} label="Sort" onChange={(e) => setSortBy(e.target.value)}>
                        {SORT_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{minWidth: 120}}>
                    <InputLabel>Type</InputLabel>
                    <Select value={typeFilter} label="Type" onChange={(e) => setTypeFilter(e.target.value)}>
                        {TYPE_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            <List>
                {sortedFiltered.map((file) => {
                    const isCopy = /_Copy\d+$/.test(file.name);
                    return (
                        <ListItem
                            key={file.id}
                            secondaryAction={
                                onEdit && (
                                    <IconButton edge="end" onClick={() => onEdit(file)}>
                                        <EditIcon />
                                    </IconButton>
                                )
                            }
                            disablePadding
                        >
                            <ListItemButton onClick={() => onSelect(file)}>
                                {typeIcon(file.type)}
                                <ListItemText
                                    primary={
                                        <Stack direction="row" alignItems="center" gap={1}>
                                            <span>{file.name}</span>
                                            {isCopy && (
                                                <BadgeIcon
                                                    fontSize="small"
                                                    sx={{color: "#f7b96f"}}
                                                    titleAccess="Copy"
                                                />
                                            )}
                                            {file.duplicate && (
                                                <Chip
                                                    label="Possible Duplicate"
                                                    size="small"
                                                    color="warning"
                                                    sx={{ml: 1}}
                                                />
                                            )}
                                        </Stack>
                                    }
                                    secondary={
                                        <Box>
                                            {file.tags &&
                                                file.tags.map((tag) => (
                                                    <Chip key={tag} label={tag} size="small" sx={{mr: 0.5}} />
                                                ))}
                                        </Box>
                                    }
                                    sx={{ml: 2}}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
// This component is used to display a list of media files with sorting and filtering options.