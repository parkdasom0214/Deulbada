import styled from 'styled-components';

export const LoginContainer = styled.section`
  background-color: #5CA14E;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const Login = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 198px;
  gap: 24px;
`;

export const Logo = styled.img`
  width: 152px;
`;

export const SocialSection = styled.section`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  max-width: 53.4rem; 
  height: 38%;
  padding-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

export const KakaoButton = styled.button`
  position: relative;
  height: 44px;
  border: 1px solid #F2C94C; 
  border-radius: 44px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 22%);
  max-width: 45rem;
`;

export const KakaoIcon = styled.img`
  position: absolute;
  left: 18px;
`;

export const KakaoText = styled.span`
  color: #767676;
`;

export const GmailButton = styled.button`
  position: relative;
  height: 44px;
  border: 1px solid #767676; 
  border-radius: 44px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 22%);
  max-width: 45rem;
`;

export const GmailIcon = styled.img`
  position: absolute;
  left: 18px;
`;

export const GmailText = styled.span`
  color: #767676;
`;

export const FacebookButton = styled.button`
  position: relative;
  height: 44px;
  border: 1px solid #2D9CDB; 
  border-radius: 44px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 22%);
  max-width: 45rem;
`;

export const FacebookIcon = styled.img`
  position: absolute;
  left: 18px;
`;

export const FacebookText = styled.span`
  color: #767676;
`;

export const AuthLinks = styled.span`
  display: flex;
  justify-content: center;
  color: #767676;
  margin-top: 20px;
`;

export const EmailLogin = styled.span`
`;

export const Signup = styled.span`
  position: relative;
  margin-left: 12px;

  &::before {
    content: '|';
    margin-right: 12px; 
    color: #aaa;
  }
`;
