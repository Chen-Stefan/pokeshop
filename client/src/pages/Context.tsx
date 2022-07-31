import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'

export const myContext = createContext<any>({})
export default function Context(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<any>()
  // useEffect will render on state changes
  useEffect(() => {
    axios.get('http://localhost:5000/user', {withCredentials: true}).then(res => {
      setUser(res.data)
    })
  }, [])
  return (
    <myContext.Provider value={user}>{props.children}</myContext.Provider>
  )
}
