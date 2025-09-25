"use client"

import { X, Search, LogOut } from "lucide-react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import { Badge } from "components/ui/badge"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  filteredMenuItems: any[]
  currentUser: any
  userRole: "admin" | "coach" | "user"
  handleLogout: () => void
  setShowSearch: (open: boolean) => void
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  filteredMenuItems,
  currentUser,
  userRole,
  handleLogout,
  setShowSearch,
}: SidebarProps) {
  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-neutral-200/50 shadow-2xl transform transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-20 px-8 border-b border-neutral-200/50">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("main")}>
          <div className="w-10 h-10 bg-neutral-900 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">Y</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">YearDream</h1>
            <p className="text-xs text-neutral-500 font-medium">Learning Platform</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-6">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search..."
            className="pl-12 bg-neutral-100/50 border-0 rounded-2xl h-12 text-sm font-medium placeholder:text-neutral-400"
            onFocus={() => setShowSearch(true)}
          />
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4 p-4 bg-neutral-100/50 rounded-3xl mb-8">
          <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-system-blue text-white font-semibold">
              {currentUser?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-neutral-900">{currentUser?.name || "사용자"}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge
                variant="outline"
                className={`text-xs font-medium border-0 ${
                  userRole === "admin"
                    ? "bg-system-purple/10 text-system-purple"
                    : userRole === "coach"
                    ? "bg-system-blue/10 text-system-blue"
                    : "bg-system-green/10 text-system-green"
                }`}
              >
                {userRole === "admin" ? "관리자" : userRole === "coach" ? "코치" : "수강생"}
              </Badge>

              <p className="text-xs text-neutral-500">{currentUser?.department || currentUser?.seat || ""}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-left transition-all duration-300 group ${
                  activeTab === item.id
                    ? "bg-neutral-900 text-white shadow-lg"
                    : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="mt-8 pt-6 border-t border-neutral-200/50">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start text-neutral-600 hover:text-system-red hover:border-system-red/20 hover:bg-system-red/5 rounded-2xl h-12 bg-transparent"
          >
            <LogOut className="h-5 w-5 mr-4" />
            <span className="font-medium">로그아웃</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
