import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Database,
  Download,
  Github,
  Globe2,
  GraduationCap,
  Linkedin,
  LockKeyhole,
  Menu,
  Network,
  Orbit,
  Palette,
  Phone,
  Radar,
  Send,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  X,
} from "lucide-react";

const portrait = "/rana-avatar.webp";
const CV_URL = "/cv-rana-boujday.pdf";
const CV_NAME = "Rana-Boujday-CV.pdf";

type Lang = "fr" | "en";

const copy = {
  fr: {
    nav: ["Accueil", "À propos", "Compétences", "Expériences", "Projets", "Formation", "Contact"],
    heroKicker: "PORTFOLIO · 2026",
    heroTitle: "Je transforme les idées en systèmes qui comptent.",
    heroBody: "Je conçois des solutions digitales modernes à la croisée du développement, de l'intelligence artificielle et de la cybersécurité.",
    projects: "Voir mes projets",
    contact: "Me contacter",
    scroll: "Scroll to explore",
    aboutEyebrow: "01 · À PROPOS",
    aboutTitle: "Une diplômée en génie logiciel, curieuse, précise et tournée vers l'avenir.",
    aboutBody: "Diplômée d'une Licence en Informatique — Génie Logiciel et Systèmes d'Information à l'École supérieure des sciences et de la technologie de Hammam Sousse, je construis des expériences numériques où la technologie reste au service d'un usage clair, utile et sécurisé.",
    readCv: "Télécharger mon CV",
    skillsEyebrow: "02 · COMPÉTENCES",
    skillsTitle: "Un écosystème de compétences, pensé pour relier les disciplines.",
    universe: "MON UNIVERS",
    experienceEyebrow: "03 · EXPÉRIENCES",
    experienceTitle: "Apprendre, transmettre, construire.",
    projectsEyebrow: "04 · PROJETS",
    projectsTitle: "Des systèmes concrets, de l'idée à l'impact.",
    academic: "Projet académique",
    professional: "Expérience professionnelle",
    inProgress: "En développement",
    educationEyebrow: "05 · FORMATION",
    educationTitle: "Un socle académique solide, une progression continue.",
    contactEyebrow: "06 · CONTACT",
    contactTitle: "Construisons quelque chose de sécurisé et innovant.",
    contactBody: "Disponible pour des opportunités professionnelles, des collaborations et des projets dans le développement, la cybersécurité et les technologies numériques.",
    availability: "Ouverte aux opportunités",
    send: "Écrire à Rana",
    footer: "Software Developer · Cybersecurity · AI",
  },
  en: {
    nav: ["Home", "About", "Skills", "Experience", "Projects", "Education", "Contact"],
    heroKicker: "PORTFOLIO · 2026",
    heroTitle: "I turn ideas into systems that matter.",
    heroBody: "I design modern digital solutions at the intersection of software development, artificial intelligence and cybersecurity.",
    projects: "Explore projects",
    contact: "Get in touch",
    scroll: "Scroll to explore",
    aboutEyebrow: "01 · ABOUT",
    aboutTitle: "A curious, precise software development graduate looking ahead.",
    aboutBody: "With a Bachelor's degree in Computer Science — Software Engineering and Information Systems from ESSTHS, I build digital experiences where technology serves a clear, useful and secure purpose.",
    readCv: "Download my CV",
    skillsEyebrow: "02 · SKILLS",
    skillsTitle: "A connected skill ecosystem, built across disciplines.",
    universe: "MY UNIVERSE",
    experienceEyebrow: "03 · EXPERIENCE",
    experienceTitle: "Learning, sharing, building.",
    projectsEyebrow: "04 · PROJECTS",
    projectsTitle: "Concrete systems, from idea to impact.",
    academic: "Academic project",
    professional: "Professional experience",
    inProgress: "In development",
    educationEyebrow: "05 · EDUCATION",
    educationTitle: "A strong academic foundation, a continuous progression.",
    contactEyebrow: "06 · CONTACT",
    contactTitle: "Let's build something secure and innovative.",
    contactBody: "Available for opportunities, collaborations and projects in software development, cybersecurity and digital technologies.",
    availability: "Open to opportunities",
    send: "Email Rana",
    footer: "Software Developer · Cybersecurity · AI",
  },
} as const;

const skillGroups = [
  { label: "Langages", icon: Code2, items: ["Java", "Python", "C/C++", "C#", "JavaScript", "TypeScript", "PHP", "SQL", "HTML5", "CSS3", "Algorithmes"] },
  { label: "Frontend", icon: Palette, items: ["React", "Next.js", "HTML", "CSS", "JavaScript", "TypeScript", "Bootstrap", "WebSockets"] },
  { label: "Backend", icon: TerminalSquare, items: ["Java", "Spring Boot", "Hibernate", "Node.js", "Express.js", "REST API", "WebSockets", "PHP", "Prisma"] },
  { label: "Data layer", icon: Database, items: ["MySQL", "PostgreSQL", "Oracle", "MongoDB", "SQL", "PL/SQL", "NoSQL"] },
  { label: "AI & Data", icon: BrainCircuit, items: ["Python", "Machine Learning", "Scikit-learn", "Pandas", "NumPy", "Computer Vision", "Fondements de l’IA", "Jupyter Notebook", "Elasticsearch"] },
  { label: "Security & tests", icon: ShieldCheck, items: ["Cryptographie", "RSA", "AES", "SHA", "JWT", "VPN", "Wireshark", "SQL Injection", "Tous types de tests", "Postman", "JUnit", "PHPUnit", "JMeter", "Locust"] },
  { label: "Tools & methods", icon: Network, items: ["Git / GitHub", "Docker", "Kubernetes", "AWS", "Linux", "VS Code", "IntelliJ IDEA", "Eclipse", "Architecture 3-tiers", "UML", "Conception logicielle", "Agile / Scrum", "Méthode en V", "Cisco Packet Tracer"] },
];

const projects = [
  { title: "PlanifIA", year: "2026", tag: "Projet de fin d'études", icon: BrainCircuit, tone: "violet", desc: "Interface entreprise de suivi en temps réel des projets : avancement, statuts, échéances, dates de démarrage et durée estimée, avec une vision claire pour les managers.", tech: ["IA", "Suivi temps réel", "Gestion de projet", "Multi-tenant"] },
  { title: "KnowShare", year: "2024", tag: "Plateforme collaborative", icon: Globe2, tone: "blue", desc: "Plateforme collaborative permettant aux étudiants et aux enseignants d'échanger gratuitement cours, exercices, corrigés, anciens devoirs et autres ressources pédagogiques.", tech: ["Web", "Collaboration", "Education"] },
  { title: "Détecteur Man-in-the-Middle", year: "", tag: "Projet cybersécurité", icon: LockKeyhole, tone: "pink", desc: "Outil d'analyse réseau permettant de détecter les attaques d'interception dans les communications et de renforcer la sécurité des échanges de données.", tech: ["Réseaux", "Monitoring", "Cryptographie"] },
  { title: "SuperRunner", year: "", tag: "Développement de jeux vidéo", icon: Orbit, tone: "lavender", desc: "Jeu vidéo en C# intégrant la programmation orientée objet et la gestion des mécaniques de gameplay.", tech: ["C#", "Unity", "OOP"] },
];

const experiences = [
  { date: "Septembre 2026 — présent", title: "Développeuse Web", company: "Projets indépendants", type: "professional", icon: BriefcaseBusiness, desc: "Développement de sites web pour des clients, de la conception à la réalisation, avec une attention portée à l'expérience utilisateur, au design moderne et aux besoins spécifiques de chaque projet.", projects: ["NERBAL · en cours", "MAISON CIANA · en cours"] },
];

function SectionHeading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "section-heading-light" : ""}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>;
}

function HoloOrb() {
  return <div className="orb-stage" aria-hidden="true"><div className="orb-orbit orbit-one" /><div className="orb-orbit orbit-two" /><div className="orb-orbit orbit-three" /><div className="orb-core"><span>RB</span></div><div className="orb-spark spark-a" /><div className="orb-spark spark-b" /><div className="orb-spark spark-c" /></div>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Accueil");
  const t = copy[lang];
  const ids = useMemo(() => ["accueil", "a-propos", "competences", "experiences", "projets", "formation", "contact"], []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.3, 0.6] });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [ids]);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const navLabels = t.nav;

  return <div className="portfolio-shell">
    <div className="noise" />
    <header className="site-header">
      <button className="brand-mark" onClick={() => go("accueil")} aria-label="Rana Boujday home"><span>RB</span><small>RANA BOUJDAY</small></button>
      <nav className={menuOpen ? "main-nav open" : "main-nav"}>{ids.map((id, i) => <button key={id} onClick={() => go(id)} className={active === id ? "active" : ""}>{navLabels[i]}</button>)}</nav>
      <div className="header-actions"><div className="lang-switch"><button className={lang === "fr" ? "selected" : ""} onClick={() => setLang("fr")}>FR</button><span>/</span><button className={lang === "en" ? "selected" : ""} onClick={() => setLang("en")}>EN</button></div><a className="cv-button" href={CV_URL} download={CV_NAME}><Download size={15} /> CV</a><button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
    </header>

    <main>
      <section id="accueil" className="hero section-dark">
        <div className="hero-grid" />
        <div className="hero-copy reveal"><div className="status-line"><span className="status-dot" />{t.heroKicker}</div><h1>{t.heroTitle}</h1><p>{t.heroBody}</p><div className="hero-ctas"><button className="primary-cta" onClick={() => go("projets")}>{t.projects}<ArrowDown size={16} /></button><button className="text-cta" onClick={() => go("contact")}>{t.contact}<ArrowUpRight size={16} /></button></div></div>
        <div className="hero-visual"><div className="portrait-ring"><div className="portrait-halo" /><img src={portrait} alt="Avatar 3D de Rana Boujday" /><div className="portrait-label"><span>01</span><div><strong>Rana Boujday</strong><small>Software Developer</small></div></div></div><HoloOrb /><div className="float-tag tag-a"><ShieldCheck size={13} /> secure by design</div><div className="float-tag tag-b"><span className="mini-pulse" /> available for opportunities</div></div>
        <div className="hero-bottom"><span>DEVELOP · SECURE · CREATE</span><span>SAYADA · MONASTIR · TUNISIE ↗</span></div>
      </section>

      <section id="a-propos" className="section section-light about-section"><div className="container about-layout"><div className="about-visual"><div className="vertical-word">PROFILE / 2026</div><div className="about-card"><div className="card-corner" /><span className="about-number">01</span><div className="code-block"><span>const</span> rana = &#123;<br /><i>focus:</i> <b>"meaningful tech"</b>,<br /><i>mindset:</i> <b>"always learning"</b><br />&#125;</div></div><div className="orbit-pill"><Radar size={15} /> systems thinker</div></div><div className="about-copy"><SectionHeading eyebrow={t.aboutEyebrow} title={t.aboutTitle} /><p className="lead-copy">{t.aboutBody}</p><div className="quality-grid">{["Esprit d'analyse", "Rigueur", "Organisation", "Autonomie", "Apprentissage rapide", "Travail en équipe", "Communication", "Adaptabilité"].map((item, i) => <div key={item} className="quality"><span>0{i + 1}</span>{item}</div>)}</div><div className="permit-note"><span>{lang === "fr" ? "Mobilité" : "Mobility"}</span><b>{lang === "fr" ? "Permis de conduire · Type B" : "Driving licence · Type B"}</b></div><a className="outline-cta" href={CV_URL} download={CV_NAME}>{t.readCv}<Download size={15} /></a></div></div></section>

      <section id="competences" className="section skills-section"><div className="container"><SectionHeading eyebrow={t.skillsEyebrow} title={t.skillsTitle} /><div className="skills-layout"><div className="skill-orb-wrap"><div className="skill-orbit-system"><div className="skill-network-links" aria-hidden="true"><span className="network-link link-1" /><span className="network-link link-2" /><span className="network-link link-3" /><span className="network-link link-4" /><span className="network-link link-5" /><span className="network-link link-6" /><span className="network-link link-7" /></div><HoloOrb /><div className="skill-orbit-decor" aria-hidden="true"><span className="decor-star star-one">✦</span><span className="decor-flower flower-one">✿</span><span className="decor-star star-two">✧</span><span className="decor-flower flower-two">❀</span><span className="decor-star star-three">✦</span></div></div><div className="skill-orb-caption"><span>CORE SYSTEM</span><strong>07</strong><small>domains connected</small></div></div><div className="skill-grid-shell"><div className="skill-card-links" aria-hidden="true"><span className="card-link link-a" /><span className="card-link link-b" /><span className="card-link link-c" /><span className="card-link link-d" /><span className="card-link link-e" /><span className="card-link link-f" /><i className="card-node node-a" /><i className="card-node node-b" /><i className="card-node node-c" /><i className="card-node node-d" /><i className="card-node node-e" /><i className="card-node node-f" /><i className="card-node node-g" /></div><div className="skill-grid">{skillGroups.map(({ label, icon: Icon, items }) => <article className="skill-card" key={label}><div className="skill-card-head"><Icon size={17} /><h3>{label}</h3><span>{items.length.toString().padStart(2, "0")}</span></div><div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></div></div><div className="universe-strip"><span className="eyebrow">{t.universe}</span><div><b>DEVELOP</b><i>×</i><b>SECURE</b><i>×</i><b>CREATE</b></div><p>Software · Networks · AI</p></div></div></section>

      <section id="experiences" className="section section-light experience-section"><div className="container"><SectionHeading eyebrow={t.experienceEyebrow} title={t.experienceTitle} /><div className="experience-list">{experiences.map((item) => <article className="experience-row" key={item.title}><div className="experience-date">{item.date}</div><div className="experience-marker"><item.icon size={17} /></div><div className="experience-content"><div className="experience-meta"><span>{t.professional}</span><span>↗</span></div><h3>{item.title}</h3><h4>{item.company}</h4><p>{item.desc}</p>{item.projects.length > 0 && <div className="experience-projects">{item.projects.map((p) => <span key={p}>{p}</span>)}</div>}</div></article>)}</div></div></section>

      <section id="projets" className="section project-section"><div className="container"><SectionHeading eyebrow={t.projectsEyebrow} title={t.projectsTitle} /><div className="project-grid">{projects.map((project, i) => <article className={`project-card ${project.tone}`} key={project.title}><div className="project-top"><span className="project-index">0{i + 1}</span><project.icon size={22} /><span>{project.year || "PROJECT"}</span></div><div className="project-visual"><div className="project-grid-lines" /><div className="project-icon-orbit"><project.icon size={38} /></div><span className="project-signal">● online / secured</span></div><div className="project-info"><span className="project-tag">{project.tag}</span><h3>{project.title}</h3><p>{project.desc}</p><div className="project-tech">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></div></article>)}</div><div className="coming-soon"><div><span className="eyebrow">CLIENT PROJECTS</span><h3>Nerbal <i>×</i> Maison Ciana</h3><p><strong>Nerbal</strong> · site de vente de produits cosmétiques &nbsp;·&nbsp; <strong>Maison Ciana</strong> · site de vente de linge de maison<br /><em>{t.inProgress}</em></p></div><span className="coming-dot" /></div></div></section>

      <section id="formation" className="section section-light education-section"><div className="container"><SectionHeading eyebrow={t.educationEyebrow} title={t.educationTitle} /><div className="education-layout"><div className="education-main"><div className="edu-year">2023 <span>—</span> 2026</div><div className="edu-content"><span className="edu-badge"><GraduationCap size={15} /> Mention Bien</span><h3>Licence en Informatique</h3><h4>Génie Logiciel et Systèmes d'Information</h4><p>ESSTHS — Sousse, Tunisie</p><div className="domain-list">{["Génie logiciel", "Développement web", "Bases de données", "Intelligence artificielle", "Machine Learning", "Réseaux", "Cybersécurité", "Cloud & Big Data", "Systèmes d'information", "Tests logiciels"].map((d) => <span key={d}>{d}</span>)}</div></div></div><div className="edu-side"><div><span>2023</span><span className="edu-badge"><GraduationCap size={15} /> Mention Bien</span><h3>Baccalauréat</h3><p>Sciences Informatiques<br />Programmation et Algorithmes<br />Lycée Sayada — Monastir</p></div><div className="languages"><span className="eyebrow">LANGUES</span><p><b>Arabe</b><small>Langue maternelle</small></p><p><b>Français</b><small>B2 · TCF certifié</small></p><p><b>Anglais</b><small>Intermédiaire / Technique</small></p><p><b>Espagnol</b><small>Intermédiaire</small></p></div></div></div></div></section>

      <section id="contact" className="contact-section"><div className="contact-glow" /><div className="container contact-layout"><div><span className="eyebrow">{t.contactEyebrow}</span><h2>{t.contactTitle}</h2><p>{t.contactBody}</p><a href="mailto:boujdayrana0@gmail.com" className="primary-cta">{t.send}<Send size={16} /></a></div><div className="contact-panel"><div className="availability"><span className="status-dot" />{t.availability}</div><a href="mailto:boujdayrana0@gmail.com"><span>Email</span>boujdayrana0@gmail.com</a><a href="tel:+21650288793"><span>Phone</span>+216 50 288 793</a><div className="social-links"><a href="https://github.com/Ranabjd" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/rana-boujday-555151305/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a></div></div></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-inner"><div className="brand-mark"><span>RB</span><small>RANA BOUJDAY</small></div><span>{t.footer}</span><div className="footer-links"><a href="https://github.com/Ranabjd" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/rana-boujday-555151305/" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:boujdayrana0@gmail.com">Email</a></div><span>© 2026</span></div></footer>
  </div>;
}