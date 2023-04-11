
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setHeaders } from '../../../src/cookie';

const basicUrl = process.env.SERVER_API_URL

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    let result;
    switch (req.method) {
        
        // 내 정보 조회
        case 'GET':
            try {
                const result = await axios.get(basicUrl+'/api/users', {headers: setHeaders(req.cookies['accessToken'])})
                return res.send(result.data)
            } catch (error) {
                console.log(error)
            }
            break;
        // 회원가입
        case 'POST':
            try {
                const result = await axios.post(basicUrl+'/api/users', req.body)
                console.log('users.index.ts', result.data)
                return res.send(result.data)
            } catch (error) {
                console.log(error)
            }
            break;
        // 내 정보 수정
        case 'PATCH':
            try {
                result = await axios.patch(basicUrl+'/api/users', req.body)
                return res.send(result)
            } catch (error) {
                console.log(error)
            }
            
            break;
    }
}