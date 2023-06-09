import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setHeaders } from '../../../../../src/cookie';

const basicUrl = process.env.SERVER_API_URL;

export default async function updatePointByStatus(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    console.log(`${basicUrl}/api/product/ads/${id}/user-status`);
    const result = await axios.patch(`${basicUrl}/api/product/ads/${id}/user-status`, req.query, { headers: setHeaders(req.cookies.accessToken) })
      .then((data) => data.data);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
  return res;
}
