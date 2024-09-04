import { useContext } from 'react';
import { BikeContext } from '../contexts/BikeContext';

export const useBike = () => {
    const context = useContext(BikeContext);

    if (context === null) {
        throw new Error('useBikeForm must be used within a BikeContextProvider!');
    }

    return context;
}
