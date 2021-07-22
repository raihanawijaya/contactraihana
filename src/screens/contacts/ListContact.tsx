import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import React, { FC , useState , useEffect , useCallback} from 'react'
import { Text , View, Button, StyleSheet, FlatList , TouchableOpacity , Alert , ToastAndroid , Image , ActivityIndicator} from 'react-native'
import Contacts from '../../models/contacts'
import { useDispatch , useSelector} from "react-redux"
import { FetchContacts, ResetContacts , DeleteContact} from '../../redux/action/contact.action'

import { getContacts , deleteContact } from '../../services/contact.services'
import {ContactReducerType} from '../../redux/reducer/contact.reducer'

const ListContact: FC = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const contactState = useSelector((state: ContactReducerType) => state.contactReducer.data)
  const loadingState = useSelector((state: ContactReducerType) => state.contactReducer.loading)
  const messageState = useSelector((state: ContactReducerType) => state.contactReducer.message)
  const errorState = useSelector((state: ContactReducerType) => state.contactReducer.error)

  useEffect(() => {
    if (contactState.length==0) dispatch(FetchContacts())
  },[contactState])

  const ReloadData = () => {
    dispatch(ResetContacts())
  }

  const DeleteDataContact = (item : Contacts) => {
    dispatch(DeleteContact(item))
  }  

  const DeleteAlert = (item : Contacts) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure want to delete contact?",
      [
        { text: "CANCEL", onPress: () => {}},
        { text: "DELETE", onPress: () => DeleteDataContact(item)}
      ]
    )
  }

  const navigateUpdateRole = (item : String) => {
    navigation.navigate('update_contact',item)
  } 

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

      <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity onPress={ () => ReloadData()} style={styles.btnReload} activeOpacity={0.8}>
          <Text style={styles.textReload}>RELOAD DATA</Text>
        </TouchableOpacity>
      </View>
      
      
      {messageState ? ToastAndroid.show(messageState,5) : errorState && ToastAndroid.show(errorState,5)}
      {loadingState ?  <ActivityIndicator size="small" color="#466ea6" /> : 
      contactState && (
        <FlatList 
        data={contactState}
          renderItem={({item})=>
              <View style={styles.list}>

                {(item.photo != "") && (item.photo != "N/A") && 
                <Image
                    style={styles.sizePhoto}
                    source={{uri: item.photo}}
                    resizeMode={"cover"}
                />}

                {(item.photo == "N/A") &&
                <Image
                    style={styles.sizePhoto}
                    source={require('../../img/ava_default.png')}
                    resizeMode={"cover"}
                />}

                <Text style={styles.baseTextBold}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.baseText}> Age {item.age}</Text>

                <View style={styles.layoutTwoButton}>
                  <TouchableOpacity onPress={ () => navigateUpdateRole(item.id)} style={styles.btnEdit} activeOpacity={0.8}>
                    <Text style={styles.btnEditText}>EDIT</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => DeleteAlert(item)} style={styles.btnDelete} activeOpacity={0.8}>
                    <Text style={styles.btnDeleteText}>DELETE</Text>
                  </TouchableOpacity>
                </View>

              </View>
            }
          keyExtractor={(item)=>item.id}
        />
      )}
      
      <TouchableOpacity onPress={() => navigation.navigate('add_contact')} style={styles.btnAdd} activeOpacity={0.8}>
        <Text style={styles.textAddContact}>ADD NEW CONTACT</Text>
      </TouchableOpacity> 

    </View>    
  )
} 

const styles = StyleSheet.create({
  textReload: {
    textAlign: 'right',
    fontSize: 14,
    color: '#466ea6'
  },
  textAddContact: {
    marginVertical: 12,
    alignContent: 'center',
    alignItems: 'center',
    color: 'white',     
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
  sizePhoto: {
    height: 60,
    width: 60,
    borderRadius: 50
  },
  baseText: {
    fontSize: 16,
    textAlign: 'left',
  },
  baseTextBold: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  list: {
    padding: 16,
    paddingLeft: 24,
    color: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    backgroundColor: 'white'
  },
  layoutTwoButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    marginTop: 16,
    right: 0
  },
  btnEdit: {
    elevation: 8,
    backgroundColor: 'white',
    marginRight: 12,
    borderColor:'#466ea6',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
    height: 35,
    width: 70
  },
  btnEditText: {
    fontSize: 12,
    color: "#466ea6",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  btnReload: {
    marginVertical: 12,
    backgroundColor: 'white',
    alignSelf: "center",
  },
  btnDelete: {
    elevation: 8,
    backgroundColor: 'white',
    borderColor:'#466ea6',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
    height: 35,
    width: 70
  },
  btnDeleteText: {
    fontSize: 12,
    color: "#466ea6",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default ListContact