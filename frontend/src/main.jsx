import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import 'rsuite/dist/rsuite.min.css'; 
import {studioTheme, ThemeProvider} from '@sanity/ui'
import { SpeedInsights } from "@vercel/speed-insights/react"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<ThemeProvider theme={studioTheme}>
<App />
<SpeedInsights/>
</ThemeProvider>
      
   
  </React.StrictMode>
)
