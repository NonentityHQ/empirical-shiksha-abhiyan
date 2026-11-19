import type {StructureResolver} from 'sanity/structure'
import {HomeIcon} from '@sanity/icons/Home'
import {UsersIcon} from '@sanity/icons/Users'
import {ImagesIcon} from '@sanity/icons/Images'
import {StarIcon} from '@sanity/icons/Star'
import {ChartUpwardIcon} from '@sanity/icons/ChartUpward'
import {DocumentIcon} from '@sanity/icons/Document'
import {CogIcon} from '@sanity/icons/Cog'
import {ComposeIcon} from '@sanity/icons/Compose'

const pageItems = [
  ['home', 'Home Page'], ['about', 'About Us'], ['initiatives', 'Our Initiatives'],
  ['impact', 'Impact'], ['gallery', 'Gallery'], ['success', 'Success Stories'],
  ['stars', 'Our Stars'], ['contact', 'Contact Us'], ['reports', 'Reports'],
] as const

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Empirical Website Manager')
    .items([
      S.listItem().title('Website Pages').icon(HomeIcon).child(
        S.list().title('Choose a page').items(
          pageItems.map(([key, title]) =>
            S.listItem().title(title).child(
              S.document().schemaType('pageContent').documentId(`page-${key}`).title(title)
            )
          )
        )
      ),
      S.listItem().title('Before & After (Impact page)').icon(ComposeIcon).child(
        S.document().schemaType('beforeAfterSection').documentId('before-after-section').title('Before & After')
      ),
      S.listItem().title('Website-wide Settings').icon(CogIcon).child(
        S.document().schemaType('siteSettings').documentId('site-settings')
      ),
      S.listItem().title('Initiatives').icon(ImagesIcon).child(S.documentTypeList('initiative').title('Initiatives')),
      S.listItem().title('Financial Reports').icon(DocumentIcon).child(S.documentTypeList('report').title('Reports')),
      S.divider(),
      S.listItem().title('Students & Volunteers').icon(UsersIcon).child(S.documentTypeList('volunteer').title('Students & Volunteers').defaultOrdering([{field: 'name', direction: 'asc'}])),
      S.listItem().title('Drives & Activities').icon(ChartUpwardIcon).child(S.documentTypeList('volunteerDrive').title('Drives & Activities').defaultOrdering([{field: 'date', direction: 'desc'}])),
      S.listItem().title('Hour Entries (audit log)').icon(DocumentIcon).child(S.documentTypeList('volunteerHourEntry').title('Hour Entries').defaultOrdering([{field: 'date', direction: 'desc'}])),
      S.listItem().title('Milestones & Badges').icon(StarIcon).child(
        S.document().schemaType('milestoneSettings').documentId('milestone-settings')
      ),
    ])