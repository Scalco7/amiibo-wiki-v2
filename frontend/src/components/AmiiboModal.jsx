import { createPortal } from "react-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import StyleIcon from '@mui/icons-material/Style';
import { formatDate } from "../utils/formatDate";

export default function AmiiboModal({ open, onClose, amiibo }) {
  if (!open || !amiibo) return null;

  return createPortal(
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ 
        backgroundColor: amiibo.game?.color || 'primary.main',
        color: 'white'
      }}>
        {amiibo.name}
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <StyleIcon fontSize="inherit" />
          <Typography><strong>Tipo:</strong> {amiibo.type}</Typography>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <VideogameAssetIcon fontSize="inherit" />
          <Typography><strong>Jogo:</strong> {amiibo.game.name}</Typography>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img
            src={"/amiibo-wiki/flags/brazil.svg"}
            alt={"Brasil"}
            style={{
              display: "block",
              maxHeight: "16px",
              maxWidth: "16px",
              objectFit: "contain",
            }}
          />
          <Typography><strong>Lançamento (BR):</strong> {formatDate(amiibo.releaseDateBrazil)}</Typography>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img
            src={"/amiibo-wiki/flags/japan.svg"}
            alt={"Japão"}
            style={{
              display: "block",
              maxHeight: "16px",
              maxWidth: "16px",
              objectFit: "contain",
            }}
          />
          <Typography><strong>Lançamento (JP):</strong> {formatDate(amiibo.releaseDateJapan)}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>,
    document.getElementById("modal-root")
  );
}
