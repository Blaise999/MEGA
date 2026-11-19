import {PageTitle} from '../../components/Shell';
import {MediaGallery} from '../../components/VisualMedia';
import {pdf} from '../../components/constants';
export const metadata={title:'Media centre'};
export default function Media(){return <><PageTitle label="MEGA" title="Media centre.">Campaign photography and independent films of Enugu State.</PageTitle><MediaGallery/><section className="section wrap intro-row"><h2>Campaign manifesto</h2><a href={pdf} download className="button red">Download document ↓</a></section></>}
