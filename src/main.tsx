"use client"

import { Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Badge } from "components/ui/badge"
import {
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  TrendingUp,
  Award,
  ArrowRight,
  Play,
  Star,
  Target,
} from "lucide-react"
import StudentHome from "student-home"

interface MainPageProps {
  userRole: string
  currentUser?: any
  onNavigate: (tab: string) => void
}

export default function MainPage({ userRole, currentUser, onNavigate }: MainPageProps) {
  // 수강생인 경우 전용 홈 화면 표시
  if (userRole === "student") {
    return <StudentHome userRole={userRole} currentUser={currentUser} onNavigate={onNavigate} />
  }

  // 기존 관리자/코치용 메인 페이지
  const quickStats = [
    { label: "총 수강생", value: "58명", icon: Users, color: "system-blue" },
    { label: "진행 중인 과정", value: "4개", icon: BookOpen, color: "system-green" },
    { label: "이번 주 일정", value: "12개", icon: Calendar, color: "system-purple" },
    { label: "새 게시글", value: "8개", icon: MessageSquare, color: "system-orange" },
  ]

  const recentActivities = [
    {
      type: "attendance",
      title: "출석 체크 완료",
      description: "오늘 출석률 92% 달성",
      time: "10분 전",
      icon: Users,
      color: "system-green",
    },
    {
      type: "post",
      title: "새 공지사항 게시",
      description: "2월 교육 일정 안내",
      time: "1시간 전",
      icon: MessageSquare,
      color: "system-blue",
    },
    {
      type: "schedule",
      title: "특강 일정 추가",
      description: "취업 준비 워크샵",
      time: "2시간 전",
      icon: Calendar,
      color: "system-purple",
    },
  ]

  const upcomingEvents = [
    {
      title: "프로젝트 발표회",
      date: "2024-02-15",
      time: "14:00",
      participants: 25,
      type: "presentation",
    },
    {
      title: "취업 특강",
      date: "2024-02-18",
      time: "13:00",
      participants: 30,
      type: "lecture",
    },
    {
      title: "멘토링 세션",
      date: "2024-02-20",
      time: "16:00",
      participants: 15,
      type: "mentoring",
    },
  ]

  const achievements = [
    { title: "완벽한 출석률", description: "이번 주 100% 출석 달성", icon: Award },
    { title: "활발한 소통", description: "게시판 활동 증가 150%", icon: TrendingUp },
    { title: "프로젝트 완성", description: "5개 팀 프로젝트 완료", icon: Target },
  ]

  // 개발 중 메시지를 표시하는 공통 컴포넌트
  const DevelopmentNotice = ({ title }: { title: string }) => (
    <div className="col-span-full">
      <div className="bg-neutral-50/70 backdrop-blur-sm border-2 border-dashed border-neutral-300 rounded-2xl p-12 text-center shadow-inner min-h-[200px] flex flex-col items-center justify-center">
        <Wrench className="h-8 w-8 text-neutral-500 mb-4" />
        <p className="text-xl font-bold text-neutral-700">{title} 섹션</p>
        <p className="text-sm text-neutral-500 mt-1">현재 개발 및 데이터 통합 작업이 진행 중입니다. 잠시만 기다려주세요! 😊</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* 웰컴 섹션 */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-system-blue/20 to-system-purple/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">이어드림스쿨에 오신 것을 환영합니다! 🎉</h1>
              <p className="text-neutral-300 text-lg mb-6">함께 성장하는 개발자 교육 플랫폼에서 꿈을 이루어보세요</p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold"></div>
                  <div className="text-sm text-neutral-400"></div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold"></div>
                  <div className="text-sm text-neutral-400"></div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold"></div>
                  <div className="text-sm text-neutral-400"></div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 빠른 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 👇 [강제] 개발 중/데이터 없음 메시지 표시 */}
        <DevelopmentNotice title="빠른 통계" />
        {/* {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => {
                if (stat.label.includes("수강생")) onNavigate("attendance")
                if (stat.label.includes("과정")) onNavigate("curriculum")
                if (stat.label.includes("일정")) onNavigate("calendar")
                if (stat.label.includes("게시글")) onNavigate("board")
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-${stat.color}/10`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  <ArrowRight className="h-4 w-4 text-neutral-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })} */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 최근 활동 */}
        <div className="lg:col-span-2">
          <DevelopmentNotice title="최근 활동" />
          {/* <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-neutral-900">최근 활동</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-neutral-50/50 rounded-2xl">
                      <div className={`p-3 rounded-2xl bg-${activity.color}/10`}>
                        <Icon className={`h-5 w-5 text-${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900">{activity.title}</h4>
                        <p className="text-sm text-neutral-600">{activity.description}</p>
                      </div>
                      <span className="text-xs text-neutral-400">{activity.time}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* 다가오는 일정 */}
        <div>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-neutral-900">다가오는 일정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <DevelopmentNotice title="다가오는 일정" />
                {/* {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 border border-neutral-200 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm text-neutral-900">{event.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          event.type === "presentation"
                            ? "bg-system-red/10 text-system-red border-system-red/20"
                            : event.type === "lecture"
                              ? "bg-system-blue/10 text-system-blue border-system-blue/20"
                              : "bg-system-green/10 text-system-green border-system-green/20"
                        }`}
                      >
                        {event.type === "presentation" ? "발표" : event.type === "lecture" ? "특강" : "멘토링"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>
                        {new Date(event.date).toLocaleDateString("ko-KR")} {event.time}
                      </span>
                      <span>{event.participants}명 참여</span>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 성과 및 퀵 액션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 이번 주 성과 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-neutral-900">이번 주 성과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <DevelopmentNotice title="이번 주 성과" />
              {/* {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-system-blue/5 to-system-purple/5 rounded-2xl"
                  >
                    <div className="p-3 bg-system-blue/10 rounded-2xl">
                      <Icon className="h-5 w-5 text-system-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">{achievement.title}</h4>
                      <p className="text-sm text-neutral-600">{achievement.description}</p>
                    </div>
                  </div>
                )
              })} */}
            </div>
          </CardContent>
        </Card>

        {/* 퀵 액션 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-neutral-900">빠른 실행</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                className="w-full justify-start bg-system-blue hover:bg-system-blue/90 text-white rounded-xl h-14"
                onClick={() => onNavigate("attendance")}
              >
                <Users className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">출석 체크</div>
                  <div className="text-xs opacity-80">실시간 좌석 현황 관리</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-neutral-200 hover:bg-neutral-50 rounded-xl h-14 bg-transparent"
                onClick={() => onNavigate("board")}
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">공지사항 작성</div>
                  <div className="text-xs text-neutral-500">새로운 소식 공유</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-neutral-200 hover:bg-neutral-50 rounded-xl h-14 bg-transparent"
                onClick={() => onNavigate("calendar")}
              >
                <Calendar className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">일정 관리</div>
                  <div className="text-xs text-neutral-500">교육 스케줄 확인</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 학습 진행률 */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-neutral-900">전체 학습 진행률</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DevelopmentNotice title="전체 학습 진행률" />
            {/* <div className="text-center p-6 bg-gradient-to-br from-system-blue/10 to-system-blue/5 rounded-2xl">
              <div className="w-16 h-16 bg-system-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-system-blue" />
              </div>
              <h3 className="font-bold text-system-blue mb-2">웹 개발 기초</h3>
              <div className="text-2xl font-bold text-neutral-900 mb-1">65%</div>
              <p className="text-xs text-neutral-600">25명 수강 중</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-system-green/10 to-system-green/5 rounded-2xl">
              <div className="w-16 h-16 bg-system-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-system-green" />
              </div>
              <h3 className="font-bold text-system-green mb-2">React 개발</h3>
              <div className="text-2xl font-bold text-neutral-900 mb-1">30%</div>
              <p className="text-xs text-neutral-600">20명 수강 중</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-system-purple/10 to-system-purple/5 rounded-2xl">
              <div className="w-16 h-16 bg-system-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-system-purple" />
              </div>
              <h3 className="font-bold text-system-purple mb-2">백엔드 개발</h3>
              <div className="text-2xl font-bold text-neutral-900 mb-1">0%</div>
              <p className="text-xs text-neutral-600">18명 대기 중</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-system-orange/10 to-system-orange/5 rounded-2xl">
              <div className="w-16 h-16 bg-system-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-system-orange" />
              </div>
              <h3 className="font-bold text-system-orange mb-2">취업 준비</h3>
              <div className="text-2xl font-bold text-neutral-900 mb-1">100%</div>
              <p className="text-xs text-neutral-600">30명 완료</p>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
