const toggle=document.getElementById('toggle'),links=document.getElementById('links');
if(toggle){
  toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
  document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const translations={
  pt:{
    nav:{about:'Sobre',services:'Serviços',expertise:'Experiência',founder:'Fundador',impact:'Impacto',approach:'Abordagem',contact:'Fale connosco'},
    hero:{eyebrow:'CONSULTORIA SAP · TRANSFORMAÇÃO DIGITAL',sub:'Arquitetura SAP Premium, core integrations e parceria executiva para transformar sistemas críticos de negócio em motores de crescimento.',founder:'Fundada por <strong>Leandro Costa</strong>',talk:'Fale connosco →',explore:'Conheça a nossa experiência'},
    strip:{finance:'Arquitetura & SAP Finance',cross:'Core & Cross-Module Integration',processes:'Executive Partnership',international:'Consultoria Internacional'},
    about:{eyebrow:'Sobre a LCON DIGITAL',title:'A tecnologia deve servir o negócio.',p1:'Oferecemos mapeamento estratégico de SAP landscapes totalmente personalizado para estruturas empresariais complexas, garantindo migrações seguras, implementações sólidas e a otimização contínua de sistemas críticos.',p2:'Atuamos como parceiros executivos de elite, ligando a visão técnica ao crescimento do negócio para assegurar resiliência e agilidade a longo prazo.',statement:'Não começamos pelo sistema.<br>Começamos pelo problema.'},
    services:{eyebrow:'O que fazemos',title:'Consultoria com propósito.',lead:'Experiência estratégica e técnica para organizações em momentos críticos de transformação SAP e otimização de arquitetura.',n1:'01 / ARCHITECTURE',h1:'Arquitetura SAP Premium',p1:'Mapeamento estratégico e desenho de soluções SAP personalizadas para estruturas empresariais complexas.',n2:'02 / TRANSFORMATION',h2:'Seamless Core Integrations',p2:'Migrações seguras, implementações end-to-end e otimização contínua do desempenho de sistemas financeiros críticos.',n3:'03 / STRATEGY',h3:'Parceria Executiva',p3:'Consultoria de elite para garantir resiliência, agilidade operacional e suporte a decisões de elevado impacto.',n4:'04 / INNOVATION',h4:'Tech Transformation',p4:'Especialistas em implementações S/4HANA Greenfield, conversões Cloud Brownfield e adoção de tecnologias modernas SAP.'},
    expertise:{eyebrow:'Experiência',title:'Conhecimento profundo de SAP.<br>Contexto de negócio.',lead:'Uma combinação de arquitetura estratégica, domínio funcional de módulos chave e capacitação técnica avançada.',p1:'Transformação empresarial, desenho de soluções e integração de processos de negócio.',h2:'SAP Finance (Core & Specialties)',p2:'Domínio especialista em FI (incluindo FI-AA e FI-SL), RE-FX, TRM/LOANS, Cash Management, CO, PSM, AFC, BCM e Group Reporting (GR).',h3:'Implementação Especializada de Módulos',p3:'Liderança de equipas e implementação especialista em projetos S/4HANA (Greenfield & Conversões), cobrindo soluções chave de Gestão Financeira, Imobiliária e Sector Público.',h4:'Cross-Module Integration',p4:'Experiência consolidada na integração de módulos transversais, ligando áreas financeiras a MM, SD, PS, PP, PM, RAR e SAP Solution Manager.',h5:'Processos de Negócio',p5:'Análise de requisitos e tradução dos mesmos em soluções SAP escaláveis.',h6:'Tech Transformation',p6:'Especialista em implementações S/4HANA Greenfield, conversões Cloud Brownfield, SAP Fiori, SAP Enable Now e ABAP Debugging avançado.'},
    founder:{eyebrow:'A pessoa por detrás da LCON DIGITAL',title:'Fundada por Leandro Costa.',role:'FUNDADOR & CONSULTOR SAP',p1:'Com quase 10 anos de experiência em projetos SAP — incluindo 6 anos dedicados exclusivamente aos módulos financeiros como Senior SAP FI/CO/RE-FX Consultant e Team Leader —, Leandro fundou a LCON DIGITAL para proporcionar uma abordagem mais focada e pragmática à consultoria SAP e à transformação digital.',p2:'O trabalho combina compreensão funcional, conhecimento técnico e um forte foco no problema de negócio por detrás de cada requisito SAP.',c1:'Greenfield & Brownfield',c2:'Processos financeiros avançados',c3:'Visibilidade e controlo de liquidez',c4:'Ligação entre ambas as perspetivas',c4title:'Negócio & Tecnologia',linkedin:'Ver LinkedIn →'},
    impact:{eyebrow:'Impacto',title:'Confiança em programas SAP à escala nacional.',lead:'Dois projetos de referência no setor público sustentam esta experiência, com responsabilidade sobre milhares de milhões de euros em ativos públicos.',tag1:'S/4HANA GREENFIELD IMPLEMENTATION',desc1:'em reservas financeiras geridas por uma das maiores entidades públicas de proteção social do país.',sub1:'€25B+ processados anualmente em receita.',tag2:'S/4HANA BROWNFIELD CONVERSION',desc2:'em capitais próprios geridos por um operador nacional de infraestruturas de transporte.',sub2:'€1.5B+ em receitas operacionais anuais.',note:'Valores baseados nos relatórios e contas públicos mais recentes de cada organização. Os nomes dos clientes não são divulgados por motivos de confidencialidade.'},
    approach:{eyebrow:'A nossa abordagem',title:'Processo simples.<br>Problemas complexos resolvidos.',lead:'Uma abordagem colaborativa concebida para manter as iniciativas SAP focadas, transparentes e ligadas ao negócio.',n1:'01 / COMPREENDER',h1:'Compreender',p1:'Começamos pelo negócio, pelos seus processos, desafios e objetivos.',n2:'02 / DESENHAR',h2:'Desenhar',p2:'Traduzimos os requisitos em soluções práticas e sustentáveis.',n3:'03 / ENTREGAR',h3:'Entregar',p3:'Trabalhamos com as suas equipas para implementar, integrar e validar a solução.',n4:'04 / OTIMIZAR',h4:'Otimizar',p4:'Olhamos para além do go-live para identificar oportunidades de melhoria contínua.'},
    contact:{eyebrow:'Contacto',title:'Vamos construir algo melhor.',lead:'Tem um projeto SAP, uma iniciativa de transformação ou um desafio de negócio complexo? Conte-nos com o que está a trabalhar.',copy:'A LCON DIGITAL trabalha com organizações que procuram consultoria SAP experiente e pragmática e apoio na transformação digital.',email:'E-mail'},
    form:{name:'Nome',company:'Empresa',email:'E-mail',service:'Em que podemos ajudar?',sapConsulting:'Consultoria SAP',financial:'Transformação Financeira',optimization:'Otimização de Processos de Negócio',advisory:'Consultoria Tecnológica',other:'Outro',message:'Fale-nos sobre o seu projeto...',send:'Enviar mensagem →'},
    footer:{copyright:'© 2026 LCON DIGITAL. Todos os direitos reservados.',top:'Voltar ao topo ↑'},
    meta:{title:'LCON DIGITAL | Consultoria SAP & Transformação Digital',description:'A LCON DIGITAL presta consultoria SAP e serviços de transformação digital personalizados, adaptados ao seu negócio.'},
    status:{required:'Por favor, preencha os campos obrigatórios.',sending:'A enviar...',success:'Obrigado. A sua mensagem foi enviada com sucesso.',error:'Não foi possível enviar a sua mensagem neste momento. Tente novamente dentro de instantes.'},
    menu:{open:'Abrir menu',close:'Fechar menu'},lang:{toEnglish:'Mudar idioma para inglês',toPortuguese:'Mudar idioma para português'}
  },
  en:{
    nav:{about:'About',services:'Services',expertise:'Expertise',founder:'Founder',impact:'Impact',approach:'Approach',contact:"Let's talk"},
    hero:{eyebrow:'SAP CONSULTING · DIGITAL TRANSFORMATION',sub:'Premium SAP Architecture, core integrations, and executive partnership to turn critical business systems into growth drivers.',founder:'Founded by <strong>Leandro Costa</strong>',talk:"Let's talk →",explore:'Explore expertise'},
    strip:{finance:'SAP Architecture & Finance',cross:'Core & Cross-Module Integration',processes:'Executive Partnership',international:'International Consulting'},
    about:{eyebrow:'About LCON DIGITAL',title:'Technology should serve the business.',p1:'We provide strategic mapping of SAP landscapes tailored to complex corporate structures, ensuring secure migrations, robust implementations, and continuous optimization of critical systems.',p2:'We act as elite executive partners, bridging technical execution with business growth to guarantee long-term resilience and agility.',statement:"We don't start with the system.<br>We start with the problem."},
    services:{eyebrow:'What we do',title:'Consulting with a purpose.',lead:'Strategic and technical expertise for organizations facing critical SAP transformation and architecture optimization.',n1:'01 / ARCHITECTURE',h1:'Premium SAP Architecture',p1:'Strategic mapping and bespoke SAP solution design for complex enterprise environments.',n2:'02 / TRANSFORMATION',h2:'Seamless Core Integrations',p2:'Secure migrations, end-to-end implementations, and continuous performance optimization for critical financial systems.',n3:'03 / STRATEGY',h3:'Executive Partnership',p3:'Elite advisory ensuring resilience, operational agility, and guidance on high-impact technical decisions.',n4:'04 / INNOVATION',h4:'Tech Transformation',p4:'Expertise in S/4HANA Greenfield implementations, Cloud Brownfield conversions, and modern SAP technologies.'},
    expertise:{eyebrow:'Expertise',title:'Deep SAP knowledge.<br>Business context.',lead:'A blend of strategic architecture, deep core module mastery, and advanced technical execution.',p1:'Enterprise transformation, solution design and business process integration.',h2:'SAP Finance (Core & Specialties)',p2:'Specialized expertise in FI (including FI-AA and FI-SL), RE-FX, TRM/LOANS, Cash Management, CO, PSM, AFC, BCM, and Group Reporting (GR).',h3:'Specialized Module Implementation',p3:'Expert team leadership and implementation for S/4HANA projects (greenfield & conversions), covering key Financial, Real Estate, and Public Sector solutions.',h4:'Cross-Module Integration',p4:'Consolidated cross-module integration experience connecting financial domains with MM, SD, PS, PP, PM, RAR, and SAP Solution Manager.',h5:'Business Processes',p5:'Requirement analysis and translation into scalable SAP solutions.',h6:'Tech Transformation',p6:'Specialized in S/4HANA Greenfield implementations, Cloud Brownfield conversions, SAP Fiori, SAP Enable Now, and advanced ABAP debugging.'},
    founder:{eyebrow:'The person behind LCON DIGITAL',title:'Founded by Leandro Costa.',role:'FOUNDER & SAP CONSULTANT',p1:'With nearly 10 years of experience in SAP projects — including 6 years exclusively dedicated to financial modules as a Senior SAP FI/CO/RE-FX Consultant and Team Leader —, Leandro founded LCON DIGITAL to provide a more focused, pragmatic approach to SAP consulting and digital transformation.',p2:'The work combines functional understanding, technical awareness and a strong focus on the business problem behind every SAP requirement.',c1:'Greenfield & Brownfield',c2:'Advanced financial processes',c3:'Cash visibility & liquidity control',c4:'Bridging both perspectives',c4title:'Business & Technology',linkedin:'View LinkedIn →'},
    impact:{eyebrow:'Impact',title:'Trusted with national-scale SAP programs.',lead:'Two flagship public-sector engagements underpin this experience, carrying responsibility over billions of euros in public assets.',tag1:'S/4HANA GREENFIELD IMPLEMENTATION',desc1:'in financial reserves managed by one of the largest public social-protection institutions in the country.',sub1:'€25B+ processed annually in revenue.',tag2:'S/4HANA BROWNFIELD CONVERSION',desc2:'in equity managed by a national transport infrastructure operator.',sub2:'€1.5B+ in annual operating revenue.',note:'Figures based on the latest publicly available annual report of each organization. Client names are withheld for confidentiality.'},
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
