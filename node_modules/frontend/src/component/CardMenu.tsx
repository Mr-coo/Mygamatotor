import CatFrame from '../assets/cat-print.png'
import ButtonBackground from '../assets/gacha/gacha-bg.png'

export function CardMenu({ isActive, symbol, text } : { isActive : boolean, symbol: string, text: string }){
  return (
    <div
      className={`relative w-100 h-15 transition-all cursor-pointer
        ${isActive ? 'opacity-100 scale-100' : 'opacity-70 scale-90'}
      `}
      style={{ transform: `translateX(${isActive ? 50 : 0}px)` }}
    >
      <div className="absolute z-12 left-0 bottom-1 flex justify-between items-end" >
        <img src={symbol} alt="" className="h-25 w-auto object-cover"/>
        <h2 className="text-white">{text}</h2>
      </div>
      <div className="w-full h-full bg-white rounded-2xl absolute z-10"></div>
      <img src={ButtonBackground} className="h-full w-full absolute z-11 rounded-2xl opacity-90" alt=""/>
      <div className="w-full h-full bg-black/80 rounded-2xl absolute top-2 left-2"></div>
      <img
        src={CatFrame}
        className={`absolute -bottom-10 -right-12 w-25 z-20 transition-all duration-100
          ${isActive ? 'rotate-20 scale-100' : 'rotate-0 scale-0'}
        `}
      />
    </div>
  )
}