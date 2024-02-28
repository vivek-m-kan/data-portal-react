import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { ROUTES } from 'src/constants/routes'

export type PGPortalRouteConfig = RouteObject & {
  title?: string
  authRequired?: boolean
}

const Campaign = lazy(() => import('../pages/Campaign'))
const EditCampaign = lazy(() => import('../pages/Campaign/Edit'))
const CreateCampaign = lazy(() => import('../pages/Campaign/Create'))
const Client = lazy(() => import('../pages/Clients'))

const routes: PGPortalRouteConfig[] = [
  {
    path: ROUTES.CAMPAIGN,
    element: <Campaign />,
    authRequired: true,
    title: 'Campaigns'
  },
  {
    path: ROUTES.CREATE_CAMPAIGN,
    element: <CreateCampaign />,
    authRequired: true,
    title: 'Create Campaign'
  },
  {
    path: ROUTES.EDIT_CAMPAIGN,
    element: <EditCampaign />,
    authRequired: true,
    title: 'Edit Campaign'
  },
  {
    path: ROUTES.CLIENTS,
    element: <Client />,
    authRequired: true,
    title: 'Clients'
  }
]

export default routes
