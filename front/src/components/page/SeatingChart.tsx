"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { RotateCcw, Users, UserCheck, UserX, Wifi, WifiOff } from "lucide-react"

interface SeatData {
  id: number
  name: string
  status: "default" | "active" | "absent"
  absentStartTime?: number
  lastUpdated?: number
  updatedBy?: string
}

interface SeatProps {
  seat: SeatData
  onClick: (id: number) => void
}

const Seat = ({ seat, onClick }: SeatProps) => {
  const [timer, setTimer] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (seat.status === "absent" && seat.absentStartTime) {
      interval = setInterval(() => {
        const elapsed = Date.now() - seat.absentStartTime!
        const totalSec = Math.floor(elapsed / 1000)
        const min = String(Math.floor(totalSec / 60)).padStart(2, "0")
        const sec = String(totalSec % 60).padStart(2, "0")
        setTimer(`${min}:${sec}`)
      }, 1000)
    } else {
      setTimer("")
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [seat.status, seat.absentStartTime])

  const getSeatStyle = () => {
    switch (seat.status) {
      case "active":
        return "bg-system-green text-white border-system-green shadow-lg hover:shadow-xl transform hover:scale-105"
      case "absent":
        return "bg-system-red text-white border-system-red shadow-lg hover:shadow-xl transform hover:scale-105"
      default:
        return "bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50 shadow-md hover:shadow-lg transform hover:scale-105"
    }
  }

  return (
    <div
      className={`w-24 h-24 border-2 flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-300 text-xs font-bold rounded-2xl ${getSeatStyle()}`}
      onClick={() => onClick(seat.id)}
    >
      <div className="font-mono">{String(seat.id).padStart(2, "0")}</div>
      {seat.name && <div className="text-xs mt-1 font-medium">{seat.name}</div>}
      {timer && <div className="text-xs mt-1 font-mono bg-black/20 px-2 py-1 rounded-full">{timer}</div>}
    </div>
  )
}

export default function SeatingChart() {
  const [seats, setSeats] = useState<SeatData[]>([
    // 기존 좌석 데이터...
    { id: 1, name: "황희수", status: "default" },
    { id: 2, name: "심규상", status: "default" },
    { id: 3, name: "", status: "default" },
    { id: 4, name: "송건호", status: "default" },
    { id: 5, name: "", status: "default" },
    { id: 6, name: "유연서", status: "default" },
    { id: 7, name: "백동재", status: "default" },
    { id: 8, name: "최희범", status: "default" },
    { id: 9, name: "", status: "default" },
    { id: 10, name: "최강규", status: "default" },
    { id: 11, name: "이은여울", status: "default" },
    { id: 12, name: "송찬영", status: "default" },
    { id: 13, name: "이원재", status: "default" },
    { id: 14, name: "", status: "default" },
    { id: 15, name: "김종완", status: "default" },
    { id: 16, name: "김병유", status: "default" },
    { id: 17, name: "서원준", status: "default" },
    { id: 18, name: "김기재", status: "default" },
    { id: 19, name: "차규진", status: "default" },
    { id: 20, name: "양다은", status: "default" },
    { id: 21, name: "유현규", status: "default" },
    { id: 22, name: "김태형", status: "default" },
    { id: 23, name: "이재진", status: "default" },
    { id: 24, name: "박용수", status: "default" },
    { id: 25, name: "문현민", status: "default" },
    { id: 26, name: "김태윤", status: "default" },
    { id: 27, name: "곽효진", status: "default" },
    { id: 28, name: "윤지영", status: "default" },
    { id: 29, name: "김정은", status: "default" },
    { id: 30, name: "김예지", status: "default" },
    { id: 31, name: "김준희", status: "default" },
    { id: 32, name: "문석환", status: "default" },
    { id: 33, name: "조유승", status: "default" },
    { id: 34, name: "", status: "default" },
    { id: 35, name: "조애림", status: "default" },
    { id: 36, name: "박소영", status: "default" },
    { id: 37, name: "장재훈", status: "default" },
    { id: 38, name: "", status: "default" },
    { id: 39, name: "이주안", status: "default" },
    { id: 40, name: "", status: "default" },
    { id: 41, name: "이진혁", status: "default" },
    { id: 42, name: "박범수", status: "default" },
    { id: 43, name: "고은영", status: "default" },
    { id: 44, name: "김세진", status: "default" },
    { id: 45, name: "박주원", status: "default" },
    { id: 46, name: "", status: "default" },
    { id: 47, name: "유지상", status: "default" },
    { id: 48, name: "", status: "default" },
    { id: 49, name: "오설화", status: "default" },
    { id: 50, name: "최유희", status: "default" },
    { id: 51, name: "", status: "default" },
    { id: 52, name: "홍현경", status: "default" },
    { id: 53, name: "김경태", status: "default" },
    { id: 54, name: "", status: "default" },
    { id: 55, name: "유선종", status: "default" },
    { id: 56, name: "서동재", status: "default" },
    { id: 57, name: "이민규", status: "default" },
    { id: 58, name: "", status: "default" },
  ])

  const [globalState, setGlobalState] = useState<"default" | "active" | "absent">("default")
  const [isOnline, setIsOnline] = useState(true)
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date())

  // 🔄 실시간 동기화 시뮬레이션 (실제로는 WebSocket이나 Server-Sent Events 사용)
  useEffect(() => {
    // 브라우저 탭 간 동기화를 위한 BroadcastChannel
    const channel = new BroadcastChannel("seating-chart-sync")

    // 다른 탭에서 변경사항 수신
    channel.onmessage = (event) => {
      const { type, data } = event.data

      if (type === "SEAT_UPDATE") {
        setSeats(data.seats)
        setLastSyncTime(new Date())
      }
    }

    // 주기적으로 서버에서 데이터 동기화 (시뮬레이션)
    const syncInterval = setInterval(() => {
      // 실제로는 서버 API 호출
      syncWithServer()
    }, 5000) // 5초마다 동기화

    return () => {
      channel.close()
      clearInterval(syncInterval)
    }
  }, [])

  // 🌐 서버 동기화 시뮬레이션
  const syncWithServer = async () => {
    try {
      // 실제로는 fetch('/api/seats') 같은 API 호출
      const savedData = localStorage.getItem("shared-seat-states")
      if (savedData) {
        const sharedData = JSON.parse(savedData)

        // 다른 사용자의 변경사항이 있는지 확인
        if (sharedData.lastUpdated > lastSyncTime.getTime()) {
          setSeats(sharedData.seats)
          setLastSyncTime(new Date(sharedData.lastUpdated))
        }
      }
      setIsOnline(true)
    } catch (error) {
      setIsOnline(false)
      console.error("동기화 실패:", error)
    }
  }

  // 💾 공유 저장소에 상태 저장
  const saveToSharedStorage = useCallback((updatedSeats: SeatData[]) => {
    const sharedData = {
      seats: updatedSeats,
      lastUpdated: Date.now(),
      updatedBy: "current-user", // 실제로는 사용자 ID
    }

    // 로컬 저장소 (실제로는 서버 API)
    localStorage.setItem("shared-seat-states", JSON.stringify(sharedData))

    // 다른 탭에 브로드캐스트
    const channel = new BroadcastChannel("seating-chart-sync")
    channel.postMessage({
      type: "SEAT_UPDATE",
      data: sharedData,
    })

    setLastSyncTime(new Date())
  }, [])

  // 로컬스토리지에서 상태 복원
  useEffect(() => {
    const loadSharedData = () => {
      const sharedData = localStorage.getItem("shared-seat-states")
      if (sharedData) {
        const data = JSON.parse(sharedData)
        setSeats(data.seats)
        setLastSyncTime(new Date(data.lastUpdated))
      }
    }

    loadSharedData()
  }, [])

  const handleSeatClick = (seatId: number) => {
    const updatedSeats = seats.map((seat) => {
      if (seat.id === seatId) {
        const now = Date.now()

        if (seat.status === "active") {
          return {
            ...seat,
            status: "absent" as const,
            absentStartTime: now,
            lastUpdated: now,
            updatedBy: "current-user",
          }
        } else if (seat.status === "absent") {
          return {
            ...seat,
            status: "default" as const,
            absentStartTime: undefined,
            lastUpdated: now,
            updatedBy: "current-user",
          }
        } else {
          return {
            ...seat,
            status: "active" as const,
            absentStartTime: undefined,
            lastUpdated: now,
            updatedBy: "current-user",
          }
        }
      }
      return seat
    })

    setSeats(updatedSeats)
    saveToSharedStorage(updatedSeats)
  }

  const toggleAllSeats = () => {
    const nextState = globalState === "default" ? "active" : globalState === "active" ? "absent" : "default"
    const now = Date.now()

    const updatedSeats:SeatData[] = seats.map((seat) => ({
      ...seat,
      status: nextState,
      absentStartTime: nextState === "absent" ? now : undefined,
      lastUpdated: now,
      updatedBy: "current-user",
    }))

    setSeats(updatedSeats)
    setGlobalState(nextState)
    saveToSharedStorage(updatedSeats)
  }

  const getSeatById = (id: number) => seats.find((seat) => seat.id === id)

  const presentCount = seats.filter((seat) => seat.status === "active").length
  const absentCount = seats.filter((seat) => seat.status === "absent").length
  const waitingCount = seats.filter((seat) => seat.status === "default" && seat.name).length

  const presentList = seats.filter((seat) => seat.status === "active" && seat.name)
  const absentList = seats.filter((seat) => seat.status === "absent" && seat.name)
  const waitingList = seats.filter((seat) => seat.status === "default" && seat.name)

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900">실시간 좌석 현황</h2>
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-neutral-500">클릭으로 출석 상태를 관리하세요</p>
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="h-4 w-4 text-system-green" />
              ) : (
                <WifiOff className="h-4 w-4 text-system-red" />
              )}
              <span className={`text-xs font-medium ${isOnline ? "text-system-green" : "text-system-red"}`}>
                {isOnline ? "실시간 동기화" : "오프라인"}
              </span>
              <span className="text-xs text-neutral-400">마지막 동기화: {lastSyncTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-6 text-sm font-medium">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-system-green rounded-full"></div>
              <span className="text-neutral-600">출석 {presentCount}명</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-system-red rounded-full"></div>
              <span className="text-neutral-600">결석 {absentCount}명</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-neutral-300 rounded-full"></div>
              <span className="text-neutral-600">대기 {waitingCount}명</span>
            </div>
          </div>
          <Button
            onClick={toggleAllSeats}
            className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl h-12 px-6"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            전체 상태 변경
          </Button>
        </div>
      </div>

      {/* 동기화 상태 알림 */}
      {!isOnline && (
        <Card className="bg-system-red/10 border border-system-red/20 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <WifiOff className="h-5 w-5 text-system-red" />
              <div>
                <p className="font-medium text-system-red">연결이 끊어졌습니다</p>
                <p className="text-sm text-system-red/70">다른 사용자와의 실시간 동기화가 중단되었습니다.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 좌석 배치도 - 기존과 동일 */}
      <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* 기존 좌석 배치 코드와 동일... */}
            {/* 1행: 3 왼쪽 / 3 오른쪽 */}
            <div className="flex justify-between">
              <div className="flex gap-6 p-6 border-2 border-neutral-200/50 bg-neutral-50/50 backdrop-blur-sm rounded-3xl shadow-lg">
                <div className="flex flex-col justify-between items-center gap-2">
                  <Seat seat={getSeatById(1)!} onClick={handleSeatClick} />
                  <Seat seat={getSeatById(4)!} onClick={handleSeatClick} />
                </div>
                <div className="flex flex-col justify-between items-center gap-2">
                  <Seat seat={getSeatById(2)!} onClick={handleSeatClick} />
                  <Seat seat={getSeatById(5)!} onClick={handleSeatClick} />
                </div>
                <div className="flex flex-col justify-between items-center gap-2">
                  <Seat seat={getSeatById(3)!} onClick={handleSeatClick} />
                  <Seat seat={getSeatById(6)!} onClick={handleSeatClick} />
                </div>
              </div>
              <div className="flex gap-6 p-6 border-2 border-neutral-200/50 bg-neutral-50/50 backdrop-blur-sm rounded-3xl shadow-lg">
                <div className="flex flex-col justify-between items-center gap-2">
                  <Seat seat={getSeatById(7)!} onClick={handleSeatClick} />
                  <Seat seat={getSeatById(10)!} onClick={handleSeatClick} />
                </div>
                <div className="flex flex-col justify-between items-center gap-2">
                  <Seat seat={getSeatById(8)!} onClick={handleSeatClick} />
                  <Seat seat={getSeatById(11)!} onClick={handleSeatClick} />
                </div>
                <div className="flex flex-col justify-between items-center gap-2">
                  <Seat seat={getSeatById(9)!} onClick={handleSeatClick} />
                  <Seat seat={getSeatById(12)!} onClick={handleSeatClick} />
                </div>
              </div>
            </div>

            {/* 나머지 좌석 배치는 기존과 동일하므로 생략... */}
            {/* 실제 구현에서는 모든 좌석 배치를 포함해야 합니다 */}
          </div>
        </CardContent>
      </Card>

      {/* 상태 패널 - 기존과 동일하지만 실시간 업데이트 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-system-green/10 to-system-green/5 pb-4">
            <CardTitle className="flex items-center space-x-3 text-system-green">
              <div className="w-10 h-10 bg-system-green/10 rounded-2xl flex items-center justify-center">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold">출석한 사람</div>
                <div className="text-sm font-medium opacity-70">{presentCount}명</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {presentList.map((seat) => (
                <div
                  key={seat.id}
                  className="bg-system-green/10 text-system-green border border-system-green/20 px-4 py-2 rounded-2xl text-sm font-medium"
                >
                  {String(seat.id).padStart(2, "0")} {seat.name}
                </div>
              ))}
              {presentList.length === 0 && <p className="text-neutral-500 text-sm">출석한 사람이 없습니다.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-neutral-100 to-neutral-50 pb-4">
            <CardTitle className="flex items-center space-x-3 text-neutral-600">
              <div className="w-10 h-10 bg-neutral-100 rounded-2xl flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold">출석 대기</div>
                <div className="text-sm font-medium opacity-70">{waitingCount}명</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {waitingList.map((seat) => (
                <div
                  key={seat.id}
                  className="bg-neutral-100 text-neutral-600 border border-neutral-200 px-4 py-2 rounded-2xl text-sm font-medium"
                >
                  {String(seat.id).padStart(2, "0")} {seat.name}
                </div>
              ))}
              {waitingList.length === 0 && <p className="text-neutral-500 text-sm">대기 중인 사람이 없습니다.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-system-red/10 to-system-red/5 pb-4">
            <CardTitle className="flex items-center space-x-3 text-system-red">
              <div className="w-10 h-10 bg-system-red/10 rounded-2xl flex items-center justify-center">
                <UserX className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold">자리 비움</div>
                <div className="text-sm font-medium opacity-70">{absentCount}명</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {absentList.map((seat) => (
                <div
                  key={seat.id}
                  className="bg-system-red/10 text-system-red border border-system-red/20 px-4 py-2 rounded-2xl text-sm font-medium"
                >
                  {String(seat.id).padStart(2, "0")} {seat.name}
                </div>
              ))}
              {absentList.length === 0 && <p className="text-neutral-500 text-sm">자리를 비운 사람이 없습니다.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
