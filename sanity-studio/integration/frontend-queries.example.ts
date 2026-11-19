import {sanityClient} from './client'

export const PAGE_QUERY = `*[_type == "pageContent" && pageKey == $pageKey && published == true][0]{
  _id, pageKey, pageTitle, heroEyebrow, heroHeading, heroDescription,
  heroImage{asset->{_id,url,metadata{dimensions,lqip}},alt,caption,hotspot,crop},
  heroMobileImage{asset->{_id,url,metadata{dimensions,lqip}},alt,caption,hotspot,crop},
  heroVideoUrl, heroButtonLabel, heroButtonUrl, sections[]{..., image{asset->{_id,url,metadata{dimensions,lqip}},alt,hotspot,crop}, images[]{asset->{_id,url,metadata{dimensions,lqip}},alt,hotspot,crop}, items[]{...,image{asset->{_id,url},alt}}}, seoTitle, seoDescription
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "site-settings"][0]{
  organisationName, logo{asset->{url},alt}, phone, email, address, footerDescription,
  socialLinks, homeMarqueeTitle, homeMarqueeImages[]{image{asset->{url},metadata{lqip}},label,link},
  aboutMarqueeTitle, aboutMarqueeImages[]{image{asset->{url},metadata{lqip}},label,link}
}`

export const VOLUNTEERS_QUERY = `*[_type == "volunteer" && active == true && showPublicly == true] | order(name asc){
  _id,name,slug,role,category,photo{asset->{url,metadata{lqip}},hotspot,crop},bio,quote,targetHours,publicImpact,badges,
  "totalHours": math::sum(*[_type == "volunteerHourEntry" && volunteer._ref == ^._id].hours),
  "recentEntries": *[_type == "volunteerHourEntry" && volunteer._ref == ^._id] | order(date desc)[0...10]{date,activityTitle,hours}
}`

export const MILESTONES_QUERY = `*[_type == "milestoneSettings" && _id == "milestone-settings"][0]{title,milestones[]{hours,name,shortName,description,icon,badgeImage{asset->{url}}}}`

export async function fetchPage(pageKey: string) {
  if (!sanityClient) return null
  return sanityClient.fetch(PAGE_QUERY, {pageKey})
}

export async function fetchSiteSettings() {
  if (!sanityClient) return null
  return sanityClient.fetch(SITE_SETTINGS_QUERY)
}
