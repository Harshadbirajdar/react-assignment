import AxiosInstances from "../helper/AxiosInstance"
import { User } from "../types"

export const getAllUserApi = () => {
    return AxiosInstances.get('/users')
}

export const addNewUserApi = (user: User) => {
    return AxiosInstances.post("/user/create", user)
}

export const deleteUserApi = (id: string) => {
    return AxiosInstances.delete(`/user/${id}`)
}

export const getUserByIdApi = (id: string) => {
    return AxiosInstances.get(`/user/${id}`)
}

export const updateUserByIdApi = (id: string, user: User) => {
    return AxiosInstances.patch(`/user/${id}`, user)
}