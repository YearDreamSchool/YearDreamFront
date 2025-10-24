import axios from "axios"

export interface UserResponse {
  name: string
  username: string
  email: string
  phone: string
  role: string
}

export interface UpdateUserRequest {
  name?: string
  role?: string
  email?: string
  profileImg?: string
  phone?: string
}

export interface LogoutUser {
  token?: string
}

/**
 * 현재 로그인 사용자 정보 요청
 */
export async function getCurrentUser(token: string): Promise<UserResponse | null> {
  try {
    const res = await axios.get<UserResponse>(`http://localhost:8080/api/users/logined`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
    return res.data
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null
    }
    throw error
  }
}

/**
 * Refresh API 호출해서 새 accessToken 받기
 */
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await axios.get<{ accessToken: string }>(`http://localhost:8080/api/token/refresh`, {
      withCredentials: true,
    })
    return res.data.accessToken
  } catch (error: any) {
    return null
  }
}

/**
 * 사용자 정보 조회하기
 */
export const getUserInfo = async (username: string, token?: string) => {
  try {
    const headers: any = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.get(`http://localhost:8080/api/users/${encodeURIComponent(username)}`, {
      headers,
    });

    return response.data;
  } catch (error: any) {
    console.error("사용자 정보 조회 실패:", error.response || error.message);
    return null;
  }
};

/**
 * 사용자 정보 수정하기
 */
export async function updateUser(
  username: string,
  updateData: UpdateUserRequest,
  token: string
): Promise<UserResponse | null> {
  try {
    const res = await axios.patch<UserResponse>(
      `http://localhost:8080/api/users/${username}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    return res.data
  } catch (error) {
    console.error("사용자 정보 수정 실패:", error)
    return null
  }
}

  /**
   * 사용자 로그아웃 하기
   */
export const logoutUser = async (accessToken: string) => {
  return axios.post(
    "http://localhost:8080/api/users/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );
};