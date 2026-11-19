# Footer redesign notes

The site footer has been redesigned to follow the supplied glossy navy reference:

- Five desktop columns: brand/social links, quick links, initiative cards, contact details, and stay connected.
- Layered cyan/navy upper waves with a restrained horizontal drift animation.
- Glass-like initiative tiles with per-area color treatments and hover sheen.
- A custom SVG landscape band with rolling green hills, local/community silhouettes, a gold highlight edge, and a warm cream paper cut.
- Centered Hindi brand seal over the landscape and a cream legal strip below it.
- Responsive single-column / two-column layout for tablets and phones.
- Initiative detail pages use the same footer component so the visual identity is consistent.

## Functional notes

- Main navigation buttons and initiative tiles route to existing site pages.
- Phone and email details use `tel:` and `mailto:` links.
- The email updates field opens a prefilled email request to the organisation address. It does not directly store subscribers; there is no newsletter backend in this project yet.
- Privacy, terms, and cookie links open a prefilled email request because standalone legal policy pages are not present in the supplied project.

## Compact footer refinement

- Tightened the desktop footer's vertical rhythm and reduced the top landscape/signature band height.
- Reworked responsive columns: five columns on wide desktop, three columns on compact desktop, two columns on tablets and phones, and one column on very narrow phones.
- Aligned the Hindi organisation wordmark vertically with the separate emblem and normalized the emblem container size.
- Routed the visible footer headings, quick links, contact location, registration label, subscribe prompt, update labels, and legal labels through the selected language. English mode now keeps all interface copy in English; Hindi mode shows the Hindi equivalents. The official organisation name remains in Hindi as a brand lockup.
- Shortened the brand and stay-connected copy to reduce visual height.
