import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImageEnhancer() {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [enhancementType, setEnhancementType] = useState<'1.6' | 'pro'>('1.6');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showEnhancementDropdown, setShowEnhancementDropdown] = useState(false);
  const [publicVisibility, setPublicVisibility] = useState(true);
  const [copyProtection, setCopyProtection] = useState(false);
  const [showPublicTooltip, setShowPublicTooltip] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

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

  const enhancementOptions = [
    {
      id: '1.6' as const,
      name: 'Pollo Enhance 1.6',
      description: 'Standard enhancement with great quality',
      icon: 'ri-hd-line',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'pro' as const,
      name: 'Pollo Enhance Pro',
      description: 'Professional enhancement with best quality',
      icon: 'ri-vip-crown-line',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const exampleImages = [
    {
      before: 'https://readdy.ai/api/search-image?query=low%20quality%20blurry%20photo%20of%20hummingbird%20in%20flight%20dull%20colors%20poor%20resolution%20needs%20enhancement%20simple%20background&width=400&height=300&seq=enhance-before-1&orientation=landscape',
      after: 'https://readdy.ai/api/search-image?query=crystal%20clear%20sharp%20photo%20of%20vibrant%20hummingbird%20in%20flight%20brilliant%20colors%20high%20resolution%20enhanced%20quality%20simple%20background&width=400&height=300&seq=enhance-after-1&orientation=landscape',
      title: 'Instant AI Image Enhancer'
    },
    {
      before: 'https://readdy.ai/api/search-image?query=low%20quality%20portrait%20photo%20woman%20face%20dull%20skin%20tones%20poor%20lighting%20needs%20color%20correction%20simple%20background&width=400&height=300&seq=enhance-before-2&orientation=landscape',
      after: 'https://readdy.ai/api/search-image?query=high%20quality%20portrait%20photo%20woman%20face%20vibrant%20skin%20tones%20perfect%20lighting%20enhanced%20colors%20simple%20background&width=400&height=300&seq=enhance-after-2&orientation=landscape',
      title: 'Boost Image Quality'
    },
    {
      before: 'https://readdy.ai/api/search-image?query=blurry%20out%20of%20focus%20photo%20astronaut%20in%20space%20low%20quality%20needs%20sharpening%20simple%20background&width=400&height=300&seq=enhance-before-3&orientation=landscape',
      after: 'https://readdy.ai/api/search-image?query=sharp%20crystal%20clear%20photo%20astronaut%20in%20space%20high%20quality%20perfectly%20focused%20enhanced%20details%20simple%20background&width=400&height=300&seq=enhance-after-3&orientation=landscape',
      title: 'Eliminate Blurriness'
    },
    {
      before: 'https://readdy.ai/api/search-image?query=old%20vintage%20black%20and%20white%20photo%20faded%20damaged%20needs%20restoration%20simple%20background&width=400&height=300&seq=enhance-before-4&orientation=landscape',
      after: 'https://readdy.ai/api/search-image?query=restored%20colorized%20vintage%20photo%20vibrant%20colors%20repaired%20enhanced%20quality%20simple%20background&width=400&height=300&seq=enhance-after-4&orientation=landscape',
      title: 'Revitalize Old Photos'
    }
  ];

  const howItWorks = [
    {
      step: 'Step 1',
      title: 'Upload Image',
      description: 'Upload your image or drag and drop'
    },
    {
      step: 'Step 2',
      title: 'Choose Enhancement',
      description: 'Select the type of enhancement you need'
    },
    {
      step: 'Step 3',
      title: 'Get Result',
      description: 'Download your enhanced image'
    }
  ];

  const otherTools = [
    {
      title: 'AI Background Remover',
      image: 'https://readdy.ai/api/search-image?query=AI%20background%20removal%20tool%20transparent%20background%20product%20photo%20editing%20simple%20clean%20design&width=300&height=200&seq=tool-bg-remover&orientation=landscape'
    },
    {
      title: 'AI Image Upscaler',
      image: 'https://readdy.ai/api/search-image?query=AI%20image%20upscaling%20tool%20resolution%20enhancement%20quality%20improvement%20simple%20clean%20design&width=300&height=200&seq=tool-upscaler&orientation=landscape'
    }
  ];

  const faqs = [
    {
      question: 'What is an AI image enhancer?',
      answer: 'An AI image enhancer uses artificial intelligence to automatically improve image quality, sharpness, colors, and resolution.'
    },
    {
      question: 'What is the AI image enhancer used for?',
      answer: 'It\'s used to improve photo quality, restore old photos, enhance colors, remove blur, and upscale images for professional use.'
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support JPG, JPEG, PNG, and WEBP formats up to 10MB in size.'
    },
    {
      question: 'Can I use the photo enhancer on mobile?',
      answer: 'Yes, our image enhancer works on all devices including mobile phones and tablets.'
    },
    {
      question: 'Why is my photo enhancer slow and not as good as expected?',
      answer: 'Processing time depends on image size and complexity. For best results, use high-quality source images.'
    },
    {
      question: 'Do I need technical expertise to use the AI image enhancer?',
      answer: 'No technical skills required! Simply upload your image and let our AI do the work.'
    },
    {
      question: 'How long does it take to enhance an image?',
      answer: 'Most images are enhanced within 10-30 seconds depending on size and enhancement type.'
    },
    {
      question: 'Are my uploaded images kept private and secure?',
      answer: 'Yes, all uploaded images are encrypted and automatically deleted after processing.'
    },
    {
      question: 'Do I need download software to use the AI image enhancer?',
      answer: 'No download needed! Our tool works entirely in your web browser.'
    },
    {
      question: 'Can I edit my image after using the enhancer?',
      answer: 'Yes, you can download the enhanced image and edit it further with any image editor.'
    }
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleEnhance = () => {
    if (!uploadedImage) return;
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
    }, 3000);
  };

  // 根据增强类型计算所需积分
  const requiredCredits = enhancementType === '1.6' ? 10 : 25;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section with Upload */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Instant AI Image Enhancer With Stunning Results
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Elevate image quality and resolution for any project. Enhance your images with AI-powered technology. 
              Boost clarity, sharpen details, and improve colors instantly.
            </p>
          </div>

          {/* Main Upload Area */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-cyan-500/20 p-6 md:p-8 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upload Section */}
              <div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="main-image-upload"
                  onChange={handleImageUpload}
                />
                <label htmlFor="main-image-upload" className="block cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 bg-slate-800/30 hover:bg-cyan-500/5 transition-all duration-300 aspect-[4/3]">
                    {uploadedImage ? (
                      <div className="relative w-full h-full">
                        <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover rounded-xl" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setUploadedImage(null);
                          }}
                          className="absolute top-3 right-3 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                        >
                          <i className="ri-close-line text-white text-xl"></i>
                        </button>
                        <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                          <p className="text-white text-sm font-medium">Original Image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-4 shadow-lg shadow-cyan-500/30">
                            <i className="ri-image-add-line text-3xl text-white"></i>
                          </div>
                          <p className="text-base font-semibold text-white mb-2">Click or drag an image here</p>
                          <p className="text-sm text-gray-400">JPG, JPEG, PNG or WEBP up to 10 MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Enhancement Type Selection */}
                <div className="mt-6 relative z-30">
                  <label className="block text-white font-semibold mb-3">Enhancement Type</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowEnhancementDropdown(!showEnhancementDropdown)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white hover:border-cyan-500/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${enhancementOptions.find(opt => opt.id === enhancementType)?.color} flex items-center justify-center`}>
                          <i className={`${enhancementOptions.find(opt => opt.id === enhancementType)?.icon} text-white`}></i>
                        </div>
                        <span className="font-medium text-sm">{enhancementOptions.find(opt => opt.id === enhancementType)?.name}</span>
                      </div>
                      <i className={`ri-arrow-down-s-line transition-transform ${showEnhancementDropdown ? 'rotate-180' : ''}`}></i>
                    </button>
                    
                    {showEnhancementDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-35">
                        {enhancementOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setEnhancementType(option.id);
                              setShowEnhancementDropdown(false);
                            }}
                            className={`w-full p-4 transition-all text-left hover:bg-slate-800/80 ${
                              enhancementType === option.id ? 'bg-cyan-500/10' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                                <i className={`${option.icon} text-white`}></i>
                              </div>
                              <span className="text-white font-semibold text-sm">{option.name}</span>
                              {enhancementType === option.id && (
                                <i className="ri-check-line text-cyan-400 text-xl ml-auto"></i>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 ml-11">{option.description}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhance Button */}
                <button
                  onClick={handleEnhance}
                  disabled={!uploadedImage || isEnhancing}
                  className={`w-full mt-6 py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    !uploadedImage || isEnhancing
                      ? 'bg-gray-700 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105'
                  }`}
                >
                  {isEnhancing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Enhancing...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-magic-line text-xl"></i>
                      <span>Try the Image Enhancer for Free</span>
                    </>
                  )}
                </button>

                {/* Credits Info */}
                <div className="mt-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 text-sm font-medium">Credits required:</span>
                    <span className="text-cyan-400 text-lg font-bold">{requiredCredits} Credits</span>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div>
                <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/30 bg-slate-800/30 aspect-[4/3]">
                  {uploadedImage ? (
                    <div className="relative w-full h-full">
                      <img src={uploadedImage} alt="Enhanced Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-white text-sm font-medium">Enhanced Preview</p>
                        <p className="text-cyan-400 text-xs mt-1">AI will enhance this image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                          <i className="ri-image-line text-3xl text-cyan-400"></i>
                        </div>
                        <p className="text-gray-400 text-sm">Upload an image to see the enhanced preview</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tips */}
                <div className="mt-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <i className="ri-lightbulb-line text-white"></i>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2 text-sm">Tips for Best Results</h4>
                      <ul className="text-gray-300 text-xs space-y-1.5">
                        <li className="flex items-start gap-2">
                          <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0"></i>
                          <span>Use images with good lighting for better enhancement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0"></i>
                          <span>Higher resolution source images produce better results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0"></i>
                          <span>Choose the right enhancement type for your needs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sample Image */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Sample Image</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="aspect-square w-full rounded-xl overflow-hidden border border-gray-700/50">
                        <img 
                          src="https://readdy.ai/api/search-image?query=old%20vintage%20photograph%20with%20visible%20grain%20noise%20scratches%20faded%20colors%20low%20resolution%20blurry%20details%20aged%20photo%20quality%20deteriorated%20image%20nostalgic%20retro%20simple%20background&width=400&height=400&seq=enhance-before-sample-v2&orientation=squarish"
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-all text-sm font-medium whitespace-nowrap">
                        <i className="ri-arrow-left-line"></i>
                        Before
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="aspect-square w-full rounded-xl overflow-hidden border border-cyan-500/50">
                        <img 
                          src="https://readdy.ai/api/search-image?query=crystal%20clear%20ultra%20high%20definition%20photograph%20with%20perfect%20sharpness%20vibrant%20rich%20colors%20maximum%20resolution%20stunning%20clarity%20enhanced%20details%20professional%20quality%20pristine%20image%20modern%20photography%20simple%20background&width=400&height=400&seq=enhance-after-sample-v2&orientation=squarish"
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg transition-all text-sm font-bold whitespace-nowrap">
                        After
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Comparisons */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              See the Difference
            </h2>
            <p className="text-gray-400 text-lg">Before and after AI enhancement</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {exampleImages.map((example, index) => (
              <div key={index} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition-all">
                <h3 className="text-white font-bold text-lg mb-4">{example.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2">
                      <img src={example.before} alt="Before" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-400 text-sm text-center">Before</p>
                  </div>
                  <div>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2">
                      <img src={example.after} alt="After" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-cyan-400 text-sm text-center font-semibold">After</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              How Does Our AI Image Enhancer Work?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 text-center hover:border-cyan-500/40 transition-all">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-cyan-500/30">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 whitespace-nowrap">
              Try the Image Enhancer
            </button>
          </div>
        </div>
      </section>

      {/* Other Tools */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Discover Other AI Image Editing Tools
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {otherTools.map((tool, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer bg-slate-900/50">
                <div className="aspect-video relative overflow-hidden">
                  <img src={tool.image} alt={tool.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{tool.title}</h3>
                  <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-lg transition-all whitespace-nowrap">
                    Try Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">FAQs</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-900/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/30 transition-all"
                >
                  <span className="text-white font-semibold pr-4">{faq.question}</span>
                  <i className={`ri-arrow-${openFaqIndex === index ? 'up' : 'down'}-s-line text-cyan-400 text-xl flex-shrink-0 transition-transform`}></i>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 p-12">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Elevate Your Image Quality With Our Photo Enhancer
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Transform your images with AI-powered enhancement technology
              </p>
              <button className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 whitespace-nowrap">
                Try the Image Enhancer for Free
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}