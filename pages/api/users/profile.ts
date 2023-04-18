import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setHeaders } from '@/src/cookie';

const basicUrl = process.env.SERVER_API_URL;

export default async function findUserProfile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await axios.get(`${basicUrl}/api/users/profile`, { headers: setHeaders(req.cookies.accessToken) })
      .then((data) => data.data);
    // return res.send(result.data);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
  return res;
}
