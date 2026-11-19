import {richText, imageWithAlt, section, marqueeItem, impactStat} from './objects'
import {pageContent, siteSettings, initiative, report} from './pages'
import {beforeAfterItem, beforeAfterSection} from './impact'
import {volunteer, volunteerDrive, volunteerHourEntry, milestoneSettings} from './volunteers'

export const schemaTypes = [
  richText, imageWithAlt, section, marqueeItem, impactStat,
  pageContent, siteSettings, initiative, report,
  beforeAfterItem, beforeAfterSection,
  volunteer, volunteerDrive, volunteerHourEntry, milestoneSettings,
]