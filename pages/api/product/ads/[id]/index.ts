import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setHeaders } from '@/src/cookie';

const basicUrl = process.env.SERVER_API_URL;

export default async function findProductById(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.cookies);
  try {
    const { id } = req.query;
    console.log(`${basicUrl}/api/product/ads/${id}`);
    const result = await axios.get(`${basicUrl}/api/product/ads/${id}`, { headers: setHeaders(req.cookies.accessToken) })
      .then((data) => data.data);
    return res.send(result.data);
  } catch (error) {
    console.log(error);
  }
  return res;
}
