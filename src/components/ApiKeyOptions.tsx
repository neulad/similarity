"use client";

import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/ui/DropdownMenu";
import Button from "@/ui/Button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/ui/Toast";
import { useRouter } from "next/navigation";
import { createApiKey } from "@/helpers/create-api-key";
import { revokeApiKey } from "@/helpers/revoke-api-key";

interface ApiKeyOptionsProps {
  apiKeyId: string;
  apiKeyKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyKey, apiKeyId }) => {
  const [isRevoking, setIsRevoking] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const router = useRouter();

  const createNewApiKey = async () => {
    setIsCreatingNew(true);

    try {
      await revokeApiKey({ keyId: apiKeyId });
      await createApiKey();

      router.refresh();
    } catch (err) {
      toast({
        title: "Error creating API  key",
        message: "Please try again later.",
        type: "error",
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);

    try {
      await revokeApiKey({ keyId: apiKeyId });

      router.refresh();
    } catch (err) {
      toast({
        title: "Error revoking API  key",
        message: "Please try again later.",
        type: "error",
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant="ghost" className={cn("flex", "gap-2", "items-center")}>
          <p>
            {isCreatingNew
              ? "Creating new key"
              : isRevoking
              ? "Revoking key"
              : "Options"}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className={cn("animate-spin", "h-4", "w-4")} />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClickCapture={() => {
            navigator.clipboard.writeText(apiKeyKey);

            toast({
              title: "copied",
              message: "API key copied to clipboard",
              type: "success",
            });
          }}
        >
          Copy
        </DropdownMenuItem>

        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
