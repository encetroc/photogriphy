import { useParams } from 'react-router-dom'
import { usePhoto } from 'context'
import { Photo } from 'types'
import { Avatar } from 'icons'
import { LikeBtn, CloseBtn } from 'components'
import './Modal.scss'
import { useMemo } from 'react'

export function Modal() {
  const { id } = useParams()
  const { state } = usePhoto()
  const photo: Photo = useMemo(() => {
    return state[id || '']
  }, [id, state])
  return (
    <div className="modal">
      <div className="modal__inner">
        <LikeBtn className="modal__like--mobile" like={photo.like} />
        <CloseBtn className="modal__close--mobile" />
        <div className="modal__img">
          <img src={photo.regular} alt="sample" />
        </div>
        <div className="modal__content">
          <LikeBtn className="modal__like" like={photo.like} />
          <CloseBtn className="modal__close" />
          <h2 className="modal__title">Leaves in the jungle</h2>
          <div className="modal__author">
            <div className="author__avatar">
              <Avatar />
            </div>
            <div className="author__name">John doe</div>
          </div>
          <hr className="modal__separator" />
          <div className="modal__info">
            {[1, 1, 1, 1, 1, 1].map(() => {
              return (
                <div className="info">
                  <span className="info__name">Camera maker</span>
                  <span className="info__value">Canon</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
