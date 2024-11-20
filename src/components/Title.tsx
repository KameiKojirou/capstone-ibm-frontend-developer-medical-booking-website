import { PropsWithChildren } from "react"

export const Title = (props: PropsWithChildren) => {
    return (
        <h1 className="text-3xl font-bold py-8">
            {props.children}
        </h1>
    )
}