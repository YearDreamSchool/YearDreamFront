"use client"

import { useEffect, useState } from "react"
import { Badge } from "components/ui/badge"
import { Student } from "types/attendance"

interface StudentCardProps {
  student: Student
  onToggle: () => void
  getStatusStyle: (status: Student["status"]) => string
}

export default function StudentCard({ student, onToggle, getStatusStyle }: StudentCardProps) {
  const [elapsed, setElapsed] = useState("")

  useEffect(() => {
    if (!student.updatedAt) return

    const updateElapsed = () => {
      const start = new Date(student.updatedAt!).getTime()
      const now = Date.now()
      const diff = Math.floor((now - start) / 1000)
      const minutes = Math.floor(diff / 60)
      const seconds = diff % 60
      setElapsed(student.status === "LATE" ? 
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}` : "")
    }

    updateElapsed() // 화면 로드 시 바로 표시
    const timer = setInterval(updateElapsed, 1000)

    return () => clearInterval(timer)
  }, [student.updatedAt, student.status])

  const getBadgeText = () => {
    switch (student.status) {
      case "PRESENT": return "출석중"
      case "LATE": return "자리비움"
      case "ABSENT": 
      default: return "출석안함"
    }
  }

  const getBadgeClass = () => {
    switch (student.status) {
      case "PRESENT": return "bg-green-100 text-green-800"
      case "LATE": return "bg-red-100 text-red-800"
      case "ABSENT":
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getNameTextColor = () => {
    if (student.status === "LATE" || student.status === "PRESENT") { 
      return "text-white"
    }
    return "text-neutral-900"
  }

  return (
    <div
      className={`w-32 h-32 p-4 rounded-2xl border-2 border-gray-300 cursor-pointer transition-all duration-300 flex flex-col justify-between text-center ${getStatusStyle(student.status)}`}
      onClick={onToggle}
    >
      {/* 1. 상단 섹션 (고정 높이 콘텐츠) */}
      <div className="flex items-center justify-between">
        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center font-mono text-sm font-bold text-black border">
          {student.seat}
        </div>
        <Badge
          variant="outline"
          className={`border-0 font-medium text-xs px-1 py-0.5 ${getBadgeClass()}`}
        >
          {getBadgeText()}
        </Badge>
      </div>

      {/* 2. 중앙 컨텐츠 영역 */}
      <div className="flex flex-col items-center justify-center min-h-12 flex-grow">
      {/* 타이머 표시 */}
      {elapsed && (
        <div className="mb-1 px-2 py-1 bg-white/90 rounded-lg text-red-600 font-mono text-sm font-bold shadow-sm">
          {elapsed}
        </div>
      )}

      {/* 이름 */}
      <h4 className={`font-bold text-base truncate ${getNameTextColor()}`}>
        {student.name}
      </h4>

      </div>
    </div>
  )
}
    