import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Modules from './pages/Modules.jsx'
import ModuleDetail from './pages/ModuleDetail.jsx'
import About from './pages/About.jsx'
import Favorites from './pages/Favorites.jsx'
import Recents from './pages/Recents.jsx'
import './App.css'

/**
 * App — Layout principal de StudyHub ENSAM
 * 
 * Structure : Sidebar (fixe) + zone principale (Navbar + contenu + Footer)
 * La sidebar est collapsible sur mobile via un hamburger dans la Navbar.
 */
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      {/* Menu latéral fixe */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Zone principale */}
      <div className="main-area">
        {/* Barre de navigation supérieure */}
        <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        
        {/* Contenu des pages */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/module/:id" element={<ModuleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/favoris" element={<Favorites />} />
            <Route path="/recents" element={<Recents />} />
          </Routes>
        </main>
        
        {/* Pied de page */}
        <Footer />
      </div>
    </div>
  )
}

export default App
