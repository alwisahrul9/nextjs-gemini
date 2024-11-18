import { MdCamera } from "react-icons/md";
import { useContext, useRef, useState } from "react";
import takePhotoSound from "../assets/take-photo-sound.wav"
import { Context } from "./ChatContainer";

export default function CameraControl() {
    const { setChatHistory, setIsLoading, setFile, file, runGemini } = useContext(Context)

    const [openCameraModal, setOpenCameraModal] = useState(false);
    const [breakPoint, setBreakPoint] = useState(typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)") : null) // lg: 1024
    const [takePhoto, setTakePhoto] = useState(false)

    const video = useRef(null)
    const canvas = useRef(null)
    const prompt = useRef(null);
    const streamRef = useRef(null);

    async function cameraHandle() {
        setOpenCameraModal(true)

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: {
                        min: 640,
                        ideal: 1280,
                        max: 1920
                    },
                    height: {
                        min: 480,
                        ideal: 720,
                        max: 1080
                    },
                    facingMode: {
                        // exact: "user",
                        exact: breakPoint.matches ? "user" : "environment",
                    }
                },
                audio: false
            })
            video.current.srcObject = stream
            streamRef.current = stream // Simpan stream agar bisa dihentikan nanti
        } catch (error) {
            console.log(error)
        }
    }

    function closeCamera() {
        setOpenCameraModal(false)
        setTakePhoto(false)

        if (streamRef.current) {
            // Hentikan semua track video di stream
            streamRef.current.getTracks().forEach((track) => track.stop())
        }
    }

    function takePicture() {
        // Bunyikan efek jepretan
        const audio = new Audio(takePhotoSound);
        audio.play();

        const context = canvas.current.getContext('2d')
        // Gambar hasil jepretan
        context.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height)
        setTakePhoto(true)

        canvas.current.toBlob(async (blob) => {
            const image = new File([blob], `photo-${Date.now()}.png`, { type: 'image/png' })

            // Simpan file di state file
            setFile(image);
        }, 'image/png');
    }

    async function handleCameraInput() {
        if (!prompt.current.value) {
            return
        }

        setChatHistory(prev => [...prev, {
            file: file ? file : '',
            chat: prompt.current.value,
            role: "user"
        }])

        // Kosongkan file
        setFile('')

        // Nyalakan Loading
        setIsLoading(true)

        const formData = new FormData()
        formData.append('file', file ? file : '')
        formData.append('prompt', prompt.current.value)

        runGemini(formData)

        setOpenCameraModal(false)
        setTakePhoto(false)

        if (streamRef.current) {
            // Hentikan semua track video di stream
            streamRef.current.getTracks().forEach((track) => track.stop())
        }
    }
    return (
        <>
            <button type="button" onClick={() => cameraHandle()}>
                <svg className="cursor-pointer sm:w-9 w-7 text-slate-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd"/>
                </svg>
            </button>
            <div className={`fixed ${openCameraModal ? 'block' : 'hidden'} top-0 left-0 w-full h-full z-50 bg-slate-800 bg-opacity-95`}>
                <div className="h-full flex justify-center items-center flex-col w-full">
                    <video width={640} height={480} hidden={takePhoto} className="w-full mx-auto" ref={video} autoPlay={true}></video>
                    <canvas ref={canvas} hidden={!takePhoto} width={breakPoint.matches ? 1920 : 1080} height={breakPoint.matches ? 1080 : 1920} className="w-full mx-auto"></canvas>
                </div>
                <div className={`absolute flex ${takePhoto ? 'justify-between' : 'justify-end'} w-full z-50 top-0 left-0 px-4 pt-5`}>
                    <button type="button" hidden={!takePhoto} className="bg-slate-100 border-2 border-slate-400 rounded-full p-1" onClick={() => setTakePhoto(false)}>
                        <svg className="w-8 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </button>
                    <button type="button" className="bg-slate-100 border-2 border-slate-400 rounded-full p-1" onClick={() => closeCamera()}>
                        <svg className="w-8 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5.027 10.9a8.729 8.729 0 0 1 6.422-3.62v-1.2A2.061 2.061 0 0 1 12.61 4.2a1.986 1.986 0 0 1 2.104.23l5.491 4.308a2.11 2.11 0 0 1 .588 2.566 2.109 2.109 0 0 1-.588.734l-5.489 4.308a1.983 1.983 0 0 1-2.104.228 2.065 2.065 0 0 1-1.16-1.876v-.942c-5.33 1.284-6.212 5.251-6.25 5.441a1 1 0 0 1-.923.806h-.06a1.003 1.003 0 0 1-.955-.7A10.221 10.221 0 0 1 5.027 10.9Z"/>
                        </svg>
                    </button>
                </div>
                {
                    takePhoto
                    ?
                    <>
                        <div className="absolute z-50 bottom-3 left-0 right-0 lg:px-3 px-2">
                            <div className="flex mx-auto max-w-3xl lg:py-4 lg:px-5 p-2 items-center lg:gap-5 gap-1 bg-slate-800 rounded-lg" autoComplete="off">
                                <input type="text" ref={prompt} className="py-2.5 lg:text-base text-xs bg-slate-500 text-white placeholder:text-white lg:px-3 px-2 m-0 w-full focus:outline-none focus:ring-0 border-none rounded" placeholder="Type a prompt...." />
                                <button type="button" onClick={() => handleCameraInput()} className="bg-blue-800 rounded-full p-1">
                                    <svg className="sm:w-10 w-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <div className="flex absolute z-50 bottom-5 left-0 justify-center w-full">
                        <button type="button" className="bg-slate-100 border rounded-full" onClick={() => takePicture()}>
                            <MdCamera className="text-6xl sm:text-7xl xl:text-8xl text-slate-600" />
                        </button>
                    </div>
                }
            </div>
        </>
    )
}
