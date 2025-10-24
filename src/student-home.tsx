"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Badge } from "components/ui/badge"
import { Progress } from "components/ui/progress"
import {
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Play,
  Target,
  TrendingUp,
  Award,
} from "lucide-react"

interface StudentHomeProps {
  userRole: string
  currentUser: any
  onNavigate: (tab: string) => void
}

export default function StudentHome({ userRole, currentUser, onNavigate }: StudentHomeProps) {
  const [attendanceStatus, setAttendanceStatus] = useState<"present" | "absent" | "late" | null>(null)
  const [loginTime, setLoginTime] = useState<string>("")

  // 로그인 시간 기록
  useEffect(() => {
    const now = new Date()
    setLoginTime(now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }))

    // 출석 상태 시뮬레이션 (실제로는 서버에서 가져옴)
    const currentHour = now.getHours()
    if (currentHour < 9) {
      setAttendanceStatus(null) // 아직 출석 시간 전
    } else if (currentHour === 9 && now.getMinutes() <= 10) {
      setAttendanceStatus("present") // 정시 출석
    } else if (currentHour === 9 && now.getMinutes() <= 30) {
      setAttendanceStatus("late") // 지각
    } else {
      setAttendanceStatus("present") // 이미 출석 완료
    }
  }, [])

  // 개인 학습 진행률 (실제로는 서버에서 가져옴)
  const myProgress = {
    currentCourse: "웹 개발 기초",
    progress: 75,
    completedLessons: 15,
    totalLessons: 20,
    nextLesson: "JavaScript DOM 조작",
    estimatedCompletion: "2024-02-20",
  }

  // 오늘의 수업 일정
  const todaySchedule = [
    {
      time: "09:00-12:00",
      subject: "JavaScript 기초",
      topic: "DOM 조작과 이벤트 처리",
      instructor: "김코치",
      room: "A강의실",
      status: "current",
    },
    {
      time: "13:00-15:00",
      subject: "프로젝트 실습",
      topic: "To-Do List 만들기",
      instructor: "김코치",
      room: "A강의실",
      status: "upcoming",
    },
    {
      time: "15:00-17:00",
      subject: "개별 멘토링",
      topic: "포트폴리오 피드백",
      instructor: "김코치",
      room: "상담실",
      status: "upcoming",
    },
  ]

  // 최근 공지사항 (수강생 관련만)
  const announcements = [
    {
      id: 1,
      title: "2월 프로젝트 발표회 안내",
      content: "2월 15일 프로젝트 발표회가 있습니다. 준비해주세요.",
      author: "운영진",
      time: "2시간 전",
      important: true,
    },
    {
      id: 2,
      title: "JavaScript 과제 제출 안내",
      content: "이번 주 금요일까지 DOM 조작 과제를 제출해주세요.",
      author: "김코치",
      time: "1일 전",
      important: false,
    },
    {
      id: 3,
      title: "취업 특강 신청 안내",
      content: "2월 18일 취업 특강 신청을 받습니다.",
      author: "운영진",
      time: "2일 전",
      important: false,
    },
  ]

  // 최근 게시글 (일반 소통)
  const recentPosts = [
    {
      id: 1,
      title: "JavaScript 질문있어요!",
      author: "이수강생",
      replies: 3,
      time: "30분 전",
      category: "질문",
    },
    {
      id: 2,
      title: "프로젝트 팀원 구해요",
      author: "박학생",
      replies: 7,
      time: "1시간 전",
      category: "팀원모집",
    },
    {
      id: 3,
      title: "오늘 수업 정리 공유",
      author: "최학습자",
      replies: 12,
      time: "2시간 전",
      category: "정보공유",
    },
  ]

  const getAttendanceStatusInfo = () => {
    switch (attendanceStatus) {
      case "present":
        return {
          icon: CheckCircle,
          text: "출석 완료",
          color: "system-green",
          bgColor: "system-green/10",
          message: `${loginTime}에 출석하셨습니다.`,
        }
      case "late":
        return {
          icon: Clock,
          text: "지각",
          color: "system-orange",
          bgColor: "system-orange/10",
          message: `${loginTime}에 늦게 출석하셨습니다.`,
        }
      case "absent":
        return {
          icon: AlertCircle,
          text: "결석",
          color: "system-red",
          bgColor: "system-red/10",
          message: "아직 출석하지 않으셨습니다.",
        }
      default:
        return {
          icon: Clock,
          text: "출석 대기",
          color: "neutral-500",
          bgColor: "neutral-100",
          message: "출석 시간이 되면 자동으로 체크됩니다.",
        }
    }
  }

  const attendanceInfo = getAttendanceStatusInfo()
  const AttendanceIcon = attendanceInfo.icon

  return (
    <div className="space-y-8">
      {/* 웰컴 섹션 */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-system-blue/20 to-system-green/20"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">안녕하세요, {currentUser?.name}님! 👋</h1>
          <p className="text-neutral-300 text-lg mb-6">오늘도 열심히 학습해보세요!</p>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold">{myProgress.completedLessons}</div>
              <div className="text-sm text-neutral-400">완료한 수업</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{myProgress.progress}%</div>
              <div className="text-sm text-neutral-400">진행률</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{myProgress.totalLessons - myProgress.completedLessons}</div>
              <div className="text-sm text-neutral-400">남은 수업</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 출석 상태 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>오늘 출석 현황</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-6 rounded-2xl bg-${attendanceInfo.bgColor} border border-${attendanceInfo.color}/20`}>
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-2xl bg-${attendanceInfo.color}/20`}>
                  <AttendanceIcon className={`h-6 w-6 text-${attendanceInfo.color}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold text-${attendanceInfo.color}`}>{attendanceInfo.text}</h3>
                  <p className="text-sm text-neutral-600">{attendanceInfo.message}</p>
                </div>
              </div>
              {attendanceStatus && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate("attendance")}
                  className="w-full rounded-xl bg-transparent"
                >
                  출석 현황 자세히 보기
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 학습 진행률 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>나의 학습 진행률</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-neutral-900">{myProgress.currentCourse}</h3>
                  <span className="text-sm font-medium text-system-blue">{myProgress.progress}%</span>
                </div>
                <Progress value={myProgress.progress} className="h-3 rounded-full" />
                <p className="text-sm text-neutral-600 mt-2">
                  {myProgress.completedLessons}/{myProgress.totalLessons} 수업 완료
                </p>
              </div>
              <div className="p-4 bg-system-blue/10 rounded-2xl">
                <h4 className="font-medium text-system-blue mb-1">다음 수업</h4>
                <p className="text-sm text-neutral-700">{myProgress.nextLesson}</p>
              </div>
              <Button
                onClick={() => onNavigate("curriculum")}
                className="w-full bg-system-blue hover:bg-system-blue/90 rounded-xl"
              >
                <Play className="h-4 w-4 mr-2" />
                학습 계속하기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 성취 현황 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>이번 주 성과</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-system-green/10 rounded-2xl">
                <CheckCircle className="h-5 w-5 text-system-green" />
                <div>
                  <p className="font-medium text-sm">과제 완료</p>
                  <p className="text-xs text-neutral-600">JavaScript 기초 과제</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-system-purple/10 rounded-2xl">
                <Target className="h-5 w-5 text-system-purple" />
                <div>
                  <p className="font-medium text-sm">목표 달성</p>
                  <p className="text-xs text-neutral-600">주간 학습 목표 100%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-system-orange/10 rounded-2xl">
                <TrendingUp className="h-5 w-5 text-system-orange" />
                <div>
                  <p className="font-medium text-sm">성장 지수</p>
                  <p className="text-xs text-neutral-600">지난주 대비 15% 향상</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 오늘의 수업 일정 */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>오늘의 수업 일정</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((schedule, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  schedule.status === "current"
                    ? "bg-system-blue/10 border-system-blue/20"
                    : "bg-neutral-50/50 border-neutral-200/50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        schedule.status === "current" ? "bg-system-blue text-white" : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {schedule.time}
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        schedule.status === "current"
                          ? "bg-system-green/10 text-system-green border-system-green/20"
                          : "bg-neutral-100 text-neutral-600 border-neutral-200"
                      }
                    >
                      {schedule.status === "current" ? "진행 중" : "예정"}
                    </Badge>
                  </div>
                  <span className="text-sm text-neutral-500">{schedule.room}</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">{schedule.subject}</h3>
                <p className="text-sm text-neutral-600 mb-2">{schedule.topic}</p>
                <p className="text-xs text-neutral-500">강사: {schedule.instructor}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 중요 공지사항 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>중요 공지사항</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("board")} className="text-system-blue">
                전체보기
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`p-4 rounded-2xl cursor-pointer hover:shadow-md transition-all ${
                    announcement.important ? "bg-system-red/5 border border-system-red/20" : "bg-neutral-50/50"
                  }`}
                  onClick={() => onNavigate("board")}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm text-neutral-900 flex-1">{announcement.title}</h4>
                    {announcement.important && (
                      <Badge
                        variant="outline"
                        className="bg-system-red/10 text-system-red border-system-red/20 text-xs"
                      >
                        중요
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 mb-2 line-clamp-2">{announcement.content}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{announcement.author}</span>
                    <span>{announcement.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 최근 게시글 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>최근 게시글</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("board")} className="text-system-blue">
                전체보기
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-neutral-50/50 rounded-2xl cursor-pointer hover:shadow-md transition-all"
                  onClick={() => onNavigate("board")}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm text-neutral-900 flex-1">{post.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{post.author}</span>
                    <div className="flex items-center space-x-2">
                      <span>댓글 {post.replies}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
