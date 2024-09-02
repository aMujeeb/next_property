'use client';

import { createContext, useContext, useState } from 'react';

//Create context
export const GlobalContext = createContext<any>(null);

interface Props {
    children: React.ReactNode
}

//create provider
export const GlobalProvider = ({ children }: Props) => {
    const [unReadCount, setUnReadCount] = useState(0);

    return (
        <GlobalContext.Provider value= {{ unReadCount, setUnReadCount }
}>
    { children }
    </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}