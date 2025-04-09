import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Analytics from './components/analytics.jsx'
import FullAnal from './components/FullAnal.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Routes>
        <Route path='/' element = {<App />}/>
        <Route path='/links' element = {<FullAnal />}/>
        <Route path='/links/:id' element = {<Analytics />}/>
      </Routes>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)
