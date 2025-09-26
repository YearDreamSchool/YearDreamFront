import { AttendanceStatus, Student } from "types/attendance"

export const students: Student[] = [
  // 1행
  { seat: "01", name: "황희수", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "02", name: "심규상", status: "present" as AttendanceStatus, time: "09:05" },
  { seat: "03", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "04", name: "송건호", status: "present" as AttendanceStatus, time: "08:55" },
  { seat: "05", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "06", name: "유연서", status: "present" as AttendanceStatus, time: "09:02" },

  // 2행
  { seat: "07", name: "백동재", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "08", name: "최희범", status: "present" as AttendanceStatus, time: "09:03" },
  { seat: "09", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "10", name: "최강규", status: "present" as AttendanceStatus, time: "09:07" },
  { seat: "11", name: "이은여울", status: "present" as AttendanceStatus, time: "09:10" },
  { seat: "12", name: "송찬영", status: "absent" as AttendanceStatus, time: "-" },

  // 3행
  { seat: "13", name: "이원재", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "14", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "15", name: "김종완", status: "present" as AttendanceStatus, time: "09:05" },
  { seat: "16", name: "김병유", status: "present" as AttendanceStatus, time: "09:03" },
  { seat: "17", name: "서원준", status: "late" as AttendanceStatus, time: "09:15" },
  { seat: "18", name: "김기재", status: "present" as AttendanceStatus, time: "09:02" },

  // 4행
  { seat: "19", name: "차규진", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "20", name: "양다은", status: "present" as AttendanceStatus, time: "09:04" },
  { seat: "21", name: "유현규", status: "late" as AttendanceStatus, time: "09:12" },
  { seat: "22", name: "김태형", status: "present" as AttendanceStatus, time: "09:01" },

  // 5행
  { seat: "23", name: "이재진", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "24", name: "박용수", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "25", name: "문현민", status: "present" as AttendanceStatus, time: "09:05" },
  { seat: "26", name: "김태윤", status: "late" as AttendanceStatus, time: "09:18" },

  // 6행
  { seat: "27", name: "곽효진", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "28", name: "윤지영", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "29", name: "김정은", status: "present" as AttendanceStatus, time: "09:02" },
  { seat: "30", name: "김예지", status: "present" as AttendanceStatus, time: "09:01" },

  // 7행
  { seat: "31", name: "김준희", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "32", name: "문석환", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "33", name: "조유승", status: "present" as AttendanceStatus, time: "09:03" },
  { seat: "34", name: "", status: "absent" as AttendanceStatus, time: "-" },

  // 8행
  { seat: "35", name: "조애림", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "36", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "37", name: "장재훈", status: "present" as AttendanceStatus, time: "09:05" },
  { seat: "38", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "39", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "40", name: "", status: "absent" as AttendanceStatus, time: "-" },

  // 9행
  { seat: "41", name: "이진혁", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "42", name: "박범수", status: "present" as AttendanceStatus, time: "09:04" },
  { seat: "43", name: "고은영", status: "late" as AttendanceStatus, time: "09:12" },
  { seat: "44", name: "김세진", status: "present" as AttendanceStatus, time: "09:01" },
  { seat: "45", name: "박주원", status: "present" as AttendanceStatus, time: "09:03" },
  { seat: "46", name: "", status: "absent" as AttendanceStatus, time: "-" },

  // 10행
  { seat: "47", name: "김효진", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "48", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "49", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "50", name: "최유희", status: "present" as AttendanceStatus, time: "09:02" },
  { seat: "51", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "52", name: "홍현경", status: "present" as AttendanceStatus, time: "09:01" },

  // 11행
  { seat: "53", name: "김경태", status: "present" as AttendanceStatus, time: "09:00" },
  { seat: "54", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "55", name: "", status: "absent" as AttendanceStatus, time: "-" },
  { seat: "56", name: "서동재", status: "present" as AttendanceStatus, time: "09:03" },
  { seat: "57", name: "이민규", status: "present" as AttendanceStatus, time: "09:02" },
  { seat: "58", name: "", status: "absent" as AttendanceStatus, time: "-" },
]
