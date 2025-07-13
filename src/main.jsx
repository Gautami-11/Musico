//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from "react-dom/client";
import { AudioProvider } from "./context/AudioContext";
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <AudioProvider>         
    <App />
  </AudioProvider>
 
)
