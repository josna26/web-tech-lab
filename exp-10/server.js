const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  let page = '';

  if (req.url === '/home') {
    page = `
      <h1>Welcome to RoboPulse!</h1>
      <p>Explore the world of AI and Robotics.</p>
      <a href="/about">About Us</a>
    `;
  } else if (req.url === '/about') {
    page = `
      <h1>About RoboPulse</h1>
      <p>RoboPulse is a platform for AI and Robotics projects.</p>
      <p>Our goal is to explore new technologies and innovations.</p>
      <a href="/home">Back to Home</a>
    `;
  } else {
    page = `
      <h1>Welcome to RoboPulse!</h1>
      <p>AI and Robotics Innovation Hub</p>
      <a href="/home">Home</a>
      <a href="/about">About</a>
    `;
  }

  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>RoboPulse</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f6ff;
          color: #234;
          text-align: center;
          margin: 0;
        }

        header {
          background-color: #1769aa;
          color: white;
          padding: 20px;
        }

        main {
          background-color: white;
          max-width: 600px;
          margin: 60px auto;
          padding: 35px;
          border-radius: 10px;
          box-shadow: 0 3px 10px #ccd6e0;
        }

        h1 {
          color: #1769aa;
        }

        header h2 {
          color: white;
          margin: 0;
        }

        p {
          font-size: 17px;
          line-height: 1.6;
        }

        a {
          display: inline-block;
          background-color: #1769aa;
          color: white;
          text-decoration: none;
          padding: 10px 18px;
          margin: 10px 5px;
          border-radius: 5px;
        }

        a:hover {
          background-color: #104b7a;
        }

        footer {
          margin-top: 40px;
          color: #667;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <header>
        <h2>RoboPulse | AI & Robotics</h2>
      </header>

      <main>
        ${page}
        <footer>
          <p>Learning Today, Building Tomorrow!</p>
        </footer>
      </main>
    </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log('RoboPulse server running at http://localhost:3000');
});
