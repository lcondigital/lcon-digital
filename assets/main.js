const toggle=document.getElementById('toggle'),links=document.getElementById('links');
if(toggle){
  toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
  document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const translations={
  pt:{
    nav:{about:'Sobre',services:'Serviços',expertise:'Experiência',founder:'Fundador',approach:'Abordagem',contact:'Fale connosco'},
    hero:{eyebrow:'CONSULTORIA SAP · TRANSFORMAÇÃO DIGITAL',sub:'Consultoria SAP especializada e transformação digital, combinando experiência funcional, conhecimento técnico e uma abordagem orientada ao negócio.',founder:'Fundada por <strong>Leandro Costa</strong>',talk:'Fale connosco →',explore:'Conheça a nossa experiência'},
    strip:{finance:'Finance &amp; Transformation',cross:'Cross Module Integration and Implementation',processes:'Processos de Negócio',international:'Consultoria Internacional'},
    about:{eyebrow:'Sobre a LCON DIGITAL',title:'A tecnologia deve servir o negócio.',p1:'A LCON DIGITAL presta serviços especializados de consultoria SAP e transformação digital, com foco na compreensão do negócio, na simplificação da complexidade e na entrega de soluções práticas.',p2:'Ligamos requisitos funcionais, tecnologia e objetivos de negócio para ajudar as organizações a tirar maior partido do seu ecossistema SAP.',statement:'Não começamos pelo sistema.<br>Começamos pelo problema.'},
    services:{eyebrow:'O que fazemos',title:'Consultoria com propósito.',lead:'Experiência prática para organizações que enfrentam transformação SAP, otimização e requisitos de negócio complexos.',n1:'01 / CONSULTORIA',h1:'Consultoria SAP',p1:'Consultoria SAP funcional e orientada para soluções em ambientes S/4HANA e processos empresariais complexos.',n2:'02 / TRANSFORMAÇÃO',h2:'Transformação Financeira',p2:'Apoiamos as equipas financeiras na reformulação de processos, transformação SAP e melhoria da visibilidade sobre as operações financeiras.',n3:'03 / OTIMIZAÇÃO',h3:'Otimização de Processos de Negócio',p3:'Traduzimos requisitos de negócio em processos mais simples, eficientes e escaláveis.',n4:'04 / CONSULTORIA ESTRATÉGICA',h4:'Consultoria Tecnológica',p4:'Orientação funcional e técnica independente para iniciativas SAP, decisões de solução e programas de transformação digital.'},
    expertise:{eyebrow:'Experiência',title:'Conhecimento profundo de SAP.<br>Contexto de negócio.',lead:'Uma combinação de experiência funcional e conhecimento técnico orientada para transformar requisitos complexos em soluções práticas.',p1:'Transformação empresarial, desenho de soluções e integração de processos de negócio.',p2:'Contabilidade Financeira (incluindo FI-AA e FI-SL), Controlling (CO) e processos de negócio relacionados com a área financeira.',p3:'Cash and Liquidity Management (CLM) e SAP Cash Management, com experiência em RE-FX, Treasury and Risk Management (TRM/Loans), Advanced Financial Closing (AFC), Group Reporting e Public Sector Management (PSM).',h3:'Integração e Implementação Cross-Module',p4:'Experiência consolidada em integração cross-module, ligando FI/CO a MM, SD, PS, PP, PM, RAR e SAP Solution Manager.',h4:'Integração',p5:'Análise de requisitos e tradução dos mesmos em soluções SAP escaláveis.',h5:'Processos de Negócio',p6:'Implementações S/4HANA Greenfield e conversões Cloud Brownfield, com experiência prática em SAP Fiori, SAP Enable Now e debugging avançado de ABAP.',h6:'Transformação Digital'},
    founder:{eyebrow:'A pessoa por detrás da LCON DIGITAL',title:'Fundada por Leandro Costa.',role:'FUNDADOR & CONSULTOR SAP',p1:'Com mais de 6 anos de experiência como Senior SAP FI/CO/RE-FX Consultant e Team Leader, Leandro fundou a LCON DIGITAL para proporcionar uma abordagem mais focada e pragmática à consultoria SAP e à transformação digital.',p2:'O trabalho combina compreensão funcional, conhecimento técnico e um forte foco no problema de negócio por detrás de cada requisito SAP.',c1:'Greenfield & Brownfield',c2:'Processos financeiros',c3:'Visibilidade sobre cash & liquidez',c4:'Ligação entre ambas as perspetivas',c4title:'Negócio & Tecnologia',linkedin:'Ver LinkedIn →'},
    approach:{eyebrow:'A nossa abordagem',title:'Processo simples.<br>Problemas complexos resolvidos.',lead:'Uma abordagem colaborativa concebida para manter as iniciativas SAP focadas, transparentes e ligadas ao negócio.',n1:'01 / COMPREENDER',h1:'Compreender',p1:'Começamos pelo negócio, pelos seus processos, desafios e objetivos.',n2:'02 / DESENHAR',h2:'Desenhar',p2:'Traduzimos os requisitos em soluções práticas e sustentáveis.',n3:'03 / ENTREGAR',h3:'Entregar',p3:'Trabalhamos com as suas equipas para implementar, integrar e validar a solução.',n4:'04 / OTIMIZAR',h4:'Otimizar',p4:'Olhamos para além do go-live para identificar oportunidades de melhoria contínua.'},
    contact:{eyebrow:'Contacto',title:'Vamos construir algo melhor.',lead:'Tem um projeto SAP, uma iniciativa de transformação ou um desafio de negócio complexo? Conte-nos com o que está a trabalhar.',copy:'A LCON DIGITAL trabalha com organizações que procuram consultoria SAP experiente e pragmática e apoio na transformação digital.',email:'E-mail'},
    form:{name:'Nome',company:'Empresa',email:'E-mail',service:'Em que podemos ajudar?',sapConsulting:'Consultoria SAP',financial:'Transformação Financeira',optimization:'Otimização de Processos de Negócio',advisory:'Consultoria Tecnológica',other:'Outro',message:'Fale-nos sobre o seu projeto...',send:'Enviar mensagem →'},
    footer:{copyright:'© 2026 LCON DIGITAL. Todos os direitos reservados.',top:'Voltar ao topo ↑'},
    meta:{title:'LCON DIGITAL | Consultoria SAP & Transformação Digital',description:'A LCON DIGITAL presta consultoria SAP e serviços de transformação digital personalizados, adaptados ao seu negócio.'},
    status:{required:'Por favor, preencha os campos obrigatórios.',sending:'A enviar...',success:'Obrigado. A sua mensagem foi enviada com sucesso.',error:'Não foi possível enviar a sua mensagem neste momento. Tente novamente dentro de instantes.'},
    menu:{open:'Abrir menu',close:'Fechar menu'},lang:{toEnglish:'Mudar idioma para inglês',toPortuguese:'Mudar idioma para português'}
  },
  en:{
    nav:{about:'About',services:'Services',expertise:'Expertise',founder:'Founder',approach:'Approach',contact:"Let's talk"},
    hero:{eyebrow:'SAP CONSULTING · DIGITAL TRANSFORMATION',sub:'Specialized SAP consulting and digital transformation, combining functional expertise, technical understanding and a business-first mindset.',founder:'Founded by <strong>Leandro Costa</strong>',talk:"Let's talk →",explore:'Explore expertise'},
    strip:{finance:'Finance &amp; Transformation',cross:'Cross Module Integration and Implementation',processes:'Business Processes',international:'International Consulting'},
    about:{eyebrow:'About LCON DIGITAL',title:'Technology should serve the business.',p1:'LCON DIGITAL provides specialized SAP consulting and digital transformation services focused on understanding the business, simplifying complexity and delivering practical solutions.',p2:'We bridge functional requirements, technology and business objectives to help organizations make better use of their SAP landscape.',statement:"We don't start with the system.<br>We start with the problem."},
    services:{eyebrow:'What we do',title:'Consulting with a purpose.',lead:'Practical expertise for organizations navigating SAP transformation, optimization and complex business requirements.',n1:'01 / CONSULTING',h1:'SAP Consulting',p1:'Functional and solution-oriented SAP consulting for S/4HANA environments and complex enterprise processes.',n2:'02 / TRANSFORMATION',h2:'Financial Transformation',p2:'Supporting finance teams through process redesign, SAP transformation and improved visibility across financial operations.',n3:'03 / OPTIMIZATION',h3:'Business Process Optimization',p3:'Translating business requirements into simpler, more efficient and scalable processes.',n4:'04 / ADVISORY',h4:'Technology Advisory',p4:'Independent functional and technical guidance for SAP initiatives, solution decisions and digital transformation programs.'},
    expertise:{eyebrow:'Expertise',title:'Deep SAP knowledge.<br>Business context.',lead:'A combination of functional expertise and technical understanding designed to turn complex requirements into practical solutions.',p1:'Enterprise transformation, solution design and business process integration.',p2:'Financial Accounting (including FI-AA and FI-SL), Controlling (CO) and finance-related business processes.',p3:'Cash and Liquidity Management (CLM) and SAP Cash Management, with expertise in RE-FX, Treasury and Risk Management (TRM/Loans), Advanced Financial Closing (AFC), Group Reporting and Public Sector Management (PSM).',h3:'Cross Module Integration and Implementation',p4:'Consolidated cross-module integration experience connecting FI/CO with MM, SD, PS, PP, PM, RAR and SAP Solution Manager.',h4:'Integration',p5:'Requirement analysis and translation into scalable SAP solutions.',h5:'Business Processes',p6:'S/4HANA Greenfield implementations and Cloud Brownfield conversions, with hands-on SAP Fiori, SAP Enable Now and advanced ABAP debugging.',h6:'Digital Transformation'},
    founder:{eyebrow:'The person behind LCON DIGITAL',title:'Founded by Leandro Costa.',role:'FOUNDER & SAP CONSULTANT',p1:'With over 6 years of experience as a Senior SAP FI/CO/RE-FX Consultant and Team Leader, Leandro founded LCON DIGITAL to provide a more focused, pragmatic approach to SAP consulting and digital transformation.',p2:'The work combines functional understanding, technical awareness and a strong focus on the business problem behind every SAP requirement.',c1:'Greenfield & Brownfield',c2:'Financial processes',c3:'Cash & liquidity visibility',c4:'Bridging both perspectives',c4title:'Business & Technology',linkedin:'View LinkedIn →'},
    approach:{eyebrow:'Our approach',title:'Simple process.<br>Complex problems solved.',lead:'A collaborative approach designed to keep SAP initiatives focused, transparent and connected to the business.',n1:'01 / UNDERSTAND',h1:'Understand',p1:'We start with the business, its processes, challenges and objectives.',n2:'02 / DESIGN',h2:'Design',p2:'We translate requirements into practical and sustainable solutions.',n3:'03 / DELIVER',h3:'Deliver',p3:'We work with your teams to implement, integrate and validate the solution.',n4:'04 / OPTIMIZE',h4:'Optimize',p4:'We look beyond go-live to identify opportunities for continuous improvement.'},
    contact:{eyebrow:'Contact',title:"Let's build something better.",lead:"Have an SAP project, transformation initiative or complex business challenge? Tell us what you're working on.",copy:'LCON DIGITAL works with organizations looking for experienced, pragmatic SAP consulting and digital transformation support.',email:'E-mail'},
    form:{name:'Name',company:'Company',email:'Email',service:'What can we help you with?',sapConsulting:'SAP Consulting',financial:'Financial Transformation',optimization:'Business Process Optimization',advisory:'Technology Advisory',other:'Other',message:'Tell us about your project...',send:'Send message →'},
    footer:{copyright:'© 2026 LCON DIGITAL. All rights reserved.',top:'Back to top ↑'},
    meta:{title:'LCON DIGITAL | SAP Consulting & Digital Transformation',description:'LCON DIGITAL provides bespoke SAP consulting and digital transformation services, tailored digitally to your business.'},
    status:{required:'Please complete the required fields.',sending:'Sending...',success:'Thank you. Your message has been sent successfully.',error:'We could not send your message right now. Please try again in a moment.'},
    menu:{open:'Open menu',close:'Close menu'},lang:{toEnglish:'Switch language to English',toPortuguese:'Switch language to Portuguese'}
  }
};

let currentLang=localStorage.getItem('lcon-lang')||'pt';
const get=(obj,path)=>path.split('.').reduce((o,k)=>o&&o[k],obj);
function applyLanguage(lang){
  currentLang=lang;
  const dict=translations[lang];
  document.documentElement.lang=lang==='pt'?'pt-PT':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const value=get(dict,el.dataset.i18n);
    if(value!==undefined) el.innerHTML=value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const value=get(dict,el.dataset.i18nPlaceholder);
    if(value!==undefined) el.placeholder=value;
  });
  document.getElementById('pageTitle').textContent=dict.meta.title;
  document.getElementById('metaDescription').setAttribute('content',dict.meta.description);
  document.getElementById('ogTitle').setAttribute('content',dict.meta.title);
  document.getElementById('ogDescription').setAttribute('content',dict.meta.description);
  document.getElementById('twitterTitle').setAttribute('content',dict.meta.title);
  document.getElementById('twitterDescription').setAttribute('content',dict.meta.description);
  const langToggle=document.getElementById('langToggle');
  if(langToggle){
    langToggle.querySelector('.lang-current').textContent=lang==='pt'?'PT':'EN';
    langToggle.querySelector('.lang-alt').textContent=lang==='pt'?'EN':'PT';
    langToggle.setAttribute('aria-label',lang==='pt'?dict.lang.toEnglish:dict.lang.toPortuguese);
    langToggle.setAttribute('aria-pressed',lang==='en'?'true':'false');
  }
  if(toggle) toggle.setAttribute('aria-label',links.classList.contains('open')?dict.menu.close:dict.menu.open);
  const formStatus=document.getElementById('formStatus');
  if(formStatus && formStatus.dataset.i18nStatus) formStatus.textContent=dict.status[formStatus.dataset.i18nStatus]||'';
  localStorage.setItem('lcon-lang',lang);
}

const langToggle=document.getElementById('langToggle');
if(langToggle){langToggle.addEventListener('click',()=>applyLanguage(currentLang==='pt'?'en':'pt'));}
applyLanguage(currentLang);

// Privacy-aware first-party access logging. No tracking cookies are created.
try {
  const trackPayload = {
    path: window.location.pathname + window.location.hash,
    language: currentLang,
    referrer: document.referrer || ''
  };
  const body = JSON.stringify(trackPayload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
  } else {
    fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  }
} catch (_) {}

const contactForm=document.getElementById('contactForm');
const formStatus=document.getElementById('formStatus');
if(contactForm){
  contactForm.addEventListener('submit',async function(e){
    e.preventDefault();
    if(formStatus){formStatus.textContent='';formStatus.dataset.i18nStatus='';}
    const submitButton=contactForm.querySelector('button[type="submit"]');
    const f=new FormData(contactForm);
    if(f.get('website')) return;
    const payload={name:(f.get('name')||'').toString().trim().slice(0,200),company:(f.get('company')||'').toString().trim().slice(0,200),email:(f.get('email')||'').toString().trim().slice(0,200),service:(f.get('service')||'').toString().trim().slice(0,100),message:(f.get('message')||'').toString().trim().slice(0,3000)};
    if(!payload.name||!payload.email||!payload.message){if(formStatus){formStatus.dataset.i18nStatus='required';formStatus.textContent=translations[currentLang].status.required;}return;}
    submitButton.disabled=true;submitButton.dataset.originalText=submitButton.textContent;submitButton.textContent=translations[currentLang].status.sending;
    try{
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
      const result=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(result.error||'Unable to send your message.');
      contactForm.reset();
      if(formStatus){formStatus.dataset.i18nStatus='success';formStatus.textContent=translations[currentLang].status.success;}
    }catch(error){
      console.error(error);
      if(formStatus){formStatus.dataset.i18nStatus='error';formStatus.textContent=translations[currentLang].status.error;}
    }finally{
      submitButton.disabled=false;submitButton.textContent=translations[currentLang].form.send;
    }
  });
}
