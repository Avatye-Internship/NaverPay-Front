import axios from 'axios';
import { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiResponse, NextApiRequest } from 'next';

const options: IronSessionOptions = {
  cookieName: 'reservation-site',
  password: 'VERYYLONGPASSWORDS1ab1323898esda345q6781!',
};
async function AuthRedirect(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);
  console.log('authRedirect 도착');
  try {
    const result = await axios.post('http://localhost:8000/auth/redirect').then((data) => data);
    res.send(result.data);
  } catch (error) {
    console.log('AuthRedirect.ts', error);
  }
}
export default withIronSessionApiRoute(AuthRedirect, options);
