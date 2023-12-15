import React, { createContext, useContext, useEffect, useState } from "react";
import assetsService from "../services/assets.service";

const GlobalsContext = createContext({
  supportedModels: null,
  supportedStrategies: null,
  assetClasses: null,
});

export const useGlobals = () => useContext(GlobalsContext);

export const GlobalsProvider = ({ children }) => {
  const [supportedModels, setSupportedModels] = useState(null);
  const [supportedStrategies, setSupportedStrategies] = useState(null);
  const [assetClasses, setAssetClasses] = useState(null);

  const getAndSetSupportedModels = () => {
    assetsService
      .getSupportedModels()
      .then((response) => {
        // console.log("Supported models: ", response.data)
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          setSupportedModels(data.result);
          // console.log("Supported models set successfully")
        } else {
          // console.log("Error in getting supported models: ", data)
          throw new Error("Error in getting supported models");
        }
      })
      .catch((error) => {
        // console.log("Error in getting supported models: ", error)
        alert("Error in getting supported models: " + error.message);
      });
  };

  const getAndSetSupportedStartegies = () => {
    assetsService
      .getExecutionStrategies()
      .then((response) => {
        // console.log("Execution strategies: ", response.data)
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          setSupportedStrategies(data.result);
          // console.log("Supported strategies set successfully")
        } else {
          // console.log("Error in getting supported strategies: ", data)
          throw new Error("Error in getting supported strategies");
        }
      })
      .catch((error) => {
        // console.log("Error in getting supported strategies: ", error)
        alert("Error in getting supported strategies: " + error.message);
      });
  };

  const getAndSetAssetClasses = () => {
    assetsService
      .getAssetClasses()
      .then((response) => {
        // console.log("Execution strategies: ", response.data)
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          setAssetClasses(data.result);
          // console.log("Supported strategies set successfully")
        } else {
          // console.log("Error in getting supported strategies: ", data)
          throw new Error("Error in getting asset classes");
        }
      })
      .catch((error) => {
        // console.log("Error in getting supported strategies: ", error)
        alert("Error in getting asset classes: " + error.message);
      });
  };

  useEffect(() => {
    getAndSetSupportedModels();
    getAndSetSupportedStartegies();
    getAndSetAssetClasses();
  }, []);

  return (
    <GlobalsContext.Provider
      value={{
        supportedModels,
        supportedStrategies,
        assetClasses,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};
