import create from "zustand";

import { devtools } from "zustand/middleware";

export type Dialog = {
    isAddUserOpen: boolean,
    setAddUserOpen: (open: boolean) => void,


}

const dialogStore = (set: any): Dialog => ({
    isAddUserOpen: false,
    setAddUserOpen: ((open) => {
        set(() => ({
            isAddUserOpen: open
        }))
    }),



});



const useDialogStore = create(devtools(dialogStore));

export default useDialogStore;