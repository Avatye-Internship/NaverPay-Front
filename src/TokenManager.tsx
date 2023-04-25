// import axios from 'axios';
// import cookie from '@types/react-cookies/index';

// function setToken(accessToken:string) {
//   axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

//   const expires = new Date();
//   expires.setDate(Date.now() + 1000 * 60 * 60 * 24);

//   cookie.save(
//     'accessToken',
//     accessToken,
//     {
//       path: '/',
//       expires,
//       httpOnly: false, // dev/prod 에 따라 true / false 로 받게 했다.
//     },
//   );
// }

// export { setToken };
