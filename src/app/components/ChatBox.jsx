import { useContext } from "react"
import { Context } from "./ChatContainer"
import PdfIcon from "../images/pdf.png";
import Image from "next/image";
import FileSelection from "./FileSelection";
import VoiceControl from "./VoiceControl";
import CameraControl from "./CameraControl";

export default function ChatBox() {
    const { prompt, setPrompt, imagePreview, setImagePreview, file, setFile, submitHandle } = useContext(Context)

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 max-w-5xl mx-auto sm:px-4 px-3 sm:pt-4 sm:pb-1 sm:space-y-2 space-y-1 pt-3 pb-1 bg-slate-800 sm:rounded-t-2xl rounded-t-lg">
            <div className={`${file ? '' : 'hidden'} mb-5 bg-slate-700 ${imagePreview ? 'w-max relative' : 'sm:w-1/2 w-full'} p-3 rounded flex justify-between items-center shadow`}>
                {
                    imagePreview
                    ?
                    <>
                        <div className="max-w-sm">
                            <Image src={imagePreview} width={200} height={200} alt="document icon" className="aspect-square" />
                        </div>
                        <button onClick={() => {
                            setFile('')
                            setImagePreview('')
                        }} className="absolute top-2 right-2 bg-white rounded-full">
                            <svg className="w-8 text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </>
                    :
                    <>
                        <div className="flex items-center gap-2">
                            <Image src={PdfIcon} alt="document icon" className="w-7" />
                        <p className="line-clamp-1 text-white text-sm">{file?.name}</p>
                        </div>
                        <button onClick={() => {
                            setFile('')
                            setImagePreview('')
                        }}>
                            <svg className="w-6 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                        </button>
                    </>
                }
            </div>

            <form onSubmit={submitHandle} className="flex items-center gap-3" autoComplete="off">
                <div className="w-full flex items-center bg-slate-500 rounded-md p-1 gap-2.5">
                    <input type="text" id="prompt" name="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-slate-500 outline-none rounded-md border-none focus:ring-0 ps-2.5 py-2.5 pe-0 focus:outline-none placeholder-slate-300 text-slate-300 md:text-[1.1rem] text-sm" placeholder="Type a prompt...."/>
                    <VoiceControl />
                    <CameraControl />
                    <FileSelection />
                </div>
                <button type="submit" hidden={!prompt} className="bg-blue-800 rounded-full p-1">
                    <svg className="sm:w-10 w-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                    </svg>
                </button>
            </form>
            <p className="text-white sm:text-[0.9rem] text-xs text-end">Powered by Gemini AI</p>
        </div>
    )
}
