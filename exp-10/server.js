const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  if (req.url === '/home') {
    res.end(`
      <h1>Welcome to RoboPulse Home!</h1>
      <p>Explore AI and Robotics innovation.</p>
    `);
  } else if (req.url === '/about') {
    res.end(`
      <h1>About RoboPulse</h1>
      <p>RoboPulse is a hub for AI and Robotics projects.</p>
    `);
  } else {
    res.end(`
      <h1>Welcome to RoboPulse!</h1>
      <p>Visit /home or /about to explore.</p>
    `);
  }
});

server.listen(3000, () => {
  console.log('RoboPulse server running at http://localhost:3000');
});