import axios from "axios"

/**
 * 학생 전체 조화
 */
export async function getAllStudents(token: string) {
    try {
        const res = await axios.get(`http://localhost:8080/api/students`, {
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