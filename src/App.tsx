import { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { X, ArrowLeft, ArrowRight, ExternalLink, Menu } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Portfolio data with extended details
// Only first 3 are clickable projects, others are placeholders
const portfolioItems = [
  { 
    id: 1, 
    title: 'Resonance Studio', 
    tags: ['Web', 'Motion'], 
    image: '/images/AudioSite.mp4',
    isVideo: true,
    description: 'A complete digital transformation for a studio startup. Modern web platform with intuitive dashboards built with precision and care.',
    year: '2026',
    client: 'Resonance Studio.',
    services: ['UI/UX Design', 'Web Development', 'Motion Design'],
    link: '#',
    isPlaceholder: false
  },
  { 
    id: 2, 
    title: 'CrossRoad Partners', 
    tags: ['Web', 'Corporate Rebrand'], 
    image: '/images/LegalRebrand.mp4',
    isVideo: true,
    description: 'Corporate rebranding project for a legal services firm enabling a modern, professional image.',
    year: '2026',
    client: 'CrossRoad Partners',
    services: ['Brand Identity', 'Web Design', 'Art Direction'],
    link: '#',
    isPlaceholder: false
  },
  { 
    id: 3, 
    title: 'Teapot Tipple', 
    tags: ['Web', 'Design System'], 
    image: '/images/Coffeeshop.mp4',
    isVideo: true,
    description: 'Design system and web development for a trendy coffee shop, creating a cohesive brand experience across digital platforms.',
    year: '2026',
    client: 'Teapot Tipple',
    services: ['Design System', 'Web Development', 'Strategy'],
    link: '#',
    isPlaceholder: false
  },
  { 
    id: 4, 
    title: 'Coming Soon', 
    tags: ['Web', 'Motion'], 
    image: '/images/portfolio_04.jpg',
    description: 'New project launching soon. Stay tuned for updates.',
    year: '2025',
    client: 'TBD',
    services: ['UI/UX Design', 'Web Development'],
    link: '#',
    isPlaceholder: true
  },
  { 
    id: 5, 
    title: 'Coming Soon', 
    tags: ['Brand', 'Web'], 
    image: '/images/portfolio_05.jpg',
    description: 'Exciting new project in the works. Check back later.',
    year: '2025',
    client: 'TBD',
    services: ['Brand Identity', 'Web Design'],
    link: '#',
    isPlaceholder: true
  },
];

const services = [
  { name: 'Design Systems', desc: 'AI Scale UI' },
  { name: 'Web Development', desc: 'React / GSAP / performance' },
  { name: 'Motion Design', desc: 'Scroll-driven storytelling' },
  { name: 'Brand Identity', desc: 'Typography, art direction' },
];

// Circle Image Component - handles both raster and SVG images
function CircleImage({ src, alt }: { src: string; alt: string }) {
  const isSvg = src.toLowerCase().endsWith('.svg');
  
  if (isSvg) {
    // SVGs use object-contain and no background to render properly
    return (
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-contain p-4"
      />
    );
  }
  
  // Raster images use object-cover for filling the circle
  return (
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover"
    />
  );
}

// Dark liquid glossy glass background - modern glassmorphism
function DynamicBackground() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Base gradient layer */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 20% 30%, rgba(40, 20, 60, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(20, 40, 60, 0.3) 0%, transparent 50%)'
      }} />
      
      {/* Glass blobs - fewer on mobile */}
      <div className={`glass-blob blob-1 ${isMobile ? 'mobile' : ''}`} />
      <div className={`glass-blob blob-2 ${isMobile ? 'mobile' : ''}`} />
      {!isMobile && (
        <>
          <div className="glass-blob blob-3" />
          <div className="glass-blob blob-4" />
          <div className="glass-blob blob-5" />
        </>
      )}
      
      {/* Edge vignette */}
      <div className="absolute inset-0" style={{
        boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8)'
      }} />
      
      <style>{`
        .glass-blob {
          position: absolute;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          will-change: transform, border-radius;
        }
        
        .glass-blob.mobile {
          animation: none !important;
          opacity: 0.4;
        }
        
        .blob-1 {
          width: 500px;
          height: 400px;
          left: -150px;
          top: 10%;
          background: linear-gradient(135deg, 
            rgba(80, 50, 120, 0.25) 0%, 
            rgba(60, 40, 90, 0.15) 50%,
            rgba(40, 30, 60, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 
            inset 2px 2px 20px rgba(255, 255, 255, 0.15),
            inset -2px -2px 20px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(80, 50, 120, 0.2);
          animation: morph1 20s ease-in-out infinite;
        }
        
        .blob-1.mobile {
          width: 250px;
          height: 200px;
          left: -80px;
        }
        
        .blob-2 {
          width: 450px;
          height: 350px;
          right: -100px;
          top: 30%;
          background: linear-gradient(225deg, 
            rgba(50, 120, 140, 0.2) 0%, 
            rgba(40, 90, 110, 0.12) 50%,
            rgba(30, 60, 80, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 
            inset 2px 2px 20px rgba(255, 255, 255, 0.12),
            inset -2px -2px 20px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(50, 120, 140, 0.15);
          animation: morph2 18s ease-in-out infinite;
        }
        
        .blob-2.mobile {
          width: 200px;
          height: 180px;
          right: -60px;
        }
        
        .blob-3 {
          width: 400px;
          height: 320px;
          left: 30%;
          top: 55%;
          background: linear-gradient(45deg, 
            rgba(60, 80, 140, 0.22) 0%, 
            rgba(45, 60, 100, 0.12) 50%,
            rgba(35, 45, 75, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 
            inset 2px 2px 20px rgba(255, 255, 255, 0.1),
            inset -2px -2px 20px rgba(0, 0, 0, 0.3),
            0 0 35px rgba(60, 80, 140, 0.15);
          animation: morph3 22s ease-in-out infinite;
        }
        
        .blob-4 {
          width: 380px;
          height: 300px;
          right: 15%;
          bottom: 10%;
          background: linear-gradient(315deg, 
            rgba(120, 60, 110, 0.2) 0%, 
            rgba(90, 45, 80, 0.12) 50%,
            rgba(70, 35, 60, 0.08) 100%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 
            inset 2px 2px 20px rgba(255, 255, 255, 0.1),
            inset -2px -2px 20px rgba(0, 0, 0, 0.3),
            0 0 35px rgba(120, 60, 110, 0.15);
          animation: morph4 24s ease-in-out infinite;
        }
        
        .blob-5 {
          width: 350px;
          height: 280px;
          left: 10%;
          bottom: 15%;
          background: linear-gradient(180deg, 
            rgba(60, 140, 130, 0.18) 0%, 
            rgba(45, 105, 95, 0.1) 50%,
            rgba(35, 80, 70, 0.06) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 
            inset 2px 2px 20px rgba(255, 255, 255, 0.08),
            inset -2px -2px 20px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(60, 140, 130, 0.12);
          animation: morph5 19s ease-in-out infinite;
        }
        
        @keyframes morph1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            transform: translate(60px, 40px) rotate(45deg) scale(1.08);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            transform: translate(30px, 80px) rotate(90deg) scale(0.95);
            border-radius: 50% 50% 40% 60% / 40% 50% 60% 50%;
          }
          75% {
            transform: translate(-20px, 50px) rotate(135deg) scale(1.03);
            border-radius: 40% 60% 50% 50% / 60% 40% 50% 60%;
          }
        }
        
        @keyframes morph2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
          }
          33% {
            transform: translate(-50px, 60px) rotate(-60deg) scale(1.1);
            border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%;
          }
          66% {
            transform: translate(-30px, -40px) rotate(-120deg) scale(0.92);
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          }
        }
        
        @keyframes morph3 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%;
          }
          50% {
            transform: translate(-60px, -50px) rotate(90deg) scale(1.08);
            border-radius: 60% 40% 50% 50% / 50% 40% 60% 50%;
          }
        }
        
        @keyframes morph4 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 30% 70% 60% 40% / 50% 50% 70% 30%;
          }
          25% {
            transform: translate(40px, -50px) rotate(-45deg) scale(1.12);
            border-radius: 70% 30% 40% 60% / 50% 50% 30% 70%;
          }
          50% {
            transform: translate(20px, 30px) rotate(-90deg) scale(1);
            border-radius: 50% 50% 50% 50% / 70% 30% 50% 50%;
          }
          75% {
            transform: translate(-30px, -20px) rotate(-135deg) scale(0.95);
            border-radius: 30% 70% 50% 50% / 50% 70% 50% 30%;
          }
        }
        
        @keyframes morph5 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 50% 50% 60% 40% / 60% 40% 60% 40%;
          }
          50% {
            transform: translate(70px, -40px) rotate(100deg) scale(1.08);
            border-radius: 40% 60% 40% 60% / 40% 60% 40% 60%;
          }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [filter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const studioRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const projectDetailRef = useRef<HTMLDivElement>(null);
  
  // Section refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const heroCircleRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  
  const newWorkRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const violetRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Filtered projects
  const filteredProjects = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.tags?.includes(filter));



  // Open project detail (only for non-placeholders)
  const openProject = (project: typeof portfolioItems[0], index: number) => {
    if (project.isPlaceholder) return;
    setSelectedProject(project);
    // Store the index in the filtered array for proper navigation
    setCurrentProjectIndex(index);
    
    setTimeout(() => {
      if (projectDetailRef.current) {
        gsap.fromTo(projectDetailRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
        gsap.fromTo(projectDetailRef.current.querySelector('.project-content'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
        );
      }
    }, 10);
  };

  // Handle body overflow when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Close project detail
  const closeProject = useCallback(() => {
    if (projectDetailRef.current) {
      gsap.to(projectDetailRef.current.querySelector('.project-content'),
        { y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' }
      );
      gsap.to(projectDetailRef.current,
        { 
          opacity: 0, 
          duration: 0.4, 
          ease: 'power2.in',
          onComplete: () => {
            setSelectedProject(null);
          }
        }
      );
    }
  }, []);

  // Helper to scroll to section after entrance animation completes
  const scrollToSection = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    
    // Find the ScrollTrigger for this element
    const trigger = ScrollTrigger.getAll().find(st => st.trigger === element);
    
    if (trigger && trigger.vars.pin) {
      // For pinned sections, scroll to ~35% through the pin range
      // This is after entrance (0-25%) and during the "settled" phase
      const targetScroll = trigger.start + (trigger.end - trigger.start) * 0.35;
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: targetScroll, autoKill: false },
        ease: 'power2.inOut'
      });
    } else {
      // For non-pinned sections, just scroll to the element
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Open Studio page
  const openStudio = () => {
    setStudioOpen(true);
  };

  // Close Studio page
  const closeStudio = useCallback(() => {
    setStudioOpen(false);
  }, []);

  // Close modal if current project is filtered out
  useEffect(() => {
    if (selectedProject && !filteredProjects.find(p => p.id === selectedProject.id)) {
      closeProject();
    }
  }, [filteredProjects, selectedProject, closeProject]);

  // Navigate to next/prev project (skips placeholders)
  const navigateProject = (direction: 'next' | 'prev') => {
    // Use a ref to get the latest filteredProjects to avoid stale closure issues
    const projects = filteredProjects;
    const currentIdx = currentProjectIndex;
    
    // Find the next non-placeholder project
    let newIndex = currentIdx;
    let attempts = 0;
    const maxAttempts = projects.length;
    
    if (maxAttempts === 0) return;
    
    do {
      newIndex = direction === 'next' 
        ? (newIndex + 1) % projects.length
        : (newIndex - 1 + projects.length) % projects.length;
      attempts++;
    } while (projects[newIndex]?.isPlaceholder && attempts < maxAttempts);
    
    // Don't navigate if we only found placeholders or same project
    if (projects[newIndex]?.isPlaceholder || newIndex === currentIdx) return;
    
    const content = projectDetailRef.current?.querySelector('.project-content');
    if (content) {
      gsap.to(content, {
        x: direction === 'next' ? -30 : 30,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentProjectIndex(newIndex);
          setSelectedProject(projects[newIndex]);
          gsap.fromTo(content,
            { x: direction === 'next' ? 30 : -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
        }
      });
    }
  };

  // Hero load animation - simplified on mobile
  useEffect(() => {
    const isMobileViewport = window.innerWidth < 768;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: isMobileViewport ? 0.1 : 0.2 });
      
      if (heroCircleRef.current) {
        tl.fromTo(heroCircleRef.current, 
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: isMobileViewport ? 0.6 : 1, ease: 'power3.out' }
        );
      }
      
      const words = heroHeadlineRef.current?.querySelectorAll('.word');
      if (words && words.length > 0) {
        tl.fromTo(words,
          { y: isMobileViewport ? 20 : 50, opacity: 0 },
          { y: 0, opacity: 1, duration: isMobileViewport ? 0.4 : 0.6, stagger: isMobileViewport ? 0.05 : 0.1, ease: 'power3.out' },
          isMobileViewport ? '-=0.3' : '-=0.6'
        );
      }
      
      if (heroCtaRef.current) {
        tl.fromTo(heroCtaRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: isMobileViewport ? 0.3 : 0.5, ease: 'power2.out' },
          isMobileViewport ? '-=0.1' : '-=0.2'
        );
      }
    });
    
    return () => ctx.revert();
  }, []);

  // Scroll-driven animations - disabled on mobile for performance
  useLayoutEffect(() => {
    // Skip complex scroll animations on mobile
    const isMobileViewport = window.innerWidth < 768;
    
    const ctx = gsap.context(() => {
      // Hero scroll exit - skip entirely on mobile
      if (!isMobileViewport && heroRef.current && heroHeadlineRef.current && heroCircleRef.current && heroCtaRef.current) {
        const heroScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1.2,
            onLeaveBack: () => {
              gsap.set([heroHeadlineRef.current, heroCircleRef.current, heroCtaRef.current], {
                opacity: 1, x: 0, y: 0, scale: 1
              });
            }
          }
        });
        
        heroScrollTl.fromTo(heroHeadlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-8vw', opacity: 0.3, ease: 'power1.in' },
          0.7
        );
        heroScrollTl.fromTo(heroCircleRef.current,
          { x: 0, scale: 1, opacity: 1 },
          { x: '10vw', scale: 0.92, opacity: 0.3, ease: 'power1.in' },
          0.7
        );
        heroScrollTl.fromTo(heroCtaRef.current,
          { y: 0, opacity: 1 },
          { y: '5vh', opacity: 0.3, ease: 'power1.in' },
          0.65
        );
      }

      // New Work Section - skip entirely on mobile
      if (!isMobileViewport && newWorkRef.current) {
        const newWorkTl = gsap.timeline({
          scrollTrigger: {
            trigger: newWorkRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1.2,
          }
        });
        
        const newWorkCircle = newWorkRef.current.querySelector('.media-circle');
        const newWorkLabel = newWorkRef.current.querySelector('.new-label');
        const newWorkHeadline = newWorkRef.current.querySelector('.headline-group');
        const newWorkBody = newWorkRef.current.querySelector('.body-text');
        const newWorkCta = newWorkRef.current.querySelector('.cta-button');
        
        if (newWorkCircle) {
          newWorkTl.fromTo(newWorkCircle,
            { x: '-30vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power1.out' },
            0
          );
        }
        if (newWorkLabel) {
          newWorkTl.fromTo(newWorkLabel,
            { x: '5vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power1.out' },
            0.1
          );
        }
        if (newWorkHeadline) {
          newWorkTl.fromTo(newWorkHeadline,
            { x: '8vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power1.out' },
            0.15
          );
        }
        if (newWorkBody) {
          newWorkTl.fromTo(newWorkBody,
            { y: '3vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out' },
            0.2
          );
        }
        if (newWorkCta) {
          newWorkTl.fromTo(newWorkCta,
            { y: '3vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out' },
            0.25
          );
        }
        
        if (newWorkCircle) {
          newWorkTl.fromTo(newWorkCircle,
            { x: 0, opacity: 1 },
            { x: '-15vw', opacity: 0.3, ease: 'power1.in' },
            0.7
          );
        }
        if (newWorkLabel) {
          newWorkTl.fromTo(newWorkLabel,
            { y: 0, opacity: 1 },
            { y: '-3vh', opacity: 0.3, ease: 'power1.in' },
            0.65
          );
        }
        if (newWorkHeadline) {
          newWorkTl.fromTo(newWorkHeadline,
            { x: 0, opacity: 1 },
            { x: '5vw', opacity: 0.3, ease: 'power1.in' },
            0.7
          );
        }
        if (newWorkBody) {
          newWorkTl.fromTo(newWorkBody,
            { y: 0, opacity: 1 },
            { y: '2vh', opacity: 0.3, ease: 'power1.in' },
            0.75
          );
        }
        if (newWorkCta) {
          newWorkTl.fromTo(newWorkCta,
            { y: 0, opacity: 1 },
            { y: '3vh', opacity: 0.3, ease: 'power1.in' },
            0.75
          );
        }
      }

      // About Section - skip entirely on mobile
      if (!isMobileViewport && aboutRef.current) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1.2,
          }
        });
        
        const aboutCircle = aboutRef.current.querySelector('.media-circle');
        const aboutLabel = aboutRef.current.querySelector('.index-label');
        const aboutHeadline = aboutRef.current.querySelector('.headline-group');
        const aboutBody = aboutRef.current.querySelector('.body-text');
        const aboutCta = aboutRef.current.querySelector('.cta-button');
        
        if (aboutCircle) {
          aboutTl.fromTo(aboutCircle,
            { x: '30vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power1.out' },
            0
          );
        }
        if (aboutLabel && aboutHeadline) {
          aboutTl.fromTo([aboutLabel, aboutHeadline],
            { x: '-8vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power1.out' },
            0.1
          );
        }
        if (aboutBody) {
          aboutTl.fromTo(aboutBody,
            { y: '3vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out' },
            0.15
          );
        }
        if (aboutCta) {
          aboutTl.fromTo(aboutCta,
            { y: '3vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out' },
            0.2
          );
        }
        
        if (aboutCircle) {
          aboutTl.fromTo(aboutCircle,
            { x: 0, opacity: 1 },
            { x: '15vw', opacity: 0.3, ease: 'power1.in' },
            0.7
          );
        }
        if (aboutLabel && aboutHeadline) {
          aboutTl.fromTo([aboutLabel, aboutHeadline],
            { x: 0, opacity: 1 },
            { x: '-5vw', opacity: 0.3, ease: 'power1.in' },
            0.65
          );
        }
        if (aboutBody) {
          aboutTl.fromTo(aboutBody,
            { y: 0, opacity: 1 },
            { y: '2vh', opacity: 0.3, ease: 'power1.in' },
            0.7
          );
        }
        if (aboutCta) {
          aboutTl.fromTo(aboutCta,
            { y: 0, opacity: 1 },
            { y: '3vh', opacity: 0.3, ease: 'power1.in' },
            0.75
          );
        }
      }

      // Services Section - skip entirely on mobile
      if (!isMobileViewport && servicesRef.current) {
        const servicesTl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1.2,
          }
        });
        
        const servicesCircle = servicesRef.current.querySelector('.media-circle');
        const servicesLabel = servicesRef.current.querySelector('.index-label');
        const servicesHeadline = servicesRef.current.querySelector('.headline-group');
        const servicesList = servicesRef.current.querySelectorAll('.service-item');
        const servicesCta = servicesRef.current.querySelector('.cta-button');
        
        if (servicesCircle) {
          servicesTl.fromTo(servicesCircle,
            { x: '-30vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power1.out' },
            0
          );
        }
        if (servicesLabel && servicesHeadline) {
          servicesTl.fromTo([servicesLabel, servicesHeadline],
            { x: '8vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power1.out' },
            0.1
          );
        }
        if (servicesList.length > 0) {
          servicesTl.fromTo(servicesList,
            { y: '2vh', opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.02, ease: 'power1.out' },
            0.15
          );
        }
        if (servicesCta) {
          servicesTl.fromTo(servicesCta,
            { y: '3vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out' },
            0.2
          );
        }
        
        if (servicesCircle) {
          servicesTl.fromTo(servicesCircle,
            { x: 0, opacity: 1 },
            { x: '-15vw', opacity: 0.3, ease: 'power1.in' },
            0.7
          );
        }
        if (servicesLabel && servicesHeadline) {
          servicesTl.fromTo([servicesLabel, servicesHeadline],
            { x: 0, opacity: 1 },
            { x: '5vw', opacity: 0.3, ease: 'power1.in' },
            0.65
          );
        }
        if (servicesList.length > 0) {
          servicesTl.fromTo(servicesList,
            { y: 0, opacity: 1 },
            { y: '2vh', opacity: 0.3, ease: 'power1.in' },
            0.7
          );
        }
        if (servicesCta) {
          servicesTl.fromTo(servicesCta,
            { y: 0, opacity: 1 },
            { y: '3vh', opacity: 0.3, ease: 'power1.in' },
            0.75
          );
        }
      }

      // Violet Panel Section (Let's Create Something Great) - skip entirely on mobile
      if (!isMobileViewport && violetRef.current) {
        const violetTl = gsap.timeline({
          scrollTrigger: {
            trigger: violetRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1.2,
          }
        });
        
        const violetHeadline = violetRef.current.querySelector('.headline-group');
        const violetSub = violetRef.current.querySelector('.subheadline');
        const violetCtas = violetRef.current.querySelector('.cta-row');
        
        if (violetHeadline) {
          violetTl.fromTo(violetHeadline,
            { x: '-8vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power1.out' },
            0
          );
        }
        if (violetSub) {
          violetTl.fromTo(violetSub,
            { y: '3vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out' },
            0.1
          );
        }
        if (violetCtas) {
          violetTl.fromTo(violetCtas,
            { y: '3vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'power1.out' },
            0.15
          );
        }
        
        if (violetHeadline) {
          violetTl.fromTo(violetHeadline,
            { y: 0, opacity: 1 },
            { y: '-5vh', opacity: 0.3, ease: 'power1.in' },
            0.7
          );
        }
        if (violetSub) {
          violetTl.fromTo(violetSub,
            { y: 0, opacity: 1 },
            { y: '3vh', opacity: 0.3, ease: 'power1.in' },
            0.65
          );
        }
        if (violetCtas) {
          violetTl.fromTo(violetCtas,
            { y: 0, opacity: 1 },
            { y: '3vh', opacity: 0.3, ease: 'power1.in' },
            0.7
          );
        }
      }

      // Work section cards animation - simplified on mobile
      if (workRef.current) {
        // Kill existing work card ScrollTriggers to prevent duplicates on filter change
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger && (st.trigger as Element).closest('.work-card')) {
            st.kill();
          }
        });
        
        const workCards = workRef.current.querySelectorAll('.work-card');
        workCards.forEach((card, i) => {
          gsap.fromTo(card,
            { y: isMobileViewport ? 30 : 60, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: isMobileViewport ? 0.4 : 0.6,
              delay: i * (isMobileViewport ? 0.05 : 0.1),
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: isMobileViewport ? 'top 95%' : 'top 90%',
              }
            }
          );
        });
      }

      // Contact section animation - simplified on mobile
      if (!isMobileViewport && contactRef.current) {
        const contactHeadline = contactRef.current.querySelector('.headline-group');
        const contactForm = contactRef.current.querySelector('.contact-form');
        
        if (contactHeadline) {
          gsap.fromTo(contactHeadline,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: contactHeadline,
                start: 'top 85%',
              }
            }
          );
        }
        
        if (contactForm) {
          gsap.fromTo(contactForm,
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.8,
              delay: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: contactForm,
                start: 'top 85%',
              }
            }
          );
        }
      }

      // Global snap for pinned sections - temporarily disabled for debugging
      /*
      setTimeout(() => {
        const pinned = ScrollTrigger.getAll()
          .filter(st => st.vars.pin)
          .sort((a, b) => a.start - b.start);
        
        const maxScroll = ScrollTrigger.maxScroll(window);
        if (maxScroll && pinned.length > 0) {
          const pinnedRanges = pinned.map(st => ({
            start: st.start / maxScroll,
            end: (st.end ?? st.start) / maxScroll,
            center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
          }));
          
          ScrollTrigger.create({
            snap: {
              snapTo: (value: number) => {
                const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
                if (!inPinned) return value;
                
                const target = pinnedRanges.reduce((closest, r) =>
                  Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
                  pinnedRanges[0]?.center ?? 0
                );
                return target;
              },
              duration: { min: 0.15, max: 0.4 },
              delay: 0,
              ease: 'power2.out',
            }
          });
        }
      }, 100);
      */
    }, mainRef);
    
    return () => ctx.revert();
  }, [filteredProjects]);

  // Handle body overflow when studio modal is open
  useEffect(() => {
    if (studioOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [studioOpen]);

  return (
    <>
      <div ref={mainRef} className="relative min-h-screen">
        {/* Dynamic gradient background - covers entire site */}
        <DynamicBackground />
        
        {/* Grain overlay */}
        <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 md:py-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="micro-label text-[#F4F6F8] hover:text-[#B8FF2C] transition-colors text-sm md:text-base bg-transparent border-none cursor-pointer"
          >
            XIZE
          </button>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 pointer-events-auto">
          <button 
            onClick={() => scrollToSection(workRef.current)}
            className="micro-label text-[#A7ACB5] hover:text-[#F4F6F8] transition-colors bg-transparent border-none cursor-pointer"
          >
            Work
          </button>
          <button 
            onClick={() => scrollToSection(servicesRef.current)}
            className="micro-label text-[#A7ACB5] hover:text-[#F4F6F8] transition-colors bg-transparent border-none cursor-pointer"
          >
            Services
          </button>
          <button 
            onClick={openStudio}
            className="micro-label text-[#A7ACB5] hover:text-[#F4F6F8] transition-colors bg-transparent border-none cursor-pointer"
          >
            Studio
          </button>
          <button 
            onClick={() => scrollToSection(contactRef.current)}
            className="micro-label text-[#A7ACB5] hover:text-[#F4F6F8] transition-colors bg-transparent border-none cursor-pointer"
          >
            Contact
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden pointer-events-auto p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6 text-[#F4F6F8]" />
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#0B0B0D]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              setTimeout(() => scrollToSection(workRef.current), 100);
            }}
            className="text-2xl font-bold text-[#F4F6F8] hover:text-[#B8FF2C] transition-colors bg-transparent border-none cursor-pointer"
          >
            Work
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              setTimeout(() => scrollToSection(servicesRef.current), 100);
            }}
            className="text-2xl font-bold text-[#F4F6F8] hover:text-[#B8FF2C] transition-colors bg-transparent border-none cursor-pointer"
          >
            Services
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              openStudio();
            }}
            className="text-2xl font-bold text-[#F4F6F8] hover:text-[#B8FF2C] transition-colors bg-transparent border-none cursor-pointer"
          >
            Studio
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              setTimeout(() => scrollToSection(contactRef.current), 100);
            }}
            className="text-2xl font-bold text-[#F4F6F8] hover:text-[#B8FF2C] transition-colors bg-transparent border-none cursor-pointer"
          >
            Contact
          </button>
        </div>
      )}

      {/* Section 1: Hero */}
      <section ref={heroRef} className="section-pinned z-10">
        <div className="relative md:absolute inset-0 flex flex-col md:flex-row items-center justify-center px-6 md:px-[8vw] py-8 md:py-0">
          {/* Text Content */}
          <div className="relative z-20 text-center md:text-left md:w-1/2 order-2 md:order-1 mt-8 md:mt-0">
            <div className="mb-4 md:mb-6">
              <span className="micro-label text-[#A7ACB5] text-xs md:text-sm">CREATIVE STUDIO</span>
            </div>
            
            <div ref={heroHeadlineRef}>
              <h1 className="headline-xl text-[clamp(32px,8vw,72px)] text-[#F4F6F8] leading-[0.95]">
                <span className="word block">WE CRAFT</span>
                <span className="word block">DIGITAL</span>
                <span className="word block">EXPERIENCES</span>
              </h1>
            </div>
            
            <div ref={heroCtaRef} className="mt-6 md:mt-8">
              <button 
                onClick={() => scrollToSection(workRef.current)}
                className="btn-primary inline-block text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 cursor-pointer border-none"
              >
                Explore Work
              </button>
            </div>
            
            <p className="text-[#A7ACB5] text-xs md:text-sm mt-6 max-w-sm mx-auto md:mx-0 leading-relaxed">
              Design systems, immersive sites, and interaction craft for brands that want to stand out.
            </p>
          </div>
          
          {/* Circle Image */}
          <div className="relative md:w-1/2 flex items-center justify-center order-1 md:order-2">
            <div 
              ref={heroCircleRef}
              className="media-circle w-[65vw] h-[65vw] md:w-[45vw] md:h-[45vw] max-w-[320px] max-h-[320px] md:max-w-[500px] md:max-h-[500px] flex items-center justify-center bg-[#0B0B0D]/50"
            >
              <svg 
                viewBox="0 0 593.14 595.28" 
                className="w-[70%] h-[70%]"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="linear-gradient" x1="296.57" y1="595.28" x2="296.57" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#6bcff6"/>
                    <stop offset="1" stopColor="#73c8b6"/>
                  </linearGradient>
                </defs>
                <path fill="url(#linear-gradient)" d="M390.13,202.67c-6.53-6.53-13.12-13-19.71-19.28,48.3-37.6,93.09-64.56,128.09-77.43,29.8-11,52.53-11.73,64.26,0,3.75,3.75,6.23,8.7,7.37,14.81,1.15,5.74,1.15,12.45,0,20.19-.36,2.72-.91,5.62-1.57,8.58-.24,1.15.42,2.24,1.51,2.66h.06c1.09.36,2.24-.18,2.72-1.21,23.39-50.17,26.6-85.83,9.31-103.18-3.32-3.32-7.37-5.8-12.03-7.62-2.3-.85-4.78-1.51-7.37-2.05-1.51-.3-3.02-.54-4.59-.73,0,0-22.43-4.05-58.27,8.52,1.45-.91,26.96-16.99,60.14-14.2-1.63-7.68-7.74-16.26-12.57-21.1-13.42-13.42-38.38-13.78-71.03-3.08-47.69,15.53-111.71,54.52-179.83,110.26C228.32,61.95,164.12,22.9,116.37,7.43c-3.32-1.09-6.53-2.06-9.73-2.9-.91-.24-1.81-.48-2.66-.67-3.2-.85-6.35-1.51-9.37-2.05-.6-.12-1.15-.18-1.69-.3-3.02-.48-5.98-.91-8.76-1.15-.24,0-.42-.06-.6-.06-3.14-.24-6.17-.3-9.01-.24-.18,0-.36.06-.54.06-7.5.24-13.96,1.69-19.46,4.41-3.26,1.57-6.1,3.63-8.58,6.1-.91.91-1.75,1.87-2.72,2.96-.54.73-1.21,1.39-1.69,2.18-.06.06-.12.12-.18.18-2.84,4.41-4.59,9.67-5.62,15.66,6.65-.36,12.94,0,18.8.85,22.37,3.08,37.84,12.81,38.99,13.48-15.9-5.62-29.2-7.86-38.99-8.7-12.33-1.09-19.28.18-19.28.18-1.09.12-2.12.36-3.2.54-8.58,1.39-15.78,4.59-21.04,9.85-17.35,17.35-14.14,53.01,9.25,103.18.54,1.03,1.69,1.57,2.84,1.21,1.09-.42,1.69-1.51,1.45-2.66-4.59-20.49-2.6-35.12,5.86-43.58,5.68-5.68,13.84-8.4,24.12-8.52,36.21-.42,98.53,31.8,168.16,86.02-6.59,6.29-13.12,12.69-19.65,19.22-61.96,61.96-113.16,125.13-148.52,180.68C5.45,460.36-13.41,522.68,11.01,547.1c4.78,4.78,10.94,7.86,18.44,9.49v-.12c-.24-29.68,13.66-51.74,14.51-53.07-9.37,26.72-9.49,45.94-8.95,54.04v.3c.18,2.24.36,3.51.42,3.87v.06c.18,1.57.42,3.08.73,4.59,1.69,7.31,4.84,13.36,9.55,18.01,7.31,7.37,17.89,11,31.55,11,18.5,0,42.62-6.77,71.57-20.25,1.03-.48,1.51-1.57,1.27-2.6-.06-.06-.06-.12-.06-.18-.36-1.09-1.51-1.75-2.66-1.51-3.26.73-6.35,1.33-9.31,1.69-7.01.97-13.24.97-18.5,0-6.59-1.09-11.85-3.63-15.78-7.56-34.76-34.76,39.89-165.99,166.41-292.5,8.76-8.76,17.59-17.29,26.35-25.57,8.76,8.28,17.59,16.8,26.35,25.57,61.6,61.6,112.73,126.15,144.11,181.82,30.4,54.1,38.57,94.48,22.3,110.68-3.93,3.93-9.19,6.47-15.72,7.56-5.32.97-11.48.97-18.5,0-2.96-.36-6.11-.97-9.37-1.69-1.15-.24-2.24.42-2.6,1.51-.06.06-.06.12,0,.18-.36,1.03.18,2.12,1.15,2.6,28.95,13.48,53.07,20.25,71.63,20.25,13.6,0,24.24-3.63,31.55-10.94,3.26-3.26,5.8-7.25,7.62-11.91,1.27-3.26,2.18-6.83,2.72-10.7v-.06c.18-1.27.3-2.54.42-3.87v-.3c.54-8.1.42-27.32-8.95-54.04.85,1.33,14.75,23.39,14.51,53.07,2.24-.48,4.35-1.09,6.35-1.81,4.71-1.75,8.7-4.29,11.97-7.62,18.19-18.13,12.39-57.36-11.97-107.96-31.98-66.37-96.05-152.51-180.01-236.47Z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Bottom elements - hidden on mobile */}
        <div className="hidden md:flex absolute left-[8vw] bottom-[8vh] micro-label text-[#A7ACB5]">
          SCROLL
        </div>
        <div className="hidden md:flex absolute right-[8vw] bottom-[8vh] gap-6">
          {['', '', ''].map((social) => (
            <a key={social} href="#" className="micro-label text-[#A7ACB5] hover:text-[#F4F6F8] transition-colors">
              {social}
            </a>
          ))}
        </div>
      </section>

      {/* Section 2: New Work */}
      <section ref={newWorkRef} className="section-pinned z-20">
        <div className="relative md:absolute inset-0 flex flex-col md:flex-row items-center justify-center px-6 md:px-[8vw] py-8 md:py-0">
          {/* Circle Image */}
          <div className="relative md:w-1/2 flex items-center justify-center order-1 mb-6 md:mb-0">
            <div className="media-circle w-[55vw] h-[55vw] md:w-[40vw] md:h-[40vw] max-w-[280px] max-h-[280px] md:max-w-[450px] md:max-h-[450px]">
              <CircleImage src="/images/new_scene_circle_lifestyle.jpg" alt="Lifestyle" />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="relative z-20 text-center md:text-right md:w-1/2 order-2">
            <div className="new-label micro-label text-[#B8FF2C] mb-4 md:mb-6">NEW</div>
            
            <div className="headline-group">
              <h2 className="headline-xl text-[clamp(28px,6vw,64px)] text-[#F4F6F8] leading-[0.95]">
                <span className="block">FRESH</span>
                <span className="block">TAKE ON</span>
                <span className="block">WEB DESIGN</span>
              </h2>
            </div>
            
            <div className="body-text mt-4 md:mt-6 max-w-sm mx-auto md:mx-0 md:ml-auto">
              <p className="text-[#A7ACB5] text-sm leading-relaxed">
                A new site for a modern audience—clean systems, bold type, and motion that serves the story.
              </p>
            </div>
            
            <div className="cta-button mt-6 md:mt-8">
              <button 
                onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary inline-block text-center text-sm md:text-base px-5 md:px-8 py-2.5 md:py-3 cursor-pointer border-none"
          >
            View Case Study
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: About */}
      <section ref={aboutRef} id="studio" className="section-pinned z-30">
        <div className="relative md:absolute inset-0 flex flex-col md:flex-row items-center justify-center px-6 md:px-[8vw] py-8 md:py-0">
          {/* Text Content */}
          <div className="relative z-20 text-center md:text-left md:w-1/2 order-2 md:order-1 mt-6 md:mt-0">
            <div className="index-label micro-label text-[#A7ACB5] mb-3 md:mb-4">(1)</div>
            
            <div className="headline-group">
              <h2 className="headline-xl text-[clamp(28px,6vw,64px)] text-[#F4F6F8] leading-[0.95]">
                <span className="block">MODERN</span>
                <span className="block">APPROACH TO</span>
                <span className="block">WEB DESIGN</span>
              </h2>
            </div>
            
            <div className="body-text mt-4 md:mt-6 max-w-sm mx-auto md:mx-0">
              <p className="text-[#A7ACB5] text-sm leading-relaxed">
                We prototype in code, design in systems, and ship sites that stay fast—without losing personality.
              </p>
            </div>
            
            <div className="cta-button mt-6 md:mt-8">
              <button 
                onClick={openStudio}
                className="btn-primary inline-block text-center text-sm md:text-base px-5 md:px-8 py-2.5 md:py-3 cursor-pointer border-none"
          >
            Meet the Studio
              </button>
            </div>
          </div>
          
          {/* Circle Image */}
          <div className="relative md:w-1/2 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
            <div className="media-circle w-[55vw] h-[55vw] md:w-[40vw] md:h-[40vw] max-w-[280px] max-h-[280px] md:max-w-[450px] md:max-h-[450px]">
              <CircleImage src="/images/about_circle_workspace.jpg" alt="Workspace" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Services */}
      <section ref={servicesRef} id="services" className="section-pinned z-40">
        <div className="relative md:absolute inset-0 flex flex-col md:flex-row items-center justify-center px-6 md:px-[8vw] py-8 md:py-0">
          {/* Circle Image */}
          <div className="relative md:w-1/2 flex items-center justify-center order-1 mb-6 md:mb-0">
            <div className="media-circle w-[55vw] h-[55vw] md:w-[40vw] md:h-[40vw] max-w-[280px] max-h-[280px] md:max-w-[450px] md:max-h-[450px]">
              <CircleImage src="/images/services_circle_collab.jpg" alt="Collaboration" />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="relative z-20 text-center md:text-right md:w-1/2 order-2">
            <div className="index-label micro-label text-[#A7ACB5] mb-3 md:mb-4">(2)</div>
            
            <div className="headline-group">
              <h2 className="headline-xl text-[clamp(28px,6vw,64px)] text-[#F4F6F8] leading-[0.95]">
                <span className="block">CREATIVE</span>
                <span className="block">WEB DESIGN</span>
                <span className="block">SOLUTIONS</span>
              </h2>
            </div>
            
            <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              {services.map((service, i) => (
                <div key={i} className="service-item">
                  <div className="micro-label text-[#F4F6F8] text-xs md:text-sm">{service.name}</div>
                  <div className="text-xs text-[#A7ACB5]">{service.desc}</div>
                </div>
              ))}
            </div>
            
            <div className="cta-button mt-6 md:mt-8">
              <a href="#contact" className="btn-primary inline-block text-sm md:text-base px-5 md:px-8 py-2 md:py-3">Start a Project</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Violet Panel */}
      <section ref={violetRef} className="section-pinned z-50">
        <div className="relative md:absolute inset-0 flex items-center justify-center px-6 md:px-[8vw] py-8 md:py-0">
          <div className="relative z-10 text-center md:text-left max-w-lg">
            <div className="headline-group">
              <h2 className="headline-xl text-[clamp(32px,7vw,72px)] text-[#F4F6F8] leading-[0.95]">
                <span className="block">LET'S CREATE</span>
                <span className="block">SOMETHING</span>
                <span className="block text-[#B8FF2C]">GREAT</span>
              </h2>
            </div>
            
            <div className="subheadline mt-4 md:mt-6 max-w-sm mx-auto md:mx-0">
              <p className="text-[#A7ACB5] text-sm leading-relaxed">
                Tell us what you're building. We'll reply within two business days.
              </p>
            </div>
            
            <div className="cta-row mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
              <button 
                onClick={() => scrollToSection(contactRef.current)}
                className="btn-primary inline-block text-center text-sm md:text-base px-5 md:px-8 py-2 md:py-3 cursor-pointer border-none"
              >
                Request a Quote
              </button>
              <a href="mailto:hello@xize.co.uk" className="btn-outline inline-block text-center text-sm md:text-base px-5 md:px-8 py-2 md:py-3">Email Me</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Work - Compact Cards */}
      <section ref={workRef} id="work" className="relative z-[60] py-16 md:py-24 px-4 md:px-[8vw]">
        <div className="mb-8 md:mb-12">
          <h2 className="headline-xl text-[clamp(24px,4vw,48px)] text-[#F4F6F8]">SELECTED WORK</h2>
        </div>
        
        {/* Compact project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`work-card group relative overflow-hidden rounded-xl md:rounded-2xl ${project.isPlaceholder ? '' : 'cursor-pointer'}`}
              onClick={() => !project.isPlaceholder && openProject(project, index)}
            >
              {/* Background image/video */}
              <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                {(project as {isVideo?: boolean}).isVideo ? (
                  <video 
                    src={project.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent opacity-90" />
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex gap-2 mb-2">
                      {project.tags?.map((tag) => (
                        <span key={tag} className="micro-label text-[#B8FF2C] text-[10px] md:text-xs">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#F4F6F8] group-hover:text-[#B8FF2C] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* View button - only for non-placeholder projects */}
                  {!project.isPlaceholder && (
                    <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <span className="micro-label text-[#F4F6F8] text-xs">VIEW</span>
                      <div className="w-8 h-8 rounded-full border border-[#F4F6F8]/30 flex items-center justify-center group-hover:bg-[#B8FF2C] group-hover:border-[#B8FF2C] transition-all">
                        <ExternalLink className="w-4 h-4 text-[#F4F6F8] group-hover:text-[#0B0B0D]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Contact */}
      <section ref={contactRef} id="contact" className="relative z-[70] py-16 md:py-24 px-4 md:px-[8vw]">
        <div className="headline-group text-center mb-6 md:mb-8">
          <h2 className="headline-xl text-[clamp(28px,5vw,56px)] text-[#F4F6F8]">READY WHEN YOU ARE.</h2>
          <p className="text-[#A7ACB5] mt-3 md:mt-4 text-sm">Send a brief, a moodboard, or just a hello.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          <button 
            onClick={() => scrollToSection(contactRef.current)}
            className="btn-primary inline-block text-center text-sm md:text-base px-5 md:px-8 py-2.5 md:py-3 cursor-pointer border-none"
          >
            Start a Project
          </button>
          <button 
            onClick={() => scrollToSection(servicesRef.current)}
            className="btn-outline inline-block text-center text-sm md:text-base px-5 md:px-8 py-2.5 md:py-3 cursor-pointer border-none bg-transparent"
          >
            View Services
          </button>
        </div>
        
        <div className="contact-form max-w-lg mx-auto mb-16 md:mb-20">
          <form 
            action="https://formspree.io/f/xreojakb" 
            method="POST"
            className="space-y-4 md:space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <input type="text" name="name" placeholder="Name" className="form-input text-sm" required />
              <input type="email" name="email" placeholder="Email" className="form-input text-sm" required />
            </div>
            <select name="budget" className="form-input text-sm">
              <option value="">Budget Range</option>
              <option value="£250-£500">£250 - £500</option>
              <option value="£500-£1000">£500 - £1,000</option>
              <option value="£1000+">£1,000+</option>
            </select>
            <textarea name="message" placeholder="Tell us about your project" rows={4} className="form-input text-sm resize-none" required />
            <button type="submit" className="btn-primary w-full text-sm md:text-base py-2.5 md:py-3">Send Message</button>
          </form>
        </div>
        
        {/* Footer */}
        <footer className="border-t border-[rgba(244,246,248,0.1)] pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#A7ACB5] text-xs md:text-sm">
              © 2026 XIZE. Built with care.
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="micro-label text-[#A7ACB5] hover:text-[#F4F6F8] transition-colors text-xs"
            >
              Back to top
            </button>
          </div>
        </footer>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          ref={projectDetailRef}
          className="fixed inset-0 z-[200] bg-[#0B0B0D] overflow-y-auto"
        >
          <div className="project-content min-h-screen">
            {/* Close button */}
            <button 
              onClick={closeProject}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#F4F6F8]/20 flex items-center justify-center hover:bg-[#F4F6F8]/10 transition-colors"
            >
              <X className="w-4 h-4 md:w-5 md:h-5 text-[#F4F6F8]" />
            </button>
            
            {/* Navigation arrows */}
            <button 
              type="button"
              onClick={() => navigateProject('prev')}
              className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#F4F6F8]/30 bg-[#0B0B0D]/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#F4F6F8]/20 transition-colors pointer-events-auto cursor-pointer"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-[#F4F6F8]" />
            </button>
            <button 
              type="button"
              onClick={() => navigateProject('next')}
              className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#F4F6F8]/30 bg-[#0B0B0D]/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#B8FF2C]/20 hover:border-[#B8FF2C] transition-colors pointer-events-auto cursor-pointer"
              aria-label="Next project"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#F4F6F8]" />
            </button>
            
            {/* Hero image/video */}
            <div className="relative h-[40vh] md:h-[50vh]">
              {(selectedProject as {isVideo?: boolean}).isVideo ? (
                <video 
                  src={selectedProject.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent" />
            </div>
            
            {/* Content */}
            <div className="px-4 md:px-16 lg:px-24 -mt-16 md:-mt-24 relative z-10 pb-16 md:pb-20">
              <div className="flex gap-2 mb-4 md:mb-6">
                {selectedProject.tags?.map((tag) => (
                  <span key={tag} className="micro-label text-[#B8FF2C] text-xs">{tag}</span>
                ))}
              </div>
              
              <h1 className="headline-xl text-[clamp(32px,5vw,64px)] text-[#F4F6F8] mb-6 md:mb-8">
                {selectedProject.title}
              </h1>
              
              <div className="grid grid-cols-3 gap-4 md:gap-12 mb-8 md:mb-12">
                <div>
                  <div className="micro-label text-[#A7ACB5] mb-1 md:mb-2 text-xs">CLIENT</div>
                  <div className="text-[#F4F6F8] text-sm md:text-base">{selectedProject.client}</div>
                </div>
                <div>
                  <div className="micro-label text-[#A7ACB5] mb-1 md:mb-2 text-xs">YEAR</div>
                  <div className="text-[#F4F6F8] text-sm md:text-base">{selectedProject.year}</div>
                </div>
                <div>
                  <div className="micro-label text-[#A7ACB5] mb-1 md:mb-2 text-xs">SERVICES</div>
                  <div className="text-[#F4F6F8] text-xs md:text-sm">{selectedProject.services.join(', ')}</div>
                </div>
              </div>
              
              <div className="max-w-2xl">
                <div className="micro-label text-[#A7ACB5] mb-3 md:mb-4 text-xs">ABOUT THE PROJECT</div>
                <p className="text-base md:text-lg text-[#F4F6F8] leading-relaxed mb-6 md:mb-8">
                  {selectedProject.description}
                </p>
                <p className="text-[#A7ACB5] text-sm leading-relaxed mb-8 md:mb-10">
                  We approached this project with a focus on creating an experience that resonates with the target audience. 
                  Through iterative design and close collaboration with the client, we delivered a solution that exceeded expectations.
                </p>
                
                <button 
                  type="button"
                  onClick={() => navigateProject('next')}
                  className="btn-primary inline-flex items-center gap-2 md:gap-3 text-sm md:text-base px-5 md:px-8 py-2.5 md:py-3 cursor-pointer"
                >
                  Next Project
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Next project preview - find next non-placeholder */}
            {(() => {
              let nextIndex = currentProjectIndex;
              let attempts = 0;
              do {
                nextIndex = (nextIndex + 1) % filteredProjects.length;
                attempts++;
              } while (filteredProjects[nextIndex].isPlaceholder && attempts < filteredProjects.length);
              
              if (filteredProjects[nextIndex].isPlaceholder) return null;
              
              return (
                <div className="border-t border-[rgba(244,246,248,0.1)] px-4 md:px-16 lg:px-24 py-8 md:py-12">
                  <div className="micro-label text-[#A7ACB5] mb-2 md:mb-4 text-xs">NEXT PROJECT</div>
                  <button 
                    type="button"
                    onClick={() => navigateProject('next')}
                    className="text-xl md:text-3xl font-bold text-[#F4F6F8] hover:text-[#B8FF2C] transition-colors text-left cursor-pointer"
                  >
                    {filteredProjects[nextIndex].title}
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>

    {/* Studio Page Modal */}
    {studioOpen && (
      <div 
        ref={studioRef}
        className="fixed inset-0 z-[200] bg-[#0B0B0D] overflow-y-auto"
      >
        <div className="studio-content min-h-screen">
          {/* Close button */}
          <button 
            onClick={closeStudio}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#F4F6F8]/20 bg-[#0B0B0D]/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#F4F6F8]/20 transition-colors pointer-events-auto cursor-pointer"
            aria-label="Close studio page"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-[#F4F6F8]" />
          </button>
          
          {/* Hero Section */}
          <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center">
            <div className="absolute inset-0">
              <img 
                src="/images/about_circle_workspace.jpg" 
                alt="Studio" 
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0D]/50 to-[#0B0B0D]" />
            </div>
            <div className="relative z-10 text-center px-6">
              <span className="micro-label text-[#B8FF2C] text-xs mb-4 block">ABOUT US</span>
              <h1 className="headline-xl text-[clamp(36px,8vw,80px)] text-[#F4F6F8] mb-4">
                WE ARE XIZE
              </h1>
              <p className="text-[#A7ACB5] text-base md:text-lg max-w-md mx-auto">
                A creative studio crafting digital experiences that captivate and convert.
              </p>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 md:px-16 lg:px-24 pb-16 md:pb-24 -mt-20 relative z-10">
            {/* Story Section */}
            <div className="max-w-3xl mb-16 md:mb-24">
              <h2 className="headline-xl text-[clamp(24px,4vw,40px)] text-[#F4F6F8] mb-6">
                OUR STORY
              </h2>
              <p className="text-[#A7ACB5] text-base md:text-lg leading-relaxed mb-6">
                Founded in 2026, XIZE started with a simple belief: great design should be both beautiful and functional. 
                We set out to create digital experiences that don't just look good—they perform.
              </p>
              <p className="text-[#A7ACB5] text-base md:text-lg leading-relaxed">
                Today, we're a tight-knit team of designers, developers, and strategists who bring diverse perspectives 
                to every project. We don't do cookie-cutter solutions. Every brand we work with gets a bespoke 
                experience tailored to their unique goals and audience.
              </p>
            </div>
            
            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-24">
              <div>
                <div className="w-12 h-12 rounded-full border border-[#B8FF2C]/30 flex items-center justify-center mb-4">
                  <span className="text-[#B8FF2C] text-xl">01</span>
                </div>
                <h3 className="text-[#F4F6F8] text-lg font-semibold mb-2">Design First</h3>
                <p className="text-[#A7ACB5] text-sm leading-relaxed">
                  We believe design isn't just how it looks—it's how it works. Every pixel serves a purpose.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full border border-[#B8FF2C]/30 flex items-center justify-center mb-4">
                  <span className="text-[#B8FF2C] text-xl">02</span>
                </div>
                <h3 className="text-[#F4F6F8] text-lg font-semibold mb-2">Performance Matters</h3>
                <p className="text-[#A7ACB5] text-sm leading-relaxed">
                  A slow site kills conversions. We optimize for speed without sacrificing aesthetics.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full border border-[#B8FF2C]/30 flex items-center justify-center mb-4">
                  <span className="text-[#B8FF2C] text-xl">03</span>
                </div>
                <h3 className="text-[#F4F6F8] text-lg font-semibold mb-2">Collaboration</h3>
                <p className="text-[#A7ACB5] text-sm leading-relaxed">
                  We work with you, not for you. Your input shapes the final product.
                </p>
              </div>
            </div>
            
            {/* Team */}
            <div className="mb-16 md:mb-24">
              <h2 className="headline-xl text-[clamp(24px,4vw,40px)] text-[#F4F6F8] mb-8">
                THE TEAM
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl text-[#F4F6F8]">MJ</span>
                  </div>
                  <h4 className="text-[#F4F6F8] font-semibold mb-1">Marco J</h4>
                  <p className="text-[#A7ACB5] text-sm">Founder & Creative Director</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#6BCFF6] to-[#3a9bc4] mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl text-[#0B0B0D]">SK</span>
                  </div>
                  <h4 className="text-[#F4F6F8] font-semibold mb-1">Sarah Kim</h4>
                  <p className="text-[#A7ACB5] text-sm">Lead Designer</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#C864B4] to-[#8a3d7a] mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl text-[#F4F6F8]">MR</span>
                  </div>
                  <h4 className="text-[#F4F6F8] font-semibold mb-1">Mike Ross</h4>
                  <p className="text-[#A7ACB5] text-sm">Lead Developer</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24 border-t border-b border-[rgba(244,246,248,0.1)] py-8 md:py-12">
              <div className="text-center">
                <div className="text-[clamp(32px,5vw,48px)] font-bold text-[#B8FF2C] mb-1">50+</div>
                <div className="text-[#A7ACB5] text-sm">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-[clamp(32px,5vw,48px)] font-bold text-[#B8FF2C] mb-1">30+</div>
                <div className="text-[#A7ACB5] text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-[clamp(32px,5vw,48px)] font-bold text-[#B8FF2C] mb-1">5</div>
                <div className="text-[#A7ACB5] text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-[clamp(32px,5vw,48px)] font-bold text-[#B8FF2C] mb-1">12</div>
                <div className="text-[#A7ACB5] text-sm">Awards Won</div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="text-center">
              <h2 className="headline-xl text-[clamp(24px,4vw,40px)] text-[#F4F6F8] mb-4">
                LET'S WORK TOGETHER
              </h2>
              <p className="text-[#A7ACB5] text-base md:text-lg mb-6 max-w-md mx-auto">
                Have a project in mind? We'd love to hear about it.
              </p>
              <button 
                onClick={() => {
                  closeStudio();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 400);
                }}
                className="btn-primary inline-flex items-center gap-2 text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 cursor-pointer"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default App;
