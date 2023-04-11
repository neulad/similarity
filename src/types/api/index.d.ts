import { ApiKey } from "@prisma/client";
import { type ZodIssue } from "zod";

export interface CreateApiData {
  err: boolean;
  msg: any;
}

export interface RevokeApiData {
  err: boolean;
  msg: any;
}

export interface SimilarityApiData {
  err: boolean;
  msg: any;
}
