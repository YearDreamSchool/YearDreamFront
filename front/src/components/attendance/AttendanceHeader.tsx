"use client"

import { Button } from "components/ui/button"
import { RotateCcw, Save, Download } from "lucide-react"

interface AttendanceHeaderProps {
  onReset: () => void
  onSave: () => void
  onExport?: () => void
}

export default function AttendanceHeader({ onReset, onSave, onExport }: AttendanceHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
      <div>
        <h2 className="text-3xl font-bold text-neutral-900">자리배치</h2>
        <p className="text-neutral-500 mt-1">실시간 좌석 배치를 확인하세요</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" onClick={onReset} className="rounded-xl border-neutral-200 bg-transparent">
          <RotateCcw className="h-4 w-4 mr-2" />
          초기화
        </Button>
        <Button
          variant="outline"
          onClick={onExport}
          className="rounded-xl border-neutral-200 bg-transparent"
        >
          <Download className="h-4 w-4 mr-2" />
          내보내기
        </Button>
        <Button onClick={onSave} className="bg-system-blue hover:bg-system-blue/90 rounded-xl">
          <Save className="h-4 w-4 mr-2" />
          저장하기
        </Button>
      </div>
    </div>
  )
}