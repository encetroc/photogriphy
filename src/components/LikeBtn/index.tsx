import { useParams } from 'react-router-dom'
import { usePhoto } from 'context'
import { Heart } from 'icons'
import './LikeBtn.scss'

export function LikeBtn({
  className,
  like,
}: {
  className: string
  like: boolean
}) {
  const { id } = useParams()
  const { dispatch, likePhotoAction } = usePhoto()
  const likeClass = (like: boolean, className: string) => {
    return like ? `likeBtn likeBtn--like ${className}` : `likeBtn ${className}`
  }
  return (
    <div
      className={likeClass(like, className)}
      onClick={() => dispatch(likePhotoAction(id || ''))}
    >
      <Heart width={16} heigth={16} />
      Like
    </div>
  )
}
