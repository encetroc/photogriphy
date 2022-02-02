import { useParams } from 'react-router-dom'
import { Avatar } from 'icons'
import { LikeBtn, CloseBtn } from 'components'
import './Modal.scss'

export function Modal() {
  const { id } = useParams()
  return (
    <div className="modal">
      <div className="modal__inner">
        <LikeBtn className="modal__like--mobile" />
        <CloseBtn className="modal__close--mobile" />
        <div className="modal__img">
          <img src={`https://source.unsplash.com/random/${id}`} alt="sample" />
        </div>
        <div className="modal__content">
          <LikeBtn className="modal__like" />
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
