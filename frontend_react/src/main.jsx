import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import 'rsuite/dist/rsuite.min.css'; 
import {studioTheme, ThemeProvider} from '@sanity/ui'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<ThemeProvider theme={studioTheme}>
<App />
</ThemeProvider>
      
   
  </React.StrictMode>
)
