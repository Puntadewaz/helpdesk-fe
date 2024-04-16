import { lazy } from 'react'

const UserRoutes = [
  // User
  {
    path: '/user-management',
    component: lazy(() => import('../../views/user'))
  },
  {
    path: '/user-create',
    component: lazy(() => import('../../views/user-create'))
  },
  {
    path: '/user-details/:id',
    component: lazy(() => import('../../views/user-details'))
  }
]

export default UserRoutes
