import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.js'


/*
    Get an element with ReactDOM.createRoot() where
    our component can be mounted 
*/ 
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
   
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


