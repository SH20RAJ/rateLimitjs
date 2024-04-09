
let time = 5 * 1000 ;
let requestlimit = 10; // 10 requests per 5 second limit

let requestCounter = {};

const resetCounters = () => {
  requestCounter = {};
  setTimeout(resetCounters,  time); 
};
resetCounters(); // Start the timer


export const GET = async (req) => {

  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  const clientIp = ({ip}).ip;
  console.log("ippx",clientIp);

  requestCounter[clientIp] = requestCounter[clientIp] || 0;

  if (requestCounter[clientIp] >= requestlimit) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    requestCounter[clientIp]++;
    return new Response(JSON.stringify({ message: 'hi - ' + clientIp }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
