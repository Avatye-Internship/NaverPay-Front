import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function checkEmail(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await axios.post(`${process.env.SERVER_API_URL}/api/users/check/email`, req.body);
    res.send(result.data);
  } catch (error) {
    console.log('email.ts', error);
  }
}
