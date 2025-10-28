"use client"

import { useState, useEffect } from "react"
import { Calendar, MessageCircle, Users, BookOpen, BarChart3 } from "lucide-react"
import { getCurrentUser, refreshAccessToken, getUserInfo, logoutUser } from "services/UserService"
import AttendanceCheck from "attendance-check"
import Dashboard from "dashboard"
import Board from "board"
import Curriculum from "curriculum"
import CalendarView from "calendar"
import Chatbot from "chatbot"
import MainPage from "main"
import Settings from "settings"
import Notifications from "notifications"
import SearchModal from "search"
import Login from "login"
import Sidebar from "components/page/Sidebar"
import Header from "components/page/Header"
import MainContent from "components/page/MainContent"


export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userRole, setUserRole] = useState("coach")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // 로그인 처리 함수
  const handleLogin = (role: string, userData: any, token?: string) => {
    setCurrentUser(userData)
    setUserRole(role)
    setIsAuthenticated(true)
    setActiveTab("main")

    if (token) localStorage.setItem("token", token)
  }

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) throw new Error("엑세스 토큰이 없습니다.");

      // 서버에 로그아웃 요청 (쿠키 자동 포함)
      await logoutUser(accessToken);

      // 프론트 상태 초기화
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setCurrentUser(null);
      setActiveTab("dashboard");

      console.log("로그아웃 완료");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };


// useEffect 내부
useEffect(() => {
  const fetchUser = async () => {
    console.log("fetchUser 시작")
    setIsLoading(true)
    
    const params = new URLSearchParams(window.location.search)
    const oauthToken = params.get("token")
    console.log("OAuth 토큰:", oauthToken)
    
    if (oauthToken) {
      localStorage.setItem("token", oauthToken)
      console.log("토큰 저장됨:", oauthToken)
    }

    let token = localStorage.getItem("token")
    console.log("저장된 토큰:", token)
    
    if (!token) {
      console.log("토큰이 없음 - 로그인 화면으로")
      setIsAuthenticated(false)
      setCurrentUser(null)
      setIsLoading(false)
      return
    }

    // 1. accessToken으로 기본 사용자 정보 가져오기
    console.log("사용자 정보 요청 중...")
    let basicUser = await getCurrentUser(token)
    console.log("기본 사용자 정보:", basicUser)

    // 2. 만약 accessToken 만료 시 refresh 시도
    if (!basicUser) {
      console.log("토큰 만료 - 리프레시 시도")
      const newToken = await refreshAccessToken()
      console.log("새 토큰:", newToken)
      
      if (!newToken) {
        console.log("리프레시 실패 - 로그아웃")
        setIsAuthenticated(false)
        setCurrentUser(null)
        localStorage.removeItem("token")
        setIsLoading(false)
        return
      }
      localStorage.setItem("token", newToken)
      token = newToken
      basicUser = await getCurrentUser(token)
      if (!basicUser) {
        console.log("새 토큰으로도 사용자 정보 가져오기 실패")
        setIsAuthenticated(false)
        setCurrentUser(null)
        localStorage.removeItem("token")
        setIsLoading(false)
        return
      }
    }

    // 3. username 기반으로 상세 유저 정보 가져오기
    if (!basicUser.username) {
      console.log("username이 없음")
      setIsAuthenticated(false)
      setCurrentUser(null)
      localStorage.removeItem("token")
      setIsLoading(false)
      return
    }

    console.log("상세 사용자 정보 요청 중...", basicUser.username)
    const userData = await getUserInfo(basicUser.username, token)
    console.log("상세 사용자 정보:", userData)

    if (!userData) {
      console.log("상세 사용자 정보 가져오기 실패")
      setIsAuthenticated(false)
      setCurrentUser(null)
      localStorage.removeItem("token")
      setIsLoading(false)
      return
    }

    // 4. role 매핑
    let roleMapped: "admin" | "coach" | "student" = "coach"
    switch (userData.role) {
      case "ROLE_ADMIN":
        roleMapped = "admin"
        break
      case "ROLE_COACH":
        roleMapped = "coach"
        break
      case "ROLE_USER":
        roleMapped = "student"
        break
      default:
        roleMapped = "student"
    }

    // 5. 로그인 처리
    console.log("로그인 처리:", roleMapped, userData)
    handleLogin(roleMapped, userData, token)

    // 6. URL에서 token 제거
    const url = new URL(window.location.href)
    url.searchParams.delete("token")
    window.history.replaceState({}, "", url.toString())
    console.log("로그인 완료")
    setIsLoading(false)
  }

  fetchUser().catch(error => {
    console.error("fetchUser 에러:", error)
    setIsAuthenticated(false)
    setCurrentUser(null)
    setIsLoading(false)
  })
}, [])

  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <p className="text-neutral-600">로그인 확인 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return <Login onLogin={handleLogin} />

  const menuItems = [
    { id: "main", label: "메인페이지", icon: BarChart3, roles: ["coach", "admin", "user"] },
    // { id: "dashboard", label: "대시보드", icon: BarChart3, roles: ["coach", "admin"] },
    { id: "attendance", label: "좌석 배치도", icon: Users, roles: ["coach"] },
    { id: "board", label: "게시판", icon: MessageCircle, roles: ["coach", "admin", "user"] },
    { id: "curriculum", label: "커리큘럼", icon: BookOpen, roles: ["coach", "admin", "user"] },
    { id: "calendar", label: "스케쥴", icon: Calendar, roles: ["coach", "admin", "user"] },
  ]

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(userRole))

  const token = localStorage.getItem("token")
  const renderContent = () => {
    switch (activeTab) {
      case "main": return <MainPage userRole={userRole} currentUser={currentUser} onNavigate={setActiveTab} />
      case "dashboard": return <Dashboard userRole={userRole} />
      case "attendance": return <AttendanceCheck userToken={token}/>
      case "board": return <Board userRole={userRole} />
      case "curriculum": return <Curriculum />
      case "calendar": return <CalendarView userRole={userRole} />
      default: return <Dashboard userRole={userRole} />
    }
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredMenuItems={filteredMenuItems}
        currentUser={currentUser}
        userRole={userRole as "coach" | "admin" | "user"}
        handleLogout={handleLogout}
        setShowSearch={setShowSearch}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          activeTab={activeTab}
          filteredMenuItems={filteredMenuItems}
          currentUser={currentUser}
          setSidebarOpen={setSidebarOpen}
          onShowNotifications={() => setShowNotifications(true)}
          onShowSettings={() => setShowSettings(true)}
        />
        <MainContent renderContent={renderContent} />
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Modals */}
      {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} onNavigate={setActiveTab} />}
      {showSettings && <Settings userRole={userRole} onClose={() => setShowSettings(false)} currentUser={currentUser} />}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
