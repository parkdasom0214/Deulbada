// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Guide from './pages/guide/Guide';
import CommonLayout from './layout/commonLayout/CommonLayout';
import LoginLayout from './layout/loginLayout/LoginLayout';
import { StyledContainer } from './styles/Container.style';
import NotFound from './pages/notFound/notFound';
import RequireAuth from './auth/RequireAuth';
import { useEffect } from 'react';
import { verifyToken } from './auth/authService';

export default function App() {
  useEffect(() => {
    // 앱 로드될 때 토큰 유효성 검사
    verifyToken();
  }, []);
  return (
    <StyledContainer>
      <Routes>
        {/* 샘플/가이드: 공개 */}
        <Route path="/guide" element={<Guide />} />

        {/* 공개 라우트 */}
        <Route path="/login" element={<LoginLayout page={'login'} />} />
        <Route path="/login-email" element={<LoginLayout page={'loginEmail'} />} />
        <Route path="/join-membership" element={<LoginLayout page={'join-membership'} />} />
        <Route path="/join-producer" element={<LoginLayout page={'join-producer'} />} />

        {/* 루트 접근 시 홈으로 이동 (홈은 보호 처리됨) */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 보호 라우트 묶음: 로그인 필요 */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<CommonLayout page={'home'} />} />
          <Route path="/profile/:account_id" element={<CommonLayout page={'profile'} />} />
          <Route path="/followers" element={<CommonLayout page={'followers'} />} />
          <Route path="/followings" element={<CommonLayout page={'followings'} />} />
          <Route path="/myProfile" element={<CommonLayout page={'myprofile'} />} />
          <Route path="/search" element={<CommonLayout page={'search'} />} />
          <Route path="/chatList" element={<CommonLayout page={'chatList'} />} />
          <Route path="/chat" element={<CommonLayout page={'chat'} />} />
          <Route path="/chatRoom" element={<CommonLayout page={'chatRoom'} />} />
          <Route path="/product" element={<CommonLayout page={'product'} />} />
          <Route path="/editProfile" element={<CommonLayout page={'editProfile'} />} />
          <Route path="/post/:postId" element={<CommonLayout page={'post'} />} />
          <Route path="/profile-settings" element={<CommonLayout page={'profile-settings'} />} />
        </Route>

        {/* 404 */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </StyledContainer>
  );
}
