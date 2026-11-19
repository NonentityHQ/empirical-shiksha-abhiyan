import type { CSSProperties, ImgHTMLAttributes, ReactNode } from "react";
import { SHOW_UNCONFIRMED } from "./story";
import { useLang } from "../../lang";

/**
 * English uses per-word spans for the cinematic reveal. On translated pages,
 * render each complete sentence as one text node so the local Hindi
 * dictionary can match the full sentence without fragmenting its meaning.
 */
export const Words = ({ text }: { text: string }) => {
  const language = useLang();
  if (language !== "en") {
    return <span className="words-source" lang="hi" translate="yes">{text}</span>;
  }
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span className="w" key={i}><span>{w}</span></span>
      ))}
    </>
  );
};
export const Flag = ({ children = "पुष्टि बाकी" }: { children?: ReactNode }) =>
  SHOW_UNCONFIRMED ? <span className="flag">{children}</span> : null;
export const Img = ({ eager: _eager, alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement> & { eager?: boolean }) => (
  <img alt={alt} decoding="async" loading="eager" {...rest} />
);
export const vars = (o: Record<string, string>) => o as CSSProperties;
