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
} from "@mui/material";
import { createPortal } from "react-dom";
import { useState } from "react";
import { AmiiboTypeEnum } from "../types/amiibo-type.enum";

export default function CreateAmiiboModal({ open, onClose, onCreate }) {
  const [amiiboData, setAmiiboData] = useState({
    name: "",
    type: "",
    gameId: "",
    releaseDateJapan: "",
    releaseDateBrazil: "",
  });

  const handleChange = (field) => (event) => {
    setAmiiboData({ ...amiiboData, [field]: event.target.value });
  };

  const resetForm = () => {
    setAmiiboData({
      name: "",
      type: "",
      gameId: "",
      releaseDateJapan: "",
      releaseDateBrazil: "",
    });
  };

  const handleSubmit = () => {
    onCreate(amiiboData);
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return createPortal(
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Amiibo a sua coleção</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ mt: 1 }}>
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
              value={amiiboData.gameId}
              onChange={handleChange("gameId")}
            >
              <MenuItem value="mario">Mario</MenuItem>
              <MenuItem value="sonic">Sonic</MenuItem>
              <MenuItem value="zelda">Zelda</MenuItem>
              <MenuItem value="pokemon">Pokémon</MenuItem>
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
        <Button onClick={onCreate} variant="contained" color="primary">
          Criar
        </Button>
      </DialogActions>
    </Dialog>,
    document.getElementById("modal-root")
  );
}
