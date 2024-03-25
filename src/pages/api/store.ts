import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';

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
      .json({ error: 'An error occurred while fetching the data', data: (error as Error).message });
  }
}

export async function storeHashData(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  const stringifiedData = JSON.stringify({...data, version: 1});
  const hash = md5(stringifiedData)


  try {
    await kv.set(hash, data);
    res.json({ success: true, hash, data: stringifiedData});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while storing the data', data: (error as Error).message });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getHashData(req, res);
  }

  if (req.method === 'POST') {
    return storeHashData(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
