const fs = require('fs').promises;
const path = require('path');

// Function to read and serve static files
async function serveStaticFile(filePath, contentType) {
  try {
    const fullPath = path.join(__dirname, '../../public', filePath);  // Resolve correct path
    console.log("Looking for file at:", fullPath);  // Log the file path

    const data = await fs.readFile(fullPath);  // Read file content
    return {
      statusCode: 200,
      headers: { 'Content-Type': contentType },
      body: data.toString('utf-8'),
    };
  } catch (error) {
    console.error("Error loading static file:", error);  // Error handling
    return { statusCode: 500, body: 'Error loading file' };
  }
}

exports.handler = async (event) => {
  const { path: route } = event;  // Get the requested route
  console.log("Route:", route);  // Log the route for debugging

  // Return about.html if the route is "/about"
  if (route === '/about') {
    return await serveStaticFile('about.html', 'text/html');
  } 
  else {
    console.log("Route does not match, returning notFound.html");
    return await serveStaticFile('notFound.html', 'text/html'); // Return notFound.html for other routes
  }
};
