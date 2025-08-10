import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { isAuthenticated } from './tokenStore';

export default function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  // 중첩 라우팅(그룹) 사용 시
  if (!children) return <Outlet />;
  return children;
}