"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Badge } from "components/ui/badge"
import {
  Bell,
  Check,
  X,
  Users,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"

interface NotificationsProps {
  onClose: () => void
}

export default function Notifications({ onClose }: NotificationsProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "attendance",
      title: "출석 체크 완료",
      message: "오늘 출석률이 92%입니다. 4명이 결석했습니다.",
      time: "5분 전",
      read: false,
      icon: Users,
      color: "system-green",
      priority: "normal",
    },
    {
      id: 2,
      type: "announcement",
      title: "새로운 공지사항",
      message: "2월 교육 일정이 업데이트되었습니다. 확인해주세요.",
      time: "1시간 전",
      read: false,
      icon: MessageSquare,
      color: "system-blue",
      priority: "high",
    },
    {
      id: 3,
      type: "schedule",
      title: "일정 변경 알림",
      message: "내일 프로젝트 발표회 시간이 14:00으로 변경되었습니다.",
      time: "2시간 전",
      read: true,
      icon: Calendar,
      color: "system-purple",
      priority: "high",
    },
    {
      id: 4,
      type: "system",
      title: "시스템 업데이트",
      message: "플랫폼이 최신 버전으로 업데이트되었습니다.",
      time: "3시간 전",
      read: true,
      icon: Info,
      color: "system-orange",
      priority: "low",
    },
    {
      id: 5,
      type: "warning",
      title: "출석률 경고",
      message: "이번 주 출석률이 평균보다 낮습니다. 확인이 필요합니다.",
      time: "1일 전",
      read: false,
      icon: AlertTriangle,
      color: "system-red",
      priority: "high",
    },
    {
      id: 6,
      type: "success",
      title: "과제 제출 완료",
      message: "모든 학생이 이번 주 과제를 제출했습니다.",
      time: "1일 전",
      read: true,
      icon: CheckCircle,
      color: "system-green",
      priority: "normal",
    },
  ])

  const [filter, setFilter] = useState<"all" | "unread" | "high">("all")

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAsUnread = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: false } : notif)))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read
    if (filter === "high") return notif.priority === "high"
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-system-red/10 text-system-red border-system-red/20"
      case "normal":
        return "bg-system-blue/10 text-system-blue border-system-blue/20"
      case "low":
        return "bg-neutral-100 text-neutral-600 border-neutral-200"
      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-200"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl max-h-[80vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">알림</CardTitle>
                <p className="text-sm text-neutral-300">
                  {unreadCount > 0 ? `${unreadCount}개의 읽지 않은 알림` : "모든 알림을 확인했습니다"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <div className="p-6">
          {/* 필터 및 액션 버튼 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="rounded-xl"
              >
                전체 ({notifications.length})
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
                className="rounded-xl"
              >
                읽지 않음 ({unreadCount})
              </Button>
              <Button
                variant={filter === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("high")}
                className="rounded-xl"
              >
                중요
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead} className="rounded-xl bg-transparent">
                모두 읽음
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="rounded-xl text-system-red bg-transparent"
              >
                모두 삭제
              </Button>
            </div>
          </div>

          {/* 알림 목록 */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                      notification.read ? "bg-neutral-50/50" : "bg-white shadow-sm"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-2xl bg-${notification.color}/10`}>
                        <Icon className={`h-5 w-5 text-${notification.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4
                            className={`font-semibold ${notification.read ? "text-neutral-600" : "text-neutral-900"}`}
                          >
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                              {notification.priority === "high"
                                ? "중요"
                                : notification.priority === "normal"
                                  ? "보통"
                                  : "낮음"}
                            </Badge>
                            <span className="text-xs text-neutral-400">{notification.time}</span>
                          </div>
                        </div>
                        <p className={`text-sm ${notification.read ? "text-neutral-500" : "text-neutral-700"}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-3">
                          {!notification.read ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 px-3 text-xs rounded-xl"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              읽음 표시
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsUnread(notification.id)}
                              className="h-8 px-3 text-xs rounded-xl"
                            >
                              <MarkAsUnread className="h-3 w-3 mr-1" />
                              읽지 않음
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 px-3 text-xs rounded-xl text-system-red hover:text-system-red"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">
                  {filter === "unread" ? "읽지 않은 알림이 없습니다" : "알림이 없습니다"}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
