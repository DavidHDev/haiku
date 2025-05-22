import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { SplitText } from '../Animations/SplitText';
import { AnimatedContainer } from '../Animations/AnimatedContainer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { LeaveDetection } from '../Demo/LeaveDetection';
import { ClickOutside } from '../Demo/ClickOutside';
import { Debounce } from '../Demo/Debounce';
import { Hold } from '../Demo/Hold';
import toast, { Toaster } from 'react-hot-toast';
import GrainOverlay from '../Animations/Grain';


export default function Homepage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);


  //demo properties

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!')
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  React.useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setCollapsed(true);
      }
      else setCollapsed(false);
    })

    return () => document.removeEventListener('scroll');
  }, [])


  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else document.body.classList.remove('no-scroll');
  }, [menuOpen])

  const NavigationLinks = () => {
    return (
      <>
        <Link to="/docs/intro">DOCS</Link>
        <a rel='noreferrer' aria-label='github' target="_blank" href="https://github.com/DavidHDev/react-haiku">GITHUB</a>
        <a rel='noreferrer' target="_blank" aria-label="Sponsor" href='https://ko-fi.com/davidhaz'>SPONSOR</a>
      </>
    )
  }

  return (
    <section className='haiku'>
      <GrainOverlay />
      <div className='radial-gradient-bg'></div>
      <div className='squares-bg'></div>
      <a href="https://www.producthunt.com/posts/haiku-6?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-haiku&#0045;6" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=476133&theme=dark" alt="Haiku - Lightweight&#0032;React&#0032;Hook&#0032;&#0038;&#0032;Utility&#0032;Library | Product Hunt" className='product-hunt-badge' width="250" height="54" /></a>
      <Toaster position="bottom-right" />
      <header className={collapsed ? 'landing-header header-bg' : 'landing-header'}>
        <AnimatedContainer direction="vertical" reverse>
          <nav className={collapsed ? 'landing-nav collapsed' : 'landing-nav'}>
            <div className={menuOpen ? 'landing-logo invertedLogo' : 'landing-logo'}></div>

            <div className='landing-links'>
              <NavigationLinks />
            </div>

            <div className='pills'>
              <a className='landing-version' rel='noreferrer' aria-label="npm" target='_blank' href='https://www.npmjs.com/package/react-haiku'>
                2.3.0
              </a>
              <div className={menuOpen ? 'menu-toggle inverted' : 'menu-toggle'} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? 'Close' : 'Menu'}
              </div>
            </div>
          </nav>
        </AnimatedContainer>
      </header>

      <nav className={menuOpen ? 'landing-menu menu-open' : 'landing-menu'}>
        <NavigationLinks />
      </nav>

      <div className='landing'>
        <SplitText text="Hooks & Utilities" className='landing-title-line__first' delay={20} />
        <div className='landing-title-line__second'>
          <SplitText delay={20} text="that" />
          <video className='battery-video' preload="none" autoPlay loop muted playsInline poster="https://davidhaz.com/images/battery_light_placeholder.webp">
            <source src="https://davidhaz.com/videos/battery_light.mp4" type="video/mp4" />
          </video>
          <SplitText delay={20} text="supercharge" />
        </div>
        <div className='landing-title-line__third'>
          <SplitText delay={20} text="react" />
          <img src={useBaseUrl('/img/react-logo.svg')} alt="react logo" />
          <SplitText delay={20} text="projects" />
        </div>
      </div>

      <AnimatedContainer direction='vertical' skipObserver>
        <div className='landing-cards'>
          <a className='landing-card card-open-source' href='https://github.com/DavidHDev/react-haiku/blob/main/CONTRIBUTING.MD' rel='noreferrer' target='_blank'>
            <div className='open-source-top'>
              <div className='open-source-tag'>
                <img src={useBaseUrl('/img/open-source.svg')} alt="git branching open source glyph" />
                <p>Open Source</p>
              </div>
            </div>

            <div className='open-source-bottom'>
              <p>WANT TO CONTRIBUTE?<br></br>
                <span>CLICK THE CARD</span>
              </p>
            </div>
          </a>
          <div className='landing-card card-installation'>
            <div className='npm-install' onClick={() => copy('npm i react-haiku')}>
              npm i react-haiku
              <img src={copied ? useBaseUrl('/img/copy-success.svg') : useBaseUrl('/img/copy.svg')} />
            </div>

            <div className='haiku-stats'>
              <p><Link to="/docs/category/hooks"><span>43</span> Hooks</Link></p>
              <p><Link to="/docs/category/utilities"><span>8</span> Utilities</Link></p>
              <p><a href="https://bundlephobia.com/package/react-haiku@2.3.0" rel="noreferrer" target='_blank'><span>&lt;7Kb</span> Bundle</a></p>
            </div>
          </div>
          <div className='landing-card card-demo'>
            <p className='try-it'>Try it!</p>
            <Swiper
              className='demo-slider'
              spaceBetween={50}
              slidesPerView={1}
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 20000
              }}
              loop
              grabCursor
            >
              <SwiperSlide className='demo-slide'>
                <p className='hook-title'>useLeaveDetection()</p>
                <LeaveDetection />
              </SwiperSlide>
              <SwiperSlide className='demo-slide'>
                <p className='hook-title'>useClickOutside()</p>
                <ClickOutside />
              </SwiperSlide>
              <SwiperSlide className='demo-slide'>
                <p className='hook-title'>useDebounce()</p>
                <Debounce />
              </SwiperSlide>
              <SwiperSlide className='demo-slide'>
                <p className='hook-title'>useHold()</p>
                <Hold />
              </SwiperSlide>
            </Swiper>
          </div>
          <Link className="read-the-docs" to="/docs/intro">Read the docs</Link>
        </div>
      </AnimatedContainer>
    </section>
  );
}
