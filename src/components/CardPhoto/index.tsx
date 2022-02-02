import { useNavigate } from 'react-router-dom'
import { Heart } from 'icons'
import './CardPhoto.scss'

const min = 1
const max = 20
export function CardPhoto() {
  const navigate = useNavigate()
  const id = Math.floor(Math.random() * (max - min + 1)) + min
  return (
    <div className="gridCard"  onClick={() => navigate(`/${id}`)}>
      <img
        alt="simplePhoto"
        src={`https://source.unsplash.com/random/${id}`}
      />
      <div className="gridCard__heart">
        <Heart width={16} heigth={16}/>
      </div>
    </div>
  )
}
