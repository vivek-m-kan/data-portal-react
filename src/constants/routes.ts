import {
  Campaign,
  Dataset,
  People
  // SvgIconComponent
} from '@mui/icons-material'

// interface TopLinksProps {
//   title: string
//   route: string
//   icon: SvgIconComponent
// }

export const ROUTES = {
  DASHBOARD: '/campaigns',
  CAMPAIGN: '/campaigns',
  EDIT_CAMPAIGN: '/campaigns/:id',
  CREATE_CAMPAIGN: '/campaigns/create',
  CLIENTS: '/clients'
}

export const TOP_LINKS = [
  {
    title: 'Campaigns',
    route: ROUTES.CAMPAIGN,
    icon: Campaign,
    connectedRoutes: [ROUTES.EDIT_CAMPAIGN, ROUTES.CREATE_CAMPAIGN]
  },
  {
    title: 'Clients',
    route: ROUTES.CLIENTS,
    icon: People,
    connectedRoutes: []
  },
  { title: 'Leads', route: '/leads', icon: Dataset, connectedRoutes: [] }
]
