import { useState, useRef } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { SEO, generateWebPageSchema, generateFAQPageSchema } from '../../utils/seo';

export default function AISketchGeneratorPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [sketchStyle, setSketchStyle] = useState<'pencil' | 'charcoal' | 'ink'>('pencil');
  const [intensity, setIntensity] = useState(50);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [userCredits] = useState(5);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [publicVisibility, setPublicVisibility] = useState(true);
  const [copyProtection, setCopyProtection] = useState(false);
  const [showPublicTooltip, setShowPublicTooltip] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  
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

  const getStyleDisplayName = (style: string) => {
    const names = { pencil: 'Pencil Sketch', charcoal: 'Charcoal Drawing', ink: 'Ink Sketch' };
    return names[style as keyof typeof names] || 'Pencil Sketch';
  };

  const getStyleCredits = (style: string) => {
    const credits = { pencil: 2, charcoal: 3, ink: 3 };
    return credits[style as keyof typeof credits] || 2;
  };

  const handleStyleChange = (newStyle: 'pencil' | 'charcoal' | 'ink') => {
    if (userCredits < getStyleCredits(newStyle)) {
      setShowCreditsModal(true);
      setShowStyleDropdown(false);
      return;
    }
    setSketchStyle(newStyle);
    setShowStyleDropdown(false);
  };

  const handleGenerateClick = () => {
    if (!uploadedImage) return;
    
    if (userCredits < getStyleCredits(sketchStyle)) {
      setShowCreditsModal(true);
      return;
    }
    
    console.log('Generating sketch with:', { style: sketchStyle, intensity });
  };

  const handlePremiumFeatureClick = () => {
    window.REACT_APP_NAVIGATE('/pricing');
  };

  const scrollToEditor = () => {
    editorSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const sketchExamples = [
    {
      title: 'Portrait Sketch',
      before: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photograph%20of%20young%20woman%20with%20natural%20lighting%20clear%20facial%20features%20detailed%20face%20studio%20setting%20simple%20background&width=400&height=400&seq=sketch-portrait-before&orientation=squarish',
      after: 'https://readdy.ai/api/search-image?query=pencil%20sketch%20drawing%20of%20woman%20portrait%20artistic%20black%20and%20white%20line%20art%20hand%20drawn%20illustration%20detailed%20shading%20simple%20background&width=400&height=400&seq=sketch-portrait-after&orientation=squarish',
      description: 'Transform portraits into artistic pencil sketches'
    },
    {
      title: 'Landscape Sketch',
      before: 'https://readdy.ai/api/search-image?query=beautiful%20mountain%20landscape%20scenery%20with%20trees%20and%20lake%20natural%20colors%20photography%20simple%20background&width=400&height=400&seq=sketch-landscape-before&orientation=squarish',
      after: 'https://readdy.ai/api/search-image?query=pencil%20sketch%20drawing%20of%20mountain%20landscape%20artistic%20line%20art%20hand%20drawn%20nature%20scene%20detailed%20shading%20simple%20background&width=400&height=400&seq=sketch-landscape-after&orientation=squarish',
      description: 'Convert landscapes into beautiful sketch art'
    },
    {
      title: 'Pet Sketch',
      before: 'https://readdy.ai/api/search-image?query=cute%20golden%20retriever%20dog%20portrait%20photograph%20clear%20details%20natural%20lighting%20simple%20background&width=400&height=400&seq=sketch-pet-before&orientation=squarish',
      after: 'https://readdy.ai/api/search-image?query=pencil%20sketch%20drawing%20of%20golden%20retriever%20dog%20artistic%20line%20art%20hand%20drawn%20pet%20portrait%20detailed%20fur%20texture%20simple%20background&width=400&height=400&seq=sketch-pet-after&orientation=squarish',
      description: 'Create artistic sketches of your beloved pets'
    },
    {
      title: 'Architecture Sketch',
      before: 'https://readdy.ai/api/search-image?query=modern%20building%20architecture%20photograph%20clear%20structure%20urban%20scene%20simple%20background&width=400&height=400&seq=sketch-arch-before&orientation=squarish',
      after: 'https://readdy.ai/api/search-image?query=pencil%20sketch%20drawing%20of%20building%20architecture%20artistic%20line%20art%20hand%20drawn%20architectural%20illustration%20detailed%20structure%20simple%20background&width=400&height=400&seq=sketch-arch-after&orientation=squarish',
      description: 'Turn architectural photos into professional sketches'
    }
  ];

  const faqs = [
    {
      question: 'What is an AI Sketch Generator?',
      answer: 'An AI Sketch Generator is an advanced tool that uses artificial intelligence to transform your photos into realistic hand-drawn sketches. It analyzes the image structure, edges, and details to create authentic-looking pencil, charcoal, or ink sketches automatically.'
    },
    {
      question: 'What sketch styles are available?',
      answer: 'We offer three main sketch styles: Pencil Sketch (classic graphite look with soft shading), Charcoal Drawing (bold, dramatic strokes with rich blacks), and Ink Sketch (clean, precise lines with minimal shading). Each style creates a unique artistic effect.'
    },
    {
      question: 'How do I adjust the sketch intensity?',
      answer: 'Use the intensity slider to control how detailed and dark your sketch appears. Lower values create lighter, more subtle sketches, while higher values produce darker, more dramatic results with stronger contrast and detail.'
    },
    {
      question: 'What types of images work best?',
      answer: 'Images with clear subjects and good contrast work best. Portraits, landscapes, pets, and architecture are ideal. Avoid overly busy or low-resolution images. Well-lit photos with distinct edges and details produce the most impressive sketch results.'
    },
    {
      question: 'Can I use the sketches commercially?',
      answer: 'Yes! All sketches you create are yours to use however you like, including commercial purposes. You retain full rights to your generated artwork and can use them for prints, social media, websites, or any other projects.'
    },
    {
      question: 'How long does it take to generate a sketch?',
      answer: 'Most sketches are generated in just 3-5 seconds. The processing time may vary slightly depending on image size and complexity, but our optimized AI ensures fast results without compromising quality.'
    }
  ];

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  const pageUrl = `${siteUrl}/ai-sketch-generator`;

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebPageSchema(
        'AI Sketch Generator - Transform Photos into Artistic Sketches | Pixwave AI',
        'Convert your photos into stunning hand-drawn sketches instantly. Choose from pencil, charcoal, or ink styles. Free AI-powered sketch generator.',
        pageUrl
      ),
      generateFAQPageSchema(faqs)
    ]
  };

  return (
    <>
      <SEO
        title="AI Sketch Generator - Transform Photos into Artistic Sketches | Pixwave AI"
        description="Convert your photos into stunning hand-drawn sketches instantly with our AI sketch generator. Choose from pencil, charcoal, or ink styles. Free to use, no design skills needed."
        keywords="AI sketch generator,photo to sketch,pencil sketch,charcoal drawing,ink sketch,sketch art,drawing generator,artistic sketch"
        canonical={pageUrl}
        schema={combinedSchema}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Header />

        {/* Hero Section */}
        <section ref={editorSectionRef} className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12 md:mb-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-sm font-medium text-cyan-300">AI-Powered Sketch Art</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Transform Photos</span>
                <br />
                <span className="text-white">Into Artistic Sketches</span>
              </h1>

              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Convert your photos into stunning hand-drawn sketches instantly. Choose from pencil, charcoal, or ink styles - no artistic skills required.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/30">
                  <i className="ri-pencil-line text-cyan-400"></i>
                  <span className="text-sm text-gray-300">Multiple Styles</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/30">
                  <i className="ri-flashlight-line text-cyan-400"></i>
                  <span className="text-sm text-gray-300">Instant Results</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/30">
                  <i className="ri-hd-line text-cyan-400"></i>
                  <span className="text-sm text-gray-300">High Quality</span>
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
                      <h3 className="text-xl font-bold text-white mb-2">Upload Your Photo</h3>
                      <p className="text-sm text-gray-400">Start by selecting an image to convert</p>
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
                            <p className="text-lg font-semibold text-white mb-2">Drop your photo here</p>
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
                          'https://readdy.ai/api/search-image?query=professional%20portrait%20photograph%20of%20young%20woman%20with%20natural%20lighting%20clear%20facial%20features%20simple%20background&width=200&height=200&seq=sketch-sample1&orientation=squarish',
                          'https://readdy.ai/api/search-image?query=beautiful%20landscape%20mountain%20scenery%20with%20clear%20sky%20natural%20colors%20simple%20background&width=200&height=200&seq=sketch-sample2&orientation=squarish',
                          'https://readdy.ai/api/search-image?query=cute%20golden%20retriever%20dog%20portrait%20photograph%20clear%20details%20simple%20background&width=200&height=200&seq=sketch-sample3&orientation=squarish',
                          'https://readdy.ai/api/search-image?query=modern%20building%20architecture%20photograph%20clear%20structure%20simple%20background&width=200&height=200&seq=sketch-sample4&orientation=squarish'
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

                  {/* Right: Style Controls */}
                  <div className="p-8 md:p-10 bg-slate-800/30 min-w-0 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">Choose Sketch Style</h3>
                      <p className="text-sm text-gray-400">Select your preferred artistic style</p>
                    </div>

                    {/* Style Selection - Dropdown */}
                    <div className="mb-6 relative flex-shrink-0">
                      <label className="block text-sm font-medium text-gray-400 mb-3">Sketch Style</label>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowStyleDropdown(!showStyleDropdown);
                        }}
                        className="w-full p-4 rounded-xl border-2 border-cyan-500/30 bg-slate-900/50 hover:border-cyan-500/50 transition-all text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-semibold">{getStyleDisplayName(sketchStyle)}</span>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                              <i className="ri-flashlight-line"></i>
                              {getStyleCredits(sketchStyle)}
                            </span>
                          </div>
                          <i className={`ri-arrow-down-s-line text-gray-400 transition-transform ${showStyleDropdown ? 'rotate-180' : ''}`}></i>
                        </div>
                      </button>

                      {/* Dropdown Menu */}
                      {showStyleDropdown && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-50 w-full">
                          <button
                            type="button"
                            onClick={() => handleStyleChange('pencil')}
                            className={`w-full p-4 transition-all text-left hover:bg-slate-800/50 ${
                              sketchStyle === 'pencil' ? 'bg-cyan-500/10' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-semibold">Pencil Sketch</span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                                  <i className="ri-flashlight-line"></i>
                                  {getStyleCredits('pencil')}
                                </span>
                              </div>
                              {sketchStyle === 'pencil' && (
                                <i className="ri-check-line text-cyan-400 text-xl"></i>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">Classic graphite look with soft shading</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStyleChange('charcoal')}
                            className={`w-full p-4 transition-all text-left hover:bg-slate-800/50 border-t border-cyan-500/10 ${
                              sketchStyle === 'charcoal' ? 'bg-purple-500/10' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-semibold">Charcoal Drawing</span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                                  <i className="ri-flashlight-line"></i>
                                  {getStyleCredits('charcoal')}
                                </span>
                              </div>
                              {sketchStyle === 'charcoal' && (
                                <i className="ri-check-line text-purple-400 text-xl"></i>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">Bold, dramatic strokes with rich blacks</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStyleChange('ink')}
                            className={`w-full p-4 transition-all text-left hover:bg-slate-800/50 border-t border-cyan-500/10 ${
                              sketchStyle === 'ink' ? 'bg-pink-500/10' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-semibold">Ink Sketch</span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold">
                                  <i className="ri-flashlight-line"></i>
                                  {getStyleCredits('ink')}
                                </span>
                              </div>
                              {sketchStyle === 'ink' && (
                                <i className="ri-check-line text-pink-400 text-xl"></i>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">Clean, precise lines with minimal shading</p>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Intensity Slider */}
                    <div className="mb-6 flex-shrink-0">
                      <label className="block text-sm font-medium text-gray-400 mb-3">
                        Sketch Intensity: <span className="text-cyan-400">{intensity}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={intensity}
                        onChange={(e) => setIntensity(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Light</span>
                        <span>Medium</span>
                        <span>Strong</span>
                      </div>
                    </div>

                    {/* Premium Options */}
                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 space-y-4 mb-6 flex-shrink-0">
                      {/* Public Visibility */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-white text-sm font-medium">Public Visibility</span>
                          <div 
                            className="relative flex-shrink-0"
                            onMouseEnter={() => setShowPublicTooltip(true)}
                            onMouseLeave={() => setShowPublicTooltip(false)}
                          >
                            <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                            {showPublicTooltip && (
                              <div className="absolute left-0 bottom-full mb-2 w-56 sm:w-64 p-3 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-xl z-50">
                                <p className="text-xs text-gray-300 leading-relaxed">
                                  Your image may be featured in our Explore feed. See terms for details.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <i className="ri-vip-crown-fill text-yellow-500 text-base"></i>
                          <button
                            onClick={handlePremiumFeatureClick}
                            className={`relative w-12 h-6 rounded-full transition-all cursor-pointer ${
                              publicVisibility ? 'bg-gradient-to-r from-cyan-500 to-purple-600' : 'bg-gray-600'
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                publicVisibility ? 'translate-x-6' : 'translate-x-0'
                              }`}
                            ></div>
                          </button>
                        </div>
                      </div>

                      {/* Copy Protection */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-white text-sm font-medium">Copy Protection</span>
                          <div 
                            className="relative flex-shrink-0"
                            onMouseEnter={() => setShowCopyTooltip(true)}
                            onMouseLeave={() => setShowCopyTooltip(false)}
                          >
                            <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                            {showCopyTooltip && (
                              <div className="absolute left-0 bottom-full mb-2 w-56 sm:w-64 p-3 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-xl z-50">
                                <p className="text-xs text-gray-300 leading-relaxed">
                                  Keep your content private. Others won't see your uploads or prompts in the community.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <i className="ri-vip-crown-fill text-yellow-500 text-base"></i>
                          <button
                            onClick={handlePremiumFeatureClick}
                            className={`relative w-12 h-6 rounded-full transition-all cursor-pointer ${
                              copyProtection ? 'bg-gradient-to-r from-cyan-500 to-purple-600' : 'bg-gray-600'
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                copyProtection ? 'translate-x-6' : 'translate-x-0'
                              }`}
                            ></div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <button 
                      onClick={handleGenerateClick}
                      disabled={!uploadedImage}
                      className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row items-center justify-center sm:justify-between px-6 gap-2 whitespace-nowrap flex-shrink-0 ${
                        uploadedImage
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50'
                          : 'bg-gray-700 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <i className="ri-pencil-line text-xl"></i>
                        <span>Generate Sketch</span>
                      </span>
                      {uploadedImage && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold">
                          <i className="ri-flashlight-line text-base"></i>
                          <span>{getStyleCredits(sketchStyle)} Credits</span>
                        </span>
                      )}
                    </button>

                    <div className="space-y-3 mt-6 flex-shrink-0">
                      <p className="text-xs text-gray-400 font-medium">Popular Subjects:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Portrait',
                          'Landscape',
                          'Pet',
                          'Architecture',
                          'Still Life'
                        ].map((subject, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                <p className="text-gray-400 text-sm">You need {getStyleCredits(sketchStyle)} credits to generate this sketch</p>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 mb-4 border border-cyan-500/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Current</div>
                    <div className="text-2xl font-bold text-red-400">{userCredits}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Required</div>
                    <div className="text-2xl font-bold text-cyan-400">{getStyleCredits(sketchStyle)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Need</div>
                    <div className="text-2xl font-bold text-orange-400">{getStyleCredits(sketchStyle) - userCredits}</div>
                  </div>
                </div>
              </div>

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

              <p className="text-white font-semibold text-sm mb-4">Upgrade for instant access:</p>

              <div className="space-y-3 mb-6">
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
                  onClick={() => setShowCreditsModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-300 whitespace-nowrap"
                >
                  Maybe Later
                </button>
                <button 
                  onClick={() => {
                    setShowCreditsModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 whitespace-nowrap"
                >
                  View All Plans
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Examples Gallery */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-transparent to-slate-950/50 relative">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                See the <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Magic</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Transform any photo into a beautiful hand-drawn sketch in seconds
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {sketchExamples.map((example, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative aspect-square overflow-hidden">
                        <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm">
                          <span className="text-xs font-bold text-white">Before</span>
                        </div>
                        <img 
                          src={example.before} 
                          alt={`${example.title} - Before`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative aspect-square overflow-hidden">
                        <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">
                          <span className="text-xs font-bold text-white">After</span>
                        </div>
                        <img 
                          src={example.after} 
                          alt={`${example.title} - After`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="p-6 border-t border-cyan-500/20">
                      <h3 className="text-white font-bold text-lg mb-2">{example.title}</h3>
                      <p className="text-sm text-gray-400">{example.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Why Choose Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Sketch Generator</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Professional sketch art made simple and accessible
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'ri-pencil-line',
                  title: 'Multiple Styles',
                  description: 'Choose from pencil, charcoal, or ink sketches. Each style offers unique artistic characteristics for different creative needs.'
                },
                {
                  icon: 'ri-settings-3-line',
                  title: 'Adjustable Intensity',
                  description: 'Fine-tune your sketch with intensity controls. Create subtle, light sketches or bold, dramatic artwork.'
                },
                {
                  icon: 'ri-flashlight-line',
                  title: 'Instant Processing',
                  description: 'Get your sketches in seconds, not minutes. Our optimized AI delivers professional results at lightning speed.'
                },
                {
                  icon: 'ri-hd-line',
                  title: 'High Resolution',
                  description: 'Generate high-quality sketches suitable for printing, framing, or digital use. No quality loss or pixelation.'
                },
                {
                  icon: 'ri-user-smile-line',
                  title: 'Easy to Use',
                  description: 'No artistic skills or software knowledge required. Simply upload, choose a style, and generate your sketch.'
                },
                {
                  icon: 'ri-shield-check-line',
                  title: 'Privacy Protected',
                  description: 'Your photos are processed securely and never stored. Complete privacy and data protection guaranteed.'
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

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950/50 to-transparent relative">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Common <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-lg text-gray-400">Everything you need to know about AI sketch generation</p>
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
                  Ready to Create Stunning Sketches?
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Transform your photos into beautiful hand-drawn art in seconds
                </p>
                <button 
                  onClick={scrollToEditor}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Start Creating for Free
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
