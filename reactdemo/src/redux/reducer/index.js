import { combineReducers } from "redux";
import { LoginReducer } from "./LoginReducer";
import { UserReducer } from "./UserReducer";

export const rootReducer = combineReducers({
    UserData: UserReducer,
    RegistrationData:LoginReducer
})