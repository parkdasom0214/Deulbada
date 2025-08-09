import * as Styled from './Login.style';
import { Link } from 'react-router-dom';
import logoSymbolWhite from '../../assets/images/logo-symbol-white.png';
import kakaoIcon from '../../assets/images/kakao-icon.png';
import gmailIcon from "../../assets/images/gmail-icon.png";
import faceBookIcon from '../../assets/images/facebook-icon.png';


const Login = () => {
  return (
    <Styled.LoginContainer>
      <Styled.Login>
        <Styled.Logo src={logoSymbolWhite} alt="들바다 로고" />
        <Styled.SocialSection>

            <Styled.KakaoButton>
              <Styled.KakaoIcon src={kakaoIcon} alt="카카오 로고" />
              <Styled.KakaoText>카카오톡 계정으로 로그인</Styled.KakaoText>
            </Styled.KakaoButton>

            <Styled.GmailButton>
              <Styled.GmailIcon src={gmailIcon} alt="구글 로고" />
              <Styled.GmailText>구글 계정으로 로그인</Styled.GmailText>
            </Styled.GmailButton>

            <Styled.FacebookButton>
              <Styled.FacebookIcon src={faceBookIcon} alt="페이스북 로고" />
              <Styled.FacebookText>페이스북 계정으로 로그인</Styled.FacebookText>
            </Styled.FacebookButton>

            <Styled.AuthLinks>
              <Link to="/login-email">
                <Styled.EmailLogin>이메일로 로그인</Styled.EmailLogin>
              </Link>
              <Link to="/join-membership">
                <Styled.Signup>회원가입</Styled.Signup>
              </Link>
            </Styled.AuthLinks>

        </Styled.SocialSection>
      </Styled.Login>
    </Styled.LoginContainer>
  );
};
export default Login;
