"use client"

import { Menu, Bell, Settings as SettingsIcon } from "lucide-react"
import { Button } from "components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"

interface HeaderProps {
  activeTab: string
  filteredMenuItems: any[]
  currentUser: any
  setSidebarOpen: (open: boolean) => void
  onShowNotifications: () => void
  onShowSettings: () => void
}

export default function Header({
  activeTab,
  filteredMenuItems,
  currentUser,
  setSidebarOpen,
  onShowNotifications,
  onShowSettings,
}: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 h-20 flex items-center justify-between px-8">
      <div className="flex items-center space-x-6">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            {filteredMenuItems.find((item) => item.id === activeTab)?.label || "Overview"}
          </h1>
          <p className="text-sm text-neutral-500 font-medium">
            {new Date().toLocaleDateString("ko-KR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative rounded-full" onClick={onShowNotifications}>
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-system-red rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={onShowSettings}>
          <SettingsIcon className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10 ring-2 ring-neutral-200">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback className="bg-system-blue text-white">{currentUser?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
