"use client"

import { Badge } from "components/ui/badge"
import { Student } from "attendance-check"

interface StudentCardProps {
  student: Student
  onToggle: () => void
  getStatusStyle: (status: Student["status"]) => string
}

export default function StudentCard({ student, onToggle, getStatusStyle }: StudentCardProps) {
  const getBadgeText = () => {
    switch (student.status) {
      case "present":
        return "출석중"
      case "late":
        return "자리비움"
      case "absent":
      default:
        return "출석안함"
    }
  }

  const getBadgeClass = () => {
    switch (student.status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "late":
        return "bg-red-100 text-red-800"
      case "absent":
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className={`w-32 h-32 p-4 rounded-2xl border-2 border-gray-300 cursor-pointer transition-all duration-300 flex flex-col justify-between text-center ${getStatusStyle(student.status)}`}
      onClick={onToggle}
    >
      {/* 상단 좌석 번호 + 상태 */}
      <div className="flex items-center justify-between mb-2">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-mono text-sm font-bold text-black border">
          {student.seat}
        </div>
        <Badge
          variant="outline"
          className={`border-0 font-medium text-xs px-1 py-0.5 ${getBadgeClass()}`}
        >
          {getBadgeText()}
        </Badge>
      </div>

      {/* 이름 */}
      <h4 className="font-bold text-neutral-900 text-base mb-1 truncate">{student.name}</h4>
    </div>
  )
}
