import { Avatar, AvatarImage, AvatarFallback } from "components/ui/avatar"
import { Badge } from "components/ui/badge"

interface UserProfileProps {
  name?: string
  role?: "admin" | "coach" | "student"
  department?: string
  seat?: string
}

export default function UserProfile({ name, role = "student", department, seat }: UserProfileProps) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-neutral-100/50 rounded-3xl mb-8">
      {/* Avatar */}
      <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback className="bg-system-blue text-white font-semibold">
          {name?.[0] || "U"}
        </AvatarFallback>
      </Avatar>

      {/* User Info */}
      <div className="flex-1">
        <p className="font-semibold text-neutral-900">{name || "사용자"}</p>
        <div className="flex items-center space-x-2 mt-1">
          <Badge
            variant="outline"
            className={`text-xs font-medium border-0 ${
              role === "admin"
                ? "bg-system-purple/10 text-system-purple"
                : role === "coach"
                ? "bg-system-blue/10 text-system-blue"
                : "bg-system-green/10 text-system-green"
            }`}
          >
            {role === "admin" ? "Admin" : role === "coach" ? "Coach" : "Student"}
          </Badge>
          {(department || seat) && (
            <p className="text-xs text-neutral-500">{department || seat}</p>
          )}
        </div>
      </div>
    </div>
  )
}
