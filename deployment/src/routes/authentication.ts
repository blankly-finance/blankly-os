import { Request, Response, Router } from 'express';
import axios from 'axios';
import {ensureNamespace} from '../utility/kubernetes'

const router = Router();

router.post('/token', async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken.toString();
  const endpoint = `https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`
  try {
    const response = await axios.post(endpoint, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });
    const idToken = response.data.id_token;

    // This calls kubernetes to create the UID namespace
    await ensureNamespace(response.data.user_id)

    res.send(JSON.stringify({ idToken, status: 'success', data: { ...response.data }})) 
  } catch {
    res.status(401).send('Error');
  }
});


export default router
