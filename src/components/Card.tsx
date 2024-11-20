import { PropsWithChildren } from "react"

export const Card = (props: PropsWithChildren) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl p-4">
            {props.children}
        </div>
    )
}