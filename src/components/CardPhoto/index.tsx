import { useNavigate } from 'react-router-dom'
import { usePhoto } from 'context'
import { Heart } from 'icons'
import './CardPhoto.scss'

export function CardPhoto({
  id,
  small,
  like,
}: {
  id: string
  small: string
  like: boolean
}) {
  const { dispatch, likePhotoAction } = usePhoto()
  const navigate = useNavigate()
  const likeClass = (like: boolean) => {
    return like ? 'gridCard__heart gridCard__heart--like' : 'gridCard__heart'
  }
  return (
    <div className="gridCard">
      <img alt="simplePhoto" src={small} onClick={() => navigate(`/${id}`)} />
      <div
        className={likeClass(like)}
        onClick={() => dispatch(likePhotoAction(id))}
      >
        <Heart width={16} heigth={16} />
      </div>
    </div>
  )
}
