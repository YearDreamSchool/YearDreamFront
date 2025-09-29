"use client"

import { Card, CardContent } from "components/ui/card"

type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE"

interface Student {
  seat: number
  name: string
  status: AttendanceStatus
}

interface AttendanceStatsProps {
  data: Student[]
}

export default function AttendanceStats({ data }: AttendanceStatsProps) {
  const total = data.length
  const presentCount = data.filter((s) => s.status === "PRESENT").length
  const lateCount = data.filter((s) => s.status === "LATE").length
  const absentCount = data.filter((s) => s.status === "ABSENT").length
  const rate = total > 0 ? Math.round((presentCount / total) * 100) : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-system-green/10 to-system-green/5 border border-system-green/20 rounded-2xl">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-system-green mb-2">{presentCount}</div>
          <p className="text-sm font-medium text-system-green">출석중</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-system-orange/10 to-system-orange/5 border border-system-orange/20 rounded-2xl">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-system-orange mb-2">{lateCount}</div>
          <p className="text-sm font-medium text-system-orange">지각/자리비움</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 rounded-2xl">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-neutral-600 mb-2">{absentCount}</div>
          <p className="text-sm font-medium text-neutral-600">출석안함</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-system-blue/10 to-system-blue/5 border border-system-blue/20 rounded-2xl">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-system-blue mb-2">{rate}%</div>
          <p className="text-sm font-medium text-system-blue">출석률</p>
        </CardContent>
      </Card>
    </div>
  )
}
