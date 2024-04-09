let requestCounter = {};

// Function to reset request counts after 15 minutes
const resetCounters = () => {
  requestCounter = {};
  setTimeout(resetCounters, 15 * 60 * 1000); // Reset every 15 minutes
};

resetCounters(); // Start the timer

export default function rateLimit(handler) {
  return (req, res) => {
    const clientIp = req.socket.remoteAddress;
    requestCounter[clientIp] = requestCounter[clientIp] || 0;

    if (requestCounter[clientIp] >= 100) {
      res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    } else {
      requestCounter[clientIp]++;
      return handler(req, res);
    }
  };
}
