import { FormEvent, ReactNode, useEffect, useState } from 'react'
import { featuredPallets, pallets } from './pallets'

type Page = { title: string; description: string; eyebrow: string; heading: string; intro: string; image: string }

const services = [
  { path: '/new-pallets', title: 'New pallets', text: 'Clean, consistent construction with size and load options discussed for each application.', image: '/images/new-pallets.jpg' },
  { path: '/recycled-pallets', title: 'Recycled pallets', text: 'Reused and remanufactured stock for operations that need a practical pallet supply.', image: '/images/recycled-pallets.jpg' },
  { path: '/heat-treated-pallets', title: 'Heat treated', text: 'Pallet options for international shipping requirements, confirmed during quoting.', image: '/images/heat-treated.jpg' },
  { path: '/custom-pallets', title: 'Custom builds', text: 'Size, entry style, grade, lumber mix, and construction planned around the load.', image: '/images/custom-pallets.jpg' },
]

const pages: Record<string, Page> = {
  '/services': { title: 'Pallet Services | She Pallets', description: 'Explore new, recycled, heat-treated, and custom pallet options from She Pallets.', eyebrow: 'Four practical paths', heading: 'Pallet solutions built around the load.', intro: 'Start with the product, handling requirements, storage plan, and shipping route. Then choose the pallet construction that fits.', image: '/images/hero.jpg' },
  '/new-pallets': { title: 'New Pallets | She Pallets', description: 'New wood pallet options with repeatable construction and custom sizing.', eyebrow: 'New pallet supply', heading: 'Consistency from the first build onward.', intro: 'New pallets provide clean materials, repeatable dimensions, and construction selected for the demands of storage and transportation.', image: '/images/new-pallets.jpg' },
  '/heat-treated-pallets': { title: 'Heat-Treated Pallets | She Pallets', description: 'Discuss heat-treated wood pallet requirements for international shipping.', eyebrow: 'International shipping', heading: 'Plan heat treatment into the pallet—not after it.', intro: 'International shipments may require wood packaging treated and marked under ISPM 15. She Pallets can discuss the correct build and treatment requirement before quoting.', image: '/images/heat-treated.jpg' },
  '/custom-pallets': { title: 'Custom Pallets | She Pallets', description: 'Custom wood pallets sized and configured for specialized products and handling.', eyebrow: 'Custom capability', heading: 'Build the pallet around the product.', intro: 'A custom pallet can fit unusual dimensions, protect sensitive loads, simplify handling, and make better use of storage and shipping space.', image: '/images/custom-pallets.jpg' },
  '/recycled-pallets': { title: 'Recycled Pallets | She Pallets', description: 'Recycled and remanufactured pallet options from She Pallets.', eyebrow: 'Reuse and recovery', heading: 'Keep useful pallet material working.', intro: 'Recycled and remanufactured pallets can provide a cost-conscious supply option while keeping usable wood in circulation.', image: '/images/recycled-pallets.jpg' },
  '/about-us': { title: 'About She Pallets | Elkhart, Indiana', description: 'Meet the woman- and family-owned pallet company founded in Elkhart in 2022.', eyebrow: 'Founded in 2022', heading: 'Pallet experience with recycling in the family.', intro: 'She Pallets is a woman- and family-owned business headquartered in Elkhart, Indiana, and a sister company of Tri-Power Recycling.', image: '/images/team.jpg' },
  '/preview-pallets': { title: 'Preview Pallet Designs | She Pallets', description: 'Open CAD previews for frequently requested She Pallets sizes.', eyebrow: 'CAD previews', heading: 'See the build before you request it.', intro: 'Review frequently requested sizes in Onshape, then share the grade, entry, lumber, and treatment options your application needs.', image: '/images/custom-pallets.jpg' },
  '/pallet-list': { title: 'Pallet Size & CAD List | She Pallets', description: 'Browse 52 documented pallet sizes and their original Onshape CAD previews.', eyebrow: '52 documented sizes', heading: 'The complete pallet preview list.', intro: 'Every size and CAD destination from the legacy catalog is preserved below. Options and current availability are confirmed during quoting.', image: '/images/hero.jpg' },
  '/contact-location': { title: 'Contact & Location | She Pallets', description: 'Contact She Pallets in Elkhart, Indiana, or request a pallet quote.', eyebrow: 'Contact and location', heading: 'Tell us what you are stacking.', intro: 'Share the size, quantity, load, and timing you know. The team can help clarify the rest.', image: '/images/team.jpg' },
}

const detailContent: Record<string, { heading: string; items: { title: string; text: string }[]; note?: string }> = {
  '/new-pallets': { heading: 'Why operations choose new pallets', items: [
    { title: 'Quality and durability', text: 'New materials and repeatable construction support predictable handling and a longer useful life.' },
    { title: 'Hygiene and safety', text: 'New wood begins free from the unknown contaminants and damage that may be present in used stock.' },
    { title: 'Customization', text: 'Dimensions and construction can be selected for the product, load capacity, and handling requirements.' },
    { title: 'Long-term value', text: 'A durable, purpose-built pallet may reduce replacement, maintenance, and product-damage costs over time.' },
  ] },
  '/heat-treated-pallets': { heading: 'What heat treatment supports', note: 'Specific certifications, markings, and export requirements must be confirmed for each order before production.', items: [
    { title: 'ISPM 15 planning', text: 'International shipping rules use heat treatment to reduce the movement of wood-borne pests across borders.' },
    { title: 'Pest control', text: 'The treatment process targets insects and larvae in solid wood packaging material.' },
    { title: 'Shipment compliance', text: 'Correctly treated and marked packaging can help avoid rejected shipments and customs delays.' },
    { title: 'Chemical-free process', text: 'Heat treatment addresses pest risk without relying on a chemical fumigation process.' },
  ] },
  '/custom-pallets': { heading: 'Where a custom build helps', items: [
    { title: 'Optimized storage', text: 'Fit specific racks, floor spaces, and product footprints instead of wasting usable space.' },
    { title: 'Load protection', text: 'Support dimensions and sensitive contact points that a standard pallet may miss.' },
    { title: 'Efficient handling', text: 'Plan entry style and deck layout around forklifts, pallet jacks, loading, and unloading.' },
    { title: 'Special requirements', text: 'Discuss unusual sizes, reusable builds, crates, lumber mix, and export treatment needs.' },
  ] },
  '/recycled-pallets': { heading: 'Useful material, returned to service', note: 'The legacy site advertises scrap-pallet pickup, drop-off, and payment. Current availability and terms must be confirmed before scheduling.', items: [
    { title: 'Waste reduction', text: 'Repair and remanufacturing keep usable wood and pallet components out of disposal streams.' },
    { title: 'Cost-conscious supply', text: 'Recycled pallets can be a practical alternative when a new build is not required.' },
    { title: 'Adaptable stock', text: 'Existing material may be repaired or modified for common sizes and handling needs.' },
    { title: 'Scrap recovery', text: 'Ask the team about current options for used and broken pallets before arranging pickup or drop-off.' },
  ] },
}

function updateMetadata(page: Page | undefined) {
  const title = page?.title ?? 'She Pallets | Built for the way you move'
  const description = page?.description ?? 'New, recycled, heat-treated, and custom pallet solutions from Elkhart, Indiana.'
  document.title = title
  const set = (selector: string, value: string) => document.querySelector(selector)?.setAttribute('content', value)
  set('meta[name="description"]', description)
  set('meta[property="og:title"]', title)
  set('meta[property="og:description"]', description)
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.href = `https://www.shepallets.com${window.location.pathname === '/' ? '' : window.location.pathname}`
}

function QuoteForm() {
  const [status, setStatus] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('Sending…')
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
      const body = await response.json()
      setStatus(body.ok ? 'Thanks — your quote request was sent.' : body.error)
      if (body.ok) form.reset()
    } catch { setStatus('Preview mode: quote delivery will be connected after recipients are confirmed.') }
  }
  return <form onSubmit={submit}><label>Name<input name="name" required autoComplete="name" /></label><label>Company<input name="company" autoComplete="organization" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label><div className="row"><label>Pallet size<input name="palletSize" placeholder="e.g. 48 × 40" /></label><label>Quantity<input name="quantity" inputMode="numeric" /></label></div><label>Type<select name="palletType"><option>Not sure yet</option><option>New</option><option>Recycled</option><option>Heat-treated</option><option>Custom</option></select></label><label>Tell us about the load and timing<textarea name="message" required rows={5} /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button dark" type="submit">Send quote request</button><p className="formStatus" role="status" aria-live="polite">{status}</p><small>By sending this form, you agree that She Pallets may contact you about this request.</small></form>
}

function PageHero({ page }: { page: Page }) { return <section className="pageHero"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.heading}</h1><p>{page.intro}</p></div><img src={page.image} alt="" fetchPriority="high" /></section> }

function ContactBand({ form = false }: { form?: boolean }) {
  return <section className="quote" id="quote"><div><p className="eyebrow">Request a quote</p><h2>What are you stacking?</h2><p>Share the size, quantity, load, and timing you know. The team can help clarify the rest.</p><address><strong>She Pallets</strong><br />1240 Anderson Street<br />Elkhart, IN 46514<br /><a href="tel:+15748481900">574-848-1900</a><br /><a href="mailto:sales@shepallets.com">sales@shepallets.com</a></address></div>{form ? <QuoteForm /> : <div className="ctaPanel"><p>Use the full quote form to keep the product details together.</p><a className="button dark" href="/contact-location">Open quote form</a></div>}</section>
}

function Home() {
  return <><section className="hero"><div className="heroCopy"><p className="eyebrow">Woman & family owned · Elkhart, Indiana</p><h1>Built for the way you move.</h1><p>New, recycled, heat-treated, and custom pallet solutions shaped around real products, real docks, and real schedules.</p><div className="actions"><a className="button dark" href="/contact-location">Request a quote</a><a className="textLink" href="/services">Explore solutions →</a></div></div><div className="heroImage"><picture className="heroPicture"><source media="(min-width: 901px)" srcSet="/images/hero.jpg" /><img src="/images/hero-mobile.jpg" alt="Stacks of wood pallets at the She Pallets facility" fetchPriority="high" /></picture><span>From standard 48 × 40 to one-off custom builds</span></div></section><section className="ticker" aria-label="Pallet capabilities"><span>NEW PALLETS</span><span>RECYCLED STOCK</span><span>HEAT TREATMENT</span><span>CUSTOM BUILDS</span></section><ServicesGrid /><section className="about"><img src="/images/team.jpg" alt="Pallet operations at She Pallets" loading="lazy" /><div><p className="eyebrow">Founded in 2022</p><h2>A growing pallet company with recycling in the family.</h2><p>She Pallets is a woman- and family-owned business headquartered in Elkhart, Indiana, and a sister company of Tri-Power Recycling.</p><blockquote>Respect, honesty, integrity, and service that earns the next call.</blockquote><a className="textLink" href="/about-us">Read our story →</a></div></section><ContactBand /></>
}

function ServicesGrid() {
  return <section className="solutions"><div className="sectionHead"><p className="eyebrow">One supplier. More ways to solve it.</p><h2>Start with the load—not a generic catalog.</h2><p>Choose the construction path that fits your handling, storage, shipping, and reuse needs.</p></div><div className="serviceGrid">{services.map((service, index) => <article key={service.path}><img src={service.image} alt="" loading="lazy" /><div><span>0{index + 1}</span><h3>{service.title}</h3><p>{service.text}</p><a href={service.path}>Explore this option →</a></div></article>)}</div></section>
}

function StandardPage({ path, children }: { path: string; children?: ReactNode }) {
  const page = pages[path]
  const detail = detailContent[path]
  return <><PageHero page={page} />{path === '/services' ? <ServicesGrid /> : detail ? <section className="detail"><div className="sectionHead compact"><p className="eyebrow">What to consider</p><h2>{detail.heading}</h2><p>{detail.note ?? 'Final specifications and current availability are confirmed during quoting.'}</p></div><div className="detailGrid">{detail.items.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section> : children}<ContactBand /></>
}

function AboutPage() {
  return <StandardPage path="/about-us"><section className="story"><div><h2>Woman-owned. Family-operated.</h2><p>Founded in 2022, She Pallets grew alongside the family’s recycling experience at Tri-Power Recycling. The legacy site describes pallet supply, pickup and recovery of used units, remanufactured stock, and custom builds.</p><p>The public site lists service across Indiana, Illinois, and Michigan. That service-area statement remains subject to business confirmation before launch.</p></div><aside><h3>How product codes work</h3><dl><div><dt>Size</dt><dd>Runner length is listed first.</dd></div><div><dt>Grade</dt><dd>A or B indicates wood quality.</dd></div><div><dt>Entry</dt><dd>2 means two-way; 4 means four-way.</dd></div><div><dt>Lumber</dt><dd>No letter means a combination; N means all-new lumber.</dd></div><div><dt>Treatment</dt><dd>HT identifies heat treatment.</dd></div></dl></aside></section></StandardPage>
}

function Catalog({ featured = false }: { featured?: boolean }) {
  const list = featured ? featuredPallets : pallets
  return <><PageHero page={pages[featured ? '/preview-pallets' : '/pallet-list']} /><section className="catalog" aria-label={featured ? 'Frequently requested pallet previews' : 'Complete pallet preview list'}><div className="catalogIntro"><h2>{featured ? 'Frequently requested builds' : 'Browse every archived size'}</h2><p>Each design is available in the combinations shown on the legacy site: Grade A or B, two- or four-way entry, and recycled, combination, or new lumber. Confirm the exact build during quoting.</p></div><div className="catalogGrid">{list.map((pallet) => <article key={pallet.size}><span>CAD preview</span><h2>{pallet.size}</h2><ul><li>Grade A or B</li><li>2- or 4-way</li><li>Recycled, combination, or new lumber</li></ul><a href={pallet.url} target="_blank" rel="noreferrer">View in Onshape <span aria-hidden="true">↗</span></a></article>)}</div>{featured && <a className="button dark center" href="/pallet-list">View all 52 sizes</a>}</section><ContactBand /></>
}

function App() {
  const [menu, setMenu] = useState(false)
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  useEffect(() => { updateMetadata(pages[path]); window.scrollTo(0, 0) }, [path])
  let content: ReactNode
  if (path === '/') content = <Home />
  else if (path === '/about-us') content = <AboutPage />
  else if (path === '/preview-pallets') content = <Catalog featured />
  else if (path === '/pallet-list') content = <Catalog />
  else if (path === '/contact-location') content = <><PageHero page={pages[path]} /><ContactBand form /></>
  else if (pages[path]) content = <StandardPage path={path} />
  else content = <section className="notFound"><p className="eyebrow">Page not found</p><h1>That pallet is not on this rack.</h1><a className="button dark" href="/">Return home</a></section>

  return <><a className="skip" href="#main">Skip to content</a><header><a className="logo" href="/" aria-label="She Pallets home"><img src="/images/logo.png" alt="" /></a><button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="primary-navigation">Menu</button><nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary"><a href="/services">Services</a><a href="/preview-pallets">Pallet previews</a><a href="/about-us">About</a><a href="/contact-location">Quote & contact</a></nav><a className="phone" href="tel:+15748481900">574-848-1900</a></header><main id="main">{content}</main><footer><a href="/" aria-label="She Pallets home"><img src="/images/logo.png" alt="" /></a><div><strong>She Pallets</strong><p>1240 Anderson Street · Elkhart, IN 46514</p></div><div className="footerLinks"><a href="/services">Services</a><a href="/pallet-list">Pallet list</a><a href="/contact-location">Contact</a></div><span>Preview build · Service area, certifications, availability, and quote routing require confirmation before launch.</span></footer></>
}

export default App
