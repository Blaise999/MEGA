import {PolicyStories} from '../../components/PolicyStories';
import {PageTitle} from '../../components/Shell';
import {PolicyLibrary} from '../../components/PolicyLibrary';
import {pdf} from '../../components/constants';
export const metadata={title:'Rescue Mission manifesto'};
export default function Manifesto(){return <><PageTitle label="THE 2027 POLICY BLUEPRINT" title="The Rescue Mission.">The November 2026 NDC Enugu State governorship manifesto.</PageTitle><section className="section wrap"><div className="intro-row"><div><h2>Every policy, in one place.</h2><p>Explore the economic, governance, social service and rural development proposals. Each policy links to the original source pages.</p></div><a className="button red" href={pdf} download>Download all 59 pages ↓</a></div><PolicyLibrary/></section><PolicyStories/></>}
