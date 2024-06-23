import { createContext, useReducer } from "react";

export const HelperAdminContext  = createContext()
export const helperAdminReducer = (state, action)=>{
    switch(action.type){
        case 'SET_HELPERS':
            return {
                helperAdmins: action.payload
            }
        case 'ADD_HELPER':
            return {
                helperAdmins : [action.payload, ...state.helperAdmins]
            }
        case 'DELETE_HELPER':
            return {
                helperAdmins: state.helperAdmins.filter((helper_admin)=>helper_admin._id !== action.payload)
            }
        case 'UPDATE_HELPER':
            return {
              helperAdmins: state.helperAdmins.map((helper_admin) =>
                helper_admin._id === action.payload._id ? { ...action.payload } : helper_admin
            )
            }
        default:
            return state
    }
}
export const HelperAdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(helperAdminReducer, {
      helperAdmins: null
    })
  console.log((state))
    return (
      <HelperAdminContext.Provider value={{...state, dispatch}}>
        { children }
      </HelperAdminContext.Provider>
    )
  }