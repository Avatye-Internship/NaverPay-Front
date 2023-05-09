import { ConfidentialClientApplication, CryptoProvider } from '@azure/msal-node';
import { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiResponse } from 'next';
import authConfig from '../../src/configs/authConfig';

// 1. handler: 기존 API 핸들러 함수
// 2. options: IronSessionOptions 타입 객체. 쿠키 및 패스워드 정보를 가지고 있음
//  - 2.1. cookieName: 브라우저에 저장되는 쿠키의 이름
//  - 2.2. password: 32자 이상의 비밀번호. 데이터 암호화/복호화에 사용

const options: IronSessionOptions = {
  cookieName: 'reservation-site',
  password: 'VERYYLONGPASSWORDS1ab1323898esda345q6781!',
};

const MsalConfig: any = authConfig.msalConfig;
const msalInstance = new ConfidentialClientApplication(MsalConfig);
const cryptoProvider = new CryptoProvider();

const redirectToAuthCodeUrl = async (
  req: any,
  res: NextApiResponse,
  next: any,
  authCodeUrlRequestParams: any,
  authCodeRequestParams: any,
) => {
  // Generate PKCE Codes before starting the authorization flow
  const { verifier, challenge } = await cryptoProvider.generatePkceCodes();

  // Set generated PKCE codes and method as session vars
  req.session.pkceCodes = {
    challengeMethod: 'S256',
    verifier,
    challenge,
  };

  req.session.authCodeUrlRequest = {
    redirectUri: authConfig.REDIRECT_URI,
    responseMode: 'form_post', // recommended for confidential clients
    codeChallenge: req.session.pkceCodes.challenge,
    codeChallengeMethod: req.session.pkceCodes.challengeMethod,
    ...authCodeUrlRequestParams,
  };

  req.session.authCodeRequest = {
    redirectUri: authConfig.REDIRECT_URI,
    code: '',
    ...authCodeRequestParams,
  };

  // Get url to sign user in and consent to scopes needed for application
  try {
    const authCodeUrlResponse = await msalInstance.getAuthCodeUrl(req.session.authCodeUrlRequest);
    console.log(authCodeUrlResponse);
    console.log(req.session);

    await res.redirect(authCodeUrlResponse);
    // console.log('로그인 성공');
  } catch (error) {
    next(error);
  }
};

async function MsLogin(req: any, res: NextApiResponse, next: any) {
  // GUID(마이크로소프트 계정의 고유 식별자) 생성
  req.session.csrfToken = await cryptoProvider.createNewGuid();
  const state = await cryptoProvider.base64Encode(
    JSON.stringify({
      csrfToken: req.session.csrfToken,
      redirectTo: 'http://localhost:3000/',
    }),
  );

  const authCodeUrlRequestParams = {
    state,
    scopes: [],
  };

  const authCodeRequestParams = {
    scopes: [],
  };

  // trigger the first leg of auth code flow
  return redirectToAuthCodeUrl(
    req,
    res,
    next,
    authCodeUrlRequestParams,
    authCodeRequestParams,
  );
}

export default withIronSessionApiRoute(MsLogin, options);
