import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO, generateWebSiteSchema, generateSoftwareApplicationSchema, generateFAQPageSchema } from '../../utils/seo';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [activeTechTab, setActiveTechTab] = useState('lightning');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [generatorTab, setGeneratorTab] = useState('basic');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('square');
  const [style, setStyle] = useState('natural');
  const [model, setModel] = useState('basic');
  const [fastMode, setFastMode] = useState(false);
  const [color, setColor] = useState('default');
  const [lighting, setLighting] = useState('natural');
  const [composition, setComposition] = useState('balanced');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPremiumModel, setSelectedPremiumModel] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const handleModelChange = (value: string) => {
    if (value === 'pro' || value === 'max' || value === 'ultra') {
      setSelectedPremiumModel(value);
      setShowUpgradeModal(true);
    } else {
      setModel(value);
    }
  };

  const getModelDisplayName = (modelValue: string) => {
    const modelNames: { [key: string]: string } = {
      'pro': 'Pixwave Pro',
      'max': 'Pixwave Max',
      'ultra': 'Pixwave Ultra'
    };
    return modelNames[modelValue] || '';
  };

  // Handle smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          
          if (href === '#' || href === '#top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
              window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Handle scroll on page load if there's a hash in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        if (hash === '#' || hash === '#top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const targetId = hash.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          }
        }
      }, 100);
    }
  }, []);

  // Gallery images by category
  const galleryImages = {
    all: [
      { src: 'https://public.readdy.ai/ai/img_res/caf86a6e148f87e60027a0d5827210cd.jpg', alt: 'A cosmic nebula with swirling purple and blue gases, stars scattered throughout' },
      { src: 'https://public.readdy.ai/ai/img_res/f5b16848df8912eddf2a08cd78d12fb3.jpg', alt: 'Mystical forest at night with bioluminescent plants and fireflies' },
      { src: 'https://readdy.ai/api/search-image?query=futuristic%20cyberpunk%20city%20with%20vibrant%20neon%20lights%20and%20rain-soaked%20reflective%20streets%20dystopian%20urban%20landscape%20night%20scene%20glowing%20signs%20atmospheric%20fog%20simple%20dark%20background&width=600&height=800&seq=showcase-cyber-001&orientation=portrait', alt: 'Futuristic cyberpunk city with neon lights and rain-soaked streets' },
      { src: 'https://readdy.ai/api/search-image?query=breathtaking%20sunrise%20over%20majestic%20mountain%20peaks%20with%20warm%20golden%20light%20rays%20dramatic%20sky%20peaceful%20landscape%20natural%20beauty%20serene%20atmosphere%20simple%20clean%20background&width=600&height=800&seq=showcase-sunrise-001&orientation=portrait', alt: 'A beautiful sunrise over mountain peaks with golden light' },
      { src: 'https://readdy.ai/api/search-image?query=abstract%20fluid%20art%20with%20vibrant%20colors%20flowing%20and%20merging%20together%20liquid%20paint%20effect%20dynamic%20movement%20colorful%20gradients%20contemporary%20art%20style%20simple%20clean%20background&width=600&height=800&seq=showcase-fluid-001&orientation=portrait', alt: 'Abstract fluid art with vibrant colors merging together' },
      { src: 'https://readdy.ai/api/search-image?query=classical%20oil%20painting%20style%20portrait%20with%20dramatic%20chiaroscuro%20lighting%20renaissance%20technique%20rich%20textures%20visible%20brush%20strokes%20traditional%20art%20masterpiece%20simple%20dark%20background&width=600&height=800&seq=showcase-portrait-001&orientation=portrait', alt: 'Classical oil painting style portrait with dramatic lighting' },
      { src: 'https://readdy.ai/api/search-image?query=dramatic%20mountain%20landscape%20with%20powerful%20storm%20clouds%20and%20dynamic%20lighting%20epic%20scenery%20moody%20atmosphere%20nature%20photography%20cinematic%20composition%20simple%20background&width=600&height=800&seq=showcase-mountain-001&orientation=portrait', alt: 'Dramatic mountain landscape with dramatic clouds and lighting' },
      { src: 'https://readdy.ai/api/search-image?query=peaceful%20serene%20valley%20with%20gentle%20morning%20mist%20and%20soft%20golden%20sunlight%20tranquil%20landscape%20calm%20atmosphere%20natural%20beauty%20dreamy%20scenery%20simple%20clean%20background&width=600&height=800&seq=showcase-valley-001&orientation=portrait', alt: 'Serene valley with morning mist and soft golden light' }
    ],
    nature: [
      { src: 'https://public.readdy.ai/ai/img_res/f5b16848df8912eddf2a08cd78d12fb3.jpg', alt: 'Mystical forest at night with bioluminescent plants and fireflies' },
      { src: 'https://readdy.ai/api/search-image?query=breathtaking%20sunrise%20over%20majestic%20mountain%20peaks%20with%20warm%20golden%20light%20rays%20dramatic%20sky%20peaceful%20landscape%20natural%20beauty%20serene%20atmosphere%20simple%20clean%20background&width=600&height=800&seq=showcase-sunrise-001&orientation=portrait', alt: 'A beautiful sunrise over mountain peaks with golden light' },
      { src: 'https://readdy.ai/api/search-image?query=dramatic%20mountain%20landscape%20with%20powerful%20storm%20clouds%20and%20dynamic%20lighting%20epic%20scenery%20moody%20atmosphere%20nature%20photography%20cinematic%20composition%20simple%20background&width=600&height=800&seq=showcase-mountain-001&orientation=portrait', alt: 'Dramatic mountain landscape with dramatic clouds and lighting' },
      { src: 'https://readdy.ai/api/search-image?query=peaceful%20serene%20valley%20with%20gentle%20morning%20mist%20and%20soft%20golden%20sunlight%20tranquil%20landscape%20calm%20atmosphere%20natural%20beauty%20dreamy%20scenery%20simple%20clean%20background&width=600&height=800&seq=showcase-valley-001&orientation=portrait', alt: 'Serene valley with morning mist and soft golden light' },
      { src: 'https://readdy.ai/api/search-image?query=lush%20tropical%20rainforest%20with%20vibrant%20green%20foliage%20exotic%20plants%20waterfall%20natural%20paradise%20dense%20vegetation%20wildlife%20habitat%20simple%20background&width=600&height=800&seq=nature-forest-001&orientation=portrait', alt: 'Lush tropical rainforest with vibrant green foliage' },
      { src: 'https://readdy.ai/api/search-image?query=crystal%20clear%20turquoise%20ocean%20waves%20pristine%20beach%20white%20sand%20coastal%20paradise%20tropical%20destination%20serene%20seascape%20simple%20background&width=600&height=800&seq=nature-ocean-001&orientation=portrait', alt: 'Crystal clear turquoise ocean waves and pristine beach' },
      { src: 'https://readdy.ai/api/search-image?query=majestic%20waterfall%20cascading%20down%20rocky%20cliffs%20surrounded%20by%20lush%20greenery%20natural%20wonder%20powerful%20water%20flow%20scenic%20landscape%20simple%20background&width=600&height=800&seq=nature-waterfall-001&orientation=portrait', alt: 'Majestic waterfall cascading down rocky cliffs' },
      { src: 'https://readdy.ai/api/search-image?query=colorful%20autumn%20forest%20with%20golden%20and%20red%20leaves%20fall%20foliage%20seasonal%20beauty%20nature%20photography%20peaceful%20woodland%20simple%20background&width=600&height=800&seq=nature-autumn-001&orientation=portrait', alt: 'Colorful autumn forest with golden and red leaves' }
    ],
    urban: [
      { src: 'https://readdy.ai/api/search-image?query=futuristic%20cyberpunk%20city%20with%20vibrant%20neon%20lights%20and%20rain-soaked%20reflective%20streets%20dystopian%20urban%20landscape%20night%20scene%20glowing%20signs%20atmospheric%20fog%20simple%20dark%20background&width=600&height=800&seq=showcase-cyber-001&orientation=portrait', alt: 'Futuristic cyberpunk city with neon lights and rain-soaked streets' },
      { src: 'https://readdy.ai/api/search-image?query=modern%20city%20skyline%20at%20sunset%20with%20glass%20skyscrapers%20reflecting%20golden%20light%20urban%20architecture%20metropolitan%20cityscape%20contemporary%20buildings%20simple%20background&width=600&height=800&seq=urban-skyline-001&orientation=portrait', alt: 'Modern city skyline at sunset with glass skyscrapers' },
      { src: 'https://readdy.ai/api/search-image?query=busy%20urban%20street%20scene%20with%20pedestrians%20and%20traffic%20city%20life%20metropolitan%20atmosphere%20modern%20architecture%20street%20photography%20simple%20background&width=600&height=800&seq=urban-street-001&orientation=portrait', alt: 'Busy urban street scene with pedestrians and traffic' },
      { src: 'https://readdy.ai/api/search-image?query=industrial%20warehouse%20district%20with%20brick%20buildings%20and%20metal%20structures%20urban%20decay%20gritty%20atmosphere%20architectural%20photography%20simple%20background&width=600&height=800&seq=urban-industrial-001&orientation=portrait', alt: 'Industrial warehouse district with brick buildings' },
      { src: 'https://readdy.ai/api/search-image?query=vibrant%20city%20nightlife%20with%20illuminated%20buildings%20neon%20signs%20bustling%20streets%20urban%20energy%20metropolitan%20night%20scene%20simple%20background&width=600&height=800&seq=urban-night-001&orientation=portrait', alt: 'Vibrant city nightlife with illuminated buildings' },
      { src: 'https://readdy.ai/api/search-image?query=modern%20subway%20station%20with%20sleek%20design%20futuristic%20architecture%20urban%20transportation%20clean%20lines%20contemporary%20interior%20simple%20background&width=600&height=800&seq=urban-subway-001&orientation=portrait', alt: 'Modern subway station with sleek design' },
      { src: 'https://readdy.ai/api/search-image?query=rooftop%20view%20of%20city%20with%20skyscrapers%20urban%20landscape%20aerial%20perspective%20metropolitan%20vista%20architectural%20photography%20simple%20background&width=600&height=800&seq=urban-rooftop-001&orientation=portrait', alt: 'Rooftop view of city with skyscrapers' },
      { src: 'https://readdy.ai/api/search-image?query=historic%20city%20square%20with%20classical%20architecture%20old%20buildings%20cultural%20heritage%20urban%20landmark%20traditional%20design%20simple%20background&width=600&height=800&seq=urban-historic-001&orientation=portrait', alt: 'Historic city square with classical architecture' }
    ],
    abstract: [
      { src: 'https://public.readdy.ai/ai/img_res/caf86a6e148f87e60027a0d5827210cd.jpg', alt: 'A cosmic nebula with swirling purple and blue gases, stars scattered throughout' },
      { src: 'https://readdy.ai/api/search-image?query=abstract%20fluid%20art%20with%20vibrant%20colors%20flowing%20and%20merging%20together%20liquid%20paint%20effect%20dynamic%20movement%20colorful%20gradients%20contemporary%20art%20style%20simple%20clean%20background&width=600&height=800&seq=showcase-fluid-001&orientation=portrait', alt: 'Abstract fluid art with vibrant colors merging together' },
      { src: 'https://readdy.ai/api/search-image?query=geometric%20abstract%20composition%20with%20bold%20shapes%20and%20vibrant%20colors%20modern%20art%20minimalist%20design%20contemporary%20style%20simple%20background&width=600&height=800&seq=abstract-geometric-001&orientation=portrait', alt: 'Geometric abstract composition with bold shapes' },
      { src: 'https://readdy.ai/api/search-image?query=swirling%20marble%20texture%20with%20gold%20veins%20luxury%20abstract%20pattern%20elegant%20design%20flowing%20lines%20simple%20background&width=600&height=800&seq=abstract-marble-001&orientation=portrait', alt: 'Swirling marble texture with gold veins' },
      { src: 'https://readdy.ai/api/search-image?query=colorful%20smoke%20wisps%20abstract%20photography%20dynamic%20movement%20ethereal%20beauty%20flowing%20forms%20artistic%20composition%20simple%20background&width=600&height=800&seq=abstract-smoke-001&orientation=portrait', alt: 'Colorful smoke wisps abstract photography' },
      { src: 'https://readdy.ai/api/search-image?query=digital%20glitch%20art%20with%20distorted%20pixels%20vibrant%20colors%20cyber%20aesthetic%20modern%20abstract%20contemporary%20digital%20art%20simple%20background&width=600&height=800&seq=abstract-glitch-001&orientation=portrait', alt: 'Digital glitch art with distorted pixels' },
      { src: 'https://readdy.ai/api/search-image?query=abstract%20watercolor%20splash%20with%20flowing%20colors%20artistic%20expression%20fluid%20dynamics%20contemporary%20art%20style%20simple%20background&width=600&height=800&seq=abstract-watercolor-001&orientation=portrait', alt: 'Abstract watercolor splash with flowing colors' },
      { src: 'https://readdy.ai/api/search-image?query=fractal%20pattern%20with%20intricate%20details%20mathematical%20art%20complex%20geometry%20mesmerizing%20design%20abstract%20composition%20simple%20background&width=600&height=800&seq=abstract-fractal-001&orientation=portrait', alt: 'Fractal pattern with intricate details' }
    ],
    portrait: [
      { src: 'https://readdy.ai/api/search-image?query=classical%20oil%20painting%20style%20portrait%20with%20dramatic%20chiaroscuro%20lighting%20renaissance%20technique%20rich%20textures%20visible%20brush%20strokes%20traditional%20art%20masterpiece%20simple%20dark%20background&width=600&height=800&seq=showcase-portrait-001&orientation=portrait', alt: 'Classical oil painting style portrait with dramatic lighting' },
      { src: 'https://readdy.ai/api/search-image?query=modern%20fashion%20portrait%20with%20dramatic%20lighting%20high%20contrast%20professional%20photography%20elegant%20pose%20contemporary%20style%20simple%20background&width=600&height=800&seq=portrait-fashion-001&orientation=portrait', alt: 'Modern fashion portrait with dramatic lighting' },
      { src: 'https://readdy.ai/api/search-image?query=cinematic%20portrait%20with%20moody%20atmosphere%20film%20noir%20style%20dramatic%20shadows%20artistic%20photography%20simple%20background&width=600&height=800&seq=portrait-cinematic-001&orientation=portrait', alt: 'Cinematic portrait with moody atmosphere' },
      { src: 'https://readdy.ai/api/search-image?query=artistic%20portrait%20with%20creative%20lighting%20experimental%20photography%20unique%20perspective%20contemporary%20art%20style%20simple%20background&width=600&height=800&seq=portrait-artistic-001&orientation=portrait', alt: 'Artistic portrait with creative lighting' },
      { src: 'https://readdy.ai/api/search-image?query=elegant%20studio%20portrait%20with%20soft%20lighting%20professional%20headshot%20clean%20composition%20classic%20photography%20simple%20background&width=600&height=800&seq=portrait-studio-001&orientation=portrait', alt: 'Elegant studio portrait with soft lighting' },
      { src: 'https://readdy.ai/api/search-image?query=dramatic%20black%20and%20white%20portrait%20with%20high%20contrast%20monochrome%20photography%20timeless%20style%20artistic%20expression%20simple%20background&width=600&height=800&seq=portrait-bw-001&orientation=portrait', alt: 'Dramatic black and white portrait' },
      { src: 'https://readdy.ai/api/search-image?query=Outdoor%20natural%20light%20portrait%20with%20golden%20hour%20glow%20environmental%20portrait%20lifestyle%20photography%20simple%20background&width=600&height=800&seq=portrait-outdoor-001&orientation=portrait', alt: 'Outdoor natural light portrait with golden hour glow' },
      { src: 'https://readdy.ai/api/search-image?query=creative%20double%20exposure%20portrait%20with%20artistic%20overlay%20surreal%20photography%20contemporary%20art%20style%20simple%20background&width=600&height=800&seq=portrait-double-001&orientation=portrait', alt: 'Creative double exposure portrait' }
    ]
  };

  const faqs = [
    {
      question: 'What is Pixwave AI?',
      answer: 'Pixwave AI is a free, unlimited AI image generator that creates stunning images from text descriptions. No registration required, completely free to use.'
    },
    {
      question: 'Is Pixwave AI really free?',
      answer: 'Yes! Pixwave AI is 100% free with unlimited generations. You can create as many images as you want without any cost or registration.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account needed! Simply enter your text description and start generating images immediately. We value your privacy and convenience.'
    },
    {
      question: 'What image styles can I create?',
      answer: 'You can create various styles including realistic photos, anime, oil paintings, watercolors, sketches, and many more artistic styles.'
    },
    {
      question: 'How long does it take to generate an image?',
      answer: 'Most images are generated in just a few seconds. Our advanced AI technology ensures fast processing times.'
    },
    {
      question: 'Can I use the generated images commercially?',
      answer: 'Yes! All images you create with Pixwave AI can be used for personal or commercial purposes.'
    }
  ];

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebSiteSchema(),
      generateSoftwareApplicationSchema(),
      generateFAQPageSchema(faqs)
    ]
  };

  return (
    <>
      <SEO
        title="Pixwave AI - Advanced Free AI Image Generator | Create Stunning Images in Seconds"
        description="Pixwave AI - World's most advanced free AI image generator. Create stunning, high-quality images from text descriptions in seconds. Unlimited generations, lightning-fast speed, complete privacy protection. No login required."
        keywords="AI image generator,free AI art,text to image,AI art generator,Pixwave AI,neural style transfer,digital art creation,free image generator,AI photo creator"
        schema={combinedSchema}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-cyan-500/10 rounded-full blur-3xl -top-32 md:-top-48 -left-32 md:-left-48 animate-pulse"></div>
          <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 rounded-full blur-3xl top-1/4 right-0 animate-pulse"></div>
          <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-pink-500/10 rounded-full blur-3xl bottom-0 left-1/3 animate-pulse"></div>
        </div>

        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className="relative pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/40 animate-pulse">
                <i className="ri-magic-line text-2xl md:text-3xl text-white"></i>
              </div>
              <h1 className="text-4xl md:text-6xl font-black">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Pixwave AI</span>
              </h1>
            </div>

            <p className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 px-4">Create Stunning AI Images in Seconds</p>
            <p className="text-lg md:text-xl text-cyan-300 mb-6 md:mb-8 px-4">World's Most Advanced Free AI Image Generator</p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-4">
              <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm whitespace-nowrap hover:scale-105 transition-transform duration-300 cursor-pointer">
                <i className="ri-flashlight-line mr-1"></i>100% Free Forever
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-300 border border-purple-500/30 backdrop-blur-sm whitespace-nowrap hover:scale-105 transition-transform duration-300 cursor-pointer">
                <i className="ri-rocket-line mr-1"></i>Lightning Fast
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full bg-gradient-to-r from-pink-500/20 to-pink-500/10 text-pink-300 border border-pink-500/30 backdrop-blur-sm whitespace-nowrap hover:scale-105 transition-transform duration-300 cursor-pointer">
                <i className="ri-shield-check-line mr-1"></i>No Login Required
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm whitespace-nowrap hover:scale-105 transition-transform duration-300 cursor-pointer">
                <i className="ri-infinity-line mr-1"></i>Unlimited Generations
              </span>
            </div>

            {/* AI Image Generator Section */}
            <div className="w-full max-w-4xl mt-8">
              <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                      <i className="ri-magic-line text-white text-lg"></i>
                    </div>
                    AI Image Generator
                  </h2>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <i className="ri-image-add-line text-cyan-400 text-base"></i>
                    <span className="text-xs text-gray-400 hidden sm:inline">Add Image</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-1 mb-6 flex">
                  <button
                    onClick={() => setGeneratorTab('basic')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                      generatorTab === 'basic'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setGeneratorTab('advanced')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                      generatorTab === 'advanced'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Advanced
                  </button>
                </div>

                {/* Basic Tab Content */}
                {generatorTab === 'basic' && (
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        What do you want to create?
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full min-h-[120px] bg-[#0f0f0f] border border-white/10 text-white placeholder:text-gray-600 rounded-2xl px-3 py-2 resize-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 group-hover:border-white/20 focus:outline-none text-sm"
                        placeholder="Describe your vision in detail..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Aspect Ratio</label>
                        <select
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="square">Square</option>
                          <option value="landscape">Landscape</option>
                          <option value="portrait">Portrait</option>
                          <option value="wide">Wide</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Style</label>
                        <select
                          value={style}
                          onChange={(e) => setStyle(e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="natural">Natural</option>
                          <option value="cinematic">Cinematic</option>
                          <option value="anime">Anime</option>
                          <option value="digital-art">Digital Art</option>
                          <option value="oil-painting">Oil Painting</option>
                          <option value="watercolor">Watercolor</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Model</label>
                        <select
                          value={model}
                          onChange={(e) => handleModelChange(e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="basic">Basic</option>
                          <option value="pro">Pro</option>
                          <option value="max">Max</option>
                          <option value="ultra">Ultra</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Fast Mode</label>
                        <select
                          value={fastMode ? 'on' : 'off'}
                          onChange={(e) => setFastMode(e.target.value === 'on')}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="off">Off</option>
                          <option value="on">On</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setPrompt('');
                          setAspectRatio('square');
                          setStyle('natural');
                          setModel('basic');
                          setFastMode(false);
                        }}
                        className="flex-1 bg-[#0f0f0f] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 font-medium py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
                      >
                        Clear
                      </button>
                      <button 
                        onClick={() => {
                          const randomPrompts = [
                            'A mystical forest with glowing mushrooms and fireflies',
                            'Futuristic city with flying cars at sunset',
                            'Underwater palace with coral gardens',
                            'Mountain landscape with aurora borealis',
                            'Steampunk airship in the clouds'
                          ];
                          setPrompt(randomPrompts[Math.floor(Math.random() * randomPrompts.length)]);
                        }}
                        className="flex-1 bg-[#0f0f0f] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 font-medium py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
                      >
                        Random
                      </button>
                    </div>

                    <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 md:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] flex items-center justify-center gap-2 whitespace-nowrap relative overflow-hidden group">
                      <span className="relative z-10 flex items-center gap-2">
                        <i className="ri-magic-line text-lg"></i>
                        <span>Generate Image</span>
                      </span>
                      <span className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">FREE</span>
                    </button>
                  </div>
                )}

                {/* Advanced Tab Content */}
                {generatorTab === 'advanced' && (
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Main Prompt
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full min-h-[120px] bg-[#0f0f0f] border border-white/10 text-white placeholder:text-gray-600 rounded-2xl px-3 py-2 resize-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 group-hover:border-white/20 focus:outline-none text-sm"
                        placeholder="Describe your vision in detail..."
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Negative Prompt
                      </label>
                      <textarea
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        className="w-full min-h-[80px] bg-[#0f0f0f] border border-white/10 text-white placeholder:text-gray-600 rounded-2xl px-3 py-2 resize-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 group-hover:border-white/20 focus:outline-none text-sm"
                        placeholder="What you don't want to see..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Color</label>
                        <select
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="default">Default</option>
                          <option value="vibrant">Vibrant</option>
                          <option value="muted">Muted</option>
                          <option value="monochrome">Monochrome</option>
                          <option value="warm">Warm Tones</option>
                          <option value="cool">Cool Tones</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Lighting</label>
                        <select
                          value={lighting}
                          onChange={(e) => setLighting(e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="natural">Natural</option>
                          <option value="dramatic">Dramatic</option>
                          <option value="soft">Soft</option>
                          <option value="studio">Studio</option>
                          <option value="golden-hour">Golden Hour</option>
                          <option value="neon">Neon</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Composition</label>
                        <select
                          value={composition}
                          onChange={(e) => setComposition(e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="balanced">Balanced</option>
                          <option value="rule-of-thirds">Rule of Thirds</option>
                          <option value="centered">Centered</option>
                          <option value="dynamic">Dynamic</option>
                          <option value="symmetrical">Symmetrical</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Aspect Ratio</label>
                        <select
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="square">1:1 ⬜</option>
                          <option value="landscape">16:9 ▭</option>
                          <option value="portrait">9:16 ▯</option>
                          <option value="wide">21:9 ▬</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Style</label>
                        <select
                          value={style}
                          onChange={(e) => setStyle(e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="natural">Natural</option>
                          <option value="cinematic">Cinematic</option>
                          <option value="anime">Anime</option>
                          <option value="digital-art">Digital Art</option>
                          <option value="oil-painting">Oil Painting</option>
                          <option value="watercolor">Watercolor</option>
                          <option value="3d-render">3D Render</option>
                          <option value="sketch">Sketch</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Model</label>
                        <select
                          value={model}
                          onChange={(e) => handleModelChange(e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all focus:outline-none cursor-pointer"
                        >
                          <option value="basic">Pixwave Basic</option>
                          <option value="pro">Pixwave Pro 👑 PREMIUM</option>
                          <option value="max">Pixwave Max 👑 PREMIUM</option>
                          <option value="ultra">Pixwave Ultra 👑 PREMIUM</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-500 font-medium">Fast Mode</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={fastMode}
                            onChange={(e) => setFastMode(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[#0f0f0f] border border-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-600"></div>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">Generate images faster with optimized settings</p>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setPrompt('');
                          setNegativePrompt('');
                          setAspectRatio('square');
                          setStyle('natural');
                          setModel('basic');
                          setFastMode(false);
                          setColor('default');
                          setLighting('natural');
                          setComposition('balanced');
                        }}
                        className="flex-1 bg-[#0f0f0f] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 font-medium py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
                      >
                        Clear
                      </button>
                      <button 
                        onClick={() => {
                          const randomPrompts = [
                            'A mystical forest with glowing mushrooms and fireflies at twilight',
                            'Futuristic cyberpunk city with neon lights and flying cars',
                            'Underwater palace with coral gardens and bioluminescent creatures',
                            'Mountain landscape with aurora borealis and starry sky',
                            'Steampunk airship floating through clouds at sunset'
                          ];
                          setPrompt(randomPrompts[Math.floor(Math.random() * randomPrompts.length)]);
                        }}
                        className="flex-1 bg-[#0f0f0f] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 font-medium py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
                      >
                        Random
                      </button>
                    </div>

                    <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 md:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] flex items-center justify-center gap-2 whitespace-nowrap relative overflow-hidden group">
                      <span className="relative z-10 flex items-center gap-2">
                        <i className="ri-magic-line text-lg"></i>
                        <span>Generate Image</span>
                      </span>
                      <span className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">FREE</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-lg w-full p-6 md:p-8 relative">
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <i className="ri-close-line text-white text-xl"></i>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <i className="ri-vip-crown-line text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-white">{getModelDisplayName(selectedPremiumModel)} {t('modal.upgrade.title')}</h3>
            </div>

            <p className="text-gray-300 text-base mb-6 leading-relaxed">
              {t('modal.upgrade.description', { model: getModelDisplayName(selectedPremiumModel) })}
            </p>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6">
              <p className="text-cyan-300 text-sm mb-4">
                {t('modal.upgrade.info', { model: getModelDisplayName(selectedPremiumModel) })}
              </p>

              <div className="space-y-3">
                <p className="text-white font-semibold text-sm">{t('modal.upgrade.benefits')}</p>
                <ul className="space-y-2">
                  {[
                    t('modal.upgrade.benefit1'),
                    t('modal.upgrade.benefit2'),
                    t('modal.upgrade.benefit3')
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
              >
                {t('modal.upgrade.notNow')}
              </button>
              <button 
                onClick={() => {
                  setShowUpgradeModal(false);
                  // Here you would redirect to upgrade page
                }}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 whitespace-nowrap"
              >
                {t('modal.upgrade.upgrade')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Models Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">AI MODELS</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Powered by <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Leading AI Models</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">Choose from the world's most advanced AI models</p>
          </div>

          {/* Video Models */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Video Models</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  logo: 'https://app-images.litmedia.ai/upload/default/20251010/2fc87cbaf99ad3de2d7073e676b7799a.svg',
                  name: 'Sora 2',
                  tags: [{ text: 'Hot', color: 'bg-red-500' }],
                  description: 'Generate a more accurate and realistic physical world'
                },
                {
                  logo: 'https://airepair-img.imyfone.cn/upload/default/20251107/9fd1ce4f3164fb403a012d112388ee33.svg',
                  name: 'Seedance 1.5 Pro',
                  tags: [{ text: 'New', color: 'bg-green-500' }],
                  description: 'Precise audio-visual alignment and cinematic narrative quality'
                },
                {
                  logo: 'https://app-images.litmedia.ai/upload/default/20250911/e4ef905835b64b86c7c39a002f2e6405.jpg',
                  name: 'Wan 2.5',
                  tags: [{ text: '75% off', color: 'bg-red-500' }],
                  description: 'Ability to easily create high-quality videos in various styles'
                },
                {
                  logo: 'https://app-images.litmedia.ai/upload/default/20250911/4f3cbef7598bb6448707b2f7aac7b071.png',
                  name: 'LoveAI 1.0',
                  tags: [{ text: 'Popular', color: 'bg-red-500' }],
                  description: 'Create interactive videos between couples'
                },
                {
                  logo: 'https://app-images.litmedia.ai/upload/default/20250915/392ea2b9bc26b2229106a45cf3eb82bd.svg',
                  name: 'Veo 3.1 Fast',
                  tags: [{ text: 'Fast', color: 'bg-blue-500' }],
                  description: 'Cost-effective and fast-efficient'
                },
                {
                  logo: 'https://app-images.litmedia.ai/upload/default/20250912/4364e2d1033080264eb480617dc37425.svg',
                  name: 'Vidu Q2 Pro',
                  tags: [{ text: 'Pro', color: 'bg-purple-500' }],
                  description: 'Good at making subtle changes in facial expressions'
                }
              ].map((model, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/20 bg-gray-900/50 backdrop-blur-sm p-6 h-full flex flex-col">
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 flex items-center justify-center bg-white/5 rounded-xl p-3">
                        <img 
                          src={model.logo}
                          alt={`${model.name} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-cyan-400 text-2xl font-bold">${model.name.charAt(0)}</div>`;
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    {model.tags && model.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mb-3">
                        {model.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className={`px-2 py-1 text-xs font-bold text-white ${tag.color} rounded-full`}>
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Name */}
                    <h4 className="text-lg font-bold text-white text-center mb-3">{model.name}</h4>

                    {/* Description */}
                    <p className="text-sm text-gray-400 text-center mb-4 flex-grow leading-relaxed">{model.description}</p>

                    {/* Button */}
                    <button className="w-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 hover:from-cyan-500 hover:to-purple-600 text-cyan-400 hover:text-white border border-cyan-500/30 hover:border-transparent font-semibold py-3 rounded-xl transition-all duration-300 whitespace-nowrap">
                      Use Model
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Models */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Image Models</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  logo: 'https://airepair-img.imyfone.cn/upload/default/20251126/f0cc0441102d6439aca7836cce32875e.png',
                  name: 'Nano Banana Pro',
                  tags: [{ text: 'Hot', color: 'bg-red-500' }],
                  description: 'Supports up to 4K with industry-leading visual detail'
                },
                {
                  logo: 'https://app-images.litmedia.ai/upload/default/20251029/a748ed478e762b62b6f8c725d8d26414.svg',
                  name: 'Flux.1',
                  tags: [],
                  description: 'Excellent Quality & Complex Scene Generation'
                }
              ].map((model, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/20 bg-gray-900/50 backdrop-blur-sm p-6 h-full flex flex-col">
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 flex items-center justify-center bg-white/5 rounded-xl p-3">
                        <img 
                          src={model.logo}
                          alt={`${model.name} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-cyan-400 text-2xl font-bold">${model.name.charAt(0)}</div>`;
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    {model.tags && model.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mb-3">
                        {model.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className={`px-2 py-1 text-xs font-bold text-white ${tag.color} rounded-full`}>
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Name */}
                    <h4 className="text-lg font-bold text-white text-center mb-3">{model.name}</h4>

                    {/* Description */}
                    <p className="text-sm text-gray-400 text-center mb-4 flex-grow leading-relaxed">{model.description}</p>

                    {/* Button */}
                    <button className="w-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 hover:from-cyan-500 hover:to-purple-600 text-cyan-400 hover:text-white border border-cyan-500/30 hover:border-transparent font-semibold py-3 rounded-xl transition-all duration-300 whitespace-nowrap">
                      Use Model
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-12 md:py-20 px-4 md:px-6 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase flex items-center justify-center space-x-2">
                <i className="ri-gallery-line text-lg"></i>
                <span>COMMUNITY GALLERY</span>
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              AI Generated Images<br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Showcase</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">Real creations from our community of AI artists worldwide</p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-900/50 backdrop-blur-sm rounded-full p-2 border border-gray-800 flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 md:px-8 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm whitespace-nowrap ${activeTab === 'all' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('nature')}
                className={`px-4 md:px-8 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm whitespace-nowrap ${activeTab === 'nature' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                Nature
              </button>
              <button 
                onClick={() => setActiveTab('urban')}
                className={`px-4 md:px-8 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm whitespace-nowrap ${activeTab === 'urban' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                Urban
              </button>
              <button 
                onClick={() => setActiveTab('abstract')}
                className={`px-4 md:px-8 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm whitespace-nowrap ${activeTab === 'abstract' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                Abstract
              </button>
              <button 
                onClick={() => setActiveTab('portrait')}
                className={`px-4 md:px-8 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm whitespace-nowrap ${activeTab === 'portrait' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                Portrait
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages[activeTab as keyof typeof galleryImages].map((image, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/20">
                  <div className="w-full h-80">
                    <img 
                      alt={image.alt}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      src={image.src}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-sm font-medium mb-4">{image.alt}</p>
                      <button className="w-full bg-cyan-500 text-white text-sm font-bold py-3 rounded-lg hover:bg-cyan-600 transition-colors whitespace-nowrap">
                        Use This
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">ARTISTIC STYLES</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Explore <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Styles</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">Choose from our curated collection of artistic styles</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { src: 'https://public.readdy.ai/ai/img_res/5c743d2b29e944f9cd689258e7ab92d3.jpg', name: 'Sketch' },
              { src: 'https://static.readdy.ai/image/dde33ddc58c1763275b70dd673b7720c/8af728a9b5c65b4037b1b06467630087.jpeg', name: 'Dramatic' },
              { src: 'https://static.readdy.ai/image/dde33ddc58c1763275b70dd673b7720c/b0e33dcfe8c88eb46b00bccd8f0cd565.jpeg', name: 'Anime' },
              { src: 'https://readdy.ai/api/search-image?query=modern%203D%20rendered%20character%20with%20smooth%20surfaces%20clean%20geometry%20professional%20CGI%20quality%20realistic%20lighting%20and%20shadows%20contemporary%20digital%20art%20style%20simple%20neutral%20background&width=400&height=500&seq=style-3d-002&orientation=portrait', name: '3D Render' },
              { src: 'https://static.readdy.ai/image/dde33ddc58c1763275b70dd673b7720c/76e3bac2d5e907a7bc179f24cf4d999b.jpeg', name: 'Watercolor' },
              { src: 'https://readdy.ai/api/search-image?query=classical%20oil%20painting%20style%20portrait%20with%20rich%20textures%20visible%20brush%20strokes%20warm%20color%20palette%20traditional%20art%20technique%20renaissance%20inspired%20artistic%20composition%20simple%20background&width=400&height=500&seq=style-oil-002&orientation=portrait', name: 'Oil Painting' },
              { src: 'https://readdy.ai/api/search-image?query=vibrant%20pop%20art%20style%20portrait%20with%20bold%20colors%20halftone%20dots%20comic%20book%20aesthetic%20andy%20warhol%20inspired%20bright%20contrasting%20colors%20retro%20graphic%20design%20simple%20background&width=400&height=500&seq=style-popart-001&orientation=portrait', name: 'Pop Art' },
              { src: 'https://readdy.ai/api/search-image?query=minimalist%20clean%20design%20with%20simple%20shapes%20limited%20color%20palette%20modern%20aesthetic%20geometric%20forms%20negative%20space%20contemporary%20art%20style%20pure%20white%20background&width=400&height=500&seq=style-minimal-001&orientation=portrait', name: 'Minimalist' },
              { src: 'https://readdy.ai/api/search-image?query=cyberpunk%20style%20character%20with%20neon%20lights%20futuristic%20tech%20elements%20glowing%20cyan%20and%20purple%20colors%20dystopian%20aesthetic%20high%20tech%20implants%20urban%20sci-fi%20atmosphere%20simple%20dark%20background&width=400&height=500&seq=style-cyber-002&orientation=portrait', name: 'Cyberpunk' },
              { src: 'https://readdy.ai/api/search-image?query=epic%20fantasy%20art%20style%20with%20magical%20elements%20ethereal%20lighting%20mystical%20atmosphere%20detailed%20fantasy%20character%20design%20enchanted%20mood%20dramatic%20composition%20simple%20mystical%20background&width=400&height=500&seq=style-fantasy-001&orientation=portrait', name: 'Fantasy' }
            ].map((style, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/20">
                  <div className="w-full h-48 md:h-64">
                    <img 
                      alt={style.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      src={style.src}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-sm md:text-base font-bold text-center">{style.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Possibilities Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">CREATIVE POSSIBILITIES</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Discover <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Possibilities</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">Explore endless creative possibilities with AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { src: 'https://public.readdy.ai/ai/img_res/83189b91545d8d1a7c211e87e38d03d8.jpg', icon: 'ri-gift-line', title: 'Create a holiday card' },
              { src: 'https://readdy.ai/api/search-image?query=professional%20business%20headshot%20portrait%20with%20clean%20corporate%20background%20confident%20expression%20formal%20attire%20studio%20lighting%20high%20quality%20photography%20simple%20neutral%20backdrop&width=600&height=400&seq=discover-headshot-001&orientation=landscape', icon: 'ri-user-line', title: 'Professional headshot' },
              { src: 'https://readdy.ai/api/search-image?query=creative%20music%20album%20cover%20artwork%20with%20artistic%20design%20bold%20typography%20modern%20aesthetic%20eye-catching%20visual%20elements%20contemporary%20style%20simple%20background&width=600&height=400&seq=discover-album-001&orientation=landscape', icon: 'ri-music-line', title: 'Album cover art' },
              { src: 'https://readdy.ai/api/search-image?query=professional%20product%20photography%20with%20clean%20studio%20lighting%20commercial%20quality%20minimalist%20composition%20elegant%20presentation%20white%20background%20high-end%20aesthetic&width=600&height=400&seq=discover-product-001&orientation=landscape', icon: 'ri-shopping-bag-line', title: 'Product photography' },
              { src: 'https://readdy.ai/api/search-image?query=modern%20interior%20design%20visualization%20with%20contemporary%20furniture%20elegant%20decor%20natural%20lighting%20architectural%20rendering%20clean%20aesthetic%20minimalist%20style&width=600&height=400&seq=discover-interior-001&orientation=landscape', icon: 'ri-home-line', title: 'Interior design' },
              { src: 'https://readdy.ai/api/search-image?query=creative%20modern%20logo%20design%20concept%20with%20clean%20geometric%20shapes%20professional%20branding%20minimalist%20aesthetic%20bold%20typography%20simple%20white%20background&width=600&height=400&seq=discover-logo-001&orientation=landscape', icon: 'ri-palette-line', title: 'Logo design' }
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/20 bg-gray-900/50 backdrop-blur-sm p-6 md:p-8">
                  <div className="w-full h-48 md:h-64">
                    <img 
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      src={item.src}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                        <i className={`${item.icon} text-cyan-400 text-xl`}></i>
                      </div>
                      <h3 className="text-white text-base md:text-lg font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">CORE FEATURES</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Experience next-generation<br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">AI image generation</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">Powerful, free, and privacy-focused</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: 'ri-money-dollar-circle-line', title: 'Zero Cost Creation', desc: 'Generate unlimited images with no fees, subscriptions, or hidden costs. Creativity without boundaries.' },
              { icon: 'ri-cpu-line', title: 'Advanced AI Engine', desc: 'Cutting-edge algorithms automatically optimize every image for professional-grade visual quality.' },
              { icon: 'ri-flashlight-line', title: 'Lightning Fast', desc: 'Optimized processing pipeline delivers stunning results in seconds, maximizing your productivity.' },
              { icon: 'ri-shield-check-line', title: 'Privacy First', desc: 'Zero data retention policy. Your prompts and images are processed in real-time and never stored.' },
              { icon: 'ri-palette-line', title: 'Versatile Styles', desc: 'From photorealistic to abstract art, anime to oil paintings - explore endless creative possibilities.' },
              { icon: 'ri-focus-3-line', title: 'Precise Understanding', desc: 'Powerful semantic comprehension accurately interprets your vision to generate perfect results.' }
            ].map((feature, index) => (
              <div key={index} className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl mb-6 group-hover:scale-110 transition-transform border border-cyan-500/30">
                  <i className={`${feature.icon} text-2xl md:text-3xl text-cyan-400`}></i>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase flex items-center justify-center space-x-2">
                <i className="ri-rocket-line text-lg"></i>
                <span>ADVANCED CAPABILITIES</span>
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              AI Image Generation<br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Technology</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">Experience professional-grade capabilities with industry-leading performance</p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-900/50 backdrop-blur-sm rounded-full p-2 border border-gray-800 flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveTechTab('lightning')}
                className={`px-4 md:px-6 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm flex items-center space-x-2 whitespace-nowrap ${activeTechTab === 'lightning' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                <i className="ri-flashlight-line text-base md:text-lg"></i>
                <span>Lightning</span>
              </button>
              <button 
                onClick={() => setActiveTechTab('precise')}
                className={`px-4 md:px-6 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm flex items-center space-x-2 whitespace-nowrap ${activeTechTab === 'precise' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                <i className="ri-focus-3-line text-base md:text-lg"></i>
                <span>Precise</span>
              </button>
              <button 
                onClick={() => setActiveTechTab('versatile')}
                className={`px-4 md:px-6 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm flex items-center space-x-2 whitespace-nowrap ${activeTechTab === 'versatile' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                <i className="ri-palette-line text-base md:text-lg"></i>
                <span>Versatile</span>
              </button>
              <button 
                onClick={() => setActiveTechTab('ultra')}
                className={`px-4 md:px-6 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm flex items-center space-x-2 whitespace-nowrap ${activeTechTab === 'ultra' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                <i className="ri-hd-line text-base md:text-lg"></i>
                <span>Ultra-High</span>
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {activeTechTab === 'lightning' && (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="w-full h-64 md:h-96 lg:h-auto">
                    <img 
                      alt="Lightning Fast"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      src="https://public.readdy.ai/ai/img_res/3969935bb48a5c115038df56407592bf.jpg"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Lightning Fast</h3>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                      Professional-quality image generation in seconds. Perfect for rapid prototyping and creative workflows, delivering stunning visuals at unprecedented speeds.
                    </p>
                    <ul className="space-y-4 mb-8">
                      {[
                        'Generate images in under 5 seconds',
                        'Optimized processing pipeline',
                        'Real-time preview updates',
                        'Batch generation support'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 flex items-center justify-center bg-cyan-500/20 rounded-full border border-cyan-500/30 flex-shrink-0">
                            <i className="ri-check-line text-cyan-400 text-sm"></i>
                          </div>
                          <span className="text-gray-300 text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm md:text-base font-bold px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all whitespace-nowrap cursor-pointer inline-flex items-center space-x-2 self-start">
                      <span>Try Now</span>
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTechTab === 'precise' && (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="w-full h-64 md:h-96 lg:h-auto">
                    <img 
                      alt="Precise Control"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      src="https://readdy.ai/api/search-image?query=professional%20photographer%20adjusting%20camera%20settings%20with%20precision%20detailed%20equipment%20studio%20lighting%20technical%20accuracy%20photography%20workspace%20simple%20background&width=800&height=600&seq=tech-precise-001&orientation=landscape"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Precise Control</h3>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                      Fine-tune every aspect of your images with advanced parameters. From composition to lighting, achieve pixel-perfect results that match your exact vision.
                    </p>
                    <ul className="space-y-4 mb-8">
                      {[
                        'Advanced parameter controls',
                        'Fine-grained style adjustments',
                        'Composition guidance tools',
                        'Color and lighting precision'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 flex items-center justify-center bg-cyan-500/20 rounded-full border border-cyan-500/30 flex-shrink-0">
                            <i className="ri-check-line text-cyan-400 text-sm"></i>
                          </div>
                          <span className="text-gray-300 text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm md:text-base font-bold px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all whitespace-nowrap cursor-pointer inline-flex items-center space-x-2 self-start">
                      <span>Try Now</span>
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTechTab === 'versatile' && (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="w-full h-64 md:h-96 lg:h-auto">
                    <img 
                      alt="Versatile Styles"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      src="https://readdy.ai/api/search-image?query=diverse%20collection%20of%20artistic%20styles%20collage%20multiple%20art%20forms%20painting%20photography%20digital%20art%20illustration%20variety%20creative%20expression%20simple%20background&width=800&height=600&seq=tech-versatile-001&orientation=landscape"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Versatile Styles</h3>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                      From photorealistic to abstract, anime to oil paintings. Explore unlimited creative possibilities with our extensive style library and customization options.
                    </p>
                    <ul className="space-y-4 mb-8">
                      {[
                        '50+ pre-trained style models',
                        'Custom style blending',
                        'Genre-specific optimizations',
                        'Artistic filter combinations'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 flex items-center justify-center bg-cyan-500/20 rounded-full border border-cyan-500/30 flex-shrink-0">
                            <i className="ri-check-line text-cyan-400 text-sm"></i>
                          </div>
                          <span className="text-gray-300 text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm md:text-base font-bold px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all whitespace-nowrap cursor-pointer inline-flex items-center space-x-2 self-start">
                      <span>Try Now</span>
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTechTab === 'ultra' && (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="w-full h-64 md:h-96 lg:h-auto">
                    <img 
                      alt="Ultra-High Quality"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      src="https://readdy.ai/api/search-image?query=ultra%20high%20definition%208K%20resolution%20crystal%20clear%20image%20quality%20professional%20photography%20stunning%20detail%20sharp%20focus%20premium%20quality%20simple%20background&width=800&height=600&seq=tech-ultra-001&orientation=landscape"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Ultra-High Quality</h3>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                      Generate images up to 4K resolution with exceptional detail and clarity. Professional-grade output suitable for print, commercial use, and large-format displays.
                    </p>
                    <ul className="space-y-4 mb-8">
                      {[
                        'Up to 4K resolution output',
                        'Enhanced detail preservation',
                        'Professional color accuracy',
                        'Print-ready quality'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 flex items-center justify-center bg-cyan-500/20 rounded-full border border-cyan-500/30 flex-shrink-0">
                            <i className="ri-check-line text-cyan-400 text-sm"></i>
                          </div>
                          <span className="text-gray-300 text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm md:text-base font-bold px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all whitespace-nowrap cursor-pointer inline-flex items-center space-x-2 self-start">
                      <span>Try Now</span>
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">TRUSTED WORLDWIDE</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Trusted by <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Creators Worldwide</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">Join thousands of creators, designers, and businesses who trust Pixwave AI for their creative needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: 'ri-user-line', number: '100,000+', label: 'Active Users' },
              { icon: 'ri-image-line', number: '5M+', label: 'Images Generated' },
              { icon: 'ri-global-line', number: '150+', label: 'Countries' },
              { icon: 'ri-star-line', number: '4.9/5', label: 'User Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl mb-4">
                  <i className={`${stat.icon} text-2xl md:text-3xl text-cyan-400`}></i>
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">TESTIMONIALS</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              What Users Say About<br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Pixwave AI</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">Don't just take our word for it - hear from thousands of satisfied creators and professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                text: '"Pixwave AI has completely transformed my creative workflow. The quality and speed of image generation is absolutely incredible. I can now bring my ideas to life in minutes instead of hours."',
                avatar: 'https://public.readdy.ai/ai/img_res/2ec5f568df0fb104e2c05b1db63ed50c.jpg',
                name: 'Sarah Chen',
                role: 'Digital Artist'
              },
              {
                text: '"As a marketing professional, I need high-quality visuals fast. Pixwave AI delivers every single time. It\'s become an essential tool for our entire team."',
                avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20african%20american%20man%20business%20executive%20confident%20professional%20modern%20style%20clean%20simple%20background&width=200&height=200&seq=avatar-marcus-001&orientation=squarish',
                name: 'Marcus Johnson',
                role: 'Marketing Director'
              },
              {
                text: '"The variety of styles and customization options is amazing. I can create unique visuals for each client without spending hours on manual design work."',
                avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20hispanic%20woman%20designer%20creative%20professional%20friendly%20smile%20modern%20style%20clean%20simple%20background&width=200&height=200&seq=avatar-emma-001&orientation=squarish',
                name: 'Emma Rodriguez',
                role: 'Freelance Designer'
              },
              {
                text: '"I\'ve tried many AI image generators, but Pixwave AI stands out with its intuitive interface and stunning results. It\'s a game-changer for content creators."',
                avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20caucasian%20man%20content%20creator%20influencer%20casual%20friendly%20modern%20style%20clean%20simple%20background&width=200&height=200&seq=avatar-david-001&orientation=squarish',
                name: 'David Kim',
                role: 'Content Creator'
              },
              {
                text: '"The consistency and quality of images generated by Pixwave AI helps us maintain our brand identity across all marketing materials. Highly recommended!"',
                avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20caucasian%20woman%20business%20strategist%20professional%20confident%20modern%20style%20clean%20simple%20background&width=200&height=200&seq=avatar-lisa-001&orientation=squarish',
                name: 'Lisa Anderson',
                role: 'Brand Strategist'
              },
              {
                text: '"Pixwave AI has become my go-to tool for rapid prototyping and concept visualization. The advanced features give me complete creative control."',
                avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20caucasian%20man%20product%20designer%20tech%20professional%20modern%20style%20clean%20simple%20background&width=200&height=200&seq=avatar-james-001&orientation=squarish',
                name: 'James Wilson',
                role: 'Product Designer'
              }
            ].map((testimonial, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/20 bg-gray-900/30 backdrop-blur-sm p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-base md:text-lg"></i>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6 flex-grow">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover object-top"
                        loading="lazy"
                        src={testimonial.avatar}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white text-sm md:text-base font-bold">{testimonial.name}</h4>
                      <p className="text-cyan-400 text-xs md:text-sm font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">Everything you need to know about Pixwave AI Image Generator</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'What is Pixwave AI Image Generator?',
                answer: 'Pixwave AI is an advanced artificial intelligence-powered image generation platform that transforms text descriptions into stunning visual content. Using cutting-edge machine learning algorithms, it can create photorealistic images, artistic illustrations, and creative designs in seconds.'
              },
              {
                question: 'How does the AI image generation work?',
                answer: 'Our AI uses deep learning models trained on millions of images to understand the relationship between text and visuals. When you provide a prompt, the AI analyzes your description and generates unique images that match your specifications, including style, composition, colors, and lighting.'
              },
              {
                question: 'Is there a free plan available?',
                answer: 'Yes! We offer a generous free plan that includes unlimited image generations with standard quality. You can upgrade to our Pro or Ultra plans for higher resolution outputs, faster processing, advanced features, and commercial usage rights.'
              },
              {
                question: 'Can I use the generated images commercially?',
                answer: 'Free plan users can use generated images for personal projects. Pro and Ultra plan subscribers receive full commercial usage rights for all images created, including the ability to use them in client work, products, marketing materials, and more.'
              },
              {
                question: 'What image formats and resolutions are supported?',
                answer: 'Pixwave AI supports multiple output formats including PNG, JPG, and WebP. Resolution options range from 512x512 pixels on the free plan up to 8K (7680x4320) on the Ultra plan. You can also choose from various aspect ratios like 1:1, 16:9, 9:16, and more.'
              },
              {
                question: 'How long does it take to generate an image?',
                answer: 'Generation time depends on your plan and settings. Standard mode typically takes 10-30 seconds, while Fast Mode (available on Pro and Ultra plans) generates images in 3-8 seconds. Complex prompts or higher resolutions may take slightly longer.'
              },
              {
                question: 'Can I edit or refine generated images?',
                answer: 'Absolutely! Pixwave AI includes powerful editing tools like inpainting (to modify specific areas), outpainting (to extend images), upscaling, background removal, and style transfer. You can iterate on your creations until they\'re perfect.'
              },
              {
                question: 'What makes Pixwave AI different from other generators?',
                answer: 'Pixwave AI stands out with its superior image quality, extensive style library, advanced customization options, intuitive interface, and fast generation speeds. We also offer exceptional customer support and regularly update our models with the latest AI advancements.'
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-800 rounded-2xl overflow-hidden bg-gray-900/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left cursor-pointer group"
                >
                  <h3 className="text-white text-base md:text-lg font-bold pr-8 group-hover:text-cyan-400 transition-colors">{faq.question}</h3>
                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500/10 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <i className="ri-arrow-down-s-line text-cyan-400 text-xl"></i>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-6 md:px-8 pb-5 md:pb-6">
                    <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-32 bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20"></div>
        </div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 md:px-5 md:py-2.5 mb-6 md:mb-8">
            <i className="ri-rocket-line text-white text-sm md:text-base"></i>
            <span className="text-white text-xs md:text-sm font-bold tracking-wide">LIMITED TIME OFFER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-tight px-4">
            Ready to Transform Your<br />Creative Workflow?
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Join over 100,000 creators, designers, and innovators who are already using Pixwave AI to bring their boldest ideas to life.
          </p>

          <div className="mb-10 md:mb-12">
            <a 
              href="/pricing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-white text-purple-600 text-base md:text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              <span>Get Started Now</span>
              <i className="ri-arrow-right-line text-xl"></i>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 md:gap-10 text-white px-4">
            {[
              { icon: 'ri-star-fill', number: '4.9/5', label: 'User Rating', color: 'yellow-300' },
              { icon: 'ri-user-line', number: '100K+', label: 'Active Users', color: 'white' },
              { icon: 'ri-image-line', number: '5M+', label: 'Images Created', color: 'white' }
            ].map((stat, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                  <i className={`${stat.icon} text-${stat.color} text-lg md:text-xl`}></i>
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-bold">{stat.number}</div>
                  <div className="text-xs md:text-sm text-white/80">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
    </>
  );
}
