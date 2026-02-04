import CategoryDetailPage from '@/components/CategoryDetailPage';
import { notFound } from 'next/navigation';

const categoryData: Record<string, any> = {
  'logo-branding': {
    slug: 'logo-branding',
    title: 'Logo & Branding Design',
    subtitle: 'Create a memorable brand identity that stands out from the competition',
    description: 'Get a professional logo and complete branding package that represents your business perfectly. Our designers create unique, memorable logos that work across all platforms.',
    heroImage: '/cat-logo.avif',
    features: [
      'Multiple logo concepts and variations',
      'Complete brand identity package',
      'Vector files for all applications',
      'Social media assets included'
    ],
    pricing: [
      {
        name: 'Bronze',
        price: 299,
        entries: '30+',
        features: ['30+ logo concepts', '3 logo variations', 'Vector files', 'Money-back guarantee']
      },
      {
        name: 'Silver',
        price: 499,
        entries: '60+',
        features: ['60+ logo concepts', '5 logo variations', 'Brand guidelines', 'Vector files', 'Money-back guarantee']
      },
      {
        name: 'Gold',
        price: 799,
        entries: '90+',
        features: ['90+ logo concepts', 'Unlimited variations', 'Complete brand identity', 'Brand guidelines', 'Vector files', 'Money-back guarantee'],
        popular: true
      },
      {
        name: 'Platinum',
        price: 1299,
        entries: '120+',
        features: ['120+ logo concepts', 'Unlimited variations', 'Complete brand identity', 'Brand guidelines', 'Vector files', 'Social media kit', 'Money-back guarantee']
      }
    ],
    portfolio: [
      { id: 1, title: 'Modern Tech Logo', designer: 'DesignPro', image: '/feature-logos-hex-1.avif', likes: 245, views: '12.5K' },
      { id: 2, title: 'Elegant Brand Identity', designer: 'CreativeStudio', image: '/feature-logos-hex-2.avif', likes: 189, views: '9.2K' },
      { id: 3, title: 'Bold Startup Logo', designer: 'LogoMaster', image: '/feature-logos-hex-3.avif', likes: 312, views: '15.8K' },
      { id: 4, title: 'Classic Corporate Brand', designer: 'BrandDesign', image: '/feature-logos-hex-4.avif', likes: 156, views: '7.3K' },
      { id: 5, title: 'Creative Agency Logo', designer: 'DesignLab', image: '/feature-logos-hex-5.avif', likes: 278, views: '13.1K' },
      { id: 6, title: 'Minimalist Brand', designer: 'SimpleDesign', image: '/feature-logos-hex-6.avif', likes: 201, views: '10.4K' },
      { id: 7, title: 'Vibrant Logo Design', designer: 'ColorStudio', image: '/feature-logos-hex-7.avif', likes: 334, views: '16.7K' },
      { id: 8, title: 'Professional Identity', designer: 'BrandCraft', image: '/feature-logos-hex-8.avif', likes: 267, views: '12.9K' }
    ]
  },
  'web-app-design': {
    slug: 'web-app-design',
    title: 'Web & App Design',
    subtitle: 'Beautiful, user-friendly designs that convert visitors into customers',
    description: 'Get stunning website and mobile app designs that are both beautiful and functional. Our designers create responsive, modern interfaces that enhance user experience.',
    heroImage: '/cat-web.avif',
    features: [
      'Responsive design for all devices',
      'User experience optimization',
      'Modern UI/UX principles',
      'Interactive prototypes included'
    ],
    pricing: [
      {
        name: 'Bronze',
        price: 499,
        entries: '25+',
        features: ['25+ design concepts', '3 page designs', 'Responsive layouts', 'Money-back guarantee']
      },
      {
        name: 'Silver',
        price: 799,
        entries: '50+',
        features: ['50+ design concepts', '5 page designs', 'Responsive layouts', 'Interactive prototype', 'Money-back guarantee']
      },
      {
        name: 'Gold',
        price: 1299,
        entries: '75+',
        features: ['75+ design concepts', '10 page designs', 'Responsive layouts', 'Interactive prototype', 'Design system', 'Money-back guarantee'],
        popular: true
      },
      {
        name: 'Platinum',
        price: 1999,
        entries: '100+',
        features: ['100+ design concepts', 'Unlimited pages', 'Responsive layouts', 'Interactive prototype', 'Design system', 'Mobile app design', 'Money-back guarantee']
      }
    ],
    portfolio: [
      { id: 1, title: 'E-commerce Platform', designer: 'WebDesigner', image: '/cat-web.avif', likes: 189, views: '8.5K' },
      { id: 2, title: 'Mobile App UI', designer: 'AppStudio', image: '/feature-energy.avif', likes: 234, views: '11.2K' },
      { id: 3, title: 'SaaS Dashboard', designer: 'UXMaster', image: '/feature-podcast.avif', likes: 167, views: '7.8K' },
      { id: 4, title: 'Portfolio Website', designer: 'CreativeWeb', image: '/cat-web.avif', likes: 145, views: '6.9K' }
    ]
  },
  'business-advertising': {
    slug: 'business-advertising',
    title: 'Business & Advertising Design',
    subtitle: 'Professional marketing materials that drive results',
    description: 'Create compelling business cards, flyers, brochures, and advertising materials that make a lasting impression and drive customer engagement.',
    heroImage: '/cat-business.avif',
    features: [
      'Print-ready files',
      'Multiple format options',
      'Professional layouts',
      'Brand consistency'
    ],
    pricing: [
      {
        name: 'Bronze',
        price: 199,
        entries: '20+',
        features: ['20+ design concepts', '1 design type', 'Print-ready files', 'Money-back guarantee']
      },
      {
        name: 'Silver',
        price: 399,
        entries: '40+',
        features: ['40+ design concepts', '2 design types', 'Print-ready files', 'Multiple formats', 'Money-back guarantee']
      },
      {
        name: 'Gold',
        price: 699,
        entries: '60+',
        features: ['60+ design concepts', '3 design types', 'Print-ready files', 'Multiple formats', 'Brand guidelines', 'Money-back guarantee'],
        popular: true
      },
      {
        name: 'Platinum',
        price: 999,
        entries: '80+',
        features: ['80+ design concepts', 'Unlimited types', 'Print-ready files', 'Multiple formats', 'Brand guidelines', 'Priority support', 'Money-back guarantee']
      }
    ],
    portfolio: [
      { id: 1, title: 'Business Card Set', designer: 'PrintDesign', image: '/cat-business.avif', likes: 123, views: '5.8K' },
      { id: 2, title: 'Marketing Flyer', designer: 'AdAgency', image: '/feature-energy.avif', likes: 178, views: '8.2K' },
      { id: 3, title: 'Brochure Design', designer: 'MarketingPro', image: '/cat-business.avif', likes: 145, views: '6.7K' },
      { id: 4, title: 'Poster Campaign', designer: 'CreativeAds', image: '/feature-podcast.avif', likes: 201, views: '9.4K' }
    ]
  },
  'clothing-merchandising': {
    slug: 'clothing-merchandising',
    title: 'Clothing & Merchandise Design',
    subtitle: 'Standout apparel and merchandise designs that people love to wear',
    description: 'Create eye-catching t-shirt designs, merchandise, and apparel graphics that resonate with your audience and boost brand visibility.',
    heroImage: '/cat-art.avif',
    features: [
      'Print-ready designs',
      'Multiple product mockups',
      'Vector artwork',
      'Color variations'
    ],
    pricing: [
      {
        name: 'Bronze',
        price: 149,
        entries: '25+',
        features: ['25+ design concepts', '1 product type', 'Print-ready files', 'Money-back guarantee']
      },
      {
        name: 'Silver',
        price: 299,
        entries: '50+',
        features: ['50+ design concepts', '2 product types', 'Print-ready files', 'Mockups included', 'Money-back guarantee']
      },
      {
        name: 'Gold',
        price: 499,
        entries: '75+',
        features: ['75+ design concepts', '3 product types', 'Print-ready files', 'Mockups included', 'Color variations', 'Money-back guarantee'],
        popular: true
      },
      {
        name: 'Platinum',
        price: 799,
        entries: '100+',
        features: ['100+ design concepts', 'Unlimited types', 'Print-ready files', 'Mockups included', 'Color variations', 'Priority support', 'Money-back guarantee']
      }
    ],
    portfolio: [
      { id: 1, title: 'T-Shirt Design', designer: 'ApparelDesign', image: '/cat-art.avif', likes: 234, views: '12.1K' },
      { id: 2, title: 'Hoodie Graphics', designer: 'MerchStudio', image: '/feature-energy.avif', likes: 189, views: '9.8K' },
      { id: 3, title: 'Cap Design', designer: 'WearDesign', image: '/cat-art.avif', likes: 156, views: '7.5K' },
      { id: 4, title: 'Merchandise Set', designer: 'BrandWear', image: '/feature-podcast.avif', likes: 267, views: '13.2K' }
    ]
  },
  'art-illustration': {
    slug: 'art-illustration',
    title: 'Art & Illustration',
    subtitle: 'Unique artistic creations that bring your vision to life',
    description: 'Commission custom illustrations, artwork, and digital art that perfectly captures your creative vision. From character design to editorial illustrations.',
    heroImage: '/cat-art.avif',
    features: [
      'Custom artwork',
      'Multiple style options',
      'High-resolution files',
      'Commercial usage rights'
    ],
    pricing: [
      {
        name: 'Bronze',
        price: 199,
        entries: '20+',
        features: ['20+ concepts', '1 illustration', 'High-res files', 'Money-back guarantee']
      },
      {
        name: 'Silver',
        price: 399,
        entries: '40+',
        features: ['40+ concepts', '2 illustrations', 'High-res files', 'Multiple formats', 'Money-back guarantee']
      },
      {
        name: 'Gold',
        price: 699,
        entries: '60+',
        features: ['60+ concepts', '3 illustrations', 'High-res files', 'Multiple formats', 'Commercial license', 'Money-back guarantee'],
        popular: true
      },
      {
        name: 'Platinum',
        price: 999,
        entries: '80+',
        features: ['80+ concepts', 'Unlimited illustrations', 'High-res files', 'Multiple formats', 'Commercial license', 'Priority support', 'Money-back guarantee']
      }
    ],
    portfolio: [
      { id: 1, title: 'Character Design', designer: 'ArtStudio', image: '/cat-art.avif', likes: 312, views: '15.3K' },
      { id: 2, title: 'Digital Illustration', designer: 'IllustratorPro', image: '/feature-energy.avif', likes: 278, views: '13.7K' },
      { id: 3, title: 'Editorial Art', designer: 'CreativeArt', image: '/cat-art.avif', likes: 234, views: '11.2K' },
      { id: 4, title: 'Custom Artwork', designer: 'ArtMaster', image: '/feature-podcast.avif', likes: 189, views: '9.1K' }
    ]
  },
  'packaging-label': {
    slug: 'packaging-label',
    title: 'Packaging & Label Design',
    subtitle: 'Eye-catching packaging that makes your product stand out on shelves',
    description: 'Create stunning product packaging and labels that attract customers and communicate your brand values. From boxes to bottles, we design it all.',
    heroImage: '/cat-package.avif',
    features: [
      '3D mockups included',
      'Print-ready files',
      'Multiple size options',
      'Brand consistency'
    ],
    pricing: [
      {
        name: 'Bronze',
        price: 399,
        entries: '30+',
        features: ['30+ concepts', '1 product type', '3D mockups', 'Print-ready files', 'Money-back guarantee']
      },
      {
        name: 'Silver',
        price: 699,
        entries: '60+',
        features: ['60+ concepts', '2 product types', '3D mockups', 'Print-ready files', 'Multiple sizes', 'Money-back guarantee']
      },
      {
        name: 'Gold',
        price: 1099,
        entries: '90+',
        features: ['90+ concepts', '3 product types', '3D mockups', 'Print-ready files', 'Multiple sizes', 'Brand guidelines', 'Money-back guarantee'],
        popular: true
      },
      {
        name: 'Platinum',
        price: 1599,
        entries: '120+',
        features: ['120+ concepts', 'Unlimited types', '3D mockups', 'Print-ready files', 'Multiple sizes', 'Brand guidelines', 'Priority support', 'Money-back guarantee']
      }
    ],
    portfolio: [
      { id: 1, title: 'Product Box Design', designer: 'PackageDesign', image: '/cat-package.avif', likes: 267, views: '12.8K' },
      { id: 2, title: 'Bottle Label', designer: 'LabelStudio', image: '/feature-energy.avif', likes: 234, views: '11.4K' },
      { id: 3, title: 'Packaging Set', designer: 'BoxDesign', image: '/cat-package.avif', likes: 201, views: '9.7K' },
      { id: 4, title: 'Custom Packaging', designer: 'PackagePro', image: '/feature-podcast.avif', likes: 189, views: '8.9K' }
    ]
  },
  'book': {
    slug: 'book',
    title: 'Book & Magazine Design',
    subtitle: 'Professional book covers and layouts that captivate readers',
    description: 'Design stunning book covers, magazine layouts, and editorial designs that grab attention and convey your story effectively.',
    heroImage: '/cat-art.avif',
    features: [
      'Front and back cover',
      'Spine design included',
      'Print-ready files',
      'Multiple format options'
    ],
    pricing: [
      {
        name: 'Bronze',
        price: 299,
        entries: '25+',
        features: ['25+ cover concepts', 'Front cover only', 'Print-ready files', 'Money-back guarantee']
      },
      {
        name: 'Silver',
        price: 499,
        entries: '50+',
        features: ['50+ cover concepts', 'Front & back cover', 'Print-ready files', 'Spine design', 'Money-back guarantee']
      },
      {
        name: 'Gold',
        price: 799,
        entries: '75+',
        features: ['75+ cover concepts', 'Full cover design', 'Print-ready files', 'Spine design', 'Interior layout', 'Money-back guarantee'],
        popular: true
      },
      {
        name: 'Platinum',
        price: 1199,
        entries: '100+',
        features: ['100+ cover concepts', 'Full cover design', 'Print-ready files', 'Spine design', 'Interior layout', 'Priority support', 'Money-back guarantee']
      }
    ],
    portfolio: [
      { id: 1, title: 'Novel Cover', designer: 'BookDesign', image: '/cat-art.avif', likes: 189, views: '8.6K' },
      { id: 2, title: 'Magazine Layout', designer: 'EditorialPro', image: '/feature-energy.avif', likes: 156, views: '7.2K' },
      { id: 3, title: 'E-book Cover', designer: 'DigitalBooks', image: '/cat-art.avif', likes: 234, views: '11.3K' },
      { id: 4, title: 'Book Series', designer: 'SeriesDesign', image: '/feature-podcast.avif', likes: 201, views: '9.8K' }
    ]
  }
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryData[params.slug];

  if (!category) {
    notFound();
  }

  return <CategoryDetailPage category={category} />;
}

export function generateStaticParams() {
  return Object.keys(categoryData).map((slug) => ({
    slug,
  }));
}

