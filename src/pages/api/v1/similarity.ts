import { cosineSimilarity } from "@/helpers/cosine-similarity";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { openai } from "@/lib/open-ai";
import { SimilarityApiData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SimilarityApiData>
) => {
  const body = req.body as unknown;

  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res.status(401).json({
      err: true,
      msg: "Authorization key is not provided!",
    });
  }

  try {
    const { text1, text2 } = reqSchema.parse(body);

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });

    if (!validApiKey) {
      return res.status(401).json({
        err: true,
        msg: "Provided api key is invalid!",
      });
    }

    const timeStart = new Date().getTime();

    // const embedding = await Promise.all(
    //   [text1, text2].map(async (text) => {
    //     const res = await openai.createEmbedding({
    //       model: "text-embedding-ada-002",
    //       input: text,
    //     });

    //     return res.data.data[0].embedding;
    //   })
    // );

    // const similarity = cosineSimilarity(embedding[0], embedding[1]);
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    const duration = new Date().getTime() - timeStart;

    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    });

    return res
      .status(200)
      .json({ err: false, msg: { text1, text2, similarity: Math.random() } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        err: true,
        msg: "The data provided for the user is  of incorrect format!",
      });
    }

    console.log(err);
    return res.status(500).json({ err: true, msg: "Internal server error!" });
  }
};

export default withMethods(["POST"], handler);
