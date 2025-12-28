import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO, generateWebPageSchema, generateProductSchema, generateFAQPageSchema } from '../../utils/seo';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileLanguageMenu, setShowMobileLanguageMenu] = useState(false);
  const [showExploreMenu, setShowExploreMenu] = useState(false);
  const [showMobileExploreMenu, setShowMobileExploreMenu] = useState(false);

  // Pricing plans data
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for trying out Pixwave AI',
      monthlyPrice: 0,
      annualPrice: 0,
      cta: 'Current Plan',
      disabled: true,
      popular: false,
      badge: null,
      features: [
        { text: '10 credits per day', included: true },
        { text: 'Basic generation speed', included: true },
        { text: 'Watermarked images', included: true },
        { text: 'Standard quality', included: true },
        { text: 'Community support', included: true },
        { text: 'Ads supported', included: true },
        { text: 'Public gallery', included: true },
        { text: 'Priority queue', included: false },
        { text: 'Commercial license', included: false },
        { text: 'Advanced models', included: false },
      ]
    },
    {
      name: 'Premium',
      description: 'Best for regular creators',
      monthlyPrice: 20,
      annualPrice: 10,
      cta: 'Upgrade to Premium',
      disabled: false,
      popular: false,
      badge: null,
      features: [
        { text: '2,000 credits per month', included: true },
        { text: 'No watermarks', included: true },
        { text: 'Priority queue access', included: true },
        { text: 'High-quality output', included: true },
        { text: 'Private generations', included: true },
        { text: 'Ad-free experience', included: true },
        { text: 'Commercial license', included: true },
        { text: 'Advanced AI models', included: true },
        { text: 'Priority support', included: true },
        { text: 'Early access features', included: false },
      ]
    },
    {
      name: 'Ultimate',
      description: 'For professional creators',
      monthlyPrice: 40,
      annualPrice: 20,
      cta: 'Upgrade to Ultimate',
      disabled: false,
      popular: true,
      badge: 'Most Popular',
      features: [
        { text: '5,000 credits per month', included: true },
        { text: 'No watermarks', included: true },
        { text: 'Highest priority queue', included: true },
        { text: 'Ultra high-quality output', included: true },
        { text: 'Full privacy protection', included: true },
        { text: 'Ad-free experience', included: true },
        { text: 'Commercial license', included: true },
        { text: 'All AI models access', included: true },
        { text: 'Priority support 24/7', included: true },
        { text: 'Early access features', included: true },
      ]
    }
  ];

  // Explore menu items data
  const exploreMenuItems = {
    styles: [
      { name: 'Sketch', image: 'https://readdy.ai/api/search-image?query=artistic%20pencil%20sketch%20drawing%20style%20simple%20white%20background%20minimalist%20clean%20aesthetic&width=200&height=160&seq=sketch001&orientation=squarish' },
      { name: 'Dramatic', image: 'https://readdy.ai/api/search-image?query=dramatic%20cinematic%20lighting%20moody%20atmosphere%20high%20contrast%20dark%20shadows%20simple%20background&width=200&height=160&seq=dramatic001&orientation=squarish' },
      { name: 'Plushie', image: 'https://readdy.ai/api/search-image?query=cute%20soft%20plush%20toy%20stuffed%20animal%20kawaii%20style%20simple%20pastel%20background%20adorable&width=200&height=160&seq=plushie001&orientation=squarish' },
      { name: 'Doodle', image: 'https://readdy.ai/api/search-image?query=hand%20drawn%20doodle%20cartoon%20style%20playful%20sketch%20simple%20white%20background%20fun%20illustration&width=200&height=160&seq=doodle001&orientation=squarish' },
      { name: 'Inkwork', image: 'https://readdy.ai/api/search-image?query=black%20ink%20illustration%20traditional%20art%20detailed%20linework%20simple%20background%20elegant%20style&width=200&height=160&seq=inkwork001&orientation=squarish' },
      { name: 'Pop Art', image: 'https://readdy.ai/api/search-image?query=vibrant%20pop%20art%20style%20bold%20colors%20retro%20comic%20book%20aesthetic%20simple%20background&width=200&height=160&seq=popart001&orientation=squarish' },
      { name: 'Ornament', image: 'https://readdy.ai/api/search-image?query=decorative%20ornament%20design%20elegant%20pattern%20festive%20style%20simple%20clean%20background&width=200&height=160&seq=ornament001&orientation=squarish' },
      { name: 'Sugar Cookie', image: 'https://readdy.ai/api/search-image?query=sweet%20sugar%20cookie%20decorated%20icing%20pastel%20colors%20simple%20background%20cute%20dessert&width=200&height=160&seq=cookie001&orientation=squarish' },
      { name: 'Art School', image: 'https://readdy.ai/api/search-image?query=classical%20art%20school%20painting%20style%20academic%20technique%20simple%20background%20refined&width=200&height=160&seq=artschool001&orientation=squarish' },
      { name: 'Fisheye', image: 'https://readdy.ai/api/search-image?query=fisheye%20lens%20distortion%20wide%20angle%20perspective%20creative%20photography%20simple%20scene&width=200&height=160&seq=fisheye001&orientation=squarish' },
      { name: '3D Glam Doll', image: 'https://readdy.ai/api/search-image?query=glamorous%203d%20doll%20character%20stylized%20fashion%20model%20simple%20gradient%20background%20modern&width=200&height=160&seq=glamdoll001&orientation=squarish' },
      { name: 'Baseball Bobblehead', image: 'https://readdy.ai/api/search-image?query=cute%20baseball%20bobblehead%20figurine%20cartoon%20style%20sports%20collectible%20simple%20background&width=200&height=160&seq=bobblehead001&orientation=squarish' },
    ],
    ideas: [
      { name: 'What would I look like as a K-Pop star?', image: 'https://readdy.ai/api/search-image?query=stylish%20kpop%20idol%20fashion%20colorful%20hair%20trendy%20outfit%20simple%20studio%20background%20glamorous&width=200&height=160&seq=kpop001&orientation=squarish' },
      { name: 'Me as The Girl with a Pearl', image: 'https://readdy.ai/api/search-image?query=classical%20portrait%20painting%20pearl%20earring%20vermeer%20style%20simple%20dark%20background%20elegant&width=200&height=160&seq=pearl001&orientation=squarish' },
      { name: 'Style me', image: 'https://readdy.ai/api/search-image?query=fashion%20makeover%20stylish%20outfit%20modern%20trendy%20look%20simple%20background%20chic%20aesthetic&width=200&height=160&seq=style001&orientation=squarish' },
      { name: 'Give us a matching outfit', image: 'https://readdy.ai/api/search-image?query=coordinated%20matching%20outfits%20couple%20fashion%20harmonious%20colors%20simple%20background&width=200&height=160&seq=matching001&orientation=squarish' },
      { name: 'Turn into a keychain', image: 'https://readdy.ai/api/search-image?query=cute%20miniature%20keychain%20charm%20kawaii%20style%20tiny%20accessory%20simple%20white%20background&width=200&height=160&seq=keychain001&orientation=squarish' },
    ],
    transform: [
      { name: 'Create a holiday card', image: 'https://readdy.ai/api/search-image?query=festive%20holiday%20greeting%20card%20design%20warm%20colors%20celebration%20simple%20background%20cheerful&width=200&height=160&seq=holiday001&orientation=squarish' },
      { name: 'Holiday portrait', image: 'https://readdy.ai/api/search-image?query=festive%20holiday%20portrait%20photography%20seasonal%20decorations%20warm%20lighting%20simple%20background&width=200&height=160&seq=portrait001&orientation=squarish' },
      { name: 'Create an album cover', image: 'https://readdy.ai/api/search-image?query=music%20album%20cover%20art%20creative%20design%20artistic%20composition%20simple%20bold%20aesthetic&width=200&height=160&seq=album001&orientation=squarish' },
      { name: 'Create a professional product photo', image: 'https://readdy.ai/api/search-image?query=professional%20product%20photography%20clean%20studio%20lighting%20commercial%20quality%20simple%20white%20background&width=200&height=160&seq=product001&orientation=squarish' },
      { name: 'Create a professional job photo', image: 'https://readdy.ai/api/search-image?query=professional%20business%20headshot%20corporate%20portrait%20formal%20attire%20simple%20neutral%20background&width=200&height=160&seq=job001&orientation=squarish' },
      { name: 'Redecorate my room', image: 'https://readdy.ai/api/search-image?query=modern%20interior%20design%20room%20makeover%20stylish%20furniture%20clean%20aesthetic%20simple%20decor&width=200&height=160&seq=room001&orientation=squarish' },
    ],
    fixEnhance: [
      { name: 'Remove people in the background', image: 'https://readdy.ai/api/search-image?query=photo%20editing%20background%20removal%20clean%20scene%20simple%20environment%20before%20after%20comparison&width=200&height=160&seq=remove001&orientation=squarish' },
      { name: 'Remove background', image: 'https://readdy.ai/api/search-image?query=transparent%20background%20cutout%20isolated%20subject%20clean%20extraction%20simple%20white%20backdrop&width=200&height=160&seq=bg001&orientation=squarish' },
      { name: 'Restore an old photo', image: 'https://readdy.ai/api/search-image?query=vintage%20photo%20restoration%20old%20photograph%20repair%20enhanced%20quality%20simple%20nostalgic%20aesthetic&width=200&height=160&seq=restore001&orientation=squarish' },
    ],
  };

  // FAQ data
  const faqs = [
    {
      question: 'What are the benefits of subscribing?',
      answer: 'Subscribing helps us maintain this free platform while providing you with premium benefits! Remove watermarks from all your generated images, faster generation with priority access during peak times, complete privacy - your creations stay private and won\'t appear in public galleries, ad-free experience for uninterrupted creativity.'
    },
    {
      question: 'Can I change or cancel my subscription?',
      answer: 'Absolutely! You have full flexibility to upgrade, downgrade, or cancel your subscription at any time from your account dashboard. Your current plan remains active until the end of your billing cycle, with no long-term commitments required.'
    },
    {
      question: 'What is your refund policy?',
      answer: 'All purchases are final and non-refundable.'
    },
    {
      question: 'Will subscription prices increase in the future?',
      answer: 'As we continue developing advanced features and more powerful AI models, pricing adjustments may occur. However, annual subscribers will maintain their locked-in rate for the duration of their subscription period.'
    },
    {
      question: 'Do subscribers get better image quality?',
      answer: 'Yes! Premium and Ultimate plans unlock access to our advanced Pixwave Pro model, delivering higher-resolution outputs with enhanced detail. Ultimate subscribers also receive top priority during high-traffic periods for the fastest generation times.'
    }
  ];

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  const pageUrl = `${siteUrl}/pricing`;

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebPageSchema(
        'Pricing Plans - Choose Your Plan | Pixwave AI',
        'Free tier includes watermarks. Upgrade for watermark-free images, faster processing, and commercial licensing.',
        pageUrl
      ),
      generateProductSchema(
        'Pixwave AI Premium Plan',
        'Premium subscription with 2,000 monthly credits, no watermarks, priority queue, and advanced features.',
        20,
        'USD'
      ),
      generateProductSchema(
        'Pixwave AI Ultimate Plan',
        'Ultimate subscription with 5,000 monthly credits, highest priority, full privacy, and early access to new features.',
        40,
        'USD'
      ),
      generateFAQPageSchema(faqs)
    ]
  };

  return (
    <>
      <SEO
        title="Pricing Plans - Choose Your Plan | Pixwave AI"
        description="Free tier includes watermarks. Upgrade for watermark-free images, faster processing, and commercial licensing. Premium from $20/mo, Ultimate from $40/mo."
        keywords="AI image generator pricing,subscription plans,premium AI art,image generator plans,AI photo editor pricing"
        canonical={pageUrl}
        schema={combinedSchema}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
          <div className="container mx-auto px-4 md:px-6 py-4 md:py-5">
            <nav className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 md:gap-3 group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110">
                  <i className="ri-magic-line text-lg md:text-xl text-white"></i>
                </div>
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Pixwave AI</span>
              </Link>

              <div className="hidden lg:flex items-center gap-4">
                <Link to="/ai-image-editor" className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap">
                  AI Photo Editor
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                
                {/* Explore Dropdown */}
                <div className="relative">
                  <button 
                    onMouseEnter={() => setShowExploreMenu(true)}
                    onMouseLeave={() => setShowExploreMenu(false)}
                    className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap flex items-center gap-1"
                  >
                    Explore
                    <i className={`ri-arrow-down-s-line transition-transform ${showExploreMenu ? 'rotate-180' : ''}`}></i>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  
                  {showExploreMenu && (
                    <div 
                      onMouseEnter={() => setShowExploreMenu(true)}
                      onMouseLeave={() => setShowExploreMenu(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden w-[700px] max-h-[600px] overflow-y-auto p-6 explore-menu-scrollbar"
                    >
                      {/* Styles */}
                      <div className="mb-8">
                        <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                          <i className="ri-palette-line"></i>
                          Styles
                        </h4>
                        <div className="grid grid-cols-6 gap-2">
                          {exploreMenuItems.styles.map((item) => (
                            <a 
                              key={item.name}
                              href="#" 
                              className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all"
                            >
                              <div className="aspect-[5/4] w-full overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-1.5">
                                <span className="text-white text-[10px] font-semibold line-clamp-2 leading-tight">{item.name}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Ideas */}
                      <div className="mb-8">
                        <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                          <i className="ri-lightbulb-line"></i>
                          Ideas
                        </h4>
                        <div className="grid grid-cols-5 gap-2">
                          {exploreMenuItems.ideas.map((item) => (
                            <a 
                              key={item.name}
                              href="#" 
                              className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all"
                            >
                              <div className="aspect-[5/4] w-full overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-1.5">
                                <span className="text-white text-[10px] font-semibold line-clamp-2 leading-tight">{item.name}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Transform */}
                      <div className="mb-8">
                        <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                          <i className="ri-magic-line"></i>
                          Transform
                        </h4>
                        <div className="grid grid-cols-6 gap-2">
                          {exploreMenuItems.transform.map((item) => (
                            <a 
                              key={item.name}
                              href="#" 
                              className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all"
                            >
                              <div className="aspect-[5/4] w-full overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-1.5">
                                <span className="text-white text-[10px] font-semibold line-clamp-2 leading-tight">{item.name}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Fix & Enhance */}
                      <div>
                        <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                          <i className="ri-tools-line"></i>
                          Fix & Enhance
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {exploreMenuItems.fixEnhance.map((item) => (
                            <a 
                              key={item.name}
                              href="#" 
                              className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all"
                            >
                              <div className="aspect-[5/4] w-full overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-1.5">
                                <span className="text-white text-[10px] font-semibold line-clamp-2 leading-tight">{item.name}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/" className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap">
                  Blog
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/pricing" className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap">
                  Pricing
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="hidden md:block relative">
                  <button 
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="text-sm text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap flex items-center gap-2"
                  >
                    <i className="ri-global-line"></i>
                    English
                    <i className={`ri-arrow-down-s-line transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`}></i>
                  </button>
                  {showLanguageMenu && (
                    <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-xl shadow-cyan-500/20 overflow-hidden min-w-[140px]">
                      <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">🇺🇸</span>
                        English
                      </button>
                      <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">🇫🇷</span>
                        Français
                      </button>
                      <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">🇩🇪</span>
                        Deutsch
                      </button>
                      <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">🇮🇹</span>
                        Italiano
                      </button>
                      <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">🇪🇸</span>
                        Español
                      </button>
                      <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">🇵🇹</span>
                        Português
                      </button>
                      <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">🇹🇼</span>
                        繁體中文
                      </button>
                      <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">🇯🇵</span>
                        日本語
                      </button>
                      <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">🇰🇷</span>
                        한국어
                      </button>
                    </div>
                  )}
                </div>
                <button className="hidden md:block relative px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 whitespace-nowrap overflow-hidden group">
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-cyan-500/30 hover:bg-slate-700/50 transition-all duration-300"
                >
                  <i className={`${showMobileMenu ? 'ri-close-line' : 'ri-menu-line'} text-xl text-cyan-400`}></i>
                </button>
              </div>
            </nav>

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="lg:hidden mt-4 pb-4 border-t border-cyan-500/20 pt-4 animate-fadeIn">
                <div className="flex flex-col space-y-3">
                  <Link className="text-sm text-gray-300 hover:text-cyan-400 transition-colors py-2" to="/ai-image-editor" onClick={() => setShowMobileMenu(false)}>
                    AI Photo Editor
                  </Link>

                  {/* Mobile Explore Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowMobileExploreMenu(!showMobileExploreMenu)}
                      className="w-full flex items-center justify-between px-4 py-2 text-left text-sm rounded-lg transition-colors text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
                    >
                      <span>Explore</span>
                      <i className={`ri-arrow-down-s-line transition-transform ${showMobileExploreMenu ? 'rotate-180' : ''}`}></i>
                    </button>
                    
                    {showMobileExploreMenu && (
                      <div className="mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-xl shadow-cyan-500/20 overflow-hidden p-4 space-y-4 max-h-[35vh] overflow-y-auto">
                        {/* Styles */}
                        <div>
                          <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 sticky top-0 bg-slate-900 py-2 z-10">
                            <i className="ri-palette-line"></i>
                            Styles
                          </h4>
                          <ul className="space-y-1 pl-4">
                            {['Sketch', 'Dramatic', 'Plushie', 'Doodle', 'Inkwork', 'Pop Art', 'Ornament', 'Sugar Cookie', 'Art School', 'Fisheye', '3D Glam Doll', 'Baseball Bobblehead'].map((item) => (
                              <li key={item}>
                                <a href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors block py-1" onClick={() => { setShowMobileExploreMenu(false); setShowMobileMenu(false); }}>{item}</a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ideas */}
                        <div>
                          <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 sticky top-0 bg-slate-900 py-2 z-10">
                            <i className="ri-lightbulb-line"></i>
                            Ideas
                          </h4>
                          <ul className="space-y-1 pl-4">
                            {[
                              'What would I look like as a K-Pop star?',
                              'Me as The Girl with a Pearl',
                              'Style me',
                              'Give us a matching outfit',
                              'Turn into a keychain'
                            ].map((item) => (
                              <li key={item}>
                                <a href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors block py-1" onClick={() => { setShowMobileExploreMenu(false); setShowMobileMenu(false); }}>{item}</a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Transform */}
                        <div>
                          <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 sticky top-0 bg-slate-900 py-2 z-10">
                            <i className="ri-magic-line"></i>
                            Transform
                          </h4>
                          <ul className="space-y-1 pl-4">
                            {[
                              'Create a holiday card',
                              'Holiday portrait',
                              'Create an album cover',
                              'Create a professional product photo',
                              'Create a professional job photo',
                              'Redecorate my room'
                            ].map((item) => (
                              <li key={item}>
                                <a href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors block py-1" onClick={() => { setShowMobileExploreMenu(false); setShowMobileMenu(false); }}>{item}</a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Fix & Enhance */}
                        <div>
                          <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 sticky top-0 bg-slate-900 py-2 z-10">
                            <i className="ri-tools-line"></i>
                            Fix & Enhance
                          </h4>
                          <ul className="space-y-1 pl-4">
                            {[
                              'Remove people in the background',
                              'Remove background',
                              'Restore an old photo'
                            ].map((item) => (
                              <li key={item}>
                                <a href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors block py-1" onClick={() => { setShowMobileExploreMenu(false); setShowMobileMenu(false); }}>{item}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link className="text-sm text-gray-300 hover:text-cyan-400 transition-colors py-2" to="/" onClick={() => setShowMobileMenu(false)}>
                    Blog
                  </Link>
                  <Link className="text-sm text-gray-300 hover:text-cyan-400 transition-colors py-2" to="/pricing" onClick={() => setShowMobileMenu(false)}>
                    Pricing
                  </Link>
                  
                  {/* Mobile Language Selector - Dropdown Style */}
                  <div className="pt-3 border-t border-cyan-500/20 relative">
                    <button
                      onClick={() => setShowMobileLanguageMenu(!showMobileLanguageMenu)}
                      className="w-full flex items-center justify-between px-4 py-2 text-left text-sm rounded-lg transition-colors text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <i className="ri-global-line text-base"></i>
                        <span>English</span>
                      </div>
                      <i className={`ri-arrow-down-s-line transition-transform ${showMobileLanguageMenu ? 'rotate-180' : ''}`}></i>
                    </button>
                    
                    {showMobileLanguageMenu && (
                      <div className="mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-xl shadow-cyan-500/20 overflow-hidden max-h-[40vh] overflow-y-auto">
                        <button
                          onClick={() => {
                            setShowMobileLanguageMenu(false);
                            setShowMobileMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                        >
                          <span className="text-lg">🇺🇸</span>
                          English
                        </button>
                        <button
                          onClick={() => {
                            setShowMobileLanguageMenu(false);
                            setShowMobileMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                        >
                          <span className="text-lg">🇫🇷</span>
                          Français
                        </button>
                        <button
                          onClick={() => {
                            setShowMobileLanguageMenu(false);
                            setShowMobileMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                        >
                          <span className="text-lg">🇩🇪</span>
                          Deutsch
                        </button>
                        <button
                          onClick={() => {
                            setShowMobileLanguageMenu(false);
                            setShowMobileMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                        >
                          <span className="text-lg">🇮🇹</span>
                          Italiano
                        </button>
                        <button
                          onClick={() => {
                            setShowMobileLanguageMenu(false);
                            setShowMobileMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                        >
                          <span className="text-lg">🇪🇸</span>
                          Español
                        </button>
                        <button
                          onClick={() => {
                            setShowMobileLanguageMenu(false);
                            setShowMobileMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                        >
                          <span className="text-lg">🇵🇹</span>
                          Português
                        </button>
                        <button
                          onClick={() => {
                            setShowMobileLanguageMenu(false);
                            setShowMobileMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                        >
                          <span className="text-lg">🇹🇼</span>
                          繁體中文
                        </button>
                        <button
                          onClick={() => {
                            setShowMobileLanguageMenu(false);
                            setShowMobileMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                        >
                          <span className="text-lg">🇯🇵</span>
                          日本語
                        </button>
                        <button
                          onClick={() => {
                            setShowMobileLanguageMenu(false);
                            setShowMobileMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                        >
                          <span className="text-lg">🇰🇷</span>
                          한국어
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-cyan-500/20">
                    <button className="w-full px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 whitespace-nowrap">
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Choose Your Plan
            </h1>
            
            <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-12 px-4">
              Free tier includes watermarks. Upgrade for watermark-free images, faster processing, and commercial licensing.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
              <span className={`text-xs md:text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-12 md:w-14 h-6 md:h-7 rounded-full transition-all ${isAnnual ? 'bg-gradient-to-r from-cyan-500 to-purple-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-0.5 md:top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isAnnual ? 'translate-x-6 md:translate-x-8' : 'translate-x-1'}`}></div>
              </button>
              <div className="relative flex items-center">
                <span className={`text-xs md:text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
                  Yearly
                </span>
                <div className="absolute -top-3 md:-top-3.5 left-full ml-1 md:ml-2">
                  <span className="px-1.5 md:px-2.5 py-0.5 md:py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] md:text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
                    Save 50%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-16 md:pb-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    plan.popular
                      ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl border-2 border-cyan-500'
                      : 'bg-slate-900/50 border-2 border-slate-700'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2">
                      <span className="px-3 md:px-4 py-1 md:py-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-4 md:mb-6">
                    <h3 className={`text-xl md:text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-white'}`}>
                      {plan.name}
                    </h3>
                    {plan.description && (
                      <p className={`text-xs md:text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-400'}`}>
                        {plan.description}
                      </p>
                    )}
                  </div>

                  <div className="mb-6 md:mb-8">
                    <div className="flex items-baseline gap-2">
                      {plan.monthlyPrice === 0 ? (
                        <span className={`text-4xl md:text-5xl font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>
                          Free
                        </span>
                      ) : (
                        <>
                          <span className={`text-4xl md:text-5xl font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>
                            ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                          </span>
                          <span className={`text-xs md:text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                            /month
                          </span>
                        </>
                      )}
                    </div>
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <p className={`text-xs md:text-sm mt-2 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                        Billed Annually
                      </p>
                    )}
                  </div>

                  <button
                    disabled={plan.disabled}
                    className={`w-full py-2.5 md:py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 mb-6 md:mb-8 whitespace-nowrap ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        : plan.disabled
                        ? 'bg-slate-800 text-gray-500 cursor-not-allowed'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="space-y-3 md:space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 md:gap-3">
                        <div className={`w-4 h-4 md:w-5 md:h-5 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          feature.included
                            ? plan.popular
                              ? 'text-cyan-400'
                              : 'text-emerald-500'
                            : 'text-red-500'
                        }`}>
                          <i className={`${feature.included ? 'ri-check-line' : 'ri-close-line'} text-base md:text-lg`}></i>
                        </div>
                        <div>
                          <span className={`text-xs md:text-sm ${
                            plan.popular ? 'text-gray-200' : 'text-gray-300'
                          }`}>
                            {feature.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent to-slate-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                Compare Plans
              </h2>
              <p className="text-base md:text-lg text-gray-400">
                Find the perfect plan for your creative needs
              </p>
            </div>

            {/* Mobile: Swipe hint */}
            <div className="md:hidden text-center mb-4">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                <i className="ri-arrow-left-right-line"></i>
                Swipe to see all features
              </p>
            </div>

            {/* Table wrapper with horizontal scroll */}
            <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 md:py-4 px-3 md:px-6 text-white font-semibold text-sm md:text-base min-w-[180px] md:min-w-0 sticky left-0 bg-slate-950 md:bg-transparent z-10">Features</th>
                        <th className="text-center py-3 md:py-4 px-3 md:px-6 text-white font-semibold text-sm md:text-base min-w-[100px] md:min-w-0">Free</th>
                        <th className="text-center py-3 md:py-4 px-3 md:px-6 text-white font-semibold text-sm md:text-base min-w-[100px] md:min-w-0">Premium</th>
                        <th className="text-center py-3 md:py-4 px-3 md:px-6 text-white font-semibold text-sm md:text-base min-w-[100px] md:min-w-0">Ultimate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: 'Monthly Credits', free: '10/day', premium: '2,000', ultimate: '5,000' },
                        { feature: 'Fast Mode Images', free: '~10/day', premium: '~2,000', ultimate: '~5,000' },
                        { feature: 'Basic Generations', free: 'Unlimited (Slow)', premium: 'Unlimited', ultimate: 'Unlimited' },
                        { feature: 'Pixwave Pro Model', free: '✗', premium: '✓', ultimate: '✓' },
                        { feature: 'Pixwave Max Model', free: '✗', premium: '✗', ultimate: '✓' },
                        { feature: 'Pixwave Ultra Model', free: '✗', premium: '✗', ultimate: '✓' },
                        { feature: 'Watermark', free: 'Yes', premium: 'No', ultimate: 'No' },
                        { feature: 'Ads', free: 'Yes', premium: 'No', ultimate: 'No' },
                        { feature: 'Priority Queue', free: '✗', premium: 'Standard', ultimate: 'Highest' },
                        { feature: 'AI Photo Editor', free: 'Basic', premium: 'Fast', ultimate: 'Instant' },
                        { feature: 'Advanced Refine', free: '✗', premium: '✗', ultimate: '✓' },
                        { feature: 'Early Access', free: '✗', premium: '✗', ultimate: '✓' },
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-slate-800 hover:bg-slate-900/30 transition-colors">
                          <td className="py-3 md:py-4 px-3 md:px-6 text-gray-300 text-xs md:text-base sticky left-0 bg-slate-950 md:bg-transparent z-10">{row.feature}</td>
                          <td className="py-3 md:py-4 px-3 md:px-6 text-center text-gray-400 text-xs md:text-base">{row.free}</td>
                          <td className="py-3 md:py-4 px-3 md:px-6 text-center text-gray-300 text-xs md:text-base">{row.premium}</td>
                          <td className="py-3 md:py-4 px-3 md:px-6 text-center text-cyan-400 font-semibold text-xs md:text-base">{row.ultimate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-slate-950/50 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base md:text-lg text-gray-400">
                Get answers to common questions about our subscription plans
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-5 md:px-8 py-4 md:py-6 flex items-center justify-between text-left cursor-pointer hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-base md:text-xl font-semibold text-white pr-4 md:pr-8">
                      {faq.question}
                    </span>
                    <i className={`ri-arrow-down-s-line text-xl md:text-2xl text-cyan-400 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-[500px]' : 'max-h-0'
                    }`}
                  >
                    <div className="px-5 md:px-8 pb-4 md:pb-6 text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-slate-950 to-black border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <i className="ri-sparkling-2-fill text-white text-lg"></i>
                  </div>
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Pixwave AI</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                  Pixwave AI: free, unlimited AI image generator with advanced models. Create stunning images instantly with no registration, no limits, and complete creative freedom.
                </p>
                <div className="flex space-x-4">
                  {['ri-twitter-x-line', 'ri-facebook-fill', 'ri-instagram-line', 'ri-linkedin-fill'].map((icon, index) => (
                    <a key={index} href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                      <i className={`${icon} text-white`}></i>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Product</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="/#features" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Features</a>
                  </li>
                  <li>
                    <a href="/#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">AI Image Generator</a>
                  </li>
                  <li>
                    <a href="/ai-image-editor" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">AI Photo Editor</a>
                  </li>
                  <li>
                    <a href="/pricing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Pricing</a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">AI Tools</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Z-Image Turbo AI Image Generator</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">FLUX.2 AI Image Generator</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Nano Banana Pro AI Image Generator</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Qwen Image Editor</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">AI Character Generator</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">AI Clothes Changer</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">AI Background Remover</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">AI Photo Restoration</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">AI Christmas Filter</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">AI Halloween Filter</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Zootopia Filter</a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Blog</a>
                  </li>
                  <li>
                    <a href="mailto:support@pixwave.ai" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Support</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <span className="text-gray-500 text-xs md:text-sm">© 2026 Pixwave AI. All rights reserved.</span>
              <div className="flex gap-4">
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors text-xs md:text-sm cursor-pointer whitespace-nowrap">Privacy Policy</a>
                <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors text-xs md:text-sm cursor-pointer whitespace-nowrap">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
