import { createClient } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (
    !process.env.plsgrademe_REST_API_URL ||
    !process.env.plsgrademe_REST_API_TOKEN
  ) {
    return response
      .status(500)
      .json({ error: 'Missing environment variables' });
  }

  const plsgrademe = createClient({
    url: process.env.plsgrademe_REST_API_URL,
    token: process.env.plsgrademe_REST_API_TOKEN,
  });

  if (request.method === 'POST') {
    try {
      const data = request.body;
      console.log('Data:', data);
      const key = generateUUID();
      await plsgrademe.set(key, data); // Store the data with the key
      console.log('Key:', key);
      return response.status(200).json({ key }); // Return the key
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'An error occurred while processing your request' });
    }
  } else if (request.method === 'GET') {
    try {
      const key = request.query.key as string;
      const data = await plsgrademe.get(key); // Retrieve the data using the key
      console.log('Data:', data);
      return response.status(200).json(data);
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'An error occurred while processing your request' });
    }
  } else {
    return response.status(405).json({ error: 'Method not allowed' });