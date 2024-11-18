'use client'

import ChatBubbleUser from "./ChatBubbleUser"
import ChatBubbleGemini from "./ChatBubbleGemini"
import ChatSkeleton from "./ChatSkeleton"
import { useContext, useEffect } from "react"
import { Context } from "./ChatContainer"

export default function ChatSection() {
    const { chatHistory, isLoading} = useContext(Context)

    useEffect(() => {
        const element = document.getElementById("chat-section");
        element.scrollTop = element.scrollHeight;

        // window.addEventListener("beforeunload", (event) => {
        //     event.preventDefault();
        //     const mapping = chatHistory.map((item) => {
        //         return URL.createObjectURL(item.file)
        //     })
        //     localStorage.setItem("chatHistory", JSON.stringify(mapping));
        //     event.returnValue = true;
        // });
    }, [chatHistory])

    return (
        <section className="px-4 pt-4 pb-8 h-[calc(100vh-150px)] overflow-y-scroll no-scrollbar" id="chat-section">
            <div className="max-w-5xl mx-auto space-y-5">
                {
                    chatHistory.length > 0
                    ?
                    chatHistory.map((item, index) => (
                        item.role === "user"
                        ?
                            <ChatBubbleUser key={index} prompt={item.chat} file={item.file} />
                        :
                            <ChatBubbleGemini key={index} chat={item.chat} />
                    ))
                    :
                    <>
                        <p className="text-center text-white text-2xl font-semibold">Start a conversation</p>
                    </>
                }
                {
                    isLoading
                    ?
                    <ChatSkeleton />
                    :
                    null
                }
            </div>
        </section>
    )
}
