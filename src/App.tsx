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
              title="Descubra o seu nível de preparo para ter um parto natural de 3 horas"
              highlightedTitle="(e risco zero de laceração)."
              subtitle="Selecione a sua idade abaixo para iniciar sua análise biomecânica rápida."
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
              { label: 'Assumir o controle do meu corpo e perder o medo do parto.', emoji: '✨' },
              { label: 'Encaixar o bebê na posição perfeita para nascer.', emoji: '🤰' },
              { label: 'Ter um trabalho de parto muito mais rápido e fácil (reduzir as horas de dor).', emoji: '🚀' },
              { label: 'Risco zero de lacerações ou cortes (proteger minha região íntima).', emoji: '🛡️' },
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
        return <LoadingScreen progress={85} duration={8000} title="Analisando seus dados e finalizando seu plano..." next={() => nextStep('result_warning')} />;

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
                { icon: '😢', title: 'O medo trava a pelve', desc: 'O nervosismo e a tensão bloqueiam a passagem do bebê e aumentam a dor das contrações.' },
                { icon: '💪', title: 'Falta de mobilidade pélvica', desc: 'Não movimentar os músculos certos deixa a "porta de saída" rígida.' },
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
              <h2 className="text-3xl font-bold text-green-700 mb-2">Seu Plano <span className="text-black">está pronto.</span></h2>
              <p className="text-sm font-bold leading-tight px-4">Você vai receber os exercícios de Fisio Pélvica que realmente funcionam para facilitar seu parto.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10 pt-4">
              <div className="bg-red-50 p-4 rounded-[32px] border border-red-100 opacity-90">
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

            <button 
              onClick={() => window.location.href = 'https://checkout.protocolodestrave.shop/VCCL1O8SD044'}
              className="btn-primary w-full h-16 text-xl font-black uppercase tracking-wider shadow-2xl shadow-green-400 active:scale-95 transition-transform whitespace-nowrap"
            >
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

               <div className="max-w-[340px] mx-auto mb-10 overflow-hidden rounded-[30px] shadow-lg border-2 border-slate-100">
                  <img src="https://i.ibb.co/N6p32vxt/Design-sem-nome.jpg" alt="Design Bonus" className="w-full h-auto" referrerPolicy="no-referrer" />
               </div>

               {/* New Benefits List from Image */}
               <div className="text-left px-4 mb-12 space-y-8">
                  <div className="flex gap-4">
                     <span className="text-xl">✅</span>
                     <div>
                        <p className="text-[17px] font-black text-slate-900 leading-tight">
                           +40 Exercícios para fazer em casa (videoaulas)
                        </p>
                        <p className="text-[14px] text-slate-600 mt-1">
                           Receba os <span className="font-medium">exercícios seguros</span> para <span className="font-bold text-slate-900">facilitar seu parto.</span>
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <span className="text-xl">✅</span>
                     <div>
                        <p className="text-[17px] font-black text-slate-900 leading-tight">
                           Tensão reduzida na
                        </p>
                        <p className="text-[14px] text-slate-600 mt-1">
                           pelve, costas, ciático, pescoço e região íntima
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <span className="text-xl">✅</span>
                     <div>
                        <p className="text-[17px] font-black text-slate-900 leading-tight">
                           Redução do estresse e das preocupações
                        </p>
                        <p className="text-[14px] text-slate-600 mt-1">
                           e sensação de mais relaxamento e calma
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <span className="text-xl">✅</span>
                     <div>
                        <p className="text-[17px] font-black text-slate-900 leading-tight">
                           Melhora do sono
                        </p>
                        <p className="text-[17px] font-black text-slate-900 leading-tight">
                           e melhor qualidade de descanso
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <span className="text-xl">✅</span>
                     <div>
                        <p className="text-[17px] font-black text-slate-900 leading-tight">
                           Tempo de acesso: 12 meses
                        </p>
                     </div>
                  </div>
               </div>
               
               <div className="bg-green-50 border-2 border-dashed border-green-600 p-8 rounded-[50px] text-left shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-black px-4 py-1 rounded-bl-2xl uppercase">Oferta Limitada</div>
                  
                  <h3 className="text-xl font-black text-green-800 mb-2 leading-tight">
                    Só para as 20 primeiras inscritas de hoje:
                  </h3>
                  <p className="text-[14px] text-green-700 font-medium mb-8 leading-tight">
                    Além do plano de exercícios, veja os presentes que você vai receber ao garantir uma das 20 vagas de hoje:
                  </p>

                  <div className="space-y-6">
                     {[
                       { title: 'Aulão sobre enxoval', emoji: '🎁' },
                       { title: 'Passo a passo: Como respirar no Trabalho de parto', emoji: '🎁' },
                       { title: 'Exercícios para fazer durante o trabalho de parto', emoji: '🎁' },
                       { title: 'Exercício para reduzir o avanço da diástase', emoji: '🎁' }
                     ].map((item, idx) => (
                       <div key={idx} className="flex gap-4 items-center bg-white/50 p-3 rounded-2xl border border-green-100">
                          <span className="text-2xl">{item.emoji}</span>
                          <p className="text-[14px] font-bold text-slate-800 leading-tight">{item.title}</p>
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
                  
                  <button 
                    onClick={() => window.location.href = 'https://checkout.protocolodestrave.shop/VCCL1O8SD044'}
                    className="btn-primary w-full h-20 text-base bg-slate-900 shadow-xl shadow-slate-200 hover:bg-slate-800 px-4 font-black uppercase tracking-tight"
                  >
                    Ativar Acesso com Segurança
                  </button>
               </div>
            </div>

            {/* Julia Bio Copy from Loading Screen */}
            <div className="w-full px-4 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 px-2 leading-tight text-center">
                  Conheça a idealizadora do Movimento Materno
                </h3>

                <div className="relative mb-10 max-w-[340px] mx-auto group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-[40px] blur opacity-25 transition duration-1000"></div>
                  <img 
                    src="https://i.ibb.co/cSttHKKr/enhanced-Gemini-Generated-Image-d9pmnpd9pmnpd9pm.png" 
                    alt="Julia Mendes" 
                    className="relative w-full h-auto rounded-[36px] shadow-2xl border-4 border-white" 
                    referrerPolicy="no-referrer" 
                  />
                </div>

                <div className="text-left px-4 space-y-4 text-[15px] leading-relaxed text-slate-700">
                   <p>Oii, Dona grávida. Sou a <span className="font-bold text-black">Julia Mendes</span>, Fisioterapeuta Pélvica e coordenadora de Pós-graduação em Fisioterapia Obstétrica.</p>
                   <p><span className="font-bold text-black text-[16px]">Já atendi mais de 1500 grávidas pessoalmente</span> e milhares de outras através das minhas redes sociais e programas online.</p>
                   <p>Minha maior missão é ajudar o maior número de grávidas a terem <span className="font-bold text-black">o melhor parto possível</span>.</p>
                   <p>Saiba que será um prazer te ajudar. Conte comigo.</p>
                </div>
            </div>

            {/* Final Offer Call to Action */}
            <div className="px-4 mb-20">
               {/* Red Date Bar */}
               <div className="bg-red-600 text-white text-[11px] font-black py-2.5 rounded-t-[20px] text-center uppercase tracking-wider px-4">
                  A oferta está disponível hoje: {new Date().toLocaleDateString('pt-BR')}
               </div>

               <div className="bg-white rounded-b-[40px] rounded-t-none p-1 border-4 border-t-0 border-green-600 mb-8 overflow-hidden shadow-2xl shadow-green-200 relative">
                  <div className="bg-green-600 text-white text-[12px] font-black text-center py-2.5 uppercase tracking-[0.2em]">Oferta Exclusiva Liberada</div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-10 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce shadow-lg">
                    85% OFF
                  </div>

                  <div className="p-8 text-center">
                     <p className="text-[15px] font-bold mb-6 text-slate-800 leading-tight">Acesso vitalício ao Movimento Materno</p>
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

               <button 
                 onClick={() => window.location.href = 'https://checkout.protocolodestrave.shop/VCCL1O8SD044'}
                 className="btn-primary w-full h-20 text-xl font-black uppercase tracking-wider shadow-2xl shadow-green-400 active:scale-95 transition-transform"
               >
                  Quero meu plano
               </button>

               <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500">
                     <Star className="w-3 h-3 fill-slate-400" />
                     ENTREGA IMEDIATA NO SEU E-MAIL
                  </div>
               </div>
            </div>

            {/* Legal Disclaimer Section */}
            <div className="px-6 pb-12 text-center">
              <div className="bg-slate-50 border border-slate-200 p-8 rounded-[40px] shadow-inner">
                <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-4">Aviso Legal</h4>
                <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                  Este produto não substitui o parecer médico profissional. Sempre consulte um médico para tratar de assuntos relativos à saúde. Recomendamos o acompanhamento médico com periodicidade e para tratamento de queixas.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="px-6 pb-32 text-left">
              <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">PERGUNTAS FREQUENTES:</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-slate-900 flex items-start gap-2 mb-2 leading-snug">
                    <span className="flex-shrink-0">🟢</span> Quero parto normal, esses exercícios ajudam?
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed pl-7">
                    Com certeza, você vai receber os melhores exercícios de fisio pélvica pensados para facilitar seu parto normal.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 flex items-start gap-2 mb-2 leading-snug">
                    <span className="flex-shrink-0">🟢</span> A partir de quantas semanas posso começar a praticar?
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed pl-7">
                    Você está recebendo exercícios que foram feitos para o corpo da grávida, por isso, pode começar a praticar a partir do momento que você descobre que está grávida até o dia do parto.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 flex items-start gap-2 mb-2 leading-snug">
                    <span className="flex-shrink-0">🟢</span> Tem vídeo demonstrando os exercícios?
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed pl-7">
                    Sim, no nosso plano você recebe um vídeo com o passo a passo e como realizar cada movimento da forma correta para que em poucos dias você comece a sentir os benefícios.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 flex items-start gap-2 mb-2 leading-snug">
                    <span className="flex-shrink-0">🟢</span> Onde receberei o acesso ao Plano de exercícios?
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed pl-7">
                    Você receberá acesso imediatamente após realizar a inscrição via whatsapp e e-mail.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 flex items-start gap-2 mb-2 leading-snug">
                    <span className="flex-shrink-0">🟢</span> Quanto tempo terei de acesso?
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed pl-7">
                    Você paga uma única vez o valor de R$29,90 e terá acesso por 12 meses a todo conteúdo
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'testimonials_grid':
        return (
          <div className="px-4 pt-10 pb-20 text-center">
             <h2 className="text-3xl font-bold text-slate-900 mb-2 leading-tight px-6 text-center">
               Relatos de grávidas que passaram pelo Movimento Materno.
             </h2>
             <p className="text-[13px] text-blue-900/60 font-medium mb-8 px-8 text-center mx-auto max-w-xs">
               Milhares de gestantes tiveram a gestação transformada com a ajuda do Movimento materno
             </p>

             <button onClick={() => nextStep('offer_final')} className="btn-primary bg-green-700 hover:bg-green-800 mb-12 uppercase tracking-wide">
               Continuar
             </button>

             <div className="space-y-8">
                {[
                  "https://i.ibb.co/chNrqnXV/Screenshot-14.png",
                  "https://i.ibb.co/9kdNmjDg/Screenshot-12.png",
                  "https://i.ibb.co/gMMRHj9w/Screenshot-13.png"
                ].map((url, i) => (
                  <div key={i} className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-slate-100 mx-auto max-w-[340px] transform hover:scale-[1.02] transition-transform duration-300">
                    <img src={url} className="w-full h-auto" alt={`Relato ${i + 1}`} referrerPolicy="no-referrer" />
                  </div>
                ))}
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
      
      <h2 className={`text-3xl font-bold mb-8 px-6 leading-tight ${progress === 94 ? 'text-red-600 mb-12' : 'text-slate-900'}`}>{title}</h2>
      
      {progress === 40 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-sm mx-auto px-4">
          <h3 className="text-lg font-bold text-slate-800">Enquanto isso: conheça a idealizadora do Movimento Materno</h3>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="https://i.ibb.co/cSttHKKr/enhanced-Gemini-Generated-Image-d9pmnpd9pmnpd9pm.png" 
              alt="Julia Mendes" 
              className="relative w-full h-auto rounded-[28px] shadow-xl border-4 border-white" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <div className="text-left space-y-3">
             <h4 className="font-bold text-lg text-slate-900">Julia Mendes</h4>
             <p className="text-[13px] leading-relaxed text-slate-600 italic">
               "Minha maior missão é ajudar o maior número de grávidas a terem <span className="text-black font-bold">o melhor parto possível</span>."
             </p>
          </div>
        </div>
      )}

      {progress === 94 && (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 px-4">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 px-2 leading-tight">
              Enquanto isso: conheça a idealizadora do Movimento Materno
            </h3>

            <div className="relative mb-10 max-w-[340px] mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-[40px] blur opacity-25 transition duration-1000"></div>
              <img 
                src="https://i.ibb.co/cSttHKKr/enhanced-Gemini-Generated-Image-d9pmnpd9pmnpd9pm.png" 
                alt="Julia Mendes" 
                className="relative w-full h-auto rounded-[36px] shadow-2xl border-4 border-white" 
                referrerPolicy="no-referrer" 
              />
            </div>

            {/* Bio Body Text */}
            <div className="text-left px-4 space-y-4 text-[15px] leading-relaxed text-slate-700">
               <p>Oii, Dona grávida. Sou a <span className="font-bold text-black">Julia Mendes</span>, Fisioterapeuta Pélvica e coordenadora de Pós-graduação em Fisioterapia Obstétrica.</p>
               <p><span className="font-bold text-black text-[16px]">Já atendi mais de 1500 grávidas pessoalmente</span> e milhares de outras através das minhas redes sociais e programas online.</p>
               <p>Minha maior missão é ajudar o maior número de grávidas a terem <span className="font-bold text-black">o melhor parto possível</span>.</p>
               <p>Saiba que será um prazer te ajudar. Conte comigo.</p>
            </div>
        </div>
      )}

      {progress === 85 && (
        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <h3 className="text-[17px] font-bold px-4 mb-8 leading-snug">
              Alunas que praticaram o <span className="text-primary-green">Movimento Materno</span> durante a gravidez, <span className="text-primary-green">realizadas depois de seu parto</span>
           </h3>
           
           <div className="px-4 relative h-[400px]">
              <TestimonialCarousel />
           </div>
        </div>
      )}
    </div>
  )
}

const TestimonialCarousel = () => {
  const images = [
    "https://i.ibb.co/wqxnvQ1/Screenshot-9.png",
    "https://i.ibb.co/DHhw5NzX/Screenshot-10.png",
    "https://i.ibb.co/ycbKPMpt/Screenshot-11.png"
  ];
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 1.1, x: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 bg-white rounded-[40px] shadow-2xl overflow-hidden border-4 border-white"
        >
          <img 
            src={images[index]} 
            className="w-full h-full object-cover" 
            alt={`Depoimento ${index + 1}`} 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-green-600 w-6' : 'bg-slate-300'}`} 
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const LeafIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.1 9.2A7 7 0 0 1 11 20Z" />
    <path d="M11 13a4 4 0 1 0-4-4" />
    <path d="M5 21v-3a2 2 0 1 1 4 0v3" />
  </svg>
);
