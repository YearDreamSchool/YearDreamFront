"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Switch } from "components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Textarea } from "components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import { Badge } from "components/ui/badge"
import { User, Bell, Shield, Palette, Globe, Save, Camera, Mail, Calendar, X } from "lucide-react"

interface SettingsProps {
  userRole: string
  onClose: () => void
  currentUser?: any
}

export default function Settings({ userRole, onClose }: SettingsProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    attendance: true,
    announcements: true,
    schedule: false,
  })

  const [profile, setProfile] = useState({
    name: "김코치",
    email: "coach.kim@eardream.com",
    phone: "010-1234-5678",
    position: "프론트엔드 코치",
    department: "개발팀",
    joinDate: "2023-03-15",
    bio: "웹 개발 전문가로 5년간 현업에서 근무했습니다. 학생들과 함께 성장하는 것을 좋아합니다.",
  })

  const settingsTabs = [
    { id: "profile", label: "프로필", icon: User },
    { id: "notifications", label: "알림", icon: Bell },
    { id: "security", label: "보안", icon: Shield },
    { id: "appearance", label: "화면", icon: Palette },
    { id: "system", label: "시스템", icon: Globe },
  ]

  const handleSave = () => {
    alert("설정이 저장되었습니다!")
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>기본 정보</span>
          </CardTitle>
          <CardDescription>프로필 정보를 수정할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-system-blue text-white text-2xl font-bold">김</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-system-blue hover:bg-system-blue/90"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900">{profile.name}</h3>
              <p className="text-neutral-600">{profile.position}</p>
              <Badge variant="outline" className="mt-2">
                {userRole === "admin" ? "관리자" : userRole === "coach" ? "코치" : "수강생"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">직책</Label>
              <Input
                id="position"
                value={profile.position}
                onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">자기소개</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="rounded-xl"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>알림 설정</span>
          </CardTitle>
          <CardDescription>받고 싶은 알림을 선택하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50/50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-system-blue" />
                <div>
                  <p className="font-medium">이메일 알림</p>
                  <p className="text-sm text-neutral-600">중요한 소식을 이메일로 받습니다</p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50/50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-system-green" />
                <div>
                  <p className="font-medium">푸시 알림</p>
                  <p className="text-sm text-neutral-600">브라우저 푸시 알림을 받습니다</p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50/50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-system-purple" />
                <div>
                  <p className="font-medium">출석 알림</p>
                  <p className="text-sm text-neutral-600">출석 관련 알림을 받습니다</p>
                </div>
              </div>
              <Switch
                checked={notifications.attendance}
                onCheckedChange={(checked) => setNotifications({ ...notifications, attendance: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50/50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-system-orange" />
                <div>
                  <p className="font-medium">공지사항 알림</p>
                  <p className="text-sm text-neutral-600">새로운 공지사항 알림을 받습니다</p>
                </div>
              </div>
              <Switch
                checked={notifications.announcements}
                onCheckedChange={(checked) => setNotifications({ ...notifications, announcements: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50/50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-system-red" />
                <div>
                  <p className="font-medium">일정 알림</p>
                  <p className="text-sm text-neutral-600">일정 변경 알림을 받습니다</p>
                </div>
              </div>
              <Switch
                checked={notifications.schedule}
                onCheckedChange={(checked) => setNotifications({ ...notifications, schedule: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>보안 설정</span>
          </CardTitle>
          <CardDescription>계정 보안을 강화하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">현재 비밀번호</Label>
              <Input id="current-password" type="password" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">새 비밀번호</Label>
              <Input id="new-password" type="password" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">비밀번호 확인</Label>
              <Input id="confirm-password" type="password" className="rounded-xl" />
            </div>
          </div>

          <div className="p-4 bg-system-blue/10 rounded-2xl">
            <h4 className="font-medium text-system-blue mb-2">2단계 인증</h4>
            <p className="text-sm text-neutral-600 mb-4">계정 보안을 위해 2단계 인증을 활성화하세요</p>
            <Button variant="outline" className="rounded-xl bg-transparent">
              2단계 인증 설정
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>화면 설정</span>
          </CardTitle>
          <CardDescription>화면 테마와 레이아웃을 설정하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>테마</Label>
              <Select defaultValue="light">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">라이트 모드</SelectItem>
                  <SelectItem value="dark">다크 모드</SelectItem>
                  <SelectItem value="system">시스템 설정</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>언어</Label>
              <Select defaultValue="ko">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ko">한국어</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>폰트 크기</Label>
              <Select defaultValue="medium">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">작게</SelectItem>
                  <SelectItem value="medium">보통</SelectItem>
                  <SelectItem value="large">크게</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>시스템 설정</span>
          </CardTitle>
          <CardDescription>시스템 관련 설정을 관리하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-neutral-50/50 rounded-2xl">
              <h4 className="font-medium mb-2">데이터 백업</h4>
              <p className="text-sm text-neutral-600 mb-4">중요한 데이터를 정기적으로 백업합니다</p>
              <Button variant="outline" className="rounded-xl bg-transparent">
                지금 백업
              </Button>
            </div>

            <div className="p-4 bg-neutral-50/50 rounded-2xl">
              <h4 className="font-medium mb-2">캐시 정리</h4>
              <p className="text-sm text-neutral-600 mb-4">시스템 성능 향상을 위해 캐시를 정리합니다</p>
              <Button variant="outline" className="rounded-xl bg-transparent">
                캐시 정리
              </Button>
            </div>

            <div className="p-4 bg-system-red/10 rounded-2xl">
              <h4 className="font-medium text-system-red mb-2">계정 삭제</h4>
              <p className="text-sm text-neutral-600 mb-4">
                계정을 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다.
              </p>
              <Button variant="destructive" className="rounded-xl">
                계정 삭제
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileSettings()
      case "notifications":
        return renderNotificationSettings()
      case "security":
        return renderSecuritySettings()
      case "appearance":
        return renderAppearanceSettings()
      case "system":
        return renderSystemSettings()
      default:
        return renderProfileSettings()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-8 overflow-y-auto">
      <div className="w-full max-w-6xl mx-4 mb-8">
        <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
          <CardHeader className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">설정</CardTitle>
                <p className="text-sm text-neutral-300">계정 및 시스템 설정을 관리하세요</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* 사이드바 */}
              <div className="lg:col-span-1">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <nav className="space-y-2">
                      {settingsTabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                              activeTab === tab.id
                                ? "bg-neutral-900 text-white"
                                : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{tab.label}</span>
                          </button>
                        )
                      })}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* 메인 콘텐츠 */}
              <div className="lg:col-span-3">
                {renderContent()}

                {/* 저장 버튼 */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button variant="outline" className="rounded-xl bg-transparent" onClick={onClose}>
                    취소
                  </Button>
                  <Button onClick={handleSave} className="bg-system-blue hover:bg-system-blue/90 rounded-xl">
                    <Save className="h-4 w-4 mr-2" />
                    저장
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
