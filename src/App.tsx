
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import BaghouseDesignPage from './pages/BaghouseDesignPage'
import { Toaster } from '@/components/ui/toaster'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/baghouse-design" element={<BaghouseDesignPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App
