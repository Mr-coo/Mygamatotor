import { useEffect, useState } from "react";
import Cloud from "../assets/wave.png";
import Logo from "../assets/logo.png";
import { CircleUserRound } from 'lucide-react'
import Background from '../assets/splash-screen/sky.png'
import Checker from '../assets/home/orange-grid.jpg'
import { CardMenu } from "../component/CardMenu";
import Cat1 from '../assets/home/boogie-1.png'
import { useNavigate } from "react-router-dom";
import { GameName } from "@game/shared";

export default function GameMenuPage() {
  const [position, setPosition] = useState(0);
  const [activeCard, setActiveCard] = useState(2);
  const [buttonColor, setButtonCollor] = useState(0);
  const navigate = useNavigate();

  const cards: Array<Record<string, string>> = [
    { text: 'Fight Over Food1', symbol: Cat1, value: GameName.FIGHT_OVER_FOOD.toString() },
    { text: 'Pong Pong Pong', symbol: Cat1, value: GameName.PONG_PONG_PONG.toString() },
    { text: 'Fight Over Food3', symbol: Cat1, value: GameName.FIGHT_OVER_FOOD.toString() },
    { text: 'Fight Over Food4', symbol: Cat1, value: GameName.FIGHT_OVER_FOOD.toString() },
  ];

  const color = Math.round(
    200 + 55 * Math.abs(Math.sin(buttonColor/1.5))
  );

  useEffect(() => {
    const cloudTime = setInterval(() => {
      setPosition(prev => {
        if(prev == window.innerWidth) return 0;
        return prev + 1;
      });
      setButtonCollor(prev => prev+0.1)
    }, 32); 

    return () => clearInterval(cloudTime);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if(e.key == 'ArrowUp'){
        setActiveCard(prev => Math.max(0,prev-1));
      }
      else if(e.key == 'ArrowDown'){
        setActiveCard(prev => Math.min(3, prev+1));
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);

  function handleStart(){
    navigate('/game', { state: cards[activeCard].value })
  }

  return (
    <div className={`w-screen h-screen overflow-hidden`} style={{ backgroundImage: `url(${Background})`}}>
      <nav className="relative w-full">
        <img
          src={Cloud}
          className="absolute w-screen"
          style={{ left: -window.innerWidth+position }}
        />
        <img
          src={Cloud}
          className="absolute w-screen"
          style={{ left: position }}
        />
        <div className="absolute flex items-start justify-between w-full">
          <div className="mt-5 ml-20 w-auto h-auto rounded-4xl shadow-xl/20 hover:scale-110 transition-all">
            <CircleUserRound size={64} strokeWidth={1.25}/>
          </div>
          <img src={Logo} className="p-5"/>
        </div>
      </nav>
      <div className="flex items-center justify-between w-full h-full pl-25 pr-25 pt-50 pb-50">
        <div className="flex flex-col justify-between items-center h-full">
          {
            cards.map((card, idx) => (
              <div
                key={idx}
                className="transition-transform"
                onClick={()=>setActiveCard(idx)}
                style={{ transform: `translateX(${idx * 20}px)` }}
              >
                <CardMenu
                  isActive={idx === activeCard}
                  symbol={card.symbol}
                  text={card.text}
                />
              </div>
            ))
          }
        </div>
        <div className="relative w-full h-full">
          <img src={Checker} alt="" className="w-4/5 h-full object-cover border-black border-2 absolute right-0 z-11 opacity-98" />
          <div className="w-4/5 h-full object-cover absolute right-0 bg-black z-10"></div>
          <div className="w-4/5 h-full object-cover absolute -right-4 top-4 bg-white/90"></div>
          <h1 className="absolute -right-4 top-4 z-13 text-white">{cards[activeCard].text}</h1>
          <h1 className="absolute -right-5 top-5 z-12 text-black/50 text-lar">{cards[activeCard].text}</h1>
        </div>
      </div>
      <div className="fixed -right-10 -bottom-20 w-[110vw] h-[22vh] -rotate-3">
        <img src={Checker} className="w-full h-full object-cover" />
      </div>
      <div className="fixed left-10 bottom-10 p-5 bg-white w-[70vw] z-10">
        <h4 className="leading-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nihil, nostrum odit, tempore deserunt pariatur aliquid reprehenderit sit impedit, rem iusto. Dolorem voluptatibus deleniti porro sed quod nobis saepe earum.</h4>
      </div>
      <div className="fixed left-12 bottom-8 p-5 bg-black/80 w-[70vw]">
        <h4 className="leading-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nihil, nostrum odit, tempore deserunt pariatur aliquid reprehenderit sit impedit, rem iusto. Dolorem voluptatibus deleniti porro sed quod nobis saepe earum.</h4>
      </div>
      <div className="group">
        <button 
          style={{ backgroundColor: `rgb(${color}, ${color}, ${color})` }}
          className={`fixed right-15 bottom-15 text-black pl-18 pr-18 p-13 leading-0 flex border-2 text-8xl font-medium z-10 group-hover:scale-105 transition-all`}
          onClick={handleStart}
          > 
        Start
        </button>
        <div className="fixed right-10 bottom-10 bg-black text-black pl-18 pr-18 p-13 leading-0 flex border-2 text-8xl font-medium group-hover:scale-105 transition-all">
          Start
        </div>
      </div>
    </div>
  );
}
