import { div } from "framer-motion/client";
import { useEffect, useRef  } from "react";
import "../styles/GameLayout1v1.css";

export default function GameLayout1v1({}){
  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      const scale = Math.min(scaleX, scaleY);
      document.documentElement.style.setProperty('--scale', scale);
    };
  
    window.addEventListener('resize', updateScale);
    updateScale(); // appel initial
  
    return () => window.removeEventListener('resize', updateScale);
  }, []);

    return (
        <div className="game-container">
            <div className="image-wrapper" id="game-wrapper">
              <img src="img/fond2.png" className="img-fond" alt="fond" />


            </div>
        </div>

    )
}