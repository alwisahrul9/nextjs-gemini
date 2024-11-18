import { useRef } from "react"
import { FaRegCopy } from "react-icons/fa6";

export default function ChatBubbleGemini({chat}) {
    const ref = useRef()

    const copyClipboard = () => {
        const plainText = ref.current.innerText || ref.current.textContent;
        navigator.clipboard.writeText(plainText);
        alert("Text copied to clipboard");
    }

    return (
        <>
            <div className="flex items-start gap-2.5 justify-start" >
                <div className="flex flex-col w-full max-w-lg leading-1.5 p-4 border-gray-200 bg-blue-950 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-sm font-normal py-2.5 text-white dark:text-white" dangerouslySetInnerHTML={{ __html: chat }} ref={ref}></p>
                    <div className="flex justify-end items-center">
                        <button onClick={() => copyClipboard()}>
                            <FaRegCopy className="text-white text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
