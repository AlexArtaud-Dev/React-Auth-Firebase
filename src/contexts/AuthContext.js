import React, {useContext, useState, useEffect} from "react";
import { auth } from '../firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider( { children } ) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
        // const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJsb3RqR2VrZFNnZERHVzJQZE5QdUpIcVpoQkoyIiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstMTlyOXhAYXV0aC1kZXYtMWJlZDQuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay0xOXI5eEBhdXRoLWRldi0xYmVkNC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiZXhwIjoxNjE2MTc5NzQxLCJpYXQiOjE2MTYxNzYxNDF9.fGjDaRY5njo1Un1CD311PAEStNTrMO86uFn1CNlOvwSdmDqrWcO0xWNJUEFpk2ccJ6j5J_RbDodQo7fce6FWzxN_qi8mHA_RMn8-Tlk_EaJeHNLQhhNtMF3F2c-E0M157MW_tU9nx8o30QL56R6L0MZ4hNkgerqcgn_g5MWYTJf_ih2kNFtF8NrpMTrFybBu8Dl_1Cv7lvfjuZiB5KsgJu4eNN9CI7OczuK0Y-i65HlQz3gcqZdmpTTjcPvo1eFyXE5mOTnga7H7SsEza3ltXSmNeDkG9BXfClASbu3VlSpYDLrtLWOZtokxlakkHGmqGzskqHheEvNic-Tg19uRqQ"
        // return auth.signInWithCustomToken(token)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }




    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }


    return(
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}
