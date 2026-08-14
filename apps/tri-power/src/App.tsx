import { FormEvent, useState } from 'react'

const materials = [
  { name: 'Cardboard', text: 'Loose or baled cardboard from homes, warehouses, and manufacturing operations.', image: '/images/cardboard.jpg' },
  { name: 'Paper & fiber', text: 'Paper, books, cores, and related clean fiber streams for local and commercial programs.', image: '/images/paper.jpg' },
  { name: 'EPS foam', text: 'Clean expanded polystyrene foam processed with specialized densifying equipment.', image: '/images/foam.jpg' },
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
      setStatus(response.ok ? 'Thanks — your inquiry was sent.' : body.error)
      if (response.ok) form.reset()
    } catch { setStatus('Preview mode: inquiry delivery will be connected after recipients are confirmed.') }
  }

  return <>
    <div className="notice">Current public notice: plastics are not accepted at this time except clean EPS foam.</div>
    <header className="header"><a className="brand" href="#top"><img src="/images/logo.png" alt="Tri-Power Recycling" /></a><button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="navigation">Menu</button><nav id="navigation" className={menu ? 'open' : ''} aria-label="Primary"><a href="#materials">Materials</a><a href="#commercial">Commercial</a><a href="#equipment">Equipment</a><a href="#contact">Contact</a></nav><a className="call" href="tel:+15748481900">574-848-1900</a></header>
    <main id="top">
      <section className="hero"><img src="/images/facility.jpg" alt="Tri-Power Recycling facility at sunrise" /><div className="heroShade"/><div className="heroCopy"><p className="eyebrow">Elkhart, Indiana · Industrial recycling</p><h1>Turn difficult material streams into a practical recycling program.</h1><p>Tri-Power works with businesses and individuals on cardboard, paper, and clean EPS foam — from local drop-off to commercial collection and equipment planning.</p><div className="actions"><a className="button primary" href="#contact">Talk with our team</a><a className="button ghost" href="#materials">See current materials</a></div></div><div className="heroStat"><strong>1240 Anderson Street</strong><span>Elkhart, Indiana 46514</span></div></section>
      <section className="intro"><p className="eyebrow dark">Straight answers. Real processing.</p><h2>Recycling built around the material you actually have.</h2><p>Every program starts with the stream, volume, space, and pickup needs at your facility. We help identify a workable path without making unverified promises about materials we are not currently accepting.</p></section>
      <section className="materials" id="materials">{materials.map(item => <article key={item.name}><img src={item.image} alt=""/><div><span>Material stream</span><h3>{item.name}</h3><p>{item.text}</p><a href="#contact">Ask about this material →</a></div></article>)}</section>
      <section className="commercial" id="commercial"><div><p className="eyebrow">Commercial programs</p><h2>Collection, processing, and equipment that fit the floor.</h2><p>Tri-Power’s legacy program includes recycling audits, collection planning, baled-material pickup, and guidance on balers and compactors.</p><ul><li>Review the type and volume of material</li><li>Consider space and equipment constraints</li><li>Plan a practical collection schedule</li></ul><a className="button light" href="#contact">Discuss a commercial program</a></div><aside id="equipment"><span>Equipment guidance</span><strong>Balers & compactors</strong><p>Legacy options include lease, lease-to-purchase, and purchase arrangements. Availability requires confirmation.</p></aside></section>
      <section className="contact" id="contact"><div><p className="eyebrow dark">Start with the material</p><h2>Tell us what you need to recycle.</h2><p>For immediate help, call the office. The preview form below is ready for final routing once business recipients are confirmed.</p><address><strong>Tri-Power Recycling</strong><br/>1240 Anderson Street<br/>Elkhart, IN 46514<br/><a href="tel:+15748481900">574-848-1900</a></address></div><form onSubmit={submit}><label>Name<input name="name" required autoComplete="name"/></label><label>Company<input name="company" autoComplete="organization"/></label><label>Email<input name="email" type="email" required autoComplete="email"/></label><label>Phone<input name="phone" type="tel" autoComplete="tel"/></label><label>What material and volume do you have?<textarea name="message" required rows={4}/></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><button className="button primary" type="submit">Send inquiry</button><p className="formStatus" role="status">{status}</p><small>By sending this form, you agree that Tri-Power may contact you about this inquiry.</small></form></section>
    </main>
    <footer><img src="/images/logo.png" alt="Tri-Power Recycling"/><p>Practical recycling programs from Elkhart, Indiana.</p><a href="tel:+15748481900">574-848-1900</a><span>Preview build · Public hours and material policies require confirmation before launch.</span></footer>
  </>
}
export default App
