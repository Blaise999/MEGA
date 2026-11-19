'use client';
import {useEffect,useMemo,useState} from 'react';
import data from '../data/content.json';
import {getNextStop,eventDate} from './nextStop';
const endpoint="https://services3.arcgis.com/7J7WB6yJX0pYke9q/ArcGIS/rest/services/NCO_Security_Database_WFL1/FeatureServer/1/query?where=ADM1_EN%3D%27Enugu%27&outFields=ADM2_EN%2CADM1_EN&outSR=4326&f=geojson";
const norm=s=>s?.toLowerCase().replace(/[^a-z]/g,'');
function shapes(geo){const features=geo?.features;if(!Array.isArray(features))return [];const all=[];for(const f of features){const name=data.lgas.find(n=>norm(n)===norm(f.properties?.ADM2_EN||f.properties?.name||f.properties?.shapeName));if(!name||!f.geometry)continue;let polys=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[];if(polys.length)all.push({name,polys});}if(new Set(all.map(x=>x.name)).size!==17)return [];const coords=all.flatMap(x=>x.polys.flat(1)).flat(1);let a=Infinity,b=-Infinity,c=Infinity,d=-Infinity;for(const v of coords){a=Math.min(a,v[0]);b=Math.max(b,v[0]);c=Math.min(c,v[1]);d=Math.max(d,v[1]);}if(!Number.isFinite(a)||b<=a||d<=c)return [];const scale=Math.min(520/(b-a),570/(d-c));const point=([x,y])=>[(x-a)*scale+40,(d-y)*scale+35];return all.map(x=>({name:x.name,path:x.polys.map(p=>p.map(r=>r.map((v,i)=>(i?'L':'M')+point(v).map(n=>n.toFixed(2)).join(' ')).join(' ')+'Z').join(' ')).join(' ')}));}
const tiles=[['Igbo-Eze North',2,0],['Igbo-Eze South',1,1],['Udenu',3,1],['Nsukka',2,2],['Uzo-Uwani',0,2],['Igbo-Etiti',1,3],['Isi-Uzo',3,3],['Udi',1,4],['Ezeagu',0,4],['Enugu East',3,4],['Enugu North',2,4],['Oji River',0,5],['Enugu South',2,5],['Nkanu East',3,5],['Awgu',1,6],['Nkanu West',2,6],['Aninri',1,7]];
export function CampaignMap(){
  const nextStop=useMemo(()=>getNextStop(),[]);
  const [geo,setGeo]=useState(null),[failed,setFailed]=useState(false),[selected,setSelected]=useState(nextStop?.lga||'Enugu North'),[filter,setFilter]=useState('all');
  useEffect(()=>{const controller=new AbortController();const load=async()=>{for(const url of ['/data/enugu.geojson',endpoint]){try{const r=await fetch(url,{signal:controller.signal});if(!r.ok)continue;const j=await r.json();if(shapes(j).length===17){setGeo(j);return;}}catch(e){if(controller.signal.aborted)return;}}if(!controller.signal.aborted)setFailed(true);};load();return()=>controller.abort();},[]);
  const paths=useMemo(()=>shapes(geo),[geo]);
  const published=data.campaignEvents.filter(e=>e.published);
  const completed=n=>published.some(e=>e.lga===n&&e.status==='completed'&&e.kind==='campaign');
  const other=n=>published.some(e=>e.lga===n&&e.status==='completed'&&e.kind==='visit');
  const status=n=>n===nextStop?.lga?'next-stop':published.some(e=>e.lga===n&&e.status==='scheduled')?'scheduled':completed(n)?'visited':other(n)?'visit':'unlisted';
  const count=data.lgas.filter(completed).length;
  const visits=data.lgas.filter(n=>!completed(n)&&other(n)).length;
  const events=published.filter(e=>e.lga===selected&&e.id!==nextStop?.id).sort((a,b)=>b.date.localeCompare(a.date));
  const shown=n=>filter==='all'||status(n)===filter;
  const select=n=>{setSelected(n);};
  const active=status(selected);
  const isNext=selected===nextStop?.lga;
  const reset=()=>{setFilter('all');if(nextStop)select(nextStop.lga);};
  return <div className="trail v2-trail next-trail">
    {nextStop&&<div className="next-trail-banner">
      <div className="next-trail-banner-title"><span className="next-live-dot" aria-hidden="true"/><div><span className="next-trail-eyebrow">{nextStop.confirmed?'Next stop':'Proposed next stop'}</span><h3>{nextStop.lga}</h3></div></div>
      <div className="next-trail-banner-date"><strong>{nextStop.confirmed?eventDate(nextStop.date):'Awaiting confirmation'}</strong><span>{nextStop.venue||'Date and venue to be announced'}</span></div>
      <button type="button" className="next-trail-reset" onClick={reset}>View stop <span aria-hidden="true">↗</span></button>
    </div>}
    <div className="trail-main"><div className="trail-head"><div><strong>{String(count).padStart(2,'0')}<i>/17</i></strong><p>LGAs with documented campaign events</p><p>{visits} additional LGAs with other recorded visits</p></div><div className="legend"><span><i className="dot next-stop"/> Next stop {nextStop&&!nextStop.confirmed?'(proposed)':''}</span><span><i className="dot visited"/> Campaign</span><span><i className="dot visit"/> Other visit</span><span><i className="dot scheduled"/> Upcoming</span><span><i className="dot unlisted"/> No listing</span></div></div>
    <div className="map-controls"><label>Filter <select value={filter} onChange={e=>{setFilter(e.target.value);if(e.target.value==='next-stop'&&nextStop)select(nextStop.lga);}}><option value="all">All LGAs</option>{nextStop&&<option value="next-stop">Next stop</option>}<option value="visited">Campaign events</option><option value="visit">Other visits</option><option value="unlisted">No listing</option><option value="scheduled">Confirmed upcoming</option></select></label></div>
    {paths.length===17?<svg className="geo" viewBox="0 0 600 640" role="group" aria-label="Enugu LGA boundaries">{paths.map(({name,path})=><path key={name} d={path} className={status(name)+' '+(name===selected?'selected':'')+(!shown(name)?' dimmed':'')} tabIndex="0" role="button" aria-pressed={name===selected} aria-label={name+' '+status(name)} onClick={()=>select(name)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(name)}}}><title>{name}</title></path>)}</svg>:<><div className="map-note">District diagram · not geographic boundaries {failed?'':'(loading boundaries)'}</div><div className="tile-map" role="group" aria-label="Interactive schematic of 17 local government areas">{tiles.map(([name,x,y])=><button key={name} style={{gridColumn:x+1,gridRow:y+1}} className={'map-tile '+status(name)+(name===selected?' selected':'')+(!shown(name)?' dimmed':'')} aria-pressed={selected===name} onClick={()=>select(name)}>{name}</button>)}</div></>}
    <label className="lga-select">Select an LGA<select value={selected} onChange={e=>select(e.target.value)}>{data.lgas.map(n=><option key={n}>{n}</option>)}</select></label></div>
    <aside className={'trail-detail'+(isNext?' next-trail-detail':'')} aria-live="polite"><span className="kicker">{isNext?(nextStop.confirmed?'Next stop':'Proposed next stop'):'Campaign trail'}</span><h2>{selected}</h2>
      {isNext?<><p className="status next-detail-status"><i className="dot next-stop"/>{nextStop.confirmed?'Confirmed upcoming':'Pending confirmation'}</p><div className="next-stop-facts"><div><span>Date</span><strong>{eventDate(nextStop.date)}</strong></div><div><span>Venue</span><strong>{nextStop.venue||'To be announced'}</strong></div></div>{nextStop.confirmed&&<article className="map-event"><h3>{nextStop.title}</h3><p>{nextStop.description}</p>{nextStop.source&&<a className="text-link" href={nextStop.source} target="_blank" rel="noreferrer">Event details ↗</a>}</article>}<a href="/events" className="text-link">Campaign calendar ↗</a></>:<p className="status"><i className={'dot '+active}/>{{visited:'Documented campaign event',visit:'Other documented visit',scheduled:'Confirmed upcoming',unlisted:'No verified LGA event'}[active]}</p>}
      {events.length?events.map(e=><article className="map-event" key={e.id}><span className="event-date">{eventDate(e.date)}</span><h3>{e.title}</h3><p>{e.venue}</p><p>{e.description}</p>{e.source&&<a className="text-link" href={e.source} target="_blank" rel="noreferrer">Read source ↗</a>}{e.venueSource&&<a className="text-link" href={e.venueSource} target="_blank" rel="noreferrer">Venue announcement ↗</a>}</article>):!isNext&&<p>No verified event details have been published for this LGA.</p>}
      {!isNext&&nextStop&&<button type="button" className="next-trail-back" onClick={reset}>Back to next stop: {nextStop.lga} ↗</button>}
    </aside>
  </div>;
}
