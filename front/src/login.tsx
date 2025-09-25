"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { User, Shield, BookOpen, ArrowRight } from "lucide-react"
import SocialLoginButtons from "components/page/SocialLoginButtons"

interface LoginProps {
  onLogin: (userRole: string, userData: any) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    rememberMe: false,
  })

  const demoAccounts = [
    { email: "admin@yeardream.com", password: "admin123", role: "admin", name: "박관리자", department: "운영팀" },
    { email: "coach@yeardream.com", password: "coach123", role: "coach", name: "김코치", department: "프론트엔드팀" },
    { email: "student@yeardream.com", password: "student123", role: "student", name: "이수강생", seat: "A-01" },
  ]

  const handleDemoLogin = (account: any) => {
    setFormData({ ...formData, email: account.email, password: account.password })
    setTimeout(() => {
      onLogin(account.role, account)
      window.location.href = "/"
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* 왼쪽 브랜딩 */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-neutral-900 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">Y</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-neutral-900">YearDreamSchool</h1>
                <p className="text-xl text-neutral-600">Learning Platform</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-neutral-900">함께 성장하는 개발자 교육 플랫폼</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                체계적인 커리큘럼과 실무 중심 교육으로 여러분의 개발자 꿈을 현실로 만들어보세요.
              </p>
            </div>
          </div>
        </div>

        {/* 오른쪽 로그인 폼 */}
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-neutral-900">{isLogin ? "로그인" : "회원가입"}</CardTitle>
              <CardDescription className="text-neutral-600">
                {isLogin ? "계정에 로그인하여 학습을 시작하세요" : "새 계정을 만들어 학습을 시작하세요"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <SocialLoginButtons provider="google" loading={loading} />
                <SocialLoginButtons provider="kakao" loading={loading} />
                <SocialLoginButtons provider="naver" loading={loading} />
              </div>

              {isLogin && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-neutral-700 text-center">빠른 데모 로그인</p>
                  <div className="grid grid-cols-1 gap-2">
                    {demoAccounts.map((account, index) => (
                      <Button key={index} variant="outline" onClick={() => handleDemoLogin(account)} className="justify-between h-12 rounded-xl bg-transparent hover:bg-neutral-50">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            account.role === "admin"
                              ? "bg-system-purple/10 text-system-purple"
                              : account.role === "coach"
                                ? "bg-system-blue/10 text-system-blue"
                                : "bg-system-green/10 text-system-green"
                          }`}>
                            {account.role === "admin" ? <Shield className="h-4 w-4" /> : account.role === "coach" ? <User className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm">{account.name}</p>
                            <p className="text-xs text-neutral-500">{account.role}</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
