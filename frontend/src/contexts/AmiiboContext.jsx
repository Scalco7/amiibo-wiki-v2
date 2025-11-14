import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { AmiiboApi } from "../api/amiibo-api";

const amiiboApi = new AmiiboApi();

const AmiiboContext = createContext();

export const AmiiboProvider = ({ children }) => {
  const [amiibos, setAmiibos] = useState([]);
  const [allAmiibos, setAllAmiibos] = useState([]);
  const [selectedAmiibo, setSelectedAmiibo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAmiibos = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await amiiboApi.getAmiibos(filters);
      if (data.error) {
        throw new Error(data.error);
      }
      setAmiibos(data);
      if (Object.keys(filters).length === 0) {
        setAllAmiibos(data);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const createAmiibo = async (amiiboData) => {
    try {
      setLoading(true);
      setError(null);
      const newAmiibo = await amiiboApi.createAmiibo(amiiboData);
      console.log(newAmiibo);
      if (newAmiibo.error) {
        throw new Error(newAmiibo.error);
      }
      if (newAmiibo.errors) {
        const messages = newAmiibo.errors.map((err) => err.msg).join(" ");
        throw new Error(messages);
      }
      setAmiibos((prev) => [newAmiibo, ...prev]);
      setAllAmiibos((prev) => [newAmiibo, ...prev]);
      return newAmiibo;
    } catch (e) {
      console.log("erro - ", e);
      setError(e);

      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const searchAmiibos = async (searchValue) => {
    await fetchAmiibos({ name: searchValue });
  };

  const resetSearch = () => {
    setAmiibos(allAmiibos);
  };

  const selectAmiibo = (amiibo) => {
    setSelectedAmiibo(amiibo);
  };

  return (
    <AmiiboContext.Provider
      value={{
        amiibos,
        selectedAmiibo,
        loading,
        error,
        selectAmiibo,
        searchAmiibos,
        resetSearch,
        createAmiibo,
        clearError,
      }}
    >
      {children}
    </AmiiboContext.Provider>
  );
};

AmiiboProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAmiibo = () => {
  const context = useContext(AmiiboContext);
  if (!context)
    throw new Error("useAmiibo deve ser usado dentro do AmiiboProvider");
  return context;
};
