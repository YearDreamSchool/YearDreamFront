"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { Progress } from "components/ui/progress"
import { Button } from "components/ui/button"
import { BookOpen, Clock, Users, Award, ChevronRight, Play } from "lucide-react"

export default function Curriculum() {
  const courses = [
    {
      id: 1,
      title: "웹 개발 기초",
      description: "HTML, CSS, JavaScript 기초부터 실무까지",
      duration: "8주",
      level: "초급",
      students: 25,
      progress: 65,
      modules: [
        "HTML 기초 및 구조",
        "CSS 스타일링 및 레이아웃",
        "JavaScript 기초 문법",
        "DOM 조작 및 이벤트",
        "반응형 웹 디자인",
        "프로젝트 실습",
      ],
      status: "진행중",
    },
    {
      id: 2,
      title: "React 개발",
      description: "모던 프론트엔드 개발을 위한 React 마스터",
      duration: "10주",
      level: "중급",
      students: 20,
      progress: 30,
      modules: [
        "React 기초 개념",
        "컴포넌트 및 Props",
        "State 및 이벤트 처리",
        "Hook 활용",
        "상태 관리 (Redux)",
        "실전 프로젝트",
      ],
      status: "진행중",
    },
    {
      id: 3,
      title: "백엔드 개발",
      description: "Node.js와 데이터베이스를 활용한 서버 개발",
      duration: "12주",
      level: "중급",
      students: 18,
      progress: 0,
      modules: [
        "Node.js 기초",
        "Express.js 프레임워크",
        "데이터베이스 설계",
        "API 개발",
        "인증 및 보안",
        "배포 및 운영",
      ],
      status: "예정",
    },
    {
      id: 4,
      title: "취업 준비",
      description: "포트폴리오 제작부터 면접 준비까지",
      duration: "4주",
      level: "전체",
      students: 30,
      progress: 100,
      modules: ["포트폴리오 기획", "GitHub 활용법", "이력서 작성법", "기술 면접 준비", "모의 면접", "취업 전략"],
      status: "완료",
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "초급":
        return "default"
      case "중급":
        return "secondary"
      case "고급":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "진행중":
        return "default"
      case "예정":
        return "secondary"
      case "완료":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold">커리큘럼</h2>
        <p className="text-muted-foreground">이어드림스쿨의 체계적인 교육 과정을 확인하세요 (아직 개발중입니다)</p>
      </div>

      {/* 전체 진행 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>전체 진행 현황</span>
          </CardTitle>
          <CardDescription>현재 진행 중인 모든 과정의 종합 현황입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <p className="text-sm text-muted-foreground">전체 과정</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <p className="text-sm text-muted-foreground">진행 중</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <p className="text-sm text-muted-foreground">예정</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">1</div>
              <p className="text-sm text-muted-foreground">완료</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 커리큘럼 목록 */}
      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant={getLevelColor(course.level)}>{course.level}</Badge>
                    <Badge variant={getStatusColor(course.status)}>{course.status}</Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="mt-2">{course.description}</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  시작하기
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.students}명 수강</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.modules.length}개 모듈</span>
                </div>
              </div>

              {course.status === "진행중" && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">진행률</span>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium text-sm">커리큘럼 구성</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm p-2 bg-gray-50 rounded">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span>{module}</span>
                      {course.status === "진행중" &&
                        index < Math.floor((course.modules.length * course.progress) / 100) && (
                          <Badge variant="outline" className="ml-auto text-xs">
                            완료
                          </Badge>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 학습 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>학습 가이드</CardTitle>
          <CardDescription>효과적인 학습을 위한 안내사항입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">학습 방법</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span>단계별 순서대로 학습 진행</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span>실습 위주의 학습 방식</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span>프로젝트 기반 학습</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span>코치와의 1:1 멘토링</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">지원 사항</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span>24시간 온라인 학습 자료 제공</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span>실시간 질의응답 지원</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span>취업 지원 프로그램</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span>수료증 발급</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
