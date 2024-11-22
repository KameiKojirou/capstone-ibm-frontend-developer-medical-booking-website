import { PropsWithChildren } from "react"


export const BlogCard = (props: PropsWithChildren<{title: string, date: string}>) => {
    return (
        <div className="card shadow-md bg-base-200 my-4">
            <div className="flex flex-col card-body">

                <h2 className="text-xl font-bold">{props.title}</h2>
                <span className="text-sm"> by Doctor Who on {props.date}</span>
                <div className="flex flex-col flex-wrap gap-2">
                    {props.children}
                </div>
            </div>
        </div>
    )
}