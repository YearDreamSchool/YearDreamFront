"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Send, X, Minimize2, Maximize2, User, Sparkles } from "lucide-react"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "어떤점이 궁금하신가요?✨",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const faqQuestions = [
    "수료 기준이 어떻게 되나요?",
    "커리큘럼이 어떻게 되나요?",
    "출석 기준에 대해서 궁금해요.",
    "오프라인 시설에 대해 궁금해요.",
  ]

  const botResponses = {
    "class hours": "Classes run Monday to Friday, 9 AM to 5 PM. Lunch break is from 12 PM to 1 PM.",
    attendance: "Attendance is tracked by coaches using seat-based check-ins. Please notify us if you'll be late.",
    assignment: "Submit assignments through GitHub. Check the Learning section for detailed instructions.",
    career:
      "We offer comprehensive career support including portfolio development, resume writing, and interview prep.",
    default: "I'm not sure about that. Please contact our admin team or post in the community board for help.",
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])

    // Bot response
    setTimeout(() => {
      let botResponse = botResponses.default

      Object.keys(botResponses).forEach((key) => {
        if (key !== "default" && inputMessage.toLowerCase().includes(key)) {
          botResponse = botResponses[key as keyof typeof botResponses]
        }
      })

      const botMessage = {
        id: messages.length + 2,
        type: "bot" as const,
        content: botResponse,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputMessage("")
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl z-50 bg-neutral-900 hover:bg-neutral-800 border-2 border-white/10 backdrop-blur-sm"
        size="icon"
      >
        <Sparkles className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-out ${isMinimized ? "w-80 h-16" : "w-80 h-[500px]"}`}
    >
      <Card className="h-full flex flex-col shadow-2xl bg-white/80 backdrop-blur-xl border-0 rounded-3xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-neutral-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold">이어드림 AI</CardTitle>
              <CardDescription className="text-xs text-neutral-300">궁금한 점을 물어보세요</CardDescription>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-3 max-w-[85%] ${
                      message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === "user" ? "bg-system-blue" : "bg-neutral-100"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-neutral-600" />
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-2xl ${
                        message.type === "user" ? "bg-system-blue text-white" : "bg-neutral-100 text-neutral-900"
                      }`}
                    >
                      <p className="text-sm font-medium">{message.content}</p>
                      <p className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-neutral-500"}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-neutral-500 text-center font-medium">빠른 질문</p>
                  <div className="grid grid-cols-1 gap-2">
                    {faqQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-10 justify-start bg-neutral-50/50 border-neutral-200 hover:bg-neutral-100 rounded-xl font-medium"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            <div className="p-6 border-t border-neutral-200/50">
              <div className="flex space-x-3">
                <Input
                  placeholder="Ask me anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-neutral-100/50 border-0 rounded-2xl h-12 font-medium placeholder:text-neutral-400"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="bg-system-blue hover:bg-system-blue/90 rounded-2xl h-12 w-12"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
