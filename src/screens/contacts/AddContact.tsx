import { useNavigation , useRoute} from '@react-navigation/native'
import React, { FC , useState , useEffect } from 'react'
import { View , Button , TextInput , StyleSheet , ToastAndroid , Image , TouchableOpacity, Text , ActivityIndicator , KeyboardAvoidingView} from 'react-native'
import Contacts, { ContactReq  }  from '../../models/contacts'
import { postContact } from '../../services/contact.services'
import Respons from '../../models/responses'
import AddContactValidation from '../../validations/AddContactValidation'
import {useDispatch, useSelector} from 'react-redux'
import {ContactReducerType} from '../../redux/reducer/contact.reducer'
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import { InsertContact } from '../../redux/action/contact.action'

const AddContact: FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [photo, setPhoto] = useState('')
    const [isUpload, setIsUpload] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const state = useSelector((state: ContactReducerType)=>state.contactReducer)
    const dispatch = useDispatch()

    const handleFirstName = (firstName : string) => {
        setFirstName(firstName)
    }
    
    const handleLastName = (lastName : string) => {
        setLastName(lastName)  
    }

    const handleAge = (age : string) => {
        setAge(age)  
    }

    useEffect(() => {
                 
    }, [])

    const importImage = () => {
        setIsUpload(true)

        const options : ImageLibraryOptions = {
            mediaType : 'photo'
        }

        launchImageLibrary(options, async (res)=>{
            
            if (res.assets){
                const reference = storage().ref('photo/'+res.assets[0].fileName);
                await reference.putFile(res.assets[0].uri);
                const url = await reference.getDownloadURL();
                setPhoto(url)
                setIsUpload(false)
            } else if (res.didCancel) {
                setIsUpload(false)
            } else {
                ToastAndroid.showWithGravity("Upload Image Error", 5, ToastAndroid.CENTER)
                setIsUpload(false)
            }
            
        })
    }

    const navigatePage = () => {
        setIsLoading(true)
        let validationMsg = AddContactValidation(firstName,lastName,age)
        const reqContact = new ContactReq()
        reqContact.firstName= firstName 
        reqContact.lastName= lastName 
        reqContact.age = Number(age)
        reqContact.photo = photo

        if(validationMsg==''){
            dispatch(InsertContact(reqContact))
            setIsLoading(false)
            navigation.navigate('list_contact')
        } else {
            setIsLoading(false)
            ToastAndroid.showWithGravity(validationMsg, 5,ToastAndroid.CENTER)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.areaView}>
            {(photo != "") &&  
            <Image
                style={styles.sizePhoto}
                source={{uri: photo}}
                resizeMode={"cover"}
            />}

            {(photo == "") && 
            <Image
                style={styles.sizePhotoDefault}
                source={require('../../img/ava_default.png')}
                resizeMode={"cover"}
            />}

            {isUpload && <ActivityIndicator size="small" color="#466ea6" />}

            <TouchableOpacity onPress={ () => importImage()} style={styles.btnAddPhoto} activeOpacity={0.8} disabled={isUpload}>
                <Text style={styles.textButtonAddPhoto}>Set New Photo</Text>
            </TouchableOpacity>

            <TextInput 
                placeholder="First Name"
                style={styles.baseText}
                onChangeText={handleFirstName}
            />

            <TextInput 
                placeholder="Last Name"
                style={styles.baseText}
                onChangeText={handleLastName}
            />
            
            <TextInput 
                placeholder="Age"
                style={styles.baseText}
                onChangeText={handleAge}
            />

            {isLoading && <ActivityIndicator size="small" color="#466ea6" />}

            <TouchableOpacity onPress={ () => navigatePage()} style={styles.btnAdd} activeOpacity={0.8} disabled={isLoading}>
                <Text style={styles.textButtonAdd}>SAVE CONTACT</Text>
            </TouchableOpacity> 

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    textButtonAdd: {
        marginVertical: 12,
        alignContent: 'center',
        alignItems: 'center',
        color: 'white',     
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    textButtonAddPhoto: {
        marginVertical: 12,
        fontSize: 16,
        alignContent: 'center',
        alignItems: 'center',
        color: '#466ea6',     
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    btnAdd: {
        width: 360,
        height: 50,
        marginBottom: 12,
        backgroundColor: '#466ea6',
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#466ea6',
        alignSelf: 'center',
    },
    btnAddPhoto: {
        width: 360,
        height: 50,
        marginVertical: 12,
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 5,
        alignSelf: 'center',
    },
    sizePhoto: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 60,
        marginTop: 12,
    },
    sizePhotoDefault: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        alignSelf: 'center',
        borderRadius: 60,
        marginTop: 12,
    },
    areaView: {
        backgroundColor: '#fff',
        justifyContent: 'center',  
        flex:1,
    }, input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        justifyContent: 'center',
        borderColor:'#000',
        borderRadius: 2
    },baseText: {
        fontSize: 14,
        textAlign: 'left',
        padding: 12,
        marginTop: 6,
        marginBottom: 12,
        marginHorizontal: 24,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#466ea6',
        backgroundColor: '#fff',
        color: '#000'
    }
});

export default AddContact