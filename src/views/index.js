import React, { Suspense, useEffect, useState } from 'react';
import { Loading } from 'components/shared';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from 'components/route/ProtectedRoute';
import PublicRoute from 'components/route/PublicRoute';
import AuthorityGuard from 'components/route/AuthorityGuard';
import PageContainer from 'components/template/PageContainer';
import AppRoute from 'components/route/AppRoute';
import {
  publicRoutes,
  protectedRoutesDistricts,
  protectedRoutesRegions,
  protectedRoutesRepublic,
  protectedRoutesSchools,
} from 'configs/routes.config';

const AllRoutes = (props) => {
  const [entryUrl, setEntryUrl] = useState('');
  const userAuthority = useSelector((state) => state.auth.user.authority);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    switch (user.user_type) {
      case 'MAKTAB':
        setEntryUrl('/school-dashboard');
        break;
      case 'TUMAN':
        setEntryUrl('/district-dashboard');
        break;
      case 'VILOYAT':
        setEntryUrl('/region-dashboard');
        break;
      case 'RESPUBLIKA':
        setEntryUrl('/republic-dashboard');
        break;
      default:
        setEntryUrl('/');
    }
  }, [user.user_type]);

  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute />}>
        <Route path='/' element={<Navigate replace to={entryUrl} />} />

        {user.user_type === 'RESPUBLIKA' &&
          protectedRoutesRepublic.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={
                <AuthorityGuard
                  userAuthority={userAuthority}
                  authority={route.authority}
                >
                  <PageContainer {...props} {...route.meta}>
                    <AppRoute
                      routeKey={route.key}
                      component={route.component}
                      {...route.meta}
                    />
                  </PageContainer>
                </AuthorityGuard>
              }
            />
          ))}

        {user.user_type === 'VILOYAT' &&
          protectedRoutesRegions.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={
                <AuthorityGuard
                  userAuthority={userAuthority}
                  authority={route.authority}
                >
                  <PageContainer {...props} {...route.meta}>
                    <AppRoute
                      routeKey={route.key}
                      component={route.component}
                      {...route.meta}
                    />
                  </PageContainer>
                </AuthorityGuard>
              }
            />
          ))}

        {user.user_type === 'TUMAN' &&
          protectedRoutesDistricts.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={
                <AuthorityGuard
                  userAuthority={userAuthority}
                  authority={route.authority}
                >
                  <PageContainer {...props} {...route.meta}>
                    <AppRoute
                      routeKey={route.key}
                      component={route.component}
                      {...route.meta}
                    />
                  </PageContainer>
                </AuthorityGuard>
              }
            />
          ))}

        {user.user_type === 'MAKTAB' &&
          protectedRoutesSchools.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={
                <AuthorityGuard
                  userAuthority={userAuthority}
                  authority={route.authority}
                >
                  <PageContainer {...props} {...route.meta}>
                    <AppRoute
                      routeKey={route.key}
                      component={route.component}
                      {...route.meta}
                    />
                  </PageContainer>
                </AuthorityGuard>
              }
            />
          ))}

        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>

      <Route path='/' element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

const Views = (props) => {
  return (
    <Suspense fallback={<Loading loading={true} />}>
      <AllRoutes {...props} />
    </Suspense>
  );
};

export default Views;
