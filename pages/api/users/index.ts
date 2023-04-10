
import { NextApiRequest, NextApiResponse } from 'next';

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        // 내 정보 조회
        case 'GET':
            const result = await fetch('/api')
            res.send(result)
            break;
        // 회원가입
        case 'POST':
            break;
        // 내 정보 수정
        case 'PATCH':
            break;
    }
}