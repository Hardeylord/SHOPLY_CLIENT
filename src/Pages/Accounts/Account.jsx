import React, { useContext } from 'react'
import { jwtDecode } from "jwt-decode";
import { userContext } from '../../Authentication/AuthContext';
export const Account = () => {
  const {bearerToken} = useContext(userContext)

  // console.log(bearerToken)
  const decodedJwt=jwtDecode(bearerToken)
  const name=decodedJwt.sub
  

  return (
    <>
    <p>Welcome {name}</p>
    </>
  )
}
