import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ChevronLeft, Sparkles, Heart, Crown } from 'lucide-react';

const girlArt = 'https://raw.githubusercontent.com/zulqarnainhaider7116-art/Login-dashboard-/main/src/assets/girl-character.png';
const boyArt = 'https://raw.githubusercontent.com/zulqarnainhaider7116-art/Login-dashboard-/main/src/assets/boy-character.png';

type Props = { gender: 'boy' | 'girl'; onBack: () => void; onLogin: () => void };
export const RegisterScreen: React.FC<Props> = ({ gender, onBack, onLogin }) => {
  const girl = gender === 'girl';
  const [name,setName] = useState('');
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirm,setConfirm] = useState('');
  const [visible,setVisible] = useState(false);
  const [message,setMessage] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !email.trim() || !password) { setMessage('Please complete every field.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMessage('Enter a valid email address.'); return; }
    if (password.length < 8) { setMessage('Password must contain at least 8 characters.'); return; }
    if (password !== confirm) { setMessage('Passwords do not match.'); return; }
    setMessage('Your details are valid. Account creation needs a real authentication provider; no account has been created yet.');
  };
  return <main className={`min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4 py-8 ${girl ? 'bg-gradient-to-br from-[#FCE7F3] via-[#F5F3FF] to-[#EDE9FE]' : 'bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-[#CFFAFE]'}`}>
    <div className={`absolute -top-24 -left-20 w-96 h-96 rounded-full blur-3xl opacity-60 ${girl?'bg-pink-300':'bg-blue-300'}`}/>
    <div className={`absolute -bottom-24 -right-20 w-96 h-96 rounded-full blur-3xl opacity-60 ${girl?'bg-purple-300':'bg-cyan-300'}`}/>
    <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-[1.05fr_.95fr] gap-8 lg:gap-14 items-center">
      <motion.section initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} className="hidden lg:flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-white px-4 py-2 text-xs font-bold text-slate-600 shadow-lg backdrop-blur-xl"><Sparkles size={15}/> YOUR MUSIC, YOUR WORLD</div>
        <h1 className="font-display text-5xl xl:text-6xl font-black text-slate-900 mt-6 leading-tight">Join the <span className={girl?'text-purple-600':'text-blue-600'}>ZXH</span><br/>music universe.</h1>
        <p className="text-slate-600 max-w-md mt-4 leading-relaxed">Create your profile and make every listening moment yours.</p>
        <motion.img animate={{y:[0,-10,0],rotate:[0,1,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}} src={girl?girlArt:boyArt} alt={girl?'3D girl and kitten companion':'3D boy and puppy companion'} className="w-full max-w-[440px] max-h-[470px] object-contain drop-shadow-2xl mt-3"/>
      </motion.section>
      <motion.img src={girl?girlArt:boyArt} alt={girl?'3D girl and kitten companion':'3D boy and puppy companion'} initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} className="lg:hidden mx-auto w-40 h-36 object-contain drop-shadow-2xl" />
      <motion.section initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} className="w-full max-w-[510px] mx-auto rounded-[34px] sm:rounded-[42px] bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_30px_90px_-30px_rgba(60,50,100,.35)] p-6 sm:p-9">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-slate-600 font-bold text-sm hover:opacity-70"><ChevronLeft size={18}/> Back</button>
        <div className="mt-5 mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${girl?'bg-gradient-to-br from-pink-500 to-purple-600':'bg-gradient-to-br from-blue-500 to-cyan-600'}`}>{girl?<Heart size={22}/>:<Crown size={22}/>}</div>
          <p className="text-xs font-extrabold tracking-[.22em] text-slate-400 mt-5">ZXH OFFICIAL</p>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mt-1">Create account</h2>
          <p className="text-sm text-slate-500 mt-2">Start your personal music journey.</p>
        </div>
        <form onSubmit={submit} className="space-y-3.5">
          {[[name,setName,'Full name',User,'text'],[username,setUsername,'Username',User,'text'],[email,setEmail,'Email address',Mail,'email']] .map(([value,setter,placeholder,Icon,type]:any)=> <label className="block" key={placeholder}><span className="sr-only">{placeholder}</span><div className="flex items-center gap-3 rounded-2xl bg-white/85 border border-slate-200/80 px-4 h-13 shadow-[inset_0_2px_5px_rgba(15,23,42,.04)] focus-within:ring-2 focus-within:ring-purple-300"><Icon size={18} className="text-slate-400"/><input required type={type} value={value} onChange={e=>setter(e.target.value)} placeholder={placeholder} className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"/></div></label>)}
          <label className="block"><span className="sr-only">Password</span><div className="flex items-center gap-3 rounded-2xl bg-white/85 border border-slate-200/80 px-4 h-13"><Lock size={18} className="text-slate-400"/><input required minLength={8} type={visible?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password (8+ characters)" className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"/><button type="button" onClick={()=>setVisible(!visible)} aria-label="Toggle password visibility">{visible?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
          <label className="block"><span className="sr-only">Confirm password</span><div className="flex items-center gap-3 rounded-2xl bg-white/85 border border-slate-200/80 px-4 h-13"><Lock size={18} className="text-slate-400"/><input required type={visible?'text':'password'} value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm password" className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"/></div></label>
          {message && <p role="status" className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs leading-relaxed text-amber-800">{message}</p>}
          <button type="submit" className={`w-full h-13 rounded-2xl text-white font-extrabold tracking-wide flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all ${girl?'bg-gradient-to-r from-fuchsia-500 to-violet-600 shadow-purple-500/25':'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-blue-500/25'}`}>Create account <ArrowRight size={18}/></button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6">Already have an account? <button onClick={onLogin} className={`font-extrabold ${girl?'text-purple-700':'text-blue-700'}`}>Sign in</button></p>
        <p className="text-center text-[10px] text-slate-400 mt-5">Created by ZULQARNAIN X HAIDER · Powered by ZXH OFFICIAL</p>
      </motion.section>
    </div>
  </main>;
};
export default RegisterScreen;
