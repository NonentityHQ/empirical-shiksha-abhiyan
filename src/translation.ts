import { SUPPORTED_CODES, translateFor } from "./locales";

type TextRecord = { source: string; translated: string };
type AttributeRecord = { source: string; translated: string };

const TEXT_SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH", "CODE", "PRE"]);
const ATTRIBUTES = ["placeholder", "aria-label", "title", "alt"] as const;
const textRecords = new Map<Text, TextRecord>();
const attributeRecords = new Map<Element, Map<string, AttributeRecord>>();
let observer: MutationObserver | null = null;
let activeLanguage = "en";
let applyingTranslation = false;

function isProtected(element: Element | null): boolean {
  let current = element;
  while (current) {
    if (current.matches(".notranslate, [translate='no'], [data-translation-ignore]")) return true;
    current = current.parentElement;
  }
  return false;
}

function hasSkippedAncestor(element: Element | null): boolean {
  let current = element;
  while (current) {
    if (TEXT_SKIP_TAGS.has(current.tagName)) return true;
    current = current.parentElement;
  }
  return false;
}

function cleanSource(value: string) {
  const match = value.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match) return null;
  const [, leading, content, trailing] = match;
  if (!content || content.length < 2 || !/\p{L}/u.test(content)) return null;
  if (/^(https?:\/\/|www\.)/i.test(content) || /^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(content)) return null;
  if (/^[\d\s.,:;_+%$₹€£()/#-]+$/.test(content)) return null;
  return { leading, content, trailing };
}

function translateText(source: string): string | null {
  const parsed = cleanSource(source);
  if (!parsed) return null;
  const translated = translateFor(activeLanguage, parsed.content);
  return translated ? `${parsed.leading}${translated}${parsed.trailing}` : null;
}

function addTextNode(node: Text) {
  if (activeLanguage === "en" || applyingTranslation || !node.isConnected) return;
  const parent = node.parentElement;
  if (!parent || isProtected(parent) || hasSkippedAncestor(parent)) return;
  const existing = textRecords.get(node);
  if (existing && node.data === existing.translated) return;
  const source = existing && node.data === existing.source ? existing.source : node.data;
  const translated = translateText(source);
  if (!translated || translated === source) return;
  textRecords.set(node, { source, translated });
  applyingTranslation = true;
  node.data = translated;
  applyingTranslation = false;
}

function attributeRecordsFor(element: Element) {
  let records = attributeRecords.get(element);
  if (!records) {
    records = new Map<string, AttributeRecord>();
    attributeRecords.set(element, records);
  }
  return records;
}

function addElementAttributes(element: Element) {
  if (activeLanguage === "en" || !element.isConnected || isProtected(element) || TEXT_SKIP_TAGS.has(element.tagName)) return;
  for (const attribute of ATTRIBUTES) {
    const currentValue = element.getAttribute(attribute);
    if (!currentValue) continue;
    const records = attributeRecordsFor(element);
    const existing = records.get(attribute);
    if (existing && currentValue === existing.translated) continue;
    const source = existing && currentValue === existing.source ? existing.source : currentValue;
    const translated = translateText(source);
    if (!translated || translated === source) continue;
    records.set(attribute, { source, translated });
    applyingTranslation = true;
    element.setAttribute(attribute, translated);
    applyingTranslation = false;
  }
}

function scanNode(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    addTextNode(root as Text);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
  const element = root.nodeType === Node.ELEMENT_NODE ? root as Element : null;
  if (element && (isProtected(element) || TEXT_SKIP_TAGS.has(element.tagName))) return;
  if (element) addElementAttributes(element);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || isProtected(parent) || hasSkippedAncestor(parent)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let current: Node | null;
  while ((current = walker.nextNode())) addTextNode(current as Text);
  if (element) element.querySelectorAll("*").forEach(addElementAttributes);
}

function restoreTranslations() {
  applyingTranslation = true;
  textRecords.forEach((record, node) => {
    if (node.isConnected && node.data === record.translated) node.data = record.source;
  });
  textRecords.clear();
  attributeRecords.forEach((records, element) => {
    if (!element.isConnected) return;
    records.forEach((record, attribute) => {
      if (element.getAttribute(attribute) === record.translated) element.setAttribute(attribute, record.source);
    });
  });
  attributeRecords.clear();
  applyingTranslation = false;
}

export function setTranslationLanguage(language: string) {
  const next = SUPPORTED_CODES.has(language) ? language : "en";
  if (next === activeLanguage) {
    refreshTranslations();
    return;
  }
  if (activeLanguage !== "en") restoreTranslations(); // switching hi <-> mr: reset to English source first
  if (next === "en") {
    activeLanguage = "en";
    restoreTranslations();
    document.documentElement.lang = "en";
    return;
  }
  activeLanguage = next;
  document.documentElement.lang = next;
  refreshTranslations();
}

/** Rescan after React commits or client-side route changes. */
export function refreshTranslations(root: Node = document.body) {
  if (activeLanguage === "en" || !root) return;
  scanNode(root);
}

/** Start the local, curated English-to-Hindi translator. No API key or network request is used. */
export function startTranslationObserver(language: string) {
  activeLanguage = SUPPORTED_CODES.has(language) ? language : "en";
  document.documentElement.lang = activeLanguage;
  if (observer) observer.disconnect();
  observer = new MutationObserver((mutations) => {
    if (activeLanguage === "en" || applyingTranslation) return;
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData") addTextNode(mutation.target as Text);
      if (mutation.type === "attributes" && mutation.target.nodeType === Node.ELEMENT_NODE) addElementAttributes(mutation.target as Element);
      mutation.addedNodes.forEach(scanNode);
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...ATTRIBUTES],
  });
  refreshTranslations(document.body);
}
