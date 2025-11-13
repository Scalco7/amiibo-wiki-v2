import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { AmiiboApi } from '../api/amiibo-api';

const amiiboApi = new AmiiboApi();

const AmiiboContext = createContext();

export const AmiiboProvider = ({ children }) => {
    const [amiibos, setAmiibos] = useState([]);
    const [allAmiibos, setAllAmiibos] = useState([]);
    const [selectedAmiibo, setSelectedAmiibo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAmiibos();
    }, []);

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
            if (newAmiibo.error) {
                throw new Error(newAmiibo.error);
            }
            // Atualiza a lista de amiibos com o novo item
            setAmiibos(prev => [newAmiibo, ...prev]);
            setAllAmiibos(prev => [newAmiibo, ...prev]);
            return newAmiibo;
        } catch (e) {
            setError(e);
            return null;
        } finally {
            setLoading(false);
        }
    };

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
                createAmiibo 
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
    if (!context) throw new Error("useAmiibo deve ser usado dentro do AmiiboProvider");
    return context;
};
