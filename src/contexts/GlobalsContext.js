import React, {createContext, useContext, useEffect, useState} from 'react';
import assetsService from '../services/assets.service';

const GlobalsContext = createContext({
    supportedModels: null,
    supportedStrategies: null
});

export const useGlobals = () => useContext(GlobalsContext);

export const GlobalsProvider = ({children}) => {
    const [supportedModels, setSupportedModels] = useState(null);
    const [supportedStrategies, setSupportedStrategies] = useState(null);

    const getAndSetSupportedModels = () => {
        assetsService.getSupportedModels()
        .then((response) => {
            console.log("Supported models: ", response.data)
            return response.data
        })
        .then((data) => {
            if (data.success) {
                setSupportedModels(data.result)
                console.log("Supported models set successfully")
            } else {
                console.log("Error in getting supported models: ", data)
                throw new Error("Error in getting supported models")
            }
        })
        .catch((error) => {
            console.log("Error in getting supported models: ", error)
            alert("Error in getting supported models: " + error.message)
        })
    }

    const getAndSetSupportedStartegies = () => {
        setSupportedStrategies(["plan_execute", "reason_execute"])
    }

    useEffect(() => {
        getAndSetSupportedModels();
        getAndSetSupportedStartegies();
    }, []);

    return (
        <GlobalsContext.Provider value={{supportedModels, supportedStrategies}}>
            {children}
        </GlobalsContext.Provider>
    )
}