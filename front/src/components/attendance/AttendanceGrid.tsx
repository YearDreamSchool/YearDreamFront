"use client"

import StudentCard from "components/attendance/AttenandceStudent"
import { Student } from "types/attendance"

interface AttendanceGridProps {
  data: Student[]
  setData: React.Dispatch<React.SetStateAction<Student[]>>
}

export default function AttendanceGrid({ data, setData }: AttendanceGridProps) {
  const toggleAttendance = (index: number) => {
  const newData = [...data]
  const student = newData[index]
  if (!student) return

  switch (student.status) {
    case "absent":
      student.status = "present"
      break
    case "present":
      student.status = "late"
      break
    case "late":
      student.status = "absent"
      break
    default:
      student.status = "absent"
  }

  setData(newData)
}

  const getStatusStyle = (status: Student["status"]) => {
    switch (status) {
      case "present":
        return "bg-green-500 text-white"
      case "late":
        return "bg-red-500 text-white"
      case "absent":
      default:
        return "bg-gray-400 text-white"
    }
  }

  const seatRows: number[][][] = [
    [[0, 1, 2], [6, 7, 8]],
    [[3, 4, 5], [9, 10, 11]],
    [[12, 13, 14], [18, 19]],
    [[15, 16, 17], [20, 21]],
    [[22, 23], [26, 27]],
    [[24, 25], [28, 29]],
    [[30, 31], []],
    [[32, 33], []],
    [[40, 41, 42], [34, 35, 36]],
    [[43, 44, 45], [37, 38, 39]],
    [[52, 53, 54], [46, 47, 48]],
    [[55, 56, 57], [49, 50, 51]],
  ]

  return (
    <div className="space-y-4">
      {seatRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between max-w-5xl mx-auto px-8">
          {/* 왼쪽 테이블 */}
          <div className="flex gap-4 justify-start">
            {row[0].map((studentIndex) => {
              const student = data[studentIndex]
              if (!student) return <div key={studentIndex} className="w-32 h-32" />
              return (
                <StudentCard
                  key={student.seat}
                  student={student}
                  onToggle={() => toggleAttendance(studentIndex)}
                  getStatusStyle={getStatusStyle}
                />
              )
            })}
          </div>

          {/* 오른쪽 테이블 */}
          <div className="flex gap-4 justify-end">
            {row[1].map((studentIndex) => {
              const student = data[studentIndex]
              if (!student) return <div key={studentIndex} className="w-32 h-32" />
              return (
                <StudentCard
                  key={student.seat}
                  student={student}
                  onToggle={() => toggleAttendance(studentIndex)}
                  getStatusStyle={getStatusStyle}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
