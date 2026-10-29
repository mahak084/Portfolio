import { type FormEvent, useEffect, useState } from 'react';

type IconName = 'arrow' | 'spark' | 'download' | 'external' | 'github' | 'mail' | 'copy' | 'menu' | 'close';

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

const profile = {
  name: 'Raushan Kumar',
  title: 'Full-Stack Developer | MERN Stack & AI Enthusiast',
  email: 'raushankumarlnct007@gmail.com',
  location: 'Bhopal, Madhya Pradesh, India',
  availability: 'Open to entry-level software development opportunities',
  github: 'https://github.com/RAUSHANARYA',
  linkedin: 'https://www.linkedin.com/in/raushan-kumar-1ab75a327/',
  leetcode: 'https://leetcode.com/u/Raushan_kumar074/',
};

const contactEndpoint = '/api/contact';

const projects = [
  {
    number: '01', name: 'Craving', category: 'FULL-STACK FOOD DELIVERY',
    description: 'A food delivery platform connecting users, restaurants, and delivery partners. Includes multi-role workflows, authentication, cart management, and REST APIs backed by MongoDB.',
    image: '/images/project-craving.svg', imageAlt: 'Original food delivery application illustration with a meal bowl and order status card',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'], tone: 'rose',
    repository: 'https://github.com/RAUSHANARYA/CRAVING_PROJECT',
  },
  {
    number: '02', name: 'PDF AI Chatbot', category: 'RAG & LLM APPLICATION',
    description: 'An AI document assistant for asking questions about PDF content, retrieving relevant passages through semantic search, and generating context-aware answers.',
    image: '/images/project-pdf-ai.svg', imageAlt: 'Original PDF AI assistant interface illustration with document library, grounded answer, and semantic retrieval visualization',
    tags: ['React.js', 'Node.js', 'Qdrant', 'Claude AI', 'RAG'], tone: 'blue',
    repository: 'https://github.com/RAUSHANARYA/PDF-AI-Chatbot---RAG-LLM-',
  },
  {
    number: '03', name: 'Responsive E-Commerce Platform', category: 'REACT APPLICATION',
    description: 'A responsive e-commerce frontend that fetches product catalogs from external APIs, with reusable React components, hooks, and product filtering.',
    image: '/images/project-ecommerce.svg', imageAlt: 'Original responsive e-commerce storefront illustration with product cards and mobile shopping view',
    tags: ['React.js', 'JavaScript', 'Fetch API', 'CSS3'], tone: 'amber',
    repository: 'https://github.com/RAUSHANARYA/Ecommerce_react',
  },
];

type Skill = { name: string; icon?: string; mark?: string };

const devIcon = (name: string, file = `${name}-original.svg`) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${file}`;

const skillGroups: { label: string; skills: Skill[] }[] = [
  { label: 'LANGUAGES', skills: [
    { name: 'Java', icon: devIcon('java') },
    { name: 'JavaScript', icon: devIcon('javascript') },
  ] },
  { label: 'WEB DEVELOPMENT', skills: [
    { name: 'React.js', icon: devIcon('react') },
    { name: 'Node.js', icon: devIcon('nodejs') },
    { name: 'Express.js', icon: devIcon('express') },
    { name: 'REST APIs', mark: 'API' },
    { name: 'HTML5', icon: devIcon('html5') },
    { name: 'CSS3', icon: devIcon('css3') },
  ] },
  { label: 'DATABASES & TOOLS', skills: [
    { name: 'MongoDB', icon: devIcon('mongodb') },
    { name: 'MySQL', icon: devIcon('mysql') },
    { name: 'Git', icon: devIcon('git') },
    { name: 'GitHub', icon: devIcon('github') },
  ] },
  { label: 'CORE CS & AI', skills: [
    { name: 'Data Structures & Algorithms', mark: 'DS' },
    { name: 'OOP', mark: 'OOP' },
    { name: 'DBMS', mark: 'DB' },
    { name: 'RAG', mark: 'RAG' },
    { name: 'LLMs', mark: 'AI' },
  ] },
];

const achievements = [
  { value: '350+', label: 'LeetCode problems solved' },
  { value: '250+', label: 'GeeksforGeeks problems solved' },
  { value: '2-Star', label: 'CodeChef rating' },
  { value: '200+', label: 'LeetCode streak' },
  { value: 'Top 50', label: 'SQL problems completed' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'fallback' | 'error'>('idle');
  const [contactError, setContactError] = useState('');

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

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
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
  const updateContactField = (field: keyof typeof contactForm, value: string) => {
    setContactForm((current) => ({ ...current, [field]: value }));
  };
  const openWebmailComposer = () => {
    const body = [
      `Hello Raushan,`,
      '',
      contactForm.message,
      '',
      `Name: ${contactForm.name}`,
      `Reply email: ${contactForm.email}`,
    ].join('\n');
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(body)}`;
    window.location.assign(gmailComposeUrl);
  };
  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus('sending');
    setContactError('');
    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message,
        }),
      });
      const result = await response.json() as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        if (response.status === 503) {
          openWebmailComposer();
          setContactStatus('fallback');
          return;
        }
        throw new Error(result.message || 'Unable to send the message right now.');
      }
      setContactStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send the message right now.';
      console.error('Unable to send contact message.', error);
      openWebmailComposer();
      setContactError(message);
      setContactStatus('fallback');
    }
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${profile.name}, home`}><span className="brand-mark">RK</span><span className="brand-name">RAUSHAN KUMAR<small>FULL-STACK DEVELOPER</small></span></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {[['home', 'Home'], ['work', 'Work'], ['about', 'About'], ['achievements', 'Achievements'], ['education', 'Education'], ['contact', 'Contact']].map(([id, label]) => <a key={id} className={activeSection === id ? 'nav-link active' : 'nav-link'} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <p className="eyebrow reveal"><span className="status-dot" /> OPEN TO ENTRY-LEVEL ROLES <span className="eyebrow-line" /></p>
            <p className="hero-hello reveal delay-1">Hey, I’m</p>
            <h1 className="hero-title reveal delay-2">RAUSHAN<br /><span>KUMAR<span className="title-period">.</span></span></h1>
            <div className="hero-role reveal delay-3"><span className="role-line" /> FULL-STACK DEVELOPER <span className="role-plus">·</span> MERN STACK &amp; AI ENTHUSIAST</div>
            <p className="hero-description reveal delay-4">Computer Science Engineering student at LNCT, building practical full-stack applications and exploring AI-powered tools with RAG and LLMs.</p>
            <div className="hero-actions reveal delay-4"><a className="button button-primary magnetic" href="#work" onPointerMove={moveMagneticButton} onPointerLeave={resetMagneticButton}>Explore my work <Icon name="arrow" /></a><a className="text-link" href="/resume.pdf" download>Download résumé <Icon name="download" size={16} /></a></div>
            <div className="hero-socials reveal delay-4"><span>FIND ME ON</span><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={16} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="linkedin-icon">in</span></a><a className="leetcode-link" href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">LC</a><span className="social-separator" /><span className="hero-location">BHOPAL, INDIA</span></div>
          </div>
          <div className="hero-visual reveal delay-2">
            <div className="visual-index">FIG. 01 <span>MERN STACK × AI</span></div>
            <div className="hero-orb-wrap"><img className="hero-art" src="/images/hero-art.svg" alt="Original abstract orbital artwork in red, pink, and violet" /><span className="orbital-system" aria-hidden="true"><i className="orbit-ring ring-a" /><i className="orbit-ring ring-b" /><i className="orbit-ring ring-c" /><i className="orbit-satellite satellite-a" /><i className="orbit-satellite satellite-b" /><i className="orbit-core" /></span><span className="orbit-label orbit-label-top">DESIGN × CODE</span><span className="orbit-label orbit-label-bottom">MADE WITH INTENTION</span><span className="orbit-cross">✳</span></div>
            <div className="vertical-note">BUILD · LEARN · IMPROVE · REPEAT</div>
            <div className="visual-coordinates">LNCT / CSE<br />BHOPAL, INDIA</div>
          </div>
          <a className="scroll-cue" href="#work"><span className="scroll-wheel" /> SCROLL TO EXPLORE</a>
          <span className="hero-index">PORTFOLIO / 2026</span>
        </section>

        <div className="marquee" aria-label="MERN stack, full-stack development, artificial intelligence"><div className="marquee-track"><span>MERN STACK DEVELOPMENT</span><i>✳</i><span>AI &amp; RAG APPLICATIONS</span><i>✳</i><span>BUILD · LEARN · IMPROVE</span><i>✳</i><span>MERN STACK DEVELOPMENT</span><i>✳</i><span>AI &amp; RAG APPLICATIONS</span><i>✳</i><span>BUILD · LEARN · IMPROVE</span><i>✳</i></div></div>

        <section className="work-section section-shell" id="work">
          <div className="section-heading reveal"><div><p className="eyebrow"><span className="section-number">01</span> SELECTED PROJECTS</p><h2>Built with<br /><span>curiosity.</span></h2></div><p className="section-intro">Full-stack applications and AI experiments built with React, Node.js, MongoDB, and modern language-model tools.</p><a className="round-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="Visit Raushan's GitHub"><Icon name="github" /><span>MORE ON GITHUB</span><Icon name="arrow" size={15} /></a></div>
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
            <div className="project-image-wrap"><img src={project.image} alt={project.imageAlt} loading="lazy" /><span className="project-image-label">ORIGINAL PROJECT ARTWORK</span><a className="project-open" href={project.repository} target="_blank" rel="noreferrer" aria-label={`View ${project.name} repository`}><Icon name="external" /></a></div>
            <div className="project-meta"><span>{project.number} / {project.category}</span><span className="project-arrow"><Icon name="arrow" /></span></div>
            <h3>{project.name}<span className="project-spark">✳</span></h3><p className="project-description">{project.description}</p>
            <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="project-repository" href={project.repository} target="_blank" rel="noreferrer">View source <Icon name="arrow" size={14} /></a>
          </article>)}</div>
          <div className="work-bottom reveal"><span>BUILD · LEARN · IMPROVE · REPEAT</span><a href={`mailto:${profile.email}`}>Have a project in mind? <Icon name="arrow" size={16} /></a></div>
        </section>

        <section className="about-section section-shell" id="about">
          <div className="about-top reveal"><div><p className="eyebrow"><span className="section-number">02</span> ABOUT RAUSHAN</p><h2>Computer Science student.<br /><span>Developer by practice.</span></h2></div><div className="about-aside"><Icon name="spark" size={22} /><p>Build. Learn. Improve. Repeat.</p></div></div>
          <div className="about-grid">
            <div className="about-story reveal"><div className="about-card-kicker"><span>01 / PROFILE</span><span className="card-status"><i /> OPEN TO WORK</span></div><p className="story-lead">I’m a Computer Science Engineering student at LNCT, Bhopal, interested in software development and practical problem-solving.</p><p>I enjoy building full-stack web applications with JavaScript, React.js, Node.js, Express.js, and MongoDB, while exploring AI applications with RAG and LLMs. I’m seeking entry-level Software Developer, Full-Stack Developer, or Java Developer opportunities.</p><a className="inline-link" href={`mailto:${profile.email}`}>Get in touch <Icon name="arrow" size={16} /></a><span className="about-card-index" aria-hidden="true">RK<span>.</span></span></div>
            <div className="skills-panel reveal"><div className="panel-label"><span>TECHNICAL SKILLS</span><span>LOGO-LED TOOLKIT</span></div><div className="skill-groups">{skillGroups.map((group) => <div className="skill-group" key={group.label}><span>{group.label}</span><div className="skills-cloud">{group.skills.map((skill, index) => <span className={`skill-chip chip-${index % 4}`} key={skill.name}>{skill.icon ? <img className="skill-logo" src={skill.icon} alt="" loading="lazy" /> : <span className="skill-mark" aria-hidden="true">{skill.mark}</span>}<span>{skill.name}</span></span>)}</div></div>)}</div></div>
            <div className="quote-panel reveal"><div className="about-card-kicker"><span>02 / PRINCIPLE</span><span className="quote-kicker-mark">✳</span></div><span className="quote-mark">“</span><blockquote>Build.<br /><em>Learn. Improve.</em><br />Repeat.</blockquote><div className="quote-author"><span className="quote-avatar">RK</span><span>RAUSHAN KUMAR<small>FULL-STACK DEVELOPER</small></span></div><span className="quote-decoration">✳</span></div>
          </div>
        </section>

        <section className="achievements-section section-shell" id="achievements">
          <div className="section-heading reveal"><div><p className="eyebrow"><span className="section-number">03</span> CODING ACHIEVEMENTS</p><h2>Practice adds<br /><span>up.</span></h2></div><p className="section-intro">A snapshot of problem-solving practice across coding platforms and SQL.</p></div>
          <div className="achievement-grid">{achievements.map((achievement, index) => <article className="achievement-card reveal" key={achievement.label} style={{ transitionDelay: `${index * 90}ms` }}><span className="achievement-index">0{index + 1}</span><strong>{achievement.value}</strong><span className="achievement-label">{achievement.label}</span><span className="achievement-spark" aria-hidden="true">✳</span></article>)}</div>
        </section>

        <section className="education-section section-shell" id="education">
          <div className="education-heading reveal"><p className="eyebrow"><span className="section-number">04</span> EDUCATION</p><h2>Learning the<br /><span>foundations.</span></h2></div>
          <article className="education-card reveal"><div className="education-mark">LNCT</div><div className="education-details"><span className="education-dates">2023 — 2027 · EXPECTED</span><h3>Bachelor of Technology</h3><p>Computer Science and Engineering</p><span className="education-institution">Lakshmi Narain College of Technology · Bhopal, Madhya Pradesh</span></div><div className="education-grade"><strong>8.33</strong><span>CGPA / 10</span></div></article>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="contact-content reveal"><p className="eyebrow"><span className="status-dot" /> 05 / OPEN TO ENTRY-LEVEL ROLES</p><h2>Let’s build<br />what’s <span>next.</span></h2><p className="contact-copy">Have an opportunity, idea, or question? Send me a message directly from this page.</p><div className="contact-actions"><a className="button button-light magnetic" href={`mailto:${profile.email}`} onPointerMove={moveMagneticButton} onPointerLeave={resetMagneticButton}><Icon name="mail" /> Say hello <Icon name="arrow" /></a><button className="email-copy" type="button" onClick={copyEmail} aria-live="polite"><span>{copied ? 'EMAIL COPIED' : profile.email}</span><Icon name={copied ? 'spark' : 'copy'} size={16} /></button></div></div>
          <form className="contact-form reveal" onSubmit={submitContactForm}>
            <div className="contact-form-heading"><span>DIRECT MESSAGE</span><small>MAILTO / 01</small></div>
            <div className="contact-form-row">
              <label>Name<input type="text" name="name" value={contactForm.name} onChange={(event) => updateContactField('name', event.target.value)} placeholder="Your name" autoComplete="name" required /></label>
              <label>Email<input type="email" name="email" value={contactForm.email} onChange={(event) => updateContactField('email', event.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
            </div>
            <label>Subject<input type="text" name="subject" value={contactForm.subject} onChange={(event) => updateContactField('subject', event.target.value)} placeholder="How can I help?" required /></label>
            <label>Message<textarea name="message" value={contactForm.message} onChange={(event) => updateContactField('message', event.target.value)} placeholder="Write your message..." rows={4} required /></label>
            <button className="contact-submit" type="submit" disabled={contactStatus === 'sending'}>{contactStatus === 'sending' ? 'Sending message...' : 'Send message'} <Icon name="arrow" size={16} /></button>
            <p className={`contact-form-note contact-form-status-${contactStatus}`} role="status" aria-live="polite">
              {contactStatus === 'success' && 'Message sent successfully. Thanks for reaching out!'}
              {contactStatus === 'fallback' && <>Opening Gmail with your message ready to send. If Gmail asks you to sign in, sign in and click Send.</>}
              {contactStatus === 'error' && <>{contactError} Please try again or email <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
              {contactStatus === 'idle' || contactStatus === 'sending' ? `Your message will be sent securely to ${profile.email}.` : ''}
            </p>
          </form>
          <div className="contact-side reveal"><span>BASED IN</span><strong>Bhopal,<br />Madhya Pradesh,<br />India.</strong><span className="contact-spark">✳</span><span className="contact-coord">OPEN TO<br />ENTRY-LEVEL OPPORTUNITIES</span></div>
        </section>
      </main>

      <footer className="site-footer section-shell"><a className="brand footer-brand" href="#home"><span className="brand-mark">RK</span><span className="brand-name">RAUSHAN KUMAR<small>FULL-STACK DEVELOPER</small></span></a><span className="footer-note">BUILD · LEARN · IMPROVE · REPEAT</span><a className="back-top" href="#home">BACK TO TOP <span>↑</span></a></footer>
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default App;
