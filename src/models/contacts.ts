class BaseContact {
    firstName?: string 
    lastName?: string
    age?: number
    photo?: string
}

class Contacts extends BaseContact {
    id: string = ''
}

export class ContactReq extends BaseContact {

}

export default Contacts