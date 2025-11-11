import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
import { useState } from "react";
import { useAmiibo } from "./contexts/AmiiboContext";
import AmiiboList from "./components/AmiiboList";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [searchInputError, setSearchInputError] = useState(null);
  const { searchAmiibos, loading } = useAmiibo();

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

  return (
    <main>
      <img src="amibo-banner.png" alt="banner" />
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
      </div>
        <AmiiboList />
    </main>
  );
}

export default App;
