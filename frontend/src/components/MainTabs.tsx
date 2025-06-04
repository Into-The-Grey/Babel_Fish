import { Tab, Tabs } from "@mui/material";

export interface MainTab {
    label: string;
    value: string;
    icon: React.ReactNode;
}

interface MainTabsProps {
    tabs: MainTab[];
    value: string;
    onChange: (newValue: string) => void;
}

export default function MainTabs({ tabs, value, onChange }: MainTabsProps) {
    return (
        <Tabs
            value={value}
            onChange={(_, v) => onChange(v)}
            aria-label="Main Data Tabs"
            sx={{
                mb: 2,
                ".MuiTab-root": {
                    fontFamily: "var(--font-title)",
                    fontWeight: 700,
                    letterSpacing: 2,
                    fontSize: { xs: 14, md: 19 },
                    color: "#79b8ff",
                    "&.Mui-selected": {
                        color: "#22eaff",
                        textShadow: "0 2px 18px #1eeeff44, 0 1px 1px #0d1e29",
                        borderBottom: "2.5px solid #15f6ff",
                    },
                },
            }}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
        >
            {tabs.map((tab) => (
                <Tab
                    key={tab.value}
                    icon={tab.icon ? tab.icon as React.ReactElement : undefined}
                    label={tab.label}
                    value={tab.value}
                />
            ))}
        </Tabs>
    );
}
