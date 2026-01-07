import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GamePage } from "./pages/GamePage"
import { HomePage } from "./pages/HomePage"
import { GuestRoute, ProtectedRoute } from "./util/auth"
import GameMenuPage from "./pages/GameMenuPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute/>}>
          <Route path="/" element={<HomePage/>}/>
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/game-menu" element={<GameMenuPage/>}/>
          <Route path="/game" element={<GamePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
