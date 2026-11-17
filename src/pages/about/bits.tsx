import type { CSSProperties, ImgHTMLAttributes, ReactNode } from "react";
import { SHOW_UNCONFIRMED } from "./story";

/** Splits text into word spans so the scroll timeline can reveal them one by one. */
export const Words = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((w, i) => (
      <span className="w" key={i}><span>{w}</span></span>
    ))}
  </>
);
export const Flag = ({ children = "पुष्टि बाकी" }: { children?: ReactNode }) =>
  SHOW_UNCONFIRMED ? <span className="flag">{children}</span> : null;
export const Img = ({ eager: _eager, alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement> & { eager?: boolean }) => (
  <img alt={alt} decoding="async" loading="eager" {...rest} />
);
export const vars = (o: Record<string, string>) => o as CSSProperties;
