import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function checkEmailPwd(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await axios.post(`${process.env.SERVER_API_URL}/api/users/check/email`, req.body)
      .then((data) => {
        console.log(data);
        return data;
      });
    res.send(result.data);
  } catch (error) {
    console.log('email.ts', error);
  }
}
