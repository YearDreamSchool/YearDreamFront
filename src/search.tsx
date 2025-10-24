"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader } from "components/ui/card"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Badge } from "components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import {
  Search,
  X,
  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  Clock,
  ArrowRight,
  Filter,
  TrendingUp,
} from "lucide-react"

interface SearchProps {
  onClose: () => void
  onNavigate: (tab: string) => void
}

export default function SearchModal({ onClose, onNavigate }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "people" | "posts" | "courses" | "events">("all")
  const [results, setResults] = useState<any[]>([])

  // 검색 데이터
  const searchData = {
    people: [
      { id: 1, name: "황희수", role: "수강생", seat: "A-01", status: "active", avatar: "황" },
      { id: 2, name: "심규상", role: "수강생", seat: "A-02", status: "active", avatar: "심" },
      { id: 3, name: "김코치", role: "코치", department: "프론트엔드", avatar: "김" },
      { id: 4, name: "박관리자", role: "관리자", department: "운영팀", avatar: "박" },
    ],
    posts: [
      {
        id: 1,
        title: "2024년 1월 교육 일정 안내",
        content: "새해 첫 교육 일정을 안내드립니다...",
        author: "운영진",
        category: "공지사항",
        time: "2시간 전",
      },
      {
        id: 2,
        title: "프로젝트 발표 준비 안내",
        content: "다음 주 프로젝트 발표를 위한 준비사항입니다...",
        author: "김코치",
        category: "수업",
        time: "4시간 전",
      },
    ],
    courses: [
      {
        id: 1,
        title: "웹 개발 기초",
        description: "HTML, CSS, JavaScript 기초부터 실무까지",
        progress: 65,
        students: 25,
        status: "진행중",
      },
      {
        id: 2,
        title: "React 개발",
        description: "모던 프론트엔드 개발을 위한 React 마스터",
        progress: 30,
        students: 20,
        status: "진행중",
      },
    ],
    events: [
      {
        id: 1,
        title: "프로젝트 발표회",
        date: "2024-02-15",
        time: "14:00",
        type: "presentation",
        participants: 25,
      },
      {
        id: 2,
        title: "취업 특강",
        date: "2024-02-18",
        time: "13:00",
        type: "lecture",
        participants: 30,
      },
    ],
  }

  const recentSearches = ["황희수", "프로젝트 발표", "웹 개발 기초", "출석 체크"]
  const popularSearches = ["React", "JavaScript", "프론트엔드", "백엔드", "취업"]

  useEffect(() => {
    if (searchTerm.trim()) {
      performSearch(searchTerm)
    } else {
      setResults([])
    }
  }, [searchTerm, activeFilter])

  const performSearch = (term: string) => {
    const searchResults: any[] = []

    if (activeFilter === "all" || activeFilter === "people") {
      const peopleResults = searchData.people
        .filter((person) => person.name.toLowerCase().includes(term.toLowerCase()))
        .map((person) => ({ ...person, type: "people" }))
      searchResults.push(...peopleResults)
    }

    if (activeFilter === "all" || activeFilter === "posts") {
      const postResults = searchData.posts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(term.toLowerCase()) ||
            post.content.toLowerCase().includes(term.toLowerCase()),
        )
        .map((post) => ({ ...post, type: "posts" }))
      searchResults.push(...postResults)
    }

    if (activeFilter === "all" || activeFilter === "courses") {
      const courseResults = searchData.courses
        .filter(
          (course) =>
            course.title.toLowerCase().includes(term.toLowerCase()) ||
            course.description.toLowerCase().includes(term.toLowerCase()),
        )
        .map((course) => ({ ...course, type: "courses" }))
      searchResults.push(...courseResults)
    }

    if (activeFilter === "all" || activeFilter === "events") {
      const eventResults = searchData.events
        .filter((event) => event.title.toLowerCase().includes(term.toLowerCase()))
        .map((event) => ({ ...event, type: "events" }))
      searchResults.push(...eventResults)
    }

    setResults(searchResults)
  }

  const handleResultClick = (result: any) => {
    switch (result.type) {
      case "people":
        onNavigate("attendance")
        break
      case "posts":
        onNavigate("board")
        break
      case "courses":
        onNavigate("curriculum")
        break
      case "events":
        onNavigate("calendar")
        break
    }
    onClose()
  }

  const renderResult = (result: any) => {
    switch (result.type) {
      case "people":
        return (
          <div
            key={`${result.type}-${result.id}`}
            className="flex items-center space-x-4 p-4 hover:bg-neutral-50 rounded-2xl cursor-pointer transition-colors"
            onClick={() => handleResultClick(result)}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-system-blue text-white">{result.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold text-neutral-900">{result.name}</h4>
              <p className="text-sm text-neutral-600">
                {result.role} {result.seat && `• ${result.seat}`} {result.department && `• ${result.department}`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {result.role}
              </Badge>
              <ArrowRight className="h-4 w-4 text-neutral-400" />
            </div>
          </div>
        )

      case "posts":
        return (
          <div
            key={`${result.type}-${result.id}`}
            className="p-4 hover:bg-neutral-50 rounded-2xl cursor-pointer transition-colors"
            onClick={() => handleResultClick(result)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-neutral-900 flex-1">{result.title}</h4>
              <ArrowRight className="h-4 w-4 text-neutral-400 mt-1" />
            </div>
            <p className="text-sm text-neutral-600 mb-2 line-clamp-2">{result.content}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {result.category}
              </Badge>
              <span className="text-xs text-neutral-400">
                {result.author} • {result.time}
              </span>
            </div>
          </div>
        )

      case "courses":
        return (
          <div
            key={`${result.type}-${result.id}`}
            className="p-4 hover:bg-neutral-50 rounded-2xl cursor-pointer transition-colors"
            onClick={() => handleResultClick(result)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-neutral-900 flex-1">{result.title}</h4>
              <ArrowRight className="h-4 w-4 text-neutral-400 mt-1" />
            </div>
            <p className="text-sm text-neutral-600 mb-3">{result.description}</p>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                {result.status}
              </Badge>
              <span className="text-xs text-neutral-500">진행률 {result.progress}%</span>
              <span className="text-xs text-neutral-500">{result.students}명 수강</span>
            </div>
          </div>
        )

      case "events":
        return (
          <div
            key={`${result.type}-${result.id}`}
            className="p-4 hover:bg-neutral-50 rounded-2xl cursor-pointer transition-colors"
            onClick={() => handleResultClick(result)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-neutral-900 flex-1">{result.title}</h4>
              <ArrowRight className="h-4 w-4 text-neutral-400 mt-1" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-neutral-600">
                <Calendar className="h-4 w-4" />
                <span>{new Date(result.date).toLocaleDateString("ko-KR")}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-neutral-600">
                <Clock className="h-4 w-4" />
                <span>{result.time}</span>
              </div>
              <span className="text-xs text-neutral-500">{result.participants}명 참여</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-3xl mx-4 bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl max-h-[80vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <Search className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <Input
                placeholder="사람, 게시글, 과정, 일정을 검색하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-2xl h-12 text-lg"
                autoFocus
              />
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <div className="p-6">
          {/* 필터 */}
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="h-4 w-4 text-neutral-500" />
            <div className="flex space-x-2">
              {[
                { key: "all", label: "전체" },
                { key: "people", label: "사람" },
                { key: "posts", label: "게시글" },
                { key: "courses", label: "과정" },
                { key: "events", label: "일정" },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key as any)}
                  className="rounded-xl"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 검색 결과 */}
          <div className="max-h-96 overflow-y-auto">
            {searchTerm.trim() ? (
              results.length > 0 ? (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-neutral-500 mb-4">검색 결과 ({results.length}개)</h3>
                  {results.map(renderResult)}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500">"{searchTerm}"에 대한 검색 결과가 없습니다</p>
                </div>
              )
            ) : (
              <div className="space-y-6">
                {/* 최근 검색 */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 mb-3">최근 검색</h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchTerm(term)}
                        className="rounded-xl text-xs"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 인기 검색어 */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 mb-3">인기 검색어</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchTerm(term)}
                        className="rounded-xl text-xs"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 빠른 액세스 */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 mb-3">빠른 액세스</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="justify-start h-12 rounded-xl bg-transparent"
                      onClick={() => {
                        onNavigate("attendance")
                        onClose()
                      }}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      출석 관리
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-12 rounded-xl bg-transparent"
                      onClick={() => {
                        onNavigate("board")
                        onClose()
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      게시판
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-12 rounded-xl bg-transparent"
                      onClick={() => {
                        onNavigate("curriculum")
                        onClose()
                      }}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      커리큘럼
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-12 rounded-xl bg-transparent"
                      onClick={() => {
                        onNavigate("calendar")
                        onClose()
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      일정
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
