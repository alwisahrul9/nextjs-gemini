'use client'

import { createContext, useState } from "react";
import { geminiHandle } from "../action";
import ChatSection from "./ChatSection";
import { formatResponse } from "../lib/gemini/helper";
import ChatBox from "./ChatBox";

export const Context = createContext()

export default function ChatContainer() {
    const [file, setFile] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [prompt, setPrompt] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function submitHandle(e) {
        e.preventDefault()

        if (!e.target.prompt.value) {
            return
        }

        setChatHistory(prev => [...prev, {
            file: file ? file : '',
            chat: e.target.prompt.value,
            role: "user"
        }])

        setIsLoading(true)

        const formData = new FormData()
        formData.append('file', file ? file : '')
        formData.append('prompt', e.target.prompt.value)

        runGemini(formData)

        setPrompt('')
        setFile('')
        setImagePreview('')
    }

    async function runGemini(formData) {
        try {
            const response = await geminiHandle(formData)
            if(response.ok) {
                setIsLoading(false)

                setChatHistory(prev => [...prev, {
                    file: response.file ? response.file : '',
                    chat: formatResponse(response.data),
                    role: "gemini"
                }])
            }

            if(!response.ok) {
                setIsLoading(false)
                setChatHistory(prev => [...prev, {
                    file: '',
                    chat: response.data,
                    role: "gemini"
                }])
            }
        } catch(error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Context.Provider value={{
                chatHistory, setChatHistory,
                isLoading, setIsLoading,
                imagePreview, setImagePreview,
                file, setFile,
                prompt, setPrompt,
                submitHandle,
                runGemini
            }}>
                <ChatSection />
                <ChatBox />
            </Context.Provider>
        </>
    )
}
