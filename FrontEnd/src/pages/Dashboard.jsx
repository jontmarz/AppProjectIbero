import { useState } from 'react'
import { useUserContext } from "../context/UserContext";

export default function Dashboard() {
    const { user, setUser } = useUserContext();

  return (
    <div>Usuario: {user.fullName}</div>
  )
}
