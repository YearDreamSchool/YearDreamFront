"use client"

import { useState, useEffect } from "react"
import { Calendar, MessageCircle, Users, BookOpen, BarChart3 } from "lucide-react"
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
import axios from "axios"
import Login from "login"
import UserProfile from "components/UserProfile"
import Sidebar from "components/Sidebar"
import Header from "components/Header"
import MainContent from "components/MainContent"

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
    setActiveTab(role === "student" ? "main" : "dashboard")

    if (token) localStorage.setItem("token", token)
    localStorage.setItem("yeardream_user", JSON.stringify(userData))
    console.log("로그인 완료:", userData, role)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("yeardream_user")
    setIsAuthenticated(false)
    setCurrentUser(null)
    setActiveTab("dashboard")
    console.log("로그아웃 완료")
  }

  useEffect(() => {
  const fetchCurrentUser = async () => {
    const params = new URLSearchParams(window.location.search)
    const oauthToken = params.get("token")

    if (oauthToken) localStorage.setItem("token", oauthToken)

    const token = localStorage.getItem("token")
    if (!token) {
      setIsAuthenticated(false)
      setCurrentUser(null)
      return
    }

    try {
      const res = await axios.get("http://localhost:8080/api/users/logined", {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = res.data
      console.log("사용자 정보:", data)

      if (data && data.name && data.role) {
        // 백엔드 role 매핑
        let roleMapped: "admin" | "coach" | "student" = "coach"
        if (data.role === "ROLE_ADMIN") roleMapped = "admin"
        else if (data.role === "ROLE_USER") roleMapped = "coach" // 또는 student로 바꾸고 싶으면 변경

        handleLogin(roleMapped, { name: data.name }, token)
      } else {
        setIsAuthenticated(false)
        setCurrentUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("yeardream_user")
      }
    } catch (err) {
      console.error("사용자 정보 가져오기 실패:", err)
      setIsAuthenticated(false)
      setCurrentUser(null)
    }

    const url = new URL(window.location.href)
    url.searchParams.delete("token")
    window.history.replaceState({}, "", url.toString())
  }

  fetchCurrentUser()
}, [])

  if (!isAuthenticated) return <Login onLogin={handleLogin} />

  const menuItems = [
    { id: "main", label: "Home", icon: BarChart3, roles: ["coach", "admin", "student"] },
    { id: "dashboard", label: "Overview", icon: BarChart3, roles: ["coach", "admin"] },
    { id: "attendance", label: "Attendance", icon: Users, roles: ["coach"] },
    { id: "board", label: "Community", icon: MessageCircle, roles: ["coach", "admin", "student"] },
    { id: "curriculum", label: "Learning", icon: BookOpen, roles: ["coach", "admin", "student"] },
    { id: "calendar", label: "Schedule", icon: Calendar, roles: ["coach", "admin", "student"] },
  ]

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(userRole))

  const renderContent = () => {
    switch (activeTab) {
      case "main": return <MainPage userRole={userRole} currentUser={currentUser} onNavigate={setActiveTab} />
      case "dashboard": return <Dashboard userRole={userRole} />
      case "attendance": return <AttendanceCheck />
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
        userRole={userRole as "coach" | "admin" | "student"}
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
