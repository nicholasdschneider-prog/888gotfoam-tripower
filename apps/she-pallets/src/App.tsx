import { FormEvent, useState } from 'react'

const services = [
  { number: '01', title: 'New pallets', text: 'Consistent builds for operations that need dependable, repeatable pallet supply.', image: '/images/new-pallets.jpg' },
  { number: '02', title: 'Recycled pallets', text: 'Practical pallet reuse and remanufactured stock for common handling needs.', image: '/images/recycled-pallets.jpg' },
  { number: '03', title: 'Heat treated', text: 'Heat-treatment options for requirements that must be confirmed before quoting.', image: '/images/heat-treated.jpg' },
  { number: '04', title: 'Custom builds', text: 'Size, entry style, lumber mix, and construction planned around the load.', image: '/images/custom-pallets.jpg' },
]

function App() {
  const [menu, setMenu] = useState(false)
  const [status, setStatus] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('Sending…')
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) })
      const body = await response.json()
      setStatus(response.ok ? 'Thanks — your quote request was sent.' : body.error)
      if (response.ok) form.reset()
    } catch { setStatus('Preview mode: quote delivery will be connected after recipients are confirmed.') }
  }
  return <>
    <header><a className="logo" href="#top"><img src="/images/logo.png" alt="She Pallets" /></a><button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>Menu</button><nav className={menu?'open':''} aria-label="Primary"><a href="#solutions">Solutions</a><a href="#custom">Custom</a><a href="#about">About</a><a href="#quote">Quote</a></nav><a className="phone" href="tel:+15748481900">574-848-1900</a></header>
    <main id="top">
      <section className="hero"><div className="heroCopy"><p className="eyebrow">Woman & family owned · Elkhart, Indiana</p><h1>Built for the way you move.</h1><p>New, recycled, heat-treated, and custom pallet solutions shaped around real products, real docks, and real schedules.</p><div className="actions"><a className="button dark" href="#quote">Request a quote</a><a className="textLink" href="#solutions">Explore solutions ↓</a></div></div><div className="heroImage"><img src="/images/hero.jpg" alt="Stacks of wood pallets at the She Pallets facility"/><span>From standard 48 × 40 to one-off custom builds</span></div></section>
      <section className="ticker" aria-label="Pallet capabilities"><span>NEW PALLETS</span><span>RECYCLED STOCK</span><span>HEAT TREATMENT</span><span>CUSTOM BUILDS</span></section>
      <section className="solutions" id="solutions"><div className="sectionHead"><p className="eyebrow">One supplier. More ways to solve it.</p><h2>Start with the load — not a generic catalog.</h2><p>Choose the construction path that fits your handling, storage, shipping, and reuse needs.</p></div><div className="serviceGrid">{services.map(service=><article key={service.title}><img src={service.image} alt=""/><div><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#quote">Ask about this option →</a></div></article>)}</div></section>
      <section className="custom" id="custom"><div><p className="eyebrow pale">Custom capability</p><h2>Your product does not have to fit somebody else’s pallet.</h2><p>She Pallets’ existing catalog includes 52 documented sizes with linked CAD previews. For specialty loads, the team can discuss runner length, two- or four-way entry, grade, lumber mix, and heat-treatment needs.</p><a className="button cream" href="#quote">Plan a custom build</a></div><aside><span>Product code guide</span><dl><div><dt>Size</dt><dd>Runner length is listed first</dd></div><div><dt>Grade</dt><dd>A or B wood quality</dd></div><div><dt>Entry</dt><dd>2-way or 4-way</dd></div><div><dt>Lumber</dt><dd>Recycled, combination, or new</dd></div></dl><small>Specifications and availability are confirmed during quoting.</small></aside></section>
      <section className="about" id="about"><img src="/images/team.jpg" alt="Pallet operations at She Pallets"/><div><p className="eyebrow">Founded in 2022</p><h2>A growing pallet company with recycling in the family.</h2><p>She Pallets is a woman- and family-owned business headquartered in Elkhart, Indiana, and a sister company of Tri-Power Recycling. The operation combines pallet supply with a practical understanding of reuse and material recovery.</p><blockquote>Respect, honesty, integrity, and service that earns the next call.</blockquote></div></section>
      <section className="quote" id="quote"><div><p className="eyebrow">Request a quote</p><h2>What are you stacking?</h2><p>Share the size, quantity, load, and timing you know. The team can help clarify the rest.</p><address><strong>She Pallets</strong><br/>1240 Anderson Street<br/>Elkhart, IN 46514<br/><a href="tel:+15748481900">574-848-1900</a></address></div><form onSubmit={submit}><label>Name<input name="name" required autoComplete="name"/></label><label>Company<input name="company" autoComplete="organization"/></label><label>Email<input name="email" type="email" required autoComplete="email"/></label><label>Phone<input name="phone" type="tel" autoComplete="tel"/></label><div className="row"><label>Pallet size<input name="palletSize" placeholder="e.g. 48 × 40"/></label><label>Quantity<input name="quantity" inputMode="numeric"/></label></div><label>Type<select name="palletType"><option>Not sure yet</option><option>New</option><option>Recycled</option><option>Heat-treated</option><option>Custom</option></select></label><label>Tell us about the load and timing<textarea name="message" required rows={4}/></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><button className="button dark" type="submit">Send quote request</button><p className="formStatus" role="status">{status}</p><small>By sending this form, you agree that She Pallets may contact you about this request.</small></form></section>
    </main>
    <footer><img src="/images/logo.png" alt="She Pallets"/><p>Pallet solutions built in Elkhart, Indiana.</p><a href="tel:+15748481900">574-848-1900</a><span>Preview build · Service area, certifications, availability, and quote routing require confirmation before launch.</span></footer>
  </>
}
export default App
