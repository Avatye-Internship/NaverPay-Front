import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setHeaders } from '../../../src/cookie';

const basicUrl = process.env.SERVER_API_URL;

export default async function findProductById(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('req.query ', req.query)
    const { category } = req.query;
    console.log(`${basicUrl}/api/product?category=${category}`);
    const result = await axios.get(`${basicUrl}/api/product?category=${category}`, { headers: setHeaders(req.cookies.accessToken) })
      .then((data) => data.data);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
  return res;
}
