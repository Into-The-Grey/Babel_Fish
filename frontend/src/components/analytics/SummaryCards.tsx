// components/analytics/SummaryCards.tsx

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Unstable_Grid2 from "@mui/material/Unstable_Grid2";

export default function SummaryCards() {
    return (
        <Unstable_Grid2 container spacing={3} mb={4}>
            {/* Payloads */}
            <Unstable_Grid2 item xs={12} sm={6} md={3}>
                <Card sx={{background: "#1d2230", borderRadius: 3, boxShadow: 2}}>
                    <CardContent sx={{textAlign: "center"}}>
                        <Typography variant="h6" sx={{fontFamily: "var(--font-title)", color: "#00e6ff"}}>
                            Payloads
                        </Typography>
                        <Typography variant="h4" fontWeight={700} sx={{color: "#fff"}}>
                            42
                        </Typography>
                    </CardContent>
                </Card>
            </Unstable_Grid2>
            {/* Docs */}
            <Unstable_Grid2 item xs={12} sm={6} md={3}>
                <Card sx={{background: "#20293d", borderRadius: 3, boxShadow: 2}}>
                    <CardContent sx={{textAlign: "center"}}>
                        <Typography variant="h6" sx={{fontFamily: "var(--font-title)", color: "#79b8ff"}}>
                            Docs
                        </Typography>
                        <Typography variant="h4" fontWeight={700} sx={{color: "#fff"}}>
                            19
                        </Typography>
                    </CardContent>
                </Card>
            </Unstable_Grid2>
            {/* Media */}
            <Unstable_Grid2 item xs={12} sm={6} md={3}>
                <Card sx={{background: "#222827", borderRadius: 3, boxShadow: 2}}>
                    <CardContent sx={{textAlign: "center"}}>
                        <Typography variant="h6" sx={{fontFamily: "var(--font-title)", color: "#8de3ff"}}>
                            Media
                        </Typography>
                        <Typography variant="h4" fontWeight={700} sx={{color: "#fff"}}>
                            12
                        </Typography>
                    </CardContent>
                </Card>
            </Unstable_Grid2>
            {/* Users/Other (placeholder) */}
            <Unstable_Grid2 item xs={12} sm={6} md={3}>
                <Card sx={{background: "#25232c", borderRadius: 3, boxShadow: 2}}>
                    <CardContent sx={{textAlign: "center"}}>
                        <Typography variant="h6" sx={{fontFamily: "var(--font-title)", color: "#bafff5"}}>
                            Total Resources
                        </Typography>
                        <Typography variant="h4" fontWeight={700} sx={{color: "#fff"}}>
                            73
                        </Typography>
                    </CardContent>
                </Card>
            </Unstable_Grid2>
        </Unstable_Grid2>
    );
}
