import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className='max-w-screen-2xl mx-auto bg-[#0d0f11]'>
                <div className='md:flex items-center justify-between px-14 py-5'>
            <div className='text-white text-center'>
                <h4 className='font-semibold py-2 text-[20px]'>Company</h4>
                <p className='text-[16px]'>About us</p>
                <p className='text-[16px]'>Careers</p>
            </div>
            <div className='text-white text-center'>
                <h4 className='font-semibold py-2 text-[20px]'>View Website in</h4>
                <p className='text-[16px]'>English</p>
            </div>
            <div className='text-white text-center'>
                <h4 className='font-semibold py-2 text-[20px]'>Available on</h4>
                <div className='md:flex justify-center items-center md:gap-x-2'> 
                <img className='w-[100px] mx-auto pb-4' src="https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076538/google-playstore_iqdnvg.webp" alt="play store" />
                <img className='w-[100px] mx-auto' src="https://res.cloudinary.com/dxswkuhfi/image/upload/v1753076541/ios-appstore_jybawi.webp" alt="App Store" />
            </div>
            </div>
            </div>
            <div className='text-center py-5'>
                <p className='text-[14px] text-gray-700'>© 2025 Playflix . All Rights Reserved.</p>
            </div>
            </div>
        </footer>
    )
}

export default Footer
