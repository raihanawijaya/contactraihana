import { createStore , combineReducers , applyMiddleware } from 'redux'
import ContactReducer from "../reducer/contact.reducer"
import createSagaMiddleware from '@redux-saga/core'
import watchContacts from "../saga/contact.saga"
import { persistStore , persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage'

const sagaMiddleware = createSagaMiddleware()

const rootReducers = combineReducers({
    contactReducer : ContactReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['contactReducer']
}

const store = createStore(persistReducer(persistConfig,rootReducers), 
    applyMiddleware(sagaMiddleware))

export const persistor = persistStore(store)

sagaMiddleware.run(watchContacts)

export default store