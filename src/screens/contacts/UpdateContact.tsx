import { useNavigation , useRoute } from '@react-navigation/native'
import React, { FC , useState , useEffect } from 'react'
import { View , Text , TextInput , StyleSheet , ToastAndroid , Image , TouchableOpacity , ActivityIndicator} from 'react-native'
import Contacts from '../../models/contacts'
import { ContactReq } from '../../models/contacts'
import { putContact , getContact } from '../../services/contact.services'
import Respons from '../../models/responses'
import AddContactValidation from '../../validations/AddContactValidation'
import {useDispatch,useSelector} from 'react-redux'
import {ContactReducerType} from '../../redux/reducer/contact.reducer'
import { UpdateContact } from '../../redux/action/contact.action'
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';

const UpdateRole: FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [id, setId] = useState('')
    const [photo, setPhoto] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const [isUpload, setIsUpload] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [data, setData] = useState<Contacts>()

    const handleFirstName = (firstName : string) => {
        setFirstName(firstName)
    }
    
    const handleLastName = (lastName : string) => {
        setLastName(lastName)  
    }

    const handleAge = (age : string) => {
        setAge(age)  
    }

    useEffect(() =>{
        setIsUpload(true)
        const id = route.params
        getContact(id).then(res => {
            if (res.data) {
            setData(res.data)
            setId(res.data.id)
            setAge(res.data.age?.toString())
            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
            setPhoto(res.data.photo)
            }
            setIsUpload(false)    
        })  
    },[])
    
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
        const roleUpdate = new Contacts()
        roleUpdate.id = id
        roleUpdate.firstName= firstName 
        roleUpdate.lastName= lastName 
        roleUpdate.age = Number(age)
        roleUpdate.photo = photo

        if(validationMsg==''){
            dispatch(UpdateContact(roleUpdate))
            setIsLoading(false)
            navigation.navigate('list_contact')
        } else {
            setIsLoading(false)
            ToastAndroid.showWithGravity(validationMsg,5,ToastAndroid.CENTER)
        }
    }

    return (
        <View style={styles.areaView}>

            {(photo != "") &&  (photo != "N/A") &&
            <Image
                style={styles.sizePhoto}
                source={{uri: photo}}
                resizeMode={"cover"}
            /> }

            {(photo == "N/A") &&
            <Image
                style={styles.sizePhoto}
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
                value={firstName}
                onChangeText={handleFirstName}
            />

            <TextInput 
                placeholder="Last Name"
                style={styles.baseText}
                value={lastName}
                onChangeText={handleLastName}
            />

            <TextInput 
                placeholder="Age"
                style={styles.baseText}
                value={age}
                onChangeText={handleAge}
            />
            
            {isLoading && <ActivityIndicator size="small" color="#466ea6" />}

            <TouchableOpacity onPress={ () => navigatePage()} style={styles.btnAdd} activeOpacity={0.8} disabled={isLoading}>
                <Text style={styles.textButtonAdd}>SAVE CONTACT</Text>
            </TouchableOpacity> 

        </View>
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
        marginTop: 12,
        borderRadius: 60
    },
    areaView: {
        backgroundColor: '#fff',  
        flex:1,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        marginHorizontal: 12,
        borderWidth: 2,
        justifyContent: 'center',
        borderColor:'#000',
        borderRadius: 2
    },
    baseText: {
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

export default UpdateRole