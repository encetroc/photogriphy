import { createContext, useContext, useReducer } from 'react'
import {
  PhotoState,
  PhotoActionKind,
  PhotoAction,
  PhotoContextValue,
} from 'types'
import { data } from 'data'

const PhotoContext = createContext({})

const initialPhotoState: PhotoState = {}

function initializePhoto(initialPhotoState: PhotoState): PhotoState {
  const likedPhotoIds = JSON.parse(
    localStorage.getItem('likedPhotoIds') || '[]'
  )
  if (likedPhotoIds.length === 0) {
    localStorage.setItem('likedPhotoIds', JSON.stringify([]))
  }
  return data.reduce((map: any, photo) => {
    map[photo.id] = {
      id: photo.id,
      small: photo.urls.small,
      regular: photo.urls.regular,
      name: photo.user.name,
      photo: photo.user.profile_image.small,
      download: photo.links.download,
      description: photo.description,
      like: likedPhotoIds.includes(photo.id) ? true : false,
    }
    return map
  }, {})
}

function likePhotoAction(id: string): PhotoAction {
  return { type: PhotoActionKind.Like, payload: id }
}

function photoReducer(state: PhotoState, action: PhotoAction): PhotoState {
  const { type, payload } = action
  switch (type) {
    case PhotoActionKind.Like:
      const newState = {
        ...state,
        [payload]: {
          ...state[payload],
          like: !state[payload].like,
        },
      }
      const likedPhotoIds = Object.values(newState)
        .filter((photo) => photo.like)
        .map((photo) => photo.id)
      localStorage.setItem('likedPhotoIds', JSON.stringify(likedPhotoIds))
      return newState
    default:
      return state
  }
}

export function usePhoto() {
  return useContext(PhotoContext) as PhotoContextValue
}

export function PhotoContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(
    photoReducer,
    initialPhotoState,
    initializePhoto
  )
  return (
    <PhotoContext.Provider value={{ state, dispatch, likePhotoAction }}>
      {children}
    </PhotoContext.Provider>
  )
}
