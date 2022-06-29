// import { createStore } from "redux";
import { legacy_createStore as createStore} from 'redux'
// import { configureStore } from "@reduxjs/toolkit";
// import rootReducers from "./reducer";
import {handleCart, cart} from "./reducer/handleCart"

const store = createStore(handleCart, cart)

export default store