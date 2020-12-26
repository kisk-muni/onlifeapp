// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
declare const window: any

export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: url,
  })
}


// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type EventProps = {
	action: string
	category: string
	label: string	
	value: number
}
export const event = ({ action, category, label, value }: EventProps) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    debug_mode: process.env.NODE_ENV !== 'production'
  })
}
