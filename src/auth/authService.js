// src/auth/authService.js
// 서버 요구사항 + 테스트용 더미 로그인 유지 + 유연한 인자 처리(객체/위치 인자 모두 지원)
import api from '../api/api';
import { setTokens, clearTokens, getAccessToken } from './tokenStore';

/**
 * 로그인 (JWT 발급)
 * 사용법 (둘 다 허용):
 *  - login({ account_id, password })
 *  - login(account_id, password)
 * 서버 스펙:
 *  - POST http://43.201.70.73/api/token/
 *  - body: { account_id, password }
 *  - res: { access, refresh }
 */
export async function login(arg1, arg2) {
  // 1) 인자 유연 처리
  let account_id, password;
  if (typeof arg1 === 'object' && arg1 !== null) {
    ({ account_id, password } = arg1);
  } else {
    account_id = arg1;
    password = arg2;
  }

  // 2) 전처리(트림) 및 기본값
  account_id = (account_id ?? '').trim();
  password = (password ?? '');

  // 3) 테스트용 더미 로그인 (로컬에서 서버 없이 동작 확인)
  if (account_id === 'test@example.com' && password === 'password123') {
    const access = 'dummy-access-token';
    const refresh = 'dummy-refresh-token';
    setTokens(access, refresh);
    console.log('[AuthService] Dummy login successful. Access:', access, 'Refresh:', refresh);
    return { access, refresh };
  }

  // 4) 기본 검증
  if (!account_id || !password) {
    throw new Error('account_id와 password는 필수입니다.');
  }

  // 5) 실제 서버 로그인
  const { data } = await api.post('/api/token/', { account_id, password });
  const { access, refresh } = data || {};
  if (!access || !refresh) throw new Error('토큰 없음');
  setTokens(access, refresh);
  console.log('[AuthService] Login successful. Access:', access, 'Refresh:', refresh);
  return { access, refresh };
}

  // 6) 만료되면 로그아웃 처리, 살아있으면 그대로 유지.
export async function verifyToken() {
  const token = getAccessToken();
  if (!token) return false;

  try {
    await api.post('/api/token/verify/', { token });
    console.log('[AuthService] Token is valid');
    return true;
  } catch {
    console.warn('[AuthService] Token is invalid or expired');
    clearTokens(); 
    return false;
  }
}

/**
 * 로그아웃 (클라이언트 토큰 제거)
 */
export function logout() {
  console.log('[AuthService] Logging out');
  clearTokens();
}
