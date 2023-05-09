import session from 'express-session';

const sessionMiddleware = session({
  secret: process.env.EXPRESS_SESSION_SECRET!, // 비밀 키
  resave: false, // 세션을 매번 강제로 저장하지 않음
  saveUninitialized: true, // 초기화되지 않은 세션도 저장
  cookie: {
    httpOnly: true, // 클라이언트에서 쿠키를 읽을 수 없도록 설정
    secure: false, // HTTPS에서만 쿠키 전송
  },
});

export default sessionMiddleware;
