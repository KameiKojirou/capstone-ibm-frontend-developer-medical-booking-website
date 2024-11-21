import { $toastStore } from '../stores/toastStore';
import { useStore } from "@nanostores/react"

export const Toasts = () => {
    return (
        <div className="toast toast-end">
            {useStore($toastStore).map(toast => (
                <div key={toast.id} className="alert alert-success shadow-lg">
                    <div>
                        <span>{toast.message}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}