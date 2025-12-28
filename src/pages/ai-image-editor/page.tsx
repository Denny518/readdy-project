import { useState, useRef } from 'react';
import { SEO, generateWebPageSchema, generateFAQPageSchema } from '../../utils/seo';

export default function AIImageEditorPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileLanguageMenu, setShowMobileLanguageMenu] = useState(false);
  const [showExploreMenu, setShowExploreMenu] = useState(false);
  const [showMobileExploreMenu, setShowMobileExploreMenu] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [quality, setQuality] = useState<'standard' | 'pro' | 'max'>('standard');
  const [showQualityDropdown, setShowQualityDropdown] = useState(false);
  const [showQualityUpgradeModal, setShowQualityUpgradeModal] = useState(false);
  const [selectedPremiumQuality, setSelectedPremiumQuality] = useState<'pro' | 'max'>('pro');
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [userCredits] = useState(5);
  const [activeCategory, setActiveCategory] = useState('styles');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const editorSectionRef = useRef<HTMLElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleImageClick = (src: string) => {
    setUploadedImage(src);
  };

  const getQualityDisplayName = (q: string) => {
    const names = { standard: 'Standard', pro: 'Pro', max: 'Max' };
    return names[q as keyof typeof names] || 'Standard';
  };

  const getQualityCredits = (q: string) => {
    const credits = { standard: 2, pro: 8, max: 24 };
    return credits[q as keyof typeof credits] || 2;
  };

  const handleQualityChange = (newQuality: 'standard' | 'pro' | 'max') => {
    if (newQuality !== 'standard' && userCredits < getQualityCredits(newQuality)) {
      setSelectedPremiumQuality(newQuality);
      setShowQualityUpgradeModal(true);
      setShowQualityDropdown(false);
      return;
    }
    setQuality(newQuality);
    setShowQualityDropdown(false);
  };

  const handleClearPrompt = () => {
    setEditPrompt('');
  };

  const handleRandomPrompt = () => {
    const prompts = [
      'Change to anime style',
      'Add sunset lighting',
      'Remove background',
      'Make it vintage',
      'Enhance colors',
      'Convert to oil painting',
      'Add dramatic shadows',
      'Make it look like a watercolor'
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setEditPrompt(randomPrompt);
  };

  const handleGenerateClick = () => {
    if (!uploadedImage || !editPrompt) return;
    
    if (userCredits < getQualityCredits(quality)) {
      setShowCreditsModal(true);
      return;
    }
    
    // Here you would call your AI API
    console.log('Generating with:', { quality, prompt: editPrompt });
  };

  const scrollToEditor = () => {
    editorSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Edit categories with examples
  const editCategories = {
    styles: {
      title: 'Styles',
      icon: 'ri-palette-line',
      examples: [
        {
          label: 'Anime Style',
          prompt: 'Transform into anime art style',
          beforeImage: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photograph%20of%20young%20woman%20with%20natural%20lighting%20in%20studio%20setting&width=400&height=400&seq=before-anime&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=anime%20style%20portrait%20of%20young%20woman%20with%20large%20expressive%20eyes%20colorful%20hair%20vibrant%20colors%20manga%20aesthetic%20simple%20background&width=400&height=400&seq=after-anime&orientation=squarish'
        },
        {
          label: 'Oil Painting',
          prompt: 'Convert to classical oil painting',
          beforeImage: 'https://readdy.ai/api/search-image?query=beautiful%20landscape%20mountain%20scenery%20with%20clear%20sky%20and%20natural%20colors&width=400&height=400&seq=before-oil&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=oil%20painting%20style%20landscape%20with%20thick%20brush%20strokes%20impressionist%20technique%20rich%20textures%20artistic%20canvas%20simple%20background&width=400&height=400&seq=after-oil&orientation=squarish'
        },
        {
          label: 'Watercolor',
          prompt: 'Apply watercolor painting effect',
          beforeImage: 'https://readdy.ai/api/search-image?query=colorful%20flower%20bouquet%20in%20vase%20natural%20lighting%20photography%20simple%20background&width=400&height=400&seq=before-water&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=watercolor%20painting%20of%20flowers%20soft%20edges%20flowing%20colors%20artistic%20paper%20texture%20delicate%20brushwork%20simple%20background&width=400&height=400&seq=after-water&orientation=squarish'
        }
      ]
    },
    enhance: {
      title: 'Enhance',
      icon: 'ri-contrast-line',
      examples: [
        {
          label: 'Color Enhancement',
          prompt: 'Enhance colors and vibrancy',
          beforeImage: 'https://readdy.ai/api/search-image?query=dull%20faded%20photograph%20of%20sunset%20beach%20scene%20low%20saturation%20muted%20colors%20simple%20background&width=400&height=400&seq=before-color&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=vibrant%20sunset%20beach%20scene%20enhanced%20colors%20rich%20saturation%20vivid%20hues%20professional%20color%20grading%20simple%20background&width=400&height=400&seq=after-color&orientation=squarish'
        },
        {
          label: 'Lighting Fix',
          prompt: 'Improve lighting and exposure',
          beforeImage: 'https://readdy.ai/api/search-image?query=underexposed%20dark%20indoor%20photograph%20poor%20lighting%20shadowy%20details%20simple%20background&width=400&height=400&seq=before-light&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=well%20lit%20indoor%20photograph%20balanced%20exposure%20clear%20details%20professional%20lighting%20simple%20background&width=400&height=400&seq=after-light&orientation=squarish'
        },
        {
          label: 'Sharpness',
          prompt: 'Increase sharpness and clarity',
          beforeImage: 'https://readdy.ai/api/search-image?query=slightly%20blurry%20photograph%20soft%20focus%20lack%20of%20detail%20simple%20background&width=400&height=400&seq=before-sharp&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=crystal%20clear%20sharp%20photograph%20enhanced%20details%20high%20definition%20crisp%20focus%20simple%20background&width=400&height=400&seq=after-sharp&orientation=squarish'
        }
      ]
    },
    background: {
      title: 'Background',
      icon: 'ri-landscape-line',
      examples: [
        {
          label: 'Beach Sunset',
          prompt: 'Change background to beach sunset',
          beforeImage: 'https://readdy.ai/api/search-image?query=portrait%20of%20person%20standing%20indoors%20plain%20wall%20background%20simple%20setting&width=400&height=400&seq=before-beach&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=portrait%20of%20person%20with%20beautiful%20beach%20sunset%20background%20golden%20hour%20lighting%20ocean%20waves%20simple%20background&width=400&height=400&seq=after-beach&orientation=squarish'
        },
        {
          label: 'City Night',
          prompt: 'Replace with city night scene',
          beforeImage: 'https://readdy.ai/api/search-image?query=portrait%20of%20person%20in%20daytime%20outdoor%20setting%20natural%20background%20simple%20background&width=400&height=400&seq=before-city&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=portrait%20with%20city%20night%20lights%20background%20urban%20skyline%20bokeh%20lights%20simple%20background&width=400&height=400&seq=after-city&orientation=squarish'
        },
        {
          label: 'Remove BG',
          prompt: 'Remove background completely',
          beforeImage: 'https://readdy.ai/api/search-image?query=product%20photograph%20with%20cluttered%20background%20distracting%20elements%20simple%20background&width=400&height=400&seq=before-remove&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=product%20photograph%20on%20pure%20white%20background%20clean%20professional%20isolated%20object%20simple%20background&width=400&height=400&seq=after-remove&orientation=squarish'
        }
      ]
    },
    creative: {
      title: 'Creative',
      icon: 'ri-magic-line',
      examples: [
        {
          label: 'Day to Night',
          prompt: 'Transform day scene to night',
          beforeImage: 'https://readdy.ai/api/search-image?query=daytime%20street%20scene%20bright%20sunlight%20blue%20sky%20clear%20weather%20simple%20background&width=400&height=400&seq=before-night&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=nighttime%20street%20scene%20dark%20sky%20street%20lights%20glowing%20windows%20moonlight%20simple%20background&width=400&height=400&seq=after-night&orientation=squarish'
        },
        {
          label: 'Add Rain',
          prompt: 'Add rain and wet surfaces',
          beforeImage: 'https://readdy.ai/api/search-image?query=dry%20city%20street%20scene%20clear%20weather%20sunny%20day%20simple%20background&width=400&height=400&seq=before-rain&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=rainy%20city%20street%20scene%20wet%20reflections%20rain%20drops%20puddles%20moody%20atmosphere%20simple%20background&width=400&height=400&seq=after-rain&orientation=squarish'
        },
        {
          label: 'Vintage Film',
          prompt: 'Apply vintage film look',
          beforeImage: 'https://readdy.ai/api/search-image?query=modern%20digital%20photograph%20clean%20sharp%20contemporary%20look%20simple%20background&width=400&height=400&seq=before-vintage&orientation=squarish',
          afterImage: 'https://readdy.ai/api/search-image?query=vintage%20film%20photograph%20retro%20colors%20grain%20texture%20nostalgic%201970s%20aesthetic%20simple%20background&width=400&height=400&seq=after-vintage&orientation=squarish'
        }
      ]
    }
  };

  const currentCategory = editCategories[activeCategory as keyof typeof editCategories];

  // Explore menu items with images
  const exploreMenuItems = {
    styles: [
      { name: 'Sketch', image: 'https://readdy.ai/api/search-image?query=pencil%20sketch%20drawing%20style%20portrait%20artistic%20black%20and%20white%20line%20art%20hand%20drawn%20illustration%20simple%20background&width=100&height=80&seq=style-sketch-menu&orientation=landscape' },
      { name: 'Dramatic', image: 'https://readdy.ai/api/search-image?query=dramatic%20cinematic%20portrait%20with%20intense%20lighting%20high%20contrast%20moody%20atmosphere%20powerful%20shadows%20theatrical%20composition%20simple%20dark%20background&width=100&height=80&seq=style-dramatic-menu&orientation=landscape' },
      { name: 'Plushie', image: 'https://readdy.ai/api/search-image?query=cute%20plushie%20toy%20style%20soft%20fabric%20texture%20adorable%20kawaii%20character%20stuffed%20animal%20aesthetic%20simple%20background&width=100&height=80&seq=style-plushie-menu&orientation=landscape' },
      { name: 'Doodle', image: 'https://readdy.ai/api/search-image?query=playful%20doodle%20art%20style%20hand%20drawn%20cartoon%20whimsical%20illustration%20colorful%20sketchy%20lines%20fun%20artistic%20simple%20background&width=100&height=80&seq=style-doodle-menu&orientation=landscape' },
      { name: 'Inkwork', image: 'https://readdy.ai/api/search-image?query=traditional%20ink%20drawing%20style%20black%20ink%20brush%20strokes%20calligraphy%20art%20asian%20ink%20painting%20technique%20simple%20background&width=100&height=80&seq=style-inkwork-menu&orientation=landscape' },
      { name: 'Pop Art', image: 'https://readdy.ai/api/search-image?query=vibrant%20pop%20art%20style%20portrait%20bold%20colors%20halftone%20dots%20comic%20book%20aesthetic%20andy%20warhol%20inspired%20bright%20contrasting%20colors%20simple%20background&width=100&height=80&seq=style-popart-menu&orientation=landscape' },
      { name: 'Ornament', image: 'https://readdy.ai/api/search-image?query=decorative%20ornament%20style%20intricate%20patterns%20detailed%20embellishments%20elegant%20design%20ornate%20artistic%20elements%20simple%20background&width=100&height=80&seq=style-ornament-menu&orientation=landscape' },
      { name: 'Sugar Cookie', image: 'https://readdy.ai/api/search-image?query=sugar%20cookie%20style%20sweet%20pastel%20colors%20soft%20rounded%20shapes%20cute%20bakery%20aesthetic%20frosted%20cookie%20design%20simple%20background&width=100&height=80&seq=style-cookie-menu&orientation=landscape' },
      { name: 'Art School', image: 'https://readdy.ai/api/search-image?query=art%20school%20painting%20style%20classical%20technique%20fine%20art%20education%20academic%20drawing%20traditional%20artistic%20method%20simple%20background&width=100&height=80&seq=style-artschool-menu&orientation=landscape' },
      { name: 'Fisheye', image: 'https://readdy.ai/api/search-image?query=fisheye%20lens%20effect%20wide%20angle%20distortion%20curved%20perspective%20spherical%20view%20creative%20photography%20simple%20background&width=100&height=80&seq=style-fisheye-menu&orientation=landscape' },
      { name: '3D Glam Doll', image: 'https://readdy.ai/api/search-image?query=3D%20glam%20doll%20style%20glossy%20smooth%20surfaces%20fashion%20doll%20aesthetic%20glamorous%20makeup%20stylized%20character%20simple%20background&width=100&height=80&seq=style-glamdoll-menu&orientation=landscape' },
      { name: 'Baseball Bobblehead', image: 'https://readdy.ai/api/search-image?query=baseball%20bobblehead%20toy%20style%20oversized%20head%20small%20body%20collectible%20figurine%20sports%20memorabilia%20simple%20background&width=100&height=80&seq=style-bobblehead-menu&orientation=landscape' }
    ],
    ideas: [
      { name: 'What would I look like as a K-Pop star?', image: 'https://readdy.ai/api/search-image?query=kpop%20idol%20style%20portrait%20colorful%20hair%20trendy%20fashion%20korean%20pop%20star%20aesthetic%20stage%20performance%20look%20simple%20background&width=100&height=80&seq=idea-kpop-menu&orientation=landscape' },
      { name: 'Me as The Girl with a Pearl', image: 'https://readdy.ai/api/search-image?query=girl%20with%20pearl%20earring%20painting%20style%20vermeer%20inspired%20classical%20portrait%20dutch%20golden%20age%20art%20masterpiece%20simple%20dark%20background&width=100&height=80&seq=idea-pearl-menu&orientation=landscape' },
      { name: 'Style me', image: 'https://readdy.ai/api/search-image?query=fashion%20styling%20portrait%20trendy%20outfit%20modern%20style%20personal%20styling%20fashion%20makeover%20contemporary%20look%20simple%20background&width=100&height=80&seq=idea-style-menu&orientation=landscape' },
      { name: 'Give us a matching outfit', image: 'https://readdy.ai/api/search-image?query=matching%20couple%20outfits%20coordinated%20fashion%20coordinating%20colors%20couple%20style%20relationship%20goals%20simple%20background&width=100&height=80&seq=idea-matching-menu&orientation=landscape' },
      { name: 'Turn into a keychain', image: 'https://readdy.ai/api/search-image?query=cute%20keychain%20charm%20style%20miniature%20accessory%20kawaii%20design%20small%20collectible%20portable%20decoration%20simple%20background&width=100&height=80&seq=idea-keychain-menu&orientation=landscape' }
    ],
    transform: [
      { name: 'Create a holiday card', image: 'https://readdy.ai/api/search-image?query=festive%20holiday%20greeting%20card%20design%20seasonal%20celebration%20decorative%20border%20warm%20wishes%20christmas%20card%20style%20simple%20background&width=100&height=80&seq=transform-holiday-menu&orientation=landscape' },
      { name: 'Holiday portrait', image: 'https://readdy.ai/api/search-image?query=holiday%20portrait%20photography%20festive%20background%20seasonal%20decorations%20christmas%20theme%20family%20photo%20warm%20lighting%20simple%20background&width=100&height=80&seq=transform-portrait-menu&orientation=landscape' },
      { name: 'Create an album cover', image: 'https://readdy.ai/api/search-image?query=music%20album%20cover%20artwork%20artistic%20design%20bold%20typography%20modern%20aesthetic%20eye-catching%20visual%20elements%20simple%20background&width=100&height=80&seq=transform-album-menu&orientation=landscape' },
      { name: 'Create a professional product photo', image: 'https://readdy.ai/api/search-image?query=professional%20product%20photography%20clean%20studio%20lighting%20commercial%20quality%20minimalist%20composition%20elegant%20presentation%20white%20background%20simple%20background&width=100&height=80&seq=transform-product-menu&orientation=landscape' },
      { name: 'Create a professional job photo', image: 'https://readdy.ai/api/search-image?query=professional%20business%20headshot%20corporate%20portrait%20confident%20expression%20formal%20attire%20studio%20lighting%20high%20quality%20simple%20background&width=100&height=80&seq=transform-job-menu&orientation=landscape' },
      { name: 'Redecorate my room', image: 'https://readdy.ai/api/search-image?query=interior%20design%20room%20makeover%20modern%20furniture%20elegant%20decor%20natural%20lighting%20architectural%20rendering%20clean%20aesthetic%20simple%20background&width=100&height=80&seq=transform-room-menu&orientation=landscape' }
    ],
    fixEnhance: [
      { name: 'Remove people in the background', image: 'https://readdy.ai/api/search-image?query=photo%20editing%20remove%20background%20people%20clean%20background%20object%20removal%20before%20and%20after%20comparison%20simple%20background&width=100&height=80&seq=fix-removepeople-menu&orientation=landscape' },
      { name: 'Remove background', image: 'https://readdy.ai/api/search-image?query=background%20removal%20transparent%20background%20cutout%20image%20isolated%20subject%20clean%20extraction%20white%20background%20simple%20background&width=100&height=80&seq=fix-removebg-menu&orientation=landscape' },
      { name: 'Restore an old photo', image: 'https://readdy.ai/api/search-image?query=photo%20restoration%20vintage%20photo%20repair%20old%20photograph%20enhancement%20damaged%20photo%20fix%20before%20and%20after%20restoration%20simple%20background&width=100&height=80&seq=fix-restore-menu&orientation=landscape' }
    ]
  };

  const faqs = [
    {
      question: 'How does the AI photo editor work?',
      answer: 'Simply upload your image and describe the changes you want to make in plain English. Our advanced AI understands your instructions and applies professional edits automatically. No design experience needed!'
    },
    {
      question: 'What types of edits can I make?',
      answer: 'You can transform styles (anime, oil painting, watercolor), enhance quality (lighting, colors, sharpness), change backgrounds, apply creative effects (day to night, weather changes), and much more. The possibilities are endless!'
    },
    {
      question: 'Is my data safe and private?',
      answer: 'Absolutely! We take privacy seriously. All uploaded images and generated results are automatically deleted after processing. We never store, analyze, or use your images for any purpose.'
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support JPG and PNG formats up to 20MB in size. The output is delivered in high-quality format suitable for both digital and print use.'
    },
    {
      question: 'How does the credit system work?',
      answer: 'Free users receive 10 credits daily for casual editing. Premium plans offer 2,000-5,000 monthly credits for regular users and professionals. Each edit costs 2-24 credits depending on quality mode.'
    },
    {
      question: 'Can I use edited images commercially?',
      answer: 'Yes! All images you create with our AI editor are yours to use however you like, including commercial purposes. You retain full rights to your edited images.'
    }
  ];

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  const pageUrl = `${siteUrl}/ai-image-editor`;

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebPageSchema(
        'AI Photo Editor - Transform Images with Simple Words | Pixwave AI',
        'Professional AI-powered photo editing at your fingertips. Transform images with simple text descriptions. No design skills needed.',
        pageUrl
      ),
      generateFAQPageSchema(faqs)
    ]
  };

  return (
    <>
      <SEO
        title="AI Photo Editor - Transform Images with Simple Words | Pixwave AI"
        description="Professional AI-powered photo editing at your fingertips. Transform images with simple text descriptions. No design skills needed - just describe what you want and watch the magic happen."
        keywords="AI photo editor,image editing,AI image transformation,photo enhancement,background removal,style transfer,AI editing tool"
        canonical={pageUrl}
        schema={combinedSchema}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
          <div className="container mx-auto px-4 md:px-6 py-4 md:py-5">
            <nav className="flex items-center justify-between">
              <a className="flex items-center gap-2 md:gap-3 group cursor-pointer" href="/">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110">
                  <i className="ri-magic-line text-lg md:text-xl text-white"></i>
                </div>
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Pixwave AI</span>
              </a>

              <div className="hidden lg:flex items-center gap-4">
                <a className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap" href="/ai-image-editor">
                  AI Photo Editor
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                
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

                <a className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap" href="/">
                  Blog
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap" href="/pricing">
                  Pricing
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
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
                  <a className="text-sm text-gray-300 hover:text-cyan-400 transition-colors py-2" href="/ai-image-editor" onClick={() => setShowMobileMenu(false)}>
                    AI Photo Editor
                  </a>

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

                  <a className="text-sm text-gray-300 hover:text-cyan-400 transition-colors py-2" href="/" onClick={() => setShowMobileMenu(false)}>
                    Blog
                  </a>
                  <a className="text-sm text-gray-300 hover:text-cyan-400 transition-colors py-2" href="/pricing" onClick={() => setShowMobileMenu(false)}>
                    Pricing
                  </a>
                  
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
        <section ref={editorSectionRef} className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12 md:mb-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-sm font-medium text-cyan-300">Powered by Advanced AI Technology</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Transform Images</span>
                <br />
                <span className="text-white">With Simple Words</span>
              </h1>

              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Professional AI-powered photo editing at your fingertips. No design skills needed - just describe what you want and watch the magic happen.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/30">
                  <i className="ri-check-line text-cyan-400"></i>
                  <span className="text-sm text-gray-300">Instant Results</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/30">
                  <i className="ri-check-line text-cyan-400"></i>
                  <span className="text-sm text-gray-300">High Quality Output</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/30">
                  <i className="ri-check-line text-cyan-400"></i>
                  <span className="text-sm text-gray-300">Privacy Protected</span>
                </div>
              </div>
            </div>

            {/* Editor Interface */}
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left: Upload Area */}
                  <div className="p-8 md:p-10 border-r border-cyan-500/20 min-w-0">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">Upload Your Image</h3>
                      <p className="text-sm text-gray-400">Start by selecting an image to edit</p>
                    </div>

                    <div className="relative mb-6">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        id="file-input"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="file-input" className="block cursor-pointer group">
                        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 bg-slate-800/30 hover:bg-cyan-500/5 transition-all duration-300 p-12">
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-4 group-hover:scale-110 transition-transform">
                              <i className="ri-upload-cloud-2-line text-3xl text-white"></i>
                            </div>
                            <p className="text-lg font-semibold text-white mb-2">Drop your image here</p>
                            <p className="text-sm text-gray-400">or click to browse</p>
                            <p className="text-xs text-gray-500 mt-3">Supports JPG, PNG up to 20MB</p>
                          </div>
                        </div>
                      </label>
                    </div>

                    {uploadedImage && (
                      <div className="rounded-xl overflow-hidden border border-cyan-500/30 mb-6">
                        <img src={uploadedImage} alt="Uploaded" className="w-full h-48 object-cover" />
                      </div>
                    )}

                    <div className="space-y-3">
                      <p className="text-xs text-gray-400 font-medium">Quick Start Examples:</p>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          'https://readdy.ai/api/search-image?query=professional%20portrait%20photograph%20of%20young%20woman%20with%20natural%20lighting%20in%20studio%20setting&width=200&height=200&seq=sample1&orientation=squarish',
                          'https://readdy.ai/api/search-image?query=beautiful%20landscape%20mountain%20scenery%20with%20clear%20sky%20and%20natural%20colors&width=200&height=200&seq=sample2&orientation=squarish',
                          'https://readdy.ai/api/search-image?query=cute%20golden%20retriever%20puppy%20sitting%20on%20grass%20in%20outdoor%20setting&width=200&height=200&seq=sample3&orientation=squarish',
                          'https://readdy.ai/api/search-image?query=modern%20minimalist%20interior%20design%20room%20with%20furniture%20and%20natural%20light&width=200&height=200&seq=sample4&orientation=squarish'
                        ].map((src, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSampleImageClick(src)}
                            className="aspect-square rounded-lg overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-500 transition-all hover:scale-105 cursor-pointer"
                          >
                            <img alt={`Sample ${index + 1}`} className="w-full h-full object-cover" src={src} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Edit Controls */}
                  <div className="p-8 md:p-10 bg-slate-800/30 min-w-0 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">Describe Your Edit</h3>
                      <p className="text-sm text-gray-400">Tell AI what changes you want to make</p>
                    </div>

                    <div className="mb-6 flex-shrink-0">
                      <textarea
                        value={editPrompt}
                        onChange={(e) => setEditPrompt(e.target.value)}
                        placeholder="E.g., Change background to sunset beach, make it look like an oil painting, add dramatic lighting..."
                        className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none text-sm"
                        maxLength={500}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{editPrompt.length}/500 characters</span>
                      </div>
                    </div>

                    {/* Quality Selection - Dropdown */}
                    <div className="mb-6 quality-dropdown-container relative flex-shrink-0">
                      <label className="block text-sm font-medium text-gray-400 mb-3">Quality</label>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowQualityDropdown(!showQualityDropdown);
                        }}
                        className="w-full p-4 rounded-xl border-2 border-cyan-500/30 bg-slate-900/50 hover:border-cyan-500/50 transition-all text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-semibold">{getQualityDisplayName(quality)}</span>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                              <i className="ri-flashlight-line"></i>
                              {getQualityCredits(quality)}
                            </span>
                          </div>
                          {quality === 'standard' && (
                            <i className="ri-check-line text-cyan-400 text-xl"></i>
                          )}
                        </div>
                      </button>

                      {/* Dropdown Menu */}
                      {showQualityDropdown && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-50">
                          {/* Standard Quality */}
                          <button
                            type="button"
                            onClick={() => handleQualityChange('standard')}
                            className={`w-full p-4 transition-all text-left hover:bg-slate-800/50 ${
                              quality === 'standard' ? 'bg-cyan-500/10' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-semibold">Standard</span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                                  <i className="ri-flashlight-line"></i>
                                  {getQualityCredits('standard')}
                                </span>
                              </div>
                              {quality === 'standard' && (
                                <i className="ri-check-line text-cyan-400 text-xl"></i>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">Quick validation, basic editing</p>
                          </button>

                          {/* Pro Quality */}
                          <button
                            type="button"
                            onClick={() => handleQualityChange('pro')}
                            className={`w-full p-4 transition-all text-left hover:bg-slate-800/50 border-t border-cyan-500/10 ${
                              quality === 'pro' ? 'bg-purple-500/10' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-semibold">Pro</span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                                  <i className="ri-flashlight-line"></i>
                                  {getQualityCredits('pro')}
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">
                                  VIP
                                </span>
                              </div>
                              {quality === 'pro' && (
                                <i className="ri-check-line text-purple-400 text-xl"></i>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">Ideal for most scenarios, precise editing</p>
                          </button>

                          {/* Max Quality */}
                          <button
                            type="button"
                            onClick={() => handleQualityChange('max')}
                            className={`w-full p-4 transition-all text-left hover:bg-slate-800/50 border-t border-cyan-500/10 ${
                              quality === 'max' ? 'bg-pink-500/10' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-semibold">Max</span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold">
                                  <i className="ri-flashlight-line"></i>
                                  {getQualityCredits('max')}
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">
                                  VIP
                                </span>
                              </div>
                              {quality === 'max' && (
                                <i className="ri-check-line text-pink-400 text-xl"></i>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">Ultimate quality, perfect details</p>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Clear and Random Buttons */}
                    <div className="flex gap-3 mb-6 flex-shrink-0">
                      <button 
                        onClick={handleClearPrompt}
                        className="flex-1 bg-slate-800/50 border border-slate-700 text-gray-300 hover:text-white hover:border-slate-600 font-medium py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
                      >
                        Clear
                      </button>
                      <button 
                        onClick={handleRandomPrompt}
                        className="flex-1 bg-slate-800/50 border border-slate-700 text-gray-300 hover:text-white hover:border-slate-600 font-medium py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
                      >
                        Random
                      </button>
                    </div>

                    {/* Generate Button */}
                    <button 
                      onClick={handleGenerateClick}
                      disabled={!uploadedImage || !editPrompt}
                      className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row items-center justify-center sm:justify-between px-6 gap-2 whitespace-nowrap flex-shrink-0 ${
                        uploadedImage && editPrompt
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50'
                          : 'bg-gray-700 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <i className="ri-magic-line text-xl"></i>
                        <span>Generate Edited Image</span>
                      </span>
                      {uploadedImage && editPrompt && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold">
                          <i className="ri-flashlight-line text-base"></i>
                          <span>{getQualityCredits(quality)} Credits</span>
                        </span>
                      )}
                    </button>

                    <div className="space-y-3 mt-6 flex-shrink-0">
                      <p className="text-xs text-gray-400 font-medium">Popular Prompts:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Change to anime style',
                          'Add sunset lighting',
                          'Remove background',
                          'Make it vintage',
                          'Enhance colors'
                        ].map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => setEditPrompt(prompt)}
                            className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 hover:border-cyan-500/50 transition-all cursor-pointer whitespace-nowrap"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Upgrade Modal */}
        {showQualityUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-lg w-full p-6 md:p-8 relative">
              <button 
                onClick={() => setShowQualityUpgradeModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <i className="ri-close-line text-white text-xl"></i>
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="ri-vip-crown-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-white">Unlock {getQualityDisplayName(selectedPremiumQuality)} Quality</h3>
              </div>

              <p className="text-gray-300 text-base mb-6 leading-relaxed">
                Upgrade to access {getQualityDisplayName(selectedPremiumQuality)} quality editing with enhanced precision and professional results.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
                <div className="space-y-3">
                  {selectedPremiumQuality === 'pro' ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <i className="ri-hd-line text-cyan-400 text-base"></i>
                        </div>
                        <span className="text-gray-300 text-sm">Higher resolution output</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <i className="ri-star-line text-cyan-400 text-base"></i>
                        </div>
                        <span className="text-gray-300 text-sm">Enhanced image quality</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <i className="ri-flashlight-line text-cyan-400 text-base"></i>
                        </div>
                        <span className="text-gray-300 text-sm">Priority processing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <i className="ri-focus-3-line text-cyan-400 text-base"></i>
                        </div>
                        <span className="text-gray-300 text-sm">More accurate results</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <i className="ri-hd-line text-cyan-400 text-base"></i>
                        </div>
                        <span className="text-gray-300 text-sm">Maximum resolution output</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <i className="ri-star-line text-cyan-400 text-base"></i>
                        </div>
                        <span className="text-gray-300 text-sm">Best image quality</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <i className="ri-flashlight-line text-cyan-400 text-base"></i>
                        </div>
                        <span className="text-gray-300 text-sm">Fastest processing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <i className="ri-focus-3-line text-cyan-400 text-base"></i>
                        </div>
                        <span className="text-gray-300 text-sm">Ultra-precise transformations</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Uses per edit:</span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold">
                    <i className="ri-flashlight-line"></i>
                    {getQualityCredits(selectedPremiumQuality)} credits
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Free: 10 credits/day</span>
                  <span className="text-cyan-400">resets in 8h</span>
                </div>
              </div>

              <p className="text-white font-semibold text-sm mb-4">Upgrade for instant access:</p>

              <div className="space-y-3 mb-6">
                {/* Premium Plan */}
                <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="ri-vip-crown-line text-purple-400 text-xl"></i>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-bold">Premium</span>
                          <span className="text-purple-400 font-bold text-lg">2,000/mo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                          <span className="text-xs text-gray-400">No watermark</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-xs text-gray-400">From</div>
                        <div className="text-white font-bold">$20/mo</div>
                      </div>
                      <i className="ri-arrow-right-line text-purple-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </div>

                {/* Ultimate Plan */}
                <div className="bg-gradient-to-r from-pink-500/20 to-orange-600/20 border border-pink-500/30 rounded-xl p-4 hover:border-pink-500/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="ri-vip-diamond-line text-pink-400 text-xl"></i>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-bold">Ultimate</span>
                          <span className="text-pink-400 font-bold text-lg">5,000/mo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                          <span className="text-xs text-gray-400">No watermark</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-xs text-gray-400">From</div>
                        <div className="text-white font-bold">$40/mo</div>
                      </div>
                      <i className="ri-arrow-right-line text-pink-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowQualityUpgradeModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
                >
                  Maybe Later
                </button>
                <button 
                  onClick={() => {
                    setShowQualityUpgradeModal(false);
                    // Here you would redirect to upgrade page
                  }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 whitespace-nowrap"
                >
                  View All Plans
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Credits Shortage Modal */}
        {showCreditsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-lg w-full p-6 md:p-8 relative">
              <button 
                onClick={() => setShowCreditsModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <i className="ri-close-line text-white text-xl"></i>
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 mb-4">
                  <i className="ri-flashlight-line text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Insufficient Credits</h3>
                <p className="text-gray-400 text-sm">You need {getQualityCredits(quality)} credits to use AI Image Editor</p>
              </div>

              {/* Credits Status */}
              <div className="bg-slate-800/50 rounded-2xl p-6 mb-4 border border-cyan-500/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Current</div>
                    <div className="text-2xl font-bold text-red-400">{userCredits}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Required</div>
                    <div className="text-2xl font-bold text-cyan-400">{getQualityCredits(quality)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Need</div>
                    <div className="text-2xl font-bold text-orange-400">{getQualityCredits(quality) - userCredits}</div>
                  </div>
                </div>
              </div>

              {/* Free Plan Info */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-300 font-semibold text-sm">Free Daily Credits</span>
                  <span className="text-cyan-400 font-bold">10 credits/day</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <i className="ri-time-line"></i>
                  <span>resets in <span className="text-cyan-400 font-semibold">8 hours</span></span>
                </div>
              </div>

              {/* Upgrade Options */}
              <p className="text-white font-semibold text-sm mb-4">Upgrade for instant access:</p>
              
              <div className="space-y-3 mb-6">
                {/* Premium Plan */}
                <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 hover:border-purple-500/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="ri-vip-crown-line text-purple-400 text-xl"></i>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-bold">Premium</span>
                          <span className="text-purple-400 font-bold text-lg">2,000/mo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                          <span className="text-xs text-gray-400">No watermark</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-xs text-gray-400">From</div>
                        <div className="text-white font-bold">$20/mo</div>
                      </div>
                      <i className="ri-arrow-right-line text-purple-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </div>

                {/* Ultimate Plan */}
                <div className="bg-gradient-to-r from-pink-500/20 to-orange-600/20 border border-pink-500/30 rounded-xl p-4 hover:border-pink-500/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="ri-vip-diamond-line text-pink-400 text-xl"></i>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-bold">Ultimate</span>
                          <span className="text-pink-400 font-bold text-lg">5,000/mo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                          <span className="text-xs text-gray-400">No watermark</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-xs text-gray-400">From</div>
                        <div className="text-white font-bold">$40/mo</div>
                      </div>
                      <i className="ri-arrow-right-line text-pink-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCreditsModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
                >
                  Maybe Later
                </button>
                <button 
                  onClick={() => {
                    setShowCreditsModal(false);
                    // 跳转到定价页面
                  }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 whitespace-nowrap"
                >
                  View All Plans
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Examples Gallery - 全新分类展示 */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-transparent to-slate-950/50 relative">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Endless Creative <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Possibilities</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Explore different editing categories and see what our AI can do for your images
              </p>
            </div>

            {/* Category Tabs - 移动端优化 */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex flex-wrap justify-center gap-3 p-2 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/30">
                {Object.keys(editCategories).map((key) => {
                  const category = editCategories[key as keyof typeof editCategories];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveCategory(key)}
                      className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                        activeCategory === key
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <i className={`${category.icon} text-lg`}></i>
                      <span className="text-sm md:text-base">{category.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Examples Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {currentCategory.examples.map((example, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                    {/* Before/After Comparison */}
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative aspect-square overflow-hidden">
                        <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm">
                          <span className="text-xs font-bold text-white">Before</span>
                        </div>
                        <img 
                          src={example.beforeImage} 
                          alt={`${example.label} - Before`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative aspect-square overflow-hidden">
                        <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">
                          <span className="text-xs font-bold text-white">After</span>
                        </div>
                        <img 
                          src={example.afterImage} 
                          alt={`${example.label} - After`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white font-semibold mb-2">{example.label}</p>
                        <p className="text-sm text-gray-300">{example.prompt}</p>
                      </div>
                    </div>
                    
                    {/* Label Badge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                      <span className="text-xs font-medium text-white">{example.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - 全新设计 */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Why Choose Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">AI Editor</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Cutting-edge technology meets user-friendly design
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'ri-flashlight-line',
                  title: 'Lightning Fast',
                  description: 'Get your edited images in seconds, not minutes. Our optimized AI processes images at incredible speed.'
                },
                {
                  icon: 'ri-hd-line',
                  title: 'Premium Quality',
                  description: 'High-resolution output that maintains image quality. Perfect for both personal and professional use.'
                },
                {
                  icon: 'ri-shield-check-line',
                  title: 'Privacy First',
                  description: 'Your images are never stored on our servers. Complete privacy and security guaranteed.'
                },
                {
                  icon: 'ri-palette-line',
                  title: 'Unlimited Styles',
                  description: 'From realistic to artistic, anime to vintage - explore countless creative styles and effects.'
                },
                {
                  icon: 'ri-user-smile-line',
                  title: 'Easy to Use',
                  description: 'No technical skills required. Just upload, describe, and get amazing results instantly.'
                },
                {
                  icon: 'ri-vip-crown-line',
                  title: 'Flexible Plans',
                  description: 'Free daily credits for casual users. Affordable premium plans for power users and professionals.'
                }
              ].map((feature, index) => (
                <div key={index} className="group p-8 rounded-2xl bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className={`${feature.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - 全新内容 */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950/50 to-transparent relative">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Common <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-lg text-gray-400">Everything you need to know about our AI photo editor</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-2xl overflow-hidden bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left cursor-pointer group"
                  >
                    <h3 className="text-white text-base md:text-lg font-bold pr-8 group-hover:text-cyan-400 transition-colors">{faq.question}</h3>
                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500/10 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                      <i className="ri-arrow-down-s-line text-cyan-400 text-xl"></i>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-6 md:px-8 pb-6">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-10">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                  Ready to Transform Your Images?
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of creators using AI to bring their creative visions to life
                </p>
                <button 
                  onClick={scrollToEditor}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Start Editing for Free
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </button>
              </div>
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
