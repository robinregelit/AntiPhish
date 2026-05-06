/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  MousePointer2, 
  Terminal, 
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  RefreshCw,
  Server,
  User,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  Mail,
  Flag,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Module = 'home' | 'visualizer' | 'analyzer' | 'hardening' | 'response';

const MODULE_ORDER: Module[] = ['home', 'visualizer', 'analyzer', 'hardening', 'response'];

const MODULE_TITLES: Record<Module, string> = {
  home: 'Beginpagina',
  visualizer: 'Hoe ze inbreken',
  analyzer: 'Mail Analyse',
  hardening: 'Beveiligingstips',
  response: 'Noodplan'
};

// --- UI Components ---
const SectionHeader = ({ title, description, icon: Icon, accent = "text-brand-primary" }: { title: string, description: string, icon: any, accent?: string }) => (
  <div className="mb-10 text-center md:text-left">
    <div className="inline-flex items-center gap-3 mb-4 p-2 pl-4 pr-6 bg-white rounded-full shadow-sm border border-slate-100">
      <Icon className={`w-5 h-5 ${accent}`} />
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Anti-Phishing Lab</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">{title}</h2>
    <p className="text-lg text-slate-600 max-w-2xl">{description}</p>
  </div>
);

const Card = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div {...props} className={`bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const ModuleNavigation = ({ current, onNavigate }: { current: Module, onNavigate: (m: Module) => void }) => {
  const currentIndex = MODULE_ORDER.indexOf(current);
  const prev = currentIndex > 0 ? MODULE_ORDER[currentIndex - 1] : null;
  const next = currentIndex < MODULE_ORDER.length - 1 ? MODULE_ORDER[currentIndex + 1] : null;

  if (current === 'home') return null;

  return (
    <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="w-full sm:w-auto">
        {prev && (
          <button 
            onClick={() => onNavigate(prev)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Vorige stap</p>
              <p>{MODULE_TITLES[prev]}</p>
            </div>
          </button>
        )}
      </div>

      <div className="w-full sm:w-auto">
        {next ? (
          <button 
            onClick={() => onNavigate(next)}
            className="w-full sm:w-auto flex items-center justify-center gap-6 px-10 py-5 bg-brand-primary text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-brand-secondary transition-all group hover:-translate-y-1"
          >
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-blue-200 font-bold">Volgende stap</p>
              <p>{MODULE_TITLES[next]}</p>
            </div>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button 
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Mijn training afronden
          </button>
        )}
      </div>
    </div>
  );
};

// --- Modules ---

/**
 * Hoe de 'Tussenman'-aanval werkt (Visualizer)
 */
const AttackVisualizer = () => {
  return (
    <div className="space-y-12">
      <SectionHeader 
        title="Hoe je account wordt gekaapt" 
        description="Zelfs met een extra beveiligingscode op je telefoon kunnen hackers inbreken. Ontdek hier hoe ze 'de sleutel' stelen."
        icon={RefreshCw}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center bg-white p-10 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 z-0" />

        {/* Gebruiker */}
        <div className="flex flex-col items-center gap-6 z-10">
          <div className="relative">
            <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center border border-slate-200 shadow-inner">
              <User className="w-12 h-12 text-slate-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm" />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-900 text-lg">Jij (De Gebruiker)</p>
            <p className="text-sm text-slate-500">Logt in via een link</p>
          </div>
        </div>

        {/* De 'Tussenman' */}
        <div className="relative flex flex-col items-center justify-center py-10 z-10">
          <div className="w-full h-1 bg-slate-100 absolute top-1/2 -translate-y-1/2 z-0 hidden lg:block" />
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="z-10 bg-red-50 border-2 border-red-200 p-6 rounded-3xl flex flex-col items-center gap-3 shadow-lg shadow-red-500/10"
          >
            <div className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-500/20">
              <RefreshCw className="w-8 h-8 text-white animate-spin-slow" />
            </div>
            <div className="text-center">
              <p className="font-bold text-red-600 uppercase tracking-tighter text-sm">De Tussenman</p>
              <p className="text-[10px] text-red-400 font-bold leading-tight mt-1">
                Kopieert alles door<br/>(Wachtwoord + MFA)
              </p>
            </div>
          </motion.div>
        </div>

        {/* Microsoft */}
        <div className="flex flex-col items-center gap-6 z-10">
          <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center border border-blue-100 shadow-sm text-brand-primary">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-900 text-lg">Echte Microsoft</p>
            <p className="text-sm text-slate-500">Geeft de digitale sleutel uit</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-brand-primary" />
            De 'Smart Phish' truc
          </h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Zodra je je e-mailadres invult op de nepsite, haalt de hacker razendsnel <strong>ons bedrijfslogo</strong> en onze achtergrond op bij Microsoft. Hierdoor lijkt de pagina opeens weer vertrouwd.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
               <AlertCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
               <p className="text-sm text-slate-700"><strong>Pas op:</strong> De hacker kopieert zelfs het getal dat je op je telefoon moet invullen. Je ziet een nummer op je scherm, typt het in op je mobiel, en de hacker is binnen.</p>
            </div>
            <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <Zap className="w-5 h-5 text-brand-primary flex-shrink-0" />
               <p className="text-sm text-slate-700">Met de gestolen digitale sleutel (token) kan de hacker nu dagenlang bij je mail zonder ooit nog je wachtwoord of MFA nodig te hebben.</p>
            </div>
          </div>
        </Card>

        <div className="p-8 bg-brand-primary text-white rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-white" />
            De onzichtbare weggevers
          </h3>
          <p className="text-blue-50 leading-relaxed mb-6 italic">
            "Zonder onze persoonlijke welkomsttekst of als de taal opeens Engels is, is het NOOIT de echte inlogpagina van ons bedrijf."
          </p>
          <div className="p-4 bg-white/20 rounded-xl backdrop-blur-md">
            <p className="text-sm font-bold">IT-Checklist bij inloggen:</p>
            <ul className="text-xs space-y-2 mt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-300" /> Is de taal Nederlands?</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-300" /> Zie je onze eigen welkomsttekst?</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-300" /> Start de URL met 'login.microsoftonline.com'?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Mail Analyse Lab
 */
const EmailAnalyzer = () => {
  const [revealed, setRevealed] = useState<string[]>([]);
  
  const markers = [
    { id: 'sender', label: 'E-mail is 100% echt', detail: 'De afzender is echt "no-reply@sharepointonline.com". Dit komt omdat de hacker écht in het account van Gertjan zit en vanuit daar een bestand deelt via OneDrive.' },
    { id: 'context', label: 'Waarom zo geheimzinnig?', detail: 'De tekst in de mail is kort en vreemd. "Hoi, bekijk dit even." Waarom doet Gertjan zo geheimzinnig? Normaal zou hij je meer informatie geven bij een gedeeld bestand.' },
    { id: 'trust', label: 'De SharePoint val', detail: 'De link hieronder gaat naar de échte SharePoint site. De truc zit hem in wat er gebeurt NADAT je geklikt hebt: in het document word je naar de nepsite gelokt.' }
  ];

  return (
    <div className="space-y-12">
      <SectionHeader 
        title="Wanneer een 'echte' mail toch fout is" 
        description="Vaak is de mail zelf 100% echt omdat een collega al gehackt is. Leer de onzichtbare signalen herkennen."
        icon={MousePointer2}
      />

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-3xl mx-auto border border-slate-200">
        <div className="bg-slate-100 px-8 py-4 border-b border-slate-200 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">MS</div>
             <div>
               <p className="font-bold text-slate-800 leading-none">Microsoft SharePoint</p>
               <p className="text-xs text-slate-400 mt-1">no-reply@sharepointonline.com</p>
             </div>
           </div>
           <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] uppercase bg-emerald-50 py-1 px-3 rounded-full border border-emerald-100">
             <CheckCircle2 className="w-3 h-3" /> Officieel Microsoft Adres
           </div>
        </div>

        <div className="p-16 text-center space-y-10">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-widest">Gedeeld via SharePoint Online</div>
            <h1 className="text-2xl font-bold text-slate-900">Gertjan heeft een bestand met u gedeeld</h1>
            <p className="text-slate-500 text-lg">"Hoi, bekijk dit document even. Het is erg belangrijk voor ons project."</p>
          </div>

          <div className="py-12 relative group cursor-pointer" onClick={() => !revealed.includes('trust') && setRevealed([...revealed, 'trust'])}>
            <div className="bg-brand-primary inline-flex items-center gap-3 px-12 py-4 rounded-xl text-white font-bold shadow-lg shadow-blue-500/25 hover:bg-brand-secondary transition-all">
              Document openen op SharePoint
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
              <div className="bg-slate-900 text-white text-[10px] font-mono px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                 https://uwbedrijf-my.sharepoint.com/:b:/g/personal/gertjan_...
              </div>
            </div>
            
            <AnimatePresence>
              {revealed.includes('trust') && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  className="mt-6 p-6 bg-amber-50 border-l-4 border-brand-accent text-left rounded-r-xl"
                >
                  <p className="text-xs font-bold text-brand-accent mb-1">DIT IS DE TRUC</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    De mail is echt, de link naar SharePoint is echt... maar in het document staat een melding: <strong>"Verifieer uw identiteit om dit bestand te lezen"</strong> met een knop naar de <strong>nep-inlogpagina</strong>. Omdat de eerste stappen echt waren, vertrouw je de rest sneller.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-12 border-t border-slate-100 italic text-slate-400 text-xs">
            "Waarom doet Gertjan zo geheimzinnig? Bel hem simpelweg even op."
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {markers.map((m) => (
          <button 
            key={m.id}
            onClick={() => setRevealed(prev => prev.includes(m.id) ? prev.filter(i => i !== m.id) : [...prev, m.id])}
            className={`p-6 rounded-2xl text-left transition-all border group ${
              revealed.includes(m.id) 
                ? 'bg-white border-brand-primary ring-2 ring-brand-primary/10 shadow-lg' 
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${revealed.includes(m.id) ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                {m.id === 'sender' ? <ShieldCheck className="w-5 h-5" /> : m.id === 'context' ? <Flag className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
              </div>
              {revealed.includes(m.id) && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </div>
            <h4 className={`font-bold mb-2 ${revealed.includes(m.id) ? 'text-brand-primary' : 'text-slate-900 group-hover:text-brand-primary'}`}>
              {m.label}
            </h4>
            {revealed.includes(m.id) && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-slate-600 leading-relaxed">
                {m.detail}
              </motion.p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Beschermingstips (Hardening)
 */
const ProtectionModule = () => {
  const steps = [
    {
      title: "Zoek naar de Welkomsttekst",
      desc: "Zie je bij het inloggen onze vertrouwde achtergrond wel, maar ontbreekt onze persoonlijke welkomsttekst? Dan zit je op een nep-site die ons logo kopieert.",
      icon: Flag,
      color: "blue"
    },
    {
      title: "Check de Taal",
      desc: "Onze inlogpagina's zijn in het Nederlands. Is alles plotseling in het Engels? Voer dan NOOIT je wachtwoord in, zelfs niet als het logo klopt.",
      icon: MousePointer2,
      color: "orange"
    },
    {
      title: "MFA is geen wondermiddel",
      desc: "Een hacker kan je MFA-sessie kapen terwijl je hem accepteert. Accepteer alleen meldingen op je telefoon als je op dat exacte moment zelf een inlogpoging bent gestart.",
      icon: ShieldAlert,
      color: "red"
    }
  ];

  return (
    <div className="space-y-12">
      <SectionHeader 
        title="Jouw account extra beveiligen" 
        description="Als IT-team regelen wij de achtergrond, maar jij bent de belangrijkste bewaker van je account."
        icon={Lock}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s, idx) => (
          <Card key={idx} className="p-8 group hover:shadow-xl transition-all border-slate-200 hover:border-brand-primary/20">
            <div className={`p-4 rounded-2xl mb-6 inline-block ${
              s.color === 'blue' ? 'bg-blue-50 text-blue-600' : s.color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
            }`}>
              <s.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{s.title}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{s.desc}</p>
          </Card>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-10 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary opacity-20 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-brand-primary rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Wist je dat?</h3>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
            Passkeys (inloggen zonder wachtwoord) zijn de enige manier die 100% veilig is tegen phishing. 
            Omdat de inlogpoging direct verbonden is met je apparaat en de juiste website, kan een hacker dit niet kopiëren.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Dashboard / Home
 */
const Landing = ({ onModuleOpen }: { onModuleOpen: (m: Module) => void }) => {
  return (
    <div className="py-12 space-y-20">
      <div className="text-center space-y-8">
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 rounded-full border border-brand-primary/10 text-brand-primary text-sm font-bold"
        >
          <Shield className="w-4 h-4" />
          Security Bewustwording
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-950">
            Houd hackers <span className="text-brand-primary italic">buiten de deur</span>.
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Niemand wordt graag gehackt. Leer hoe moderne phishing werkt en hoe jij en je collega's veilig blijven in Office 365.
          </p>
        </div>

        <div className="max-w-xl mx-auto p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4 text-left">
           <AlertCircle className="w-6 h-6 text-brand-accent flex-shrink-0" />
           <p className="text-sm text-amber-800 leading-snug">
             <strong>Belangrijk:</strong> Onlangs is er een incident geweest waarbij mails vanuit ons eigen systeem leken te komen. Wees extra alert!
           </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button 
            onClick={() => onModuleOpen('visualizer')}
            className="px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-brand-secondary transition-all hover:-translate-y-1"
          >
            Start de gids
          </button>
          <button 
             onClick={() => onModuleOpen('response')}
             className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all"
          >
             Hulp bij incidenten
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: 'visualizer', title: 'Hoe ze inbreken', desc: 'Zie hoe hackers je wachtwoord omzeilen.', icon: RefreshCw, color: 'text-blue-500' },
          { id: 'analyzer', title: 'Nep-mail herkennen', desc: 'Krijg een oog voor phishing-signalen.', icon: Mail, color: 'text-brand-accent' },
          { id: 'hardening', title: 'Account beveiligen', desc: 'Simpele stappen voor maximale veiligheid.', icon: Lock, color: 'text-emerald-500' },
          { id: 'response', title: 'Noodplan', desc: 'Wat te doen als het mis is gegaan.', icon: Zap, color: 'text-red-500' },
        ].map((m) => (
          <button 
            key={m.id} 
            onClick={() => onModuleOpen(m.id as Module)}
            className="group p-8 bg-white border border-slate-200 rounded-3xl text-left hover:border-brand-primary hover:shadow-2xl transition-all duration-300"
          >
            <div className={`p-4 rounded-2xl mb-6 bg-slate-50 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 ${m.color}`}>
              <m.icon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-950 mb-2">{m.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * App Shell
 */
export default function App() {
  const [activeModule, setActiveModule] = useState<Module>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Scroll to top whenever the module changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeModule]);

  const renderModule = () => {
    let content;
    switch (activeModule) {
      case 'visualizer': content = <AttackVisualizer />; break;
      case 'analyzer': content = <EmailAnalyzer />; break;
      case 'hardening': content = <ProtectionModule />; break;
      case 'response':
        content = (
          <div className="space-y-12">
             <SectionHeader 
              title="Eerste hulp bij gehackt account" 
              description="Geen paniek. Volg deze stappen direct om de schade te beperken voor jezelf en het bedrijf."
              icon={Zap}
              accent="text-red-500"
            />
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-red-50 border border-red-100 p-10 rounded-3xl relative overflow-hidden shadow-sm">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                   <ShieldAlert className="w-24 h-24 text-red-500" />
                 </div>
                 <h3 className="text-2xl font-bold text-red-600 mb-8 flex items-center gap-3">
                   <AlertCircle className="w-8 h-8" />
                   Mijn account is overgenomen, wat nu?
                 </h3>
                 <div className="space-y-8">
                   <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center font-bold flex-shrink-0 shadow-lg shadow-red-500/20">1</div>
                     <div>
                       <p className="text-xl font-bold text-slate-900 mb-2">Bel direct de IT-afdeling</p>
                       <p className="text-slate-600">Alleen zij kunnen je sessie direct verbreken. Wacht niet tot de volgende ochtend.</p>
                     </div>
                   </div>
                   <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 bg-red-200 text-red-600 rounded-2xl flex items-center justify-center font-bold flex-shrink-0">2</div>
                     <div>
                       <p className="text-xl font-bold text-slate-900 mb-2">Sessies laten verbreken</p>
                       <p className="text-slate-600">De IT-manager moet alle actieve inlog-sessies 'revoken'. Een nieuw wachtwoord alleen is NIET genoeg om de hacker eruit te gooien!</p>
                     </div>
                   </div>
                   <div className="flex gap-6 items-start">
                     <div className="w-12 h-12 bg-red-200 text-red-600 rounded-2xl flex items-center justify-center font-bold flex-shrink-0">3</div>
                     <div>
                       <p className="text-xl font-bold text-slate-900 mb-2">Wachtwoord wijzigen</p>
                       <p className="text-slate-600">Zodra de sessies zijn verbroken, kies je een nieuw, sterk wachtwoord (liefst een wachtzin).</p>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        );
        break;
      default: content = <Landing onModuleOpen={setActiveModule} />; break;
    }

    return (
      <>
        {content}
        <ModuleNavigation current={activeModule} onNavigate={setActiveModule} />
      </>
    );
  };

  const BrandLogo = () => (
    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveModule('home')}>
      <div className="relative">
        <div className="absolute -inset-1 bg-brand-primary/20 blur rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white border border-slate-200 p-2 rounded-xl shadow-sm">
          <Shield className="w-6 h-6 text-brand-primary" fill="currentColor" />
        </div>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-xl font-black text-slate-950 tracking-tighter">Regel<span className="text-brand-primary italic">IT</span></span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Veiligheid</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-primary/20">
      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40"
            />
            <motion.aside 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white shadow-2xl z-50 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <BrandLogo />
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2 flex-grow">
                {[
                  { id: 'home', label: 'Overzicht', icon: Shield },
                  { id: 'visualizer', label: 'Hoe ze inbreken', icon: RefreshCw },
                  { id: 'analyzer', label: 'Mail Analyse', icon: Mail },
                  { id: 'hardening', label: 'Beveiligingstips', icon: Lock },
                  { id: 'response', label: 'Noodplan', icon: Zap },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveModule(item.id as Module); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold ${
                      activeModule === item.id 
                      ? 'bg-brand-primary text-white shadow-xl shadow-blue-500/25 translate-x-2' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="pt-8 border-t border-slate-100">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Contact IT Support</p>
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-slate-900 font-bold mb-1">Hulp nodig?</p>
                    <p className="text-xs text-slate-500 leading-relaxed">Bel bij twijfel altijd direct de IT-beheerder.</p>
                 </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Primary Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <header className="py-8 flex items-center justify-between border-b border-slate-200 mb-12">
           <div className="flex items-center gap-6">
             <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-brand-primary transition-colors cursor-pointer"
             >
               <Menu className="w-6 h-6 text-slate-600" />
             </button>
             <BrandLogo />
           </div>

           <div className="flex items-center gap-4">
             <div className="hidden lg:block text-right">
                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">Onderhoudsstatus</p>
                <p className="text-xs font-bold text-slate-950 flex items-center justify-end gap-2">
                  Alle systemen online <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                </p>
             </div>
             <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                <User className="w-6 h-6 text-slate-400" />
             </div>
           </div>
        </header>

        {/* Content Area */}
        <main className="pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer bar */}
      <footer className="bg-slate-900 py-16 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-brand-primary" />
              <span className="font-black text-2xl uppercase tracking-tight">REGELIT</span>
            </div>
            <p className="text-slate-400 max-w-xs leading-relaxed">
              Wij regelen jouw IT, zodat jij gefocust kunt blijven op wat écht telt. Samen maken we België veiliger.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Navigatie</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><button onClick={() => setActiveModule('home')} className="hover:text-white transition-colors">Beginpagina</button></li>
              <li><button onClick={() => setActiveModule('analyzer')} className="hover:text-white transition-colors">Phishing Test</button></li>
              <li><button onClick={() => setActiveModule('hardening')} className="hover:text-white transition-colors">Veiligheidstips</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Hulp Nodig?</h4>
            <p className="text-slate-400 text-sm mb-6">Heb je iets verdachts gezien of twijfel je over een e-mail?</p>
            <a href="mailto:support@regelit.be" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all text-sm font-bold">
               Neem contact op
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-16 mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">
          <span>&copy; 2026 RegelIT. Alle rechten voorbehouden.</span>
          <span>Phishing preventie gids voor kmo's</span>
        </div>
        
        {/* Subtle decorative glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-brand-primary opacity-5 blur-3xl rounded-full" />
      </footer>
    </div>
  );
}
