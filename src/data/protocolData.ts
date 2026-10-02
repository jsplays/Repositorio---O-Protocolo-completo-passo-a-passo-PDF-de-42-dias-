import { MealDay, WeekMeta, FoodSubstitution, ShoppingCategory } from '../types/protocol';

export const PROTOCOL_TITLE = "PROTOCOLO VERÃO 42";
export const PROTOCOL_SUBTITLE = "Um plano prático de 42 dias para melhorar sua alimentação, sua rotina e sua relação com o corpo.";
export const PROTOCOL_TAGLINE = "Do bloquinho à praia: 42 dias de escolhas possíveis.";

export const CASA_PILLARS = [
  {
    letter: "C",
    title: "Comida de verdade",
    description: "Priorizar alimentos in natura ou minimamente processados, como arroz, feijão, ovos, carnes, peixes, frutas, legumes, verduras, raízes, leite e derivados.",
    focus: "Alimentos naturais, menos embalagens, mais comida feita em casa."
  },
  {
    letter: "A",
    title: "Atenção à fome e à saciedade",
    description: "Perceber sinais do corpo: fome física real vs. ansiedade, tédio, cansaço ou vontade específica de comer.",
    focus: "Comer com calma, saboreando cada refeição e sem pressa."
  },
  {
    letter: "S",
    title: "Simplicidade no planejamento",
    description: "Planejar refeições básicas, repetir preparos que funcionam e ter opções práticas já prontas na geladeira.",
    focus: "Menos decisões de última hora, mais facilidade na rotina."
  },
  {
    letter: "A",
    title: "Atividade e autocuidado",
    description: "Caminhar, fortalecer os músculos, priorizar o sono, lidar com o estresse e cuidar da saúde emocional.",
    focus: "Movimento prazeroso e descanso de qualidade todos os dias."
  }
];

export const CORE_BEHAVIORS = [
  "Montar refeições com fonte de proteína, vegetais e fonte de carboidrato.",
  "Beber água regularmente, de acordo com sua sede e suas necessidades.",
  "Fazer algum movimento possível na maioria dos dias.",
  "Planejar parte das refeições antes que a fome apareça.",
  "Registrar comportamentos e bem-estar, não apenas o peso."
];

export const WEEKS_DATA: WeekMeta[] = [
  {
    week: 1,
    title: "Começar sem radicalismo",
    daysRange: "Dias 1 a 7",
    objective: "Organizar a rotina e aumentar a presença de alimentos naturais.",
    behaviorGoal: "Fazer pelo menos uma refeição principal por dia sentado, sem tela, observando o sabor e a saciedade.",
    tip: "Não tente mudar tudo ao mesmo tempo. Comece pelo café da manhã ou pelo almoço."
  },
  {
    week: 2,
    title: "Planejamento simples",
    daysRange: "Dias 8 a 14",
    objective: "Reduzir decisões de última hora.",
    behaviorGoal: "Deixar duas fontes de proteína, dois vegetais e duas frutas disponíveis em casa.",
    tip: "Cozinhe uma panela de arroz, uma leguminosa e uma proteína para facilitar os dias mais corridos."
  },
  {
    week: 3,
    title: "Comer com atenção",
    daysRange: "Dias 15 a 21",
    objective: "Perceber fome, saciedade e emoções associadas à comida.",
    behaviorGoal: "Fazer pelo menos uma refeição por dia em ritmo mais lento.",
    tip: "Antes de comer, pergunte: 'Estou com fome física, vontade emocional ou apenas seguindo um hábito?'"
  },
  {
    week: 4,
    title: "Vencer o tudo ou nada",
    daysRange: "Dias 22 a 28",
    objective: "Aprender a retomar sem culpa.",
    behaviorGoal: "Se uma refeição sair do planejado, voltar à rotina na próxima, sem jejum ou compensação.",
    tip: "Consistência significa voltar muitas vezes, não acertar todas as vezes."
  },
  {
    week: 5,
    title: "Movimento e energia",
    daysRange: "Dias 29 a 35",
    objective: "Inserir movimento de maneira gradual e prazerosa.",
    behaviorGoal: "Completar 150 min de caminhada ou movimento na semana, respeitando os seus limites.",
    tip: "Se 20 minutos contínuos forem difíceis, faça duas sessões de 10 minutos ao longo do dia."
  },
  {
    week: 6,
    title: "Consolidar",
    daysRange: "Dias 36 a 42",
    objective: "Escolher hábitos para continuar após o protocolo.",
    behaviorGoal: "Selecionar cinco práticas que você pretende manter para a sua vida.",
    tip: "O fim do protocolo não é o fim do cuidado. É o momento de transformar as melhores práticas em rotina."
  }
];

export const MEAL_DAYS: MealDay[] = [
  // SEMANA 1
  {
    day: 1,
    week: 1,
    breakfast: "Aveia com banana e iogurte natural",
    lunch: "Arroz, feijão, frango grelhado e salada",
    snack: "Maçã com castanhas",
    dinner: "Omelete com tomate e pão"
  },
  {
    day: 2,
    week: 1,
    breakfast: "Pão integral, ovo e mamão",
    lunch: "Carne moída, batata assada e legumes",
    snack: "Iogurte natural",
    dinner: "Sopa de legumes com frango"
  },
  {
    day: 3,
    week: 1,
    breakfast: "Cuscuz com ovo e laranja",
    lunch: "Peixe, arroz, feijão e couve",
    snack: "Banana",
    dinner: "Sanduíche de atum com salada"
  },
  {
    day: 4,
    week: 1,
    breakfast: "Iogurte, aveia e morangos",
    lunch: "Frango desfiado, mandioca e salada",
    snack: "Pera",
    dinner: "Arroz, lentilha e legumes"
  },
  {
    day: 5,
    week: 1,
    breakfast: "Tapioca com queijo e tomate",
    lunch: "Carne, arroz, feijão e abóbora",
    snack: "Fruta da estação",
    dinner: "Ovos mexidos com batata e salada"
  },
  {
    day: 6,
    week: 1,
    breakfast: "Pão com ricota e fruta",
    lunch: "Macarrão com frango e legumes",
    snack: "Iogurte",
    dinner: "Torta caseira de legumes"
  },
  {
    day: 7,
    week: 1,
    breakfast: "Mingau de aveia com canela",
    lunch: "Refeição familiar usando o método do prato",
    snack: "Pipoca caseira",
    dinner: "Salada completa com grão-de-bico"
  },

  // SEMANA 2
  {
    day: 8,
    week: 2,
    breakfast: "Cuscuz com queijo e melão",
    lunch: "Arroz, feijão, carne e beterraba",
    snack: "Iogurte",
    dinner: "Crepioca com frango"
  },
  {
    day: 9,
    week: 2,
    breakfast: "Pão, pasta de grão-de-bico e tomate",
    lunch: "Peixe, purê de batata e brócolis",
    snack: "Uvas",
    dinner: "Sopa de lentilha"
  },
  {
    day: 10,
    week: 2,
    breakfast: "Vitamina de banana com aveia",
    lunch: "Frango, arroz e salada colorida",
    snack: "Castanhas e fruta",
    dinner: "Omelete de legumes"
  },
  {
    day: 11,
    week: 2,
    breakfast: "Tapioca com ovo",
    lunch: "Carne cozida, mandioca e couve",
    snack: "Iogurte com fruta",
    dinner: "Sanduíche de frango"
  },
  {
    day: 12,
    week: 2,
    breakfast: "Aveia com maçã",
    lunch: "Arroz, feijão, sardinha e salada",
    snack: "Pera",
    dinner: "Batata recheada com atum"
  },
  {
    day: 13,
    week: 2,
    breakfast: "Pão de queijo caseiro e fruta",
    lunch: "Frango assado, arroz e legumes",
    snack: "Pipoca caseira",
    dinner: "Caldo de abóbora com carne"
  },
  {
    day: 14,
    week: 2,
    breakfast: "Iogurte com mamão e sementes",
    lunch: "Refeição livre com atenção à fome",
    snack: "Fruta",
    dinner: "Jantar simples com sobras planejadas"
  },

  // SEMANA 3
  {
    day: 15,
    week: 3,
    breakfast: "Ovos, pão e kiwi",
    lunch: "Arroz, feijão, frango e cenoura",
    snack: "Iogurte",
    dinner: "Salada de macarrão com atum"
  },
  {
    day: 16,
    week: 3,
    breakfast: "Mingau de aveia e mamão",
    lunch: "Carne, arroz e vagem",
    snack: "Fruta",
    dinner: "Omelete com mandioca"
  },
  {
    day: 17,
    week: 3,
    breakfast: "Tapioca com frango",
    lunch: "Peixe, batata e salada",
    snack: "Castanhas",
    dinner: "Feijão com arroz e ovo"
  },
  {
    day: 18,
    week: 3,
    breakfast: "Pão com queijo e pera",
    lunch: "Lentilha, arroz e legumes",
    snack: "Iogurte",
    dinner: "Wrap de frango e salada"
  },
  {
    day: 19,
    week: 3,
    breakfast: "Cuscuz com ovo",
    lunch: "Carne moída, macarrão e salada",
    snack: "Banana",
    dinner: "Sopa de legumes com carne"
  },
  {
    day: 20,
    week: 3,
    breakfast: "Iogurte com granola simples",
    lunch: "Frango, feijão, arroz e abóbora",
    snack: "Fruta",
    dinner: "Tostada com ricota e tomate"
  },
  {
    day: 21,
    week: 3,
    breakfast: "Café da manhã escolhido por você",
    lunch: "Prato familiar equilibrado",
    snack: "Sobremesa em porção confortável",
    dinner: "Refeição leve conforme a fome"
  },

  // SEMANA 4
  {
    day: 22,
    week: 4,
    breakfast: "Pão integral com ovo e fruta",
    lunch: "Arroz, feijão, peixe e salada",
    snack: "Iogurte",
    dinner: "Panqueca de frango"
  },
  {
    day: 23,
    week: 4,
    breakfast: "Aveia com pera",
    lunch: "Frango, batata e legumes",
    snack: "Castanhas",
    dinner: "Arroz com lentilha e ovo"
  },
  {
    day: 24,
    week: 4,
    breakfast: "Cuscuz com queijo",
    lunch: "Carne, arroz e salada",
    snack: "Fruta",
    dinner: "Sopa de frango"
  },
  {
    day: 25,
    week: 4,
    breakfast: "Tapioca com ovo e tomate",
    lunch: "Grão-de-bico, arroz e legumes",
    snack: "Iogurte",
    dinner: "Sanduíche de atum"
  },
  {
    day: 26,
    week: 4,
    breakfast: "Iogurte com banana",
    lunch: "Frango, mandioca e couve",
    snack: "Fruta",
    dinner: "Omelete com salada"
  },
  {
    day: 27,
    week: 4,
    breakfast: "Pão com pasta de amendoim e fruta",
    lunch: "Massa com carne e legumes",
    snack: "Pipoca caseira",
    dinner: "Feijão, arroz e ovo"
  },
  {
    day: 28,
    week: 4,
    breakfast: "Refeição matinal habitual",
    lunch: "Refeição social com atenção às porções",
    snack: "Conforme a fome",
    dinner: "Jantar simples, sem compensar"
  },

  // SEMANA 5
  {
    day: 29,
    week: 5,
    breakfast: "Ovo, pão e mamão",
    lunch: "Arroz, feijão, frango e salada",
    snack: "Fruta",
    dinner: "Batata com carne desfiada"
  },
  {
    day: 30,
    week: 5,
    breakfast: "Vitamina de fruta com aveia",
    lunch: "Peixe, arroz e legumes",
    snack: "Iogurte",
    dinner: "Omelete com pão"
  },
  {
    day: 31,
    week: 5,
    breakfast: "Cuscuz com queijo",
    lunch: "Lentilha, arroz e salada",
    snack: "Castanhas",
    dinner: "Macarrão com frango"
  },
  {
    day: 32,
    week: 5,
    breakfast: "Iogurte com frutas",
    lunch: "Carne cozida, mandioca e couve",
    snack: "Banana",
    dinner: "Sopa de legumes"
  },
  {
    day: 33,
    week: 5,
    breakfast: "Tapioca com ovo",
    lunch: "Frango, arroz, feijão e abóbora",
    snack: "Fruta",
    dinner: "Sanduíche de grão-de-bico"
  },
  {
    day: 34,
    week: 5,
    breakfast: "Pão com ricota e tomate",
    lunch: "Sardinha, batata e salada",
    snack: "Iogurte",
    dinner: "Arroz com ovos e legumes"
  },
  {
    day: 35,
    week: 5,
    breakfast: "Café da manhã favorito",
    lunch: "Refeição flexível usando o método do prato",
    snack: "Conforme a fome",
    dinner: "Jantar leve e planejado"
  },

  // SEMANA 6
  {
    day: 36,
    week: 6,
    breakfast: "Aveia com banana e canela",
    lunch: "Arroz, feijão, frango e salada",
    snack: "Fruta",
    dinner: "Omelete com legumes"
  },
  {
    day: 37,
    week: 6,
    breakfast: "Pão com ovo e mamão",
    lunch: "Peixe, batata e brócolis",
    snack: "Iogurte",
    dinner: "Sopa de lentilha"
  },
  {
    day: 38,
    week: 6,
    breakfast: "Cuscuz com queijo",
    lunch: "Carne, arroz e abóbora",
    snack: "Castanhas",
    dinner: "Sanduíche de frango"
  },
  {
    day: 39,
    week: 6,
    breakfast: "Tapioca com frango",
    lunch: "Grão-de-bico, arroz e salada",
    snack: "Fruta",
    dinner: "Ovos com mandioca"
  },
  {
    day: 40,
    week: 6,
    breakfast: "Iogurte com aveia e morango",
    lunch: "Frango, feijão, arroz e couve",
    snack: "Banana",
    dinner: "Panqueca de carne"
  },
  {
    day: 41,
    week: 6,
    breakfast: "Pão com ricota e fruta",
    lunch: "Massa com atum e legumes",
    snack: "Iogurte",
    dinner: "Salada completa com ovo"
  },
  {
    day: 42,
    week: 6,
    breakfast: "Café da manhã escolhido por você",
    lunch: "Refeição de celebração equilibrada",
    snack: "Sobremesa sem culpa",
    dinner: "Jantar conforme sua fome"
  }
];

export const FOOD_SUBSTITUTIONS: FoodSubstitution[] = [
  { original: "Arroz", alternatives: ["Batata inglesa", "Mandioca (aipim)", "Milho", "Massa (macarrão)", "Cuscuz", "Batata-doce", "Inhame"], note: "Carboidrato base de fácil digestão" },
  { original: "Feijão", alternatives: ["Lentilha", "Ervilha", "Grão-de-bico", "Feijão fradinho", "Feijão preto"], note: "Leguminosa rica em fibras e minerais" },
  { original: "Frango", alternatives: ["Ovos", "Peixe (tilápia, merluza)", "Carne bovina magra", "Tofu grelhado", "Atum em pedaços"], note: "Proteína magra para construção e saciedade" },
  { original: "Iogurte natural", alternatives: ["Leite desnatado ou integral", "Uma porção de queijo branco (ricota/minas)", "Kefir", "Bebida vegetal enriquecida com cálcio"], note: "Laticínios e cálcio" },
  { original: "Banana", alternatives: ["Mamão", "Maçã", "Pera", "Manga", "Melão", "Qualquer fruta da estação"], note: "Fruta com energia e potássio" },
  { original: "Alface", alternatives: ["Couve fatiada", "Rúcula", "Repolho ralado", "Agrião", "Espinafre"], note: "Folhosos verdes para volume e micronutrientes" },
  { original: "Batata", alternatives: ["Mandioca", "Inhame", "Batata-doce", "Abóbora cabotiá assada"], note: "Tubérculos e raízes ricos em amido" },
  { original: "Castanhas", alternatives: ["Sementes de abóbora ou girassol", "Pasta de amendoim integral", "Nozes", "Amêndoas"], note: "Gorduras boas e saciedade" },
  { original: "Pão francês / de forma", alternatives: ["Tapioca", "Cuscuz de milho", "Aveia em flocos", "Pão integral"], note: "Base matinal prática" },
  { original: "Atum", alternatives: ["Sardinha fresca ou em lata", "Frango desfiado", "Ovos cozidos", "Queijo cottage/ricota"], note: "Proteína rápida para lanches e saladas" }
];

export const TRAFFIC_LIGHT_DATA = {
  green: {
    title: "Verde: Priorize com frequência",
    description: "Alimentos in natura ou minimamente processados. São a base das suas refeições diárias para saciedade, nutrição e energia estável.",
    items: [
      { name: "Grãos & Leguminosas", examples: "Arroz, feijão, lentilha, grão-de-bico, milho" },
      { name: "Proteínas Naturais", examples: "Ovos, frango, peixe, carnes magras, sardinha, tofu" },
      { name: "Laticínios Básicos", examples: "Leite, iogurte natural, queijos frescos" },
      { name: "Vegetais & Folhas", examples: "Alface, couve, rúcula, tomate, brócolis, abóbora, cenoura, abobrinha" },
      { name: "Frutas Frescas", examples: "Banana, mamão, maçã, laranja, pera, melão, frutas da estação" },
      { name: "Raízes & Tubérculos", examples: "Batata, mandioca, batata-doce, inhame" },
      { name: "Sementes & Oleaginosas", examples: "Castanhas, sementes de girassol, gergelim, aveia" }
    ]
  },
  yellow: {
    title: "Amarelo: Consuma com atenção à quantidade e frequência",
    description: "Alimentos processados simples ou mais concentrados em calorias. Podem fazer parte da rotina sem culpa, com moderação e consciência.",
    items: [
      { name: "Panificação & Massas", examples: "Pães em geral, massas, massas caseiras" },
      { name: "Queijos Curados", examples: "Parmesão, provolone, queijos amarelos" },
      { name: "Cereais Compostos", examples: "Granola comercial com mel, cereais matinais simples" },
      { name: "Bebidas Naturais Concentradas", examples: "Sucos de fruta naturais concentrados (laranja, uva)" },
      { name: "Proteínas mais Gordurosas", examples: "Cortes de carne com gordura aparente, linguiças artesanais" },
      { name: "Doces Caseiros", examples: "Sobremesas preparadas em casa, bolos simples, biscoitos artesanais" }
    ]
  },
  red: {
    title: "Vermelho: Consumo ocasional (não proibido)",
    description: "Ultraprocessados e alimentos com alto teor de açúcar, sal e aditivos. Não são proibidos radicalmente — apenas não devem substituir suas refeições de verdade.",
    items: [
      { name: "Bebidas Açucaradas & Álcool", examples: "Refrigerantes convencionais, bebidas alcoólicas, energéticos" },
      { name: "Fast Food & Salgadinhos", examples: "Frituras de pacote, salgadinhos de milho, lanches ultraprocessados" },
      { name: "Doces Industriais", examples: "Balas, chocolates com alto açúcar, guloseimas, biscoitos recheados" },
      { name: "Embutidos Ultraprocessados", examples: "Salsichas, nuggets congelados, pratos prontos ultracongelados" }
    ]
  }
};

export const INITIAL_SHOPPING_CATEGORIES: ShoppingCategory[] = [
  {
    id: "proteinas",
    name: "Proteínas",
    items: [
      { id: "p1", name: "Ovos", checked: false },
      { id: "p2", name: "Peito ou coxa de frango", checked: false },
      { id: "p3", name: "Peixe fresco ou congelado", checked: false },
      { id: "p4", name: "Sardinha (em lata ou fresca)", checked: false },
      { id: "p5", name: "Carne bovina magra (moída/patinho)", checked: false },
      { id: "p6", name: "Atum em pedaços", checked: false },
      { id: "p7", name: "Feijão carioca ou preto", checked: false },
      { id: "p8", name: "Lentilha ou grão-de-bico", checked: false },
      { id: "p9", name: "Iogurte natural integral/desnatado", checked: false },
      { id: "p10", name: "Leite e queijo (minas, ricota)", checked: false }
    ]
  },
  {
    id: "carboidratos",
    name: "Carboidratos & Grãos",
    items: [
      { id: "c1", name: "Arroz (branco ou integral)", checked: false },
      { id: "c2", name: "Aveia em flocos", checked: false },
      { id: "c3", name: "Pão (integral ou tradicional)", checked: false },
      { id: "c4", name: "Flocão de milho para cuscuz", checked: false },
      { id: "c5", name: "Goma de tapioca", checked: false },
      { id: "c6", name: "Macarrão de sua preferência", checked: false },
      { id: "c7", name: "Batata inglesa", checked: false },
      { id: "c8", name: "Mandioca (aipim)", checked: false },
      { id: "c9", name: "Batata-doce ou inhame", checked: false }
    ]
  },
  {
    id: "vegetais",
    name: "Vegetais & Saladas",
    items: [
      { id: "v1", name: "Alface e rúcula", checked: false },
      { id: "v2", name: "Couve manteiga", checked: false },
      { id: "v3", name: "Tomate", checked: false },
      { id: "v4", name: "Cenoura", checked: false },
      { id: "v5", name: "Abóbora cabotiá", checked: false },
      { id: "v6", name: "Beterraba", checked: false },
      { id: "v7", name: "Brócolis ou couve-flor", checked: false },
      { id: "v8", name: "Abobrinha italiana", checked: false },
      { id: "v9", name: "Repolho (verde ou roxo)", checked: false }
    ]
  },
  {
    id: "frutas",
    name: "Frutas",
    items: [
      { id: "f1", name: "Banana", checked: false },
      { id: "f2", name: "Mamão papaia ou formosa", checked: false },
      { id: "f3", name: "Maçã", checked: false },
      { id: "f4", name: "Laranja", checked: false },
      { id: "f5", name: "Pera", checked: false },
      { id: "f6", name: "Melão ou melancia", checked: false },
      { id: "f7", name: "Morangos ou uvas", checked: false }
    ]
  },
  {
    id: "temperos",
    name: "Temperos & Básicos",
    items: [
      { id: "t1", name: "Alho e cebola", checked: false },
      { id: "t2", name: "Limão", checked: false },
      { id: "t3", name: "Cheiro-verde (salsa e cebolinha)", checked: false },
      { id: "t4", name: "Azeite de oliva", checked: false },
      { id: "t5", name: "Páprica doce/defumada", checked: false },
      { id: "t6", name: "Cúrcuma (açafrão-da-terra)", checked: false },
      { id: "t7", name: "Ervas secas (orégano, alecrim)", checked: false },
      { id: "t8", name: "Castanhas ou sementes", checked: false }
    ]
  }
];

export const MOVEMENT_LEVELS = [
  {
    level: "Iniciante",
    description: "Ideal para quem está recomeçando ou sem rotina de exercícios.",
    prescription: [
      "10 minutos de caminhada contínua, 4 vezes por semana.",
      "Aumentar gradualmente para 20 a 30 minutos conforme o corpo se adaptar.",
      "Levantar-se e movimentar-se por 2 a 3 minutos ao longo do dia de trabalho."
    ]
  },
  {
    level: "Intermediário",
    description: "Para quem já caminha ou tem disposição para novos estímulos.",
    prescription: [
      "30 minutos de caminhada ativa, 5 vezes por semana.",
      "Exercícios de fortalecimento muscular 2 vezes por semana (peso corporal ou academia).",
      "1 dia de atividade recreativa ou prazerosa (dança, bicicleta, natação)."
    ]
  },
  {
    level: "Avançado",
    description: "Para quem já treina e deseja manter consistência e energia.",
    prescription: [
      "Combinação planejada de atividade aeróbica moderada a intensa com musculação.",
      "Aumentar duração ou intensidade aos poucos, monitorando o descanso.",
      "Reservar obrigatoriamente pelo menos 1 a 2 períodos de recuperação ativa ou sono reparador."
    ]
  }
];

export const SUSTAINABLE_HABITS_LIST = [
  "Incluir frutas diariamente no café ou nos lanches",
  "Incluir vegetais e verduras em almoço e jantar",
  "Planejar refeições antes que a fome extrema chegue",
  "Beber água de forma regular e consciente ao longo do dia",
  "Caminhar ou praticar movimento físico regularmente",
  "Fazer fortalecimento muscular pelo menos duas vezes na semana",
  "Dormir em horários regulares e respeitar o descanso",
  "Comer com menos telas e distrações, sentindo a saciedade",
  "Preparar mais comida em casa com comida de verdade",
  "Observar os sinais de fome física e vontades emocionais",
  "Manter espaço para o prazer e a convivência social sem culpa"
];

export const FAQS = [
  {
    q: "Preciso cortar arroz e feijão?",
    a: "Não! Arroz com feijão é uma das combinações nutricionais mais completas da cultura alimentar brasileira. Eles oferecem aminoácidos essenciais, fibras e saciedade duradoura. Ajuste apenas a quantidade à sua fome e rotina."
  },
  {
    q: "Posso comer doce?",
    a: "Sim. O programa não impõe proibições radicais ou culpa moral. Quando quiser, consuma em porção confortável e de preferência após uma refeição balanceada, saboreando com atenção."
  },
  {
    q: "Preciso contar calorias?",
    a: "Não necessariamente. O Método C.A.S.A. utiliza a proporção visual do prato, a escuta da fome e o planejamento prático de alimentos in natura, o que já ajusta o balanço naturalmente."
  },
  {
    q: "Posso trocar o jantar por um lanche?",
    a: "Sim, desde que seja um lanche nutritivo que forneça proteína (ex: ovo, frango, queijo), carboidrato de qualidade (pão, tapioca, cuscuz) e algo vegetal (salada, tomate, fruta)."
  },
  {
    q: "Posso fazer o protocolo sendo vegetariano?",
    a: "Com certeza! Substitua carnes por feijões, lentilhas, grão-de-bico, ovos, queijos, iogurtes e tofu de acordo com o seu padrão alimentar."
  },
  {
    q: "O peso pode variar durante os 42 dias?",
    a: "Sim, é completamente fisiológico. Retenção hídrica, fase do ciclo menstrual, consumo de sal, trânsito intestinal e noites mal dormidas alteram a balança sem significar ganho de gordura. Avalie disposição e hábitos."
  },
  {
    q: "E se eu sair do plano em um dia?",
    a: "Retome imediatamente na próxima refeição. Não existe recomeçar do zero e não há necessidade de compensação ou jejum forçado. Consistência é voltar muitas vezes."
  },
  {
    q: "Quando devo procurar um médico ou nutricionista?",
    a: "Se você tem diabetes, hipertensão, histórico de transtornos alimentares, doenças renais ou gastrointestinais, gestação ou lactação, procure sempre acompanhamento individualizado."
  }
];

export const MINDFUL_PAUSE_STEPS = [
  {
    step: 1,
    title: "Faça uma pausa de 2 minutos",
    text: "Afaste-se da geladeira ou do armário por instantes. Respire profundamente três vezes."
  },
  {
    step: 2,
    title: "Beba um copo de água fresca",
    text: "Frequentemente a sede ou o cansaço são interpretados pelo cérebro como desejo imediato de comer."
  },
  {
    step: 3,
    title: "Pergunte do que você realmente precisa",
    text: "É fome no estômago? Ou é tédio, cansaço do dia, frustração ou hábito de mastigar algo?"
  },
  {
    step: 4,
    title: "Se decidir comer, coma sentado e sem culpa",
    text: "Coloque em um prato, desligue telas por 5 minutos e saboreie verdadeiramente cada mordida."
  },
  {
    step: 5,
    title: "Sem compensações posteriores",
    text: "O que você comeu fez parte do seu dia. Nada de pular a próxima refeição ou punir o corpo."
  }
];
