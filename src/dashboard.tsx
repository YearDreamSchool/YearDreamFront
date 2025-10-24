"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react"

interface DashboardProps {
  userRole: string
}

export default function Dashboard({ userRole }: DashboardProps) {
  const attendanceData = [
    { seat: "A-01", name: "김민수", status: "present", time: "09:00" },
    { seat: "A-02", name: "이영희", status: "present", time: "09:05" },
    { seat: "A-03", name: "박철수", status: "absent", time: "-" },
    { seat: "A-04", name: "정수진", status: "present", time: "08:55" },
    { seat: "A-05", name: "최민호", status: "late", time: "09:15" },
  ]

  const totalStudents = 25
  const presentStudents = 18
  const absentStudents = 4
  const lateStudents = 3
  const attendanceRate = Math.round((presentStudents / totalStudents) * 100)

  const recentPosts = [
    {
      title: "January 2024 Learning Schedule",
      author: "Admin Team",
      time: "2h ago",
      comments: 5,
      category: "announcement",
    },
    {
      title: "Project Presentation Guidelines",
      author: "Coach Kim",
      time: "4h ago",
      comments: 12,
      category: "project",
    },
    { title: "Career Development Workshop", author: "Admin Team", time: "1d ago", comments: 8, category: "career" },
  ]

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      change: "+2.5%",
      icon: Users,
      color: "system-blue",
    },
    {
      title: "Present Today",
      value: presentStudents,
      change: "+5.2%",
      icon: UserCheck,
      color: "system-green",
    },
    {
      title: "Absent",
      value: absentStudents,
      change: "-1.8%",
      icon: UserX,
      color: "system-red",
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      change: "+3.1%",
      icon: TrendingUp,
      color: "system-purple",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-system-blue/20 to-system-purple/20"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Good morning, Coach Kim! 👋</h2>
          <p className="text-neutral-300 text-lg">Here's what's happening with your students today.</p>
          <div className="flex items-center space-x-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{presentStudents}</div>
              <div className="text-sm text-neutral-400">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{lateStudents}</div>
              <div className="text-sm text-neutral-400">Late</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{absentStudents}</div>
              <div className="text-sm text-neutral-400">Absent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-${stat.color}/10`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
                    <div className="flex items-center space-x-1 text-system-green text-sm font-medium">
                      <ArrowUpRight className="h-4 w-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Attendance */}
        <div className="lg:col-span-2">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-neutral-900">Live Attendance</CardTitle>
                  <CardDescription className="text-neutral-500">Real-time student status</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-system-green rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-neutral-600">Live</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50/50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center font-mono text-sm font-bold">
                        {student.seat}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{student.name}</p>
                        <p className="text-sm text-neutral-500">
                          {student.time !== "-" ? `Checked in at ${student.time}` : "Not checked in"}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`border-0 font-medium ${
                        student.status === "present"
                          ? "bg-system-green/10 text-system-green"
                          : student.status === "late"
                            ? "bg-system-orange/10 text-system-orange"
                            : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {student.status === "present" ? "Present" : student.status === "late" ? "Late" : "Absent"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-neutral-900">Recent Posts</CardTitle>
              <CardDescription className="text-neutral-500">Latest community updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-sm text-neutral-900 hover:text-system-blue cursor-pointer transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">
                        {post.author} • {post.time}
                      </span>
                      <div className="flex items-center space-x-1 text-neutral-400">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    {index < recentPosts.length - 1 && <div className="border-b border-neutral-200/50"></div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-neutral-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-system-blue hover:bg-system-blue/90 text-white rounded-xl h-12">
                  <Users className="h-4 w-4 mr-3" />
                  Take Attendance
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-neutral-200 hover:bg-neutral-50 rounded-xl h-12 bg-transparent"
                >
                  <MessageSquare className="h-4 w-4 mr-3" />
                  New Announcement
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-neutral-200 hover:bg-neutral-50 rounded-xl h-12 bg-transparent"
                >
                  <Calendar className="h-4 w-4 mr-3" />
                  Schedule Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Today's Schedule */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-neutral-900">Today's Schedule</CardTitle>
          <CardDescription className="text-neutral-500">Your daily agenda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-system-blue/10 to-system-blue/5 rounded-2xl border border-system-blue/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-system-blue">Morning Session</h4>
                <Badge variant="outline" className="bg-system-blue/10 text-system-blue border-system-blue/20">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-neutral-600 mb-2">09:00 - 12:00</p>
              <p className="text-sm font-medium text-neutral-900">Web Development Fundamentals</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-system-green/10 to-system-green/5 rounded-2xl border border-system-green/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-system-green">Lunch Break</h4>
                <Badge variant="outline" className="bg-system-green/10 text-system-green border-system-green/20">
                  Next
                </Badge>
              </div>
              <p className="text-sm text-neutral-600 mb-2">12:00 - 13:00</p>
              <p className="text-sm font-medium text-neutral-900">Free Time</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-system-purple/10 to-system-purple/5 rounded-2xl border border-system-purple/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-system-purple">Afternoon Session</h4>
                <Badge variant="outline" className="bg-system-purple/10 text-system-purple border-system-purple/20">
                  Upcoming
                </Badge>
              </div>
              <p className="text-sm text-neutral-600 mb-2">13:00 - 17:00</p>
              <p className="text-sm font-medium text-neutral-900">Project Workshop</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
