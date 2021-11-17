// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from "next-http-proxy-middleware";
import { getCsrfToken } from "next-auth/client"

// to use file stream
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies, method, query, body } = req;
  const tokenServer = await getCsrfToken({ req })
  const tokenClient = cookies['next-auth.csrf-token']

  // auth
  const authMethods = [
    "POST",
    "DELETE"
  ]
  const shouldCheckAuth = !method || authMethods.includes(method);
  const isAuthorized = tokenServer && tokenClient && tokenClient.startsWith(tokenServer);

  console.log({ method, shouldCheckAuth, isAuthorized, tokenServer, tokenClient, query, body });

  if ( shouldCheckAuth && !isAuthorized ) {
    res.status(400).send("접근 권한이 없습니다")
  }

  // proxy rule
  return httpProxyMiddleware(req, res, {
    target: "http://nginx/express",
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: [
      { patternStr: "^/api/express", replaceStr: "" }
    ],
  })
}
