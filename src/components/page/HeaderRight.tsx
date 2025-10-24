"use client"

import { Bell, SettingsIcon } from "lucide-react"
import { Button } from "components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"

interface HeaderRightProps {
  currentUser: { name?: string }
  onShowNotifications: () => void
  onShowSettings: () => void
}

export default function HeaderRight({ currentUser, onShowNotifications, onShowSettings }: HeaderRightProps) {
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full"
        onClick={onShowNotifications}
      >
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
  )
}
