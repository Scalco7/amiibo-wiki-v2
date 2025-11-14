import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { createPortal } from "react-dom";
import { useState } from "react";
import { AmiiboTypeEnum } from "../types/amiibo-type.enum";
import { useAmiibo } from "../contexts/AmiiboContext";

export default function CreateAmiiboModal({ open, onClose, gamesList }) {
  const { createAmiibo, error, clearError } = useAmiibo();

  const [amiiboData, setAmiiboData] = useState({
    name: "",
    type: "",
    game: "",
    releaseDateJapan: "",
    releaseDateBrazil: "",
  });

  const handleChange = (field) => (event) => {
    if (error) clearError();
    setAmiiboData({ ...amiiboData, [field]: event.target.value });
  };

  const resetForm = () => {
    setAmiiboData({
      name: "",
      type: "",
      game: "",
      releaseDateJapan: "",
      releaseDateBrazil: "",
    });
  };

  const handleCreate = async () => {
    const newAmiibo = await createAmiibo(amiiboData);
    if (newAmiibo) {
      handleClose();
    }
  }

  const handleClose = () => {
    if (error) clearError();
    resetForm();
    onClose();
  };

  return createPortal(
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Amiibo a sua coleção</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error">{error.message}</Alert>
          )}
          <TextField
            label="Nome"
            variant="outlined"
            value={amiiboData.name}
            onChange={handleChange("name")}
            fullWidth
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Tipo</InputLabel>
            <Select
              label="Tipo"
              value={amiiboData.type}
              onChange={handleChange("type")}
            >
              {Object.values(AmiiboTypeEnum).map((ev) => (
                <MenuItem value={ev}>{ev}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Jogo</InputLabel>
            <Select
              label="Jogo"
              value={amiiboData.game}
              onChange={handleChange("game")}
            >
              {gamesList.map((g) => (
                <MenuItem value={g._id}>{g.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Data de Lançamento (Japão)"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={amiiboData.releaseDateJapan}
              onChange={handleChange("releaseDateJapan")}
              fullWidth
              required
            />

            <TextField
              label="Data de Lançamento (Brasil)"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={amiiboData.releaseDateBrazil}
              onChange={handleChange("releaseDateBrazil")}
              fullWidth
              required
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Fechar
        </Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Criar
        </Button>
      </DialogActions>
    </Dialog>,
    document.getElementById("modal-root")
  );
}
