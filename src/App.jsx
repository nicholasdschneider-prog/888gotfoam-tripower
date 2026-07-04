import { useMemo, useState } from 'react'
import './App.css'

const triPowerImages = {
  plant: 'https://tri-powerrecycling.com/uploaded_files/images/Recycling-Center-at-Sunrise.jpg',
  cooler: 'https://tri-powerrecycling.com/uploaded_files/images/Styrofoam-Cooler-300.jpg',
  clamshell: 'https://tri-powerrecycling.com/uploaded_files/images/Styrofoam-Food-Clamshell-500.jpg',
  cups: 'https://tri-powerrecycling.com/uploaded_files/images/Foam-Cups-300.jpg',
  facility: 'https://tri-powerrecycling.com/uploaded_files/images/Recycling-Center-1200.jpg',
}

const tiers = [
  {
    name: 'Garage Starter Kit',
    price: 39,
    detail: 'First empty collection package + return label setup',
    ideal: 'For a new household starting the foam loop.',
  },
  {
    name: 'Full Bag Swap',
    price: 49,
    detail: 'Return label for current foam + new empty garage package',
    ideal: 'The repeat-order flow: send full foam in, receive the next package.',
    featured: true,
  },
  {
    name: 'Big Cleanout Kit',
    price: 89,
    detail: 'Oversized label + replacement package for appliance foam',
    ideal: 'For garages, movers, large coolers, and appliance packaging.',
  },
]

const conversation = [
  { who: 'customer', text: 'My foam bag is full.' },
  { who: 'ai', text: 'Got it — want me to create a Full Bag Swap using your saved address in South Bend?' },
  { who: 'customer', text: 'Yes. Send another bag too.' },
  { who: 'ai', text: 'Done. Your return label is ready. A fresh garage package ships today.' },
  { who: 'ai label', text: 'Order #GF-1048 · Return label · New kit queued' },
]

function App() {
  const [selectedTier, setSelectedTier] = useState('Full Bag Swap')
  const [zip, setZip] = useState('46514')
  const [quantity, setQuantity] = useState(1)

  const selected = useMemo(() => tiers.find((tier) => tier.name === selectedTier) || tiers[1], [selectedTier])
  const total = selected.price * quantity

  return (
    <main>
      <nav className="glass-nav">
        <a href="#top" className="wordmark" aria-label="888 Got Foam home">
          <span className="mark">888</span> Got Foam
        </a>
        <div className="nav-links">
          <a href="#text-loop">Text-to-order</a>
          <a href="#how">How it works</a>
          <a href="#accepted">What we take</a>
          <a href="#order">Mock order</a>
        </div>
        <a className="nav-cta" href="#text-loop">Text 888-GOT-FOAM</a>
      </nav>

      <section id="top" className="hero section-dark commerce-hero">
        <div className="hero-copy">
          <p className="eyebrow">Conversational commerce for EPS foam recycling</p>
          <h1>Text when it’s full. AI handles the rest.</h1>
          <p className="hero-subtitle">
            888 Got Foam makes foam recycling as easy as sending a text: create the order, get the return label, ship in the full package, and receive the next empty garage kit automatically.
          </p>
          <div className="cta-row">
            <a className="button primary" href="#text-loop">See the text flow</a>
            <a className="button ghost dark" href="#order">Mock an order</a>
          </div>
          <div className="trust-strip">
            <span>Powered by Tri-Power Recycling</span>
            <span>Real EPS processing</span>
            <span>Text-first repeat ordering</span>
          </div>
        </div>

        <div className="hero-visual sms-stage" aria-label="888 Got Foam SMS order flow">
          <div className="foam-orb orb-one" />
          <div className="foam-orb orb-two" />
          <div className="phone-card commerce-phone">
            <div className="phone-header">888-GOT-FOAM</div>
            {conversation.map((message, index) => (
              <div key={index} className={`message ${message.who === 'customer' ? 'inbound' : message.who === 'ai label' ? 'label-chip' : 'outbound'}`}>
                {message.text}
              </div>
            ))}
            <div className="mini-status">
              <span>Return label sent</span>
              <span>New package ships today</span>
            </div>
          </div>
          <div className="floating-card card-label">
            <span>Customer loop</span>
            <strong>Full bag out<br />Fresh kit in</strong>
          </div>
        </div>
      </section>

      <section id="text-loop" className="section-light text-loop-section">
        <div className="section-heading narrow">
          <p className="eyebrow dark">The product is the conversation</p>
          <h2>No account portal. No rate calculator. Just text.</h2>
          <p>
            The website explains the program, but the real conversion path is SMS. Customers should feel like they have a recycling assistant in their pocket.
          </p>
        </div>
        <div className="loop-grid">
          <article className="loop-card primary-loop">
            <span className="loop-number">01</span>
            <h3>Start the garage kit</h3>
            <p>Customer texts “start” or scans a QR code. AI collects name, address, payment, and sends the first empty collection package.</p>
          </article>
          <article className="loop-card">
            <span className="loop-number">02</span>
            <h3>Fill over time</h3>
            <p>The package lives in the garage. Foam from coolers, electronics, appliances, and deliveries goes in instead of the trash.</p>
          </article>
          <article className="loop-card">
            <span className="loop-number">03</span>
            <h3>Text “bag full”</h3>
            <p>AI confirms the plan, creates the order, charges the saved payment method, and texts the return label.</p>
          </article>
          <article className="loop-card">
            <span className="loop-number">04</span>
            <h3>Swap and repeat</h3>
            <p>The full package ships to Tri-Power. A new empty garage package ships back so the recycling habit never stops.</p>
          </article>
        </div>
      </section>

      <section className="section-dark automation-section">
        <div className="automation-copy">
          <p className="eyebrow">Behind every text is an order engine</p>
          <h2>The AI doesn’t just answer questions. It creates revenue.</h2>
          <p>
            Every conversation can become a structured order: customer identity, address, package tier, return label, replacement kit, payment, notifications, and internal fulfillment status.
          </p>
        </div>
        <div className="automation-panel">
          <div className="panel-row"><span>Intent detected</span><strong>“bag full”</strong></div>
          <div className="panel-row"><span>Customer matched</span><strong>Saved profile</strong></div>
          <div className="panel-row"><span>Order created</span><strong>Full Bag Swap</strong></div>
          <div className="panel-row"><span>Label generated</span><strong>SMS + email</strong></div>
          <div className="panel-row"><span>Replacement kit</span><strong>Ship today</strong></div>
        </div>
      </section>

      <section id="proof" className="section-light proof-grid">
        <div className="section-heading">
          <p className="eyebrow dark">The hard part is already solved</p>
          <h2>888 Got Foam is the easy front door for Tri-Power’s real EPS operation.</h2>
        </div>
        <div className="proof-cards">
          <article>
            <span className="stat">90%</span>
            <p>EPS foam is mostly air, yet can consume huge landfill volume. The text flow captures it before it becomes trash.</p>
          </article>
          <article>
            <span className="stat">#6</span>
            <p>Clean expanded polystyrene can be densified and remade into new products when routed to the right facility.</p>
          </article>
          <article>
            <span className="stat">∞</span>
            <p>The MVP starts with EPS because Tri-Power already has mechanical processing and downstream outlets.</p>
          </article>
        </div>
        <div className="image-band">
          <img src={triPowerImages.facility} alt="Tri-Power Recycling facility" />
          <div>
            <h3>Built on Tri-Power’s infrastructure.</h3>
            <p>
              Tri-Power publicly describes itself as the largest independently owned Styrofoam™ / EPS foam recycling center in the United States, using advanced machinery to sort, clean, and process EPS foam.
            </p>
            <p>
              888 Got Foam turns that capability into a consumer habit: text, ship, refill, repeat.
            </p>
          </div>
        </div>
      </section>

      <section id="how" className="section-dark cinematic">
        <p className="eyebrow">Designed for the moment after delivery day</p>
        <h2>The garage becomes the collection point.</h2>
        <div className="steps">
          <article>
            <span>01</span>
            <h3>Keep the package open</h3>
            <p>The empty 888 Got Foam kit sits in the garage, utility room, or shipping area and collects clean foam over time.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Text when full</h3>
            <p>The customer texts a normal phrase — “full,” “need label,” or “send another bag” — and AI turns it into an order.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Ship and replenish</h3>
            <p>Current foam goes to Tri-Power for recycling. A fresh empty package ships out so the customer is always ready.</p>
          </article>
        </div>
      </section>

      <section id="accepted" className="section-light accepted">
        <div className="section-heading narrow">
          <p className="eyebrow dark">Foam made understandable</p>
          <h2>If it snaps and beads, it belongs here.</h2>
          <p>Consumers don’t need to become polymer experts. The AI can answer questions, ask for a photo, and route edge cases to a human.</p>
        </div>
        <div className="accept-grid">
          <article className="accept-card yes">
            <h3>Accepted in the MVP</h3>
            <ul>
              <li>Clean EPS / #6 foam packaging</li>
              <li>Foam coolers and shipping inserts</li>
              <li>Foam cups, trays, clamshells, and egg cartons</li>
              <li>Appliance, TV, electronics, and RV packaging foam</li>
            </ul>
          </article>
          <article className="accept-card no">
            <h3>Not accepted</h3>
            <ul>
              <li>Packing peanuts</li>
              <li>Wet, dirty, painted, or food-soaked foam</li>
              <li>Medical waste or sharps</li>
              <li>Glass, metal, aerosols, paint, oil, or hazardous materials</li>
            </ul>
          </article>
        </div>
        <div className="product-row">
          <img src={triPowerImages.cooler} alt="Styrofoam cooler" />
          <img src={triPowerImages.clamshell} alt="Foam clamshell food container" />
          <img src={triPowerImages.cups} alt="Foam cups" />
        </div>
      </section>

      <section id="order" className="section-light order-section">
        <div className="order-intro">
          <p className="eyebrow dark">Prototype order backend</p>
          <h2>The checkout is hidden behind the text conversation.</h2>
          <p>Brent can click this to understand the economics, but customers should mostly experience it as a simple AI text exchange.</p>
        </div>

        <div className="order-shell">
          <div className="tier-picker">
            {tiers.map((tier) => (
              <button
                key={tier.name}
                className={`tier ${selectedTier === tier.name ? 'active' : ''} ${tier.featured ? 'featured' : ''}`}
                onClick={() => setSelectedTier(tier.name)}
              >
                {tier.featured && <span className="badge">Core repeat loop</span>}
                <strong>{tier.name}</strong>
                <span>{tier.detail}</span>
                <p>{tier.ideal}</p>
                <em>${tier.price}</em>
              </button>
            ))}
          </div>

          <div className="checkout-card">
            <h3>AI-created order preview</h3>
            <label>
              Customer ZIP
              <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="e.g. 46514" />
            </label>
            <label>
              Number of swaps
              <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <div className="summary-line"><span>Detected intent</span><strong>Bag full + send another</strong></div>
            <div className="summary-line"><span>Order type</span><strong>{selected.name}</strong></div>
            <div className="summary-line"><span>Customer receives</span><strong>Return label + new kit</strong></div>
            <div className="summary-line"><span>Mock total</span><strong>${total}</strong></div>
            <button className="button primary wide">Create order from SMS</button>
            <p className="fine-print">Prototype only. Final prices, package dimensions, and carrier rules should be validated against actual fulfillment costs.</p>
          </div>
        </div>
      </section>

      <section id="partner" className="section-light partner">
        <div className="section-heading narrow">
          <p className="eyebrow dark">Why brands will care</p>
          <h2>Every partner can tell customers: “Text this number when the foam is full.”</h2>
          <p>Omaha Steaks-style food shippers, EPS manufacturers, retailers, and appliance brands can all plug into the same simple loop.</p>
        </div>
        <div className="partner-grid">
          <article><h3>Food shippers</h3><p>Include the first garage package or QR code with the cooler shipment.</p></article>
          <article><h3>EPS manufacturers</h3><p>Give regulators and customers a real recycling pathway backed by Tri-Power.</p></article>
          <article><h3>Retail kits</h3><p>Sell the starter package at hardware and grocery stores with SMS onboarding.</p></article>
          <article><h3>AI retention</h3><p>Every full bag triggers the next order and keeps the household in the loop.</p></article>
        </div>
      </section>

      <footer>
        <div>
          <strong>888 Got Foam</strong>
          <p>Concept site for a text-first consumer EPS recycling program powered by Tri-Power Recycling.</p>
        </div>
        <div className="footer-actions">
          <a href="#text-loop">Text-to-order flow</a>
          <a href="https://tri-powerrecycling.com/recycle-styrofoam.cfm" target="_blank">Current Home 4 Foam page</a>
        </div>
      </footer>
    </main>
  )
}

export default App
