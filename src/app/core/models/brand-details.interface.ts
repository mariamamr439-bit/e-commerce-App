export interface BrandDetails {}
export interface BrandDetailsResponse {
  data: BrandDetails
}

export interface BrandDetails {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}
