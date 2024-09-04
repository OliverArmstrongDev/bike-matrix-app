import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';


export const useApp = () => {
    const context = useContext(AppContext);

    if (context === null) {
        throw new Error('useBikeForm must be used within a AppContextProvider!');
    }

    return context;
}
