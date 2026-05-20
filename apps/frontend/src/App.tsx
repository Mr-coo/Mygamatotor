import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GamePage } from "./pages/GamePage"
import { HomePage } from "./pages/HomePage"
import { GuestRoute, ProtectedRoute } from "./util/auth"
import GameMenuPage from "./pages/GameMenuPage"
import { ErrorBoundary } from "./component/ErrorBoundary"
import { ErrorDialog } from "./component/ErrorDialog"

function App() {
  return (
    <ErrorBoundary>
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
        <ErrorDialog />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
