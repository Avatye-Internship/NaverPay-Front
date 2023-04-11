import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { useCookies } from 'react-cookie';

const basicUrl = process.env.SERVER_API_URL


export default async function localLogin(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await axios.post(basicUrl+'/api/users/login/local', req.body)
        res.send(result.data)
    } catch (error) {
        console.log(error)
    }
    
}