"use client";

import { Dropdown } from "flowbite-react";
import { useContext } from "react";
import { FaFileImage } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";
import { Context } from "./ChatContainer";

export default function FileSelection() {
    const { setFile, setImagePreview } = useContext(Context)

    return (
        <>
            <Dropdown label="" placement="top"
            renderTrigger=
            {
                () =>
                <svg className="w-10 text-yellow-200 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 .087.586l2.977-7.937A1 1 0 0 1 6 10h12V9a2 2 0 0 0-2-2h-4.532l-1.9-2.28A2 2 0 0 0 8.032 4H4Zm2.693 8H6.5l-3 8H18l3-8H6.693Z" clipRule="evenodd"/>
                </svg>
            }>
                <Dropdown.Item onClick={() => document.getElementById("file").click()}>
                    <div className="flex items-center gap-2 sm:text-lg sm:py-1.5 py-1">
                        <IoDocumentAttach className="sm:text-2xl" />
                        Document
                    </div>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => document.getElementById("image").click()}>
                    <div className="flex items-center gap-2 sm:text-lg sm:py-1.5 py-1">
                        <FaFileImage className="sm:text-2xl" />
                        Image
                    </div>
                </Dropdown.Item>
            </Dropdown>
            <input type="file"
                id="file"
                accept="application/pdf"
                onChange={(e) => {
                    setFile(e.target.files[0])
                    setImagePreview('')
                }}
                hidden
                name="file"
            />
            <input type="file"
                id="image"
                accept="image/*"
                onChange={(e) => {
                    setFile(e.target.files[0])
                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                }}
                hidden
                name="image"
            />
        </>
    )
}
