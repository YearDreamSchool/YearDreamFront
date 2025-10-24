"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Badge } from "components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Trash2, Edit, Settings, Clock, Repeat } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Textarea } from "components/ui/textarea"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Checkbox } from "components/ui/checkbox"

interface CalendarViewProps {
  userRole?: string
}

export default function CalendarView({ userRole = "admin" }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "웹 개발 기초 수업",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      time: "09:00-12:00",
      type: "수업",
      description: "HTML/CSS 기초 학습",
      instructor: "김코치",
      room: "A강의실",
      participants: 25,
      color: "system-blue",
      isRecurring: true,
      recurringDays: ["월", "화", "수", "목", "금"],
      recurringType: "weekly",
    },
    {
      id: 2,
      title: "프로젝트 발표",
      startDate: "2024-01-18",
      endDate: "2024-01-18",
      time: "14:00-17:00",
      type: "발표",
      description: "1차 프로젝트 발표 및 피드백",
      instructor: "김코치",
      room: "B강의실",
      participants: 20,
      color: "system-red",
      isRecurring: false,
      recurringDays: [],
      recurringType: "none",
    },
    {
      id: 3,
      title: "취업 특강",
      startDate: "2024-01-22",
      endDate: "2024-02-22",
      time: "13:00-15:00",
      type: "특강",
      description: "이력서 작성법 및 면접 준비",
      instructor: "박강사",
      room: "세미나실",
      participants: 30,
      color: "system-purple",
      isRecurring: true,
      recurringDays: ["월"],
      recurringType: "weekly",
    },
    {
      id: 4,
      title: "멘토링 세션",
      startDate: "2024-01-25",
      endDate: "2024-01-25",
      time: "16:00-18:00",
      type: "멘토링",
      description: "개별 진로 상담",
      instructor: "김코치",
      room: "상담실",
      participants: 15,
      color: "system-green",
      isRecurring: false,
      recurringDays: [],
      recurringType: "none",
    },
  ])

  const [showEventModal, setShowEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [eventForm, setEventForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    time: "",
    type: "수업",
    description: "",
    instructor: "",
    room: "",
    participants: 0,
    color: "system-blue",
    isRecurring: false,
    recurringDays: [] as string[],
    recurringType: "none",
  })

  const weekDays = ["월", "화", "수", "목", "금", "토", "일"]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "수업":
        return "default"
      case "발표":
        return "destructive"
      case "특강":
        return "secondary"
      case "멘토링":
        return "outline"
      default:
        return "outline"
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "수업":
        return "system-blue"
      case "발표":
        return "system-red"
      case "특강":
        return "system-purple"
      case "멘토링":
        return "system-green"
      case "시험":
        return "system-orange"
      default:
        return "system-blue"
    }
  }

  // 특정 날짜에 이벤트가 있는지 확인 (반복 일정 고려)
  const isEventOnDate = (event: any, targetDate: Date) => {
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)

    // 날짜 범위 확인
    if (targetDate < startDate || targetDate > endDate) {
      return false
    }

    // 반복 일정이 아닌 경우
    if (!event.isRecurring) {
      return targetDate.toDateString() === startDate.toDateString()
    }

    // 반복 일정인 경우 요일 확인
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"]
    const targetDayName = dayNames[targetDate.getDay()]

    return event.recurringDays.includes(targetDayName)
  }

  const getEventsForDate = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return events.filter((event) => isEventOnDate(event, targetDate))
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // 빈 칸 추가 (월의 첫 날이 일요일이 아닌 경우)
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100"></div>)
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day)
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear()

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-100 p-1 cursor-pointer hover:bg-gray-50 ${
            isToday ? "bg-blue-50 border-blue-200" : ""
          }`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={`${event.id}-${index}`}
                className={`text-xs p-1 bg-${event.color}/20 text-${event.color} rounded truncate cursor-pointer hover:bg-${event.color}/30 transition-colors flex items-center space-x-1`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (userRole === "admin" || userRole === "coach") {
                    handleEditEvent(event)
                  }
                }}
                title={`${event.title} ${event.isRecurring ? "(반복)" : ""}`}
              >
                {event.isRecurring && <Repeat className="h-2 w-2" />}
                <span className="truncate">{event.title}</span>
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-gray-500">+{dayEvents.length - 2}개 더</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const todayEvents = events.filter((event) => {
    const today = new Date()
    return isEventOnDate(event, today)
  })

  const upcomingEvents = events.filter((event) => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    // 이벤트 기간 내에서 다음 주까지의 날짜들을 확인
    for (let d = new Date(today); d <= nextWeek; d.setDate(d.getDate() + 1)) {
      if (d > today && isEventOnDate(event, d)) {
        return true
      }
    }
    return false
  })

  const resetEventForm = () => {
    setEventForm({
      title: "",
      startDate: "",
      endDate: "",
      time: "",
      type: "수업",
      description: "",
      instructor: "",
      room: "",
      participants: 0,
      color: "system-blue",
      isRecurring: false,
      recurringDays: [],
      recurringType: "none",
    })
    setEditingEvent(null)
  }

  const handleCreateEvent = () => {
    resetEventForm()
    setShowEventModal(true)
  }

  const handleEditEvent = (event: any) => {
    setEventForm({
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      time: event.time,
      type: event.type,
      description: event.description,
      instructor: event.instructor,
      room: event.room,
      participants: event.participants,
      color: event.color,
      isRecurring: event.isRecurring,
      recurringDays: event.recurringDays || [],
      recurringType: event.recurringType || "none",
    })
    setEditingEvent(event)
    setShowEventModal(true)
  }

  const handleDeleteEvent = (eventId: number) => {
    if (window.confirm("이 일정을 삭제하시겠습니까?")) {
      setEvents(events.filter((event) => event.id !== eventId))
    }
  }

  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.startDate || !eventForm.time) {
      alert("필수 항목을 모두 입력해주세요.")
      return
    }

    // 종료일이 시작일보다 이전인지 확인
    if (eventForm.endDate && new Date(eventForm.endDate) < new Date(eventForm.startDate)) {
      alert("종료일은 시작일보다 늦어야 합니다.")
      return
    }

    // 종료일이 없으면 시작일과 같게 설정
    const finalEndDate = eventForm.endDate || eventForm.startDate

    if (editingEvent) {
      // 수정
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id ? { ...eventForm, id: editingEvent.id, endDate: finalEndDate } : event,
        ),
      )
    } else {
      // 새로 생성
      const newEvent = {
        ...eventForm,
        id: Math.max(...events.map((e) => e.id)) + 1,
        endDate: finalEndDate,
      }
      setEvents([...events, newEvent])
    }

    setShowEventModal(false)
    resetEventForm()
  }

  const handleRecurringDayToggle = (day: string) => {
    const updatedDays = eventForm.recurringDays.includes(day)
      ? eventForm.recurringDays.filter((d) => d !== day)
      : [...eventForm.recurringDays, day]

    setEventForm({ ...eventForm, recurringDays: updatedDays })
  }

  const formatEventPeriod = (event: any) => {
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)

    if (startDate.toDateString() === endDate.toDateString()) {
      return startDate.toLocaleDateString("ko-KR")
    } else {
      return `${startDate.toLocaleDateString("ko-KR")} ~ ${endDate.toLocaleDateString("ko-KR")}`
    }
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">캘린더</h2>
          <p className="text-muted-foreground">교육 일정과 주요 행사를 확인하세요 (아직 개발중입니다)</p>
        </div>
        {(userRole === "admin" || userRole === "coach") && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowEventModal(true)}>
              <Settings className="h-4 w-4 mr-2" />
              일정 관리
            </Button>
            <Button onClick={handleCreateEvent}>
              <Plus className="h-4 w-4 mr-2" />
              일정 추가
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 캘린더 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{formatDate(currentDate)}</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0 mb-4">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div
                    key={day}
                    className="h-8 flex items-center justify-center font-medium text-sm text-gray-600 border-b"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 오늘의 일정 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">오늘의 일정</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("ko-KR", {
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          {event.isRecurring && <Repeat className="h-3 w-3 text-gray-500" />}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Badge variant={getEventTypeColor(event.type)}>{event.type}</Badge>
                          {(userRole === "admin" || userRole === "coach") && (
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleEditEvent(event)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-system-red"
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{event.time}</p>
                      <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>강사: {event.instructor}</span>
                        <span>{event.room}</span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>기간: {formatEventPeriod(event)}</span>
                        </div>
                        {event.isRecurring && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Repeat className="h-3 w-3" />
                            <span>반복: {event.recurringDays.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">오늘 예정된 일정이 없습니다.</p>
              )}
            </CardContent>
          </Card>

          {/* 다가오는 일정 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">다가오는 일정</CardTitle>
              <CardDescription>이번 주 예정된 일정들</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 5).map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          {event.isRecurring && <Repeat className="h-3 w-3 text-gray-500" />}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Badge variant={getEventTypeColor(event.type)}>{event.type}</Badge>
                          {(userRole === "admin" || userRole === "coach") && (
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleEditEvent(event)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-system-red"
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{event.time}</p>
                      <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>강사: {event.instructor}</span>
                        <span>{event.room}</span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>기간: {formatEventPeriod(event)}</span>
                        </div>
                        {event.isRecurring && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Repeat className="h-3 w-3" />
                            <span>반복: {event.recurringDays.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">이번 주 예정된 일정이 없습니다.</p>
              )}
            </CardContent>
          </Card>

          {/* 일정 유형 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">일정 유형</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="default">수업</Badge>
                  <span className="text-sm text-muted-foreground">정규 수업</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">발표</Badge>
                  <span className="text-sm text-muted-foreground">프로젝트 발표</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">특강</Badge>
                  <span className="text-sm text-muted-foreground">특별 강의</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">멘토링</Badge>
                  <span className="text-sm text-muted-foreground">개별 상담</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 일정 관리 모달 */}
      {showEventModal && (
        <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "일정 수정" : "새 일정 추가"}</DialogTitle>
              <DialogDescription>
                교육생들이 볼 수 있는 수업 일정을 {editingEvent ? "수정" : "생성"}하세요
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">제목 *</Label>
                  <Input
                    id="title"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    placeholder="수업 제목을 입력하세요"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">유형 *</Label>
                  <Select
                    value={eventForm.type}
                    onValueChange={(value) => setEventForm({ ...eventForm, type: value, color: getEventColor(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="수업">수업</SelectItem>
                      <SelectItem value="발표">발표</SelectItem>
                      <SelectItem value="특강">특강</SelectItem>
                      <SelectItem value="멘토링">멘토링</SelectItem>
                      <SelectItem value="시험">시험</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 날짜 기간 설정 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">시작일 *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={eventForm.startDate}
                    onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">종료일</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={eventForm.endDate}
                    onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                    min={eventForm.startDate}
                  />
                  <p className="text-xs text-muted-foreground">비워두면 시작일과 같은 날로 설정됩니다</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">시간 *</Label>
                <Input
                  id="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                  placeholder="09:00-12:00"
                />
              </div>

              {/* 반복 설정 */}
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isRecurring"
                    checked={eventForm.isRecurring}
                    onCheckedChange={(checked) =>
                      setEventForm({
                        ...eventForm,
                        isRecurring: checked as boolean,
                        recurringDays: checked ? [] : [],
                        recurringType: checked ? "weekly" : "none",
                      })
                    }
                  />
                  <Label htmlFor="isRecurring" className="flex items-center space-x-2">
                    <Repeat className="h-4 w-4" />
                    <span>반복 일정</span>
                  </Label>
                </div>

                {eventForm.isRecurring && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>반복 요일 선택</Label>
                      <div className="flex flex-wrap gap-2">
                        {weekDays.map((day) => (
                          <Button
                            key={day}
                            type="button"
                            variant={eventForm.recurringDays.includes(day) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleRecurringDayToggle(day)}
                            className="w-12 h-8"
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">선택한 요일에 시작일부터 종료일까지 반복됩니다</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor">강사</Label>
                  <Input
                    id="instructor"
                    value={eventForm.instructor}
                    onChange={(e) => setEventForm({ ...eventForm, instructor: e.target.value })}
                    placeholder="강사명을 입력하세요"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">강의실</Label>
                  <Input
                    id="room"
                    value={eventForm.room}
                    onChange={(e) => setEventForm({ ...eventForm, room: e.target.value })}
                    placeholder="강의실을 입력하세요"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="participants">참여 인원</Label>
                <Input
                  id="participants"
                  type="number"
                  value={eventForm.participants}
                  onChange={(e) => setEventForm({ ...eventForm, participants: Number.parseInt(e.target.value) || 0 })}
                  placeholder="참여 예상 인원"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="수업 내용이나 준비사항을 입력하세요"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEventModal(false)}>
                취소
              </Button>
              <Button onClick={handleSaveEvent}>{editingEvent ? "수정" : "생성"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
