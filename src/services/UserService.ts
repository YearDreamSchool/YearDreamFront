import api from "./axiosInstance"; // 인터셉터가 설정된 axios 인스턴스

export interface UserResponse {
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}

export interface UpdateUserRequest {
  name?: string;
  role?: string;
  email?: string;
  profileImg?: string;
  phone?: string;
}

/**
 * 현재 로그인 사용자 정보 요청
 */
export async function getCurrentUser(): Promise<UserResponse | null> {
  try {
    const res = await api.get<UserResponse>(`/api/users/logined`);
    return res.data;
  } catch (error: any) {
    console.error("getCurrentUser 에러:", error.response?.status, error.response?.data);
    return null;
  }
}

/**
 * 사용자 정보 조회
 */
export const getUserInfo = async (username: string): Promise<UserResponse | null> => {
  try {
    const res = await api.get(`/api/users/${encodeURIComponent(username)}`);
    return res.data;
  } catch (error: any) {
    console.error("사용자 정보 조회 실패:", error.response || error.message);
    return null;
  }
};

/**
 * 사용자 정보 수정
 */
export async function updateUser(
  username: string,
  updateData: UpdateUserRequest
): Promise<UserResponse | null> {
  try {
    const res = await api.patch(`/api/users/${username}`, updateData, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    console.error("사용자 정보 수정 실패:", error);
    return null;
  }
};

/**
 * 사용자 로그아웃
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post(`/api/users/logout`);
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};
