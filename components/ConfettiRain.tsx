import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

interface ConfettiRainProps {
  rain: boolean;
  numberOfPieces: number;
  Y: number;
}

 export default function ConfettiRain({ rain, numberOfPieces, Y }:ConfettiRainProps) {
    const { width, height } = useWindowSize()
    return (
      rain
      ?
      <Confetti width={width} height={height*1.25} confettiSource={{x:width/2, y:Y, w:width, h:0}} gravity={-.1} numberOfPieces={numberOfPieces} />
      :
      <Confetti width={0} height={0} />
      )
 }