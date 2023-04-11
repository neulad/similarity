"use client";

import { FC, FormEvent, useState } from "react";
import { toast } from "@/ui/Toast";
import { createApiKey } from "@/helpers/create-api-key";
import { cn } from "@/lib/utils";
import { Key } from "lucide-react";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import CopyButton from "@/components/CopyButton";
import { Input } from "@/ui/Input";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";

interface RequestApiKeyProps {}

const RequestApiKey: FC<RequestApiKeyProps> = ({}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const router = useRouter();

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);

      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        return toast({
          title: "Error",
          message: err.message,
          type: "error",
        });
      }

      toast({
        title: "Error",
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={cn("container", "md:max-w-2xl")}>
      <div className={cn("flex", "flex-col", "gap-6", "items-center")}>
        <Key className={cn("mx-auto", "h-12", "w-12", "text-gray-400")} />
        <LargeHeading>Request your API key</LargeHeading>
        <Paragraph>You don&apos;t have a key yet!</Paragraph>
      </div>

      <form
        onSubmit={createNewApiKey}
        className={cn(
          "mt-6",
          "sm:flex",
          "flex",
          "flex-col",
          "sm:flex-row",
          "items-center",
          "justify-between"
        )}
        action="#"
      >
        <div
          className={cn(
            "relative",
            "rounded-md",
            "shadow-dm",
            "sm:min-w-0",
            "sm:flex-1"
          )}
        >
          {apiKey ? (
            <CopyButton
              className={cn(
                "absolute",
                "inset-y-0",
                "right-0",
                "animate-in",
                "fade-in",
                "duration-300"
              )}
              valueToCopy={apiKey}
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here!"
          />
        </div>
        <div className={cn("mt-3", "sm:mt-0", "sm:ml-4", "sm:flex-shrink-0")}>
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
