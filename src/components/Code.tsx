"use client";

import { FC, useEffect, useState } from "react";
import HighLight, { defaultProps, type Language } from "prism-react-renderer";
import { useTheme } from "next-themes";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import { cn } from "@/lib/utils";

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animated?: boolean;
}

const Code: FC<CodeProps> = ({
  animationDelay,
  language,
  code,
  show,
  animated,
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;

          if (i >= code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [animated, animationDelay, code, show]);

  const lines = text.split(/\r\n|\r|\n/).length;

  const theme = applicationTheme === "light" ? lightTheme : darkTheme;

  return (
    <HighLight {...defaultProps} code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            className,
            "transition-all",
            "w-fit",
            "bg-transparent",
            "duration-100",
            "py-0"
            // "no-scrollbar"
          )}
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0,
          }}
        >
          {tokens.map((line, i) => {
            const { key, ...rest } = getLineProps({ line, key: i });

            return (
              <div key={`line-${i}`} style={{ position: "relative" }} {...rest}>
                {line.map((token, index) => {
                  const { key, ...rest } = getTokenProps({ token, i });

                  return <span key={`tag-${index}`} {...rest}></span>;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </HighLight>
  );
};

export default Code;
