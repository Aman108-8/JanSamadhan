import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Bell, ChevronRight, Users, Building2, GraduationCap, Lightbulb, Sparkles, Wheat, Droplets, Stethoscope, BookOpen, Construction, Leaf, Sprout, Home as HomeIcon} from 'lucide-react';

const sectors = [
    { label: 'Agriculture', icon: Wheat, tint: '#ECFDF3', fg: '#15803D' },
    { label: 'Water & Irrig.', icon: Droplets, tint: '#EFF6FF', fg: '#2563EB' },
    { label: 'Healthcare', icon: Stethoscope, tint: '#FDF2F8', fg: '#DB2777' },
    { label: 'Education', icon: BookOpen, tint: '#FFFBEB', fg: '#B45309' },
    { label: 'Infrastructure', icon: Construction, tint: '#F3F4F6', fg: '#374151' },
    { label: 'Environment', icon: Leaf, tint: '#ECFDF3', fg: '#16A34A' },
    { label: 'Sanitation', icon: Sprout, tint: '#FDF2F8', fg: '#DB2777' },
    { label: 'Rural Dev.', icon: HomeIcon, tint: '#FFF7ED', fg: '#C2410C' },
    ];

    const stats = [
    { label: 'Problems Reported', value: '14,892', icon: '↑', iconBg: '#EFF6FF', iconFg: '#2563EB' },
    { label: 'Problems Resolved', value: '9,410', icon: '✓', iconBg: '#ECFDF3', iconFg: '#16A34A' },
    { label: 'Active R&D Projects', value: '1,824', icon: '⚗', iconBg: '#EFF6FF', iconFg: '#2563EB' },
    { label: 'Districts Covered', value: '24 / 24', icon: '🗺', iconBg: '#F5F3FF', iconFg: '#7C3AED' },
    ];

    const lifecycle = [
    { label: 'Citizen', icon: Users, bg: '#DCFCE7', fg: '#15803D' },
    { label: 'Govt Review', icon: Building2, bg: '#DBEAFE', fg: '#1D4ED8' },
    { label: 'Uni/Industry', icon: GraduationCap, bg: '#FEF3C7', fg: '#B45309' },
    { label: 'R&D Solution', icon: Lightbulb, bg: '#F3E8FF', fg: '#7E22CE' },
    { label: 'Impact', icon: Sparkles, bg: '#CCFBF1', fg: '#0F766E' },
    ];

    const howItWorks = {
    citizen: [
        'Take a picture of your community issue',
        'Upload village & family impact details',
    ],
    district: [
        'Field officers verify within 48 hours',
        'Routed to R&D consortium / local works',
    ],
    engineered: [
        'Real-time GPS progress photo tracking',
        'Direct citizen closure sign-off & feedback',
    ],
    };

    const Home = () => {
    return (
        <div style={{ background: '#F7F8FA', minHeight: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: '#111827' }}>
        {/* Nav */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: '#14532D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Landmark size={18} color="#fff" strokeWidth={2} />
                </div>
                <div style={{ lineHeight: 1.1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>JanSamadhan</div>
                    {/*<div style={{ fontSize: 11, color: '#6B7280' }}>झारखंड सरकार | Govt of Jharkhand</div>*/}
                    <div style={{ fontSize: 11, color: '#6B7280' }}>Public Help</div>
                </div>
            </div>

            <nav style={{ display: 'flex', gap: 28, fontSize: 14, color: '#374151' }}>
                <a style={{ color: '#14532D', fontWeight: 600, borderBottom: '2px solid #14532D', paddingBottom: 4, textDecoration: 'none' }} href="#">Home</a>
                <Link style={{ color: '#374151', textDecoration: 'none' }} to="/explore-problems">Explore Problems</Link>
                <Link style={{ color: '#374151', textDecoration: 'none' }} to="/report-problem">Report a Problem</Link>
                <Link style={{ color: '#374151', textDecoration: 'none' }} to="/my-problems">My Problems</Link>
                <a style={{ color: '#374151', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }} href="#">
                    Notifications
                    <span style={{ background: '#DC2626', color: '#fff', fontSize: 10, borderRadius: 999, padding: '1px 6px', fontWeight: 700 }}>2</span>
                </a>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 13, color: '#374151' }}>हिं / EN</span>
                <Link to="/report-problem" style={{ background: '#14532D', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', textDecoration: 'none' }}>
                    + Report
                </Link>
            </div>
        </header>

        <main style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 24px 48px' }}>
            {/* Hero */}
            <section style={{ position: 'relative', background: 'linear-gradient(135deg, #E9ECE6 0%, #DDE3D9 100%)', borderRadius: 18, padding: '36px 40px', overflow: 'hidden', display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ maxWidth: 560, position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-block', background: '#14532D', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999, marginBottom: 16 }}>
                    PUBLIC ACTION PLATFORM
                    </div>
                    <h1 style={{ fontSize: 34, lineHeight: 1.15, fontWeight: 800, margin: '0 0 14px', color: '#14532D' }}>
                    Report a Problem<span style={{ color: '#4B5563' }}>, Create an Impact</span>
                    </h1>
                    <p style={{ fontSize: 14.5, color: '#4B5563', lineHeight: 1.6, marginBottom: 24 }}>
                    Empowering citizens across all 24 districts of Jharkhand. Submit grassroots challenges in agriculture,
                    water, and healthcare — directly connecting them with State Ministries, premier institutions (IIT/NIT), and industry.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Link to="/report-problem" style={{ background: '#14532D', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 20px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textDecoration: 'none' }}>
                        Report a Problem <ChevronRight size={16} />
                    </Link>
                    <button style={{ background: '#fff', color: '#111827', border: '1px solid #D1D5DB', borderRadius: 8, padding: '11px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                        Explore Solutions
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
                        <div style={{ display: 'flex' }}>
                        {[0, 1, 2].map((i) => (
                            <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: '#9CA3AF', border: '2px solid #E9ECE6', marginLeft: i === 0 ? 0 : -8 }} />
                        ))}
                        </div>
                        <span>24,800+ Citizens Engaged</span>
                    </div>
                    </div>
                </div>

            {/* Lifecycle card */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', width: 320, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#14532D', letterSpacing: 0.3, marginBottom: 14 }}>
                THE COLLABORATIVE LIFECYCLE
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                {lifecycle.map((step, i) => (
                    <React.Fragment key={step.label}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 52 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: step.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <step.icon size={16} color={step.fg} strokeWidth={2} />
                        </div>
                        <span style={{ fontSize: 9.5, color: '#4B5563', textAlign: 'center', lineHeight: 1.15 }}>{step.label}</span>
                    </div>
                    {i < lifecycle.length - 1 && <div style={{ flex: 1, height: 1, background: '#E5E7EB', marginTop: -14 }} />}
                    </React.Fragment>
                ))}
                </div>

                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#14532D' }}>LIVE ACTIVE MATCHING</span>
                    </div>
                    <span style={{ fontSize: 10, color: '#9CA3AF' }}>Updated 2m ago</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#111827', marginBottom: 2 }}>
                    Solar Fluoride Filter Problem (JH-RNC-104)
                </div>
                <div style={{ fontSize: 11, color: '#6B7280' }}>
                    Assigned to: Birla Institute of Technology (BIT) Mesra &amp; Tata Steel CSR
                </div>
                </div>
            </div>
            </section>

            {/* Stats */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 24 }}>
            {stats.map((s) => (
                <div key={s.label} style={{ background: '#fff', border: '1px solid #EEF0F2', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#111827' }}>{s.value}</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: s.iconBg, color: s.iconFg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                    {s.icon}
                </div>
                </div>
            ))}
            </section>

            {/* Key Action Sectors */}
            <section style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Key Action Sectors</h2>
                <span style={{ fontSize: 12.5, color: '#9CA3AF' }}>Select a domain to browse active village &amp; municipal initiatives</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14 }}>
                {sectors.map((s) => (
                <div key={s.label} style={{ background: '#fff', border: '1px solid #EEF0F2', borderRadius: 12, padding: '18px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: s.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={17} color={s.fg} strokeWidth={2} />
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: '#111827', textAlign: 'center' }}>{s.label}</div>
                    <div style={{ fontSize: 10.5, color: '#9CA3AF' }}>{s.count}</div>
                </div>
                ))}
            </div>
            </section>

            {/* How it works banner */}
            <section style={{ marginTop: 28, background: '#0B1E12', borderRadius: 14, padding: '24px 32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#4ADE80', marginBottom: 12 }}>HOW JANSAMADHAN WORKS FOR YOU</div>
                <ol style={{ margin: 0, paddingLeft: 18, color: '#D1D5DB', fontSize: 13, lineHeight: 1.9 }}>
                {howItWorks.citizen.map((t) => <li key={t}>{t}</li>)}
                </ol>
            </div>
            <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#60A5FA', marginBottom: 12 }}>DISTRICT COLLECTORATE VERIFICATION</div>
                <ol style={{ margin: 0, paddingLeft: 18, color: '#D1D5DB', fontSize: 13, lineHeight: 1.9 }} start={3}>
                {howItWorks.district.map((t) => <li key={t}>{t}</li>)}
                </ol>
            </div>
            <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#FBBF24', marginBottom: 12 }}>ENGINEERED DEPLOYMENT</div>
                <ol style={{ margin: 0, paddingLeft: 18, color: '#D1D5DB', fontSize: 13, lineHeight: 1.9 }} start={5}>
                {howItWorks.engineered.map((t) => <li key={t}>{t}</li>)}
                </ol>
            </div>
            </section>
        </main>
        </div>
    );
};

export default Home;