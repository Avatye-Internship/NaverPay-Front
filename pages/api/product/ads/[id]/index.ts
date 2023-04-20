import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setHeaders } from '../../../../../src/cookie';

const basicUrl = process.env.SERVER_API_URL;

export default async function findProductById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    console.log(`${basicUrl}/api/product/ads/${id}`);
    const result = await axios.get(`${basicUrl}/api/product/ads/${id}`, { headers: setHeaders(req.cookies.accessToken) })
      .then((data) => {
        console.log(data.data);
        return data.data;
      });
    // return res.send(result.data);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
  return res;
}
