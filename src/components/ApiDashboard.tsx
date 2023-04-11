import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import LargeHeading from "@/ui/LargeHeading";
import { cn } from "@/lib/utils";
import Paragraph from "./ui/Paragraph";
import { Input } from "./ui/Input";
import Table from "@/ui/Table";
import ApiKeyOptions from "@/components/ApiKeyOptions";

interface ApiDashboardProps {}

const ApiDashboard = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const apiKeys = await db.apiKey.findMany({
    where: { userId: session.user.id },
  });
  const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activeApiKey) notFound();

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });
  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return (
    <div className={cn("container", "flex", "flex-col", "gap-6")}>
      <LargeHeading>Welcome back, {session.user.name}!</LargeHeading>
      <div
        className={cn(
          "flex",
          "flex-col",
          "md:flex-row",
          "gap-4",
          "justify-center",
          "md:justify-start",
          "items-center"
        )}
      >
        <Paragraph>Your API key: </Paragraph>
        <Input
          className={cn("w-fit", "truncate")}
          readOnly
          value={activeApiKey.key}
        />
        <ApiKeyOptions
          apiKeyId={activeApiKey.id}
          apiKeyKey={activeApiKey.key}
        />
      </div>

      <Paragraph className={cn("text-center", "md:text-left", "mt-4", "-mb-4")}>
        Your API history:
      </Paragraph>

      <Table userRequests={serializableRequests} />
    </div>
  );
};

export default ApiDashboard;
