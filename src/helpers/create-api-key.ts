export async function createApiKey() {
  const res = await fetch("/api/api-key/create");
  const data = (await res.json()) as { err: boolean; msg: any };

  if (data.err || !data.msg) {
    console.log(data.err);
    throw new Error(data.msg ?? "Something went wrong!");
  }

  return data.msg.key;
}
