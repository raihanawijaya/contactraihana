import Contacts from "../../models/contacts"
import { ContactAction , Actions} from "../../redux/action/contact.action"

export type TypeState = {
    loading: boolean,
    data: Contacts[],
    newData?: Contacts,
    message?: string,
    error?: string,
}

const initState: TypeState = {
    loading: false,
    data: [],
    newData: undefined,
    message: undefined,
    error: undefined
}

export type ContactReducerType = {
    contactReducer: TypeState
}

const ContactReducer = (contactState= initState, action: ContactAction) => {
    switch (action.type){
        case Actions.RESET_CONTACT_TYPE:
        case Actions.INSERT_CONTACT_TYPE:
        case Actions.FETCH_CONTACT_TYPE:
            return {
                ...contactState, loading: true, error: undefined, message: undefined
            }
        case Actions.FETCH_CONTACT_ERROR_TYPE:
            return {
                ...contactState, loading: false, error: action.error, message: undefined 
            }
        case Actions.FETCH_CONTACT_SUCCESS_TYPE:
            return {
                ...contactState, loading: false, data: action.data, error: undefined, message: undefined
            }
        case Actions.INSERT_CONTACT_SUCCESS_TYPE:
            return {
                ...contactState, loading: false, message: action.message, error: undefined
            }
        case Actions.RESET_CONTACT_SUCCESS_TYPE:
            return {
                ...contactState, data: action.data, error: undefined, loading: false, message: undefined
            }
        case Actions.UPDATE_CONTACT_TYPE:
            return{
                ...contactState, loading: true, error: undefined, message: undefined
            }
        case Actions.UPDATE_CONTACT_SUCCESS_TYPE:
            const contactStateUpdate = contactState.data.map( item => {
                if (item.id == action.newData!.id){
                    item.firstName = action.newData?.firstName
                    item.lastName = action.newData?.lastName
                    item.age = action.newData?.age
                    item.photo = action.newData?.photo
                } 
                return item
            })            
            return{
                ...contactState, data: contactStateUpdate, loading: false, error: undefined, message: action.message, 
            }
        case Actions.DELETE_CONTACT_TYPE:
            return{
                ...contactState, loading: true, error: undefined, message: undefined
            }
        case Actions.DELETE_CONTACT_SUCCESS_TYPE:
            const contactStateFilter = contactState.data.filter ( item => item.id !== action.newData!.id)
            return{
                ...contactState, data: contactStateFilter, loading: false, error: undefined, message: action.message
            }
        default:
            return contactState
    }
}

export default ContactReducer