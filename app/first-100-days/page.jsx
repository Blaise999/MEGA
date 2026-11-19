import {PageTitle} from '../../components/Shell';
import data from '../../data/content.json';
import {pdf} from '../../components/constants';
export const metadata={title:'Implementation timeline'};
export default function Days(){return <><PageTitle label="PROPOSED IMPLEMENTATION" title="From day one.">Selected time-bound commitments after assuming office, not a record of completed work.</PageTitle><section className="section wrap"><div className="long-timeline">{data.milestones.map(x=><article key={x.time}><div className="date">{x.time}</div><div><h2>{x.title}</h2><p>{x.body}</p><a className="text-link" href={pdf+'#page='+x.page}>Manifesto page {x.page} ↗</a></div></article>)}</div></section></>}
