import { atom } from "nanostores";


export const $userStore = atom({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: ""
})

export const $tokenStore = atom("")