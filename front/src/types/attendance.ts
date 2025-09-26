// 출석 상태 타입
export type AttendanceStatus = "present" | "absent" | "late"

// 학생 타입
export interface Student {
  seat: string          // 자리 번호
  name: string          // 학생 이름
  status: AttendanceStatus // 출석 상태
  time: string          // 체크인 시간, 체크 안 했으면 "-"
}

// (선택) 나중에 AttendanceCheck Props도 여기서 정의 가능
export interface AttendanceCheckProps {
  currentUser: any
}