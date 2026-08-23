/**
 * Single source of truth for every word on this site.
 *
 * SOURCE: "Faizan Yousaf - Software Engineer.pdf" (see /public).
 * Employers, dates, metrics and project names are transcribed verbatim from
 * that document. Nothing here is invented.
 *
 * Where the resume had no standalone field for something the layout needs
 * (e.g. a one-line project description), the line is synthesised strictly from
 * bullets that ARE in the resume, and marked `TODO: confirm`.
 */

export const profile = {
  firstName: 'Faizan',
  lastName: 'Yousaf',
  fullName: 'Faizan Yousaf',
  // Resume SUMMARY opens "Results-driven Full-Stack Developer".
  tagline: 'Full-Stack Developer',
  role: 'Software Engineer (MERN)',
  specialisation: 'MERN stack, TypeScript, Flutter & MySQL',
  location: 'Islamabad, Pakistan',
  summary:
    'Results-driven Full-Stack Developer with hands-on experience in designing, developing, and maintaining scalable web and mobile applications using the MERN stack, TypeScript, Flutter, and MySQL.',
};

export const about = {
  // First-person rewrite of the resume SUMMARY block. Reworded for voice only —
  // no claim here is absent from the resume.
  paragraphs: [
    'I design, build, and maintain scalable web and mobile applications — mostly with the MERN stack, TypeScript, Flutter, and MySQL. My day-to-day is responsive interfaces, RESTful APIs, and database performance, shipping production-ready work in Agile teams.',
    'I build full-stack solutions with Node.js, React.js, TypeScript, MySQL, PostgreSQL, and MSSQL, with additional knowledge of Java, Python, and Microsoft Azure. That has spanned service-based applications, logistics platforms, Android WebView solutions, and hardware-integrated systems — including biometric device communication.',
    'I care about problem-solving, software quality, and clean architecture: applications that stay maintainable long after the first release.',
  ],
};

export const skills = [
  {
    category: 'Programming Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Python', 'Dart'],
  },
  {
    category: 'Frontend Development',
    items: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Responsive Web Design'],
  },
  {
    category: 'Backend Development',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication & Authorization', 'RBAC'],
  },
  {
    category: 'Mobile Development',
    items: ['Flutter', 'Android Development', 'Cross-Platform Mobile Applications'],
  },
  {
    category: 'Database Management',
    items: [
      'MySQL',
      'PostgreSQL',
      'Microsoft SQL Server (MSSQL)',
      'Database Design & Optimization',
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Microsoft Azure', 'Git', 'GitHub', 'CI/CD Fundamentals'],
  },
  {
    category: 'Practices',
    items: [
      'Agile / Scrum',
      'Clean Architecture',
      'Object-Oriented Programming',
      'API Integration',
      'Full-Stack Development',
      'Software Testing & Debugging',
    ],
  },
];

export const experience = [
  {
    role: 'Software Engineer (MERN)',
    company: 'Kwick High Tech & Solutions (PVT) Ltd',
    period: 'January 2025 — Present',
    location: 'Islamabad, Pakistan',
    current: true,
    bullets: [
      'Developed and enhanced multiple full-stack web applications using Node.js, React.js, TypeScript, and MySQL, delivering scalable and maintainable solutions for business requirements.',
      'Designed and implemented RESTful APIs, optimized database queries, and improved backend performance to support efficient data processing and application scalability.',
      'Integrated biometric hardware and native device features with web platforms, facilitating secure authentication and hardware-driven workflows.',
    ],
  },
  {
    role: 'Flutter Developer Intern',
    company: 'Meta Consultants',
    period: 'October 2024 — December 2024',
    location: 'Faisalabad, Pakistan',
    current: false,
    bullets: [
      'Developed and maintained cross-platform mobile applications using Flutter and Dart, delivering responsive and user-friendly experiences for Android and iOS platforms.',
      'Designed and implemented 20+ reusable UI components and screens, improving development efficiency and ensuring a consistent user experience across applications.',
      'Applied clean architecture principles and coding best practices to build scalable, maintainable, and production-ready mobile applications.',
    ],
  },
];

export const projects = [
  {
    name: 'GLOW NOC',
    subtitle: 'Network Operations Center Platform',
    org: 'Kwick High Tech & Solutions (PVT) Ltd.',
    period: 'May 2026 — July 2026',
    // TODO: confirm — synthesised from the resume bullets below.
    description:
      'A full-stack network operations platform that correlates faults into single incidents and automates the ticketing, notification, and escalation that follow.',
    bullets: [
      'Architected and delivered a full-stack NOC monitoring platform featuring 51 REST APIs across 45 OpenAPI-documented routes, supported by a 17-table PostgreSQL schema for inventory, metrics, incidents, ticketing, escalation, remediation, and SLA management.',
      'Designed and deployed a 16-service containerized observability ecosystem using Docker Compose, integrating Prometheus, Grafana, Alertmanager, NetBox, PostgreSQL, and multiple metric exporters.',
      'Achieved sub-60-second fault detection latency and sub-3-second API p95 response times, validated through an automated 20-check end-to-end acceptance testing framework.',
    ],
    tech: [
      'React.js',
      'TypeScript',
      'PostgreSQL',
      'Docker Compose',
      'Prometheus',
      'Grafana',
      'NetBox',
      'JWT / RBAC',
    ],
    link: null, // Not published in the resume.
  },
  {
    name: 'Kwick CRM',
    subtitle: 'Multi-Tenant SaaS CRM Platform',
    org: 'Kwick High Tech & Solutions (PVT) Ltd.',
    period: 'February 2026 — May 2026',
    // TODO: confirm — synthesised from the resume bullets below.
    description:
      'A multi-tenant SaaS CRM closing the loop from lead to cash: Core CRM, Sales, CPQ, and Billing, shipped on a fixed 10-week roadmap.',
    bullets: [
      'Engineered a multi-tenant SaaS CRM platform (React 19/TypeScript, Node.js/Express, Sequelize, MySQL) spanning 28 relational data models across Core CRM, Sales, CPQ, and Billing modules, delivered on a fixed 10-week roadmap as part of a 2–3 developer team.',
      'Implemented secure multi-tenancy using AsyncLocalStorage-based request context and global Sequelize hooks to auto-scope every database query by organization, validated with a dedicated automated tenant-isolation test suite (Jest/Supertest).',
      'Built a full Configure-Price-Quote pipeline with asynchronous PDF generation via a BullMQ/Redis worker queue and atomic Quote-to-Order conversion, alongside a Stripe-integrated Billing module.',
    ],
    tech: [
      'React 19',
      'TypeScript',
      'Node.js',
      'Express',
      'Sequelize',
      'MySQL',
      'BullMQ / Redis',
      'Stripe',
      'Jest',
    ],
    link: null, // Not published in the resume.
  },
  {
    name: 'ERP Management System',
    subtitle: 'HR & Finance Enterprise Suite',
    org: 'Kwick High Tech & Solutions (PVT) Ltd',
    period: 'September 2025 — January 2026',
    // TODO: confirm — synthesised from the resume bullets below.
    description:
      'A full-stack ERP spanning 40+ integrated HR and Finance modules, from attendance and payroll through to the general ledger and financial statements.',
    bullets: [
      'Architected and developed a full-stack ERP system using React 19, TypeScript, and Node.js/Express, delivering 40+ integrated modules spanning HR (Employees, Attendance, Loans, Payroll, Tax) and Finance (General Ledger, Journal Entries, Payments, Receivables, Reconciliation, Budgeting, Financial Statements).',
      'Designed a dual-database backend architecture using Sequelize (MySQL) and Mongoose (MongoDB) across 44+ data models and 62+ REST controllers to support both relational financial records and flexible document-based data.',
      'Automated document and report generation by integrating PDFKit, JSPDF, and Excel (XLSX) export pipelines, plus MJML/Handlebars-based email templates and Nodemailer for automated notifications.',
    ],
    tech: [
      'React 19',
      'TypeScript',
      'Node.js',
      'Sequelize / MySQL',
      'Mongoose / MongoDB',
      'Highcharts',
      'Ant Design',
      'TanStack Query',
    ],
    link: null, // Not published in the resume.
  },
  {
    name: 'Android WebView & Biometric Integration Platform',
    subtitle: null,
    org: 'Kwick High Tech & Solutions (PVT) Ltd.',
    period: 'August 2025 — November 2025',
    // TODO: confirm — synthesised from the resume bullets below.
    description:
      'Native Android WebView applications bridging enterprise web systems to biometric hardware for authentication, attendance, and identity verification.',
    bullets: [
      'Developed Android WebView applications that bridged native Android functionality with web-based enterprise systems, using JavaScript bridge communication for seamless data exchange.',
      'Integrated biometric hardware devices for authentication, attendance, and identity verification workflows.',
      'Developed secure hardware communication mechanisms to support real-time interaction between devices and web applications.',
    ],
    tech: ['Android', 'WebView', 'JavaScript Bridge', 'Biometric Hardware', 'Java'],
    link: null, // Not published in the resume.
  },
  {
    name: 'Curtain Cleaning Service Application',
    subtitle: null,
    org: 'Meta Consultants',
    period: 'November 2024 — December 2024',
    // TODO: confirm — synthesised from the resume bullets below.
    description:
      'A cross-platform Flutter application for curtain cleaning service management, sharing one codebase across Android and iOS.',
    bullets: [
      'Contributed to the development of a cross-platform mobile application for curtain cleaning service management using Flutter and Dart, delivering a shared codebase for both Android and iOS.',
      'Integrated RESTful backend APIs to power booking management, customer interaction, and service tracking features, mapping API responses to typed data models.',
      'Optimized performance through efficient state management, widget rebuild reduction, and lazy-loaded list rendering, resulting in smoother navigation and faster screen load times.',
    ],
    tech: ['Flutter', 'Dart', 'REST APIs', 'Futures & Streams'],
    link: {
      label: 'Google Play',
      href: 'https://play.google.com/store/apps/details?id=com.metadigital.curtain_cleaning',
    },
  },
  {
    name: 'Laundry Service Management Application',
    subtitle: null,
    org: 'Meta Consultants',
    period: 'October 2024 — November 2024',
    // TODO: confirm — synthesised from the resume bullets below.
    description:
      'A cross-platform Flutter application for laundry service management, covering the full path from service selection through booking, payment, and order tracking.',
    bullets: [
      'Developed and maintained a cross-platform mobile application for laundry service management, delivering a single Flutter codebase for both Android and iOS platforms.',
      'Built 15+ responsive screens and reusable UI components, and integrated 10+ REST API endpoints for authentication, service management, booking workflows, and order tracking.',
      'Applied Clean Architecture with distinct presentation, domain, and data layers, reducing code duplication and improving long-term maintainability.',
    ],
    tech: ['Flutter', 'Dart', 'REST APIs', 'Clean Architecture'],
    link: {
      label: 'Google Play',
      href: 'https://play.google.com/store/apps/details?id=com.metadigital.laundry_service',
    },
  },
];

export const education = {
  degree: 'BE Software Engineering',
  institution: 'National University of Science and Technology (NUST)',
  location: 'Islamabad, Pakistan',
  year: '2024',
  cgpa: '3.16',
  note: 'Awarded full scholarship for 4 years due to grades.',
};

export const certifications = [
  {
    name: 'Introduction to Front-End Development',
    issuer: 'Meta',
    year: '2025',
    note: null,
  },
  {
    name: 'Web Design Specialist Certification',
    issuer: 'UDEMY',
    year: '2024',
    note: null,
  },
  {
    name: 'Google Soft Skills Program',
    issuer: 'Google',
    year: '2024',
    note: 'Personal Branding, Networking, Time Management, Problem Solving, Critical Thinking, and Professional Communication.',
  },
];

export const contact = {
  intro:
    'I am open to full-stack and mobile engineering work. The fastest way to reach me is email — I read everything.',
  channels: [
    {
      label: 'Email',
      value: 'eng.faizan.yousaf@gmail.com',
      href: 'mailto:eng.faizan.yousaf@gmail.com',
    },
    {
      label: 'Phone',
      value: '+92 331 4796639',
      href: 'tel:+923314796639',
    },
    {
      label: 'LinkedIn',
      value: 'in/faizan-yousaf-94633a237',
      href: 'https://www.linkedin.com/in/faizan-yousaf-94633a237',
    },
    {
      // Not on the resume — supplied and confirmed directly by Faizan.
      label: 'GitHub',
      value: 'github.com/EngFaizan',
      href: 'https://github.com/EngFaizan',
    },
  ],
};

export const resumeFile = '/Faizan-Yousaf-Software-Engineer.pdf';

/** Drives the fixed dot-rail nav and the scroll indicator. */
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
