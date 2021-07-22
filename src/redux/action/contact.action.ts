import Contacts , {ContactReq} from '../../models/contacts'

export enum Actions {
    RESET_CONTACT_TYPE = 'RESET_CONTACT_TYPE',
    RESET_CONTACT_SUCCESS_TYPE = 'RESET_CONTACT_SUCCESS_TYPE',
    RESET_CONTACT_ERROR_TYPE = 'RESET_CONTACT_ERROR_TYPE',

    FETCH_CONTACT_TYPE = 'FETCH_CONTACT_TYPE',
    FETCH_CONTACT_SUCCESS_TYPE = 'FETCH_CONTACT_SUCCESS_TYPE',
    FETCH_CONTACT_ERROR_TYPE='FETCH_CONTACT_ERROR_TYPE',

    INSERT_CONTACT_TYPE = 'INSERT_CONTACT_TYPE',
    INSERT_CONTACT_SUCCESS_TYPE = 'INSERT_CONTACT_SUCCESS_TYPE',

    DELETE_CONTACT_TYPE = 'DELETE_CONTACT_TYPE',
    DELETE_CONTACT_SUCCESS_TYPE = 'DELETE_CONTACT_SUCCESS_TYPE',

    UPDATE_CONTACT_TYPE = 'UPDATE_CONTACT_TYPE',
    UPDATE_CONTACT_SUCCESS_TYPE = 'UPDATE_CONTACT_SUCCESS_TYPE',
}

export type ContactAction = {
    type : Actions,
    data? : Contacts | Contacts[] | []
    newData? : Contacts | ContactReq,
    message? : string,
    error? : string
}

const ResetContacts = () : ContactAction => {
    return {
        type: Actions.RESET_CONTACT_TYPE
    }
}

const ResetContactsSuccess = () : ContactAction => {
    return {
        type: Actions.RESET_CONTACT_SUCCESS_TYPE,
        data: []
    }
}

const FetchContacts = () : ContactAction => {
    return {
        type: Actions.FETCH_CONTACT_TYPE,
    }
}

const FetchContactsSuccess = (data: Contacts[]) : ContactAction => {
    return {
        type: Actions.FETCH_CONTACT_SUCCESS_TYPE,
        data: data
    }
}

const ErrorFetchContacts = (error: string) : ContactAction => {
    return {
        type: Actions.FETCH_CONTACT_ERROR_TYPE,
        error: error
    }
}

const InsertContact = (data: ContactReq) : ContactAction => {
    return {
        type: Actions.INSERT_CONTACT_TYPE,
        newData: data
    }
}

const InsertContactSuccess = (message: string) : ContactAction => {
    return {
        type: Actions.INSERT_CONTACT_SUCCESS_TYPE,
        message
    }
}

const UpdateContact = (data: Contacts) : ContactAction => {
    return {
        type: Actions.UPDATE_CONTACT_TYPE,
        newData : data,
    }
}

const UpdateContactSuccess = (data: Contacts, message: string) : ContactAction => {
    return {
        type: Actions.UPDATE_CONTACT_SUCCESS_TYPE,
        message,
        newData : data
    }
}

const DeleteContact = (data: Contacts) : ContactAction => {
    return {
        type: Actions.DELETE_CONTACT_TYPE,
        newData : data
    }
}

const DeleteContactSuccess = (data: Contacts, message: string) : ContactAction => {
    return {
        type: Actions.DELETE_CONTACT_SUCCESS_TYPE,
        message,
        newData : data
    }
}

export { ResetContacts, ResetContactsSuccess , FetchContacts , FetchContactsSuccess , InsertContact , 
    InsertContactSuccess , ErrorFetchContacts , UpdateContact , UpdateContactSuccess, DeleteContact, DeleteContactSuccess}
