import connect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

export const getNextConnect = (attachParams: boolean) => {
  return connect<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
      console.error(err);
      res.status(500).send(err.toString());
    },
    onNoMatch: (req, res, next) => {
      res.status(404).send("Page not found");
    },
    attachParams: attachParams
  });
}
