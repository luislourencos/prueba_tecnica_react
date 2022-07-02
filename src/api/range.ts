import { API_URL } from '../config/config';

export const getRangeMinAndMax = async() =>{
  const resp = await fetch(`${API_URL}/getRangeMinAndMax`)
  return await resp.json()
}
export const getRangeArray = async() =>{
  const resp = await fetch(`${API_URL}/getRangeArray`)
  return await resp.json()
}