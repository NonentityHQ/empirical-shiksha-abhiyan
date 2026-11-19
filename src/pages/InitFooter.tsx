import { Footer, type Page } from "../shared";

// Initiative detail pages use the same organisation footer so the site branding stays consistent.
export default function InitFooter({ go, variant }: { go: (p: Page) => void; variant: string }) {
  return <Footer go={go} variant={variant} />;
}
