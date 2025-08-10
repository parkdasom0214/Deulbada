import * as Styled from './LoginEmail.style';
import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../auth/authService';


export default function LoginEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/home';

  const [account_id, setAccount_id] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v?.trim() || '');

  const validate = () => {
    const next = {};
    if (!account_id || !isValidEmail(account_id)) next.email = '올바른 이메일 주소를 입력해주세요.';
    if (!password || password.length < 8) next.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const canSubmit = useMemo(() => !loading && account_id && password && isValidEmail(account_id) && password.length >= 8, [loading, account_id, password]);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!validate() || loading) return;

    try {
      setLoading(true);
      // authService.login은 토큰 저장까지 책임집니다.
      await login(account_id, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.message || '이메일 또는 비밀번호가 올바르지 않습니다.';
      setErrors((prev) => ({ ...prev, form: msg }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit} noValidate>
      <Styled.H2>로그인</Styled.H2>

      {errors.form && <Styled.Error style={{ marginBottom: 8 }}>{errors.form}</Styled.Error>}

      <Styled.InputGroup>
        <Styled.Label htmlFor="email">이메일</Styled.Label>
        <Styled.InputEmail
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          value={account_id}
          onChange={(e) => setAccount_id(e.target.value)}
          autoComplete="username"
          inputMode="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <Styled.Error id="email-error">{errors.email}</Styled.Error>
        )}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="password">비밀번호</Styled.Label>
        <Styled.InputPassword
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {errors.password && (
          <Styled.Error id="password-error">{errors.password}</Styled.Error>
        )}
      </Styled.InputGroup>

      <Styled.Button type="submit" disabled={!canSubmit} aria-busy={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </Styled.Button>

      <Link to="/join-membership">
        <Styled.Signup>이메일로 회원가입</Styled.Signup>
      </Link>
    </Styled.Form>
  );
}
