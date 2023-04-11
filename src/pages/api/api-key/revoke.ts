import { withMethods } from "@/lib/api-middlewares/with-methods";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { RevokeApiData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RevokeApiData>
) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );

    if (!user) {
      return res
        .status(401)
        .json({ err: true, msg: "Unauthorized. Aborting." });
    }

    const validApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });

    if (!validApiKey) {
      return res.status(500).json({
        err: true,
        msg: "The user doesn't posess any valid keys!",
      });
    }

    await db.apiKey.update({
      where: {
        id: validApiKey.id,
      },
      data: {
        enabled: false,
      },
    });

    return res
      .status(200)
      .json({ err: false, msg: "The key is revoked successfully!" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ err: true, msg: err.message });
    }

    return res.status(500).json({ err: true, msg: "Internal server error!" });
  }
};

export default withMethods(["POST"], handler);
