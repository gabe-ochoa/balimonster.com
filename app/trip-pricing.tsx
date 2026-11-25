import { bookingUrl } from './site';

export function SpearfishingPricing() {
  return <div className="trip-pricing" id="spearfishing-prices">
    <table><caption>Prices (IDR)</caption><thead><tr><th scope="col">Guests onboard</th><th scope="col">Price per guest*</th><th scope="col">Total boat cost</th></tr></thead><tbody>
      {[[1,'8,500,000','8,500,000'],[2,'10,000,000','5,000,000'],[3,'12,500,000','4,167,000'],[4,'15,000,000','3,750,000'],[5,'17,500,000','3,500,000'],[6,'20,000,000','3,333,000']].map(([guests,total,each]) => <tr key={guests}><th scope="row">{guests}</th><td>{each}</td><td>{total}</td></tr>)}
    </tbody></table>
    <p className="price-note">*Per-person amounts are rounded to the nearest IDR 1,000. The total price is the group charge.</p>
    <p>Includes one dedicated guide for every 2 guests, captain, crew, permits, lunch, drinks, water, ice, and fish handling.</p>
    <p>Weather cancellations: free reschedule or full deposit refund. Peak season and fuel changes may affect prices; confirm the final quote and booking terms before paying.</p>
    <a className="text-link" href={bookingUrl('Nusa Penida spearfishing day trip prices')}>Discuss prices on WhatsApp</a>
  </div>;
}

export function SnorkelingPricing() {
  return <div className="trip-pricing">
        <p>Minimum 4 guests, or 2–3 if everyone agrees to the smaller-group rate.</p>
    <table><caption>Shared trip (IDR)</caption><thead><tr><th scope="col">Guests onboard</th><th scope="col">Price per guest</th><th scope="col">Total boat cost*</th></tr></thead><tbody>
      {[[2,4000000],[3,3500000],[4,3000000],[5,2600000],[6,2333000],[7,1500000],[8,1500000],[9,1500000],[10,1500000],[11,1500000],[12,1500000]].map(([guests,price]) => <tr key={guests}><th scope="row">{guests}</th><td>{`${guests >= 7 ? 'From ' : ''}${price.toLocaleString('en-US')}`}</td><td>{`${guests >= 7 ? 'From ' : ''}${(guests * price).toLocaleString('en-US')}`}</td></tr>)}
    </tbody></table>
    <p className="price-note">*The 6-guest total uses a rounded per-person rate. Confirm the final amount before booking.</p>
    <p>Includes captain, crew, snorkel guides, permits, lunch, and drinks. Everyone pays the same final per-person rate. Confirm deposit terms if the trip does not fill or you decline a smaller-group rate.</p>
    <a className="bm-link" href={bookingUrl('open boat snorkeling dates and prices')}>Check dates and final rates on WhatsApp</a>
    <h3>Private Nusa Penida boat charter</h3>
    <p>From IDR 14,000,000 for up to 6 guests, without spearfishing. Final price depends on date, group size, and itinerary.</p>
    <a className="bm-link" href={bookingUrl('a private Nusa Penida charter without spearfishing')}>Confirm a private charter price</a>
  </div>;
}

export function LocalSpearfishingPricing() {
  return <div className="trip-pricing" id="local-prices">
    <table><caption>Serangan</caption><thead><tr><th scope="col">Guests onboard</th><th scope="col">Price per guest (IDR)</th><th scope="col">Total boat cost (IDR)</th></tr></thead><tbody>
      {[[1,1500000],[2,2500000],[3,3000000],[4,4000000]].map(([guests,total]) => <tr key={guests}><th scope="row">{guests}</th><td>{(total / guests).toLocaleString('en-US')}</td><td>{total.toLocaleString('en-US')}</td></tr>)}
    </tbody></table>
    <table><caption>Padangbai</caption><thead><tr><th scope="col">Guests onboard</th><th scope="col">Price per guest (IDR)</th><th scope="col">Total boat cost (IDR)</th></tr></thead><tbody>
      <tr><th scope="row">1</th><td>2,500,000</td><td>2,500,000</td></tr>
      <tr><th scope="row">2</th><td>2,250,000</td><td>4,500,000</td></tr>
      <tr><th scope="row">3 or more</th><td>2,000,000</td><td>2,000,000 × guests</td></tr>
    </tbody></table>
    <p>Teaching classes are priced separately from these local trips, with one guide for each guest.</p>
    <a className="text-link" href={bookingUrl('a one-to-one spearfishing class and its price')}>Message us for a class price</a>
  </div>;
}
