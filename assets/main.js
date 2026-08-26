const toggle=document.getElementById('toggle'),links=document.getElementById('links');
toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const contactForm=document.getElementById('contactForm');
contactForm.addEventListener('submit',function(e){
  e.preventDefault();
  const f=new FormData(contactForm);
  if(f.get('website')){return;} // honeypot: campo invisível, só bots o preenchem
  const name=(f.get('name')||'').toString().slice(0,200);
  const company=(f.get('company')||'').toString().slice(0,200);
  const email=(f.get('email')||'').toString().slice(0,200);
  const service=(f.get('service')||'').toString().slice(0,100);
  const message=(f.get('message')||'').toString().slice(0,3000);
  const body=`Name: ${name}\nCompany: ${company}\nEmail: ${email}\nService: ${service}\n\n${message}`;
  const subject=`New contact from ${name || 'website'}`;
  window.location.href=`mailto:geral@lcon-digital.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
