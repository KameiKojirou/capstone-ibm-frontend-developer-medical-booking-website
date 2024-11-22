import { PropsWithChildren } from "react"
import { Title } from "./Title"

export const HealthTip = (props: PropsWithChildren<{title: string}>) => {
    return (
        <div className="card w-full bg-base-200 p-4 my-2">
            <Title>{props.title}</Title>
            <p>{props.children}</p>
        </div>
    )
}