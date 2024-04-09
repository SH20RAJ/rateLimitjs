import rateLimit from './rateLimit';

export const GET = async (req, res) => {

  if (await rateLimit(req)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ message: 'Hi' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};