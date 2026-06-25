// netlify/functions/auth.js
// Maneja el OAuth de GitHub para Sveltia CMS / Decap CMS
// Basado en: https://github.com/sveltia/sveltia-cms-auth

export const handler = async (event) => {
  const { code, state } = event.queryStringParameters || {};
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  // Paso 1: Redirigir a GitHub para autorización
  if (!code) {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: `${event.headers['x-forwarded-proto'] || 'https'}://${event.headers.host}/.netlify/functions/auth`,
      scope: 'repo,user',
      state: state || '',
    });
    return {
      statusCode: 302,
      headers: { Location: `https://github.com/login/oauth/authorize?${params}` },
    };
  }

  // Paso 2: Intercambiar code por access_token
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
    });
    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 400,
        body: `<script>window.opener.postMessage('authorization:github:error:${JSON.stringify(data)}', '*')</script>`,
        headers: { 'Content-Type': 'text/html' },
      };
    }

    const token = data.access_token;
    const provider = 'github';
    const content = JSON.stringify({ token, provider });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `<!DOCTYPE html><html><body><script>
        (function() {
          function receiveMessage(e) {
            window.opener.postMessage(
              'authorization:${provider}:success:${content.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
              e.origin
            );
          }
          window.addEventListener('message', receiveMessage, false);
          window.opener.postMessage('authorizing:${provider}', '*');
        })()
      <\/script></body></html>`,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `<script>window.opener.postMessage('authorization:github:error:${err.message}', '*')</script>`,
      headers: { 'Content-Type': 'text/html' },
    };
  }
};
