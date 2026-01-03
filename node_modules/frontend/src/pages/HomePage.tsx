import sky from '../assets/splash-screen/sky.png'
import { TiltCard } from '../component/TiltCard'
import { UpDownAnimation } from '../component/UpAndDown'
import wendy from '../assets/splash-screen/wendy.png'
import cat1 from '../assets/splash-screen/1.png'
import cat2 from '../assets/splash-screen/2.png'
import cat3 from '../assets/splash-screen/3.png'
import cat4 from '../assets/cats/taNG_cat.png'
import grass from '../assets/splash-screen/grass.png'
import fence from '../assets/splash-screen/fence.png'
import logo from '../assets/logo.png'
import { SlideContent } from '../component/SlideContent'
import background from '../assets/backgrounds/blue-checkered.jpg';
import { ArrowDown, ArrowUp } from 'lucide-react'
import { AuthService } from '../network/axios/services/auth.service'
import React, { useState } from 'react'
import { UserService } from '../network/axios/services/user.service'

export function HomePage(){
  const [loginData, setLoginData] = useState({
    'username': '',
    'password': '',
  });

  const [registerData, setRegisterData] = useState({
    'username': '',
    'password': '',
    'confirm': ''
  });

  function handleLogin(event: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target; 
    setLoginData(prevFormData => ({
      ...prevFormData, 
      [name]: value
    }));
  }

  function handleRegister(event: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target; 
    setRegisterData(prevFormData => ({
      ...prevFormData, 
      [name]: value
    }));
  }

  async function submitLogin(event : React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = await AuthService.login(loginData.username, loginData.password);
  }

  async function submitRegister(event : React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = await UserService.create(registerData.username, registerData.password, registerData.confirm);
    console.log(data);
  }
  
  const logoSection = (
    <UpDownAnimation content={
        <>
          <img src={logo} alt="" />
          <h3 className='text-white'>Swipe up to continue ...</h3>
        </>
      }/>
  );

  const loginSection = (
    <div className={`relative w-full h-[60vh]`}>
      <img src={background} className='w-full h-full absolute rounded-2xl  opacity-40'/>
      <div className='w-full h-full absolute rounded-2xl border-2 border-white/40'></div>
      <div className='w-full absolute p-5'>
        <h1 className='text-white'>Login</h1>
        <form action="" className='flex flex-col justify-between items-center text-2xl' onSubmit={submitLogin}>
          <div className='w-3/4 flex justify-between items-start flex-col pb-2'>
            <label htmlFor="" className='text-white'>username</label>
            <input type="text" name='username' className='bg-white w-full rounded-2xl p-2 pl-4 pr-4 text-3xl shadow-2xs border-2 border-black' value={loginData.username} onChange={handleLogin}/>
          </div>
          <div className='w-3/4 flex justify-between items-start flex-col pb-8'>
            <label htmlFor="" className='text-white'>password</label>
            <input type="password" name='password' className='bg-white w-full rounded-2xl p-2 pl-4 pr-4 text-3xl shadow-2xs border-2 border-black' value={loginData.password} onChange={handleLogin}/>
          </div>
          <button className='bg-white w-3/4 rounded-2xl text-3xl shadow-2xs border-2 text-black transition-all duration-100 border-black hover:bg-white/20'>Login</button>
        </form>
      </div>
      <div className='absolute top-[50%] -right-30 flex'>
        <UpDownAnimation content={
          <>
            <h3 className='text-white text-shadow-lg'>Register</h3>
            <ArrowDown className="w-6 h-6 text-white text-shadow-lg" />
          </>
        }/>
      </div>
    </div>
  )

  const registerSection = (
    <div className={`relative w-full h-[65vh]`}>
      <img src={background} className='w-full h-full absolute rounded-2xl  opacity-40'/>
      <div className='w-full h-full absolute rounded-2xl border-2 border-white/40'></div>
      <div className='w-full absolute pt-3'>
        <h1 className='text-white'>Register</h1>
        <form action="" className='flex flex-col justify-between items-center text-2xl' onSubmit={submitRegister}>
          <div className='w-3/4 flex justify-between items-start flex-col pb-2'>
            <label htmlFor="" className='text-white'>username</label>
            <input type="text" name='username' className='bg-white w-full rounded-2xl p-2 pl-4 pr-4 text-3xl shadow-2xs border-2 border-black' value={registerData.username} onChange={handleRegister}/>
          </div>
          <div className='w-3/4 flex justify-between items-start flex-col pb-2'>
            <label htmlFor="" className='text-white'>password</label>
            <input type="password" name='password' className='bg-white w-full rounded-2xl p-2 pl-4 pr-4 text-3xl shadow-2xs border-2 border-black' value={registerData.password} onChange={handleRegister}/>
          </div>
          <div className='w-3/4 flex justify-between items-start flex-col pb-8'>
            <label htmlFor="" className='text-white'>confirm password</label>
            <input type="password" name='confirm' className='bg-white w-full rounded-2xl p-2 pl-4 pr-4 text-3xl shadow-2xs border-2 border-black' value={registerData.confirm} onChange={handleRegister}/>
          </div>
          <button className='bg-white w-3/4 rounded-2xl text-3xl shadow-2xs border-2 text-black transition-all duration-100 border-black hover:bg-white/20'>Register</button>
        </form>
      </div>
      <div className='absolute top-[50%] -right-25 flex'>
        <UpDownAnimation content={
          <>
            <h3 className='text-white text-shadow-lg'>Login</h3>
            <ArrowUp className="w-6 h-6 text-white text-shadow-lg" />
          </>
        }/>
      </div>
    </div>
  )

  const contents = [
    logoSection,
    loginSection,
    registerSection,
  ]

  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <img src={sky} className='w-screen h-screen object-cover absolute'/>
      <div className='absolute flex w-screen h-screen justify-between items-center pr-40 pl-40'>
        <div className='relative'>
          <div className='absolute bottom-0 translate-y-35 -translate-x-35'><TiltCard src={cat4} width={350} strength={-25}></TiltCard></div>
          <div className='absolute bottom-0 translate-y-22 translate-x-35'><TiltCard src={cat2} width={350} strength={30}></TiltCard></div>
          <div className='absolute bottom-0 translate-y-50 translate-x-10'><TiltCard src={wendy} width={300} strength={40}></TiltCard></div>
          <div className='absolute bottom-0 translate-y-70 -translate-x-35'><TiltCard src={cat1} width={300} strength={30}></TiltCard></div>
          <div className='absolute bottom-0 translate-y-35 translate-x-65'><TiltCard src={cat3} width={250} strength={-25}></TiltCard></div>
        </div>
        <div className='w-1/2 h-1/2 flex items-center justify-center'>
          <SlideContent contents={contents}/>
        </div>
      </div>
      <img src={grass} alt="" className='absolute -top-10'/>
      <img src={fence} alt="" className='absolute -bottom-10'/>
    </div>
  )
}