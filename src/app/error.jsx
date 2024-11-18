'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import RobotError from './images/robot.png'
import Image from 'next/image'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='space-y-5 mt-28 px-5'>
            <Image src={RobotError} alt="Robot Error" width={250} height={250} className='block mx-auto' />
            <h2 className='sm:text-2xl text-xl text-white text-center'>Something went wrong!</h2>
            <div className="flex justify-center">
                <button
                    onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                    }
                    className='flex justify-center items-center gap-1 sm:text-lg text-sm text-white bg-blue-500 px-5 py-2 rounded'
                >
                    <p>Try again</p>
                    <svg className="sm:w-6 w-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
                    </svg>
                </button>
            </div>
        </div>
  )
}
