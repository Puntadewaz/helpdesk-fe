import { lazy } from 'react'

const TicketRoutes = [
  // Ticket
  {
    path: '/ticket',
    component: lazy(() => import('../../views/ticket'))
  },
  {
    path: '/ticket-details/:id',
    component: lazy(() => import('../../views/ticket-details'))
  },
  {
    path: '/create-ticket',
    component: lazy(() => import('../../views/create-ticket')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  }
]

export default TicketRoutes
