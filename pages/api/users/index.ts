import { NextApiRequest, NextApiResponse } from 'next';

const basicUrl = process.env.SERVER_API_URL;
export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  let result;
  switch (req.method) {
    // 내 정보 조회
    case 'GET':
      result = await fetch(`${basicUrl}/api/users`);
      res.send(result);
      break;
      // 회원가입
    case 'POST':
      result = await fetch(`${basicUrl}/api/users`);
      break;
      // 내 정보 수정
    case 'PATCH':
      result = await fetch(`${basicUrl}/api/users`);
      break;
    default:
  }
}
