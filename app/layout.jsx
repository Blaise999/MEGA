import './globals.css';
import {Header,Footer} from '../components/Shell';
export const metadata={title:{default:'MEGA | Make Enugu Great for All',template:'%s | MEGA'},description:'Ohaa–Omeje 2027: meet the ticket, explore the campaign trail, news, media, and the Rescue Mission.',openGraph:{title:'MEGA — Make Enugu Great for All',description:'Ohaa–Omeje 2027 · Rescue Mission',images:['/images/hero.webp']}};
export default function RootLayout({children}){return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html>}
