import React from 'react'
import { Navigate, useLocation } from 'react-router';
import { useUser } from '~/features/auth/api/use-auth'

interface Props {
  children: React.ReactNode;
}

const PublicRoute = ({children}: Props) => {
  const {data: user, isLoading, isError} = useUser();
  const location = useLocation();

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(user && !isError) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return (
    children
  )
}

export default PublicRoute