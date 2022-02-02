import { Heart } from 'icons'
import './CardPhoto.scss'

const min = 1
const max = 20
export function CardPhoto() {
  return (
    <div className="gridCard">
      <img
        alt="simplePhoto"
        src={`https://source.unsplash.com/random/${
          Math.floor(Math.random() * (max - min + 1)) + min
        }`}
      />
      <div className="gridCard__heart">
        <Heart width={16} heigth={16}/>
      </div>
    </div>
  )
}
