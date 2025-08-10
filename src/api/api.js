// src/api/api.js
import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../auth/tokenStore';

// 주소를 그냥 고정
const BASE_URL = 'https://43.201.70.73';
const LOGIN_PATH = '/login';
let refreshPromise = null;

function redirectToLogin() {
  if (typeof window !== 'undefined') window.location.assign(LOGIN_PATH);
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// 요청 시 Access Token 붙이기
api.interceptors.request.use((config) => {
  const access = getAccessToken();
  if (access) {
    config.headers = { ...(config.headers || {}), Authorization: `Bearer ${access}` };
    console.log('[API] Access token attached:', access);
  } else {
    console.log('[API] No access token found');
  }
  return config;
});

// 응답 처리
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error || {};
    if (!response || !config) throw error;

    const url = String(config.url || '');
    const isAuthPath = url.includes('/api/token/') || url.includes('/login') || url.includes('/join');
    const isRefresh = url.includes('/api/token/refresh/');

    // 로그인/회원가입/토큰 요청에서 401이면 바로 로그아웃
    if (response.status === 401 && (config._retry || isAuthPath || isRefresh)) {
      console.warn('[API] 401 after retry or auth path, redirecting to login');
      clearTokens();
      redirectToLogin();
      throw error;
    }

    // 일반 요청에서 401 → 토큰 갱신 시도
    if (response.status === 401) {
      config._retry = true;
      try {
        if (!refreshPromise) {
          console.log('[API] Attempting token refresh');
          refreshPromise = (async () => {
            const refresh = getRefreshToken();
            if (!refresh) throw new Error('no refresh token');
            const r = await axios.post(`${BASE_URL}/api/token/refresh/`, { refresh });
            const { access, refresh: nextRefresh } = r.data || {};
            if (!access) throw new Error('no access after refresh');
            setTokens(access, nextRefresh || refresh);
            console.log('[API] Token refreshed successfully:', access);
            return access;
          })().finally(() => { refreshPromise = null; });
        }
        const newAccess = await refreshPromise;
        config.headers = { ...(config.headers || {}), Authorization: `Bearer ${newAccess}` };
        return api(config);
      } catch (e) {
        console.error('[API] Token refresh failed:', e);
        clearTokens();
        redirectToLogin();
        throw e;
      }
    }

    throw error;
  }
);

export default api;
