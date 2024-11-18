import PdfIcon from "../images/pdf.png";
import Image from "next/image";

export default function ChatBubbleUser({prompt, file}) {
    if(file){
        if(file?.type.includes("image")){
            file = URL.createObjectURL(file)
        }
    }

    return (
        <>
            <div className="flex items-start gap-2.5 justify-end">
                <div className="flex flex-col w-full max-w-lg leading-1.5 p-4 border-gray-200 bg-slate-700 rounded-s-xl rounded-ee-xl dark:bg-gray-700">
                    <p className="text-sm font-normal py-2.5 text-white">
                        {prompt}
                    </p>
                    {
                        file
                        ?
                        <>
                            {
                                file?.type === "application/pdf"
                                ?
                                <div className={`${file ? '' : 'hidden'} flex items-center my-2.5 bg-slate-800 dark:bg-gray-600 rounded-lg px-2 py-4`}>
                                    <div className="me-2">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={PdfIcon}
                                                alt="document icon"
                                                className="w-5"
                                            />
                                            <p className='line-clamp-1 text-white text-sm font-medium'>
                                                {file?.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="max-w-md mx-auto">
                                    <Image
                                        src={file}
                                        alt="image"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            }
                        </>
                        :
                        null
                    }
                </div>
            </div>
        </>
    )
}
