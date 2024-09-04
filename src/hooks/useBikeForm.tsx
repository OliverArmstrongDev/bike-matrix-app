import { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';

export const useBikeForm = () => {
    const context = useContext(FormContext);

    if (context === null) {
        throw new Error('useBikeForm must be used within a FormContextProvider!');
    }

    return context;
}
