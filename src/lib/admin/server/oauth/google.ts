export const getOAuthGoogleUrl = () => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  
  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/auth/callback/google`
      : 'http://localhost:3000/api/admin/auth/callback/google',
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

export async function getGoogleOAuthTokens({ code }: { code: string }) {
  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirect_uri: process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/auth/callback/google`
      : 'http://localhost:3000/api/admin/auth/callback/google',
    grant_type: 'authorization_code',
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(values),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Google OAuth Tokens');
  }

  return res.json();
}

export async function getGoogleUser({ id_token, access_token }: { id_token: string; access_token: string }) {
  const res = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Google User');
  }

  return res.json();
}
