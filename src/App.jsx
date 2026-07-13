import { useState } from 'react'
import './App.css'

const images = {
  facility: 'https://tri-powerrecycling.com/uploaded_files/images/Recycling-Center-1200.jpg',
  cooler: 'https://tri-powerrecycling.com/uploaded_files/images/Styrofoam-Cooler-300.jpg',
  clamshell: 'https://tri-powerrecycling.com/uploaded_files/images/Styrofoam-Food-Clamshell-500.jpg',
  cups: 'https://tri-powerrecycling.com/uploaded_files/images/Foam-Cups-300.jpg',
}

const plans = [
  {
    id: 'starter',
    kicker: 'Start here',
    name: 'Garage Starter Kit',
    description: 'Everything you need to begin collecting clean foam at home.',
    includes: ['Empty collection package', 'Simple sorting guide', 'Text support when you need it'],
  },
  {
    id: 'swap',
    kicker: 'For returning recyclers',
    name: 'Full Kit Swap',
    description: 'Send your collected foam in and keep the good habit going.',
    includes: ['Prepaid return label', 'Fresh collection package', 'Easy text-to-reorder'],
  },
  {
    id: 'cleanout',
    kicker: 'For the big stuff',
    name: 'Big Cleanout Kit',
    description: 'Made for appliance, furniture, cooler, or moving-day foam.',
    includes: ['Room for bulky EPS foam', 'Shipping help by text', 'A real recycling destination'],
  },
]

const accepted = [
  ['Shipping coolers', images.cooler],
  ['Food containers & cups', images.clamshell],
  ['Appliance & electronics foam', images.cups],
]

function CheckIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
}

function App() {
  const [selectedPlan, setSelectedPlan] = useState('starter')
  const [zip, setZip] = useState('')
  const [result, setResult] = useState('')
  const textNumber = ['+1', '888', '468', '3626'].join('')

  const checkZip = (event) => {
    event.preventDefault()
    const cleanZip = zip.trim()
    if (!/^\d{5}$/.test(cleanZip)) {
      setResult('Enter a 5-digit ZIP code to continue.')
      return
    }
    setResult(`Great news — ${cleanZip} is on our launch list. Text 888-GOT-FOAM to get started.`)
  }

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a href="#top" className="wordmark" aria-label="888 Got Foam home">
          <span className="logo-bubble">888</span><span>Got Foam?</span>
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#accepted">What we take</a>
          <a href="#plans">Choose a kit</a>
          <a href="#faq">FAQ</a>
        </div>
        <a className="nav-cta" href={`sms:${textNumber}?body=Hi%20888%20Got%20Foam!%20I%27d%20like%20to%20start%20recycling%20foam.`}>Text us</a>
      </nav>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Foam recycling, delivered</p>
          <h1>Your foam has somewhere better to go.</h1>
          <p className="hero-subtitle">
            Skip the landfill and the hunt for a drop-off. We send you a collection kit, you fill it with clean foam, and we help you ship it to a real recycling facility.
          </p>
          <div className="cta-row">
            <a className="button primary" href="#plans">Get your collection kit</a>
            <a className="text-link" href="#accepted">See what foam we take <span aria-hidden="true">→</span></a>
          </div>
          <div className="trust-row" aria-label="Program benefits">
            <span><CheckIcon /> No special trip</span>
            <span><CheckIcon /> Prepaid return label</span>
            <span><CheckIcon /> Real EPS recycling</span>
          </div>
        </div>

        <div className="hero-scene" aria-label="A simple text conversation with 888 Got Foam">
          <div className="foam foam-one" />
          <div className="foam foam-two" />
          <div className="phone">
            <div className="phone-top"><span className="avatar">888</span><strong>888 Got Foam</strong><small>Text message</small></div>
            <div className="bubble incoming">Hi! Ready to give that foam a better ending?</div>
            <div className="bubble outgoing">Yes — my collection kit is full.</div>
            <div className="bubble incoming">Perfect. Your return label is ready. Want a fresh kit sent to the same address?</div>
            <div className="bubble outgoing short">Yes, please!</div>
            <div className="label-card"><span>✓</span><div><strong>Return label ready</strong><small>Fresh kit on the way</small></div></div>
          </div>
          <div className="scene-note"><strong>One text.</strong><span>Your next step is handled.</span></div>
        </div>
      </section>

      <section className="impact-strip" aria-label="Why recycle foam">
        <p>Foam is mostly air. <strong>In a landfill, it takes up space for generations.</strong> With the right equipment, clean EPS foam can become useful material again.</p>
      </section>

      <section id="how" className="section how-section">
        <div className="section-heading">
          <p className="eyebrow blue">From your garage to a new beginning</p>
          <h2>Recycling foam can finally be simple.</h2>
          <p>No hunting for a local drop-off. No guessing what to do next. We stay with you from the first box to every refill.</p>
        </div>
        <div className="steps">
          <article><span className="step-number">01</span><div className="step-icon">↘</div><h3>Get your kit</h3><p>Your empty collection package arrives with a clear guide to what belongs inside.</p></article>
          <article><span className="step-number">02</span><div className="step-icon">＋</div><h3>Fill it at home</h3><p>Save clean, dry foam from deliveries, coolers, appliances, and everyday packaging.</p></article>
          <article><span className="step-number">03</span><div className="step-icon">•••</div><h3>Text when full</h3><p>Send a quick text. We’ll confirm the details and send your prepaid return label.</p></article>
          <article><span className="step-number">04</span><div className="step-icon">↻</div><h3>Ship. Refill. Repeat.</h3><p>Your foam heads to Tri-Power for processing, and a fresh kit keeps you collecting.</p></article>
        </div>
      </section>

      <section id="accepted" className="section accepted-section">
        <div className="accepted-copy">
          <p className="eyebrow blue">A quick foam check</p>
          <h2>If it’s clean, rigid, and breaks into little beads, we probably take it.</h2>
          <p>Look for expanded polystyrene foam — often marked <strong>#6 EPS</strong>. Not sure? Text us a photo and we’ll help.</p>
          <div className="yes-no">
            <div className="answer yes"><strong>Yes, please</strong><span>Clean foam coolers, cups, trays, clamshells, and protective packaging.</span></div>
            <div className="answer no"><strong>Not this time</strong><span>Packing peanuts, flexible foam, or anything wet, dirty, painted, or food-soaked.</span></div>
          </div>
          <a className="button secondary" href={`sms:${textNumber}?body=Hi!%20Can%20you%20tell%20me%20if%20this%20foam%20is%20accepted%3F`}>Text us a photo</a>
        </div>
        <div className="foam-gallery">
          {accepted.map(([label, src]) => <figure key={label}><img src={src} alt={label} /><figcaption><CheckIcon /> {label}</figcaption></figure>)}
        </div>
      </section>

      <section className="facility-section">
        <img src={images.facility} alt="Tri-Power Recycling facility where EPS foam is processed" />
        <div className="facility-copy">
          <p className="eyebrow">A real destination for your foam</p>
          <h2>Not wish-cycled. Actually processed.</h2>
          <p>Your clean EPS foam goes to Tri-Power Recycling, an established U.S. foam recycler with the specialized equipment to densify it for use in new products.</p>
          <div className="facility-facts"><span><strong>EPS-focused</strong> processing</span><span><strong>U.S.-based</strong> facility</span><span><strong>Less volume</strong> in landfills</span></div>
        </div>
      </section>

      <section id="plans" className="section plans-section">
        <div className="section-heading">
          <p className="eyebrow blue">Make room for a better habit</p>
          <h2>Choose the kit that fits your foam.</h2>
          <p>Start small, tackle a big cleanout, or keep your household in the recycling loop.</p>
        </div>
        <div className="plan-grid">
          {plans.map((plan) => (
            <button key={plan.id} className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`} onClick={() => setSelectedPlan(plan.id)} aria-pressed={selectedPlan === plan.id}>
              <span className="plan-kicker">{plan.kicker}</span>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <ul>{plan.includes.map((item) => <li key={item}><CheckIcon /> {item}</li>)}</ul>
              <span className="choose">{selectedPlan === plan.id ? 'Selected' : 'Choose this kit'} <span aria-hidden="true">→</span></span>
            </button>
          ))}
        </div>
        <form className="zip-card" onSubmit={checkZip}>
          <div><span className="zip-icon">⌖</span><div><strong>Ready to get started?</strong><small>Check your ZIP and see what comes next.</small></div></div>
          <label><span className="sr-only">ZIP code</span><input inputMode="numeric" maxLength="5" value={zip} onChange={(event) => setZip(event.target.value)} placeholder="ZIP code" /></label>
          <button className="button primary" type="submit">Check my ZIP</button>
          {result && <p className="form-result" role="status">{result}</p>}
        </form>
      </section>

      <section id="faq" className="section faq-section">
        <div><p className="eyebrow blue">Questions? We’ve got foam answers.</p><h2>The things people ask us most.</h2><p>Still wondering about something? Text <strong>888-GOT-FOAM</strong> and ask like you would ask a neighbor.</p></div>
        <div className="faq-list">
          <details><summary>What exactly is EPS foam?</summary><p>Expanded polystyrene is the lightweight, rigid foam commonly used in shipping coolers, appliance packaging, cups, trays, and protective inserts. It often has a #6 recycling mark and breaks into small beads.</p></details>
          <details><summary>Does the foam need to be clean?</summary><p>Yes. Please remove tape, labels, cardboard, and food. Foam should be dry and free from dirt, paint, oil, and heavy residue.</p></details>
          <details><summary>Can I send packing peanuts?</summary><p>Not in an 888 Got Foam kit. Packing peanuts can shift and escape during processing, so please reuse them or check with a local shipping store.</p></details>
          <details><summary>What happens after I ship it?</summary><p>The foam is received by Tri-Power Recycling and mechanically processed to dramatically reduce its volume. The densified material can then move into manufacturing markets instead of a landfill.</p></details>
          <details><summary>How do I get another kit?</summary><p>Just text “my kit is full.” We’ll help with the return label and arrange the next empty collection package.</p></details>
        </div>
      </section>

      <section className="final-cta">
        <div className="mini-logo">888</div>
        <p className="eyebrow">Ready when your foam is.</p>
        <h2>Save the foam.<br />Send a text.</h2>
        <p>One simple message gets your household started.</p>
        <a className="button light" href={`sms:${textNumber}?body=Hi%20888%20Got%20Foam!%20I%27m%20ready%20to%20get%20started.`}>Text 888-GOT-FOAM</a>
      </section>

      <footer>
        <a href="#top" className="wordmark"><span className="logo-bubble">888</span><span>Got Foam?</span></a>
        <p>Simple foam recycling, powered by the real processing experience of Tri-Power Recycling.</p>
        <div><a href="#accepted">What we take</a><a href="#faq">FAQ</a><a href="https://tri-powerrecycling.com/" target="_blank" rel="noreferrer">Tri-Power Recycling</a></div>
        <small>Customer experience preview · Program details and availability subject to launch validation.</small>
      </footer>
    </main>
  )
}

export default App
