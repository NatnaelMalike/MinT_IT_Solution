import { createContext, useReducer } from "react";

export const TechnicianContext  = createContext()
export const technicianReducer = (state, action)=>{
    switch(action.type){
        case 'SET_TECHNICIANS':
            return {
                technicians: action.payload
            }
        case 'ADD_TECHNICIAN':
            return {
                technicians : [action.payload, ...state.technicians]
            }
        case 'DELETE_TECHNICIAN':
            return {
                technicians: state.technicians.filter((technician)=>technician._id !== action.payload)
            }
        case 'UPDATE_TECHNICIAN':
            return {
              technicians: state.technicians.map((technician) =>
                technician._id === action.payload._id ? { ...action.payload } : technician
            )
            }
        default:
            return state
    }
}
export const TechnicianContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(technicianReducer, {
      technicians: null
    })
  console.log((state))
    return (
      <TechnicianContext.Provider value={{...state, dispatch}}>
        { children }
      </TechnicianContext.Provider>
    )
  }