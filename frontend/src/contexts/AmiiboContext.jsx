import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { AmiiboApi } from '../api/amiibo-api';

const amiiboApi = new AmiiboApi();

const AmiiboContext = createContext();

export const AmiiboProvider = ({ children }) => {
    const [amiibos, setAmiibos] = useState([]);
    const [selectedAmiibo, setSelectedAmiibo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let allAmiibos = []

    useEffect(() => {
        fetchAmiibos();
    }, []);

    const fetchAmiibos = async () => {
        try {
            setLoading(true);
            const data = (await amiiboApi.getAmiibos()).slice(0, 100);
            setAmiibos(data);
            allAmiibos = data;
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const searchAmiibos = async (searchValue) => {
        try {
            setLoading(true);
            const data = (await amiiboApi.searchAmiibos(searchValue)).slice(0, 100);
            setAmiibos(data);
        } catch (e) {
            console.log(e)
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const resetSearch = () => {
        setAmiibos(allAmiibos);
    };

    const selectAmiibo = (amiibo) => {
        setSelectedAmiibo(amiibo);
    };

    return (
        <AmiiboContext.Provider value={{ amiibos, selectedAmiibo, selectAmiibo, searchAmiibos, resetSearch, loading, error }}>
            {children}
        </AmiiboContext.Provider>
    );
};

AmiiboProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAmiibo = () => {
    const context = useContext(AmiiboContext);
    if (!context) throw new Error("useAmiibo deve ser usado dentro do AmiiboProvider");
    return context;
};
