export const translations = {
  sk: {
    language: "EN",
    logout: "Odhlásiť sa",

    modules: "Moduly",

    mask: "Konštrukcia masky",
    maskDesc: "Návrh informačných a frozen bitov",

    encoder: "Encoder",
    encoderDesc: "Polárne kódovanie krok za krokom",

    decoder: "Decoder SC",
    decoderDesc: "SC dekódovanie a rozhodnutia",

    ber: "BER simulácia",
    berDesc: "Simulácia bitovej chybovosti",

    polarization: "Channel polarization",
    polarizationDesc: "Vizualizácia polarizácie kanálov",

    maskPageTitle: "Konštrukcia kódu – informačné a frozen bity",

    maskPageDescription:
      "Táto časť ukazuje, ktoré pozície v polárnom kóde budú použité na prenos informačných bitov a ktoré budú nastavené ako frozen bity. Používateľ môže meniť parametre kódu a sledovať, ako sa mení výsledná maska.",

    codeParameters: "Parametre kódu",
    codeLengthN: "Dĺžka kódu N",
    codeRateR: "Kódový pomer R",
    designEbN0: "Návrhové Eb/N0 (dB)",
    calculatingMask: "Počítam masku...",

    maskSummaryInfo:
      "Na základe zvolenej dĺžky kódu N, kódového pomeru R a návrhovej hodnoty Eb/N0 sa vytvorí maska informačných a frozen bitov. Spoľahlivejšie podkanály sú použité na prenos informačných bitov.",

    selectedParameters: "Zvolené parametre",

    designEbN0Label: "návrhové Eb/N0",

    positionsSplitTitle: "Rozdelenie pozícií",

    infoPositions: "Info pozície",
    infoPositionsDescription:
      "Tieto pozície prenášajú informačné bity.",

    frozenPositions: "Frozen pozície",
    frozenPositionsDescription:
      "Tieto pozície sú pevne nastavené, spravidla na hodnotu 0.",

    maskVisualization: "Vizualizácia masky",

    maskVisualizationDescription:
      "Hodnota 1 predstavuje informačný bit, hodnota 0 predstavuje frozen bit.",

    maskInterpretationTitle: "Stručné vysvetlenie",

    maskInterpretationPart1:
      "Pre zvolený kód vzniklo",

    informationPositionsLower: "informačných pozícií",

    and: "a",

    frozenPositionsLower: "frozen pozícií",

    maskInterpretationPart2:
      "Pri väčšej hodnote K sa do prenosu zaraďuje viac podkanálov, vrátane menej spoľahlivých. Pri menšej hodnote K sa využívajú len najspoľahlivejšie pozície.",

    maskTableTitle: "Tabuľka všetkých pozícií",

    index: "Index",
    type: "Typ",

    infoType: "info",
    frozenType: "frozen",

    encoderPageTitle: "Encoder – krok za krokom",
    encoderPageDescription:
      "Táto časť ukazuje, ako sa informačné bity vložia do u-vektora a ako sa následne cez polárnu transformáciu vytvorí výsledné kódové slovo.",
    showUntilStage: "Zobraziť do stage",
    back: "Back",
    next: "Next",
    encoderOkMessage: "OK: posledný stage sa zhoduje s kódovým slovom c.",

    enterBits: "Zadaj",
    bitsCommaSeparated: "bitov (oddelené čiarkou)",
    calculating: "Počítam...",
    runEncoder: "Spustiť encoder",

    encoderSummaryInfo:
      "Informačné bity sa najprv vložia na spoľahlivé pozície u-vektora a potom sa vykoná polárna transformácia po jednotlivých stage-och až po výsledné kódové slovo.",

    uVectorWithFrozen: "u (s vloženými frozen bitmi)",

    codewordC: "kódové slovo c",

    butterflyDiagramTitle: "Schéma encoderu (butterfly)",
    butterflyDiagramDescription:
      "V každom stage sa v horných vetvách robí XOR s príslušnou spodnou vetvou (spodná vetva ostáva). Čísla pri uzloch ukazujú hodnoty po každom stage.",

    generatorMatrixTitle: "Generátorová matica G",
    generatorMatrixDescriptionPart1:
      "Kódovanie polárneho kódu je možné zapísať aj maticovo ako",
    where: "kde",
    generatorMatrixDescriptionPart2:
      "Matica G vzniká Kroneckerovým súčinom základnej matice F.",
    baseMatrix: "Základná matica",
    forCurrent: "Pre aktuálne",
    holds: "platí",

    encoderStagesTitle: "Hodnoty po jednotlivých stage-och",
    bitIndex: "Index bitu",
    stage: "Stage",

    decoderPageTitle: "SC dekódovanie – krok za krokom",
    decoderPageDescription:
      "Táto časť ukazuje, ako prebieha successive cancellation decoding krok po kroku.",
    decoderVisualizationTitle: "Vizualizácia dekódovania",
    decoderVisualizationNote:
      "Jeden krok v tejto vizualizácii predstavuje rozhodnutie jedného bitu alebo combine operáciu. Pri rozhodnutí bitu sa zvýrazní celá cesta v SC strome k príslušnému listu, pretože dekodér musí prejsť viacerými úrovňami stromu.",
    showStepsUntil: "Zobraziť kroky do:",

    parameters: "Parametre",
    designEbN0ForMask: "Návrhové Eb/N0 pre masku (dB)",
    maskMode: "Režim masky",
    automaticMask: "Automatická maska",
    manualMask: "Ručná maska",
    channelEbN0: "Eb/N0 kanála (dB)",
    channelMode: "Režim kanála",
    idealNoNoise: "Bez šumu (ideálne)",
    awgnWithNoise: "AWGN (so šumom)",
    valuesCommaSeparated: "hodnôt, oddelené čiarkou",
    values01: "hodnôt 0/1",
    runDecoding: "Spustiť dekódovanie",

    originalMessage: "Pôvodná správa",
    encodedCodeword: "Zakódované slovo c",
    uHatResult: "Výsledok u_hat",
    msgHatEstimate: "Odhad správy msg_hat",
    comparison: "Porovnanie",
    decodingOk: "Dekódovanie OK ✅",
    decodingMismatch: "Dekódovanie NESEDÍ ❌",

    currentStepDescription: "Opis aktuálneho kroku",

    decisionLogTitle: "Tabuľka krokov (log)",
    step: "Krok",
    tableIndex: "Index",
    tableType: "Typ",
    decision: "Rozhodnutie",

    decoderTreeTitle: "SC dekódovanie – vizualizácia krokov (strom)",
    bitIndexLeaves: "Index bitu (listy)",
    treeDepth: "Úroveň stromu (depth)",

    simulationParameters: "Parametre simulácie",
    berPageTitle: "BER simulácia polárnych kódov",
    berPageDescription:
      "Táto časť umožňuje simulovať bitovú chybovosť (BER) polárnych kódov pri SC dekódovaní na AWGN kanáli a porovnať výsledok s teoretickou BER nekódovaného BPSK prenosu.",
    simulationRunning: "Simulácia prebieha...",
    simulationFinished: "Simulácia dokončená.",
    simulationHint:
      "Nastav parametre simulácie vľavo a klikni na „Spustiť simuláciu“.",
    resultsTable: "Tabuľka výsledkov",
    shortEvaluation: "Stručné zhodnotenie",

    selectCodeLengthsN: "Vyber dĺžky kódu N",
    ebn0From: "Eb/N0 od (dB)",
    ebn0To: "Eb/N0 do (dB)",
    ebn0Step: "Krok Eb/N0",
    transmittedBitsCount: "Počet prenesených bitov",
    minErrorsForPlot: "Min. počet chýb pre vykreslenie bodu",
    runSimulation: "Spustiť simuláciu",
    configurationPreview: "Preview konfigurácií",

    berChartTitle: "BER polárnych kódov pri SC dekódovaní",
    theoreticalUncodedBpsk: "Teoretická BER (nekódovaný BPSK)",
    notEnoughErrors: "nedostatok chýb",

    berInterpretationText:
      "So zvyšujúcou sa hodnotou Eb/N0 chybovosť klesá. Pri väčších hodnotách N sa zvyčajne prejavuje lepší výkon polárneho kódu. Porovnanie s nekódovaným BPSK ukazuje prínos kódovania pri vhodných parametroch.",

    polarizationPageTitle: "Channel polarization demo (BEC)",
    polarizationPageDescription:
      "Táto časť ukazuje princíp polarizácie kanálov na príklade BEC (Binary Erasure Channel).",
    erasureProbability: "Pravdepodobnosť vymazania ε",
    polarizationLevels: "Počet úrovní polarizácie n",
    showSortedValues: "Zobraziť zoradené hodnoty",
    showHistogram: "Zobraziť histogram",
    polarizationIntroPart1:
      "Pre základný kanál s pravdepodobnosťou vymazania",
    polarizationIntroPart2:
      "vznikajú po jednom kroku dva podkanály:",
    worseSubchannel: "horší podkanál",
    betterSubchannel: "lepší podkanál",
    polarizationIntroPart3:
      "Po opakovaní tejto transformácie sa podkanály postupne polarizujú: niektoré sú veľmi spoľahlivé",
    polarizationIntroPart4:
      "iné veľmi nespoľahlivé",
    epsilonClose0: "ε blízko 0",
    epsilonClose1: "ε blízko 1",
    basicInformation: "Základné informácie",
    numberOfResultingSubchannels: "Počet výsledných podkanálov",
    atEpsilon: "Pri ε =",
    afterLevels: "sa po",
    levelsCreates: "úrovniach vytvorí",
    syntheticSubchannels: "syntetizovaných podkanálov",
    resultingSubchannelValues: "Výsledné hodnoty podkanálov",
    subchannelsNaturalOrder: "Podkanály po polarizácii (prirodzené poradie)",
    subchannelIndex: "Index podkanála",
    epsilonValue: "Hodnota ε",
    sortedSubchannelValues: "Zoradené hodnoty podkanálov",
    sortedEpsilonValues: "Zoradené hodnoty ε po polarizácii",
    normalizedIndex: "Normalizovaný index",
    histogramOfValues: "Histogram hodnôt",
    histogramOfEpsilonValues: "Histogram výsledných hodnôt ε",
    subchannelCount: "Počet podkanálov",
    shortExplanation: "Stručné vysvetlenie",
    afterPolarization: "Po polarizácii vzniklo",
    betterPlural: "lepších",
    worsePlural: "horších",
    subchannelsThreshold: "podkanálov (pri hranici ε = 0.5).",
    howToUnderstand: "Ako tomu rozumieť?",
    valuesNear0:
      "Hodnoty blízko 0 znamenajú, že podkanál je",
    valuesNear1:
      "Hodnoty blízko 1 znamenajú, že podkanál je",
    reliable: "spoľahlivý",
    unreliable: "nespoľahlivý",
    withIncreasingLevels:
      "S rastúcim počtom úrovní n sa hodnoty čoraz viac rozdeľujú k extrémom 0 a 1.",
    polarCodesBasisPart1:
      "Práve tento jav je základom polárnych kódov: na prenos informačných bitov sa vyberajú len tie",
    mostReliableSubchannels: "najspoľahlivejšie podkanály",
    betterReliable: "lepší / spoľahlivejší",
    worseLessReliable: "horší / menej spoľahlivý",

    backToMenu: "Späť na menu",

    homeBadge: "Laboratórium polárnych kódov",
    homeHeroDescription:
      "Interaktívne prostredie na konštrukciu polárnych kódov, kódovanie, SC dekódovanie, BER simuláciu a vizualizáciu polarizácie kanálov.",
    homeTagMask: "Konštrukcia masky",
    homeTagEncoder: "Encoder",
    homeTagDecoder: "SC dekodér",
    homeTagPolarization: "Polarizácia",
    homeProjectOverview: "Prehľad projektu",
    homeModules: "Moduly",
    homeFocus: "Zameranie",
    homePolarCodes: "Polárne kódy",
    homeDecoder: "Dekodér",
    homeChannel: "Kanál",
    homeExploreModules: "Preskúmať moduly",
    homeExploreDescription:
      "Vyber modul a sleduj správanie polárnych kódov krok za krokom.",
    homeWhatCanDo: "Čo môžeš robiť v tejto aplikácii",
    homeActionMask:
      "Konštruovať masky informačných a frozen bitov pre zvolené parametre kódu.",
    homeActionEncoder:
      "Vizualizovať jednotlivé stage-e encoderu a sledovať butterfly transformáciu.",
    homeActionDecoder:
      "Sledovať rozhodnutia SC dekodéra krok za krokom pomocou stromovej vizualizácie.",
    homeActionBer:
      "Porovnávať BER výkonnosť pre viacero dĺžok kódu s teoretickým BPSK prenosom.",
    homeActionPolarization:
      "Preskúmať princíp polarizácie kanálov na jednoduchom BEC príklade.",
    homeSuggestedWorkflow: "Odporúčaný postup",
    homeWorkflow1: "1. Začni konštrukciou masky.",
    homeWorkflow2: "2. Pokračuj vizualizáciou encoderu.",
    homeWorkflow3: "3. Preskúmaj rozhodnutia SC dekodéra.",
    homeWorkflow4: "4. Spusti BER simulácie pre vybrané dĺžky kódu.",
    homeWorkflow5: "5. Použi demo polarizácie kanálov pre lepšiu intuíciu.",
  },

  en: {
    language: "SK",
    logout: "Log out",

    modules: "Modules",

    mask: "Mask construction",
    maskDesc: "Design of information and frozen bits",

    encoder: "Encoder",
    encoderDesc: "Polar encoding step by step",

    decoder: "SC Decoder",
    decoderDesc: "SC decoding and decisions",

    ber: "BER simulation",
    berDesc: "Bit error rate simulation",

    polarization: "Channel polarization",
    polarizationDesc: "Visualization of channel polarization",

    maskPageTitle: "Code construction – information and frozen bits",

    maskPageDescription:
      "This section shows which positions in a polar code are used to transmit information bits and which positions are set as frozen bits. The user can change the code parameters and observe how the resulting mask changes.",

    codeParameters: "Code parameters",
    codeLengthN: "Code length N",
    codeRateR: "Code rate R",
    designEbN0: "Design Eb/N0 (dB)",
    calculatingMask: "Calculating mask...",

    maskSummaryInfo:
      "Based on the selected code length N, code rate R and design Eb/N0 value, a mask of information and frozen bits is constructed. More reliable subchannels are used for transmitting information bits.",

    selectedParameters: "Selected parameters",

    designEbN0Label: "design Eb/N0",

    positionsSplitTitle: "Position split",

    infoPositions: "Information positions",
    infoPositionsDescription:
      "These positions transmit information bits.",

    frozenPositions: "Frozen positions",
    frozenPositionsDescription:
      "These positions are fixed, usually to value 0.",

    maskVisualization: "Mask visualization",

    maskVisualizationDescription:
      "Value 1 represents an information bit, while value 0 represents a frozen bit.",

    maskInterpretationTitle: "Short explanation",

    maskInterpretationPart1:
      "For the selected code, there are",

    informationPositionsLower: "information positions",

    and: "and",

    frozenPositionsLower: "frozen positions",

    maskInterpretationPart2:
      "For larger values of K, more subchannels are used for transmission, including less reliable ones. For smaller values of K, only the most reliable positions are used.",

    maskTableTitle: "Table of all positions",

    index: "Index",
    type: "Type",

    infoType: "information",
    frozenType: "frozen",

    encoderPageTitle: "Encoder – step by step",
    encoderPageDescription:
      "This section shows how information bits are inserted into the u-vector and how the final codeword is then created using the polar transform.",
    showUntilStage: "Show up to stage",
    back: "Back",
    next: "Next",
    encoderOkMessage: "OK: the last stage matches the codeword c.",

    enterBits: "Enter",
    bitsCommaSeparated: "bits (comma separated)",
    calculating: "Calculating...",
    runEncoder: "Run encoder",

    encoderSummaryInfo:
      "Information bits are first inserted into the reliable positions of the u-vector and then the polar transform is performed stage by stage until the final codeword is created.",

    uVectorWithFrozen: "u (with inserted frozen bits)",

    codewordC: "codeword c",

    butterflyDiagramTitle: "Encoder scheme (butterfly)",
    butterflyDiagramDescription:
      "At each stage, the upper branches perform an XOR operation with the corresponding lower branch (the lower branch remains unchanged). The numbers near the nodes show the values after each stage.",

    generatorMatrixTitle: "Generator matrix G",
    generatorMatrixDescriptionPart1:
      "Polar code encoding can also be written in matrix form as",
    where: "where",
    generatorMatrixDescriptionPart2:
      "Matrix G is created using the Kronecker product of the base matrix F.",
    baseMatrix: "Base matrix",
    forCurrent: "For the current",
    holds: "we have",

    encoderStagesTitle: "Values after individual stages",
    bitIndex: "Bit index",
    stage: "Stage",

    decoderPageTitle: "SC decoding – step by step",
    decoderPageDescription:
      "This section shows how successive cancellation decoding works step by step.",
    decoderVisualizationTitle: "Decoding visualization",
    decoderVisualizationNote:
      "One step in this visualization represents either one bit decision or a combine operation. During a bit decision, the full path in the SC tree to the corresponding leaf is highlighted, because the decoder has to pass through multiple tree levels.",
    showStepsUntil: "Show steps up to:",

    parameters: "Parameters",
    designEbN0ForMask: "Design Eb/N0 for mask (dB)",
    maskMode: "Mask mode",
    automaticMask: "Automatic mask",
    manualMask: "Manual mask",
    channelEbN0: "Channel Eb/N0 (dB)",
    channelMode: "Channel mode",
    idealNoNoise: "No noise (ideal)",
    awgnWithNoise: "AWGN (with noise)",
    valuesCommaSeparated: "values, comma separated",
    values01: "0/1 values",
    runDecoding: "Run decoding",

    originalMessage: "Original message",
    encodedCodeword: "Encoded codeword c",
    uHatResult: "Result u_hat",
    msgHatEstimate: "Estimated message msg_hat",
    comparison: "Comparison",
    decodingOk: "Decoding OK ✅",
    decodingMismatch: "Decoding MISMATCH ❌",

    currentStepDescription: "Description of the current step",

    decisionLogTitle: "Decision log table",
    step: "Step",
    tableIndex: "Index",
    tableType: "Type",
    decision: "Decision",

    decoderTreeTitle: "SC decoding – step visualization (tree)",
    bitIndexLeaves: "Bit index (leaves)",
    treeDepth: "Tree level (depth)",

    simulationParameters: "Simulation parameters",
    berPageTitle: "BER simulation of polar codes",
    berPageDescription:
      "This section allows simulating the bit error rate (BER) of polar codes with SC decoding over an AWGN channel and comparing the result with the theoretical BER of uncoded BPSK transmission.",
    simulationRunning: "Simulation is running...",
    simulationFinished: "Simulation finished.",
    simulationHint:
      "Set the simulation parameters on the left and click “Run simulation”.",
    resultsTable: "Results table",
    shortEvaluation: "Short evaluation",

    selectCodeLengthsN: "Select code lengths N",
    ebn0From: "Eb/N0 from (dB)",
    ebn0To: "Eb/N0 to (dB)",
    ebn0Step: "Eb/N0 step",
    transmittedBitsCount: "Number of transmitted bits",
    minErrorsForPlot: "Min. number of errors for plotting a point",
    runSimulation: "Run simulation",
    configurationPreview: "Configuration preview",

    berChartTitle: "BER of polar codes with SC decoding",
    theoreticalUncodedBpsk: "Theoretical BER (uncoded BPSK)",
    notEnoughErrors: "not enough errors",

    berInterpretationText:
      "As the Eb/N0 value increases, the error rate decreases. Larger values of N usually provide better performance of the polar code. Comparison with uncoded BPSK demonstrates the coding gain for suitable parameters.",

    polarizationPageTitle: "Channel polarization demo (BEC)",
    polarizationPageDescription:
      "This section demonstrates the principle of channel polarization using the BEC (Binary Erasure Channel).",
    erasureProbability: "Erasure probability ε",
    polarizationLevels: "Number of polarization levels n",
    showSortedValues: "Show sorted values",
    showHistogram: "Show histogram",
    polarizationIntroPart1:
      "For a basic channel with erasure probability",
    polarizationIntroPart2:
      "two subchannels are created after one step:",
    worseSubchannel: "worse subchannel",
    betterSubchannel: "better subchannel",
    polarizationIntroPart3:
      "After repeating this transformation, the subchannels gradually polarize: some become very reliable",
    polarizationIntroPart4:
      "while others become very unreliable",
    epsilonClose0: "ε close to 0",
    epsilonClose1: "ε close to 1",
    basicInformation: "Basic information",
    numberOfResultingSubchannels: "Number of resulting subchannels",
    atEpsilon: "At ε =",
    afterLevels: "after",
    levelsCreates: "levels,",
    syntheticSubchannels: "synthetic subchannels are created",
    resultingSubchannelValues: "Resulting subchannel values",
    subchannelsNaturalOrder: "Subchannels after polarization (natural order)",
    subchannelIndex: "Subchannel index",
    epsilonValue: "Value ε",
    sortedSubchannelValues: "Sorted subchannel values",
    sortedEpsilonValues: "Sorted ε values after polarization",
    normalizedIndex: "Normalized index",
    histogramOfValues: "Histogram of values",
    histogramOfEpsilonValues: "Histogram of resulting ε values",
    subchannelCount: "Number of subchannels",
    shortExplanation: "Short explanation",
    afterPolarization: "After polarization, there are",
    betterPlural: "better",
    worsePlural: "worse",
    subchannelsThreshold: "subchannels (with threshold ε = 0.5).",
    howToUnderstand: "How to understand it?",
    valuesNear0:
      "Values close to 0 mean that the subchannel is",
    valuesNear1:
      "Values close to 1 mean that the subchannel is",
    reliable: "reliable",
    unreliable: "unreliable",
    withIncreasingLevels:
      "As the number of polarization levels n increases, the values move more strongly toward the extremes 0 and 1.",
    polarCodesBasisPart1:
      "This phenomenon is the basis of polar codes: only the",
    mostReliableSubchannels: "most reliable subchannels are selected for transmitting information bits",
    betterReliable: "better / more reliable",
    worseLessReliable: "worse / less reliable",

    backToMenu: "Back to menu",

    homeBadge: "Polar Codes Laboratory",
    homeHeroDescription:
      "Interactive environment for polar code construction, encoding, SC decoding, BER simulation, and channel polarization visualization.",
    homeTagMask: "Mask Construction",
    homeTagEncoder: "Encoder",
    homeTagDecoder: "SC Decoder",
    homeTagPolarization: "Polarization",
    homeProjectOverview: "Project overview",
    homeModules: "Modules",
    homeFocus: "Focus",
    homePolarCodes: "Polar codes",
    homeDecoder: "Decoder",
    homeChannel: "Channel",
    homeExploreModules: "Explore modules",
    homeExploreDescription:
      "Choose a module to inspect polar code behavior step by step.",
    homeWhatCanDo: "What you can do in this app",
    homeActionMask:
      "Construct information and frozen bit masks for selected code parameters.",
    homeActionEncoder:
      "Visualize encoder stages and inspect the butterfly transformation.",
    homeActionDecoder:
      "Follow SC decoding decisions step by step with tree visualization.",
    homeActionBer:
      "Compare BER performance for multiple code lengths against theoretical BPSK.",
    homeActionPolarization:
      "Explore the idea of channel polarization on a simple BEC example.",
    homeSuggestedWorkflow: "Suggested workflow",
    homeWorkflow1: "1. Start with mask construction.",
    homeWorkflow2: "2. Continue with encoder visualization.",
    homeWorkflow3: "3. Inspect SC decoder decisions.",
    homeWorkflow4: "4. Run BER simulations for selected code lengths.",
    homeWorkflow5: "5. Use channel polarization demo for intuition.",
  },
};