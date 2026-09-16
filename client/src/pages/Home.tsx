import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BrainCircuit,
  Check,
  ChevronDown,
  Clock3,
  Layers3,
  Linkedin,
  Menu,
  Play,
  Quote,
  Send,
  Sparkles,
  Star,
  Twitter,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

const modules = [
  ["01", "أساسيات التفكير الذكي", "تأسيس عملي لفهم الذكاء الاصطناعي، نماذج التفكير، وكيف تنتقل من مستخدم عادي إلى صانع قرار أذكى.", "المنظور"],
  ["02", "فن هندسة الأوامر", "حوّل فكرتك إلى نتيجة دقيقة. تقنيات صياغة الأوامر التي تختصر الوقت وتضاعف جودة مخرجاتك.", "المهارة"],
  ["03", "بناء نظام عملك", "اربط الأدوات، أتمت مهامك، وصمّم سير عمل قابل للتوسع يخدم عملك بدل أن يستهلك يومك.", "التطبيق"],
  ["04", "مشروعك من الفكرة إلى الأثر", "تخرج بمشروع حقيقي يوثق خبرتك ويمنحك أفضلية ملموسة في سوق العمل وريادة الأعمال.", "الإنجاز"],
];

const faqs = [
  ["هل أحتاج إلى خبرة تقنية سابقة؟", "أبداً. صُممت الدورة لتبدأ معك من الصفر، ثم تبني فهمك خطوة بخطوة عبر أمثلة عملية تناسب أصحاب الأعمال والمبدعين والمهنيين."],
  ["كيف تتم الدراسة؟", "تجربة تعليمية مرنة تجمع بين دروس قصيرة مركّزة، جلسات مباشرة أسبوعية، وتحديات تطبيقية تساعدك على تحويل المعرفة إلى عادة يومية."],
  ["هل أحصل على شهادة؟", "نعم، تحصل على شهادة إتمام رقمية موثقة بعد إنهاء الوحدات وتسليم مشروع التخرج العملي."],
  ["ما الأدوات التي سنستخدمها؟", "سنستخدم مجموعة منتقاة من أدوات الذكاء الاصطناعي النصية والبصرية وأدوات الأتمتة، مع تحديث المحتوى كلما تغيّر المشهد التقني."],
];

function useCountUp(target: number, duration = 1300) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return count;
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return <div className="stat-item"><strong>{useCountUp(value)}{suffix}</strong><span>{label}</span></div>;
}

function ScrollLink({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) {
  return <a href={href} onClick={onClick} className="nav-link">{children}</a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [email, setEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const navItems = useMemo(() => [["home", "الرئيسية"], ["why", "لماذا الدورة"], ["journey", "الرحلة"], ["faq", "الأسئلة الشائعة"]], []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: "-30% 0px -55%" });
    document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setFormSent(true);
  };

  return (
    <main className="site-shell">
      <div className="topline"><div className="container topline-inner"><span><Sparkles size={14} /> التسجيل المبكر مفتوح الآن</span><a href="#join">احجز مقعدك قبل اكتمال المجموعة <ArrowUpLeft size={14} /></a></div></div>
      <header className="site-header"><div className="container header-inner">
        <a className="brand" href="#home" aria-label="خبرات - الصفحة الرئيسية"><span className="brand-mark"><BrainCircuit size={22} /></span><span><b>خبرات</b><small>AI EXPERIENCE</small></span></a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="التنقل الرئيسي">{navItems.map(([id, label]) => <ScrollLink key={id} href={`#${id}`} onClick={closeMenu}><span className={activeSection === id ? "active" : ""}>{label}</span></ScrollLink>)}</nav>
        <div className="header-actions"><a className="text-action" href="#join">تواصل معنا <ArrowUpLeft size={16} /></a><a className="button button-small" href="#join">ابدأ رحلتك <ArrowLeft size={16} /></a></div>
        <button className="mobile-menu" onClick={() => setMenuOpen((value) => !value)} aria-label="فتح القائمة">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div></header>

      <section className="hero" id="home"><div className="hero-image" aria-hidden="true" /><div className="hero-grid" aria-hidden="true" /><div className="container hero-content">
        <div className="hero-copy reveal"><div className="eyebrow"><span className="pulse-dot" /> دورة خبرات الذكاء الاصطناعي</div><h1>لا تستخدم الذكاء الاصطناعي فقط.<br /><em>امتلك خبرته.</em></h1><p className="hero-lead">تجربة تعليمية عملية تنقلك من فضول البداية إلى قوة الإنجاز. تعلّم كيف تفكّر بذكاء، تعمل أسرع، وتصنع أثراً لا يختفي.</p><div className="hero-actions"><a className="button button-primary" href="#join">احجز مقعدك الآن <ArrowUpLeft size={18} /></a><a className="play-link" href="#journey"><span className="play-icon"><Play size={13} fill="currentColor" /></span> شاهد كيف نعمل</a></div><div className="hero-trust"><div className="avatar-stack"><span>م</span><span>ر</span><span>س</span><span>ن</span></div><span>انضم إلى <b>+2,400</b> متعلّم يصنع الفرق</span></div></div>
        <div className="hero-aside reveal reveal-delay-2"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-floating-card card-top"><span className="mini-icon cyan"><Zap size={15} /></span><span><b>+48%</b><small>إنتاجية أعلى</small></span></div><div className="hero-floating-card card-bottom"><span className="mini-icon violet"><WandSparkles size={15} /></span><span><b>01</b><small>مهارة تغيّر مسارك</small></span></div><div className="hero-chip"><span className="chip-line" /> مسار متكامل · 6 أسابيع</div></div>
      </div><div className="scroll-cue"><span>اكتشف التجربة</span><div className="scroll-line" /></div></section>

      <section className="marquee-section" aria-label="محاور التجربة"><div className="marquee-track"><span>THINK SMARTER</span><i>✦</i><span>CREATE FASTER</span><i>✦</i><span>LEAD BETTER</span><i>✦</i><span>THINK SMARTER</span><i>✦</i><span>CREATE FASTER</span></div></section>

      <section className="intro section-light" id="why"><div className="container"><div className="section-heading split-heading reveal"><div><span className="section-kicker">لماذا خبرات؟</span><h2>لأن المستقبل<br /><span>لا ينتظر أحداً.</span></h2></div><div className="heading-side"><p>المعرفة وحدها لا تكفي. في خبرات، نبني لديك مزيجاً نادراً من الفهم، المهارة، والثقة لتصبح أنت نقطة التحوّل.</p><a className="under-link" href="#journey">اكتشف المنهج <ArrowUpLeft size={16} /></a></div></div><div className="stats-row reveal reveal-delay-1"><Stat value={2400} suffix="+" label="متعلّم حول العالم" /><Stat value={96} suffix="%" label="نسبة الرضا" /><Stat value={18} suffix="" label="خبير وممارس" /><div className="stat-manifesto"><Sparkles size={18} /><span>لا نتبع الموجة.<br /><b>نصنع اتجاهها.</b></span></div></div><div className="feature-grid"><article className="feature-card feature-main reveal reveal-delay-1"><div className="feature-number">01</div><div className="feature-icon"><BrainCircuit size={29} /></div><h3>فهم يتجاوز الأداة</h3><p>لا نعلّمك الضغط على الأزرار، بل نمنحك طريقة تفكير تساعدك على اختيار الأداة، صياغة السؤال، وصناعة النتيجة.</p><a className="circle-arrow" href="#journey"><ArrowUpLeft size={17} /></a></article><article className="feature-card feature-cyan reveal reveal-delay-2"><div className="feature-number">02</div><div className="feature-icon"><Layers3 size={29} /></div><h3>تطبيق يصنع العادة</h3><p>كل مفهوم يتحول إلى تجربة. كل تجربة تترك وراءها مهارة يمكنك استخدامها في عملك من اليوم الأول.</p><a className="circle-arrow" href="#journey"><ArrowUpLeft size={17} /></a></article><article className="feature-card feature-violet reveal reveal-delay-3"><div className="feature-number">03</div><div className="feature-icon"><Users size={29} /></div><h3>مجتمع يرفع سقفك</h3><p>تتعلّم وسط أشخاص طموحين، وتجد الدعم، الإلهام، والفرص التي تجعل رحلتك أكبر من شاشة.</p><a className="circle-arrow" href="#join"><ArrowUpLeft size={17} /></a></article></div></div></section>

      <section className="journey section-dark" id="journey"><div className="dark-glow dark-glow-one" /><div className="dark-glow dark-glow-two" /><div className="container"><div className="section-heading split-heading light-heading reveal"><div><span className="section-kicker">منهج بخطوات واضحة</span><h2>رحلتك نحو<br /><span>الخبرة الحقيقية.</span></h2></div><div className="heading-side"><p>ستة أسابيع مصممة بعناية. من الفكرة الأولى، إلى نظام عمل يثبت أنك جاهز للمرحلة التالية.</p><div className="journey-meta"><span><Clock3 size={15} /> 6 أسابيع</span><span><Zap size={15} /> 24 ساعة تطبيق</span></div></div></div><div className="module-list">{modules.map(([number, title, description, tag], index) => <article className={`module-row reveal reveal-delay-${Math.min(index + 1, 3)}`} key={number}><span className="module-number">{number}</span><div className="module-title"><span>{tag}</span><h3>{title}</h3></div><p>{description}</p><a className="module-arrow" href="#join"><ArrowUpLeft size={19} /></a></article>)}</div><div className="journey-bottom reveal"><span>منهج يتطور معك</span><div className="progress-dots"><i className="filled" /><i className="filled" /><i className="filled" /><i /><i /></div><span>04 / 06</span></div></div></section>

      <section className="practice section-light"><div className="container"><div className="practice-layout"><div className="practice-copy reveal"><span className="section-kicker">أكثر من دورة</span><h2>كل أسبوع،<br /><span>نسخة أقوى منك.</span></h2><p>نحن لا نراكم المعلومات. نبني لك تجربة تعلّم تشبه ورشة عمل حقيقية: فكرة، تجربة، ملاحظة، ثم إنجاز يمكنك أن تفتخر به.</p><a className="button button-dark" href="#join">اطّلع على التفاصيل <ArrowUpLeft size={17} /></a></div><div className="bento-grid reveal reveal-delay-2"><div className="bento-card bento-large"><div className="bento-label"><span className="mini-icon lime"><Sparkles size={14} /></span> عقلية النمو</div><h3>اسأل أفضل.<br />اصنع أكثر.</h3><div className="bento-orbit"><span /><span /><span /></div><div className="bento-footer">01 <span>الأساس الذي يبدأ منه كل شيء</span></div></div><div className="bento-card bento-stat"><strong>6×</strong><span>تطبيقات واقعية<br />داخل الدورة</span><ArrowUpLeft size={18} /></div><div className="bento-card bento-quote"><Quote size={26} /><p>“أكبر قفزة في إنتاجيتي لم تكن بسبب أداة جديدة، بل بسبب طريقة تفكير جديدة.”</p><span>— سارة، مؤسسة استوديو إبداعي</span></div></div></div></div></section>

      <section className="testimonial section-dark"><div className="container testimonial-inner reveal"><div className="testimonial-mark"><Quote size={28} /></div><blockquote>“دخلت الدورة لأفهم الذكاء الاصطناعي، وخرجت وأنا أفهم <em>إمكانياتي</em> بشكل مختلف.”</blockquote><div className="testimonial-person"><div className="person-avatar">ن</div><div><b>ندى العتيبي</b><span>مصممة منتجات رقمية · دفعة 2025</span></div><div className="stars"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div></div></div></section>

      <section className="faq section-light" id="faq"><div className="container faq-layout"><div className="faq-intro reveal"><span className="section-kicker">أسئلة تستحق إجابة</span><h2>وضوح من<br /><span>البداية.</span></h2><p>إذا لم تجد إجابتك هنا، فريقنا جاهز يسمعك.</p><a className="under-link" href="mailto:hello@khibrat.ai">تحدث مع فريقنا <ArrowUpLeft size={16} /></a></div><div className="faq-list reveal reveal-delay-2">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>0{index + 1}</span><b>{question}</b><ChevronDown size={19} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div></section>

      <section className="join section-dark" id="join"><div className="join-pattern" aria-hidden="true" /><div className="container join-inner reveal"><div><span className="section-kicker">الخطوة الأولى تبدأ هنا</span><h2>جاهز تبني<br /><em>خبرتك؟</em></h2><p>اترك بريدك، وسنرسل لك تفاصيل الدورة والدفعة القادمة قبل الجميع.</p></div><form className="join-form" onSubmit={handleSubmit}>{formSent ? <div className="form-success"><span className="success-icon"><Check size={20} /></span><b>وصل طلبك بنجاح.</b><span>سنعود إليك قريباً بكل التفاصيل.</span></div> : <><label htmlFor="email">البريد الإلكتروني</label><div className="input-wrap"><input id="email" type="email" placeholder="name@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="إرسال البريد"><Send size={18} /></button></div><small>لن نرسل لك إلا ما يستحق وقتك. يمكنك الانسحاب في أي وقت.</small></>}</form></div></section>

      <footer className="site-footer"><div className="container footer-top"><a className="brand" href="#home"><span className="brand-mark"><BrainCircuit size={22} /></span><span><b>خبرات</b><small>AI EXPERIENCE</small></span></a><p>نصنع العقول التي تصنع المستقبل.</p><div className="socials"><a href="#join" aria-label="LinkedIn"><Linkedin size={16} /></a><a href="#join" aria-label="Twitter"><Twitter size={16} /></a><a href="mailto:hello@khibrat.ai" aria-label="البريد الإلكتروني"><Send size={16} /></a></div></div><div className="container footer-bottom"><span>© 2025 خبرات. جميع الحقوق محفوظة.</span><span>صُمّم بعناية للعقول الفضولية <Sparkles size={14} /></span></div></footer>
      <a className="mobile-sticky-cta" href="#join">ابدأ رحلتك الآن <ArrowUpLeft size={17} /></a>
    </main>
  );
}
