import { PropsWithChildren } from "react"

export const ToastContainer = (props: PropsWithChildren) => { 
    return (
        <div className="toast toast-end">
           {props.children}
        </div>
    )
}