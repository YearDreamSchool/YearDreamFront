import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

export interface LogoutUser {
  token?: string;
}

/**
 * 현재 로그인 사용자 정보 요청
 */
export async function getCurrentUser(token: string): Promise<UserResponse | null> {
  try {
    console.log("getCurrentUser 요청:", `${API_BASE_URL}/api/users/logined`);
    const res = await axios.get<UserResponse>(`${API_BASE_URL}/api/users/logined`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    console.log("getCurrentUser 응답:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("getCurrentUser 에러:", error.response?.status, error.response?.data, error.message);
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}

/**
 * Refresh API 호출해서 새 accessToken 받기
 */
export async function refreshAccessToken(): Promise<string | null> {
  try {
    console.log("refreshAccessToken 요청:", `${API_BASE_URL}/api/token/refresh`);
    const res = await axios.post<{ accessToken: string }>(
      `${API_BASE_URL}/api/token/refresh`,
      {},
      { withCredentials: true }
    );
    console.log("refreshAccessToken 응답:", res.data);
    return res.data.accessToken;
  } catch (error: any) {
    console.error("refreshAccessToken 에러:", error.response?.status, error.response?.data, error.message);
    return null;
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

    const response = await axios.get(`${API_BASE_URL}/api/users/${encodeURIComponent(username)}`, {
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
      `${API_BASE_URL}/api/users/${username}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("사용자 정보 수정 실패:", error);
    return null;
  }
}

/**
 * 사용자 로그아웃 하기
 */
export const logoutUser = async (accessToken: string) => {
  return axios.post(
    `${API_BASE_URL}/api/users/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
