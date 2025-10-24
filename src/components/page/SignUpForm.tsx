"use client"

import { useState } from "react"
import { Button } from "components/ui/button"
import { Label } from "components/ui/label" 
import { Input } from "components/ui/input" 
import { Loader2 } from "lucide-react"

interface SignUpFormProps {
    // 회원가입 후 로그인 화면으로 전환하기 위한 함수
    onSignUpSuccess: () => void;
    // 로딩 상태를 외부와 공유하기 위한 props
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUpForm({ onSignUpSuccess, loading, setLoading }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // 입력 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // 회원가입 제출 핸들러
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        setLoading(false);
        return;
    }
    
    // --- 여기에 실제 회원가입 API 호출 로직을 구현하세요 ---
    try {
        // const response = await fetch('/api/signup', { method: 'POST', body: JSON.stringify(formData) });
        // if (response.ok) {
        //     alert("회원가입 성공! 로그인 화면으로 이동합니다.");
        //     onSignUpSuccess(); // 로그인 화면으로 전환
        // } else {
        //     alert("회원가입 실패: " + (await response.json()).message);
        // }

        // 임시 성공 처리
        setTimeout(() => {
            alert(`회원가입 성공! (${formData.name}, ${formData.email})`);
            onSignUpSuccess(); // 로그인 탭으로 전환
            setLoading(false);
        }, 1000);

    } catch (error) {
        console.error("회원가입 중 오류 발생:", error)
        alert("서버와 통신할 수 없습니다.");
        setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSignUpSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          type="text"
          placeholder="홍길동"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
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
          placeholder="8자 이상"
          required
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      
      <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          "회원가입 완료"
        )}
      </Button>
    </form>
  )
}