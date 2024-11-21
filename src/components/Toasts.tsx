import { $toastStore } from "../stores/toastStore";
import { useStore } from "@nanostores/react";

export const Toasts = () => {
    const toasts = useStore($toastStore);

    return (
        <div className="toast toast-end">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`alert ${toast.type ? "alert-"+toast.type : "alert-info"} shadow-lg`}
                >
                    <div>
                        <span>{toast.message}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
