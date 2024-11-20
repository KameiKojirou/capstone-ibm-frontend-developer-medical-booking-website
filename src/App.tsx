import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home }from './pages/Home'
import { About } from './pages/About'
import { NavBar } from './components/NavBar'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="p-4">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
