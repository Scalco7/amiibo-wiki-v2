import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

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
            <CardMedia
                component="img"
                image={amiibo.image}
                alt={amiibo.name}
                loading="lazy"
                sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "contain",
                    padding: "1rem",
                    backgroundColor: "rgba(255, 0, 255, 0)",
                    margin: 'auto'
                }}
            />
            <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" noWrap>
                    {amiibo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Série: {amiibo.amiiboSeries}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
}