import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Check, 
  Target, 
  ShieldCheck, 
  Heart, 
  Brain, 
  Dumbbell, 
  Briefcase, 
  Moon, 
  Clock, 
  Stethoscope, 
  Baby,
  Smile,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Instagram,
  Lock,
  Star,
  Users,
  Bell,
  MoreHorizontal
} from 'lucide-react';

// --- Types ---

type ScreenType = 
  | 'intro'
  | 'q_first_pregnancy'
  | 'q_previous_physio'
  | 'interstitial_1'
  | 'q_birth_choice'
  | 'q_exercise_before'
  | 'q_preparation'
  | 'q_routine'
  | 'q_libido'
  | 'q_sleep'
  | 'q_rest'
  | 'q_goal'
  | 'q_weeks'
  | 'q_age_input'
  | 'analyzing_85'
  | 'result_warning'
  | 'result_plan'
  | 'testimonials'
  | 'offer'
  | 'testimonials_grid'
  | 'offer_final';

interface QuizState {
  ageRange: string;
  isFirstPregnancy: boolean | null;
  hadPreviousPhysio: boolean | null;
  birthChoice: string;
  exerciseBefore: string;
  wantsPreparation: string;
  workRoutine: string;
  libidoLevel: string;
  sleepQuality: string;
  medicalRest: string;
  goal: string[];
  weeks: string;
  age: string;
  minutes: string;
}

// --- Components ---

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full p-4 bg-white z-50 border-b border-slate-50">
    <div className="max-w-md mx-auto">
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-green-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  </div>
);

const Header = ({ 
  title, 
  subtitle, 
  highlightedTitle, 
  title2, 
  highlightColor = 'text-green-700' 
}: { 
  title: string, 
  subtitle?: React.ReactNode, 
  highlightedTitle?: string, 
  title2?: string, 
  highlightColor?: string 
}) => (
  <div className="text-center mb-2 pt-0">
    <h1 className="text-3xl font-bold font-display leading-tight px-4 text-slate-950">
      {title} <span className={highlightColor}>{highlightedTitle}</span> {title2}
    </h1>
    {subtitle && <div className="text-slate-800 mt-2 font-medium text-[15px] px-6 leading-relaxed">{subtitle}</div>}
  </div>
);

const OptionCard = ({ 
  label, 
  icon, 
  emoji, 
  selected, 
  onClick, 
  showArrow = true,
  variant = 'default'
}: { 
  label: string, 
  icon?: any, 
  emoji?: string, 
  selected?: boolean, 
  onClick: () => void,
  showArrow?: boolean,
  variant?: 'default' | 'solid-green',
  key?: string
}) => (
  <div 
    onClick={onClick}
    className={`mb-3 transition-all cursor-pointer ${
      variant === 'solid-green' 
        ? 'bg-green-700 text-white rounded-3xl p-5 flex items-center shadow-lg active:scale-98' 
        : `card-option ${selected ? 'selected' : ''}`
    }`}
  >
    {variant === 'default' && (
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600">
        {emoji ? <span className="text-2xl">{emoji}</span> : icon}
      </div>
    )}
    <span className={`flex-1 font-bold ${variant === 'solid-green' ? 'text-[16px] ml-1' : 'text-[15px] font-medium'}`}>
      {label}
    </span>
    {showArrow && (
      <ChevronRight className={`w-5 h-5 ${variant === 'solid-green' ? 'text-white opacity-60' : 'text-slate-300'}`} />
    )}
  </div>
);

const MultiOptionCard = ({ 
  label, 
  emoji,
  selected, 
  onClick 
}: { 
  label: string, 
  emoji?: string,
  selected: boolean, 
  onClick: () => void,
  key?: string
}) => (
  <div 
    onClick={onClick}
    className={`card-option mb-3 ${selected ? 'selected' : ''}`}
  >
    {emoji && <span className="text-xl mr-1">{emoji}</span>}
    <span className="flex-1 font-medium text-[15px]">{label}</span>
    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${selected ? 'bg-green-600 border-green-600' : 'border-slate-200 bg-white'}`}>
      {selected && <Check className="w-4 h-4 text-white" />}
    </div>
  </div>
);

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('intro');
  const [state, setState] = useState<QuizState>({
    ageRange: '',
    isFirstPregnancy: null,
    hadPreviousPhysio: null,
    birthChoice: '',
    exerciseBefore: '',
    wantsPreparation: '',
    workRoutine: '',
    libidoLevel: '',
    sleepQuality: '',
    medicalRest: '',
    goal: [],
    weeks: '',
    age: '',
    minutes: ''
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  const nextStep = (next: ScreenType) => {
    setScreen(next);
  };

  const calculateProgress = () => {
    const screens: ScreenType[] = [
      'intro', 'q_first_pregnancy', 'q_previous_physio', 'q_birth_choice', 
      'q_exercise_before', 
      'q_preparation', 'q_routine', 'q_libido', 'q_sleep', 
      'q_rest', 'q_goal', 'q_weeks', 'q_age_input'
    ];
    const index = screens.indexOf(screen);
    if (index === -1) return 100;
    return Math.round((index / screens.length) * 100);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'intro':
        return (
          <div className="px-4 pb-4">
            <Header 
              title="Fisio Pélvica para facilitar o parto:"
              highlightedTitle="Você vai receber um Plano de fisio pélvica para ter um parto mais fácil."
              subtitle="(Selecione sua idade abaixo para começar a gerar seu plano)"
            />
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '18-24 anos', img: 'https://i.ibb.co/tGvJJNq/imagem-01.png' },
                { label: '25-28 anos', img: 'https://i.ibb.co/gMvWWCXZ/Imagem-02.png' },
                { label: '29-35 anos', img: 'https://i.ibb.co/67BGHn30/Imagem-03.png' },
                { label: '+36 anos', img: 'https://i.ibb.co/kgfjj9JD/Imagem-04.png' },
              ].map((age, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setState({...state, ageRange: age.label});
                    nextStep('q_first_pregnancy');
                  }}
                  className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer group shadow-sm hover:shadow-md transition-shadow"
                >
                  <img src={age.img} alt={age.label} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-bold text-sm">
                    {age.label}
                    <div className="bg-green-600 rounded-lg p-1">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-slate-50 p-4 rounded-xl flex items-center gap-3 border border-slate-100">
              <Clock className="w-5 h-5 text-slate-400" />
              <p className="text-[12px] text-slate-500">Tempo médio para ficar pronto: 38 segundos</p>
            </div>
          </div>
        );

      case 'q_first_pregnancy':
        return (
          <div className="px-4">
            <Header title="Essa é sua primeira gestação?" subtitle="Selecione uma opção abaixo para avançar" />
            <OptionCard variant="solid-green" label="Sim, é minha primeira gestação" onClick={() => nextStep('q_previous_physio')} />
            <OptionCard variant="solid-green" label="Já tive outra gestação" onClick={() => nextStep('q_previous_physio')} />
          </div>
        );

      case 'q_previous_physio':
        return (
          <div className="px-4">
            <Header title="Você já fez Fisioterapia Pélvica antes?" subtitle="Selecione uma opção abaixo para avançar" />
            <OptionCard variant="solid-green" label="Sim, já fiz" onClick={() => nextStep('interstitial_1')} />
            <OptionCard variant="solid-green" label="Não, nunca fiz" onClick={() => nextStep('interstitial_1')} />
          </div>
        );

      case 'interstitial_1':
        return (
          <div className="px-4 text-center">
            <Header 
              title="A Fisioterapia Pélvica tem"
              highlightedTitle="exercícios que realmente funcionam"
              title2="para facilitar o parto."
              highlightColor="text-red-600"
              subtitle={
                <>
                  <p className="mb-2">Vamos criar um plano de exercícios para você <span className="underline font-bold">PRATICAR EM CASA!</span></p>
                  <p className="text-[14px] font-normal leading-relaxed opacity-90">Continue preenchendo para gerar seu plano de exercícios seguros que realmente funcionam para ter um parto mais fácil.</p>
                </>
              }
            />
            <div className="max-w-[320px] mx-auto mb-6">
              <img src="https://i.ibb.co/N6jH7sfd/Gemini-Generated-Image-4zg9d24zg9d24zg9.png" className="w-full h-auto rounded-3xl" alt="Exercício" referrerPolicy="no-referrer" />
            </div>
            <button onClick={() => nextStep('q_birth_choice')} className="btn-primary">Continuar</button>
          </div>
        );

      case 'q_birth_choice':
        return (
          <div className="px-4">
            <Header title="Se você pudesse escolher o seu parto, qual seria?" subtitle="Escolhe uma opção para avançar" />
            <OptionCard 
              label="Parto normal" 
              emoji="🤰" 
              selected={state.birthChoice === 'Parto normal'}
              onClick={() => {
                setState({...state, birthChoice: 'Parto normal'});
                nextStep('q_exercise_before');
              }} 
            />
            <OptionCard 
              label="Cesárea" 
              emoji="🙋‍♀️" 
              selected={state.birthChoice === 'Cesárea'}
              onClick={() => {
                setState({...state, birthChoice: 'Cesárea'});
                nextStep('q_exercise_before');
              }} 
            />
            <OptionCard 
              label="Não tenho preferência" 
              emoji="🤷‍♀️" 
              selected={state.birthChoice === 'Não tenho preferência'}
              onClick={() => {
                setState({...state, birthChoice: 'Não tenho preferência'});
                nextStep('q_exercise_before');
              }} 
            />
          </div>
        );

      case 'q_exercise_before':
        return (
          <div className="px-4">
            <Header title="Antes de engravidar você praticava exercício físico?" subtitle="Escolha uma opção para avançar" />
            <OptionCard label="Sim, 5 vezes na semana" emoji="💪" onClick={() => nextStep('q_preparation')} />
            <OptionCard label="Sim, 2 a 3 vezes na semana" emoji="🤷‍♀️" onClick={() => nextStep('q_preparation')} />
            <OptionCard label="Não praticava" emoji="👀" onClick={() => nextStep('q_preparation')} />
          </div>
        );

      case 'q_preparation':
        return (
          <div className="px-4">
            <Header title="Você quer preparar seu corpo para facilitar seu parto?" subtitle="Escolha uma opção para avançar" />
            <OptionCard label="É, só isso que quero" emoji="🔥" onClick={() => nextStep('q_routine')} />
            <OptionCard label="Sim, gostaria de tentar" emoji="🤜" onClick={() => nextStep('q_routine')} />
            <OptionCard label="Esse não é meu maior objetivo" emoji="🎯" onClick={() => nextStep('q_routine')} />
          </div>
        );

      case 'q_routine':
        return (
          <div className="px-4">
            <Header title="Como é sua rotina de trabalho?" subtitle="Escolha uma opção para avançar" />
            <OptionCard label="Trabalho durante o dia" emoji="🌞" onClick={() => nextStep('q_libido')} />
            <OptionCard label="Trabalho durante a noite" emoji="🌚" onClick={() => nextStep('q_libido')} />
            <OptionCard label="Tenho horário flexível" emoji="🕰️" onClick={() => nextStep('q_libido')} />
          </div>
        );

      case 'q_libido':
        return (
          <div className="px-4">
            <Header title="Seu libido caiu na gestação?" subtitle="Escolha uma opção para avançar" />
            <OptionCard label="Caiu muito..." emoji="😔" onClick={() => nextStep('q_sleep')} />
            <OptionCard label="Aumentou, estou subindo pelas paredes" emoji="🥵" onClick={() => nextStep('q_sleep')} />
            <OptionCard label="Continua igual antes" emoji="🤷‍♀️" onClick={() => nextStep('q_sleep')} />
          </div>
        );

      case 'q_sleep':
        return (
          <div className="px-4">
            <Header title="Como é a qualidade do seu sono?" subtitle="Escolha uma ou mais opções para avançar" />
            <OptionCard label="Tenho dormido bem" emoji="😴" onClick={() => nextStep('q_rest')} />
            <OptionCard label="Tem dias que durmo bem, outros nem tanto." emoji="🤔" onClick={() => nextStep('q_rest')} />
            <OptionCard label="Está difícil arrumar posição para dormir" emoji="😫" onClick={() => nextStep('q_rest')} />
            <OptionCard label="Dormido pouco. Muita dificuldade para adormecer" emoji="😰" onClick={() => nextStep('q_rest')} />
          </div>
        );

      case 'q_rest':
        return (
          <div className="px-4">
            <Header title="Seu médico recomendou repouso atualmente?" subtitle="Escolha uma opção para avançar" />
            <OptionCard label="Não recomendou, minha gestação está saudável até agora" emoji="✅" onClick={() => nextStep('q_goal')} />
            <OptionCard label="Sim, me recomendou ficar de repouso, pois minha gravidez tem risco" emoji="🏥" onClick={() => nextStep('q_goal')} />
          </div>
        );

      case 'q_goal':
        return (
          <div className="px-4">
            <Header title="Qual é o seu principal objetivo" subtitle="Escolha uma ou mais opções para avançar" />
            {[
              { label: 'Quero me sentir confiante e preparada para o parto', emoji: '✨' },
              { label: 'Quero preparar meu corpo para o parto', emoji: '🤰' },
              { label: 'Quero ter um parto mais fácil', emoji: '🚀' },
              { label: 'Quero evitar machucados íntimos, como laceração e episiotomia', emoji: '🛡️' },
              { label: 'Outros', emoji: '➕' }
            ].map(opt => (
              <MultiOptionCard 
                key={opt.label} 
                label={opt.label} 
                emoji={opt.emoji}
                selected={state.goal.includes(opt.label)} 
                onClick={() => {
                  const newG = state.goal.includes(opt.label) ? state.goal.filter(g => g !== opt.label) : [...state.goal, opt.label];
                  setState({...state, goal: newG});
                }} 
              />
            ))}
            <button 
              disabled={state.goal.length === 0}
              onClick={() => nextStep('q_weeks')} 
              className="btn-primary mt-4"
            >
              Continuar
            </button>
          </div>
        );

      case 'q_weeks':
        return (
          <div className="px-4">
            <Header title="Você está com quantas semanas de gestação?" subtitle="Por favor, digite um número." />
            <input 
              type="tel" 
              inputMode="numeric"
              placeholder="Exemplo, 22 semanas." 
              className="w-full p-6 border-2 border-slate-100 rounded-2xl text-center font-medium placeholder:text-slate-300 focus:border-green-600 outline-none transition-all mb-4"
              value={state.weeks}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setState({...state, weeks: val});
              }}
            />
            <button 
              disabled={!state.weeks}
              onClick={() => nextStep('q_age_input')} 
              className="btn-primary"
            >
              Continuar
            </button>
          </div>
        );

      case 'q_age_input':
        return (
          <div className="px-4">
            <Header title="Qual sua idade?" subtitle="Perguntamos a sua idade para personalizar o seu plano" />
            <input 
              type="tel" 
              inputMode="numeric"
              placeholder="Exemplo: 39" 
              className="w-full p-6 border-2 border-slate-100 rounded-2xl text-center font-medium placeholder:text-slate-300 focus:border-green-600 outline-none transition-all mb-4"
              value={state.age}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setState({...state, age: val});
              }}
            />
            <button 
              disabled={!state.age}
              onClick={() => nextStep('analyzing_85')} 
              className="btn-primary"
            >
              Continuar
            </button>
          </div>
        );

      case 'analyzing_85':
        return <LoadingScreen progress={85} duration={14000} title="Analisando seus dados e finalizando seu plano..." next={() => nextStep('result_warning')} />;

      case 'result_warning':
        return (
          <div className="px-4 pt-10 pb-20">
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mb-6 flex flex-col gap-2">
              <span className="text-yellow-800 text-[13px] font-medium">Atenção: o nível ideal de <span className="font-bold">preparação do seu corpo</span> para o parto é a partir de 75%</span>
            </div>
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-50 shadow-sm mb-8 relative">
              <div className="aspect-[3/2] w-full relative">
                {/* Background Grid */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[25, 50, 75].map(v => (
                    <React.Fragment key={v}>
                      <line x1={v} y1="0" x2={v} y2="100" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="0" y1={v} x2="100" y2={v} stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2,2" />
                    </React.Fragment>
                  ))}
                  
                  {/* Area Gradient */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="30%" stopColor="#F59E0B" />
                      <stop offset="60%" stopColor="#FBBF24" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                    <mask id="chartMask">
                      <path d="M 0 100 Q 30 100 50 50 T 100 0 L 100 100 L 0 100 Z" fill="white" />
                    </mask>
                  </defs>
                  
                  <motion.rect 
                    x="0" 
                    y="0" 
                    width="100" 
                    height="100" 
                    fill="url(#chartGradient)" 
                    mask="url(#chartMask)" 
                    opacity="0.6" 
                    initial={{ height: 0, y: 100 }}
                    animate={{ height: 100, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  
                  {/* Curve Line */}
                  <motion.path 
                    d="M 0 100 Q 30 100 50 50 T 100 0" 
                    fill="none" 
                    stroke="#F59E0B" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="opacity-80"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                  />

                  {/* Points */}
                  <motion.circle 
                    cx="0" cy="100" r="2.5" fill="white" stroke="#CBD5E1" strokeWidth="1.5" 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}
                  />
                  <motion.circle 
                    cx="25" cy="85" r="2.5" fill="white" stroke="#10B981" strokeWidth="2.5" 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}
                  />
                  <motion.circle 
                    cx="50" cy="50" r="2" fill="white" stroke="#CBD5E1" strokeWidth="1.5" 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }}
                  />
                  <motion.circle 
                    cx="75" cy="15" r="2.5" fill="white" stroke="#10B981" strokeWidth="2.5" 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 }}
                  />
                  <motion.circle 
                    cx="100" cy="0" r="2.5" fill="white" stroke="#10B981" strokeWidth="2.5" 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2 }}
                  />
                </svg>

                {/* Badges/Labels */}
                <div className="absolute top-[85%] left-[25%] -translate-x-1/2 -translate-y-[180%]">
                  <div className="bg-[#15803d] text-white text-[11px] font-bold px-3 py-1.5 rounded-2xl shadow-sm whitespace-nowrap flex items-center gap-1">
                    Você hoje
                  </div>
                </div>

                <div className="absolute top-[15%] left-[75%] -translate-x-1/2 -translate-y-[180%]">
                  <div className="bg-[#15803d] text-white text-[11px] font-bold px-3 py-1.5 rounded-2xl shadow-sm whitespace-nowrap">
                    IDEAL
                  </div>
                </div>
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between mt-2 pt-2 text-[10px] font-bold text-slate-800 border-t border-slate-50">
                <span>0%</span>
                <span className="ml-[-10px]">Pouco preparada</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 mb-8">
              <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
                <AlertCircle className="w-5 h-5" /> Falta de preparação para o parto:
              </div>
              <p className="text-red-600 text-[14px] leading-relaxed">
                Pode te fazer sentir ainda mais estresse, deixar seu corpo mais tenso, gerando mais dor e dificuldade no parto.
              </p>
            </div>
            <button onClick={() => nextStep('result_plan')} className="btn-primary mb-12">Continuar</button>

            <div className="text-center mb-8">
              <p className="text-slate-500 text-sm italic">Análise dos motivos que mais atrapalham o corpo no parto</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '💼', title: 'Rotina pesada de trabalho', desc: 'Trabalhar é ótimo, mas quanto mais pesada é a carga, mais tenso fica o corpo.' },
                { icon: '😢', title: 'Medo do parto', desc: 'Isso deixa nosso corpo enrijecido, bloqueando a passagem do bebê.' },
                { icon: '💪', title: 'Sedentarismo', desc: 'O movimento é o responsável por deixar nosso corpo flexível.' },
                { icon: '📱', title: 'Excesso de informação', desc: 'As redes sociais e as palpiteiras nos deixam confusas e tensas.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border-2 border-slate-50 text-center flex flex-col items-center">
                  <span className="text-3xl mb-3">{item.icon}</span>
                  <h4 className="font-bold text-[14px] leading-tight mb-2">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
            <button onClick={() => nextStep('result_plan')} className="btn-primary mt-8">Continuar</button>
          </div>
        );

      case 'result_plan':
        return (
          <div className="px-4 pt-10 pb-20">
            <Header 
              title="Você tem" 
              highlightedTitle="quantos minutos por dia livre" 
              title2="para praticar Fisioterapia Pélvica em casa?" 
              subtitle={
                <span className="font-normal text-slate-800">
                  Os exercícios do Movimento Materno são de Fisioterapia Pélvica e <span className="font-bold">feitos</span> para você conseguir realizar em casa.
                </span>
              }
              highlightColor="text-red-500"
            />
            <div className="mt-8">
              <OptionCard label="10 - 15 minutos (mínimo recomendado)" emoji="🙂" onClick={() => nextStep('testimonials')} />
              <OptionCard label="15 - 20 minutos" emoji="😀" onClick={() => nextStep('testimonials')} />
              <OptionCard label="+25 minutos" emoji="😍" onClick={() => nextStep('testimonials')} />
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <LoadingScreen 
            progress={94} 
            title="Criando seu plano de exercícios que realmente funcionam..." 
            duration={14000} 
            next={() => nextStep('offer')} 
          />
        );

      case 'offer':
        return (
          <div className="px-4 pt-10 pb-20">
            <Header title="Montamos um plano incrível para você." />
            <p className="text-center text-slate-600 text-[15px] px-6 mb-8 leading-relaxed">
              Grávida não tem tempo a perder, por isso, com base no resultados das nossas alunas, esperamos que em 7 dias você já sinta seu corpo mais preparado para o parto.
            </p>
            <p className="text-center font-bold text-[15px] mb-10">E o melhor de tudo: <span className="text-slate-900">fazendo exercícios de fisio pélvica em casa.</span></p>
            
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-50 shadow-sm mb-8 relative overflow-hidden">
              <div className="aspect-[3/2] w-full relative">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[25, 50, 75].map(v => (
                    <React.Fragment key={v}>
                      <line x1={0} y1={v} x2={100} y2={v} stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2,2" />
                    </React.Fragment>
                  ))}
                  
                  {/* Fill Area */}
                  <motion.path 
                    d="M 0 100 Q 30 100 60 40 T 100 10 L 100 100 L 0 100 Z" 
                    fill="#15803d" 
                    initial={{ fillOpacity: 0 }}
                    animate={{ fillOpacity: 0.5 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  
                  {/* Curve Line */}
                  <motion.path 
                    d="M 0 100 Q 30 100 60 40 T 100 10" 
                    fill="none" 
                    stroke="#15803d" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />

                  {/* Points */}
                  <motion.circle 
                    cx="0" cy="100" r="2.5" fill="white" stroke="#15803d" strokeWidth="2" 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}
                  />
                  <motion.circle 
                    cx="30" cy="85" r="3" fill="white" stroke="#15803d" strokeWidth="2.5" 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}
                  />
                  <motion.circle 
                    cx="60" cy="40" r="3" fill="white" stroke="#15803d" strokeWidth="2.5" 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }}
                  />
                  <motion.circle 
                    cx="100" cy="10" r="3" fill="white" stroke="#15803d" strokeWidth="2.5" 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 }}
                  />
                </svg>

                {/* Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-[85%] left-[30%] -translate-x-1/2 -translate-y-[180%]"
                >
                  <div className="bg-[#15803d] text-white text-[11px] font-bold px-3 py-1.5 rounded-2xl shadow-sm whitespace-nowrap">
                    Você hoje
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-[180%]"
                >
                  <div className="bg-[#15803d] text-white text-[11px] font-bold px-3 py-1.5 rounded-2xl shadow-sm whitespace-nowrap">
                    Você daqui a 7 dias
                  </div>
                </motion.div>
              </div>

              {/* X-Axis Labels */}
              <div className="relative w-full h-10 mt-6 text-[8px] font-black text-slate-800 uppercase tracking-tighter leading-[1.1]">
                <span className="absolute left-0 top-0 text-left w-14">Despreparada</span>
                <span className="absolute left-[30%] -translate-x-1/2 top-0 text-center w-16">Pouco preparada</span>
                <span className="absolute left-[60%] -translate-x-1/2 top-0 text-center w-20">Preparada e confiante</span>
                <span className="absolute right-0 top-0 text-right w-12">100% pronta</span>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-slate-400 text-[11px] italic mb-10">Imagem meramente ilustrativa*</p>
              
              <button onClick={() => nextStep('testimonials_grid')} className="btn-primary bg-green-800 hover:bg-green-900 h-14 text-lg">
                Continuar
              </button>
            </div>
          </div>
        );

      case 'offer_final':
        return (
          <div className="px-4 pt-8 pb-32">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Seu Plano <span className="text-black">está pronto.</span></h2>
              <p className="text-sm font-bold leading-tight px-4">Você vai receber os exercícios de Fisio Pélvica que realmente funcionam para facilitar seu parto.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10 pt-4">
              <div className="bg-red-50 p-4 rounded-[32px] border border-red-100 opacity-90">
                <div className="aspect-square mb-4 rounded-2xl overflow-hidden bg-slate-200 grayscale opacity-40 mix-blend-multiply relative">
                   <img src="https://i.ibb.co/cSttHKKr/enhanced-Gemini-Generated-Image-d9pmnpd9pmnpd9pm.png" className="w-full h-full object-cover blur-[2px] scale-110" referrerPolicy="no-referrer" alt="Antes" />
                </div>
                <h4 className="text-center text-red-700 font-bold text-[11px] mb-3 leading-tight uppercase tracking-tight">Antes do Movimento Materno</h4>
                <ul className="text-[10px] text-slate-600 flex flex-col gap-1.5 font-medium">
                  <li className="flex gap-2"><span>▪️</span> Sem energia</li>
                  <li className="flex gap-2"><span>▪️</span> Muita estresse</li>
                  <li className="flex gap-2"><span>▪️</span> Dor no corpo</li>
                  <li className="flex gap-2"><span>▪️</span> Insegura no parto</li>
                </ul>
              </div>
              <div className="bg-green-100 p-4 rounded-[32px] border-2 border-green-600 shadow-2xl shadow-green-200 scale-105 relative z-10 transition-transform hover:scale-110 duration-500">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[8px] font-black px-3 py-1 rounded-full whitespace-nowrap uppercase shadow-lg ring-2 ring-white">Julia Mendes (Aluna)</div>
                <div className="aspect-square mb-4 rounded-2xl overflow-hidden border-2 border-green-500 shadow-md">
                   <img src="https://i.ibb.co/cSttHKKr/enhanced-Gemini-Generated-Image-d9pmnpd9pmnpd9pm.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="Depois" />
                </div>
                <h4 className="text-center text-green-700 font-black text-[11px] mb-3 leading-tight uppercase tracking-tight">Depois do Movimento Materno</h4>
                <ul className="text-[10px] text-slate-800 flex flex-col gap-1.5">
                  <li className="flex gap-2 font-bold"><Check className="w-3 h-3 text-green-600 flex-shrink-0" /> Mais disposição</li>
                  <li className="flex gap-2 font-bold"><Check className="w-3 h-3 text-green-600 flex-shrink-0" /> Corpo preparado</li>
                  <li className="flex gap-2 font-bold"><Check className="w-3 h-3 text-green-600 flex-shrink-0" /> Livre de dores</li>
                  <li className="flex gap-2 font-bold"><Check className="w-3 h-3 text-green-600 flex-shrink-0" /> Parto mais fácil</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-1 border-4 border-green-600 mb-8 overflow-hidden shadow-2xl shadow-green-200 relative">
               <div className="bg-green-600 text-white text-[12px] font-black text-center py-2.5 uppercase tracking-[0.3em]">Oferta Exclusiva Liberada</div>
               
               {/* Discount Badge */}
               <div className="absolute top-10 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce shadow-lg">
                 85% OFF
               </div>

               <div className="p-8 text-center">
                  <p className="text-[15px] font-bold mb-6 text-slate-800">Acesso vitalício ao Movimento Materno</p>
                  <div className="flex flex-col items-center justify-center gap-1 mb-2">
                    <p className="text-[13px] text-slate-900 font-bold relative inline-block">
                      De R$ 197 Por
                      <span className="absolute left-14 right-0 top-1/2 h-[2px] bg-red-600/80 -rotate-3" />
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-green-700">R$</span>
                      <span className="text-6xl font-black text-green-700 leading-none">29,90</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Pagamento único · Acesso imediato no E-mail</p>
               </div>
            </div>

            <div className="bg-red-50 p-4 rounded-2xl border border-red-100 mb-8 text-center sticky top-4 z-10 shadow-md backdrop-blur-sm bg-white/90">
              <p className="text-red-700 text-[13px] font-bold flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 animate-pulse" />
                O seu desconto acaba em: 12:15
              </p>
            </div>

            <button className="btn-primary w-full h-16 text-xl font-black uppercase tracking-wider shadow-2xl shadow-green-400 active:scale-95 transition-transform whitespace-nowrap">
              Quero meu plano
            </button>

            <div className="mt-20 text-center">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-[11px] font-bold text-slate-600 mb-8">
                  <Star className="w-3 h-3 fill-slate-600" />
                  ENTREGA IMEDIATA NO SEU E-MAIL
               </div>
               
               <h3 className="text-3xl font-black mb-8 text-slate-900 px-4 leading-none decoration-green-500/30 underline underline-offset-8">O que VOCÊ vai receber hoje:</h3>
               
               <div className="relative aspect-video max-w-[340px] mx-auto mb-10 overflow-hidden rounded-[40px] shadow-2xl border-4 border-white group">
                  <div className="absolute inset-0 bg-green-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src="https://i.ibb.co/9kvBy6cR/Gemini-Generated-Image-8yb2qy8yb2qy8yb2.png" alt="Curso" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                    <div className="text-left">
                       <p className="text-green-400 font-black text-xs uppercase tracking-widest mb-1">MÉTODO COMPLETO</p>
                       <p className="text-white font-bold text-lg leading-tight uppercase">+40 vídeo aulas e exercícios práticos</p>
                    </div>
                  </div>
               </div>
               
               <div className="bg-slate-50 p-8 rounded-[50px] text-left border border-slate-200 shadow-inner">
                  <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                    <Check className="w-6 h-6 p-1 bg-green-100 text-green-700 rounded-lg" /> 
                    BÔNUS EXCLUSIVOS (GRÁTIS)
                  </h3>
                  <div className="space-y-6">
                     {[
                       { title: 'Aulão sobre enxoval completo', desc: 'Não gaste dinheiro com o que não precisa.' },
                       { title: 'Passo-a-passo: Respiração no parto', desc: 'Como usar a respiração para aliviar a dor.' },
                       { title: 'Exercícios de alívio imediato', desc: 'Para usar no dia do seu parto e em casa.' },
                       { title: 'Prevenção de Diástase', desc: 'Protocolo para manter a barriga saudável.' }
                     ].map((item, idx) => (
                       <div key={idx} className="flex gap-4">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          <div>
                             <p className="text-[14px] font-black text-slate-900 leading-none mb-1">{item.title}</p>
                             <p className="text-[12px] text-slate-500 font-medium">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="mt-24 text-center px-4 mb-20">
               <div className="bg-gradient-to-b from-green-50/50 to-white rounded-[60px] p-10 border-2 border-green-200 relative overflow-hidden shadow-xl">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-200/30 blur-3xl rounded-full" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-200/30 blur-3xl rounded-full" />
                  
                  <div className="w-32 h-32 mx-auto relative mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-600/10 rounded-full animate-ping duration-[3s]" />
                    <img src="https://i.ibb.co/nsJ91pr6/Garantia-de-7-dias.png" alt="Garantia" className="relative w-32 h-32 object-contain" referrerPolicy="no-referrer" />
                  </div>
                  
                  <h3 className="text-2xl font-black mb-4 text-slate-900 uppercase tracking-tight">Satisfação Protegida</h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed font-medium mb-10 px-4">
                    Eu tiro todo o risco das suas costas. Se você não amar o conteúdo em até 7 dias, mande um e-mail e eu devolvo <span className="text-slate-900 font-bold">100% do seu dinheiro.</span> Sem perguntas e sem letras miúdas.
                  </p>
                  
                  <button className="btn-primary w-full h-20 text-lg bg-slate-900 shadow-xl shadow-slate-200 hover:bg-slate-800 whitespace-nowrap px-4 font-black uppercase tracking-tight">
                    Ativar Acesso com Segurança
                  </button>
               </div>
            </div>
          </div>
        );

      case 'testimonials_grid':
        return (
          <div className="px-4 pt-10 pb-20 text-center">
             <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight px-6 text-center">
               Relatos de grávidas que passaram pelo Movimento Materno.
             </h2>
             <p className="text-[13px] text-blue-900/60 font-medium mb-8 px-8 text-center mx-auto max-w-xs">
               Milhares de gestantes tiveram a gestação transformada com a ajuda do Movimento materno
             </p>

             <button onClick={() => nextStep('offer_final')} className="btn-primary bg-green-700 hover:bg-green-800 mb-12 uppercase tracking-wide">
               Continuar
             </button>

             <div className="space-y-12">
                {/* Testimonial 1 - Story/DM style */}
                <div className="max-w-[280px] mx-auto bg-white rounded-3xl shadow-xl p-4 transform rotate-1 border border-slate-50">
                    <div className="bg-slate-50 p-3 rounded-2xl text-left">
                       <p className="text-[10px] text-slate-400 mb-2">Respondendo ao seu story</p>
                       <div className="w-16 h-24 bg-slate-200 rounded-lg mb-3 overflow-hidden">
                          <img src="https://picsum.photos/seed/story/200/300" className="w-full h-full object-cover" alt="Story" referrerPolicy="no-referrer" />
                       </div>
                       <p className="text-[11px] leading-relaxed text-slate-800">
                         Boa tarde quarta-feira ganhei minha bebê meu parto foi super rápido cheguei as 7 da manhã na maternidade quando foi 9 horas minha bebê nasceu seguindo o movimento materno que me ajudou muito fico agradecida as suas dicas Julia. ❤️
                       </p>
                    </div>
                </div>

                {/* Testimonial 2 - Card with large photo and quote */}
                <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden max-w-[320px] mx-auto border border-slate-50">
                    <div className="relative aspect-square">
                       <img src="https://i.ibb.co/cSttHKKr/enhanced-Gemini-Generated-Image-d9pmnpd9pmnpd9pm.png" className="w-full h-full object-cover" alt="Julia mendes" referrerPolicy="no-referrer" />
                       <div className="absolute bottom-4 right-4 bg-green-800/90 py-1.5 px-3 text-white font-bold text-[8px] uppercase rounded-full border border-white/20">
                          Depoimento de ALUNA<br/>do Movimento Materno
                       </div>
                    </div>
                    <div className="p-8 text-left">
                       <span className="text-4xl text-red-100 font-serif block mb-[-20px]">“</span>
                       <p className="text-[13px] leading-relaxed text-slate-700 font-medium mb-4 italic">
                        Eu sabia tudo que me esperava, que movimentos fazer, como respirar, fazer força. Um parto muito mais lindo do que imaginava e sei que sem a Julia não teria sido tão incrível.
                       </p>
                       <div className="flex items-center gap-2">
                          <span className="font-bold text-red-500 text-[11px] uppercase tracking-wider">JULIA MENDES, 32</span>
                          <span className="text-[11px] text-slate-400">· Parto Normal</span>
                       </div>
                    </div>
                </div>

                {/* Testimonial 3 - Horizontal Collage */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-2 flex gap-2">
                   <div className="grid grid-cols-2 gap-2 flex-[0.7]">
                      <img src="https://picsum.photos/seed/test1/300/300" className="rounded-xl w-full aspect-square object-cover" alt="T1" referrerPolicy="no-referrer" />
                      <img src="https://picsum.photos/seed/test2/300/300" className="rounded-xl w-full aspect-square object-cover" alt="T2" referrerPolicy="no-referrer" />
                      <img src="https://picsum.photos/seed/test3/300/300" className="rounded-xl w-full aspect-square object-cover" alt="T3" referrerPolicy="no-referrer" />
                      <img src="https://picsum.photos/seed/test4/300/300" className="rounded-xl w-full aspect-square object-cover" alt="T4" referrerPolicy="no-referrer" />
                   </div>
                   <div className="flex-1 text-left p-2 flex flex-col justify-center">
                    <span className="text-2xl text-red-100 font-serif mb-[-10px]">“</span>
                    <p className="text-[10px] leading-relaxed text-slate-600 font-medium italic mb-2">
                      Comecei com 33 semanas e meu parto foi normal, rápido e sem sofrimento. Eu sabia exatamente o que estava acontecendo e o que fazer.
                    </p>
                    <p className="text-[10px] font-bold text-red-500 uppercase">SUAINA ALMEIDA, 30</p>
                   </div>
                </div>

                {/* Testimonial 4 - Large text + Baby */}
                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-6 text-left space-y-4">
                   <div className="bg-slate-50/80 p-5 rounded-3xl border-l-[3px] border-red-500">
                      <p className="text-[13px] font-bold text-slate-800 leading-tight underline decoration-red-200 underline-offset-4">
                        Gestação maravilhosa sem dores ou incômodos, parto e pós parto maravilhosos tbm.
                      </p>
                      <p className="text-[13px] text-slate-700 mt-2">
                         Obrigada por tudo, passei por tudo com a maior tranquilidade, com teu respaldo. Obrigada Obrigada
                      </p>
                   </div>
                   <div className="relative aspect-[3/4] max-w-[200px] mx-auto rounded-[30px] overflow-hidden shadow-2xl border-4 border-white">
                      <img src="https://picsum.photos/seed/baby/600/800" className="w-full h-full object-cover" alt="Baby" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                         <Baby className="w-4 h-4 text-white" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-16 mb-10 text-center">
                <p className="text-[13px] font-bold text-slate-900 leading-tight px-12">
                  Temos milhares de relatos como esses, mas ficaria grande demais colocar tudo aqui
                </p>
             </div>

             <button onClick={() => nextStep('offer_final')} className="btn-primary bg-green-700 hover:bg-green-800 uppercase tracking-wide">
               Continuar
             </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-green-100 selection:text-green-900">
      {screen !== 'intro' && screen !== 'analyzing_85' && screen !== 'testimonials' && screen !== 'offer' && screen !== 'testimonials_grid' && screen !== 'offer_final' && (
        <ProgressBar progress={calculateProgress()} />
      )}
      <main className="max-w-md mx-auto pt-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const LoadingScreen = ({ progress, title, next, duration = 3000 }: { progress: number, title: string, next: () => void, duration?: number }) => {
  const [displayProgress, setDisplayProgress] = useState(progress === 94 ? 85 : 0);

  useEffect(() => {
    const timer = setTimeout(next, duration);
    
    const startValue = progress === 94 ? 85 : 0;
    const range = progress - startValue;
    const startTime = Date.now();
    
    let frameId: number;
    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const completion = Math.min(elapsed / duration, 1);
      const current = Math.floor(startValue + (range * completion));
      
      setDisplayProgress(current);
      
      if (completion < 1) {
        frameId = requestAnimationFrame(updateCount);
      }
    };
    
    frameId = requestAnimationFrame(updateCount);
    
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [progress, duration, next]);

  return (
    <div className="px-4 py-8 text-center flex flex-col items-center min-h-[90vh]">
      <div className="w-full max-w-xs mb-10 mt-10">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Carregando resultados...</span>
          <span className="text-xl font-black text-green-700">{displayProgress}%</span>
        </div>
        <div className="progress-bar">
          <motion.div 
            className="progress-bar-fill" 
            initial={{ width: progress === 94 ? '85%' : 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </div>
      </div>
      
      <h2 className={`text-2xl font-bold mb-8 px-6 leading-tight ${progress === 94 ? 'text-red-600 mb-12' : 'text-slate-900'}`}>{title}</h2>
      
      {progress === 40 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-sm mx-auto">
          <h3 className="text-lg font-bold text-slate-800">Enquanto isso: conheça a idealizadora do Movimento Materno</h3>
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center max-w-[280px] mx-auto">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-slate-50">
              <img src="https://i.ibb.co/cSttHKKr/enhanced-Gemini-Generated-Image-d9pmnpd9pmnpd9pm.png" alt="Julia" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h4 className="font-bold text-sm">Julia Mendes</h4>
            <div className="flex gap-4 mt-2 text-[10px] text-slate-400 font-medium">
              <div className="text-center"><p className="text-black font-bold">1.278</p><p>publicações</p></div>
              <div className="text-center"><p className="text-black font-bold">436 mil</p><p>seguidores</p></div>
              <div className="text-center"><p className="text-black font-bold">181</p><p>seguindo</p></div>
            </div>
          </div>
          <div className="text-left px-8 space-y-4">
             <p className="text-[13px] leading-relaxed text-slate-600 italic">
               "Sua maior missão é ajudar o maior número de grávidas a terem <span className="text-black font-bold">o melhor parto possível</span>."
             </p>
          </div>
        </div>
      )}

      {progress === 94 && (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 px-6 leading-tight">
              Enquanto isso: conheça a idealizadora do Movimento Materno
            </h3>

            {/* Instagram Style Card */}
            <div className="bg-white rounded-[40px] shadow-2xl p-6 mb-8 max-w-[340px] mx-auto border border-slate-50">
               <div className="flex items-center justify-between mb-4 px-2">
                 <div className="flex items-center gap-1">
                   <ChevronRight className="w-4 h-4 rotate-180" />
                   <span className="font-bold text-[15px]">juliamendes</span>
                   <div className="bg-blue-500 rounded-full p-0.5">
                     <Check className="w-2 h-2 text-white" />
                   </div>
                 </div>
                 <div className="flex items-center gap-4 text-slate-800">
                    <div className="relative">
                      <Bell className="w-5 h-5" />
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></div>
                    </div>
                    <MoreHorizontal className="w-5 h-5" />
                 </div>
               </div>

               <div className="flex items-center gap-6 mb-4 px-2">
                 <div className="w-18 h-18 rounded-full overflow-hidden ring-2 ring-slate-100 p-0.5 flex-shrink-0">
                   <img src="https://i.ibb.co/cSttHKKr/enhanced-Gemini-Generated-Image-d9pmnpd9pmnpd9pm.png" alt="Julia" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                 </div>
                 <div className="flex gap-4 flex-1">
                    <div className="text-center flex-1">
                      <p className="text-[15px] font-bold text-black">1.278</p>
                      <p className="text-[10px] text-slate-500 font-medium">publicações</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-[15px] font-bold text-black">436 mil</p>
                      <p className="text-[10px] text-slate-500 font-medium">seguidores</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-[15px] font-bold text-black">181</p>
                      <p className="text-[10px] text-slate-500 font-medium">seguindo</p>
                    </div>
                 </div>
               </div>

               <div className="text-left px-2">
                 <h4 className="font-bold text-[13px] text-black mb-0.5">Julia Mendes</h4>
                 <p className="text-slate-500 text-[11px] font-medium mb-1">Criador(a) de conteúdo digital</p>
                 <div className="text-[11px] text-slate-800 space-y-0.5 leading-snug font-medium">
                   <p>🌻 fisio pélvica especialista em grávidas USP</p>
                   <p>🎓 prof de fisioterapeutas @escolamaterna</p>
                   <p>🌍 Cuido de grávidas em qualquer lugar do mundo 👇</p>
                   <p className="text-blue-900 font-semibold opacity-80">Ver tradução</p>
                 </div>
               </div>
            </div>

            {/* Bio Body Text */}
            <div className="text-left px-6 space-y-4 text-[15px] leading-relaxed text-slate-700">
               <p>Oii, Dona grávida. Sou a <span className="font-bold text-black">Julia Mendes</span>, Fisioterapeuta Pélvica e coordenadora de Pós-graduação em Fisioterapia Obstétrica.</p>
               <p><span className="font-bold text-black text-[16px]">Já atendi mais de 1500 grávidas pessoalmente</span> e milhares de outras através das minhas redes sociais e programas online.</p>
               <p>Minha maior missão é ajudar o maior número de grávidas a terem <span className="font-bold text-black">o melhor parto possível</span>.</p>
               <p>Saiba que será um prazer te ajudar. Conte comigo.</p>
            </div>
        </div>
      )}

      {progress === 85 && (
        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <h3 className="text-[17px] font-bold px-4 mb-10 leading-snug">
              Alunas que praticaram o <span className="text-primary-green">Movimento Materno</span> durante a gravidez, <span className="text-primary-green">realizadas depois de seu parto</span>
           </h3>
           
           <div className="grid grid-cols-2 gap-4 px-2 relative h-[380px]">
              {/* Left Testimonial Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative h-full"
              >
                <div className="absolute top-4 left-[-10px] right-2 bottom-6 bg-white rounded-2xl shadow-xl overflow-hidden rotate-[-2deg] border border-slate-100">
                   <img 
                     src="https://images.unsplash.com/photo-1555252333-9f8e92e65ee9?q=80&w=800&auto=format&fit=crop" 
                     className="w-full h-full object-cover" 
                     alt="Depoimento Aluna" 
                     referrerPolicy="no-referrer" 
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-primary-green/90 py-2 px-2 text-white font-bold text-[8px] uppercase tracking-tighter text-left">
                     Depoimento de ALUNA<br/>do Movimento Materno
                   </div>
                </div>
              </motion.div>

              {/* Right Testimonial Collage */}
              <div className="flex flex-col gap-4 relative h-full pt-10">
                {/* Top Right Background Leaf Logo (Simplified) */}
                <div className="absolute top-0 right-4 opacity-20 transform translate-y-[-20px]">
                   <Baby className="w-16 h-16 text-primary-green" />
                </div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white p-2 rounded-2xl shadow-xl rotate-[3deg] relative z-10 border border-slate-100"
                >
                  <div className="absolute top-[-10px] left-0 right-0 flex justify-center z-20">
                     <div className="bg-primary-green/90 py-1 px-3 text-white font-bold text-[7px] uppercase rounded-full flex items-center gap-1">
                        <LeafIcon className="w-2 h-2" /> Depoimento de ALUNA do Movimento Materno
                     </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1536640712247-c45474d47d0f?q=80&w=800&auto=format&fit=crop" 
                    className="w-full aspect-square object-cover rounded-xl" 
                    alt="Pai e bebê" 
                    referrerPolicy="no-referrer" 
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-white p-1 rounded-2xl shadow-2xl rotate-[-5deg] relative z-20 mt-[-40px] border border-slate-100"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1544126592-807daa2b565b?q=80&w=800&auto=format&fit=crop" 
                    className="w-full aspect-square object-cover rounded-xl" 
                    alt="Mãe e bebê" 
                    referrerPolicy="no-referrer" 
                  />
                </motion.div>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}

const LeafIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.1 9.2A7 7 0 0 1 11 20Z" />
    <path d="M11 13a4 4 0 1 0-4-4" />
    <path d="M5 21v-3a2 2 0 1 1 4 0v3" />
  </svg>
);
