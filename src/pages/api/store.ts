import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getHashData(req: NextApiRequest, res: NextApiResponse) {
  const { hash } = req.query;
  try {
    const data = await kv.get(hash as string);
    if (!data) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data' });
  }
}

export async function storeHashData(req: NextApiRequest, res: NextApiResponse) {
  const { hash } = req.query;
  const data = req.body;

  try {
    await kv.set(hash as string, data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while storing the data' });
  }
}
