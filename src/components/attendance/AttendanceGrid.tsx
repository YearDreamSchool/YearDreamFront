import { useEffect, useRef } from "react"
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import StudentCard from "components/attendance/AttendanceStudent"
import { Student } from "types/attendance"

interface AttendanceGridProps {
  data: Student[]
  setData: React.Dispatch<React.SetStateAction<Student[]>>
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function AttendanceGrid({ data, setData }: AttendanceGridProps) {
  const stompClient = useRef<Client | null>(null)

  // -----------------------
  // WebSocket 연결
  // -----------------------
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      console.error("JWT 토큰 없음")
      return
    }

    stompClient.current = new Client({
      brokerURL: undefined,
      webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws?token=${token}`),
      reconnectDelay: 5000,
      debug: (str) => console.log("[STOMP]", str),
    })

    stompClient.current.onConnect = () => {
      stompClient.current?.subscribe("/topic/attendance", (message) => {
        const updatedData: Student[] = JSON.parse(message.body)
        setData(updatedData)
      })
    }

    stompClient.current.activate()
    return () => {
      stompClient.current?.deactivate()
    }
  }, [setData])

  // -----------------------
  // 개별 학생 상태 토글
  // -----------------------
  const toggleAttendance = (index: number) => {
    const newData = [...data]
    const student = { ...newData[index] }
    if (!student) return

    switch (student.status) {
      case "ABSENT":
        student.status = "PRESENT"
        break
      case "PRESENT":
        student.status = "LATE"
        break
      case "LATE":
        student.status = "ABSENT"
        break
    }

    newData[index] = student
    setData(newData)

    const payload = {
      seatNum: student.seat,
      newStatus: student.status.toUpperCase(),
      updatedAt: new Date().toISOString(),
    }

    stompClient.current?.publish({
      destination: "/app/attendance.update",
      body: JSON.stringify(payload),
    })
  }

  // -----------------------
  // 전체 상태 업데이트
  // -----------------------
  const updateAllAttendance = (newStatus: Student["status"]) => {
    const now = new Date().toISOString()

    const updatedData = data.map((student) => ({
      ...student,
      status: newStatus,
      updatedAt: now,
    }))
    setData(updatedData)

    const payload = updatedData.map((student) => ({
      seat: student.seat,
      status: student.status,
    }))

    stompClient.current?.publish({
      destination: "/app/attendance.updateAll",
      body: JSON.stringify(payload),
    })
  }

  // -----------------------
  // 상태 스타일
  // -----------------------
  const getStatusStyle = (status: Student["status"]) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-500 text-white"
      case "LATE":
        return "bg-red-500 text-white"
      case "ABSENT":
      default:
        return "bg-gray-400 text-white"
    }
  }

  // -----------------------
  // 좌석 배열
  // -----------------------
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
      {/* 전체 상태 버튼 */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => updateAllAttendance("PRESENT")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          전체 출석
        </button>
        <button
          onClick={() => updateAllAttendance("LATE")}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          전체 자리비움
        </button>
        <button
          onClick={() => updateAllAttendance("ABSENT")}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          전체 결석
        </button>
      </div>

      {/* 좌석 테이블 */}
      {seatRows.map((row, rowIndex) => (
      <div
        key={rowIndex}
        className={`flex justify-between max-w-5xl mx-auto px-8 ${
          rowIndex === 6 ? "border-t border-gray-300 mt-4 pt-4" : ""
        }`}
      >
        {/* 왼쪽 테이블 */}
        <div className="flex gap-4 justify-start">
          {row[0].map((studentIndex) => {
            const student = data[studentIndex]
            if (!student) return <div key={studentIndex} className="w-32 h-32" />
            return (
              <StudentCard
                key={`${student.seat}-${studentIndex}`}
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
                key={`${student.seat}-${studentIndex}`}
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
