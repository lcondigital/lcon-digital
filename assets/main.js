const toggle=document.getElementById('toggle'),links=document.getElementById('links');
toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const contactForm=document.getElementById('contactForm');
const formStatus=document.getElementById('formStatus');

if(contactForm){
  contactForm.addEventListener('submit',async function(e){
    e.preventDefault();
    if(formStatus) formStatus.textContent='';

    const submitButton=contactForm.querySelector('button[type="submit"]');
    const f=new FormData(contactForm);
    if(f.get('website')) return; // honeypot: bots should not reach the email service

    const payload={
      name:(f.get('name')||'').toString().trim().slice(0,200),
      company:(f.get('company')||'').toString().trim().slice(0,200),
      email:(f.get('email')||'').toString().trim().slice(0,200),
      service:(f.get('service')||'').toString().trim().slice(0,100),
      message:(f.get('message')||'').toString().trim().slice(0,3000)
    };

    if(!payload.name || !payload.email || !payload.message){
      if(formStatus) formStatus.textContent='Please complete the required fields.';
      return;
    }

    submitButton.disabled=true;
    submitButton.dataset.originalText=submitButton.textContent;
    submitButton.textContent='Sending...';

    try{
      const response=await fetch('/api/contact',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload)
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(result.error||'Unable to send your message.');

      contactForm.reset();
      if(formStatus) formStatus.textContent='Thank you. Your message has been sent successfully.';
    }catch(error){
      console.error(error);
      if(formStatus) formStatus.textContent='We could not send your message right now. Please try again in a moment.';
    }finally{
      submitButton.disabled=false;
      submitButton.textContent=submitButton.dataset.originalText||'Send message →';
    }
  });
}
