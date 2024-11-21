import { Title } from "../components/Title"
import { addToast } from "../stores/toastStore"



export const ToastTest = () => {

    const callToast = () => {
        addToast("Hello World", "success", 5000)
    }
    return (
        <div>
            <Title>Toast Test</Title>
            <button onClick={callToast}>Add Toast</button>
        </div>
    )
}