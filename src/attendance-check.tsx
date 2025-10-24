"use client"

import { useEffect, useState } from "react"
import AttendanceHeader from "components/attendance/AttendanceHeader"
import AttendanceSearch from "components/attendance/AttendanceSearch"
import AttendanceGrid from "components/attendance/AttendanceGrid"
import AttendanceStats from "components/attendance/AttendanceStats"
import { students } from "data/students"
import { getAllStudents } from "services/StudentService"
import { Student } from "types/attendance"

export default function AttendanceCheck({ userToken }: { userToken: any }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [attendanceData, setAttendanceData] = useState<Student[]>([])

  const saveAttendance = () => alert("Attendance saved successfully!")

  const resetAttendance = () => {
    if (window.confirm("Reset all attendance data?")) {
      setAttendanceData(students.map((s) => ({ ...s, status: "ABSENT"})))
    }
  }

  const token = localStorage.getItem("token")

  useEffect(() => {
  const fetchStudents = async () => {
    if (!token) return
    const data = await getAllStudents(token) 
    if (data) {
      // 서버 데이터 -> Student 타입으로 변환
      const formatted: Student[] = data.map((s: any, index:any) => ({
        seat: s.seatNum ?? index + 1, 
        name: s.name ?? `Student ${index + 1}`,
        status: s.status ?? "ABSENT",
        updatedAt: s.updatedAt ?? null
      }))
      setAttendanceData(formatted)
    }
  }
  fetchStudents()
}, [token])

  return (
    <div className="space-y-8">
      {/* Header */}
      <AttendanceHeader
        onReset={resetAttendance}
        onSave={saveAttendance}
        onExport={() => alert("Export clicked!")} 
      />

      {/* Search and Filter */}
      <AttendanceSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => alert("Filter clicked!")}
      />
      
      {/* Statistics Summary */}
      <AttendanceStats data={attendanceData} />

      {/* Attendance Grid */}
      <AttendanceGrid 
        data={attendanceData}
        setData={setAttendanceData}
      />
    </div>
  )
}
