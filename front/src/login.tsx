"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Checkbox } from "components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Shield, BookOpen, ArrowRight } from "lucide-react"
import SocialLoginButtons from "components/SocialLoginButtons"

interface LoginProps {
  onLogin: (userRole: string, userData: any) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (isLogin) {
        const account = demoAccounts.find(acc => acc.email === formData.email && acc.password === formData.password)
        if (account) {
          onLogin(account.role, account)
          window.location.href = "/"
        } else {
          alert("이메일 또는 비밀번호가 올바르지 않습니다.")
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("비밀번호가 일치하지 않습니다.")
          setLoading(false)
          return
        }
        alert("회원가입이 완료되었습니다! 로그인해주세요.")
        setIsLogin(true)
        setFormData({ ...formData, password: "", confirmPassword: "" })
      }
      setLoading(false)
    }, 1500)
  }

  const handleDemoLogin = (account: any) => {
    setFormData({ ...formData, email: account.email, password: account.password })
    setTimeout(() => {
      onLogin(account.role, account)
      window.location.href = "/" // 브라우저 리디렉션
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

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="이름" className="rounded-xl h-12" required />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="이메일" className="rounded-xl h-12" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="비밀번호" className="rounded-xl h-12" required />
                  <Button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                    <Input id="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="비밀번호 확인" className="rounded-xl h-12" required />
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <Checkbox id="remember" checked={formData.rememberMe} onCheckedChange={checked => setFormData({ ...formData, rememberMe: checked as boolean })} />
                    <Label htmlFor="remember">로그인 상태 유지</Label>
                  </div>
                )}

                <Button type="submit" className="w-full h-12 rounded-xl bg-neutral-900 text-white font-semibold">
                  {loading ? "처리 중..." : isLogin ? "로그인" : "회원가입"}
                </Button>
              </form>

              <div className="text-center">
                <p>
                  {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
                  <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "회원가입" : "로그인"}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
