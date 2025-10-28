"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Loader2 } from "lucide-react"
import SocialLoginButtons from "components/page/SocialLoginButtons"
import { Label } from "components/ui/label" 
import { Input } from "components/ui/input" 
import { Checkbox } from "components/ui/checkbox" 
import SignUpForm from "components/page/SignUpForm"

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

  // 입력 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // 로그인 제출 핸들러 (실제 API 호출로 대체되어야 함)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // --- 실제 API 호출 로직을 여기에 구현하세요 ---
    try {
      // API 호출 성공 가정 (임시 로직)
      /*
      const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) });
      const data = await response.json();
      
      if (response.ok) {
          const userRole = data.role.toLowerCase().replace('role_', ''); 
          onLogin(userRole, data);
      } else {
          alert(data.message || "로그인 실패");
      }
      */
      
      // 임시 실패 처리 (API가 없으므로 임시로 실패 메시지 표시)
      setTimeout(() => {
          alert("로그인은 개발중이니 소셜로그인으로 진행해주세요.");
          setLoading(false);
      }, 1000);


    } catch (error) {
      console.error("로그인 중 오류 발생:", error)
      alert("로그인 서버와 통신할 수 없습니다.")
      setLoading(false)
    }
  }

  // Checkbox 변경 핸들러
  const handleRememberMe = (checked: boolean) => {
      setFormData(prev => ({
          ...prev,
          rememberMe: checked
      }))
  }

  const handleSignUpSuccess = () => {
    setIsLogin(true); // 로그인 탭으로 전환
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* 왼쪽 브랜딩 (유지) */}
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
              
              {/* 일반 로그인 폼 */}
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={handleRememberMe}
                        disabled={loading}
                      />
                      <Label htmlFor="rememberMe" className="text-sm font-normal text-neutral-600">
                        로그인 정보 저장
                      </Label>
                    </div>
                    <Button variant="link" size="sm" className="text-sm text-system-blue p-0 h-auto font-medium" disabled={loading}>
                      비밀번호 찾기
                    </Button>
                  </div>
                  
                  <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      "로그인"
                    )}
                  </Button>
                </form>
              ) : (

                // 회원가입 폼
                <SignUpForm 
                    onSignUpSuccess={handleSignUpSuccess} 
                    loading={loading}
                    setLoading={setLoading}
                />
              )}
              
              {/* 구분선 */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-neutral-500">
                    {isLogin ? "또는 소셜 계정으로 로그인" : "또는 소셜 계정으로 회원가입"}
                  </span>
                </div>
              </div>


              {/* 소셜 로그인 버튼 */}
              <div className="space-y-2">
                <SocialLoginButtons provider="google" loading={false} />
                <SocialLoginButtons provider="kakao" loading={false} />
                <SocialLoginButtons provider="naver" loading={false} />
              </div>
              
              {/* 로그인/회원가입 전환 버튼 */}
              <div className="text-center pt-4">
                  <p className="text-sm text-neutral-600">
                      {isLogin ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
                      <Button 
                          variant="link" 
                          size="sm" 
                          className="text-system-blue p-0 h-auto font-bold"
                          onClick={() => setIsLogin(!isLogin)}
                          disabled={loading}
                      >
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