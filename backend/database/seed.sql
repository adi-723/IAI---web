INSERT INTO roles (name)

VALUES

('Administrador'),

('Editor'),

('Investigador');

INSERT INTO investigators
(
    slug,
    image,
    email,
    office,
    scholar,
    orcid,
    researchgate,
    website
)

VALUES

(
'bernardo-arriaza',
'/images/investigators/bernardo-arriaza.png',
'barriaza@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=oaqR2GoAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'victor-ayala',
'/images/investigators/victor-ayala.png',
'vayala@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=RZCVWgYAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'gloria-calaf',
'/images/investigators/gloria-calaf.png',
'gcalaf@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=iDXn65gAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'julio-carballo',
'/images/investigators/julio-carballo.png',
'jcarballo@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=h63gYiQAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'alejandra-caqueo',
'/images/investigators/alejandra-caqueo.png',
'acaqueo@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=xu1R9IcAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'lalitha-gnanasekaran',
'/images/investigators/lalitha-gnanasekaran.png',
'lgnanasekaran@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=LA_jYHAAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'sergio-gonzales',
'/images/investigators/sergio-gonzales.png',
'sgonzales@instituto.cl',
'Oficina 201',
'https://scholar.google.com/',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'sonia-kabana',
'/images/investigators/sonia-kabana.png',
'skabana@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=2hluzDsAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'david-laroze',
'/images/investigators/david-laroze.png',
'dlaroze@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=TKDdBTkAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'felipe-lara',
'/images/investigators/felipe-lara.png',
'flara@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=R_hHTxsAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'giuliano-pignata',
'/images/investigators/giuliano-pignata.png',
'gpignata@instituto.cl',
'Oficina 201',
'https://scholar.google.com/',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'emilio-rodriguez-ponce',
'/images/investigators/emilio-rodriguez-ponce.png',
'erodriguezponce@instituto.cl',
'Oficina 201',
'https://scholar.google.com/citations?hl=es&user=OSSLHcAAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'francisco-rothhammer',
'/images/investigators/francisco-rothhammer.png',
'frothhammer@instituto.cl',
'Oficina 202',
'https://scholar.google.com/citations?hl=es&user=UA5erHEAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'saravanan-rajendran',
'/images/investigators/saravanan-rajendran.png',
'srajendran@instituto.cl',
'Oficina 202',
'https://scholar.google.com/',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'bárbara-rojas',
'/images/investigators/barbara-rojas.png',
'brojas@instituto.cl',
'Oficina 202',
'https://scholar.google.com/citations?hl=es&user=7Yqek_0AAAAJ',
'https://orcid.org/',    
'https://researchgate.net/',
'https://instituto.cl'
),

(
'calogero-santoro',
'/images/investigators/calogero-santoro.png',
'csantoro@instituto.cl',
'Oficina 203',
'https://scholar.google.com/citations?hl=es&user=t8hdQjYAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'shalini-thakur',
'/images/investigators/shalini-thakur.png',
'sthakur@instituto.cl',
'Oficina 203',
'https://scholar.google.com/citations?hl=es&user=A2PKGsUAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'michael-schernau',
'/images/investigators/michael-schernau.png',
'mschernau@instituto.cl',
'Oficina 203',
'https://scholar.google.com/citations?hl=es&user=HzgG-aIAAAAJ',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
),

(
'alejandro-san-francisco-reyes',
'/images/investigators/alejandro-san-francisco-reyes.png',
'asfr@instituto.cl',
'Oficina 204',
'https://scholar.google.com/',
'https://orcid.org/',
'https://researchgate.net/',
'https://instituto.cl'
);

INSERT INTO investigator_translations
(
    investigator_id,
    language,
    name,
    degree,
    position,
    area,
    summary,
    biography
)
VALUES

-- =====================================================
-- 1. BERNARDO ARRIAZA
-- =====================================================

(
1,
'es',
'Bernardo Arriaza Torres',
'Ph.D. Antropología Física',
'Investigador Principal',
'Bioarqueología',
'Especialista en bioarqueología, paleopatología y cultura Chinchorro.',
'El Dr. Bernardo Arriaza Torres es investigador principal del Instituto de Alta Investigación. Su trabajo se centra en la bioarqueología, la paleopatología y el estudio de las poblaciones prehispánicas del norte de Chile, con especial interés en la cultura Chinchorro y sus prácticas funerarias.'
),

(
1,
'en',
'Bernardo Arriaza Torres',
'Ph.D. Physical Anthropology',
'Principal Researcher',
'Bioarchaeology',
'Specialist in bioarchaeology, paleopathology and Chinchorro culture.',
'Dr. Bernardo Arriaza Torres is a principal researcher at the Institute for Advanced Research. His work focuses on bioarchaeology, paleopathology, and the study of prehistoric populations in northern Chile, with particular interest in the Chinchorro culture and its funerary practices.'
),

-- =====================================================
-- 2. VÍCTOR AYALA
-- =====================================================

(
2,
'es',
'Víctor Ayala Bravo',
'Doctor en Matemáticas',
'Profesor titular',
'Teoría geométrica de control y sistemas lineales',
'El Dr. Víctor Ayala es profesor titular del IAI donde forma parte del cuerpo académico desde 2016. Ha desempeñado una larga trayectoria académica en universidades chilenas. Su trabajo se centra en teoría geométrica de control y sistemas lineales sobre grupos de Lie.',
'El Dr. Víctor Ayala Bravo es profesor titular e investigador del Instituto de Alta Investigación. Su investigación se desarrolla principalmente en teoría geométrica de control y sistemas lineales, con especial interés en estructuras matemáticas relacionadas con grupos de Lie y sistemas dinámicos.'
),

(
2,
'en',
'Victor Ayala Bravo',
'Doctor in Mathematics',
'Title Professor',
'Geometric Control Theory and Linear Systems',
'Dr. Víctor Ayala is a full professor at the IAI, where he has been a member of the faculty since 2016. He has a long and distinguished academic career at Chilean universities. His work focuses on geometric control theory and linear systems over Lie groups.',
'Dr. Victor Ayala Bravo is a full professor and researcher at the Institute for Advanced Research. His research focuses primarily on geometric control theory and linear systems, with particular interest in mathematical structures related to Lie groups and dynamical systems.'
),

-- =====================================================
-- 3. GLORIA CALAF
-- =====================================================

(
3,
'es',
'Gloria Calaf Sarrat',
'Doctora en anatomía',
'Profesora titular',
'Biología del cáncer',
'La Dra. Gloria Calaf es profesora titular del IAI, donde lidera el Laboratorio de Biología del Cáncer. Su investigación se centra en la iniciación y progresión del cáncer de mama, especialmente en los efectos de la exposición a pesticidas y radiación ionizante.',
'La Dra. Gloria Calaf Sarrat es profesora titular e investigadora del Instituto de Alta Investigación. Su trayectoria científica se concentra en la biología del cáncer, especialmente en los mecanismos relacionados con la iniciación y progresión del cáncer de mama y en los efectos de factores ambientales como pesticidas y radiación ionizante.'
),

(
3,
'en',
'Gloria Calaf Sarrat',
'Doctorate in Anatomy',
'Title Professor',
'Cancer Biology',
'Dr. Gloria Calaf is a full professor at the IAI, where she leads the Cancer Biology Laboratory. Her research focuses on the initiation and progression of breast cancer, particularly the effects of exposure to pesticides and ionizing radiation.',
'Dr. Gloria Calaf Sarrat is a full professor and researcher at the Institute for Advanced Research. Her scientific career focuses on cancer biology, particularly the mechanisms involved in breast cancer initiation and progression and the effects of environmental factors such as pesticides and ionizing radiation.'
),

-- =====================================================
-- 4. JULIO CARBALLO
-- =====================================================

(
4,
'es',
'Julio Alberto Carballo Bello',
'Doctor en Astronomía',
'Astrónomo e investigador',
'Astronomía galáctica',
'El Dr. Julio Carballo es astrónomo y académico del IAI, donde forma parte del grupo IAI-AstroLab. Su investigación se enfoca en la estructura de la Vía Láctea, los cúmulos globulares, las galaxias enanas y los procesos de canibalismo galáctico relacionados con la formación y ensamblaje de galaxias.',
'El Dr. Julio Alberto Carballo Bello es astrónomo e investigador del Instituto de Alta Investigación y miembro del grupo IAI-AstroLab. Su investigación estudia la estructura y evolución de la Vía Láctea, los cúmulos globulares, las galaxias enanas y las subestructuras del halo galáctico mediante observaciones astronómicas y grandes catálogos de datos.'
),

(
4,
'en',
'Julio Alberto Carballo Bello',
'PhD in Astronomy',
'Astronomer and Researcher',
'Galactic Astronomy',
'Dr. Julio Carballo is an astronomer and academic at the IAI, where he is a member of the IAI-AstroLab group. His research focuses on the structure of the Milky Way, globular clusters, dwarf galaxies, and galactic cannibalism processes involved in galaxy formation and assembly.',
'Dr. Julio Alberto Carballo Bello is an astronomer and researcher at the Institute for Advanced Research and a member of the IAI-AstroLab group. His research investigates the structure and evolution of the Milky Way, globular clusters, dwarf galaxies, and substructures in the galactic halo using astronomical observations and large datasets.'
),

-- =====================================================
-- 5. ALEJANDRA CAQUEO
-- =====================================================

(
5,
'es',
'Alejandra Caqueo Urizar',
'Doctora en Psicología',
'Profesora e investigadora',
'Salud mental comunitaria',
'La Dra. Alejandra Caqueo es una destacada psicóloga clínica y académica del IAI. Su investigación se centra en la salud mental comunitaria, especialmente en migración e integración, calidad de vida y salud mental de inmigrantes del norte de Chile, adherencia al tratamiento en esquizofrenia, discriminación y necesidades de apoyo psicológico en poblaciones vulnerables.',
'La Dra. Alejandra Caqueo Urizar es profesora e investigadora del Instituto de Alta Investigación. Su trayectoria combina la psicología clínica y la investigación en salud mental comunitaria, abordando migración, integración, calidad de vida, discriminación, adherencia a tratamientos y necesidades de apoyo psicológico en poblaciones vulnerables.'
),

(
5,
'en',
'Alejandra Caqueo Urizar',
'PhD in Psychology',
'Professor and Researcher',
'Community Mental Health',
'Dr. Alejandra Caqueo is a distinguished clinical psychologist and academic at the IAI. Her research focuses on community mental health, particularly migration and integration, quality of life and mental health among immigrants in northern Chile, treatment adherence in schizophrenia, discrimination, and psychological support needs in vulnerable populations.',
'Dr. Alejandra Caqueo Urizar is a professor and researcher at the Institute for Advanced Research. Her work combines clinical psychology and community mental health research, addressing migration, integration, quality of life, discrimination, treatment adherence, and psychological support needs among vulnerable populations.'
),

-- =====================================================
-- 6. LALITHA GNANASEKARAN
-- =====================================================

(
6,
'es',
'Gnanasekaran Lalitha',
'Doctora en Física',
'Académica e investigadora',
'Nanomateriales y materiales funcionales',
'La Dra. Lalitha Gnanasekaran es académica e investigadora del IAI, afiliada a la Facultad de Ingeniería y al Laboratorio de Nanotecnología y Materiales Funcionales.',
'La Dra. Lalitha Gnanasekaran es académica e investigadora del Instituto de Alta Investigación. Su trabajo se centra en el desarrollo de nanomateriales para catálisis y remediación ambiental, así como en el estudio del comportamiento, corrosión y degradación de materiales compuestos.'
),

(
6,
'en',
'Gnanasekaran Lalitha',
'PhD in Physics',
'Academic and Researcher',
'Nanomaterials and Functional Materials',
'Dr. Lalitha Gnanasekaran is an academic and researcher at the IAI, affiliated with the Faculty of Engineering and the Nanotechnology and Functional Materials Laboratory.',
'Dr. Lalitha Gnanasekaran is an academic and researcher at the Institute for Advanced Research. Her work focuses on nanomaterials for catalysis and environmental remediation, as well as the behavior, corrosion, and degradation of composite materials.'
),

-- =====================================================
-- 7. SERGIO GONZALEZ
-- =====================================================

(
7,
'es',
'Sergio Alberto Gonzalez Miranda',
'Doctor en Historia',
'Profesor titular e investigador',
'Historia del Norte de Chile y la región andina',
'El Dr. Sergio González Miranda es historiador, profesor titular e investigador del IAI de la Universidad de Tarapacá.',
'El Dr. Sergio González Miranda es historiador, profesor titular e investigador del Instituto de Alta Investigación. Su trabajo aborda la historia del norte de Chile y la región andina, con especial interés en la historia del salitre, la pampa, las dinámicas fronterizas, la minería, la memoria y la identidad regional.'
),

(
7,
'en',
'Sergio Alberto Gonzalez Miranda',
'PhD in History',
'Full Professor and Researcher',
'History of Northern Chile and the Andean Region',
'Dr. Sergio González Miranda is a historian, full professor, and researcher at the IAI of the University of Tarapacá.',
'Dr. Sergio González Miranda is a historian, full professor, and researcher at the Institute for Advanced Research. His work addresses the history of northern Chile and the Andean region, with particular interest in the nitrate industry, border dynamics, mining history, memory, and regional identity.'
),

-- =====================================================
-- 8. SONIA KABANA
-- =====================================================

(
8,
'es',
'Sonia Kampana or Kabana',
'Doctora en Física',
'Profesora e investigadora',
'Física de altas energías',
'La Dra. Sonia Kabana es académica e investigadora del IAI de la Universidad de Tarapacá, donde participa en el Doctorado en Ciencias y lidera líneas de investigación en física de altas energías.',
'La Dra. Sonia Kabana es profesora e investigadora del Instituto de Alta Investigación. Su trabajo se concentra en física de altas energías, colisiones de iones pesados y el estudio de la transición entre materia hadrónica y plasma de quarks y gluones. Participa en colaboraciones experimentales internacionales como ATLAS, BESIII y STAR.'
),

(
8,
'en',
'Sonia Kampana or Kabana',
'PhD in Physics',
'Professor and Researcher',
'High-Energy Physics',
'Dr. Sonia Kabana is an academic and researcher at the IAI of the University of Tarapacá, where she participates in the Doctoral Program in Sciences and leads research activities in high-energy physics.',
'Dr. Sonia Kabana is a professor and researcher at the Institute for Advanced Research. Her work focuses on high-energy physics, heavy-ion collisions, and the study of the transition between hadronic matter and quark-gluon plasma. She participates in international experimental collaborations such as ATLAS, BESIII, and STAR.'
),

-- =====================================================
-- 9. DAVID LAROZE
-- =====================================================

(
9,
'es',
'David Laroze Navarrete',
'Doctor en Física',
'Profesor titular e investigador',
'Modelamiento matemático y física',
'El Dr. David Laroze Navarrete es físico chileno, profesor titular e investigador de la Universidad de Tarapacá, donde dirige el Laboratorio de Modelamiento Matemático.',
'El Dr. David Laroze Navarrete es profesor titular e investigador del Instituto de Alta Investigación y director del Laboratorio de Modelamiento Matemático. Su trabajo combina física y modelamiento matemático y ha incluido participación en colaboraciones internacionales como CMS del CERN.'
),

(
9,
'en',
'David Laroze Navarrete',
'PhD in Physics',
'Full Professor and Researcher',
'Mathematical Modeling and Physics',
'Dr. David Laroze Navarrete is a Chilean physicist, full professor, and researcher at the University of Tarapacá, where he directs the Mathematical Modeling Laboratory.',
'Dr. David Laroze Navarrete is a full professor and researcher at the Institute for Advanced Research and director of the Mathematical Modeling Laboratory. His work combines physics and mathematical modeling and includes participation in international collaborations such as CMS at CERN.'
),

-- =====================================================
-- 10. FELIPE LARA
-- =====================================================

(
10,
'es',
'Felipe Ignacio Lara Obreque',
'Doctor en Matemática',
'Profesor asistente e investigador',
'Matemática aplicada y optimización',
'El Dr. Felipe Lara se desempeña como profesor asistente e investigador en el Instituto de Alta Investigación de la Universidad de Tarapacá.',
'El Dr. Felipe Ignacio Lara Obreque es profesor asistente e investigador del Instituto de Alta Investigación. Su investigación se centra en matemática aplicada, análisis asintótico, problemas de minimización, subdiferenciales, desigualdades variacionales y métodos de optimización.'
),

(
10,
'en',
'Felipe Ignacio Lara Obreque',
'PhD in Mathematics',
'Assistant Professor and Researcher',
'Applied Mathematics and Optimization',
'Dr. Felipe Lara is an assistant professor and researcher at the Institute for Advanced Research of the University of Tarapacá.',
'Dr. Felipe Ignacio Lara Obreque is an assistant professor and researcher at the Institute for Advanced Research. His research focuses on applied mathematics, asymptotic analysis, minimization problems, subdifferentials, variational inequalities, and optimization methods.'
),

-- =====================================================
-- 11. GIULIANO PIGNATA
-- =====================================================

(
11,
'es',
'Pignata Giuliano',
'Doctor en Astronomía',
'Profesor e investigador',
'Astrofísica estelar y galáctica',
'El Dr. Giuliano Pignata es profesor e investigador del Instituto de Alta Investigación de la Universidad de Tarapacá y miembro del grupo IAI-AstroLab.',
'El Dr. Giuliano Pignata es profesor e investigador del Instituto de Alta Investigación y miembro del grupo IAI-AstroLab. Su investigación se centra en astrofísica estelar y galáctica, análisis de datos astronómicos y estudios realizados con sondeos del hemisferio austral. Participa en proyectos como ALeRCE, SOXS y La Silla Schmidt Southern Survey.'
),

(
11,
'en',
'Pignata Giuliano',
'PhD in Astronomy',
'Professor and Researcher',
'Stellar and Galactic Astrophysics',
'Dr. Giuliano Pignata is a professor and researcher at the Institute for Advanced Research of the University of Tarapacá and a member of the IAI-AstroLab group.',
'Dr. Giuliano Pignata is a professor and researcher at the Institute for Advanced Research and a member of the IAI-AstroLab group. His research focuses on stellar and galactic astrophysics and astronomical data analysis. He participates in projects such as ALeRCE, SOXS, and the La Silla Schmidt Southern Survey.'
),

-- =====================================================
-- 12. EMILIO RODRIGUEZ PONCE
-- =====================================================

(
12,
'es',
'Emilio Rodríguez Ponce',
'Doctor en Educación',
'Profesor titular y académico',
'Educación superior y gestión universitaria',
'El Dr. Emilio Rodríguez Ponce es profesor titular del Instituto de Alta Investigación de la Universidad de Tarapacá.',
'El Dr. Emilio Rodríguez Ponce es profesor titular e investigador del Instituto de Alta Investigación. Su investigación se especializa en educación superior, gestión universitaria y aprendizaje organizacional, abordando calidad, acreditación, liderazgo transformacional y aprendizaje institucional.'
),

(
12,
'en',
'Emilio Rodríguez Ponce',
'PhD in Education',
'Full Professor and Academic',
'Higher Education and University Management',
'Dr. Emilio Rodríguez Ponce is a full professor at the Institute for Advanced Research of the University of Tarapacá.',
'Dr. Emilio Rodríguez Ponce is a full professor and researcher at the Institute for Advanced Research. His research focuses on higher education, university management, organizational learning, quality, accreditation, transformational leadership, and institutional learning.'
),

-- =====================================================
-- 13. FRANCISCO ROTHHAMMER
-- =====================================================

(
13,
'es',
'Francisco Rothhammer Engel',
'Doctor en Ciencias',
'Profesor e investigador',
'Genética de poblaciones y poblamiento americano',
'El Dr. Francisco Rothhammer es profesor e investigador del IAI de la Universidad de Tarapacá.',
'El Dr. Francisco Rothhammer Engel es profesor e investigador del Instituto de Alta Investigación. Su trabajo se centra en la genética de poblaciones y en la historia del poblamiento de América, incluyendo el análisis de ADN mitocondrial y la diversidad genética de poblaciones americanas.'
),

(
13,
'en',
'Francisco Rothhammer Engel',
'PhD in Science',
'Professor and Researcher',
'Population Genetics and the Peopling of the Americas',
'Dr. Francisco Rothhammer is a professor and researcher at the IAI of the University of Tarapacá.',
'Dr. Francisco Rothhammer Engel is a professor and researcher at the Institute for Advanced Research. His work focuses on population genetics and the history of the peopling of the Americas, including mitochondrial DNA analysis and genetic diversity in American populations.'
),

-- =====================================================
-- 14. SARAVANAN RAJENDRAN
-- =====================================================

(
14,
'es',
'Rajendran Saravanan',
'Doctor en Ciencia de Materiales y Física',
'Profesor e investigador',
'Nanomateriales y tecnologías ambientales',
'El Dr. Saravanan Rajendran es profesor e investigador del Instituto de Alta Investigación de la Universidad de Tarapacá.',
'El Dr. Saravanan Rajendran es profesor e investigador del Instituto de Alta Investigación. Su trabajo aborda nanomateriales, materiales funcionales, fotocatálisis, remediación ambiental, tratamiento de aguas, eliminación de arsénico y aplicaciones energéticas.'
),

(
14,
'en',
'Rajendran Saravanan',
'PhD in Materials Science and Physics',
'Professor and Researcher',
'Nanomaterials and Environmental Technologies',
'Dr. Saravanan Rajendran is a professor and researcher at the Institute for Advanced Research of the University of Tarapacá.',
'Dr. Saravanan Rajendran is a professor and researcher at the Institute for Advanced Research. His work addresses nanomaterials, functional materials, photocatalysis, environmental remediation, water treatment, arsenic removal, and energy applications.'
),


-- =====================================================
-- 15. BARBARA ROJAS
-- =====================================================

(
15,
'es',
'Bárbara Rojas Ayala',
'Doctora en Astronomía',
'Profesora asociada e investigadora',
'Estrellas de baja masa y exoplanetas',
'La Dra. Bárbara Rojas es profesora asociada e investigadora del IAI de la Universidad de Tarapacá.',
'La Dra. Bárbara Rojas Ayala es profesora asociada e investigadora del Instituto de Alta Investigación. Su investigación se concentra en estrellas de baja masa, enanas marrones y exoplanetas, especialmente estrellas enanas M y sus sistemas planetarios. También participa en actividades de divulgación y mentoría científica.'
),

(
15,
'en',
'Bárbara Rojas Ayala',
'PhD in Astronomy',
'Associate Professor and Researcher',
'Low-Mass Stars and Exoplanets',
'Dr. Bárbara Rojas is an associate professor and researcher at the IAI of the University of Tarapacá.',
'Dr. Bárbara Rojas Ayala is an associate professor and researcher at the Institute for Advanced Research. Her research focuses on low-mass stars, brown dwarfs, and exoplanets, particularly M-dwarf stars and their planetary systems. She also participates in science outreach and academic mentoring.'
),



-- =====================================================
-- 16. CALOGERO SANTORO
-- =====================================================

(
16,
'es',
'Calogero Santoro Vargas',
'Doctor en Arqueología',
'Profesor e investigador',
'Arqueología y paleoambiente',
'El Dr. Calogero Santoro es profesor e investigador del Instituto de Alta Investigación de la Universidad de Tarapacá.',
'El Dr. Calogero Santoro Vargas es profesor e investigador del Instituto de Alta Investigación y lidera líneas relacionadas con arqueología y paleoambiente. Su trabajo estudia la colonización humana, las dinámicas paleoambientales y el registro arqueológico del norte de Chile.'
),

(
16,
'en',
'Calogero Santoro Vargas',
'PhD in Archaeology',
'Professor and Researcher',
'Archaeology and Paleoenvironment',
'Dr. Calogero Santoro is a professor and researcher at the Institute for Advanced Research of the University of Tarapacá.',
'Dr. Calogero Santoro Vargas is a professor and researcher at the Institute for Advanced Research. His work addresses archaeology and paleoenvironmental research, including human colonization, environmental dynamics, and the archaeological record of northern Chile.'
),

-- =====================================================
-- 17. SHALINI THAKUR
-- =====================================================

(
17,
'es',
'Shalini Thakur',
'Doctora en Física',
'Investigadora',
'Física experimental de altas energías e instrumentación',
'La Dra. Shalini Thakur es investigadora del Instituto de Alta Investigación de la Universidad de Tarapacá.',
'La Dra. Shalini Thakur es investigadora del Instituto de Alta Investigación y participa en líneas de física experimental de altas energías e instrumentación. Su trabajo se relaciona con la instrumentación de muones y la electrónica asociada al experimento CMS del CERN, incluyendo el desarrollo de detectores GEM.'
),

(
17,
'en',
'Shalini Thakur',
'PhD in Physics',
'Researcher',
'Experimental High-Energy Physics and Instrumentation',
'Dr. Shalini Thakur is a researcher at the Institute for Advanced Research of the University of Tarapacá.',
'Dr. Shalini Thakur is a researcher at the Institute for Advanced Research working in experimental high-energy physics and instrumentation. Her research involves muon instrumentation and electronics for the CMS experiment at CERN, including the development of GEM detectors.'
),

-- =====================================================
-- 18. MICHAEL SCHERNAU
-- =====================================================

(
18,
'es',
'Michael Schernau',
'Doctor en Física',
'Investigador y académico',
'Física experimental de altas energías',
'El Dr. Michael Schernau es investigador y académico del IAI de la Universidad de Tarapacá.',
'El Dr. Michael Schernau es investigador y académico del Instituto de Alta Investigación. Su investigación se desarrolla en física experimental de altas energías y experimentos de colisionadores de partículas. Participa en la colaboración ATLAS del CERN y en proyectos asociados a grandes instalaciones internacionales de física de partículas.'
),

(
18,
'en',
'Michael Schernau',
'PhD in Physics',
'Researcher and Academic',
'Experimental High-Energy Physics',
'Dr. Michael Schernau is a researcher and academic at the IAI of the University of Tarapacá.',
'Dr. Michael Schernau is a researcher and academic at the Institute for Advanced Research. His work focuses on experimental high-energy physics and particle collider experiments. He participates in the ATLAS collaboration at CERN and projects associated with major international particle physics facilities.'
),

-- =====================================================
-- 19. ALEJANDRO SAN FRANCISCO
-- =====================================================

(
19,
'es',
'Alejandro San Francisco Reyes',
'Doctor en Historia',
'Profesor e investigador',
'Historia contemporánea de Chile',
'El Dr. Alejandro San Francisco Reyes es académico y profesor del IAI, vinculado a la historia y las ciencias sociales.',
'El Dr. Alejandro San Francisco Reyes es académico e investigador del Instituto de Alta Investigación. Su trabajo se concentra en la historia contemporánea de Chile, la memoria histórica, la historia política y el estudio de los procesos sociales y políticos del pasado reciente.'
),

(
19,
'en',
'Alejandro San Francisco Reyes',
'PhD in History',
'Professor and Researcher',
'Contemporary Chilean History',
'Dr. Alejandro San Francisco Reyes is an academic and professor at the IAI, specializing in history and social sciences.',
'Dr. Alejandro San Francisco Reyes is an academic and researcher at the Institute for Advanced Research. His work focuses on contemporary Chilean history, historical memory, political history, and the study of recent social and political processes.'
);

INSERT INTO investigator_interests
(
    investigator_id,
    language,
    interest
)
VALUES

-- Bernardo Arriaza
(1,'es','Bioarqueología'),
(1,'es','Paleopatología'),
(1,'es','Cultura Chinchorro'),
(1,'en','Bioarchaeology'),
(1,'en','Paleopathology'),
(1,'en','Chinchorro Culture'),

-- Víctor Ayala
(2,'es','Teoría geométrica de control'),
(2,'es','Sistemas lineales'),
(2,'es','Grupos de Lie'),
(2,'en','Geometric Control Theory'),
(2,'en','Linear Systems'),
(2,'en','Lie Groups'),

-- Gloria Calaf
(3,'es','Biología del cáncer'),
(3,'es','Cáncer de mama'),
(3,'es','Pesticidas y cáncer'),
(3,'es','Radiación ionizante'),
(3,'en','Cancer Biology'),
(3,'en','Breast Cancer'),
(3,'en','Pesticides and Cancer'),
(3,'en','Ionizing Radiation'),

-- Julio Carballo
(4,'es','Astronomía galáctica'),
(4,'es','Vía Láctea'),
(4,'es','Cúmulos globulares'),
(4,'es','Galaxias enanas'),
(4,'en','Galactic Astronomy'),
(4,'en','Milky Way'),
(4,'en','Globular Clusters'),
(4,'en','Dwarf Galaxies'),

-- Alejandra Caqueo
(5,'es','Salud mental comunitaria'),
(5,'es','Migración e integración'),
(5,'es','Calidad de vida'),
(5,'es','Poblaciones vulnerables'),
(5,'en','Community Mental Health'),
(5,'en','Migration and Integration'),
(5,'en','Quality of Life'),
(5,'en','Vulnerable Populations'),

-- Lalitha
(6,'es','Nanomateriales'),
(6,'es','Catálisis'),
(6,'es','Remediación ambiental'),
(6,'es','Materiales funcionales'),
(6,'en','Nanomaterials'),
(6,'en','Catalysis'),
(6,'en','Environmental Remediation'),
(6,'en','Functional Materials'),

-- Sergio González
(7,'es','Historia del Norte de Chile'),
(7,'es','Historia del salitre'),
(7,'es','Historia andina'),
(7,'es','Memoria e identidad regional'),
(7,'en','History of Northern Chile'),
(7,'en','Nitrate History'),
(7,'en','Andean History'),
(7,'en','Memory and Regional Identity'),

-- Sonia Kabana
(8,'es','Física de altas energías'),
(8,'es','Colisiones de iones pesados'),
(8,'es','Plasma de quarks y gluones'),
(8,'en','High-Energy Physics'),
(8,'en','Heavy-Ion Collisions'),
(8,'en','Quark-Gluon Plasma'),

-- David Laroze
(9,'es','Modelamiento matemático'),
(9,'es','Física'),
(9,'es','Física de partículas'),
(9,'es','CMS'),
(9,'en','Mathematical Modeling'),
(9,'en','Physics'),
(9,'en','Particle Physics'),
(9,'en','CMS'),

-- Felipe Lara
(10,'es','Matemática aplicada'),
(10,'es','Optimización'),
(10,'es','Análisis asintótico'),
(10,'es','Desigualdades variacionales'),
(10,'en','Applied Mathematics'),
(10,'en','Optimization'),
(10,'en','Asymptotic Analysis'),
(10,'en','Variational Inequalities'),

-- Giuliano Pignata
(11,'es','Astrofísica estelar'),
(11,'es','Astrofísica galáctica'),
(11,'es','ALeRCE'),
(11,'es','SOXS'),
(11,'en','Stellar Astrophysics'),
(11,'en','Galactic Astrophysics'),
(11,'en','ALeRCE'),
(11,'en','SOXS'),

-- Emilio Rodríguez Ponce
(12,'es','Educación superior'),
(12,'es','Gestión universitaria'),
(12,'es','Aprendizaje organizacional'),
(12,'es','Liderazgo transformacional'),
(12,'en','Higher Education'),
(12,'en','University Management'),
(12,'en','Organizational Learning'),
(12,'en','Transformational Leadership'),

-- Francisco Rothhammer
(13,'es','Genética de poblaciones'),
(13,'es','Poblamiento americano'),
(13,'es','ADN mitocondrial'),
(13,'es','Diversidad genética'),
(13,'en','Population Genetics'),
(13,'en','Peopling of the Americas'),
(13,'en','Mitochondrial DNA'),
(13,'en','Genetic Diversity'),

-- Saravanan Rajendran
(14,'es','Nanomateriales'),
(14,'es','Fotocatálisis'),
(14,'es','Tratamiento de aguas'),
(14,'es','Remediación ambiental'),
(14,'es','Eliminación de arsénico'),
(14,'en','Nanomaterials'),
(14,'en','Photocatalysis'),
(14,'en','Water Treatment'),
(14,'en','Environmental Remediation'),
(14,'en','Arsenic Removal'),

-- Bárbara Rojas
(15,'es','Estrellas de baja masa'),
(15,'es','Enanas marrones'),
(15,'es','Exoplanetas'),
(15,'es','Estrellas enanas M'),
(15,'en','Low-Mass Stars'),
(15,'en','Brown Dwarfs'),
(15,'en','Exoplanets'),
(15,'en','M-Dwarf Stars'),

-- Calogero Santoro
(16,'es','Arqueología'),
(16,'es','Paleoambiente'),
(16,'es','Colonización humana'),
(16,'es','Arqueología del Norte de Chile'),
(16,'en','Archaeology'),
(16,'en','Paleoenvironment'),
(16,'en','Human Colonization'),
(16,'en','Archaeology of Northern Chile'),

-- Shalini Thakur
(17,'es','Física experimental de altas energías'),
(17,'es','Instrumentación de muones'),
(17,'es','Detectores GEM'),
(17,'es','CMS'),
(17,'en','Experimental High-Energy Physics'),
(17,'en','Muon Instrumentation'),
(17,'en','GEM Detectors'),
(17,'en','CMS'),

-- Michael Schernau
(18,'es','Física experimental de altas energías'),
(18,'es','Colisionadores de partículas'),
(18,'es','ATLAS'),
(18,'es','CERN'),
(18,'en','Experimental High-Energy Physics'),
(18,'en','Particle Colliders'),
(18,'en','ATLAS'),
(18,'en','CERN'),

-- Alejandro San Francisco
(19,'es','Historia contemporánea de Chile'),
(19,'es','Historia política'),
(19,'es','Memoria histórica'),
(19,'es','Historia social'),
(19,'en','Contemporary Chilean History'),
(19,'en','Political History'),
(19,'en','Historical Memory'),
(19,'en','Social History');

INSERT INTO users
(
    role_id,
    username,
    email,
    password
)

VALUES

(
1,
'admin',
'admin@academicos.uta.cl',
'123456'
);

INSERT INTO research_groups
(id, slug, image)
VALUES
(1,'bioarqueologia-arqueologia',NULL),
(2,'matematica-control',NULL),
(3,'biologia-salud',NULL),
(4,'astronomia-astrofisica',NULL),
(5,'nanomateriales-medioambiente',NULL),
(6,'historia-ciencias-sociales',NULL),
(7,'fisica-altas-energias',NULL),
(8,'modelamiento-fisica',NULL),
(9,'educacion-superior',NULL),
(10,'genetica-poblaciones',NULL);

INSERT INTO research_group_translations
(
    research_group_id,
    language,
    name,
    summary,
    description
)
VALUES

(1,'es',
'Bioarqueología y Arqueología',
'Estudio de las poblaciones humanas del pasado y su relación con el ambiente.',
'Grupo dedicado al estudio arqueológico, bioarqueológico y paleoambiental de las poblaciones humanas, con especial énfasis en el norte de Chile.'
),

(1,'en',
'Bioarchaeology and Archaeology',
'Study of past human populations and their relationship with the environment.',
'Research group dedicated to archaeological, bioarchaeological, and paleoenvironmental studies of human populations, with particular emphasis on northern Chile.'
),

(2,'es',
'Matemática y Control',
'Investigación en matemática aplicada, sistemas y teoría de control.',
'Grupo dedicado al desarrollo de herramientas matemáticas para teoría de control, sistemas lineales, optimización y problemas aplicados.'
),

(2,'en',
'Mathematics and Control',
'Research in applied mathematics, systems, and control theory.',
'Research group focused on mathematical tools for control theory, linear systems, optimization, and applied problems.'
),

(3,'es',
'Biología y Salud',
'Investigación interdisciplinaria en cáncer y salud mental.',
'Grupo que desarrolla investigación en biología del cáncer, salud mental comunitaria y problemáticas relacionadas con la salud de poblaciones vulnerables.'
),

(3,'en',
'Biology and Health',
'Interdisciplinary research in cancer biology and mental health.',
'Group conducting research in cancer biology, community mental health, and health issues affecting vulnerable populations.'
),

(4,'es',
'Astronomía y Astrofísica',
'Investigación sobre estrellas, galaxias y evolución del universo.',
'Grupo dedicado a la investigación astronómica y astrofísica, incluyendo estrellas, exoplanetas, galaxias, estructura de la Vía Láctea y grandes sondeos astronómicos.'
),

(4,'en',
'Astronomy and Astrophysics',
'Research on stars, galaxies, and the evolution of the universe.',
'Group dedicated to astronomical and astrophysical research, including stars, exoplanets, galaxies, Milky Way structure, and large astronomical surveys.'
),

(5,'es',
'Nanomateriales y Medio Ambiente',
'Desarrollo de materiales funcionales para aplicaciones ambientales y energéticas.',
'Grupo enfocado en nanomateriales, fotocatálisis, remediación ambiental, tratamiento de aguas y aplicaciones energéticas.'
),

(5,'en',
'Nanomaterials and Environment',
'Development of functional materials for environmental and energy applications.',
'Group focused on nanomaterials, photocatalysis, environmental remediation, water treatment, and energy applications.'
),

(6,'es',
'Historia y Ciencias Sociales',
'Investigación histórica y social de Chile y América Latina.',
'Grupo dedicado al estudio de la historia contemporánea, historia regional, memoria, identidad y procesos sociales y políticos.'
),

(6,'en',
'History and Social Sciences',
'Historical and social research on Chile and Latin America.',
'Group dedicated to contemporary history, regional history, memory, identity, and social and political processes.'
),

(7,'es',
'Física de Altas Energías',
'Investigación experimental en física de partículas.',
'Grupo dedicado al estudio experimental de partículas elementales mediante grandes colaboraciones y experimentos internacionales.'
),

(7,'en',
'High-Energy Physics',
'Experimental research in particle physics.',
'Group dedicated to experimental studies of elementary particles through major international collaborations and experiments.'
),

(8,'es',
'Modelamiento Matemático y Física',
'Investigación interdisciplinaria mediante modelos matemáticos y físicos.',
'Grupo dedicado al desarrollo y aplicación de modelos matemáticos y físicos para estudiar sistemas y fenómenos complejos.'
),

(8,'en',
'Mathematical Modeling and Physics',
'Interdisciplinary research using mathematical and physical models.',
'Group dedicated to developing and applying mathematical and physical models to study complex systems and phenomena.'
),

(9,'es',
'Educación Superior',
'Investigación sobre educación superior y gestión universitaria.',
'Grupo dedicado al estudio de instituciones de educación superior, gestión universitaria, liderazgo, calidad y aprendizaje organizacional.'
),

(9,'en',
'Higher Education',
'Research on higher education and university management.',
'Group dedicated to higher education institutions, university management, leadership, quality, and organizational learning.'
),

(10,'es',
'Genética de Poblaciones',
'Investigación sobre diversidad genética y poblamiento de América.',
'Grupo dedicado al estudio de la diversidad genética de poblaciones humanas y los procesos históricos relacionados con el poblamiento americano.'
),

(10,'en',
'Population Genetics',
'Research on genetic diversity and the peopling of the Americas.',
'Group dedicated to studying human population genetic diversity and historical processes related to the peopling of the Americas.'
);

INSERT INTO investigator_group
(
    investigator_id,
    research_group_id
)
VALUES

-- =====================================================
-- BIOARQUEOLOGÍA Y ARQUEOLOGÍA
-- Bernardo Arriaza
-- Calogero Santoro
-- =====================================================

(1,1),
(16,1),

-- =====================================================
-- MATEMÁTICA Y CONTROL
-- Víctor Ayala
-- Felipe Lara
-- =====================================================

(2,2),
(10,2),

-- =====================================================
-- BIOLOGÍA Y SALUD
-- Gloria Calaf
-- Alejandra Caqueo
-- =====================================================

(3,3),
(5,3),

-- =====================================================
-- ASTRONOMÍA Y ASTROFÍSICA
-- Julio Carballo
-- Giuliano Pignata
-- Bárbara Rojas
-- =====================================================

(4,4),
(11,4),
(15,4),

-- =====================================================
-- NANOMATERIALES Y MEDIO AMBIENTE
-- Lalitha Gnanasekaran
-- Saravanan Rajendran
-- =====================================================

(6,5),
(14,5),

-- =====================================================
-- HISTORIA Y CIENCIAS SOCIALES
-- Sergio Gonzales
-- Alejandro San Francisco
-- =====================================================

(7,6),
(19,6),

-- =====================================================
-- FÍSICA DE ALTAS ENERGÍAS
-- Sonia Kabana
-- Michael Schernau
-- Shalini Thakur
-- =====================================================

(8,7),
(18,7),
(17,7),

-- =====================================================
-- MODELAMIENTO MATEMÁTICO Y FÍSICA
-- David Laroze
-- =====================================================

(9,8),

-- =====================================================
-- EDUCACIÓN SUPERIOR
-- Emilio Rodriguez Ponce
-- =====================================================

(12,9),

-- =====================================================
-- GENÉTICA DE POBLACIONES
-- Francisco Rothhammer
-- =====================================================

(13,10);