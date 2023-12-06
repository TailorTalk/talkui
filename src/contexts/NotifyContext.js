
import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Create a context with a default empty state
const NotifyContext = createContext({
  messages: [],
  addMessage: () => {},
  addErrorMessage: () => {},
  removeMessage: () => {}
});

export const useNotify = () => useContext(NotifyContext);

// Create a provider component
export const NotifyProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const snackbarBaseOffset = 20; // Adjust this value as needed for your design
  const snackbarIncrement = 60; // Incremental offset for each additional Snackbar

  // Add a message to the array
  const addMessage = (content, type) => {
    if (!type) {
      type = 'info';
    }
    const newMessage = { type, content, key: new Date().getTime() }; // use timestamp as unique key
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const addErrorMessage = (content) => {
    addMessage(content, "error");
  };

  // Remove a message from the array by key
  const removeMessage = (key) => {
    setMessages(prevMessages => prevMessages.filter(message => message.key !== key));
  };

  // console.log("Messages in NotifyContext: ", messages)

  return (
    <NotifyContext.Provider value={{ messages, addMessage, addErrorMessage, removeMessage }}>
      {children}
      {messages.map((message, index) => {
        // Calculate the top offset for each Snackbar based on its index
        const topOffset = snackbarBaseOffset + index * snackbarIncrement;

        return (
          <Snackbar
            key={message.key}
            open={true}
            onClose={() => removeMessage(message.key)}
            message={message.content}
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={() => removeMessage(message.key)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            {...(message.type !== 'error' ? { autoHideDuration: 2000 } : {autoHideDuration: null})}
            // Adjust the style to position each Snackbar below the previous one
            style={{ top: `${topOffset}px` }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          />
        );
      })}
    </NotifyContext.Provider>
  );
};
