import { createContext, useReducer } from "react";

export const DepartmentContext = createContext();
export const departmentReducer = (state, action) => {
    switch (action.type) {
        case "SET_DEPARTMENTS":
            return {
                departments: action.payload,
            };
        case "ADD_DEPARTMENT":
            return {
                departments: [action.payload, ...state.departments],
            };
        case "DELETE_DEPARTMENT":
            return {
                departments: state.departments.filter(
                    (department) => department._id !== action.payload
                ),
            };
        case "UPDATE_DEPARTMENT":
            return {
                departments: state.departments.map((department) =>
                    department._id === action.payload._id
                        ? { ...action.payload }
                        : department
                ),
            };
        default:
            return state;
    }
};
export const DepartmentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(departmentReducer, {
        departments: null,
    });
    console.log(state);
    return (
        <DepartmentContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DepartmentContext.Provider>
    );
};
