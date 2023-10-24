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
      console.log("Location search changed:", location.search);
      setQueryDict(parseQueryString(location.search));
  }, [location.search]);
  
  const updateQueryKey = (key, value) => {
    const newQueryDict = { ...queryDict, [key]: value };
    setQueryDict(newQueryDict);
    const newQueryString = '?' + new URLSearchParams(newQueryDict).toString();
    navigate(`${location.pathname}${newQueryString}`);
  };

  const deleteQueryKey = (key) => {
    const newQueryDict = { ...queryDict };
    delete newQueryDict[key];
    setQueryDict(newQueryDict);
    const newQueryString = '?' + new URLSearchParams(newQueryDict).toString();
    navigate(`${location.pathname}${newQueryString}`);
  };
  return (
    <QueryStringContext.Provider value={{ queryDict, updateQueryKey, deleteQueryKey }}>
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
