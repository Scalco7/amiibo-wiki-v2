import { Card, CardContent, Typography, Grid } from "@mui/material";
import Face2Icon from '@mui/icons-material/Face2';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

export default function Amiibo({ amiibo, onClick }) {
    return <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
            sx={{
                maxWidth: 280,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
            }}
            onClick={() => onClick(amiibo)}
        >
            <CardContent sx={{ textAlign: "start" }}>
                <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                    <Face2Icon fontSize="inherit"/>
                    <Typography variant="h6" noWrap>
                        {amiibo.name}
                    </Typography>
                </div>
                <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                    <VideogameAssetIcon fontSize="inherit"/>
                    <Typography variant="body2" color="text.secondary">
                        Série: {amiibo.amiiboSeries}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    </Grid>
}