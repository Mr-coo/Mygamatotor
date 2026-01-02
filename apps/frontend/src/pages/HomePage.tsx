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

export function HomePage(){
  const logoSection = (
    <>
      <img src={logo} alt="" />
      <p>Click Here To Continue ...</p>
    </>
  )

  return (
    <div className='relative w-screen h-screen'>
      <img src={sky} className='w-screen h-screen object-cover absolute'/>
      <div className='absolute flex w-screen h-screen justify-between items-center pr-40 pl-40'>
        <div className='relative'>
          <div className='absolute bottom-0 translate-y-35 -translate-x-35'><TiltCard src={cat4} width={350} strength={-20}></TiltCard></div>
          <div className='absolute bottom-0 translate-y-22 translate-x-35'><TiltCard src={cat2} width={350} strength={25}></TiltCard></div>
          <div className='absolute bottom-0 translate-y-50 translate-x-10'><TiltCard src={wendy} width={300} strength={40}></TiltCard></div>
          <div className='absolute bottom-0 translate-y-70 -translate-x-35'><TiltCard src={cat1} width={300} strength={25}></TiltCard></div>
          <div className='absolute bottom-0 translate-y-35 translate-x-65'><TiltCard src={cat3} width={250} strength={-20}></TiltCard></div>
        </div>
        <div>
          <UpDownAnimation content={logoSection}>
          </UpDownAnimation>
        </div>
      </div>
      <img src={grass} alt="" className='absolute -top-10'/>
      <img src={fence} alt="" className='absolute bottom-0'/>
    </div>
  )
}