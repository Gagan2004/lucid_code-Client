import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@xyflow/react/dist/style.css';
import { ReactFlowProvider } from '@xyflow/react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
</React.StrictMode>
)
