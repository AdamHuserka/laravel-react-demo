import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    notification: '',
    setNotification: () => {},
})

export const ContextProvider = ({children}) => {

    const [notification, _setNotification] = useState('');

    const setNotification = (message) => {
        _setNotification(message);
        console.log("Notification set: " + message);
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

export const useStateContext = () => useContext(StateContext);
