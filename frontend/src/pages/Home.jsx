import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAmiibo } from "../contexts/AmiiboContext";
import AmiiboList from "../components/AmiiboList";
import CreateAmiiboModal from "../components/CreateAmiiboModal";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { AmiiboApi } from "../api/amiibo-api";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [searchInputError, setSearchInputError] = useState(null);
  const [crateIsOpen, setCreateIsOpen] = useState(false);
  const [gamesList, setGamesList] = useState([]);
  const { searchAmiibos, createAmiibo } = useAmiibo();
  const navigate = useNavigate();

  const amiiboApi = new AmiiboApi();

  useEffect(() => {
    fetchGames();
    searchAmiibos();
  }, []);

  async function fetchGames() {
    const games = await amiiboApi.getGames();
    setGamesList(games);
  }

  function onChangeTextField(event) {
    setSearchValue(event.target.value);
    if (event.target.value.trim()) setSearchInputError(null);
  }

  function onClickSearchButton() {
    if (!searchValue.trim()) {
      setSearchInputError("Digite um valor para pesquisar");
      return;
    }
    searchAmiibos(searchValue);
  }

  function onClickAddButton() {
    setCreateIsOpen(true);
  }

  function handleClose() {
    setCreateIsOpen(false);
  }

  async function handleCreate(amiiboData) {
    await createAmiibo(amiiboData);
    handleClose();
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <main>
      <img src="amiibo-wiki/amibo-banner.png" alt="banner" />
      <div className="search-section">
        <div className="search-input">
          <TextField
            id="text-input"
            label="Pesquisar"
            variant="outlined"
            value={searchValue}
            error={!!searchInputError}
            helperText={searchInputError}
            onChange={onChangeTextField}
            fullWidth
          />
        </div>

        <Button
          id="search-button"
          variant="outlined"
          size="large"
          style={{ padding: 0, height: 56, fontSize: 30 }}
          onClick={onClickSearchButton}
          disableElevation
        >
          <SearchIcon fontSize="inherit" />
        </Button>

        <Button
          id="add-button"
          variant="contained"
          size="large"
          style={{ padding: 0, height: 56, fontSize: 30 }}
          onClick={onClickAddButton}
          disableElevation
        >
          <AddIcon fontSize="inherit" />
        </Button>

        <Button
          id="logout-button"
          variant="outlined"
          color="error"
          size="large"
          style={{ padding: 0, height: 56, fontSize: 30 }}
          onClick={handleLogout}
          disableElevation
        >
          <LogoutIcon fontSize="inherit" />
        </Button>
      </div>
      <AmiiboList />
      <CreateAmiiboModal
        open={crateIsOpen}
        onClose={handleClose}
        onCreate={handleCreate}
        gamesList={gamesList}
      />
    </main>
  );
}
