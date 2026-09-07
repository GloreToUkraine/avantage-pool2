const menu=document.querySelector('.menu');const nav=document.querySelector('.nav');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.style.display=open?'none':'flex';if(!open){Object.assign(nav.style,{position:'absolute',top:'72px',left:'0',right:'0',background:'#f4f4ef',padding:'30px 6vw',flexDirection:'column',fontSize:'20px'})}});

const contactForm=document.querySelector('#contact-form');
contactForm?.addEventListener('submit',async(event)=>{
  event.preventDefault();
  const button=contactForm.querySelector('button[type="submit"]');
  const status=contactForm.querySelector('.form-status');
  const originalText=button.innerHTML;
  button.disabled=true;
  button.innerHTML='Надсилаємо… <span>↗</span>';
  status.textContent='';
  try{
    const response=await fetch(contactForm.action,{method:'POST',body:new FormData(contactForm),headers:{Accept:'application/json'}});
    const result=await response.json();
    if(!response.ok||result.success==='false')throw new Error('Submission failed');
    contactForm.reset();
    status.textContent='Дякуємо! Заявку надіслано. Ми зв’яжемося з вами найближчим часом.';
    status.className='form-status success';
  }catch(error){
    status.textContent='Не вдалося надіслати заявку. Зателефонуйте нам: +38 067 444 52 10.';
    status.className='form-status error';
  }finally{
    button.disabled=false;
    button.innerHTML=originalText;
  }
});
