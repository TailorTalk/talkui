import React from 'react';
import logo from "../assets/logo.svg";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className='h-screen w-screen flex justify-center items-center p-4 '>
      <div className='flex items-center justify-start gap-24 max-lg:gap-16 max-sm:flex-col max-sm:gap-2'>
      <div className='flex-none'>
        <img src={logo} alt='logo' className='w-60 max-xl:w-48 max-sm:w-40 ' />
      </div>
      <div>
        <h1 className='text-[12rem] leading-none text-tailorBlue-500 max-xl:text-[8rem] max-sm:text-[6rem]  max-sm:text-center'>404</h1>
        <p className='text-4xl max-xl:text-3xl max-sm:text-center max-sm:text-2xl'>UH OH! You're lost.</p>
        <p className='text-lg mt-4 text-tailorFontDark max-sm:text-center max-sm:text-base'>The page you are looking for does not exist. How you got here is a mystery. <br /> But you can click the button below to go back to the homepage.</p>
       <div className='flex justify-start max-sm:justify-center'>
       <Button variant='outlined' sx={{marginTop:'16px',borderRadius:'20px',fontSize:'16px',padding:'4px 32px',letterSpacing:'1.2px'}} onClick={()=>{navigate("/home")}} >Home</Button>
       </div>
      </div>
      </div>
    </section>
  )
}

export default NotFoundErrorPage