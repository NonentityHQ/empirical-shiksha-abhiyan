# Before & After — Sanity se kaise add karein

Impact page ka "Every Week at Rameshwar Kund" wala before/after slider ab Sanity se chalta hai.

## Studio me
1. Studio kholo → left menu me **Before & After (Impact page)**.
2. **Before & After pairs** me **Add item** dabao.
3. Bharo:
   - **BEFORE photo** aur **AFTER photo** (dono same jagah, same angle ki ho to slider sabse achha lagta hai)
   - **Place / title** (e.g. Rameshwar Kund), chhota description, optional date
   - Hindi tab me Hindi text (optional — khali chhodo to English dikhega)
4. **Publish** dabao. Website par apne aap dikh jayega, redeploy nahi karna.

- Order badalne ke liye items ko **drag** karo (pehla item pehle dikhta hai).
- 1 se zyada pair hone par website par arrows + dots aa jate hain, visitor ek se doosre par ja sakta hai.
- Kisi pair ko hide karna ho to us item me **Show on website** band karo; poora section hide karna ho to upar ka toggle.
- Jab tak Sanity me koi pair nahi hai, website ek sample pair dikhati hai (placeholder photos). Pehla real pair publish karte hi wo hat jata hai.

## One-time setup
```bash
# sanity-studio/.env me SANITY_STUDIO_PROJECT_ID, SANITY_API_TOKEN set ho
npm run seed      # before-after-section document bana deta hai (purana data nahi chhoota)
```
Website (root `.env`) me `VITE_SANITY_PROJECT_ID` aur `VITE_SANITY_DATASET` set karo, aur Sanity project ki
API settings me website ka origin CORS me add karo (README step 3).

## Developer notes
- Schema: `sanity-studio/schemas/impact.ts` (`beforeAfterSection` singleton + `beforeAfterItem`)
- Frontend fetch: `src/cms.ts` (`useBeforeAfter`) — plain fetch, koi extra package nahi; fail hone par defaults dikhte hain.
- UI: `src/pages/Impact.tsx` (`BeforeAfterBand`, `BeforeAfterSlider`)
