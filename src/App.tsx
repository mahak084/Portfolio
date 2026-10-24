import { useEffect, useState } from 'react';

type IconName = 'arrow' | 'spark' | 'download' | 'external' | 'github' | 'mail' | 'copy' | 'menu' | 'close';

/**
 * Render a decorative SVG icon hidden from assistive technology.
 * @param props - Icon name and optional size in pixels, defaulting to 18.
 * @returns The SVG element for the requested icon.
 */
function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>,
    spark: <><path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></>,
    external: <><path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-7A5.4 5.4 0 0 0 19 4.7 5 5 0 0 0 18.9 1S17.7.7 15 2.5a13.5 13.5 0 0 0-7 0C5.3.7 4.1 1 4.1 1A5 5 0 0 0 4 4.7a5.4 5.4 0 0 0-1.3 3.7c0 5.5 3.2 6.7 6.2 7A3.4 3.4 0 0 0 8 18.1V22" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    copy: <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

const projects = [
  { number: '01', name: 'Form & Objects', category: 'COMMERCE EXPERIENCE', description: 'A considered storefront concept for objects made to last. Replace this preview copy with a real project story.', image: '/images/project-commerce.svg', imageAlt: 'Original concept preview of a warm editorial commerce storefront', tags: ['React', 'Node.js', 'Commerce'], tone: 'rose' },
  { number: '02', name: 'Northstar', category: 'PRODUCT DASHBOARD', description: 'A clear, data-rich workspace concept that makes the important signals easy to find.', image: '/images/project-dashboard.svg', imageAlt: 'Original concept preview of a dark analytics dashboard', tags: ['TypeScript', 'Express', 'Charts'], tone: 'blue' },
  { number: '03', name: 'Daylight', category: 'MOBILE-FIRST PRODUCT', description: 'A location-inspired mobile experience concept designed around calm, quick decisions.', image: '/images/project-mobile.svg', imageAlt: 'Original concept preview of a mobile discovery application', tags: ['React', 'API design', 'Responsive'], tone: 'amber' },
];

const skills = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'CSS / Motion'];
const process = [
  ['01', 'Understand', 'Get close to the problem, the people, and what success actually means.'],
  ['02', 'Shape', 'Turn rough ideas into a clear model, thoughtful UI, and buildable plan.'],
  ['03', 'Build', 'Ship the detail: accessible interfaces, dependable APIs, and polished states.'],
  ['04', 'Refine', 'Measure, listen, and make each iteration feel more intentional than the last.'],
];

/**
 * Render the portfolio with section tracking, motion effects, and contact controls.
 * @returns The portfolio page, including navigation and responsive sections.
 */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const email = 'hello@yourdomain.dev';

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const id = entry.target.id;
          if (id) setActiveSection(id);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll<HTMLElement>('.reveal, section[id]').forEach((element) => observer.observe(element));
    if (reduceMotion) document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));

    const onPointerMove = (event: PointerEvent) => {
      if (!reduceMotion) {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        document.documentElement.style.setProperty('--hero-drift-x', `${x * 7}px`);
        document.documentElement.style.setProperty('--hero-drift-y', `${y * 7}px`);
      }
    };
    const onScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress * 100}%`);
      if (!reduceMotion) document.documentElement.style.setProperty('--hero-scroll', `${Math.min(window.scrollY * 0.12, 90)}px`);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /**
   * Copy the contact email and show confirmation for 1.8 seconds on success.
   * Open a mailto link if clipboard access fails.
   * @returns A promise that resolves after the copy attempt or mailto fallback.
   */
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  const closeMenu = () => setMenuOpen(false);
  const moveMagneticButton = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mag-x', `${(event.clientX - bounds.left - bounds.width / 2) * 0.12}px`);
    event.currentTarget.style.setProperty('--mag-y', `${(event.clientY - bounds.top - bounds.height / 2) * 0.16}px`);
  };
  const resetMagneticButton = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--mag-x', '0px');
    event.currentTarget.style.setProperty('--mag-y', '0px');
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Your Name, home"><span className="brand-mark">Y<span>.</span></span><span className="brand-name">YOUR NAME<small>FULL-STACK DEVELOPER</small></span></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {[['home', 'Home'], ['work', 'Work'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) => <a key={id} className={activeSection === id ? 'nav-link active' : 'nav-link'} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
          <a className="nav-cta" href={`mailto:${email}`} onClick={closeMenu}>Let’s talk <Icon name="arrow" size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <p className="eyebrow reveal"><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES <span className="eyebrow-line" /></p>
            <p className="hero-hello reveal delay-1">Hey, I’m</p>
            <h1 className="hero-title reveal delay-2">YOUR<br /><span>NAME<span className="title-period">.</span></span></h1>
            <div className="hero-role reveal delay-3"><span className="role-line" /> FULL-STACK DEVELOPER <span className="role-plus">&</span> DIGITAL CRAFTSPERSON</div>
            <p className="hero-description reveal delay-4">I build thoughtful digital products from first sketch to final deploy—blending solid engineering with a sharp eye for the details people feel.</p>
            <div className="hero-actions reveal delay-4"><a className="button button-primary magnetic" href="#work" onPointerMove={moveMagneticButton} onPointerLeave={resetMagneticButton}>Explore my work <Icon name="arrow" /></a><a className="text-link" href={`mailto:${email}?subject=Please%20send%20your%20resume`}>Résumé on request <Icon name="download" size={16} /></a></div>
            <div className="hero-socials reveal delay-4"><span>FIND ME ON</span><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={16} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="linkedin-icon">in</span></a><span className="social-separator" /><span className="hero-location">BASED ON EARTH · WORKING EVERYWHERE</span></div>
          </div>
          <div className="hero-visual reveal delay-2">
            <div className="visual-index">FIG. 01 <span>CREATIVE ENGINEERING</span></div>
            <div className="hero-orb-wrap"><img className="hero-art" src="/images/hero-art.svg" alt="Original abstract orbital artwork in red, pink, and violet" /><span className="orbital-system" aria-hidden="true"><i className="orbit-ring ring-a" /><i className="orbit-ring ring-b" /><i className="orbit-ring ring-c" /><i className="orbit-satellite satellite-a" /><i className="orbit-satellite satellite-b" /><i className="orbit-core" /></span><span className="orbit-label orbit-label-top">DESIGN × CODE</span><span className="orbit-label orbit-label-bottom">MADE WITH INTENTION</span><span className="orbit-cross">✳</span></div>
            <div className="vertical-note">BUILDING THE WEB, ONE DETAIL AT A TIME</div>
            <div className="visual-coordinates">40° 43' 55.3" N<br />73° 59' 11.2" W</div>
          </div>
          <a className="scroll-cue" href="#work"><span className="scroll-wheel" /> SCROLL TO EXPLORE</a>
          <span className="hero-index">PORTFOLIO / 2026</span>
        </section>

        <div className="marquee" aria-label="Full-stack development, creative engineering, thoughtful interfaces"><div className="marquee-track"><span>FULL-STACK DEVELOPMENT</span><i>✳</i><span>CREATIVE ENGINEERING</span><i>✳</i><span>THOUGHTFUL INTERFACES</span><i>✳</i><span>FULL-STACK DEVELOPMENT</span><i>✳</i><span>CREATIVE ENGINEERING</span><i>✳</i><span>THOUGHTFUL INTERFACES</span><i>✳</i></div></div>

        <section className="work-section section-shell" id="work">
          <div className="section-heading reveal"><div><p className="eyebrow"><span className="section-number">01</span> SELECTED WORK</p><h2>Things I’ve<br /><span>made real.</span></h2></div><p className="section-intro">A few snapshots of ideas turned into useful, considered digital experiences. Project previews below are original placeholders—swap in your real work before publishing.</p><a className="round-link" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="Visit GitHub"><Icon name="github" /><span>MORE ON GITHUB</span><Icon name="arrow" size={15} /></a></div>
          <div className="project-grid">{projects.map((project) => <article className={`project-card ${project.tone} reveal`} key={project.number} onPointerMove={(event) => {
            if (event.pointerType === 'touch') return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
            const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
            event.currentTarget.style.setProperty('--tilt-x', `${relativeY * -3}deg`);
            event.currentTarget.style.setProperty('--tilt-y', `${relativeX * 3}deg`);
          }} onPointerLeave={(event) => {
            event.currentTarget.style.setProperty('--tilt-x', '0deg');
            event.currentTarget.style.setProperty('--tilt-y', '0deg');
          }}>
            <div className="project-image-wrap"><img src={project.image} alt={project.imageAlt} loading="lazy" /><span className="project-image-label">CONCEPT PREVIEW · REPLACE WITH REAL PROJECT</span><a className="project-open" href="https://github.com/" target="_blank" rel="noreferrer" aria-label={`View ${project.name} project`}><Icon name="external" /></a></div>
            <div className="project-meta"><span>{project.number} / {project.category}</span><span className="project-arrow"><Icon name="arrow" /></span></div>
            <h3>{project.name}<span className="placeholder-star">✳</span></h3><p className="project-description">{project.description}</p>
            <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>)}</div>
          <div className="work-bottom reveal"><span>GOOD WORK STARTS WITH A GOOD QUESTION.</span><a href={`mailto:${email}`}>Have a project in mind? <Icon name="arrow" size={16} /></a></div>
        </section>

        <section className="about-section section-shell" id="about">
          <div className="about-top reveal"><div><p className="eyebrow"><span className="section-number">02</span> A LITTLE ABOUT ME</p><h2>Engineer by trade.<br /><span>Curious by default.</span></h2></div><div className="about-aside"><Icon name="spark" size={22} /><p>I care about what happens between the first idea and the last pixel. That’s where the good stuff lives.</p></div></div>
          <div className="about-grid">
            <div className="about-story reveal"><p className="story-lead">I’m a full-stack developer who likes turning complex problems into experiences that feel simple.</p><p>This is your space to tell the story behind the code: what you’re curious about, the problems you enjoy solving, and the kind of teams you do your best work with. Replace this draft with a few sentences that sound like you.</p><a className="inline-link" href={`mailto:${email}`}>A little more about me <Icon name="arrow" size={16} /></a></div>
            <div className="skills-panel reveal"><div className="panel-label"><span>THE TOOLKIT</span><span>SELECTED SKILLS</span></div><div className="skills-cloud">{skills.map((skill, index) => <span className={`skill-chip chip-${index % 4}`} key={skill}>{skill}</span>)}</div><p>Tools are just tools. The goal is always to choose the right one for the problem.</p></div>
            <div className="quote-panel reveal"><span className="quote-mark">“</span><blockquote>Great software should feel inevitable: clear in purpose, thoughtful in detail, and a little bit delightful.</blockquote><div className="quote-author"><span className="quote-avatar">YN</span><span>YOUR NAME<small>DEVELOPER / BUILDER</small></span></div><span className="quote-decoration">✳</span></div>
          </div>
        </section>

        <section className="process-section section-shell">
          <div className="process-title reveal"><p className="eyebrow"><span className="section-number">03</span> HOW I WORK</p><h2>Good process.<br /><span>Better outcomes.</span></h2><p>Thoughtful work doesn’t happen by accident. Here’s the rhythm I bring to a project.</p></div>
          <div className="process-list">{process.map(([number, title, text], index) => <article className="process-item reveal" key={number} style={{ transitionDelay: `${index * 100}ms` }}><span className="process-number">{number}</span><span className="process-icon"><Icon name={['spark', 'copy', 'github', 'arrow'][index] as IconName} size={18} /></span><div><h3>{title}</h3><p>{text}</p></div><span className="process-line" /></article>)}</div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="contact-content reveal"><p className="eyebrow"><span className="status-dot" /> 04 / YOUR NEXT CHAPTER</p><h2>Have a good<br />one in <span>mind?</span></h2><p className="contact-copy">I’m always up for a thoughtful conversation, a tricky problem, or a chance to build something useful together.</p><div className="contact-actions"><a className="button button-light magnetic" href={`mailto:${email}`} onPointerMove={moveMagneticButton} onPointerLeave={resetMagneticButton}><Icon name="mail" /> Say hello <Icon name="arrow" /></a><button className="email-copy" type="button" onClick={copyEmail} aria-live="polite"><span>{copied ? 'EMAIL COPIED' : email}</span><Icon name={copied ? 'spark' : 'copy'} size={16} /></button></div></div>
          <div className="contact-side reveal"><span>OPEN TO</span><strong>Good people.<br />Hard problems.<br />Useful things.</strong><span className="contact-spark">✳</span><span className="contact-coord">REPLY TIME<br />USUALLY 1–2 DAYS</span></div>
        </section>
      </main>

      <footer className="site-footer section-shell"><a className="brand footer-brand" href="#home"><span className="brand-mark">Y<span>.</span></span><span className="brand-name">YOUR NAME<small>FULL-STACK DEVELOPER</small></span></a><span className="footer-note">BUILT WITH CURIOSITY · © 2026</span><a className="back-top" href="#home">BACK TO TOP <span>↑</span></a></footer>
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default App;
