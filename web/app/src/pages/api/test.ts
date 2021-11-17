// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { inspect } from "util";

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { body, query, params } = req;
  console.log("/api/hello: ", inspect({ body, query, params }, { showHidden: false, depth: null }));
  res.status(200).json({ name: 'John Doe' });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    }
  }
}