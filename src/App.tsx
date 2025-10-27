import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Page from "page"
import OAuthRedirectHandler from "./components/page/OAuthRedirectHandler"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/oauth/redirect" element={<OAuthRedirectHandler />} />
        <Route path="/login/oauth2/code/google" element={<OAuthRedirectHandler />} />
      </Routes>
    </Router>
  )
}