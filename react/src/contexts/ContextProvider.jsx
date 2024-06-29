import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    notification: null,
    setNotification: undefined
})

export const ContextProvider = ({children}) => {

    const [notification, _setNotification] = useState('');

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('');
        }, 5000);
    }

    return (
        <StateContext.Provider value={{
            notification,
            setNotification,
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => {
    const context = useContext(StateContext);

    if (context === undefined) {
        throw new Error('`useStateContext` must be used within a `ContextProvider`');
    }

    return context;
};
