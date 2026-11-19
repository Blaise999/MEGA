import {PageTitle} from '../../components/Shell';
import {CampaignMap} from '../../components/CampaignMap';
import data from '../../data/content.json';
export const metadata={title:'Campaign trail'};
export default function Trail(){const events=data.campaignEvents.filter(x=>x.published);return <><PageTitle label="Across Enugu State" title="Campaign trail.">All 17 local government areas.</PageTitle><section className="section wrap"><CampaignMap/></section><section className="section pale"><div className="wrap"><h2>Campaign events.</h2>{events.length?events.map(x=><article className="event-row" key={x.id}><div><strong>{x.date}</strong><p>{x.lga||"Enugu city"}</p></div><div><h3>{x.title}</h3><p>{x.venue} · {x.kind==="visit"?"Other visit":"Campaign event"}</p><p>{x.description}</p><a className="text-link" href={x.source} target="_blank" rel="noreferrer">Read source ↗</a></div></article>):<p>No campaign events have been published yet.</p>}</div></section></>}
