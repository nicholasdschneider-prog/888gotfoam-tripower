import { FormEvent, ReactNode, useEffect, useState } from 'react'

type Page = {
  title: string
  description: string
  eyebrow: string
  heading: string
  intro: string
  image: string
  imageAlt: string
}

type Detail = { title: string; text: string }

const routes: Record<string, Page> = {
  '/services': {
    title: 'Recycling Services | Tri-Power Recycling',
    description: 'Explore cardboard, paper, EPS foam, commercial recycling, and equipment support.',
    eyebrow: 'Recycling services',
    heading: 'Start with the material you have.',
    intro: 'Tri-Power helps individuals and businesses find practical paths for cardboard, paper, and clean EPS foam. Call before delivery so the team can confirm current acceptance.',
    image: '/images/facility-day.jpg',
    imageAlt: 'Tri-Power Recycling processing facility in Elkhart, Indiana',
  },
  '/services/cardboard': {
    title: 'Cardboard Recycling | Tri-Power Recycling',
    description: 'Cardboard drop-off, baling, pickup, and commercial collection options in Elkhart.',
    eyebrow: 'Cardboard recycling',
    heading: 'Give corrugated material another trip.',
    intro: 'From boxes at home to recurring commercial volume, the right setup starts with quantity, loading access, and how the cardboard is prepared.',
    image: '/images/cardboard.jpg',
    imageAlt: 'Bales of corrugated cardboard prepared for recycling',
  },
  '/services/paper': {
    title: 'Paper Recycling | Tri-Power Recycling',
    description: 'Paper and fiber recycling for individuals and commercial operations.',
    eyebrow: 'Paper and fiber',
    heading: 'Keep clean fiber moving.',
    intro: 'Paper streams can include office paper, books, publications, cores, and baled commercial fiber. Contact the team to confirm your exact material before delivery.',
    image: '/images/paper-load.jpg',
    imageAlt: 'Bales of recovered paper loaded on a trailer',
  },
  '/services/plastics': {
    title: 'Plastic Recycling Status | Tri-Power Recycling',
    description: 'Current plastic recycling status from Tri-Power Recycling.',
    eyebrow: 'Current material notice',
    heading: 'General plastics are not currently accepted.',
    intro: 'Clean expanded polystyrene—commonly called EPS or Styrofoam—is the current exception. Call before bringing any plastic or foam to the facility.',
    image: '/images/foam-cube.jpg',
    imageAlt: 'Clean EPS foam collected for recycling',
  },
  '/services/eps-foam': {
    title: 'EPS Foam Recycling | Tri-Power Recycling',
    description: 'Expanded polystyrene foam processing and commercial EPS recycling in Elkhart.',
    eyebrow: 'EPS foam recycling',
    heading: 'Take the air out of a difficult material stream.',
    intro: 'EPS is lightweight and bulky. Specialized processing reduces its volume so clean foam can move more efficiently into reuse markets.',
    image: '/images/foam-cube.jpg',
    imageAlt: 'A collection cube filled with clean EPS foam',
  },
  '/home-4-foam': {
    title: 'Home 4 Foam | Ship EPS Foam for Recycling',
    description: 'Contact Tri-Power about shipping clean EPS foam for recycling through Home 4 Foam.',
    eyebrow: 'Home 4 Foam',
    heading: 'Ask before you ship.',
    intro: 'Home 4 Foam was created for people without a nearby EPS recycling option. Contact Tri-Power for current material, packing, payment, and shipping instructions before sending anything.',
    image: '/images/home-4-foam.jpg',
    imageAlt: 'Home 4 Foam shipping kit for EPS recycling',
  },
  '/commercial-recycling': {
    title: 'Commercial Recycling | Tri-Power Recycling',
    description: 'Commercial collection, recycling audits, equipment, and pickup planning.',
    eyebrow: 'Commercial programs',
    heading: 'Make recycling fit the operation.',
    intro: 'A workable program considers the material, volume, floor space, loading access, equipment, and pickup rhythm together.',
    image: '/images/recycling-audit.jpg',
    imageAlt: 'Recycling audit paperwork used to evaluate a commercial material stream',
  },
  '/recycling-equipment': {
    title: 'Recycling Equipment | Tri-Power Recycling',
    description: 'Baler and compactor guidance for commercial recycling programs.',
    eyebrow: 'Balers and compactors',
    heading: 'Right-size the equipment before it reaches the floor.',
    intro: 'Tri-Power can discuss vertical and horizontal balers, compactors, and possible purchase or lease arrangements. Current equipment and terms must be confirmed directly.',
    image: '/images/equipment-baler.jpg',
    imageAlt: 'Vertical baler used for commercial recycling',
  },
  '/about': {
    title: 'About Tri-Power Recycling | Elkhart, Indiana',
    description: 'Meet the family behind Tri-Power Recycling in Elkhart, Indiana.',
    eyebrow: 'Family business',
    heading: 'Built around practical material recovery.',
    intro: 'Tri-Power Recycling is an Elkhart family business serving individuals and commercial operations with recycling experience, processing equipment, and straightforward guidance.',
    image: '/images/family.jpg',
    imageAlt: 'The Fifer family of Tri-Power Recycling',
  },
  '/location': {
    title: 'Location | Tri-Power Recycling',
    description: 'Find Tri-Power Recycling at 1240 Anderson Street in Elkhart, Indiana.',
    eyebrow: 'Elkhart facility',
    heading: 'Bring the right material to the right place.',
    intro: 'Tri-Power Recycling is located at 1240 Anderson Street in Elkhart. Call before visiting to confirm current hours, material acceptance, and preparation requirements.',
    image: '/images/facility-day.jpg',
    imageAlt: 'Tri-Power Recycling facility at 1240 Anderson Street',
  },
  '/contact': {
    title: 'Contact Tri-Power Recycling',
    description: 'Contact Tri-Power Recycling about materials, commercial programs, or equipment.',
    eyebrow: 'Contact the team',
    heading: 'Start with what you have.',
    intro: 'Tell the team what the material is, approximately how much you have, where it is, and what you need help solving.',
    image: '/images/cardboard.jpg',
    imageAlt: 'Baled cardboard ready for recycling',
  },
  '/privacy': {
    title: 'Terms & Privacy | Tri-Power Recycling',
    description: 'Terms and privacy information for the Tri-Power Recycling website.',
    eyebrow: 'Website policies',
    heading: 'Terms and privacy.',
    intro: 'How information on this website and information submitted through the inquiry form are handled.',
    image: '/images/facility.jpg',
    imageAlt: 'Tri-Power Recycling facility at sunrise',
  },
}

const details: Record<string, { heading: string; note: string; items: Detail[] }> = {
  '/services/cardboard': {
    heading: 'From local drop-off to planned collection',
    note: 'Call before delivery to confirm current acceptance, fees, commodity payments, minimum quantities, and unloading instructions.',
    items: [
      { title: 'Loose or baled cardboard', text: 'Corrugated shipping and moving boxes may be suitable, including common tape, staples, and labels.' },
      { title: 'Commercial pickup', text: 'Ask about ground-level, dock-level, live-load, or staged-trailer options for recurring volume.' },
      { title: 'Collection equipment', text: 'Mesh cubes, dumpsters, compactors, and balers can support different spaces and material volumes.' },
      { title: 'Material review', text: 'A recycling audit can help match the stream, floor space, equipment, and pickup schedule.' },
    ],
  },
  '/services/paper': {
    heading: 'Keep fiber clean and useful',
    note: 'Paper markets and acceptance can change. Confirm the exact material and preparation before delivery.',
    items: [
      { title: 'Office paper', text: 'Sorted or mixed office-paper streams may be evaluated for recycling.' },
      { title: 'Books and publications', text: 'Books, magazines, catalogs, and related paper products are among the streams to discuss.' },
      { title: 'Cores and clean fiber', text: 'Paper cores and other clean fiber may fit a commercial recycling program.' },
      { title: 'Commercial quantities', text: 'Pickup planning depends on quantity, loading access, preparation, and schedule.' },
    ],
  },
  '/services/plastics': {
    heading: 'What to know before loading the truck',
    note: 'The current public notice says general plastics are not accepted. Clean EPS foam is the exception.',
    items: [
      { title: 'Do not rely on old lists', text: 'Older pages and search results may describe plastics that Tri-Power no longer accepts.' },
      { title: 'Clean EPS exception', text: 'Expanded polystyrene foam is the plastic material currently identified for processing.' },
      { title: 'Identify the foam', text: 'Foams that look similar can be made from different materials. Confirm the type before transporting it.' },
      { title: 'Call first', text: 'A quick call can prevent a wasted trip and clarify preparation requirements.' },
    ],
  },
  '/services/eps-foam': {
    heading: 'Make bulky foam practical to move',
    note: 'Exact accepted EPS forms and contamination rules should be confirmed. Packaging peanuts are not accepted.',
    items: [
      { title: 'Identify EPS', text: 'EPS is an expanded bead foam used in protective packaging, appliances, RV production, and other applications.' },
      { title: 'Keep it clean', text: 'Clean, separated material is easier to process. Food residue, tape, labels, and mixed foams can cause problems.' },
      { title: 'Reduce the volume', text: 'Densifying equipment presses air out of bulky foam to make transportation more practical.' },
      { title: 'Plan recurring streams', text: 'Manufacturers and other high-volume generators can ask about a commercial program.' },
    ],
  },
  '/home-4-foam': {
    heading: 'Before you ship',
    note: 'Do not send material until Tri-Power has confirmed that the program is active and provided current instructions.',
    items: [
      { title: 'Confirm the material', text: 'Verify that it is clean EPS foam—not another foam type or biodegradable packaging peanut.' },
      { title: 'Request instructions', text: 'Ask for current packing, shipping, payment, and destination details.' },
      { title: 'Pack efficiently', text: 'Keep the material clean and use the smallest practical shipping volume.' },
      { title: 'Have recurring volume?', text: 'Businesses with an ongoing foam stream should ask about commercial recycling instead.' },
    ],
  },
  '/commercial-recycling': {
    heading: 'Build the program around the operation',
    note: 'Service area, pricing, pickup minimums, equipment, and schedules are confirmed case by case.',
    items: [
      { title: 'Recycling audit', text: 'Review the material streams, volume, current handling, available space, and goals.' },
      { title: 'Collection planning', text: 'Choose containers and handling that work with the loading area and production flow.' },
      { title: 'Pickup planning', text: 'Match pickup frequency and loading method to the material volume.' },
      { title: 'Equipment support', text: 'Evaluate balers and compactors as part of the complete program.' },
    ],
  },
  '/recycling-equipment': {
    heading: 'Match the machine to the stream',
    note: 'Equipment availability, manufacturer, condition, pricing, financing, and terms require direct confirmation.',
    items: [
      { title: 'Vertical balers', text: 'A potential fit for cardboard and other approved material where floor space is limited.' },
      { title: 'Horizontal balers', text: 'A higher-volume option where material flow and operating space support the equipment.' },
      { title: 'Compactors', text: 'Stationary or self-contained configurations can serve different waste and recycling applications.' },
      { title: 'Ways to acquire', text: 'Ask which purchase, lease, or lease-to-purchase arrangements are currently available.' },
    ],
  },
}

const serviceCards = [
  { path: '/services/cardboard', title: 'Cardboard', text: 'Loose and baled corrugated material, plus commercial collection planning.', image: '/images/cardboard.jpg', alt: 'Bales of corrugated cardboard' },
  { path: '/services/paper', title: 'Paper & fiber', text: 'Office paper, books, cores, and related clean fiber streams.', image: '/images/paper.jpg', alt: 'Recovered paper prepared for recycling' },
  { path: '/services/eps-foam', title: 'EPS foam', text: 'Clean expanded polystyrene processed with specialized densifying equipment.', image: '/images/foam.jpg', alt: 'Clean expanded polystyrene foam' },
]

function updateMetadata(page?: Page) {
  const title = page?.title ?? 'Tri-Power Recycling | Elkhart, Indiana'
  const description = page?.description ?? 'Practical recycling programs for cardboard, paper, and EPS foam from Tri-Power Recycling.'
  document.title = title
  const set = (selector: string, value: string) => document.querySelector(selector)?.setAttribute('content', value)
  set('meta[name="description"]', description)
  set('meta[property="og:title"]', title)
  set('meta[property="og:description"]', description)
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.href = `https://tri-powerrecycling.com${window.location.pathname === '/' ? '' : window.location.pathname}`
}

function InquiryForm() {
  const [status, setStatus] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('Sending…')
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const body = await response.json()
      setStatus(body.ok ? 'Thanks — your inquiry was sent.' : body.error)
      if (body.ok) form.reset()
    } catch {
      setStatus('Inquiry delivery is not connected yet. Please call 574-848-1900.')
    }
  }

  return (
    <form onSubmit={submit}>
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Company<input name="company" autoComplete="organization" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
      <label>What can we help with?
        <select name="topic" defaultValue="">
          <option value="">Choose one</option>
          <option value="material">Material or drop-off question</option>
          <option value="commercial">Commercial recycling program</option>
          <option value="equipment">Baler or compactor</option>
          <option value="home-4-foam">Home 4 Foam</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <label>Material location<input name="location" autoComplete="address-level2" placeholder="City, state" /></label>
      <label className="messageField">Material, approximate volume, and timing<textarea name="message" required rows={5} /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button primary" type="submit">Send inquiry</button>
      <p className="formStatus" role="status" aria-live="polite">{status}</p>
      <small>By sending this form, you agree that Tri-Power may contact you about this inquiry.</small>
    </form>
  )
}

function PageHero({ page }: { page: Page }) {
  return <section className="pageHero"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.heading}</h1><p>{page.intro}</p></div><img src={page.image} alt={page.imageAlt} fetchPriority="high" /></section>
}

function ContactBand({ form = false }: { form?: boolean }) {
  return (
    <section className="contact">
      <div>
        <p className="eyebrow dark">Start with the material</p>
        <h2>Talk with the Tri-Power team.</h2>
        <p>Call before visiting, or describe the material and approximate volume. The team can confirm current acceptance and the best next step.</p>
        <address><strong>Tri-Power Recycling</strong><br />1240 Anderson Street<br />Elkhart, IN 46514<br /><a href="tel:+15748481900">574-848-1900</a></address>
      </div>
      {form ? <InquiryForm /> : <div className="contactCard"><span>Not sure where to start?</span><p>Send the material details in one place and the right person can follow up.</p><a className="button primary" href="/contact">Describe your material</a></div>}
    </section>
  )
}

function Materials() {
  return <section className="materials" aria-label="Material streams">{serviceCards.map((item) => <article key={item.path}><img src={item.image} alt={item.alt} loading="lazy" /><div><span>Material stream</span><h3>{item.title}</h3><p>{item.text}</p><a href={item.path}>View material guidance <span aria-hidden="true">→</span></a></div></article>)}</section>
}

function Home() {
  return (
    <>
      <section className="hero">
        <img src="/images/facility.jpg" alt="Tri-Power Recycling facility at sunrise" />
        <div className="heroShade" />
        <div className="heroCopy">
          <p className="eyebrow">Elkhart, Indiana · Industrial recycling</p>
          <h1>A practical next step for difficult material.</h1>
          <p>Cardboard, paper, and clean EPS foam—from a single drop-off question to an ongoing commercial recycling program.</p>
          <div className="actions"><a className="button primary" href="/contact">Describe your material</a><a className="button ghost" href="/services">See current materials</a></div>
        </div>
        <div className="heroStat"><strong>1240 Anderson Street</strong><span>Elkhart, Indiana · 574-848-1900</span></div>
      </section>

      <section className="startHere">
        <div className="sectionHeading"><p className="eyebrow dark">Start here</p><h2>What kind of recycling question do you have?</h2></div>
        <div className="pathCards">
          <a href="/services"><span>For individuals</span><h3>I have material to drop off.</h3><p>Check the current material guidance, then call before you load the vehicle.</p><strong>See accepted-material guidance →</strong></a>
          <a href="/commercial-recycling"><span>For businesses</span><h3>I need a repeatable program.</h3><p>Start with the material, volume, loading area, equipment, and pickup needs.</p><strong>Explore commercial recycling →</strong></a>
        </div>
      </section>

      <section className="intro"><p className="eyebrow dark">Straight answers. Real processing.</p><h2>Build around the material you actually have.</h2><p>Every useful program starts with the stream, volume, space, preparation, and pickup needs—not a one-size-fits-all promise.</p></section>
      <Materials />

      <section className="commercial">
        <div><p className="eyebrow">Commercial programs</p><h2>Collection and equipment that fit the floor.</h2><p>Tri-Power can help evaluate material flow, collection, baling, pickup, and equipment as one operating system.</p><a className="button light" href="/commercial-recycling">Plan a commercial program</a></div>
        <aside><img src="/images/equipment-compactor.jpg" alt="Stationary compactors used in commercial recycling" /><div><span>Equipment guidance</span><strong>Balers & compactors</strong><p>Ask which equipment and acquisition options are currently available.</p><a href="/recycling-equipment">View equipment guidance →</a></div></aside>
      </section>
      <ContactBand />
    </>
  )
}

function Services() {
  return <><PageHero page={routes['/services']} /><section className="intro"><p className="eyebrow dark">Current acceptance</p><h2>Cardboard, paper, and clean EPS foam.</h2><p>General plastics are not currently accepted. Confirm the exact material and delivery details before visiting.</p></section><Materials /><ContactBand /></>
}

function DetailPage({ path }: { path: string }) {
  const detail = details[path]
  return <><PageHero page={routes[path]} />{detail && <section className="detail"><div className="detailLead"><p className="eyebrow dark">Program details</p><h2>{detail.heading}</h2><p>{detail.note}</p></div><div className="detailGrid">{detail.items.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>}<ContactBand /></>
}

function About() {
  return <><PageHero page={routes['/about']} /><section className="story"><div><p className="eyebrow dark">The Tri-Power story</p><h2>A family recycling business in Elkhart.</h2><p>Tri-Power grew through material recovery, customer service, and investment in the equipment needed to make difficult streams practical.</p><p>Today the public program centers on cardboard and paper processing, clean EPS foam recovery, commercial recycling planning, and equipment guidance.</p></div><aside><strong>How to begin</strong><h3>Bring the material details.</h3><p>Tell the team what it is, how much you have, where it is, and whether it is a one-time or recurring stream.</p><a href="/contact">Contact Tri-Power →</a></aside></section><ContactBand /></>
}

function Location() {
  return <><PageHero page={routes['/location']} /><section className="location"><div><p className="eyebrow dark">Facility details</p><h2>1240 Anderson Street</h2><p>Elkhart, Indiana 46514</p><a href="tel:+15748481900">574-848-1900</a><a className="button primary" href="https://www.google.com/maps/search/?api=1&query=1240+Anderson+Street+Elkhart+IN+46514" target="_blank" rel="noreferrer">Open map <span aria-hidden="true">↗</span></a></div><aside><h3>Before you visit</h3><p>Call the office to confirm current drop-off hours, accepted materials, preparation requirements, and any quantity restrictions.</p><p>Material policies can change; a quick call can prevent a wasted trip.</p></aside></section><ContactBand /></>
}

function Privacy() {
  return <><PageHero page={routes['/privacy']} /><article className="policy"><p className="policyNote"><strong>Pre-launch notice:</strong> Final inquiry routing, retention, and analytics details will be updated before this preview becomes the production website.</p><h2>Website information</h2><p>This website provides general information about Tri-Power Recycling and ways to contact the business. Confirm current material acceptance, program availability, hours, shipping instructions, and operational details directly with Tri-Power.</p><h2>Information collected</h2><p>The inquiry form collects information a visitor chooses to provide, including contact details, material location, inquiry type, and message.</p><h2>How information is used</h2><p>Inquiry information is used to respond to the request and operate the relevant service. Tri-Power does not present inquiry details as a public lead log.</p><h2>Retention and security</h2><p>The final production processors and retention period will be documented when the inquiry workflow is approved. No system can guarantee absolute transmission or storage security.</p><h2>Children and external links</h2><p>The service is not directed to children under 13. External links are governed by the destination’s own terms and privacy practices.</p><h2>Policy changes and contact</h2><p>Updates will be posted on this page. Questions can be directed to Tri-Power Recycling at <a href="tel:+15748481900">574-848-1900</a>.</p></article></>
}

function App() {
  const [menu, setMenu] = useState(false)
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  useEffect(() => { updateMetadata(routes[path]); window.scrollTo(0, 0) }, [path])

  let content: ReactNode
  if (path === '/') content = <Home />
  else if (path === '/services') content = <Services />
  else if (path === '/about') content = <About />
  else if (path === '/location') content = <Location />
  else if (path === '/contact') content = <><PageHero page={routes[path]} /><ContactBand form /></>
  else if (path === '/privacy') content = <Privacy />
  else if (routes[path]) content = <DetailPage path={path} />
  else content = <section className="notFound"><p className="eyebrow dark">Page not found</p><h1>This material took a wrong turn.</h1><a className="button primary" href="/">Return home</a></section>

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="notice">Current notice: general plastics are not accepted at this time. Clean EPS foam is the exception.</div>
      <header className="header">
        <a className="brand" href="/" aria-label="Tri-Power Recycling home"><img src="/images/logo.png" alt="" /></a>
        <button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="primary-navigation">Menu</button>
        <nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary"><a href="/services">Materials</a><a href="/commercial-recycling">Commercial</a><a href="/recycling-equipment">Equipment</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
        <a className="call" href="tel:+15748481900"><span>Call the office</span>574-848-1900</a>
      </header>
      <main id="main">{content}</main>
      <footer>
        <a href="/" aria-label="Tri-Power Recycling home"><img src="/images/logo.png" alt="" /></a>
        <div><strong>Tri-Power Recycling</strong><p>1240 Anderson Street · Elkhart, IN 46514</p><a href="tel:+15748481900">574-848-1900</a></div>
        <div className="footerLinks"><a href="/services">Services</a><a href="/location">Location</a><a href="/contact">Contact</a><a href="/privacy">Terms & privacy</a></div>
        <span>Preview website · Confirm current hours and material acceptance before visiting.</span>
      </footer>
    </>
  )
}

export default App
