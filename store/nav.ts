import create from "zustand";

import { devtools, persist } from "zustand/middleware";

export type Nav = {
    navState: boolean,
    setnavState: (open: boolean) => void,


}

const navStore = (set: any): Nav => ({
    navState: false,
    setnavState: ((open) => {
        set(() => ({
            navState: open
        }))
    }),



});



const useNavStore = create(devtools(navStore));

export default useNavStore;