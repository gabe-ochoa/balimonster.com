import { bookingUrl, site } from './site';

export default function WeekEnquiry({ interest = 'a private boat charter' }: { interest?: string }) {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() + (8 - start.getUTCDay()) % 7 + (start.getUTCDay() === 1 ? 7 : 0));
  const format = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const weeks = Array.from({ length: 52 }, (_, index) => {
    const monday = new Date(start);
    monday.setUTCDate(monday.getUTCDate() + index * 7);
    const sunday = new Date(monday);
    sunday.setUTCDate(sunday.getUTCDate() + 6);
    const label = `${format(monday)} to ${format(sunday)}`;
    return { label, message: (new URL(bookingUrl(interest)).searchParams.get('text') || '').replace('Preferred dates: ', `Preferred dates: ${label}`) };
  });
  return <section className="bm-section week-enquiry" aria-labelledby="week-heading">
    <h2 id="week-heading">Plan your week</h2>
    <p>Availability is unconfirmed. Choose a preferred week and contact us on WhatsApp to confirm specific days.</p>
    <form action={`https://wa.me/${site.phone}`} method="get">
      <label htmlFor="preferred-week">Preferred week</label>
      <select id="preferred-week" name="text" defaultValue="" required>
        <option value="" disabled>Select a week</option>
        {weeks.map(week => <option key={week.label} value={week.message}>{week.label}</option>)}
        <option value={new URL(bookingUrl(`${interest} on other dates`)).searchParams.get('text') || ''}>Other dates</option>
      </select>
      <button className="bm-button" type="submit">Ask about dates on WhatsApp</button>
    </form>
    <p>Date ranges depend on conditions. During the rainy season, keep your schedule flexible: good conditions may only become clear 2–3 days in advance.</p>
  </section>;
}
