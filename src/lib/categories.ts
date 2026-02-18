// Categories data for landing pages
export const categoriesData: Record<string, any> = {
  'logo-branding': {
    slug: 'logo-branding',
    title: 'Logo & Branding Design',
    heroTitle: 'Professional Logo & Branding Design',
    heroSubtitle: 'Create a memorable brand identity that stands out from the competition',
    heroImage: '/cat-logo.avif',
    avgPrice: '$299',
    statsImage: '/cat-logo.avif',
    stats: {
      rating: {
        score: '4.9',
        text: 'Average Rating',
        subtext: 'Based on 10,000+ client reviews'
      },
      guarantee: {
        title: '100% Money-Back Guarantee',
        subtext: 'If you\'re not satisfied, we\'ll refund your money'
      }
    },
    howItWorks: [
      {
        step: '1',
        title: 'Choose Your Package',
        desc: 'Select the logo design package that fits your needs and budget.',
        linkUrl: '/launch/logo-branding',
        linkText: 'View packages →'
      },
      {
        step: '2',
        title: 'Launch Your Contest',
        desc: 'Describe your vision and let our talented designers create concepts for you.',
        linkUrl: '/start-contest',
        linkText: 'Start contest →'
      },
      {
        step: '3',
        title: 'Choose Your Favorite',
        desc: 'Review designs, provide feedback, and select the perfect logo for your brand.',
        linkUrl: '/contests',
        linkText: 'Browse contests →'
      }
    ],
    inspirationTags: ['Latest', 'Modern', 'Minimalist', 'Vintage', 'Abstract'],
    showcaseImages: [
      { src: '/feature-logos-hex-1.avif', tag: 'Latest' },
      { src: '/feature-logos-hex-2.avif', tag: 'Modern' },
      { src: '/feature-logos-hex-3.avif', tag: 'Minimalist' },
      { src: '/feature-logos-hex-4.avif', tag: 'Vintage' },
      { src: '/feature-logos-hex-5.avif', tag: 'Abstract' },
      { src: '/feature-logos-hex-6.avif', tag: 'Latest' },
      { src: '/feature-logos-hex-7.avif', tag: 'Modern' },
      { src: '/feature-logos-hex-8.avif', tag: 'Minimalist' }
    ],
    bundles: [
      {
        title: 'Logo Design',
        desc: 'Professional logo design with multiple concepts',
        img: '/cat-logo.avif',
        price: '299',
        link: '/launch/logo-branding'
      },
      {
        title: 'Brand Identity',
        desc: 'Complete brand identity package',
        img: '/cat-logo.avif',
        price: '499',
        save: 'Save 20%',
        link: '/launch/logo-branding'
      },
      {
        title: 'Logo + Website',
        desc: 'Logo design plus website mockup',
        img: '/cat-logo.avif',
        price: '799',
        save: 'Save 30%',
        link: '/launch/logo-branding'
      }
    ],
    testimonials: [
      {
        text: 'Amazing experience! Got exactly what I wanted.',
        client: 'John Doe',
        clientImg: '/cat-logo.avif',
        designImg: '/feature-logos-hex-1.avif'
      },
      {
        text: 'Professional designers and great communication.',
        client: 'Jane Smith',
        clientImg: '/cat-logo.avif',
        designImg: '/feature-logos-hex-2.avif'
      },
      {
        text: 'Love my new logo! Highly recommend.',
        client: 'Mike Johnson',
        clientImg: '/cat-logo.avif',
        designImg: '/feature-logos-hex-3.avif'
      },
      {
        text: 'Fast delivery and excellent quality.',
        client: 'Sarah Williams',
        clientImg: '/cat-logo.avif',
        designImg: '/feature-logos-hex-4.avif'
      },
      {
        text: 'Best investment for my business.',
        client: 'David Brown',
        clientImg: '/cat-logo.avif',
        designImg: '/feature-logos-hex-5.avif'
      }
    ],
    testimonialStats: {
      rating: '4.9/5'
    },
    faqs: [
      {
        question: 'How long does it take to get a logo?',
        answer: 'Typically, you\'ll receive initial concepts within 24-48 hours. The full process usually takes 7-14 days depending on your package and feedback rounds.'
      },
      {
        question: 'Can I request revisions?',
        answer: 'Yes! All packages include revision rounds. You can provide feedback and request changes until you\'re completely satisfied with your logo.'
      },
      {
        question: 'What file formats will I receive?',
        answer: 'You\'ll receive vector files (AI, EPS, SVG) and raster files (PNG, JPG) in various sizes for web and print use.'
      }
    ],
    faqsRight: [
      {
        question: 'Do I own the logo?',
        answer: 'Yes! Once you select a winning design and complete payment, you receive full ownership rights to the logo.'
      },
      {
        question: 'Can I use the logo commercially?',
        answer: 'Absolutely! With full ownership, you can use your logo for any commercial purpose without restrictions.'
      },
      {
        question: 'What if I don\'t like any designs?',
        answer: 'We offer a 100% money-back guarantee. If you\'re not satisfied with the designs, we\'ll refund your money.'
      }
    ],
    resourceTabs: ['Great reading', 'Tutorials', 'Tips'],
    resources: [
      {
        title: 'How to Choose the Right Logo for Your Brand',
        img: '/cat-logo.avif',
        tag: 'Great reading',
        category: 'Great reading',
        time: '5 min read'
      },
      {
        title: 'Logo Design Trends 2024',
        img: '/cat-logo.avif',
        tag: 'Great reading',
        category: 'Great reading',
        time: '8 min read'
      },
      {
        title: 'Brand Identity Guide',
        img: '/cat-logo.avif',
        tag: 'Tutorials',
        category: 'Tutorials',
        time: '12 min read'
      },
      {
        title: 'Top 10 Logo Design Tips',
        img: '/cat-logo.avif',
        tag: 'Tips',
        category: 'Tips',
        time: '6 min read'
      }
    ]
  },
  'web-app-design': {
    slug: 'web-app-design',
    title: 'Web & App Design',
    heroTitle: 'Professional Web & App Design',
    heroSubtitle: 'Beautiful, user-friendly designs that convert visitors into customers',
    heroImage: '/cat-web.avif',
    avgPrice: '$499',
    statsImage: '/cat-web.avif',
    stats: {
      rating: {
        score: '4.8',
        text: 'Average Rating',
        subtext: 'Based on 8,000+ client reviews'
      },
      guarantee: {
        title: '100% Money-Back Guarantee',
        subtext: 'If you\'re not satisfied, we\'ll refund your money'
      }
    },
    howItWorks: [
      {
        step: '1',
        title: 'Choose Your Package',
        desc: 'Select the web design package that fits your needs.',
        linkUrl: '/launch/web-app-design',
        linkText: 'View packages →'
      },
      {
        step: '2',
        title: 'Launch Your Contest',
        desc: 'Describe your vision and requirements.',
        linkUrl: '/start-contest',
        linkText: 'Start contest →'
      },
      {
        step: '3',
        title: 'Choose Your Favorite',
        desc: 'Review designs and select the perfect one.',
        linkUrl: '/contests',
        linkText: 'Browse contests →'
      }
    ],
    inspirationTags: ['Latest', 'Modern', 'Minimalist', 'E-commerce'],
    showcaseImages: [
      { src: '/cat-web.avif', tag: 'Latest' },
      { src: '/feature-energy.avif', tag: 'Modern' },
      { src: '/feature-podcast.avif', tag: 'Minimalist' }
    ],
    bundles: [
      {
        title: 'Website Design',
        desc: 'Professional website design',
        img: '/cat-web.avif',
        price: '499',
        link: '/launch/web-app-design'
      }
    ],
    testimonials: [
      {
        text: 'Got an amazing website design!',
        client: 'Client One',
        clientImg: '/cat-web.avif',
        designImg: '/cat-web.avif'
      }
    ],
    testimonialStats: {
      rating: '4.8/5'
    },
    faqs: [
      {
        question: 'How long does web design take?',
        answer: 'Typically 2-3 weeks depending on complexity.'
      }
    ],
    faqsRight: [
      {
        question: 'Do I get source files?',
        answer: 'Yes, you receive all design files.'
      }
    ],
    resourceTabs: ['Great reading', 'Tutorials'],
    resources: [
      {
        title: 'Web Design Best Practices',
        img: '/cat-web.avif',
        tag: 'Great reading',
        category: 'Great reading',
        time: '10 min read'
      }
    ]
  }
  // Add more categories as needed
};

