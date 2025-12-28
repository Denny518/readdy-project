import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('flux-pro');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showAspectRatioDropdown, setShowAspectRatioDropdown] = useState(false);
  const [publicVisibility, setPublicVisibility] = useState(true);
  const [copyProtection, setCopyProtection] = useState(false);
  const [showPublicTooltip, setShowPublicTooltip] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const models = [
    { id: 'flux-pro', name: 'Flux Pro', description: 'High quality, slower', icon: 'ri-vip-crown-line' },
    { id: 'flux-dev', name: 'Flux Dev', description: 'Balanced quality & speed', icon: 'ri-flashlight-line' },
    { id: 'flux-schnell', name: 'Flux Schnell', description: 'Fast generation', icon: 'ri-rocket-line' },
    { id: 'stable-diffusion', name: 'Stable Diffusion XL', description: 'Classic model', icon: 'ri-image-line' }
  ];

  const aspectRatios = [
    { value: '1:1', label: '1:1', width: 'Square' },
    { value: '16:9', label: '16:9', width: 'Landscape' },
    { value: '9:16', label: '9:16', width: 'Portrait' },
    { value: '4:3', label: '4:3', width: 'Standard' },
    { value: '3:4', label: '3:4', width: 'Vertical' }
  ];

  const examplePrompts = [
    'A serene mountain landscape at sunset with vibrant orange and purple skies',
    'Futuristic cyberpunk city with neon lights and flying cars',
    'Cute cartoon cat wearing a wizard hat, magical sparkles around',
    'Professional portrait of a business woman in modern office',
    'Abstract geometric art with bold colors and sharp angles',
    'Cozy coffee shop interior with warm lighting and plants'
  ];

  const recentGenerations = [
    { id: 1, image: 'https://readdy.ai/api/search-image?query=serene%20mountain%20landscape%20sunset%20vibrant%20orange%20purple%20skies%20dramatic%20clouds%20peaceful%20nature%20scene%20beautiful%20vista%20simple%20background&width=400&height=400&seq=recent-gen-001&orientation=squarish', prompt: 'Mountain sunset landscape' },
    { id: 2, image: 'https://readdy.ai/api/search-image?query=futuristic%20cyberpunk%20city%20neon%20lights%20flying%20cars%20sci-fi%20urban%20landscape%20night%20scene%20technology%20advanced%20simple%20background&width=400&height=400&seq=recent-gen-002&orientation=squarish', prompt: 'Cyberpunk city' },
    { id: 3, image: 'https://readdy.ai/api/search-image?query=cute%20cartoon%20cat%20wearing%20wizard%20hat%20magical%20sparkles%20kawaii%20style%20fantasy%20character%20adorable%20simple%20background&width=400&height=400&seq=recent-gen-003&orientation=squarish', prompt: 'Wizard cat' },
    { id: 4, image: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20portrait%20modern%20office%20confident%20pose%20corporate%20style%20elegant%20simple%20background&width=400&height=400&seq=recent-gen-004&orientation=squarish', prompt: 'Business portrait' },
    { id: 5, image: 'https://readdy.ai/api/search-image?query=abstract%20geometric%20art%20bold%20colors%20sharp%20angles%20modern%20design%20artistic%20composition%20vibrant%20simple%20background&width=400&height=400&seq=recent-gen-005&orientation=squarish', prompt: 'Abstract art' },
    { id: 6, image: 'https://readdy.ai/api/search-image?query=cozy%20coffee%20shop%20interior%20warm%20lighting%20plants%20comfortable%20atmosphere%20cafe%20design%20inviting%20simple%20background&width=400&height=400&seq=recent-gen-006&orientation=squarish', prompt: 'Coffee shop' }
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      try {
        const promptSuffixes = [
          ' high quality detailed artwork professional photography simple background',
          ' artistic style beautiful composition creative design simple background',
          ' stunning visual masterpiece amazing details simple background',
          ' premium quality professional result perfect lighting simple background'
        ];
        
        const newImages = promptSuffixes.map((suffix, index) => {
          return `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28prompt%20%20%20suffix%29%7D&width=512&height=512&seq=gen-result-00${index + 1}&orientation=squarish`;
        });
        
        setGeneratedImages(newImages);
      } catch (error) {
        console.error('Error generating images:', error);
        // Fallback to static images if encoding fails
        setGeneratedImages([
          'https://readdy.ai/api/search-image?query=landscape&width=512&height=512&seq=gen-result-001&orientation=squarish',
          'https://readdy.ai/api/search-image?query=nature&width=512&height=512&seq=gen-result-002&orientation=squarish',
          'https://readdy.ai/api/search-image?query=abstract&width=512&height=512&seq=gen-result-003&orientation=squarish',
          'https://readdy.ai/api/search-image?query=artistic&width=512&height=512&seq=gen-result-004&orientation=squarish'
        ]);
      } finally {
        setIsGenerating(false);
      }
    }, 3000);
  };

  const handlePremiumFeatureClick = () => {
    window.REACT_APP_NAVIGATE('/pricing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/webapp" className="flex items-center gap-3 group">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-cyan-400 transition-all">
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">AI Image Generator</h1>
                <p className="text-base text-cyan-400 font-semibold">AI-Powered Image Creation from Text & Photos</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-all text-sm font-medium whitespace-nowrap">
                <i className="ri-history-line mr-2"></i>
                History
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-lg transition-all text-sm font-bold whitespace-nowrap shadow-lg shadow-cyan-500/30">
                <i className="ri-vip-crown-line mr-2"></i>
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Model Selection */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 relative z-[100]">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-cpu-line text-cyan-400"></i>
                AI Model
              </h3>
              <div className="space-y-3">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full p-4 rounded-xl border transition-all ${
                      selectedModel === model.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                        : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        selectedModel === model.id
                          ? 'bg-gradient-to-br from-cyan-500 to-purple-600'
                          : 'bg-gray-700/50'
                      }`}>
                        <i className={`${model.icon} text-lg text-white`}></i>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-white text-sm">{model.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{model.description}</div>
                      </div>
                      {selectedModel === model.id && (
                        <i className="ri-checkbox-circle-fill text-cyan-400 text-xl"></i>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className={`bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 relative transition-all ${showAspectRatioDropdown ? 'z-[10000]' : 'z-[100]'}`}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-aspect-ratio-line text-cyan-400"></i>
                Output Aspect Ratios
              </h3>
              
              <div className="relative">
                <button
                  onClick={() => setShowAspectRatioDropdown(!showAspectRatioDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <div className="text-white font-semibold text-sm">{aspectRatio}</div>
                      <div className="text-gray-400 text-xs">
                        {aspectRatios.find(r => r.value === aspectRatio)?.width}
                      </div>
                    </div>
                  </div>
                  <i className={`ri-arrow-down-s-line text-cyan-400 text-xl transition-transform ${showAspectRatioDropdown ? 'rotate-180' : ''}`}></i>
                </button>
                
                {showAspectRatioDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[10000]">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio.value}
                        onClick={() => {
                          setAspectRatio(ratio.value);
                          setShowAspectRatioDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 transition-all text-left ${
                          aspectRatio === ratio.value
                            ? 'bg-cyan-500/20 border-l-4 border-cyan-500'
                            : 'hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{ratio.label}</div>
                          <div className="text-gray-400 text-xs">{ratio.width}</div>
                        </div>
                        {aspectRatio === ratio.value && (
                          <i className="ri-check-line text-cyan-400 text-xl flex-shrink-0"></i>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Premium Options */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 space-y-4 relative z-10">
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

            {/* Example Prompts */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-lightbulb-line text-cyan-400"></i>
                Example Prompts
              </h3>
              <div className="space-y-2">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="w-full p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700/50 hover:border-cyan-500/30 text-left text-sm text-gray-300 hover:text-white transition-all"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Generation Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-quill-pen-line text-cyan-400"></i>
                Describe Your Image
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to create... Be specific and detailed for best results."
                    className="w-full h-32 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Negative Prompt (Optional)
                  </label>
                  <textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="What you don't want in the image..."
                    className="w-full h-24 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none text-sm"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:shadow-none whitespace-nowrap"
                >
                  {isGenerating ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="ri-magic-line mr-2"></i>
                      Generate Image
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Results */}
            {generatedImages.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="ri-image-line text-cyan-400"></i>
                  Generated Images
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all">
                      <div className="aspect-square relative">
                        <img 
                          src={image}
                          alt={`Generated ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', image);
                            e.currentTarget.src = 'https://picsum.photos/seed/fallback/512/512.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2">
                            <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold py-2 rounded-lg transition-all whitespace-nowrap">
                              <i className="ri-download-line mr-1"></i>
                              Download
                            </button>
                            <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold py-2 rounded-lg transition-all whitespace-nowrap">
                              <i className="ri-share-line mr-1"></i>
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Generations */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-time-line text-cyan-400"></i>
                Recent Generations
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {recentGenerations.map((item) => (
                  <div 
                    key={item.id}
                    className="group relative overflow-hidden rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all cursor-pointer"
                  >
                    <div className="aspect-square relative">
                      <img 
                        src={item.image}
                        alt={item.prompt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.error('Recent image failed to load:', item.image);
                          e.currentTarget.src = 'https://picsum.photos/seed/fallback-recent/400/400.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-xs font-medium line-clamp-2">{item.prompt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
