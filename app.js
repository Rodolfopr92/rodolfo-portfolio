const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const C=window.PORTFOLIO;
let lang="pt";
let mode="";
let activeFilter="all";
let deckIndex=0,deckVisualIndex=2,deckTimer=null,deckTransitionTimer=null,deckBusy=false;
const DECK_INTERVAL=8200,DECK_TRANSITION=880;

const icons={
 chart:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10m6 10V4m6 16v-7m4 7H2"/></svg>`,
 box:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10"/></svg>`,
 file:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6"/></svg>`,
 pie:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v10h10A10 10 0 1 1 12 2Z"/><path d="M15 2.5A10 10 0 0 1 21.5 9H15Z"/></svg>`,
 target:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m15 9 6-6"/></svg>`,
 store:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9 4.5 4h15L21 9"/><path d="M5 13v7h14v-7M9 20v-6h6v6"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/></svg>`
};
const socialIcons={
 linkedin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
 commercial:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9 4.5 4h15L21 9"/><path d="M5 13v7h14v-7M9 20v-6h6v6"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/></svg>`,
 github:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.7-1.6 6.7-7.5A5.8 5.8 0 0 0 19.2 3 5.4 5.4 0 0 0 19.1 1S18 .7 15 2.5a13.4 13.4 0 0 0-7 0C5 .7 3.9 1 3.9 1a5.4 5.4 0 0 0-.1 2A5.8 5.8 0 0 0 2.3 7c0 5.9 3.4 7.1 6.7 7.5A4.8 4.8 0 0 0 8 18v4"/><path d="M8 19c-3 .9-3-2-4-2"/></svg>`,
 whatsapp:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-4.7A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.2 7.8c.7 3.2 2.8 5.3 6 6.1M8.2 7.8l1.6-.8m4.4 6.9 1.1-1.4"/></svg>`,
 telegram:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m22 2-7.2 20-4.1-8.2L2 9.4 22 2Z"/><path d="m22 2-11.3 11.8"/></svg>`
};
const t=v=>typeof v==="string"?v:(v?.[lang]??"");
const ui=k=>t(C.ui?.[k]??k);
const getMode=()=>innerWidth>=1200?"desktop":innerWidth>=768?"tablet":"mobile";
const imageFor=(p,mobile=false,preview=false)=>mobile?(p.mobileImage||p.image):(preview?(p.previewImage||p.image):p.image);

function syncText(){
 document.documentElement.lang=lang==="pt"?"pt-BR":"en";
 $$('[data-copy="role"]').forEach(n=>n.textContent=t(C.profile.role));
 $$('[data-copy="headline"]').forEach(n=>n.textContent=t(C.profile.headline));
 $$('[data-copy="location"]').forEach(n=>n.textContent=C.profile.location);
 $$('[data-i18n]').forEach(n=>{const v=ui(n.dataset.i18n);if(v)n.textContent=v});
 $$('#languageToggle [data-lang]').forEach(b=>{const on=b.dataset.lang===lang;b.setAttribute('aria-pressed',String(on));b.classList.toggle('active',on)});
}
function configureLinks(){
 $$('a[href="https://example.com/diagnostico"]').forEach(a=>a.href=C.profile.diagnosis);
 $$('a[href="https://example.com"]').forEach(a=>a.href=C.profile.contacts.commercial.url||'#');
}
function metricMarkup(m){return `<article class="metric"><strong>${m.value}</strong><span>${t(m.label)}</span><small>${t(m.note)}</small></article>`}
function renderMetrics(sel){const e=$(sel);if(e)e.innerHTML=C.metrics.map(metricMarkup).join('')}
function featured(){return C.projects.find(p=>p.id===C.featuredProjectId)||C.projects[0]}
function heroProjectMarkup(mobile=false){const p=featured();return `<button class="hero-project-card" type="button" data-project="${p.id}" aria-label="${ui('openProject')}: ${t(p.title)}"><img src="${imageFor(p,mobile,!mobile)}" alt="${t(p.title)}" ${mobile?'fetchpriority="high"':'loading="lazy" decoding="async" fetchpriority="low"'}><span class="hero-project-scrim"></span><span class="hero-project-badge">${ui('featuredProject')}</span><span class="hero-project-copy"><strong>${t(p.title)}</strong><small>${t(p.summary)}</small><em>${ui('openProject')} ↗</em></span></button>`}
function deliverMarkup(){return C.services.map(s=>`<div class="deliver-item">${icons[s.icon]}<span>${t(s.title)}</span></div>`).join('')}
function serviceMarkup(s,mobile=false){return `<article class="${mobile?'mobile-service-card':'method-card'}"><header>${icons[s.icon]}<h3>${t(s.title)}</h3></header><p>${mobile?t(s.detail):t(s.short)}</p><a href="${s.href}" target="_blank" rel="noreferrer">${lang==='pt'?'Conhecer serviço ↗':'Explore service ↗'}</a></article>`}
function methodMarkup(m){return `<button class="method-step" type="button"><span>${m.n}</span><strong>${t(m.title)}</strong><p>${t(m.text)}</p></button>`}
function experienceMarkup(){return C.experience.map((e,i)=>`<div class="experience-entry"><div class="experience-icon">${i?'▦':'◎'}</div><div><strong>${t(e.role)}</strong><span>${t(e.org)}</span><span>${e.period}</span></div></div>`).join('')}
function projectCard(p,mobile=false,deck=false,clone=false){
 const src=imageFor(p,mobile,!mobile);
 if(deck)return `<article class="project-card classic-deck-card${clone?' is-clone':''}" tabindex="${clone?'-1':'0'}" role="button" data-project="${p.id}" data-accent="${p.accent||'cyan'}" aria-hidden="${clone?'true':'false'}"><div class="project-visual"><img src="${src}" alt="${clone?'':t(p.title)}" loading="lazy" decoding="async" fetchpriority="${clone?'low':'auto'}" ${clone?'aria-hidden="true"':''}><div class="project-copy project-copy-glass"><span>${t(p.tag)}</span><h4>${t(p.title)}</h4><p>${t(p.summary)}</p></div></div></article>`;
 return `<article class="project-card" tabindex="0" role="button" data-project="${p.id}" data-accent="${p.accent||'cyan'}"><img src="${src}" alt="${t(p.title)}" loading="lazy" decoding="async"><div class="project-copy"><span>${t(p.tag)}</span><h4>${t(p.title)}</h4><p>${t(p.summary)}</p></div></article>`
}

function renderContacts(){
 const order=['linkedin','commercial','github','whatsapp','telegram'];
 const button=k=>{const x=C.profile.contacts[k],label=t(x.label),enabled=Boolean(x.enabled&&x.url),tag=enabled?'a':'button',href=enabled?` href="${x.url}" target="_blank" rel="noreferrer"`:'',disabled=enabled?'':` type="button" data-contact-disabled="${k}" aria-disabled="true"`;return `<${tag}${href}${disabled} class="contact-button contact-${k}${enabled?'':' is-disabled'}" aria-label="${label}" data-label="${label}">${socialIcons[k]}</${tag}>`};
 const h=$('#headerContacts');if(h)h.innerHTML=order.map(button).join('');
 const f=$('#footerContacts');if(f)f.innerHTML=order.map(k=>{const x=C.profile.contacts[k],label=t(x.label),enabled=Boolean(x.enabled&&x.url),tag=enabled?'a':'button',href=enabled?` href="${x.url}" target="_blank" rel="noreferrer"`:'',disabled=enabled?'':` type="button" data-contact-disabled="${k}" aria-disabled="true"`;return `<${tag}${href}${disabled} class="contact-button contact-${k}${enabled?'':' is-disabled'}" aria-label="${label}" data-label="${label}">${socialIcons[k]}<span>${label}</span></${tag}>`}).join('')}

function clearDeck(){clearTimeout(deckTimer);clearTimeout(deckTransitionTimer);const d=$('#desktopProjects');if(d){d.innerHTML='';d.style.transform='';d.style.transition=''}const dots=$('#projectDeckDots');if(dots)dots.innerHTML=''}
function filtered(){return C.projects.filter(p=>activeFilter==='all'||p.category===activeFilter)}
function deckStep(){const d=$('#desktopProjects'),c=d?.querySelector('.classic-deck-card');if(!d||!c)return 0;return c.getBoundingClientRect().width+parseFloat(getComputedStyle(d).gap||0)}
function positionDeck(animate=true){const d=$('#desktopProjects');if(!d)return;d.style.willChange=animate?'transform':'auto';d.style.transition=animate?`transform ${DECK_TRANSITION}ms cubic-bezier(.19,.78,.18,1)`:'none';d.style.transform=`translate3d(${-deckVisualIndex*deckStep()}px,0,0)`}
function updateDots(){const items=filtered(),dots=$('#projectDeckDots');if(dots)dots.innerHTML=items.map((p,i)=>`<button type="button" class="${i===deckIndex?'active':''}" data-deck-index="${i}" aria-label="${t(p.title)}"></button>`).join('')}
function resetDeck(){clearTimeout(deckTimer);if(mode==='desktop'&&filtered().length>1&&!matchMedia('(prefers-reduced-motion: reduce)').matches)deckTimer=setTimeout(()=>moveDeck(1),DECK_INTERVAL)}
function buildDeck(){if(mode!=='desktop')return;const d=$('#desktopProjects'),items=filtered();if(!d)return;deckIndex=Math.min(deckIndex,Math.max(0,items.length-1));if(items.length===1){deckVisualIndex=0;d.innerHTML=projectCard(items[0],false,true)}else{const pre=[items[(items.length-2+items.length)%items.length],items[items.length-1]],post=[items[0],items[1]];d.innerHTML=[...pre.map(p=>projectCard(p,false,true,true)),...items.map(p=>projectCard(p,false,true)),...post.map(p=>projectCard(p,false,true,true))].join('');deckVisualIndex=deckIndex+2}requestAnimationFrame(()=>positionDeck(false));updateDots();resetDeck()}
function moveDeck(step){const items=filtered(),d=$('#desktopProjects');if(mode!=='desktop'||!d||items.length<2||deckBusy)return;deckBusy=true;clearTimeout(deckTimer);deckIndex=(deckIndex+step+items.length)%items.length;deckVisualIndex+=step;updateDots();positionDeck(true);deckTransitionTimer=setTimeout(()=>{if(deckVisualIndex>=items.length+2)deckVisualIndex=2;else if(deckVisualIndex<=1)deckVisualIndex=items.length+1;positionDeck(false);deckBusy=false;resetDeck()},DECK_TRANSITION+60)}
function renderFilters(){const e=$('#desktopProjectFilters');if(!e)return;const labels={all:{pt:'Todos',en:'All'},finance:{pt:'Financeiro',en:'Finance'},inventory:{pt:'Estoque',en:'Inventory'},migration:{pt:'Migração',en:'Migration'},security:{pt:'Segurança',en:'Security'},ecommerce:{pt:'E-commerce',en:'E-commerce'}};e.innerHTML=Object.entries(labels).map(([k,v])=>`<button class="${k===activeFilter?'active':''}" data-filter="${k}">${t(v)}</button>`).join('')}

function renderDesktop(){
 clearDeck();renderMetrics('#desktopMetrics');$('#desktopDeliverables').innerHTML=deliverMarkup();$('#desktopMethod').innerHTML=C.method.map(methodMarkup).join('');renderFilters();buildDeck();
}
function renderTablet(){
 clearDeck();$('#tabletFeaturedProject').innerHTML=heroProjectMarkup(false);renderMetrics('#tabletMetrics');$('#tabletDeliverables').innerHTML=deliverMarkup();$('#tabletServices').innerHTML=C.services.map(s=>serviceMarkup(s)).join('');$('#tabletMethod').innerHTML=C.method.map(m=>`<article class="method-card"><span>${m.n}</span><strong>${t(m.title)}</strong><p>${t(m.text)}</p></article>`).join('');$('#tabletExperience').innerHTML=experienceMarkup();$('#tabletProjectStrip').innerHTML=C.projects.map(p=>projectCard(p,false)).join('');
}
function renderMobile(){
 clearDeck();$('#mobileFeaturedProject').innerHTML=heroProjectMarkup(true);renderMetrics('#mobileMetrics');$('#mobileServices').innerHTML=C.services.map(s=>serviceMarkup(s,true)).join('');$('#mobileProjectStrip').innerHTML=C.projects.map(p=>projectCard(p,true)).join('');$('#mobileExperience').innerHTML=experienceMarkup();$('#mobileMethod').innerHTML=C.method.map(m=>`<article class="mobile-method-entry"><button type="button"><span>${m.n}</span><strong>${t(m.title)}</strong><b>+</b></button><p>${t(m.text)}</p></article>`).join('');
}
function render(){syncText();renderContacts();configureLinks();mode=getMode();if(mode==='desktop')renderDesktop();else if(mode==='tablet')renderTablet();else renderMobile();document.documentElement.classList.add('motion-ready')}
function showProject(id){const p=C.projects.find(x=>x.id===id);if(!p)return;$('#modalImage').src=imageFor(p,mode==='mobile');$('#modalImage').alt=t(p.title);$('#modalTag').textContent=t(p.tag);$('#modalTitle').textContent=t(p.title);$('#modalDetail').textContent=t(p.detail);$('#modalLink').href=p.href;$('#projectModal').showModal()}
function activateMobileTab(name){$$('[data-mobile-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.mobileTab===name)));$$('[data-mobile-panel]').forEach(p=>p.hidden=p.dataset.mobilePanel!==name)}
function activateTabletTab(name){$$('[data-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===name)));$$('[data-panel]').forEach(p=>p.hidden=p.dataset.panel!==name)}
let lastTopbarScrolled=false;
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;$('#scrollProgress')?.style.setProperty('transform',`scaleX(${max?Math.min(1,scrollY/max):0})`);const next=scrollY>16;if(next!==lastTopbarScrolled){$('.topbar')?.classList.toggle('scrolled',next);lastTopbarScrolled=next}}
function showToast(msg){const e=$('#siteToast');if(!e)return;e.textContent=msg;e.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>e.classList.remove('show'),3000)}

document.addEventListener('click',e=>{
 const project=e.target.closest('[data-project]');if(project){showProject(project.dataset.project);return}
 const dot=e.target.closest('[data-deck-index]');if(dot&&mode==='desktop'){const next=Number(dot.dataset.deckIndex),delta=next-deckIndex;if(delta)moveDeck(delta>0?1:-1);return}
 const filter=e.target.closest('[data-filter]');if(filter){activeFilter=filter.dataset.filter;deckIndex=0;renderFilters();buildDeck();return}
 const disabled=e.target.closest('[data-contact-disabled]');if(disabled){const x=C.profile.contacts[disabled.dataset.contactDisabled];showToast(x.setup||ui('contactUnavailable'));return}
 const mm=e.target.closest('.mobile-method-entry button');if(mm){mm.parentElement.classList.toggle('open');return}
 const ms=e.target.closest('.method-step');if(ms){ms.classList.toggle('open');return}
 const mt=e.target.closest('[data-mobile-tab]');if(mt){activateMobileTab(mt.dataset.mobileTab);return}
 const tt=e.target.closest('[data-tab]');if(tt){activateTabletTab(tt.dataset.tab);return}
 const lg=e.target.closest('#languageToggle [data-lang]');if(lg){lang=lg.dataset.lang;try{localStorage.setItem('portfolio-language',lang)}catch{}render();return}
});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.project-card')){e.preventDefault();showProject(e.target.dataset.project)}if(e.key==='Escape'&&$('#projectModal')?.open)$('#projectModal').close()});
$('#projectPrev')?.addEventListener('click',()=>moveDeck(-1));$('#projectNext')?.addEventListener('click',()=>moveDeck(1));
$('#modalClose')?.addEventListener('click',()=>$('#projectModal').close());$('#projectModal')?.addEventListener('click',e=>{if(e.target===$('#projectModal'))$('#projectModal').close()});
$$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'})));
let scrollRaf=0;addEventListener('scroll',()=>{if(scrollRaf)return;scrollRaf=requestAnimationFrame(()=>{scrollRaf=0;updateScroll()})},{passive:true});
let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{const next=getMode();if(next!==mode)render();else if(mode==='desktop')positionDeck(false)},160)},{passive:true});
try{lang=localStorage.getItem('portfolio-language')==='en'?'en':'pt'}catch{}
document.documentElement.classList.add('js');render();updateScroll();
