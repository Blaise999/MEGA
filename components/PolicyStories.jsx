import visuals from '../data/visuals.json';
import stories from '../data/stories.json';
import {Photo} from './VisualMedia';
import {pdf} from './constants';
const find=id=>visuals.photos.find(p=>p.id===id);
export function PolicyStory({story,full=false,detail=false}){
  return <article className={'story-panel '+(full?'story-full':'')}>
    <div className="story-picture"><Photo item={find(story.photo)} quiet/></div>
    <div className="story-info"><div className="story-top"><span>{story.title}</span></div>
      <h3>{story.metric}<sub>{story.metricLabel}</sub></h3>
      <p className="story-body">{story.response}</p>
      <div className="story-actions"><a className="text-link" href={detail?pdf+'#page='+story.pages.split(/[–,]/)[0]:'/manifesto/'+story.slug}>{detail?'Read the manifesto':'Read the plan'} ↗</a></div>
    </div>
  </article>
}
export function PolicyStories({all=false}){return <section className="section story-section" id="issues"><div className="wrap"><div className="section-heading"><div><h2>Enugu in focus.</h2><p className="story-subtitle">The Rescue Mission: proposed priorities for Enugu.</p></div><a className="text-link" href="/manifesto">All policies ↗</a></div><div className="story-layout">{(all?stories:stories.slice(0,6)).map((s,i)=><PolicyStory key={s.slug} story={s} full={i===0}/>)}</div><div className="policy-photo-credit"><a href="/photo-credits">Illustrative photography · Credits</a></div>{!all&&<div className="section-end"><a className="button dark" href="/issues">Explore our priorities →</a></div>}</div></section>}
export function PolicyEvidence({slug}){const s=stories.find(s=>s.slug===slug);if(s)return <div className="wrap detail-story"><PolicyStory story={s} full detail/><div className="policy-photo-credit"><a href="/photo-credits">Illustrative photography · Credits</a></div></div>;if(slug==='workers-and-retirees')return <section className="wrap evidence-update"><span className="meta">11 November 2026</span><h2>Gratuity payments have begun.</h2><p>PUNCH reported that eligible pensioners had begun receiving the first tranche of outstanding gratuities. The pensioners’ union also requested settlement of the remaining tranches.</p><a className="text-link" href="https://punchng.com/pensioners-receive-gratuities-after-26-years-seek-outstanding-payments/" target="_blank" rel="noreferrer">Read the report ↗</a></section>;return <div className="wrap evidence-update"><a className="text-link" href={pdf}>Original manifesto ↗</a></div>}
