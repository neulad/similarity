import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import ApiDashboard from "@/components/ApiDashboard";
import RequestApiKey from "@/components/RequestApiKey";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Simillarity API | Dashboard",
  description: "Free & open-source text similarity api",
};

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return notFound();

  const apiKey = await db.apiKey.findFirst({
    where: { userId: session.user.id, enabled: true },
  });

  return (
    <div className={cn("max-w-7xl", "mx-auto", "mt-16")}>
      {apiKey ? (
        // @ts-expect-error Server Component
        <ApiDashboard />
      ) : (
        <RequestApiKey />
      )}
    </div>
  );
};

export default page;
