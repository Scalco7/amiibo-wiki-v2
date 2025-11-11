import { Typography, Grid } from "@mui/material";
import { useState } from "react";
import { useAmiibo } from "../contexts/AmiiboContext";
import Modal from "./Modal";
import Amiibo from "./Amiibo";

export default function AmiiboList() {
  const { amiibos, loading, error } = useAmiibo();
  const [open, setOpen] = useState(false);
  const [selectedAmiibo, setSelectedAmiibo] = useState(null);

  if (loading) return <Typography variant="h6">Carregando...</Typography>;
  if (error) return <Typography color="error">Erro ao carregar dados</Typography>;
  if (!amiibos || amiibos.length === 0)
    return <Typography variant="h6">Nenhum resultado encontrado</Typography>;

  function handleOpen(amiibo) {
    setSelectedAmiibo(amiibo);
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
    setSelectedAmiibo(null);
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        {amiibos.map((amiibo) => (
          <Amiibo key={amiibo.head + amiibo.tail} amiibo={amiibo} onClick={(a) => handleOpen(a)} />
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose} amiibo={selectedAmiibo} />
    </>
  );
}
