const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const C=window.PORTFOLIO;
let lang="pt";
let activeFilter="all";
let revealObserver;
let deckIndex=0;
let deckTimer=null;
let deckBusy=false;
let deckVisualIndex=2;
let deckTransitionTimer=null;
const DECK_INTERVAL=8200;
const DECK_TRANSITION=880;

const icons={
  chart:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 20V10m6 10V4m6 16v-7m4 7H2"/></svg>`,
  box:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10"/></svg>`,
  file:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6"/></svg>`,
  pie:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 2v10h10A10 10 0 1 1 12 2Z"/><path d="M15 2.5A10 10 0 0 1 21.5 9H15Z"/></svg>`,
  target:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m15 9 6-6"/></svg>`,
  store:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 9 4.5 4h15L21 9"/><path d="M5 13v7h14v-7M9 20v-6h6v6"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/></svg>`
};

const socialIcons={
  linkedin:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  commercial:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 9 4.5 4h15L21 9"/><path d="M5 13v7h14v-7M9 20v-6h6v6"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/></svg>`,
  github:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.7-1.6 6.7-7.5A5.8 5.8 0 0 0 19.2 3 5.4 5.4 0 0 0 19.1 1S18 .7 15 2.5a13.4 13.4 0 0 0-7 0C5 .7 3.9 1 3.9 1a5.4 5.4 0 0 0-.1 2A5.8 5.8 0 0 0 2.3 7c0 5.9 3.4 7.1 6.7 7.5A4.8 4.8 0 0 0 8 18v4"/><path d="M8 19c-3 .9-3-2-4-2"/></svg>`,
  whatsapp:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-4.7A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.2 7.8c.7 3.2 2.8 5.3 6 6.1M8.2 7.8l1.6-.8m4.4 6.9 1.1-1.4"/></svg>`,
  telegram:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m22 2-7.2 20-4.1-8.2L2 9.4 22 2Z"/><path d="m22 2-11.3 11.8"/></svg>`
};

function t(value){
  return typeof value==="string" ? value : value?.[lang] ?? "";
}

function ui(key){
  return t(C.ui?.[key] ?? key);
}

function setConfiguredLinks(){
  const diagnosis=C.profile.diagnosis;
  const commercial=C.profile.contacts.commercial.url;
  $$('a[href="https://example.com/diagnostico"]').forEach(link=>{
    link.href=diagnosis;
    if(link.classList.contains("cta") || link.classList.contains("mobile-sticky-cta")) link.classList.add("cta-diagnosis");
  });
  $$('a[href="https://example.com"]').forEach(link=>link.href=commercial || "#");
}

function syncStaticText(){
  document.documentElement.lang=lang==="pt" ? "pt-BR" : "en";
  $$("[data-copy=brandRole]").forEach(node=>node.textContent=t(C.profile.role));
  $$("[data-copy=role]").forEach(node=>node.textContent=t(C.profile.role));
  $$("[data-copy=headline]").forEach(node=>node.textContent=t(C.profile.headline));
  $$("[data-copy=location]").forEach(node=>node.textContent=C.profile.location);
  $$("[data-i18n]").forEach(node=>{
    const value=ui(node.dataset.i18n);
    if(value) node.textContent=value;
  });
  $$("#languageToggle [data-lang]").forEach(button=>{
    const active=button.dataset.lang===lang;
    button.setAttribute("aria-pressed",String(active));
    button.classList.toggle("active",active);
  });
}

function renderMetrics(selector){
  const element=$(selector);
  if(!element) return;
  element.innerHTML=C.metrics.map(metric=>`
    <article class="metric">
      <strong>${metric.value}</strong>
      <span>${t(metric.label)}</span>
      <small>${t(metric.note)}</small>
    </article>`).join("");
}

function renderHeroPills(){
  const element=$("#desktopHeroPills");
  if(element) element.innerHTML=C.services.slice(0,3).map(service=>
    `<span class="hero-pill">${t(service.title)}</span>`
  ).join("");
}

function featuredProject(){
  return C.projects.find(project=>project.id===C.featuredProjectId) || C.projects[0];
}

function featuredProjectMarkup(){
  const project=featuredProject();
  return `<button class="hero-project-card" type="button" data-project="${project.id}" aria-label="${ui("openProject")}: ${t(project.title)}">
    <img src="${project.image}" alt="${t(project.title)}">
    <span class="hero-project-scrim" aria-hidden="true"></span>
    <span class="hero-project-badge">${ui("featuredProject")}</span>
    <span class="hero-project-copy">
      <strong>${t(project.title)}</strong>
      <small>${t(project.summary)}</small>
      <em>${ui("openProject")} ↗</em>
    </span>
  </button>`;
}

function renderFeaturedProject(){
  const markup=featuredProjectMarkup();
  ["#desktopFeaturedProject","#tabletFeaturedProject","#mobileFeaturedProject"].forEach(selector=>{
    const element=$(selector);
    if(element) element.innerHTML=markup;
  });
}

function deliverMarkup(){
  return C.services.map(service=>`
    <div class="deliver-item">
      ${icons[service.icon]}
      <span>${t(service.title)}</span>
    </div>`).join("");
}

function serviceMarkup(service,mobile=false){
  const linkText=lang==="pt" ? "Conhecer serviço ↗" : "Explore service ↗";
  return `<article class="${mobile ? "mobile-service-card" : "method-card"}">
    <header>${icons[service.icon]}<h3>${t(service.title)}</h3></header>
    <p>${mobile ? t(service.detail) : t(service.short)}</p>
    <a href="${service.href}" target="_blank" rel="noreferrer">${linkText}</a>
  </article>`;
}

function methodMarkup(method){
  return `<button class="method-step" type="button">
    <span>${method.n}</span>
    <strong>${t(method.title)}</strong>
    <p>${t(method.text)}</p>
  </button>`;
}

function experienceMarkup(){
  return C.experience.map((entry,index)=>`
    <div class="experience-entry">
      <div class="experience-icon">${index===0 ? "◎" : "▦"}</div>
      <div>
        <strong>${t(entry.role)}</strong>
        <span>${t(entry.org)}</span>
        <span>${entry.period}</span>
      </div>
    </div>`).join("");
}

function heroFilteredProjects(){
  return C.projects.filter(project=>activeFilter==="all" || project.category===activeFilter);
}

function secondaryProjects(){
  return C.projects.filter(project=>project.id!==C.featuredProjectId);
}

function projectCard(project,deck=false,clone=false){
  if(deck){
    return `<article class="project-card classic-deck-card${clone ? " is-clone" : ""}" tabindex="${clone ? "-1" : "0"}" role="button" data-project="${project.id}" data-category="${project.category}" data-accent="${project.accent || "cyan"}" aria-hidden="${clone ? "true" : "false"}">
      <div class="project-visual">
        <img src="${project.image}" alt="${clone ? "" : t(project.title)}" ${clone ? 'aria-hidden="true"' : ""}>
        <div class="project-copy project-copy-glass">
          <span>${t(project.tag)}</span>
          <h4>${t(project.title)}</h4>
          <p>${t(project.summary)}</p>
        </div>
      </div>
    </article>`;
  }
  return `<article class="project-card" tabindex="0" role="button" data-project="${project.id}" data-category="${project.category}" data-accent="${project.accent || "cyan"}">
    <img src="${project.image}" alt="${t(project.title)}" loading="lazy" decoding="async">
    <div class="project-copy">
      <span>${t(project.tag)}</span>
      <h4>${t(project.title)}</h4>
      <p>${t(project.summary)}</p>
    </div>
  </article>`;
}
function deckStep(){
  const deck=$("#desktopProjects");
  const card=deck?.querySelector(".classic-deck-card");
  if(!deck || !card) return 0;
  const styles=getComputedStyle(deck);
  const gap=parseFloat(styles.columnGap || styles.gap || "0");
  return card.getBoundingClientRect().width + gap;
}

function positionDeck(animate=true){
  const deck=$("#desktopProjects");
  if(!deck) return;
  const step=deckStep();
  deck.style.transition=animate
    ? `transform ${DECK_TRANSITION}ms cubic-bezier(.19,.78,.18,1)`
    : "none";
  deck.style.transform=`translate3d(${-deckVisualIndex*step}px,0,0)`;
}

function buildDeckTrack(){
  const deck=$("#desktopProjects");
  const items=heroFilteredProjects();
  if(!deck) return;

  clearTimeout(deckTransitionTimer);
  deckBusy=false;
  deckIndex=Math.min(deckIndex,Math.max(0,items.length-1));

  deck.classList.toggle("is-single",items.length===1);

  if(items.length===0){
    deck.innerHTML="";
    updateDeckMeta();
    return;
  }

  if(items.length===1){
    deckVisualIndex=0;
    deck.innerHTML=projectCard(items[0],true,false);
  }else{
    const prefix=[items[(items.length-2+items.length)%items.length],items[items.length-1]];
    const suffix=[items[0],items[1%items.length]];
    deck.innerHTML=[
      ...prefix.map(project=>projectCard(project,true,true)),
      ...items.map(project=>projectCard(project,true,false)),
      ...suffix.map(project=>projectCard(project,true,true))
    ].join("");
    deckVisualIndex=deckIndex+2;
  }

  requestAnimationFrame(()=>{
    positionDeck(false);
    requestAnimationFrame(()=>deck.classList.add("is-track-ready"));
  });

  updateDeckMeta();
  resetDeckTimer();
}

function updateDeckMeta(){
  const items=heroFilteredProjects();
  const dots=$("#projectDeckDots");
  if(dots){
    dots.innerHTML=items.map((project,index)=>`<button type="button" class="${index===deckIndex ? "active" : ""}" data-deck-index="${index}" aria-label="${t(project.title)}"></button>`).join("");
  }
}

function resetDeckTimer(){
  clearTimeout(deckTimer);
  if(heroFilteredProjects().length>1 && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    deckTimer=setTimeout(()=>moveDeck(1),DECK_INTERVAL);
  }
}

function finishDeckMove(){
  const items=heroFilteredProjects();
  const deck=$("#desktopProjects");
  if(!deck || items.length<2) return;

  if(deckVisualIndex>=items.length+2){
    deckVisualIndex=2;
    positionDeck(false);
  }else if(deckVisualIndex<=1){
    deckVisualIndex=items.length+1;
    positionDeck(false);
  }

  deckBusy=false;
  deck.classList.remove("is-moving");
  $(".hero-projects-panel")?.classList.remove("deck-rolling");
  resetDeckTimer();
}

function moveDeck(step){
  const items=heroFilteredProjects();
  const deck=$("#desktopProjects");
  if(!deck || items.length<2 || deckBusy) return;

  deckBusy=true;
  clearTimeout(deckTimer);
  clearTimeout(deckTransitionTimer);

  deckIndex=(deckIndex+step+items.length)%items.length;
  deckVisualIndex+=step;
  deck.classList.add("is-moving");
  $(".hero-projects-panel")?.classList.add("deck-rolling");
  updateDeckMeta();
  requestAnimationFrame(()=>positionDeck(true));

  deckTransitionTimer=setTimeout(finishDeckMove,DECK_TRANSITION+55);
}

function goToDeckIndex(next){
  const items=heroFilteredProjects();
  const deck=$("#desktopProjects");
  if(!deck || !items.length || next===deckIndex || deckBusy) return;

  clearTimeout(deckTimer);
  clearTimeout(deckTransitionTimer);
  deckBusy=true;
  deck.classList.add("is-jumping");
  $(".hero-projects-panel")?.classList.add("deck-rolling");

  setTimeout(()=>{
    deckIndex=next;
    deckVisualIndex=items.length>1 ? next+2 : 0;
    positionDeck(false);
    updateDeckMeta();

    requestAnimationFrame(()=>{
      deck.classList.remove("is-jumping");
      deck.classList.add("is-jump-settling");
      setTimeout(()=>{
        deck.classList.remove("is-jump-settling");
        deckBusy=false;
        $(".hero-projects-panel")?.classList.remove("deck-rolling");
        resetDeckTimer();
      },420);
    });
  },220);
}

function renderHeroDeck(direction=1,immediate=false){
  buildDeckTrack();
}

function renderProjects(){
  renderHeroDeck(1,true);
  const cards=secondaryProjects().map(project=>projectCard(project,false)).join("");
  ["#tabletProjectStrip","#mobileProjectStrip"].forEach(selector=>{
    const element=$(selector);
    if(element) element.innerHTML=cards;
  });
}

function renderFilters(){
  const labels={
    all:{pt:"Todos",en:"All"},
    finance:{pt:"Financeiro",en:"Finance"},
    inventory:{pt:"Estoque",en:"Inventory"},
    migration:{pt:"Migração",en:"Migration"},
    security:{pt:"Segurança",en:"Security"},
    ecommerce:{pt:"E-commerce",en:"E-commerce"}
  };
  const element=$("#desktopProjectFilters");
  if(!element) return;
  element.innerHTML=Object.keys(labels).map(key=>
    `<button class="${key===activeFilter ? "active" : ""}" data-filter="${key}">${t(labels[key])}</button>`
  ).join("");
  $$('[data-filter]',element).forEach(button=>{
    button.addEventListener("click",()=>{
      activeFilter=button.dataset.filter;
      deckIndex=0;
      renderFilters();
      buildDeckTrack();
    });
  });
}

function renderContacts(){
  const contacts=C.profile.contacts;
  const order=["linkedin","commercial","github","whatsapp","telegram"];

  const buttonMarkup=(key,compact=false)=>{
    const item=contacts[key];
    const label=t(item.label);
    const enabled=Boolean(item.enabled && item.url);
    const tag=enabled ? "a" : "button";
    const href=enabled ? ` href="${item.url}" target="_blank" rel="noreferrer"` : "";
    const disabled=enabled ? "" : ` type="button" data-contact-disabled="${key}" aria-disabled="true"`;
    return `<${tag}${href}${disabled} class="contact-button contact-${key}${enabled ? "" : " is-disabled"}" aria-label="${label}" data-label="${label}">
      ${socialIcons[key]}
      ${compact ? "" : `<span>${label}</span>`}
    </${tag}>`;
  };

  const header=$("#headerContacts");
  if(header) header.innerHTML=order.map(key=>buttonMarkup(key,true)).join("");
  const footer=$("#footerContacts");
  if(footer) footer.innerHTML=order.map(key=>buttonMarkup(key,false)).join("");

  $$("[data-contact-disabled]").forEach(button=>{
    button.addEventListener("click",()=>showToast(C.profile.contacts[button.dataset.contactDisabled].setup || ui("contactUnavailable")));
  });
}

function renderAll(){
  syncStaticText();
  renderHeroPills();
  renderFeaturedProject();
  ["#desktopMetrics","#tabletMetrics","#mobileMetrics"].forEach(renderMetrics);

  const desktopDeliverables=$("#desktopDeliverables");
  const tabletDeliverables=$("#tabletDeliverables");
  if(desktopDeliverables) desktopDeliverables.innerHTML=deliverMarkup();
  if(tabletDeliverables) tabletDeliverables.innerHTML=deliverMarkup();

  const tabletServices=$("#tabletServices");
  const mobileServices=$("#mobileServices");
  if(tabletServices) tabletServices.innerHTML=C.services.map(service=>serviceMarkup(service)).join("");
  if(mobileServices) mobileServices.innerHTML=C.services.map(service=>serviceMarkup(service,true)).join("");

  const experience=experienceMarkup();
  ["#tabletExperience","#mobileExperience"].forEach(selector=>{
    const element=$(selector);
    if(element) element.innerHTML=experience;
  });

  const desktopMethod=$("#desktopMethod");
  const tabletMethod=$("#tabletMethod");
  const mobileMethod=$("#mobileMethod");
  if(desktopMethod) desktopMethod.innerHTML=C.method.map(methodMarkup).join("");
  if(tabletMethod) tabletMethod.innerHTML=C.method.map(method=>`
    <article class="method-card"><span>${method.n}</span><strong>${t(method.title)}</strong><p>${t(method.text)}</p></article>`
  ).join("");
  if(mobileMethod) mobileMethod.innerHTML=C.method.map(method=>`
    <article class="mobile-method-entry">
      <button type="button"><span>${method.n}</span><strong>${t(method.title)}</strong><b>+</b></button>
      <p>${t(method.text)}</p>
    </article>`
  ).join("");

  renderFilters();
  renderProjects();
  renderContacts();
  bindMethod();
  setConfiguredLinks();
  applyRevealTargets();
}

function bindMethod(){
  $$(".method-step").forEach(button=>{
    button.addEventListener("click",()=>button.classList.toggle("open"));
  });
  $$(".mobile-method-entry button").forEach(button=>{
    button.addEventListener("click",()=>button.parentElement.classList.toggle("open"));
  });
}

function showProject(id){
  const project=C.projects.find(item=>item.id===id);
  if(!project) return;
  $("#modalImage").src=project.image;
  $("#modalImage").alt=t(project.title);
  $("#modalTag").textContent=t(project.tag);
  $("#modalTitle").textContent=t(project.title);
  $("#modalDetail").textContent=t(project.detail);
  $("#modalLink").href=project.href;
  $("#projectModal").showModal();
}

function showToast(message){
  const toast=$("#siteToast");
  if(!toast) return;
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>toast.classList.remove("show"),3600);
}


function activateMobileTab(name){
  $$("[data-mobile-tab]").forEach(button=>{
    button.setAttribute("aria-selected",String(button.dataset.mobileTab===name));
  });
  $$("[data-mobile-panel]").forEach(panel=>{
    panel.hidden=panel.dataset.mobilePanel!==name;
  });
}

function activateTabletTab(name){
  $$("[data-tab]").forEach(button=>{
    button.setAttribute("aria-selected",String(button.dataset.tab===name));
  });
  $$("[data-panel]").forEach(panel=>{
    panel.hidden=panel.dataset.panel!==name;
  });
}


function updateScrollState(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const progress=max>0 ? Math.min(1,window.scrollY/max) : 0;
  $("#scrollProgress")?.style.setProperty("transform",`scaleX(${progress})`);
  $(".topbar")?.classList.toggle("scrolled",window.scrollY>18);

}

function initializeRevealObserver(){
  if(revealObserver) revealObserver.disconnect();
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced || !("IntersectionObserver" in window)){
    $$(".reveal").forEach(element=>element.classList.add("is-visible"));
    return;
  }
  revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        entry.target.dataset.revealState="inside";
      }else{
        entry.target.classList.remove("is-visible");
        entry.target.dataset.revealState="outside";
      }
    });
  },{
    threshold:.18,
    rootMargin:"-4% 0px -12% 0px"
  });
}

function applyRevealTargets(){
  if(!revealObserver) initializeRevealObserver();

  const selectors=[
    ".command-grid > .panel:not(.experience-panel)",
    ".method-board",
    ".tablet-tabs",
    ".tablet-projects",
    ".tablet-bottom-grid > .panel",
    ".mobile-panel",
    ".mobile-method",
    ".project-card:not(.classic-deck-card)",
    ".deliver-item",
    ".metric",
    ".method-step"
  ];

  const elements=$$(selectors.join(","));
  elements.forEach((element,index)=>{
    if(element.dataset.revealReady) return;
    element.dataset.revealReady="true";
    element.classList.add("reveal");
    const directions=["up","left","right"];
    element.dataset.reveal=directions[index%directions.length];
    element.style.setProperty("--reveal-delay",`${(index%4)*65}ms`);
    const rect=element.getBoundingClientRect();
    if(rect.top<window.innerHeight*.9 && rect.bottom>0){
      element.classList.add("is-visible");
      element.dataset.revealState="inside";
    }else{
      element.dataset.revealState="outside";
    }
    revealObserver?.observe(element);
  });

  requestAnimationFrame(()=>document.documentElement.classList.add("motion-ready"));
}

function initializeDepth(){
  const allowed=matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!allowed) return;
  $$(".panel").forEach(panel=>{
    panel.addEventListener("pointermove",event=>{
      const rect=panel.getBoundingClientRect();
      const x=event.clientX-rect.left;
      const y=event.clientY-rect.top;
      panel.style.setProperty("--mx",`${x}px`);
      panel.style.setProperty("--my",`${y}px`);
      panel.style.setProperty("--tilt-y",`${(((x/rect.width)-.5)*.8).toFixed(2)}deg`);
      panel.style.setProperty("--tilt-x",`${(-((y/rect.height)-.5)*.55).toFixed(2)}deg`);
    },{passive:true});
    panel.addEventListener("pointerleave",()=>{
      panel.style.setProperty("--tilt-x","0deg");
      panel.style.setProperty("--tilt-y","0deg");
    },{passive:true});
  });
}



document.addEventListener("click",event=>{
  const project=event.target.closest("[data-project]");
  if(project){showProject(project.dataset.project);return;}
  const dot=event.target.closest("[data-deck-index]");
  if(dot){
    goToDeckIndex(Number(dot.dataset.deckIndex));
  }
});

document.addEventListener("keydown",event=>{
  if((event.key==="Enter" || event.key===" ") && event.target.matches(".project-card")){
    event.preventDefault();
    showProject(event.target.dataset.project);
  }
});

$("#projectPrev")?.addEventListener("click",()=>moveDeck(-1));
$("#projectNext")?.addEventListener("click",()=>moveDeck(1));
const deckPanel=$(".hero-projects-panel");
deckPanel?.addEventListener("pointerenter",()=>clearTimeout(deckTimer));
deckPanel?.addEventListener("pointerleave",()=>resetDeckTimer());
deckPanel?.addEventListener("focusin",()=>clearTimeout(deckTimer));
deckPanel?.addEventListener("focusout",event=>{if(!deckPanel.contains(event.relatedTarget)) resetDeckTimer();});

$("#modalClose")?.addEventListener("click",()=>$("#projectModal").close());
$("#projectModal")?.addEventListener("click",event=>{
  if(event.target===$("#projectModal")) $("#projectModal").close();
});

$$("#languageToggle [data-lang]").forEach(button=>{
  button.addEventListener("click",()=>{
    lang=button.dataset.lang;
    try{localStorage.setItem("portfolio-language",lang)}catch(error){}
    renderAll();
  });
});




$$("[data-scroll]").forEach(button=>{
  button.addEventListener("click",()=>{
    const target=$(button.dataset.scroll);
    target?.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

$$("[data-tab]").forEach(button=>{
  button.addEventListener("click",()=>activateTabletTab(button.dataset.tab));
});

$$("[data-mobile-tab]").forEach(button=>{
  button.addEventListener("click",()=>activateMobileTab(button.dataset.mobileTab));
});

window.addEventListener("scroll",()=>requestAnimationFrame(updateScrollState),{passive:true});
window.addEventListener("resize",()=>{
  requestAnimationFrame(updateScrollState);
  requestAnimationFrame(()=>positionDeck(false));
},{passive:true});

try{lang=localStorage.getItem("portfolio-language")==="en" ? "en" : "pt"}catch(error){lang="pt"};
document.documentElement.classList.add("js");
initializeRevealObserver();
renderAll();
initializeDepth();
updateScrollState();
