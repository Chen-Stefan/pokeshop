import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'

export const UserContext = createContext<any>({})
export default function UserInfoProvider(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<any>()
  // useEffect will render on every state change
  useEffect(() => {
    axios.get('http://localhost:5000/user', {withCredentials: true}).then(res => {
      setUser(res.data)
    })
  }, [])
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}
