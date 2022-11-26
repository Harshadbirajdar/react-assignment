import create from "zustand";

import { devtools } from "zustand/middleware";
import { User } from "../types";

export type UserStore = {
    users: User[],
    setAllUser: (user: User[]) => void,
}

const userStore = (set: any): UserStore => ({
    setAllUser: ((data: User[]) => {
        set(() => ({
            users: data
        }))
    }),
    users: [],

});



const useUserStore = create(devtools(userStore));

export default useUserStore;