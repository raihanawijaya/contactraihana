import axios from 'axios'
import Contacts, { ContactReq } from '../models/contacts'
import Respons from '../models/responses'

const url = 'https://simple-contact-crud.herokuapp.com/contact'

const getContacts = async () => {
   try {
        const {data} = await axios.get<Respons<Contacts[]>>(url)
        return data
   } catch (error) {
        throw error.response.data.message
   }
} 

const getContact = async (id : string) => {
     try {
         const {data} = await axios.get<Respons<Contacts>>(`${url}/${id}`)
         return data
    } catch (error) {
          throw error.response.data.message
    }
 }

const postContact = async (body : ContactReq) => {
    try {
          const {data} = await axios.post<Respons<any>>(url,body)
          return data
   } catch (error) {
          throw error.response.data.message
   }
}

const putContact = async (id : string, body : ContactReq) => {
     try {
         const {data} = await axios.put<Respons<any>>(`${url}/${id}`,body)
         return data
    } catch (error) {
          throw error.response.data.message
    }
 }

 const deleteContact = async (id : string) => {
     try {
         const {data} = await axios.delete<Respons<any>>(`${url}/${id}`)
         return data
    } catch (error) {
          throw error.response.data.message
    }
 }

export { getContacts , getContact , postContact , putContact , deleteContact }