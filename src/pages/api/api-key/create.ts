import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { z } from "zod";
import { withMethods } from "@/lib/api-middlewares/with-methods";

type Data = {
  err: boolean;
  msg: any;
};

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );

    if (!user) {
      return res.status(401).json({
        err: true,
        msg: "Unauthorized. Abort.",
      });
    }

    const existingApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });

    if (existingApiKey) {
      return res
        .status(400)
        .json({ err: true, msg: "You already have a valid API key!" });
    }

    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });

    return res.status(200).json({ err: false, msg: createdApiKey });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        err: true,
        msg: err.message,
      });
    }

    return res.status(500).json({ err: true, msg: err });
  }
};

export default withMethods(["GET"], handler);
