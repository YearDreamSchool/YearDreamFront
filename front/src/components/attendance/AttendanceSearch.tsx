"use client"

import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { Card, CardContent } from "components/ui/card"
import { Search, Filter } from "lucide-react"

interface AttendanceSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onFilterClick?: () => void
}

export default function AttendanceSearch({ searchTerm, onSearchChange, onFilterClick }: AttendanceSearchProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="이름이나 좌석 번호를 검색하세요"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 bg-neutral-100/50 border-0 rounded-2xl h-12 font-medium"
            />
          </div>
          <Button
            variant="outline"
            className="rounded-xl border-neutral-200 h-12 px-6 bg-transparent"
            onClick={onFilterClick}
          >
            <Filter className="h-4 w-4 mr-2" />
            필터
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}