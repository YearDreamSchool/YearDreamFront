"use client"

import { useState } from "react"
import { Card, CardContent } from "components/ui/card"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Textarea } from "components/ui/textarea"
import { Badge } from "components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog"
import { Label } from "components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Plus, MessageSquare, ThumbsUp, Pin, Search } from "lucide-react"

interface BoardProps {
  userRole: string
}

export default function Board({ userRole }: BoardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "2024년 1월 교육 일정 안내",
      content: "새해 첫 교육 일정을 안내드립니다...",
      author: "운영진",
      category: "공지사항",
      time: "2시간 전",
      comments: 5,
      likes: 12,
      pinned: true,
    },
    {
      id: 2,
      title: "프로젝트 발표 준비 안내",
      content: "다음 주 프로젝트 발표를 위한 준비사항입니다...",
      author: "김코치",
      category: "수업",
      time: "4시간 전",
      comments: 12,
      likes: 8,
      pinned: false,
    },
    {
      id: 3,
      title: "취업 특강 신청 안내",
      content: "이번 달 취업 특강 일정과 신청 방법을 안내드립니다...",
      author: "운영진",
      category: "취업",
      time: "1일 전",
      comments: 8,
      likes: 15,
      pinned: false,
    },
    {
      id: 4,
      title: "점심시간 식당 이용 안내",
      content: "점심시간 식당 이용 시 주의사항을 안내드립니다...",
      author: "운영진",
      category: "생활",
      time: "2일 전",
      comments: 3,
      likes: 6,
      pinned: false,
    },
  ])

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "일반",
  })

  const categories = ["all", "공지사항", "수업", "취업", "생활", "일반"]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        ...newPost,
        author: userRole === "admin" ? "운영진" : userRole === "coach" ? "김코치" : "수강생",
        time: "방금 전",
        comments: 0,
        likes: 0,
        pinned: false,
      }
      setPosts([post, ...posts])
      setNewPost({ title: "", content: "", category: "일반" })
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지사항":
        return "default"
      case "수업":
        return "secondary"
      case "취업":
        return "destructive"
      case "생활":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">공용 게시판</h2>
          <p className="text-muted-foreground">공지사항과 소통 공간입니다 (아직 개발중입니다)</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />글 작성
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>새 글 작성</DialogTitle>
              <DialogDescription>게시판에 새로운 글을 작성하세요</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">카테고리</Label>
                <Select value={newPost.category} onValueChange={(value:any) => setNewPost({ ...newPost, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="일반">일반</SelectItem>
                    <SelectItem value="수업">수업</SelectItem>
                    <SelectItem value="취업">취업</SelectItem>
                    <SelectItem value="생활">생활</SelectItem>
                    {userRole === "admin" && <SelectItem value="공지사항">공지사항</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="내용을 입력하세요"
                  rows={5}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button>취소</Button>
              <Button onClick={handleCreatePost}>작성</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="제목 또는 내용으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 카테고리</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {post.pinned && <Pin className="h-4 w-4 text-blue-600" />}
                    <Badge variant={getCategoryColor(post.category)}>{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
