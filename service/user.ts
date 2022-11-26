import AxiosInstances from "../helper/AxiosInstance"
import { User } from "../types"

export const getAllUserApi = () => {
    return AxiosInstances.get('/users')
}

export const addNewUserApi = (user: User) => {
    return AxiosInstances.post("/user/create", user)
}