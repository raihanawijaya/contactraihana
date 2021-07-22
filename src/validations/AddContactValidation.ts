const AddValidation = (firstname : string, lastname : string, age: string) : string => {
    if ((firstname == '') || (lastname == '') || (age == '')){
        return "Failed save contact: Please fill all data"
    } else if (age=="0") {
        return "Failed save contact: Age can't be 0"
    } else if (Number(age)>100) {
        return "Failed save contact: Age can't be more than 3 digit"
    } else if (hasWhiteSpace(lastname)) {
        return "Failed save contact: No Space in Last Name field"
    } else if (lastname !== undefined && lastname.length<3){
        return "Failed save contact: Last Name must be more than 3 words"
    } else {
        return ''
    }
}    

const hasWhiteSpace = (s :string) : boolean => {
    if (s.indexOf(' ') >= 0) {
        return true
    } else {
        return false
    }
  }

export default AddValidation