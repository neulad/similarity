import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Similarity API | Home",
  description: "Free & open-source text similarity API",
};

export default function Home() {
  return (
    <div
      className={cn(
        "relative",
        "h-screen",
        "flex",
        "items-center",
        "justify-center",
        "overflow-x-hidden"
      )}
    >
      <div
        className={cn(
          "container",
          "pt-32",
          "max-w-7xl",
          "mx-auto",
          "w-full",
          "h-full"
        )}
      >
        <div
          className={cn(
            "h-full",
            "gap-6",
            "flex",
            "flex-col",
            "justify-start",
            "lg:justify-center",
            "items-center",
            "lg:items-start"
          )}
        >
          <LargeHeading
            size="lg"
            className={cn("three-d", "text-black", "dark:text-light-gold")}
          >
            Easily determine <br /> text similarity.
          </LargeHeading>

          <Paragraph className={cn("max-w-xl", "lg:text-left")}>
            Simmilarity helps you with determining the similarities between two
            text passages{" "}
            <Link
              href="/login"
              className={cn(
                "underline",
                "underline-offset-2",
                "text-black",
                "dark:text-light-gold"
              )}
            >
              API key
            </Link>
            .
          </Paragraph>

          <div
            className={cn(
              "relative",
              "w-full",
              "max-w-lg",
              "lg:max-w-3xl",
              "lg:left-1/2",
              "aspect-square",
              "lg:absolute"
            )}
          >
            <Image
              priority
              className={cn("img-shadow")}
              quality={100}
              style={{ objectFit: "contain" }}
              fill
              src="/typewriter.png"
              alt="typewriter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
