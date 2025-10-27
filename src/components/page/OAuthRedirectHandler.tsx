import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function OAuthRedirectHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (token) {
      localStorage.setItem("token", token)
      navigate("/") // 로그인 후 홈으로 이동
    }
  }, [navigate])

  return <div>Logging in...</div>
}
