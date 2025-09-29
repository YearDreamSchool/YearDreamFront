// 출석 상태 타입
export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE"

// 학생 타입
export interface Student {
  seat: number,
  name: string
  status: AttendanceStatus
  updatedAt?: string 
}

export interface AttendanceCheckProps {
  currentUser: any
}


