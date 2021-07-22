import { takeLatest , call , put } from "@redux-saga/core/effects"
import { Actions, ContactAction , ResetContacts , ErrorFetchContacts , FetchContactsSuccess , 
    InsertContactSuccess, ResetContactsSuccess , UpdateContactSuccess , DeleteContactSuccess
} from "../action/contact.action"
import Contacts, { ContactReq } from "../../models/contacts"
import Respons from "../../models/responses"
import { getContacts , postContact , deleteContact , putContact } from '../../services/contact.services'

function* resetContact() {
    try {
        yield put(ResetContactsSuccess())    
    } catch(error) {
        yield put(ErrorFetchContacts(error))
    }
}

function* fetchContacts() {
    try {
        const contacts: Respons<Contacts[]> = yield call(getContacts);
        yield put(FetchContactsSuccess(contacts.data!))
    } catch(error) {
        yield put(ErrorFetchContacts(error))
    } 
}

function* insertContact(action: ContactAction) {
    try {
        const response: Respons<any> = yield call(postContact,action.newData!);
        yield put(InsertContactSuccess(response.message!))
        yield put(ResetContacts())
    } catch(error) {
        yield put(ErrorFetchContacts(error))    
    }
}

function* updateContact(action: ContactAction) {
    try {
        const body = new ContactReq()
        body.firstName = action.newData?.firstName;
        body.lastName = action.newData?.lastName;
        body.age = action.newData?.age;
        body.photo = action.newData?.photo;
        const response: Respons<any> = yield call(putContact,action.newData!.id,body);
        yield put(UpdateContactSuccess(action.newData!,response.message!))
    } catch (error) {
        yield put(ErrorFetchContacts(error))
    }
}

function* delContact(action: ContactAction) {
    try{
        const response: Respons<any> = yield call(deleteContact,action.newData!.id);
        yield put(DeleteContactSuccess(action.newData!,response.message!))
    }catch (error){
        yield put(ErrorFetchContacts(error))
    }
}

function* watchContacts() {
    yield takeLatest(Actions.RESET_CONTACT_TYPE,resetContact);
    yield takeLatest(Actions.FETCH_CONTACT_TYPE,fetchContacts);
    yield takeLatest(Actions.INSERT_CONTACT_TYPE, action => insertContact(action));
    yield takeLatest(Actions.UPDATE_CONTACT_TYPE, action => updateContact(action));
    yield takeLatest(Actions.DELETE_CONTACT_TYPE, action => delContact(action));  
}

export default watchContacts