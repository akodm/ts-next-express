import { NextFunction, Request, Response } from 'express';
import express from 'express';

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.query;

    return res.status(200).send({
      result: true,
      data: text ?? "text is undefined.",
      message: null
    });
  } catch(err) {
    next(err);
  }
});

export default router;