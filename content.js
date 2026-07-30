
window.PORTFOLIO = {
  featuredProjectId: "financial-diagnosis",
  profile: {
    name: "Rodolfo P Rodrigues",
    role: {
      pt: "Consultor em sistemas logísticos e financeiros",
      en: "Logistics and financial systems consultant"
    },
    headline: {
      pt: "Transformo planilhas dispersas em sistemas confiáveis de margem, estoque e decisão.",
      en: "I turn fragmented spreadsheets into reliable systems for margin, inventory and decision-making."
    },
    location: "Florianópolis · atendimento remoto",
    diagnosis: "https://example.com/diagnostico",
    contacts: {
      linkedin: {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/rodolfopr",
        enabled: true
      },
      commercial: {
        label: {pt:"Site comercial", en:"Commercial site"},
        url: "https://example.com",
        enabled: true
      },
      github: {
        label: "GitHub",
        url: "https://github.com/Rodolfopr92",
        enabled: true
      },
      whatsapp: {
        label: "WhatsApp",
        url: "",
        enabled: false,
        setup: "Adicione o número internacional em content.js, por exemplo: https://wa.me/55..."
      },
      telegram: {
        label: "Telegram",
        url: "",
        enabled: false,
        setup: "Adicione o usuário em content.js, por exemplo: https://t.me/seu_usuario"
      }
    }
  },
  ui: {
    navOverview:{pt:"Visão",en:"Overview"},
    navServices:{pt:"Serviços",en:"Services"},
    navProjects:{pt:"Projetos",en:"Projects"},
    navMethod:{pt:"Método",en:"Method"},
    diagnosis:{pt:"Solicitar diagnóstico",en:"Request a diagnosis"},
    viewProjects:{pt:"Ver projetos",en:"View projects"},
    commercialSite:{pt:"Site comercial ↗",en:"Commercial site ↗"},
    consultingImplementation:{pt:"Consultoria + implementação",en:"Consulting + implementation"},
    heroLine1:{pt:"Da planilha à",en:"From spreadsheets to"},
    heroLine2:{pt:"operação confiável.",en:"reliable operations."},
    explore:{pt:"Explorar",en:"Explore"},
    distributionProof:{pt:"Prova de distribuição",en:"Distribution proof"},
    last365:{pt:"últimos 365 dias",en:"last 365 days"},
    about:{pt:"Sobre",en:"About"},
    deliver:{pt:"O que entrego",en:"What I deliver"},
    services:{pt:"Serviços",en:"Services"},
    featuredProjects:{pt:"Projetos em destaque",en:"Featured projects"},
    projectDeckLabel:{pt:"Portfólio demonstrável",en:"Demonstrable portfolio"},
    previousProjects:{pt:"Projetos anteriores",en:"Previous projects"},
    nextProjects:{pt:"Próximos projetos",en:"Next projects"},
    pauseProjects:{pt:"Pausar rotação",en:"Pause rotation"},
    resumeProjects:{pt:"Retomar rotação",en:"Resume rotation"},
    featuredProject:{pt:"Projeto em destaque",en:"Featured project"},
    openProject:{pt:"Abrir projeto",en:"Open project"},
    experience:{pt:"Experiência",en:"Experience"},
    method:{pt:"Método",en:"Method"},
    workMethod:{pt:"Método de trabalho",en:"Working method"},
    whatISolve:{pt:"O que resolvo",en:"What I solve"},
    clearNumbers:{pt:"Números claros. Estoque sob controle. Decisões com segurança.",en:"Clear numbers. Controlled inventory. Confident decisions."},
    knowProcess:{pt:"Conhecer o processo ↗",en:"See the process ↗"},
    applyBusiness:{pt:"Aplicar ao seu negócio ↗",en:"Apply it to your business ↗"},
    knowSolution:{pt:"Conhecer a solução ↗",en:"Explore the solution ↗"},
    footerFocus:{pt:"Modelagem financeira · estoque · migração de dados",en:"Financial modeling · inventory · data migration"},
    contactUnavailable:{pt:"Este canal ainda precisa ser configurado em content.js.",en:"This channel still needs to be configured in content.js."},
    contactDock:{pt:"Canais de contato",en:"Contact channels"}
  },
  metrics: [
    { value: "6.592", label: {pt:"seguidores", en:"followers"}, note:{pt:"LinkedIn",en:"LinkedIn"} },
    { value: "48.286", label: {pt:"impressões", en:"impressions"}, note:{pt:"últimos 365 dias",en:"last 365 days"} },
    { value: "35%", label: {pt:"audiência sênior", en:"senior audience"}, note:{pt:"perfil profissional",en:"professional audience"} },
    { value: "17%", label: {pt:"Florianópolis + NY", en:"Florianópolis + NY"}, note:{pt:"cada mercado",en:"each market"} }
  ],
  services: [
    {
      id:"finance",
      icon:"chart",
      title:{pt:"Modelagem financeira",en:"Financial modeling"},
      short:{pt:"Custos, preço, margem e cenários.",en:"Costs, pricing, margin and scenarios."},
      detail:{pt:"Estruturo custos unitários, margem de contribuição, ponto de equilíbrio, projeções e cenários para decisões comerciais mais seguras.",en:"I structure unit costs, contribution margin, break-even, projections and scenarios for safer commercial decisions."},
      href:"https://example.com/modelagem-financeira"
    },
    {
      id:"inventory",
      icon:"box",
      title:{pt:"Controle de estoque",en:"Inventory control"},
      short:{pt:"Movimentações, saldos, lotes e reposição.",en:"Movements, balances, lots and replenishment."},
      detail:{pt:"Organizo catálogo, histórico de movimentações, saldos, contagens, alertas de reposição e rastreabilidade operacional.",en:"I organize catalogs, movement ledgers, balances, counts, replenishment alerts and operational traceability."},
      href:"https://example.com/controle-de-estoque"
    },
    {
      id:"migration",
      icon:"file",
      title:{pt:"Migração de planilhas",en:"Spreadsheet migration"},
      short:{pt:"Limpeza, validação e importação.",en:"Cleanup, validation and import."},
      detail:{pt:"Transformo planilhas e cadastros antigos em dados estruturados, com prévia, correção de ambiguidades e recibo de importação.",en:"I transform old spreadsheets and catalogs into structured data with previews, ambiguity resolution and import receipts."},
      href:"https://example.com/migracao-de-dados"
    },
    {
      id:"dashboards",
      icon:"pie",
      title:{pt:"Dashboards e decisão",en:"Dashboards and decisions"},
      short:{pt:"Visão financeira e operacional.",en:"Financial and operational visibility."},
      detail:{pt:"Conecto indicadores financeiros e operacionais em painéis claros, com regras documentadas e métricas acionáveis.",en:"I connect financial and operational indicators in clear dashboards with documented rules and actionable metrics."},
      href:"https://example.com/dashboards"
    },
    {
      id:"ecommerce",
      icon:"store",
      title:{pt:"Criação de sites para e-commerce",en:"E-commerce website creation"},
      short:{pt:"Catálogo, checkout e integração operacional.",en:"Catalog, checkout and operational integration."},
      detail:{pt:"Desenvolvo vitrines responsivas para negócios de produtos físicos, conectando catálogo, conversão, estoque e dados comerciais.",en:"I build responsive storefronts for physical-product businesses, connecting catalog, conversion, inventory and commercial data."},
      href:"https://example.com/ecommerce"
    },
    {
      id:"implementation",
      icon:"target",
      title:{pt:"Diagnóstico e implementação",en:"Diagnosis and implementation"},
      short:{pt:"Processos, dados e acompanhamento.",en:"Processes, data and follow-through."},
      detail:{pt:"Mapeio o problema, organizo dados, configuro a solução e acompanho a adoção até que o sistema funcione na operação real.",en:"I map the problem, organize data, configure the solution and support adoption until it works in real operations."},
      href:"https://example.com/implementacao"
    }
  ],
  projects: [
    {
      id:"financial-diagnosis",
      category:"finance",
      accent:"gold",
      image:"assets/project-finance.webp",
      mobileImage:"assets/project-finance-mobile.webp",
      tag:{pt:"CASTOR · FINANCEIRO",en:"CASTOR · FINANCE"},
      title:{pt:"Castor · inteligência financeira",en:"Castor · financial intelligence"},
      summary:{pt:"Custos, preço, margem, ponto de equilíbrio, caixa e cenários.",en:"Costs, pricing, margin, break-even, cash and scenarios."},
      detail:{pt:"Fundação financeira responsiva para pequenos negócios, com cálculos determinísticos, cenários e limites claros entre acesso gratuito e premium.",en:"A responsive financial foundation for small businesses with deterministic calculations, scenarios and clear free and premium boundaries."},
      href:"https://example.com/financeiro"
    },
    {
      id:"inventory-system",
      category:"inventory",
      accent:"cyan",
      image:"assets/project-inventory.webp",
      mobileImage:"assets/project-inventory-mobile.webp",
      tag:{pt:"DAEDALUS · ESTOQUE",en:"DAEDALUS · INVENTORY"},
      title:{pt:"Daedalus · controle de estoque",en:"Daedalus · inventory control"},
      summary:{pt:"Movimentações imutáveis, saldos, alertas e preparação para compras.",en:"Immutable movements, balances, alerts and purchasing readiness."},
      detail:{pt:"Autoridade de estoque baseada em histórico de movimentos, preparada para múltiplos usuários, armazéns e integração financeira.",en:"An inventory authority based on movement history, prepared for multiple users, warehouses and financial integration."},
      href:"https://example.com/estoque"
    },
    {
      id:"data-migration",
      category:"migration",
      accent:"violet",
      image:"assets/project-migration.webp",
      mobileImage:"assets/project-migration-mobile.webp",
      tag:{pt:"KAIJU · MIGRAÇÃO",en:"KAIJU · MIGRATION"},
      title:{pt:"Kaiju · importação e validação",en:"Kaiju · import and validation"},
      summary:{pt:"Detecção de colunas, mapeamento, prévia e correção antes do commit.",en:"Column detection, mapping, preview and correction before commit."},
      detail:{pt:"Fluxo seguro para transformar planilhas antigas em dados confiáveis sem reconstruir o negócio manualmente.",en:"A safe workflow to turn legacy spreadsheets into reliable data without rebuilding the business manually."},
      href:"https://example.com/migracao"
    },
    {
      id:"minus-security",
      category:"security",
      accent:"green",
      image:"assets/project-minus.webp",
      mobileImage:"assets/project-minus-mobile.webp",
      tag:{pt:"MINUS · SEGURANÇA",en:"MINUS · SECURITY"},
      title:{pt:"MINUS · segurança e auditoria",en:"MINUS · security and audit"},
      summary:{pt:"Validação de arquivos, políticas, quarentena e recibos de evidência.",en:"File validation, policy gates, quarantine and evidence receipts."},
      detail:{pt:"Camada de segurança offline e em nuvem para avaliar arquivos, registrar decisões imutáveis e proteger fluxos de importação e backup.",en:"An offline and cloud security layer for assessing files, recording immutable decisions and protecting import and backup workflows."},
      href:"https://example.com/minus"
    },
    {
      id:"ecommerce-creation",
      category:"ecommerce",
      accent:"amber",
      image:"assets/project-ecommerce.webp",
      mobileImage:"assets/project-ecommerce-mobile.webp",
      tag:{pt:"E-COMMERCE · WEB",en:"E-COMMERCE · WEB"},
      title:{pt:"Criação de sites para e-commerce",en:"E-commerce website creation"},
      summary:{pt:"Vitrine responsiva, catálogo, checkout e integração com a operação.",en:"Responsive storefront, catalog, checkout and operational integration."},
      detail:{pt:"Criação de experiências comerciais para negócios de produtos físicos, conectando identidade visual, catálogo, conversão, estoque e dados.",en:"Commercial website creation for physical-product businesses, connecting visual identity, catalog, conversion, inventory and data."},
      href:"https://example.com/ecommerce"
    }
  ],
  method: [
    {n:"01", title:{pt:"Diagnóstico",en:"Diagnosis"}, text:{pt:"Entendimento do problema, objetivos e restrições.",en:"Understand the problem, goals and constraints."}},
    {n:"02", title:{pt:"Dados",en:"Data"}, text:{pt:"Inventário das fontes, qualidade e regras existentes.",en:"Inventory sources, quality and existing rules."}},
    {n:"03", title:{pt:"Modelo",en:"Model"}, text:{pt:"Estruturação da lógica financeira ou operacional.",en:"Structure the financial or operational logic."}},
    {n:"04", title:{pt:"Validação",en:"Validation"}, text:{pt:"Testes, cenários, reconciliação e revisão humana.",en:"Tests, scenarios, reconciliation and human review."}},
    {n:"05", title:{pt:"Implementação",en:"Implementation"}, text:{pt:"Configuração, migração e treinamento.",en:"Configuration, migration and training."}},
    {n:"06", title:{pt:"Acompanhamento",en:"Follow-up"}, text:{pt:"Ajustes, documentação e evolução contínua.",en:"Adjustments, documentation and continuous evolution."}}
  ],
  experience: [
    {
      role:{pt:"Consultor de sistemas financeiros e operacionais",en:"Financial and operational systems consultant"},
      org:{pt:"Autônomo",en:"Self-employed"},
      period:"Fev 2026 — presente"
    },
    {
      role:{pt:"Estágio em estoque e operações",en:"Inventory and operations intern"},
      org:"Restaurante Universitário UFSC",
      period:"Jul 2025 — Jul 2026"
    }
  ]
};
