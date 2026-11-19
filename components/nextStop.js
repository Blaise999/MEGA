import data from '../data/content.json';

// Only a published, dated event can become an announced next stop.
// The proposed stop is a draft location, not a public event announcement.
export function getNextStop(now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(now);
  const scheduled = data.campaignEvents.filter(e =>
    e.published && e.status === 'scheduled' && e.date && e.date >= today && data.lgas.includes(e.lga)
  ).sort((a, b) => a.date.localeCompare(b.date))[0];
  return scheduled ? { ...scheduled, confirmed: true } : data.proposedNextStop ? { ...data.proposedNextStop, confirmed: false } : null;
}
export function eventDate(date) {
  return date ? new Date(date + 'T12:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  }) : 'To be announced';
}
