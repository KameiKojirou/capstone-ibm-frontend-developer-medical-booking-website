import { PropsWithChildren } from "react"

export const SubTitle = (props: PropsWithChildren) => {
    return (
        <h2 className="text-2xl font-bold py-4">
            {props.children}
        </h2>
    )
}