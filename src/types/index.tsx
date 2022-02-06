export type Photo = {
  id: string
  small: string
  regular: string
  name: string
  photo: string
  download: string
  description: string
  like: boolean
}

export type PhotoState = Record<string, Photo>

export enum PhotoActionKind {
  Like = 'LIKE',
}

export type PhotoAction = {
  type: PhotoActionKind
  payload: string
}

export type PhotoContextValue = {
  state: PhotoState
  dispatch: React.Dispatch<PhotoAction>
  likePhotoAction: (id: string) => PhotoAction
}