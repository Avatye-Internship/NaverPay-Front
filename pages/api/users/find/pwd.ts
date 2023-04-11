
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function findByPwd(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await axios.patch(process.env.SERVER_API_URL+'/api/users/find/pwd', req.body)
        res.send(result.data)
    } catch (error) {
        console.log('pwd.ts', error)
    }
    
}
