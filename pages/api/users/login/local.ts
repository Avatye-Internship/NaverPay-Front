import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const basicUrl = process.env.SERVER_API_URL;

export default async function localLogin(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await axios.post(`${basicUrl}/api/users/login/local`, req.body, { withCredentials: true });
    const token = result.headers['set-cookie']![0].split(';')[0].substring(12);
    console.log(token);
    res.setHeader('Set-Cookie', `accessToken=${token}; Path=/; SameSite=None; Secure; HttpOnly=true;`);
    res.send(result.data);
  } catch (error) {
    console.log(error);
  }
}
