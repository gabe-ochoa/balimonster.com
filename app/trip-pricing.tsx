import { bookingUrl } from './site';

export function SpearfishingPricing() {
  return <div className="trip-pricing" id="spearfishing-prices">
    <h3>Nusa Penida speedboat spearfishing day trip</h3>
    <p>Full-day private charter from Sanur aboard our 400 HP dive boat, with experienced spearfishing guides. Maximum 6 guests, with one dedicated guide for every 2 guests.</p>
    <table><caption>Private spearfishing day trip prices in IDR</caption><thead><tr><th scope="col">Guests onboard</th><th scope="col">Price per guest*</th><th scope="col">Total boat cost</th></tr></thead><tbody>
      {[[1,'8,500,000','8,500,000'],[2,'10,000,000','5,000,000'],[3,'12,500,000','4,167,000'],[4,'15,000,000','3,750,000'],[5,'17,500,000','3,500,000'],[6,'20,000,000','3,333,000']].map(([guests,total,each]) => <tr key={guests}><th scope="row">{guests}</th><td>{each}</td><td>{total}</td></tr>)}
    </tbody></table>
    <p className="price-note">*Per-person amounts are rounded to the nearest IDR 1,000. The total price is the group charge.</p>
    <p>Includes captain, crew, guides, all permits and fees, lunch, drinks, water, ice, and fish handling and processing. Fish you spear are yours to keep.</p>
    <p>The crossing to Penida takes about an hour each way. The boat lets us reset drifts and move between spots as conditions change.</p>
    <p>Weather or sea-state cancellations receive a free reschedule or full deposit refund. Prices are in IDR and may change for peak season or significant fuel price changes. Confirm your date’s price, equipment, transport, and payment and cancellation terms before paying a deposit.</p>
    <a className="text-link" href={bookingUrl('Nusa Penida spearfishing day trip prices')}>Discuss prices on WhatsApp</a>
  </div>;
}

export function SnorkelingPricing() {
  return <div className="trip-pricing">
    <h3>Open boat snorkeling day trip</h3>
    <p>Join a shared Nusa Penida by sea itinerary, with stops chosen by Putu for the conditions. Trips normally depart with at least 4 guests. A trip with 2 or 3 guests runs only if everyone agrees to the rate below.</p>
    <table><caption>Shared snorkeling day trip prices in IDR</caption><thead><tr><th scope="col">Guests onboard</th><th scope="col">Price per guest</th><th scope="col">Total boat cost*</th></tr></thead><tbody>
      {[[2,4000000],[3,3500000],[4,3000000],[5,2600000],[6,2333000],[7,1500000],[8,1500000],[9,1500000],[10,1500000],[11,1500000],[12,1500000]].map(([guests,price]) => <tr key={guests}><th scope="row">{guests}</th><td>{`${guests >= 7 ? 'From ' : ''}${price.toLocaleString('en-US')}`}</td><td>{`${guests >= 7 ? 'From ' : ''}${(guests * price).toLocaleString('en-US')}`}</td></tr>)}
    </tbody></table>
    <p className="price-note">*Shared-trip boat totals are calculated from the listed per-guest rates. The 6-guest total uses the rounded rate of IDR 2,333,000; confirm the final amount on WhatsApp. Rates for 7–12 guests are starting prices.</p>
    <p>Before paying a deposit, confirm what happens if the trip does not fill or you decline a smaller-group rate. We’ll update you as the boat fills, and everyone pays the same final per-person rate. Includes captain, crew, snorkel guides, all permits, lunch, drinks, water, and snorkeling gear.</p>
    <a className="bm-link" href={bookingUrl('open boat snorkeling dates and prices')}>Check dates and final rates on WhatsApp</a>
    <h3>Private Nusa Penida boat charter</h3>
    <p>From IDR 14,000,000 for up to 6 guests, without spearfishing. Have your own boat, captain, and crew for the day, with your choice of stops, timing, and activities. The final price depends on your date, group size, and itinerary.</p>
    <a className="bm-link" href={bookingUrl('a private Nusa Penida charter without spearfishing')}>Confirm a private charter price</a>
  </div>;
}

export function LocalSpearfishingPricing() {
  return <div className="trip-pricing" id="local-prices">
    <table><caption>Serangan local spearfishing prices in IDR</caption><thead><tr><th scope="col">Guests onboard</th><th scope="col">Price per guest</th><th scope="col">Total boat cost</th></tr></thead><tbody>
      {[[1,1500000],[2,2500000],[3,3000000],[4,4000000]].map(([guests,total]) => <tr key={guests}><th scope="row">{guests}</th><td>{(total / guests).toLocaleString('en-US')}</td><td>{total.toLocaleString('en-US')}</td></tr>)}
    </tbody></table>
    <table><caption>Padangbai local spearfishing prices in IDR</caption><thead><tr><th scope="col">Guests onboard</th><th scope="col">Price per guest</th><th scope="col">Total boat cost</th></tr></thead><tbody>
      <tr><th scope="row">1</th><td>2,500,000</td><td>2,500,000</td></tr>
      <tr><th scope="row">2</th><td>2,250,000</td><td>4,500,000</td></tr>
      <tr><th scope="row">3 or more</th><td>2,000,000</td><td>2,000,000 × guests</td></tr>
    </tbody></table>
    <p>Teaching classes are priced separately from these local trips, with one guide for each guest.</p>
    <a className="text-link" href={bookingUrl('a one-to-one spearfishing class and its price')}>Message us for a class price</a>
  </div>;
}
