import { PropsWithChildren } from "react"


export const AppointmentNotificationsContainer = (props: PropsWithChildren) => { 
    return (
        <div className="toast toast-end">
           {props.children}
        </div>
    )
}