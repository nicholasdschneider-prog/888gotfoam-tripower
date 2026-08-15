import { FormEvent, ReactNode, useEffect, useState } from 'react'

type Page = { title: string; description: string; eyebrow: string; heading: string; intro: string; image: string }
type Detail = { title: string; text: string }

const routes: Record<string, Page> = {
  '/services': { title: 'Recycling Services | Tri-Power Recycling', description: 'Explore cardboard, paper, EPS foam, commercial recycling, and equipment support.', eyebrow: 'Recycling services', heading: 'Start with the material stream.', intro: 'Tri-Power works with individuals and commercial operations on fiber, cardboard, and clean EPS foam. Current acceptance should always be confirmed before delivery.', image: '/images/facility.jpg' },
  '/services/cardboard': { title: 'Cardboard Recycling | Tri-Power Recycling', description: 'Cardboard drop-off, baling, pickup, and commercial collection options in Elkhart.', eyebrow: 'Cardboard recycling', heading: 'Give corrugated material another trip.', intro: 'The legacy program accepts loose or baled cardboard, including moving and shipping boxes. Commercial collection options are planned around volume, loading access, and equipment.', image: '/images/cardboard.jpg' },
  '/services/paper': { title: 'Paper Recycling | Tri-Power Recycling', description: 'Paper and fiber recycling for individuals and commercial operations.', eyebrow: 'Paper and fiber', heading: 'Separate the fiber. Build a cleaner stream.', intro: 'The legacy site lists office paper, books, cores, and related clean fiber streams. Contact the team before delivery to confirm the current material list.', image: '/images/paper.jpg' },
  '/services/plastics': { title: 'Plastic Recycling Status | Tri-Power Recycling', description: 'Current plastics acceptance notice from Tri-Power Recycling.', eyebrow: 'Current material notice', heading: 'General plastics are not currently accepted.', intro: 'The current public notice states that plastics are not accepted at this time, with the exception of clean EPS foam. Older broad plastics copy has not been carried forward as a current claim.', image: '/images/foam.jpg' },
  '/services/eps-foam': { title: 'EPS Foam Recycling | Tri-Power Recycling', description: 'Expanded polystyrene foam processing and commercial EPS recycling in Elkhart.', eyebrow: 'EPS foam recycling', heading: 'Take the air out of a difficult material stream.', intro: 'Expanded polystyrene is lightweight and bulky. Tri-Power processes clean EPS foam with specialized equipment that reduces its volume for transportation and reuse.', image: '/images/foam.jpg' },
  '/home-4-foam': { title: 'Home 4 Foam | Ship EPS Foam for Recycling', description: 'Legacy Home 4 Foam shipping program information from Tri-Power Recycling.', eyebrow: 'Legacy mail-in program', heading: 'Ship clean EPS foam for processing.', intro: 'The legacy Home 4 Foam program allows customers outside the local area to ship EPS foam to Tri-Power. Contact the team for current instructions before sending material.', image: '/images/foam.jpg' },
  '/commercial-recycling': { title: 'Commercial Recycling | Tri-Power Recycling', description: 'Commercial collection, recycling audits, equipment, and pickup planning.', eyebrow: 'Commercial programs', heading: 'Make recycling fit the floor.', intro: 'Tri-Power’s legacy commercial service combines material review, collection planning, pickup, and equipment guidance for facilities generating recyclable material.', image: '/images/facility.jpg' },
  '/recycling-equipment': { title: 'Recycling Equipment | Tri-Power Recycling', description: 'Baler and compactor guidance, purchase, lease, and lease-to-purchase options.', eyebrow: 'Balers and compactors', heading: 'Right-size the equipment before it reaches the floor.', intro: 'The legacy program includes vertical and horizontal balers, compactors, and related guidance through purchase, lease, or lease-to-purchase arrangements. Current inventory requires confirmation.', image: '/images/cardboard.jpg' },
  '/about': { title: 'About Tri-Power Recycling | Elkhart, Indiana', description: 'The family business story behind Tri-Power Recycling.', eyebrow: 'Family business', heading: 'Built through practical material recovery.', intro: 'Tri-Power Recycling is an Elkhart business serving individuals and commercial operations with recycling programs and material-processing experience.', image: '/images/facility.jpg' },
  '/location': { title: 'Location | Tri-Power Recycling', description: 'Find Tri-Power Recycling at 1240 Anderson Street in Elkhart, Indiana.', eyebrow: 'Elkhart facility', heading: 'Bring the material to the right place.', intro: 'The public facility address and office phone are confirmed below. Public drop-off hours and Saturday availability require business confirmation before launch.', image: '/images/facility.jpg' },
  '/contact': { title: 'Contact Tri-Power Recycling', description: 'Contact Tri-Power Recycling about materials, commercial programs, or equipment.', eyebrow: 'Contact the team', heading: 'Start with what you have.', intro: 'Describe the material, estimated volume, location, and timing. Inquiry routing will be connected after the correct recipients are confirmed.', image: '/images/cardboard.jpg' },
  '/privacy': { title: 'Terms & Privacy | Tri-Power Recycling', description: 'Terms and privacy information for the Tri-Power Recycling website.', eyebrow: 'Website policies', heading: 'Terms and privacy.', intro: 'The replacement site preserves the legacy policy topic while the May 3, 2022 policy is reviewed for the new forms, hosting, and analytics configuration.', image: '/images/facility.jpg' },
}

const details: Record<string, { heading: string; note: string; items: Detail[] }> = {
  '/services/cardboard': { heading: 'From local drop-off to scheduled collection', note: 'Fees, commodity payments, minimum quantities, and current acceptance must be confirmed before material is delivered.', items: [
    { title: 'Loose or baled cardboard', text: 'The archived site lists corrugated shipping and moving boxes, including material with tape, staples, or labels.' },
    { title: 'Commercial pickup', text: 'Legacy pickup options include ground- or dock-level service for smaller quantities and live-load or staged-trailer service for truckload quantities.' },
    { title: 'Collection equipment', text: 'Mesh cubes, dumpsters, compactors, and vertical or horizontal balers may support different volumes and spaces.' },
    { title: 'Material review', text: 'A recycling audit can identify material volume, available floor space, equipment needs, and a workable schedule.' },
  ] },
  '/services/paper': { heading: 'Keep fiber clean and useful', note: 'The archived list is migration evidence, not a guarantee of current acceptance. Confirm material before delivery.', items: [
    { title: 'Office paper', text: 'The legacy page describes sorted and mixed office-paper streams for recycling.' },
    { title: 'Books and publications', text: 'Archived content includes books, magazines, catalogs, and related paper products.' },
    { title: 'Cores and fiber', text: 'Paper cores and other clean fiber streams may be suitable for commercial programs.' },
    { title: 'Commercial quantities', text: 'Baled fiber pickup and collection planning depend on quantity, loading access, and schedule.' },
  ] },
  '/services/plastics': { heading: 'Why this page remains', note: 'Brent must confirm the current plastics policy before production launch. The sitewide notice is treated as authoritative for preview.', items: [
    { title: 'Legacy URL preserved', text: 'Search traffic and old inbound links receive a focused status page instead of an unrelated home-page redirect.' },
    { title: 'Older claim retired', text: 'Archived metadata that advertised plastics 1 through 7 conflicts with the newer public notice and is not presented as current fact.' },
    { title: 'EPS exception', text: 'Clean expanded polystyrene foam is the only plastics category identified as currently accepted in the live notice.' },
    { title: 'Confirm first', text: 'Call the office before transporting any plastic or foam material to the facility.' },
  ] },
  '/services/eps-foam': { heading: 'How the legacy foam program works', note: 'Exact accepted EPS forms and contamination rules require current confirmation. Packaging peanuts are listed as not accepted.', items: [
    { title: 'Identify EPS', text: 'EPS is a lightweight expanded bead foam used in protective packaging, appliances, RV production, and other applications.' },
    { title: 'Keep it clean', text: 'Clean material is sorted and processed; packaging peanuts are specifically excluded by the archived site.' },
    { title: 'Reduce the volume', text: 'Specialized densifying equipment presses air out of bulky foam to make transportation practical.' },
    { title: 'Commercial streams', text: 'The legacy program works with manufacturing, logistics, pharmaceutical, food, RV, and other high-volume operations.' },
  ] },
  '/home-4-foam': { heading: 'Before you ship', note: 'Do not send material until Tri-Power confirms that the program is active and provides current shipping and payment instructions.', items: [
    { title: 'Confirm the material', text: 'Verify that the product is clean EPS foam and not a different foam or biodegradable packaging peanut.' },
    { title: 'Request instructions', text: 'Packaging, shipping destination, program fees, and any purchase step must be confirmed directly.' },
    { title: 'Pack efficiently', text: 'The legacy program is intended to provide an option where local foam processing is unavailable.' },
    { title: 'Commercial volume', text: 'Businesses with recurring material should ask about a commercial recycling program instead of one-off shipping.' },
  ] },
  '/commercial-recycling': { heading: 'A program built around the operation', note: 'Service area, pricing, pickup minimums, and schedules remain subject to confirmation.', items: [
    { title: 'Recycling audit', text: 'Review current waste, recyclable streams, volumes, equipment, floor space, and handling.' },
    { title: 'Collection planning', text: 'Choose containers and pickup arrangements that match the loading area and material output.' },
    { title: 'Baled-material pickup', text: 'The legacy program includes service for smaller quantities and truckload volumes.' },
    { title: 'Equipment support', text: 'Evaluate balers and compactors alongside collection needs rather than as isolated purchases.' },
  ] },
  '/recycling-equipment': { heading: 'Match the machine to the stream', note: 'Equipment availability, manufacturer, condition, pricing, financing, and terms require confirmation.', items: [
    { title: 'Vertical balers', text: 'A potential fit for sites that need to bale cardboard or other approved material within limited floor space.' },
    { title: 'Horizontal balers', text: 'A higher-volume option where material flow and operating space support the equipment.' },
    { title: 'Compactors', text: 'Stationary or self-contained configurations may support different waste and recycling applications.' },
    { title: 'Flexible arrangements', text: 'Archived options include purchase, lease, and lease-to-purchase programs.' },
  ] },
}

const serviceCards = [
  { path: '/services/cardboard', title: 'Cardboard', text: 'Loose and baled corrugated material, plus commercial collection planning.', image: '/images/cardboard.jpg' },
  { path: '/services/paper', title: 'Paper & fiber', text: 'Office paper, books, cores, and related clean fiber streams.', image: '/images/paper.jpg' },
  { path: '/services/eps-foam', title: 'EPS foam', text: 'Clean expanded polystyrene processed with specialized densifying equipment.', image: '/images/foam.jpg' },
]

function updateMetadata(page?: Page) {
  const title = page?.title ?? 'Tri-Power Recycling | Elkhart, Indiana'
  const description = page?.description ?? 'Practical recycling programs for cardboard, paper, and EPS foam from Tri-Power Recycling.'
  document.title = title
  const set = (selector: string, value: string) => document.querySelector(selector)?.setAttribute('content', value)
  set('meta[name="description"]', description); set('meta[property="og:title"]', title); set('meta[property="og:description"]', description)
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.href = `https://tri-powerrecycling.com${window.location.pathname === '/' ? '' : window.location.pathname}`
}

function InquiryForm() {
  const [status, setStatus] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; setStatus('Sending…')
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
      const body = await response.json(); setStatus(body.ok ? 'Thanks — your inquiry was sent.' : body.error); if (body.ok) form.reset()
    } catch { setStatus('Preview mode: inquiry delivery will be connected after recipients are confirmed.') }
  }
  return <form onSubmit={submit}><label>Name<input name="name" required autoComplete="name" /></label><label>Company<input name="company" autoComplete="organization" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label><label>What material and volume do you have?<textarea name="message" required rows={5} /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button primary" type="submit">Send inquiry</button><p className="formStatus" role="status" aria-live="polite">{status}</p><small>By sending this form, you agree that Tri-Power may contact you about this inquiry.</small></form>
}

function PageHero({ page }: { page: Page }) { return <section className="pageHero"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.heading}</h1><p>{page.intro}</p></div><img src={page.image} alt="" fetchPriority="high" /></section> }

function ContactBand({ form = false }: { form?: boolean }) {
  return <section className="contact"><div><p className="eyebrow dark">Start with the material</p><h2>Talk with the Tri-Power team.</h2><p>Call the office or describe the material and volume. Public hours and inquiry recipients must be confirmed before launch.</p><address><strong>Tri-Power Recycling</strong><br />1240 Anderson Street<br />Elkhart, IN 46514<br /><a href="tel:+15748481900">574-848-1900</a></address></div>{form ? <InquiryForm /> : <div className="contactCard"><p>Use the inquiry form to keep the material details together.</p><a className="button primary" href="/contact">Open inquiry form</a></div>}</section>
}

function Materials() { return <section className="materials">{serviceCards.map((item) => <article key={item.path}><img src={item.image} alt="" loading="lazy" /><div><span>Material stream</span><h3>{item.title}</h3><p>{item.text}</p><a href={item.path}>View material guidance →</a></div></article>)}</section> }

function Home() {
  return <><section className="hero"><img src="/images/facility.jpg" alt="Tri-Power Recycling facility at sunrise" /><div className="heroShade" /><div className="heroCopy"><p className="eyebrow">Elkhart, Indiana · Industrial recycling</p><h1>Turn difficult material streams into a practical recycling program.</h1><p>Tri-Power works with businesses and individuals on cardboard, paper, and clean EPS foam—from local drop-off to commercial collection and equipment planning.</p><div className="actions"><a className="button primary" href="/contact">Talk with our team</a><a className="button ghost" href="/services">See current materials</a></div></div><div className="heroStat"><strong>1240 Anderson Street</strong><span>Elkhart, Indiana 46514</span></div></section><section className="intro"><p className="eyebrow dark">Straight answers. Real processing.</p><h2>Recycling built around the material you actually have.</h2><p>Every program starts with the stream, volume, space, and pickup needs at your facility.</p></section><Materials /><section className="commercial"><div><p className="eyebrow">Commercial programs</p><h2>Collection, processing, and equipment that fit the floor.</h2><p>Tri-Power’s legacy program includes recycling audits, collection planning, baled-material pickup, and guidance on balers and compactors.</p><a className="button light" href="/commercial-recycling">Explore commercial service</a></div><aside><span>Equipment guidance</span><strong>Balers & compactors</strong><p>Legacy options include lease, lease-to-purchase, and purchase arrangements. Availability requires confirmation.</p><a href="/recycling-equipment">View equipment guidance →</a></aside></section><ContactBand /></>
}

function Services() { return <><PageHero page={routes['/services']} /><section className="intro"><p className="eyebrow dark">Current acceptance</p><h2>Fiber, cardboard, and clean EPS foam.</h2><p>General plastics are not currently accepted. Confirm the exact material and delivery details before visiting.</p></section><Materials /><ContactBand /></> }

function DetailPage({ path }: { path: string }) {
  const detail = details[path]
  return <><PageHero page={routes[path]} />{detail && <section className="detail"><div className="detailLead"><p className="eyebrow dark">Program details</p><h2>{detail.heading}</h2><p>{detail.note}</p></div><div className="detailGrid">{detail.items.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>}<ContactBand /></>
}

function About() { return <><PageHero page={routes['/about']} /><section className="story"><div><p className="eyebrow dark">The archived story</p><h2>A family recycling business in Elkhart.</h2><p>The legacy site describes Tri-Power as a family-owned operation that grew through material recovery, customer service, and investment in recycling equipment.</p><p>Its public content connects the business with commercial recycling, cardboard and paper processing, EPS foam recovery, and equipment support. Claims about national scale remain preserved in the archive but are not repeated as verified facts in this preview.</p></div><aside><strong>Related business</strong><h3>She Pallets</h3><p>She Pallets is the woman- and family-owned sister company serving pallet supply, custom builds, and recovery needs.</p><a href="https://www.shepallets.com">Visit She Pallets ↗</a></aside></section><ContactBand /></> }

function Location() { return <><PageHero page={routes['/location']} /><section className="location"><div><p className="eyebrow dark">Verified public details</p><h2>1240 Anderson Street</h2><p>Elkhart, Indiana 46514</p><a href="tel:+15748481900">574-848-1900</a><a className="button primary" href="https://www.google.com/maps/search/?api=1&query=1240+Anderson+Street+Elkhart+IN+46514" target="_blank" rel="noreferrer">Open map ↗</a></div><aside><h3>Before you visit</h3><p>Call the office to confirm current drop-off hours, Saturday availability, accepted materials, preparation requirements, and any quantity restrictions.</p><p>Do not rely on hours or material lists from third-party directories.</p></aside></section><ContactBand /></> }

function Privacy() { return <><PageHero page={routes['/privacy']} /><article className="policy"><p className="policyNote"><strong>Preview note:</strong> The archived policy was last updated May 3, 2022. It must receive business/legal review before production because the hosting and inquiry workflow are changing.</p><h2>Website terms</h2><p>This website provides information about Tri-Power Recycling services and contact paths. Visitors are responsible for confirming current material acceptance, program availability, shipping instructions, and other operational details directly with Tri-Power.</p><h2>Information collected</h2><p>The inquiry form collects the information a visitor chooses to provide, including name, company, email, phone, and message. Production delivery is not enabled until recipients and the approved delivery service are configured.</p><h2>How information is used</h2><p>Inquiry information is used to respond to the visitor’s request and operate the relevant service. It is not presented as a public lead log.</p><h2>Retention, transfer, and security</h2><p>The final retention period, processors, analytics tools, and cross-border data handling must be documented after the production services are approved. No system can guarantee absolute transmission or storage security.</p><h2>Children and external links</h2><p>The service is not directed to children under 13. External links are governed by the destination’s own terms and privacy practices.</p><h2>Policy changes and contact</h2><p>Updates will be posted on this page. Questions can be directed to Tri-Power Recycling at <a href="tel:+15748481900">574-848-1900</a>.</p></article></> }

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

  return <><a className="skip" href="#main">Skip to content</a><div className="notice">Current public notice: plastics are not accepted at this time except clean EPS foam.</div><header className="header"><a className="brand" href="/" aria-label="Tri-Power Recycling home"><img src="/images/logo.png" alt="" /></a><button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="primary-navigation">Menu</button><nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary"><a href="/services">Materials</a><a href="/commercial-recycling">Commercial</a><a href="/recycling-equipment">Equipment</a><a href="/about">About</a><a href="/contact">Contact</a></nav><a className="call" href="tel:+15748481900">574-848-1900</a></header><main id="main">{content}</main><footer><a href="/" aria-label="Tri-Power Recycling home"><img src="/images/logo.png" alt="" /></a><div><strong>Tri-Power Recycling</strong><p>1240 Anderson Street · Elkhart, IN 46514</p></div><div className="footerLinks"><a href="/services">Services</a><a href="/location">Location</a><a href="/privacy">Terms & privacy</a></div><span>Preview build · Public hours, material policies, service area, and routing require confirmation before launch.</span></footer></>
}

export default App
