import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { usePhoto } from 'context'
import { Photo } from 'types'
import { Avatar } from 'icons'
import { LikeBtn, CloseBtn } from 'components'
import './Modal.scss'

export function Modal() {
  const { id } = useParams()
  const { state, dispatch, photoDetailsAction } = usePhoto()
  const photo: Photo = useMemo(() => {
    return state[id || '']
  }, [id, state])
  const photoDetails = useMemo(() => {
    if (photo.details) {
      return Object.entries(photo.details).map((value, index) => {
        switch (index) {
          case 0:
            return {
              title: 'Camera make',
              value: value[1],
              raw: value[1],
            }
          case 1:
            return {
              title: 'Camera model',
              value: value[1],
              raw: value[1],
            }
          case 2:
            return {
              title: 'Focal length',
              value: `${value[1]}mm`,
              raw: value[1],
            }
          case 3:
            return {
              title: 'Aperture',
              value: `f/${Math.floor(parseInt(`${value[1]}`))}`,
              raw: value[1],
            }
          case 4:
            return {
              title: 'Shutter speed',
              value: `1/${1 / parseFloat(`${value[1]}`)}s`,
              raw: value[1],
            }
          case 5:
            return {
              title: 'ISO',
              value: value[1],
              raw: value[1],
            }
          default:
            return {}
        }
      })
    } else {
      return []
    }
  }, [photo.details])
  useEffect(() => {
    if (!photo.details && id) {
      fetch(
        'https://api.unsplash.com/photos/ec0-FI5SB0Y?client_id=-xcRehLaUi0D167HAJc9HGOZS17QpQk11CDzmSrdnPo'
      )
        .then((data) => data.json())
        .then((data) => {
          dispatch(
            photoDetailsAction(id, {
              make: data.exif.make,
              model: data.exif.model,
              focal_length: data.exif.focal_length,
              aperture: data.exif.aperture,
              exposure_time: data.exif.exposure_time,
              iso: data.exif.iso,
            })
          )
        })
    }
  })

  function excerptText(text: string, length = 20) {
    if (text.length < length) {
      return text
    } else {
      return `${text.slice(0, length)}...`
    }
  }
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
          {photo.description && (
            <h2 className="modal__title">{excerptText(photo.description)}</h2>
          )}
          <div className="modal__author">
            <div className="author__avatar">
              <Avatar />
              {photo.photo && <img src={photo.photo} alt="avatar" className="author__photo"/>}
            </div>
            <div className="author__name">{photo.name}</div>
          </div>
          {photoDetails && (
            <>
              <hr className="modal__separator" />
              <div className="modal__info">
                {photoDetails.map((value) => {
                  return (
                    <div className="info" key={value.title}>
                      <span className="info__name">{value.title}</span>
                      <span className="info__value">
                        {value.raw ? value.value : 'None'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
