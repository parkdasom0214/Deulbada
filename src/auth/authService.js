// src/auth/authService.js
import api from '../api/api';
import { setTokens, clearTokens, getAccessToken, setAccountId } from './tokenStore';

/**
 * 로그인 (JWT 발급)
 * 사용법 (둘 다 허용):
 *  - login({ email, password })
 *  - login(email, password)
 * 서버 스펙:
 *  - POST http://43.201.70.73/api/token/
 *  - body: { email, password }
 *  - res: { access, refresh, user?: { account_id, nickname, ... } }
 */
export async function login(arg1, arg2) {
  // 1) 인자 유연 처리
  let email, password;

  if (typeof arg1 === 'object' && arg1 !== null && !Array.isArray(arg1)) {
    // FormData 방지: 평범한 객체만 허용
    ({ email, password } = arg1);
  } else {
    email = arg1;
    password = arg2;
  }

  // 2) 전처리(트림/정규화)
  email = String(email ?? '').trim().toLowerCase();
  password = String(password ?? '').trim();

  // 3) 테스트용 더미 로그인
  if (email === 'test@example.com' && password === 'password123') {
    const access = 'dummy-access-token';
    const refresh = 'dummy-refresh-token';

    const accountId = 'test_account_id';
    
    setTokens(access, refresh, accountId); // account_id 저장
    console.log('[AuthService] Dummy login successful', { access, refresh, accountId });
    return { access, refresh, user: { account_id: accountId } };
  }

  // 4) 기본 검증
  if (!email || !password) {
    throw new Error('이메일과 비밀번호는 필수입니다.');
  }
// 5) 실제 서버 로그인
console.log('[AuthService] Attempting login with:', { email });

// 서버 스펙: POST /api/users/login/ , res: { access, refresh, user_id, email, account_id, message }
const { data } = await api.post(
  '/api/users/login/',
  { email, password },
  { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
);

console.log('[AuthService] Raw server response:', data);

// 토큰/필드 추출
const { access, refresh } = data || {};
if (!access || !refresh) throw new Error('토큰 없음');

// account_id는 루트가 기준(없을 수도 있으니 user 객체도 보조로 확인)
// ⚠️ user_id로 대체하면 안 됩니다(서버의 계정 ID와 내 의미가 다름)
const finalAccountId = data?.account_id ?? data?.user?.account_id ?? undefined;

// 디버그 로그
console.log('[AuthService] Checking account_id:', {
  'data.account_id': data?.account_id,
  'user.account_id': data?.user?.account_id,
  'user.user_id': data?.user?.user_id,
  'user object': data?.user,
});

// 저장: undefined를 넘기면 tokenStore가 기존 account_id를 유지
setTokens(access, refresh, finalAccountId);

console.log('[AuthService] Login successful', { 
  access: access.slice(0, 20) + '...',
  refresh: refresh.slice(0, 20) + '...',
  accountId: finalAccountId,
});

// 호출부 호환용 반환(가능하면 user는 서버 스펙대로 유지)
return {
  access,
  refresh,
  user: { ...(data.user || {}), account_id: finalAccountId, user_id: data?.user_id, email: data?.email },
  message: data?.message,
};
}

/**
 * 사용자 정보 업데이트 (로그인 후 프로필 정보를 받았을 때)
 * @param {object} userInfo - 사용자 정보
 * @param {string} userInfo.account_id - 계정 ID (영문으로만 구성)
 */
export function updateUserInfo(userInfo) {
  // account_id 또는 user_id 중 하나라도 있으면 저장
  const accountId = userInfo?.account_id || userInfo?.user_id;
  if (accountId) {
    setAccountId(accountId);
    console.log('[AuthService] User info updated', { ...userInfo, account_id: accountId });
  }
}

/**
 * 토큰 검증
 * 만료되면 로그아웃 처리, 살아있으면 그대로 유지
 */
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
 * 로그아웃 (클라이언트 토큰 및 사용자 정보 제거)
 */
export function logout() {
  console.log('[AuthService] Logging out');
  clearTokens(); 
}

/**
 * 현재 로그인 상태 확인
 */
export function isLoggedIn() {
  return !!getAccessToken();
}


// 개발환경에서 테스트용
if (typeof window !== 'undefined') {
  window.authTest = {
    login,
    updateUserInfo,
    verifyToken,
    logout,
    isLoggedIn
  };
  console.log('[AuthService] window.authTest 등록됨');
}