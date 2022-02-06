export type PhotoDetails = {
  make: string
  model: string
  focal_length: string
  aperture: string
  exposure_time: string
  iso: number
}

export type Photo = {
  id: string
  small: string
  regular: string
  name: string
  photo: string
  download: string
  description: string
  like: boolean
  details: PhotoDetails
}

export type PhotoState = Record<string, Photo>

export enum PhotoActionKind {
  Like = 'LIKE',
  AddDetails = 'ADD_DETAILS',
  FetchPhotos = 'FETCH_PHOTOS'
}

export type PhotoAction = {
  type: PhotoActionKind
  payload: any
}

export type PhotoContextValue = {
  state: PhotoState
  dispatch: React.Dispatch<PhotoAction>
  likePhotoAction: (id: string) => PhotoAction
  photoDetailsAction: (id: string, details: PhotoDetails) => PhotoAction
}
