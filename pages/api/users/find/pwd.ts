import { NextApiRequest, NextApiResponse } from 'next';
import Axios from '../..';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await Axios.patch('/api/users/find/pwd', {
      email: 'ngm9464@gmail.com',
      newPwd: '123456789s',
    });
    console.log(result.data);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
