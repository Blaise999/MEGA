import {Film,VisualStories} from '../components/VisualMedia';
import {Blueprint} from '../components/Blueprint';
import {PolicyLibrary} from '../components/PolicyLibrary';
import {CampaignMap} from '../components/CampaignMap';
import data from '../data/content.json';
import {pdf} from '../components/constants';
import {CampaignHeadlines} from '../components/CampaignEditorial';
import {PolicyStories} from '../components/PolicyStories';
import {TicketFeature,CampaignGallery} from '../components/TicketFeature';
export default function Home(){return <>
<section className="hero-v4"><div className="wrap hero-v4-grid"><div className="hero-v4-copy"><span className="kicker gold">NDC · Enugu State · 2027</span><h1>Make Enugu<br/>Great for <em>All.</em></h1><div className="hero-rule"/><p>Ohaa–Omeje 2027<br/><strong>The Rescue Mission</strong></p><div className="actions"><a className="button red" href="/manifesto">Explore the manifesto →</a><a className="button outline" href="/candidates">Meet the ticket →</a></div><a className="hero-pdf" href={pdf} download>Download the 59-page document ↓</a></div><figure className="hero-ohaa"><img src="/images/hero.webp" alt="Sir Chinyeaka Christian Ohaa" fetchPriority="high"/><figcaption><b>Sir Chinyeaka Christian Ohaa</b><span>NDC governorship candidate</span></figcaption></figure></div></section>
<div className="breaking"><div className="wrap"><span>18 NOVEMBER 2026</span><a href="https://independent.ng/enugu-ndc-governorship-candidate-inaugurates-campaign-council/" target="_blank" rel="noreferrer">Rescue Mission manifesto unveiled; 310-member campaign council inaugurated ↗</a><a href="/news">Newsroom →</a></div></div>
<section className="section wrap mission-v4"><div><span className="kicker">Our plan for Enugu</span><h2>The Rescue<br/>Mission.</h2><p>Economic recovery, accountable governance and public services across rural and urban Enugu.</p><a className="button dark" href="/manifesto">Read the 2027 plan →</a></div><div className="mission-stats"><div><b>17</b><span>Local government areas</span></div><div><b>260</b><span>Wards in the Rural Rescue Compact</span></div><div><b>60%</b><span>Target share of new road infrastructure for rural LGAs</span></div><a href="/rural-compact">Ten commitments · Explore the compact ↗</a></div></section>
<PolicyStories/>
<TicketFeature/>
<section className="section deep first-v4"><div className="wrap"><div className="section-heading"><div><span className="kicker gold">Proposed implementation</span><h2>The first 100 days.</h2></div><a className="text-link light" href="/first-100-days">Full timeline ↗</a></div><p className="subline">Milestones after assuming office, as proposed in the manifesto.</p><div className="timeline-grid">{data.milestones.filter(x=>['Day 7','Day 30','Day 60','Day 90','Day 100'].includes(x.time)).map(x=><article key={x.time}><span>{x.time}</span><h3>{x.title}</h3><p>{x.body}</p><a href={pdf+'#page='+x.page}>Manifesto p. {x.page} ↗</a></article>)}</div></div></section>
<section className="section wrap"><div className="section-heading"><div><span className="kicker">Campaign activity</span><h2>Across Enugu.</h2></div><a className="text-link" href="/campaign-trail">Campaign trail ↗</a></div><CampaignMap/></section>
<CampaignHeadlines/><CampaignGallery/>
<Film/>
<section className="section wrap policy-index-v4"><div className="section-heading"><h2>Explore every policy.</h2><a className="text-link" href="/manifesto">Complete manifesto ↗</a></div><PolicyLibrary limit={6}/></section>
<Blueprint/><VisualStories/>
<section className="section deep"><div className="wrap campaign-desk"><div><h2>MEGA campaign desk.</h2><p>The ticket, statements, news, public appearances and the original manifesto.</p></div><div><a href="/events">Events <span>→</span></a><a href="/news">Newsroom <span>→</span></a><a href="/media">Photos and films <span>→</span></a><a href="/press">Press resources <span>→</span></a><a href="/information">Campaign information <span>→</span></a></div></div></section>
<section className="download"><div className="wrap"><div><span className="kicker gold">NOVEMBER 2026 · 59 PAGES</span><h2>The original Rescue Mission.</h2></div><a className="button red" href={pdf} download>Download manifesto ↓</a></div></section></>}
