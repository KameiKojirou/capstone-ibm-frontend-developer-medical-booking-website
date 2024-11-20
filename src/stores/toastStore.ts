import { atom } from "nanostores";
import { v4 as uuid } from 'uuid'

export const toasts : { id: string,  message: string, type: string }[] = []


export const toastStore = atom(toasts)

export const addToast = (message: string, type: string) => {
    toastStore.set([...toastStore.get(), {id: uuid(), message, type}])
}

export const removeToast = (id: string) => {
    toastStore.set(toastStore.get().filter(toast => toast.id !== id))
}

export const clearToasts = () => {
    toastStore.set([])
}



export default toastStore