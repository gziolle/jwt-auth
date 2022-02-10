import { Response } from "express";

const COOKIE_NAME = "jid";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(COOKIE_NAME, token, {
    path: "/refresh_token",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};
