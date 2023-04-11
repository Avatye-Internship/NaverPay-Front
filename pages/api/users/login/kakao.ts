import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function socialLogin(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await axios.get(`${process.env.SERVER_API_URL}/api/users/login/kakao`);
    res.send(result.data);
  } catch (error) {
    console.log('sociallogin.ts', error);
  }
}
