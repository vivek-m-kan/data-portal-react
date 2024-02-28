import React, { useEffect, useState } from 'react'
import { useLocation, Routes, matchRoutes, Route } from 'react-router-dom'
import routes, { PGPortalRouteConfig } from './routes'
import NotFound from 'src/pages/NotFound'
import Login from 'src/pages/login'
import Layout from 'src/layout'
import { PortalLoading } from 'src/components/General'

const AppRouter: React.FC = () => {
  const location = useLocation()
  const { pathname } = location

  const matched = matchRoutes(routes, pathname)?.[0]
  const [matchedRoute, setMatchedRoute] = useState<PGPortalRouteConfig | null>(
    matched ? matched.route : null
  )

  useEffect(() => {
    const routeCheck = () => {
      setMatchedRoute(matched ? matched.route : null)
    }

    routeCheck()
  }, [matched, pathname])

  const RenderRoutes: React.FC = () => {
    return (
      <React.Suspense fallback={<PortalLoading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            {routes.map((route, i) => {
              return <Route key={i} path={route.path} element={route.element} />
            })}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    )
  }

  return <RenderRoutes />
}

export default AppRouter
