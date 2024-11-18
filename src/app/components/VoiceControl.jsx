"use client";

import { Modal } from "flowbite-react";
import { useContext, useRef, useState } from "react";
import { Context } from "./ChatContainer";

export default function VoiceControl() {
    const [openModal, setOpenModal] = useState(false);
    const [voice, setVoice] = useState("")

    const { setFile, setChatHistory, setIsLoading, file, runGemini } = useContext(Context)

    const voiceInput = useRef(null)

    if (typeof window !== "undefined") {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'id-ID';
    }

    recognition.onstart = () => {
        setVoice("")
    }

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if(transcript){
            setVoice(prev => prev + transcript)
        } else {
            recognition.stop()
            setOpenModal(false)
        }
    };

    recognition.onend = () => {
        let time = 2
        const timer = setInterval(() => {
            time--
            if(time === 0) {
                setOpenModal(false)
                clearInterval(timer)
            }
        }, 1000)
        if(voiceInput.current?.value){
            handleVoiceInput(voiceInput.current.value)
        }
    };

    function startVoice() {
        setOpenModal(true)
        recognition.start()
    }

    async function handleVoiceInput(value) {
        setChatHistory(prev => [...prev, {
            file: file ? file : '',
            chat: value,
            role: "user"
        }])

        // Kosongkan file
        setFile('')

        // Nyalakan Loading
        setIsLoading(true)

        const formData = new FormData()
        formData.append('file', file ? file : '')
        formData.append('prompt', value)

        runGemini(formData)
    }

    return (
        <>
            <button type="button" onClick={() => startVoice()}>
                <svg className="cursor-pointer sm:w-9 w-7 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z" clipRule="evenodd"/>
                    <path d="M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z"/>
                </svg>
            </button>
            <Modal show={openModal} onClose={() => {
                recognition.abort()
                setOpenModal(false)
            }}>
                <Modal.Header className="bg-slate-800"/>
                <Modal.Body className="bg-slate-800">
                    <div className="flex justify-center space-x-1 items-center">
                        <div className="w-1 h-8 bg-blue-500 rounded-full animate-sound-wave"></div>
                        <div className="w-1 h-11 bg-blue-500 rounded-full animate-sound-wave animation-delay-200"></div>
                        <div className="w-1 h-9 bg-blue-500 rounded-full animate-sound-wave animation-delay-400"></div>
                        <div className="w-1 h-14 bg-blue-500 rounded-full animate-sound-wave animation-delay-600"></div>
                        <div className="w-1 h-10 bg-blue-500 rounded-full animate-sound-wave animation-delay-800"></div>
                        <div className="w-1 h-8 bg-blue-500 rounded-full animate-sound-wave"></div>
                        <div className="w-1 h-11 bg-blue-500 rounded-full animate-sound-wave animation-delay-200"></div>
                        <div className="w-1 h-9 bg-blue-500 rounded-full animate-sound-wave animation-delay-400"></div>
                        <div className="w-1 h-14 bg-blue-500 rounded-full animate-sound-wave animation-delay-600"></div>
                        <div className="w-1 h-10 bg-blue-500 rounded-full animate-sound-wave animation-delay-800"></div>
                    </div>
                    <div className="h-56 overflow-y-scroll no-scrollbar py-5">
                        <p className={`text-lg text-white font-semibold tracking-wide ${voice ? '' : 'text-center'}`}>
                            {
                                voice
                                ?
                                voice
                                :
                                "Say something...."
                            }
                        </p>
                        <p className="text-lg text-white font-semibold tracking-wide"></p>
                        <input type="text" ref={voiceInput} hidden value={voice} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
