import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MortgageAnalyzer from './MortgageAnalyzer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MortgageAnalyzer/>
  </StrictMode>,
)
