import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw Error ('Context can not be accesses')
    }

    return context

}