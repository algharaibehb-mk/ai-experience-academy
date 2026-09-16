import { useMemo, useState, type CSSProperties } from "react";
import { Sparkles, Volume2, RotateCcw, ArrowLeft, Star, Heart, Check, X, PartyPopper } from "lucide-react";
import { toast } from "sonner";

type WordCard = { word: string; emoji: string; color: string; hint: string };

const letters = ["ا", "ب", "ت", "ج", "ح", "خ", "د", "ذ", "ر", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];
const words: Record<string, WordCard[]> = {
  ا: [{ word: "أسد", emoji: "🦁", color: "#ffc857", hint: "ملك الغابة" }, { word: "أرنب", emoji: "🐰", color: "#ff9fb2", hint: "يقفز بسرعة" }],
  ب: [{ word: "بطة", emoji: "🦆", color: "#7bdff2", hint: "تحب الماء" }, { word: "برتقال", emoji: "🍊", color: "#ff9d4d", hint: "فاكهة برتقالية" }],
  ت: [{ word: "تفاحة", emoji: "🍎", color: "#ff6b6b", hint: "فاكهة حمراء" }, { word: "تمساح", emoji: "🐊", color: "#7bd88f", hint: "يعيش قرب الماء" }],
  ج: [{ word: "جمل", emoji: "🐪", color: "#e4b56a", hint: "سفينة الصحراء" }, { word: "جزر", emoji: "🥕", color: "#ff934f", hint: "يحبها الأرنب" }],
  ح: [{ word: "حصان", emoji: "🐴", color: "#9d8cff", hint: "يجري بسرعة" }, { word: "حوت", emoji: "🐋", color: "#6fc5ff", hint: "كبير ويعيش في البحر" }],
  خ: [{ word: "خروف", emoji: "🐑", color: "#e8e7ff", hint: "صوته مِـ..." }],
  د: [{ word: "دب", emoji: "🐻", color: "#c78b68", hint: "يحب العسل" }, { word: "دولفين", emoji: "🐬", color: "#73d4e8", hint: "ذكي في البحر" }],
  ذ: [{ word: "ذرة", emoji: "🌽", color: "#ffd166", hint: "حبات صفراء" }],
  ر: [{ word: "روبوت", emoji: "🤖", color: "#95a5ff", hint: "صديق ذكي" }, { word: "رمان", emoji: "🍎", color: "#e85572", hint: "حبات حمراء" }],
  س: [{ word: "سمكة", emoji: "🐟", color: "#65cfff", hint: "تسبح في الماء" }, { word: "سيارة", emoji: "🚗", color: "#ff7171", hint: "تسير على الطريق" }],
  ش: [{ word: "شمس", emoji: "☀️", color: "#ffd166", hint: "تضيء النهار" }, { word: "شجرة", emoji: "🌳", color: "#69c779", hint: "لها أوراق" }],
  ص: [{ word: "صقر", emoji: "🦅", color: "#a68b72", hint: "طائر قوي" }],
  ع: [{ word: "عنب", emoji: "🍇", color: "#a77aff", hint: "حبات صغيرة" }, { word: "عصفور", emoji: "🐦", color: "#87d7ff", hint: "يطير في السماء" }],
  ف: [{ word: "فراشة", emoji: "🦋", color: "#ff91c8", hint: "أجنحتها جميلة" }, { word: "فيل", emoji: "🐘", color: "#a6b4c5", hint: "حيوان ضخم" }],
  ق: [{ word: "قمر", emoji: "🌙", color: "#c4c8ff", hint: "يظهر في الليل" }, { word: "قطة", emoji: "🐱", color: "#ffb0a5", hint: "تحب المواء" }],
  ك: [{ word: "كتاب", emoji: "📚", color: "#8ed9d2", hint: "نقرأه" }, { word: "كلب", emoji: "🐶", color: "#e5b176", hint: "صديق وفي" }],
  ل: [{ word: "ليمون", emoji: "🍋", color: "#e5df63", hint: "طعم حامض" }, { word: "لؤلؤة", emoji: "🦪", color: "#d3c7ff", hint: "تلمع" }],
  م: [{ word: "موز", emoji: "🍌", color: "#ffe06c", hint: "فاكهة صفراء" }, { word: "مطر", emoji: "🌧️", color: "#89c7ff", hint: "ينزل من السماء" }],
  ن: [{ word: "نحلة", emoji: "🐝", color: "#ffd34e", hint: "تصنع العسل" }, { word: "نجمة", emoji: "⭐", color: "#ffd166", hint: "تلمع في السماء" }],
  ه: [{ word: "هلال", emoji: "🌙", color: "#d5d8ff", hint: "شكل القمر" }, { word: "هدية", emoji: "🎁", color: "#ff8fa3", hint: "نفرح بها" }],
  و: [{ word: "وردة", emoji: "🌹", color: "#ff819d", hint: "رائحتها جميلة" }, { word: "وحيد القرن", emoji: "🦄", color: "#d8a1ff", hint: "حيوان خيالي" }],
  ي: [{ word: "يد", emoji: "🖐️", color: "#ffc4a5", hint: "نكتب بها" }, { word: "يمامة", emoji: "🕊️", color: "#d9e8ff", hint: "طائر أبيض" }],
};
const keyboardRows = [["ا", "ب", "ت", "ث", "ج", "ح", "خ"], ["د", "ذ", "ر", "ز", "س", "ش", "ص"], ["ض", "ط", "ظ", "ع", "غ", "ف", "ق"], ["ك", "ل", "م", "ن", "ه", "و", "ي"]];

const normalizeArabic = (value: string) => value.trim().toLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/ؤ/g, "و").replace(/ئ/g, "ي");

function shuffle<T>(items: T[]) { return [...items].sort(() => Math.random() - 0.5); }

export default function Home() {
  const [stage, setStage] = useState<"welcome" | "game">("welcome");
  const [name, setName] = useState("");
  const [currentLetter, setCurrentLetter] = useState("م");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "success">("idle");
  const [earnedWord, setEarnedWord] = useState<WordCard | null>(null);
  const [balloons, setBalloons] = useState<string[]>([]);

  const currentWords = useMemo(() => words[currentLetter] ?? [{ word: `${currentLetter}ـ...`, emoji: "✨", color: "#73e0db", hint: "أي كلمة تبدأ بهذا الحرف" }], [currentLetter]);

  const startGame = () => {
    const cleanName = name.trim();
    if (cleanName.length < 2) { toast.error("اكتب اسمك الجميل أولًا"); return; }
    setName(cleanName); setStage("game"); setFeedback("idle");
  };

  const nextRound = () => {
    const pool = letters.filter((letter) => letter !== currentLetter);
    setCurrentLetter(pool[Math.floor(Math.random() * pool.length)]);
    setRound((value) => value + 1); setAnswer(""); setFeedback("idle"); setEarnedWord(null); setBalloons([]);
  };

  const checkAnswer = () => {
    const clean = normalizeArabic(answer);
    if (!clean) { toast.error("اكتب كلمة أولًا يا بطل"); return; }
    const expected = currentWords.find((item) => normalizeArabic(item.word).startsWith(clean) || normalizeArabic(item.word) === clean);
    const isCorrect = clean.startsWith(normalizeArabic(currentLetter)) && clean.length >= 2;
    if (isCorrect) {
      const reward = expected ?? { word: answer.trim(), emoji: "🎉", color: "#73e0db", hint: "كلمة رائعة من اختيارك" };
      setEarnedWord(reward); setFeedback("success"); setScore((value) => value + 10); setBalloons(["🎈", "🎈", "🎈", "🎈", "🎈", "🎈"]);
      toast.success("أحسنت! إجابة صحيحة ✨");
    } else {
      setFeedback("wrong"); toast("اقتربت! جرّب كلمة تبدأ بحرف " + currentLetter, { icon: "💡" });
    }
  };

  const speak = () => { if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(`اكتب كلمة تبدأ بحرف ${currentLetter}`)); };
  const addKey = (key: string) => { setAnswer((value) => value + key); setFeedback("idle"); };

  if (stage === "welcome") return (
    <main className="game-shell welcome-shell" dir="rtl">
      <div className="sky-glow" /><div className="stars-field">✦　·　✧　　✦　·　✧　·　✦</div>
      <section className="welcome-card glass-card">
        <div className="brand-pill"><span className="brand-dot">✎</span><span>حُروفي</span><small>لعبة الكتابة الذكية</small></div>
        <div className="welcome-art"><img src="/manus-storage/arabic-letter-game-mascot_5fc9c4e4.png" alt="بومة حروفي المرحة" /></div>
        <p className="eyebrow"><Sparkles size={16} /> مغامرة الحروف تبدأ الآن</p>
        <h1>أهلًا يا بطل!<br /><span>ما اسمك الجميل؟</span></h1>
        <p className="welcome-copy">اكتب اسمك، ثم ساعدني في جمع نجوم الكلمات العربية.</p>
        <div className="name-field"><span>✦</span><input autoFocus value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && startGame()} placeholder="اكتب اسمك هنا..." aria-label="اسم الطفل" /><span className="field-spark">✧</span></div>
        <button className="primary-button" onClick={startGame}>هيا نلعب <ArrowLeft size={20} /></button>
        <div className="welcome-footer"><span><Heart size={15} fill="currentColor" /> تعلم بالمرح</span><span>⭐ 26 حرفًا</span><span>🎈 جوائز جميلة</span></div>
      </section>
      <div className="floating-balloon balloon-a">🎈</div><div className="floating-balloon balloon-b">🎈</div><div className="floating-star">⭐</div>
    </main>
  );

  return (
    <main className="game-shell game-shell-active" dir="rtl">
      <div className="game-backdrop" />
      <header className="game-topbar"><div className="mini-brand"><span>✎</span><strong>حُروفي</strong><small>مغامرة الكلمات</small></div><div className="progress-wrap"><div className="progress-label"><span>الجولة {round}</span><b>{score} نقطة</b></div><div className="progress-track"><span style={{ width: `${Math.min(100, ((round - 1) % 10) * 10 + 10)}%` }} /></div></div><button className="sound-button" onClick={speak} aria-label="استمع للتعليمات"><Volume2 size={20} /></button></header>
      <section className="game-layout">
        <aside className="mascot-side"><div className="speech-bubble">هيا يا <b>{name}</b>!<br />أرني كلمة جميلة ✨</div><img src="/manus-storage/arabic-letter-game-mascot_5fc9c4e4.png" alt="بومة تساعد الطفل" /><div className="side-stats"><span>⭐ {score}</span><span>🔥 {Math.max(0, round - 1)}</span></div></aside>
        <section className="play-panel glass-card">
          <div className="panel-heading"><div><span className="eyebrow"><Sparkles size={15} /> تحدي الحرف</span><h1>اكتب كلمة تبدأ بحرف...</h1></div><div className="round-stars"><Star fill="#ffd166" /><Star fill="#ffd166" /><Star /></div></div>
          <div className="letter-orb"><div className="orb-ring" /><strong>{currentLetter}</strong><small>حرف الجولة</small></div>
          <div className="answer-zone"><label htmlFor="answer">كلمتك الرائعة</label><div className={`answer-field ${feedback}`}><input id="answer" value={answer} onChange={(event) => { setAnswer(event.target.value); setFeedback("idle"); }} onKeyDown={(event) => event.key === "Enter" && checkAnswer()} placeholder={`اكتب كلمة بحرف ${currentLetter}...`} autoComplete="off" /><button onClick={() => setAnswer("")} aria-label="مسح الكلمة"><RotateCcw size={18} /></button></div></div>
          <div className="virtual-keyboard">{keyboardRows.map((row, index) => <div className="key-row" key={index}>{row.map((key) => <button key={key} className={key === currentLetter ? "key current-key" : "key"} onClick={() => addKey(key)}>{key}</button>)}{index === keyboardRows.length - 1 && <button className="key delete-key" onClick={() => setAnswer((value) => value.slice(0, -1))}>⌫</button>}</div>)}</div>
          {feedback === "wrong" && <div className="feedback wrong"><span><X size={18} /></span><div><b>محاولة جميلة!</b><small>ابحث عن كلمة تبدأ بحرف {currentLetter} وحاول مرة أخرى.</small></div></div>}
          {feedback === "idle" && <p className="helper-text">يمكنك استخدام لوحة المفاتيح أو الأزرار الملونة 💛</p>}
          {feedback === "success" && earnedWord && <div className="success-card" style={{ background: `linear-gradient(135deg, ${earnedWord.color}, #fff6e8)` }}><div className="confetti-layer">{balloons.map((balloon, index) => <span key={index} style={{ "--i": index } as CSSProperties}>{balloon}</span>)}</div><div className="word-emoji">{earnedWord.emoji}</div><div><span>يا سلام يا {name}!</span><b>{earnedWord.word}</b><small>{earnedWord.hint}</small></div><div className="check-badge"><Check size={22} /></div></div>}
          {feedback !== "success" ? <button className="check-button" onClick={checkAnswer}>تحقق من إجابتي <Check size={20} /></button> : <button className="next-button" onClick={nextRound}>الحرف التالي <ArrowLeft size={20} /></button>}
        </section>
      </section>
      <footer className="game-footer"><span><PartyPopper size={16} /> كل إجابة صحيحة = نجمة جديدة</span><span>أنت بطل الحروف يا {name}!</span></footer>
    </main>
  );
}
