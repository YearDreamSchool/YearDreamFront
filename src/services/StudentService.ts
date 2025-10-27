import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

/**
 * 학생 전체 조회
 */
export async function getAllStudents(token: string) {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/students`, {
            headers: {Authorization : `Bearer ${token}`}
        })
        return res.data
    } catch (error: any) {
        if (error.response?.status === 401) {
            return null
        }
        throw error
    }
}