// QueryStringContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Utility function to parse query string
const parseQueryString = (search) => {
  return search
    .substring(1)
    .split('&')
    .reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      acc[key] = decodeURIComponent(value || '');
      return acc;
    }, {});
};

// Create context
const QueryStringContext = createContext();

// Create provider component
export const QueryStringProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [queryDict, setQueryDict] = useState(parseQueryString(location.search));
  
  useEffect(() => {
      // console.log("akash Update Location search changed:", location.search);
      setQueryDict(parseQueryString(location.search));
  }, [location.search]);
  
  const updateQueryKeys = (updatedDict) => {
    // console.log("akash Update query dict: ", updatedDict, queryDict)
    const newQueryDict = {...queryDict};
    for (const [key, value] of Object.entries(updatedDict)) {
        newQueryDict[key] = value;
    }
    // console.log("akash Update query dict: ", newQueryDict)
    setQueryDict(newQueryDict);
    const newQueryString = '?' + new URLSearchParams(newQueryDict).toString();
    // console.log("akash Update query dict: ", newQueryString)
    navigate(`${location.pathname}${newQueryString}`);
  };

  const deleteQueryKeys = (keys) => {
    const newQueryDict = { ...queryDict };
    for (const key of keys) {
      delete newQueryDict[key];
    }
    setQueryDict(newQueryDict);
    const newQueryString = '?' + new URLSearchParams(newQueryDict).toString();
    navigate(`${location.pathname}${newQueryString}`);
  };
  return (
    <QueryStringContext.Provider value={{ queryDict, updateQueryKeys, deleteQueryKeys }}>
      {children}
    </QueryStringContext.Provider>
  );
};

// Custom hook to use the context
export const useQueryString = () => {
  const context = useContext(QueryStringContext);
  if (!context) {
    throw new Error('useQueryString must be used within a QueryStringProvider');
  }
  return context;
};
