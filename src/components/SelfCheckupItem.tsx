import { useState } from "react";

type SelfCheckupItemProps = {
    title: string;
    summary: string;
    details: string;
    position: "start" | "end"; // Determines chat bubble alignment
};

export const SelfCheckupItem = ({ title, summary, details, position }: SelfCheckupItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`chat ${position === "start" ? "chat-start" : "chat-end"} w-full text-lg`}
            style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
        >
            <div className="chat-bubble chat-bubble-primary w-3/4">
                <div>
                    <h3 className="text-2xl font-bold mb-2">{title}</h3>
                    <p>{summary}</p>
                    {isExpanded && (
                        <div className="mt-4">
                            <p>{details}</p>
                        </div>
                    )}
                    <div className="mt-2">
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? "Show Less" : "Read More"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
