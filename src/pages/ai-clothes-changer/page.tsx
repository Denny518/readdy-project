import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AIClothesChanger() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedClothes, setSelectedClothes] = useState<string | null>(null);
  const [clothesCategory, setClothesCategory] = useState<'lady' | 'man' | 'custom'>('lady');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAspectRatioDropdown, setShowAspectRatioDropdown] = useState(false);
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

  const handlePremiumFeatureClick = () => {
    window.REACT_APP_NAVIGATE('/pricing');
  };

  const ladyClothes = [
    { id: 1, image: 'https://readdy.ai/api/search-image?query=elegant%20black%20mini%20dress%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=lady-dress-001&orientation=portrait', name: 'Black Mini Dress' },
    { id: 2, image: 'https://readdy.ai/api/search-image?query=blue%20plaid%20school%20uniform%20skirt%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=lady-dress-002&orientation=portrait', name: 'School Uniform' },
    { id: 3, image: 'https://readdy.ai/api/search-image?query=red%20bikini%20swimsuit%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=lady-dress-003&orientation=portrait', name: 'Red Bikini' },
    { id: 4, image: 'https://readdy.ai/api/search-image?query=purple%20elegant%20evening%20gown%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=lady-dress-004&orientation=portrait', name: 'Evening Gown' },
    { id: 5, image: 'https://readdy.ai/api/search-image?query=pink%20lace%20dress%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=lady-dress-005&orientation=portrait', name: 'Lace Dress' },
    { id: 6, image: 'https://readdy.ai/api/search-image?query=white%20wedding%20dress%20bridal%20gown%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=lady-dress-006&orientation=portrait', name: 'Wedding Dress' }
  ];

  const manClothes = [
    { id: 1, image: 'https://readdy.ai/api/search-image?query=black%20formal%20suit%20jacket%20mens%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=man-clothes-001&orientation=portrait', name: 'Black Suit' },
    { id: 2, image: 'https://readdy.ai/api/search-image?query=casual%20denim%20jacket%20mens%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=man-clothes-002&orientation=portrait', name: 'Denim Jacket' },
    { id: 3, image: 'https://readdy.ai/api/search-image?query=white%20dress%20shirt%20mens%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=man-clothes-003&orientation=portrait', name: 'Dress Shirt' },
    { id: 4, image: 'https://readdy.ai/api/search-image?query=grey%20hoodie%20sweatshirt%20mens%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=man-clothes-004&orientation=portrait', name: 'Hoodie' },
    { id: 5, image: 'https://readdy.ai/api/search-image?query=leather%20jacket%20mens%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=man-clothes-005&orientation=portrait', name: 'Leather Jacket' },
    { id: 6, image: 'https://readdy.ai/api/search-image?query=polo%20shirt%20mens%20fashion%20outfit%20simple%20white%20background%20product%20photography&width=200&height=300&seq=man-clothes-006&orientation=portrait', name: 'Polo Shirt' }
  ];

  const aspectRatios = [
    { value: '16:9', label: '16:9' },
    { value: '9:16', label: '9:16' },
    { value: '1:1', label: '1:1' },
    { value: '3:2', label: '3:2' },
    { value: '2:3', label: '2:3' },
    { value: '4:3', label: '4:3' },
    { value: '3:4', label: '3:4' }
  ];

  const currentClothes = clothesCategory === 'lady' ? ladyClothes : manClothes;

  const handleGenerate = () => {
    if (!uploadedImage || !selectedClothes) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const sampleImages = [
    'https://readdy.ai/api/search-image?query=woman%20standing%20full%20body%20portrait%20beach%20background%20casual%20pose%20simple%20background&width=400&height=600&seq=sample-woman-001&orientation=portrait',
    'https://readdy.ai/api/search-image?query=man%20standing%20full%20body%20portrait%20urban%20background%20casual%20pose%20simple%20background&width=400&height=600&seq=sample-man-001&orientation=portrait'
  ];

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
                <h1 className="text-xl font-bold text-white">AI Clothes Changer</h1>
                <p className="text-sm text-gray-400">Swap Clothes Instantly Online</p>
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

      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-b border-orange-500/30">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="ri-sparkling-line text-orange-400 text-xl"></i>
              <span className="text-white font-medium text-sm">🎉 Nano Banana Pro Is Available Now!</span>
              <button className="text-orange-400 hover:text-orange-300 font-semibold text-sm underline transition-colors whitespace-nowrap">
                Try it
              </button>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload & Settings */}
          <div className="space-y-6">
            {/* Upload Image */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Upload image</h3>
              
              <div className="relative mb-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="file-input"
                  onChange={handleImageUpload}
                />
                <label htmlFor="file-input" className="block cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 bg-slate-800/30 hover:bg-cyan-500/5 transition-all duration-300 p-12">
                    {uploadedImage ? (
                      <div className="relative">
                        <img src={uploadedImage} alt="Uploaded" className="w-full h-64 object-cover rounded-lg" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setUploadedImage(null);
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <i className="ri-close-line text-white"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-4">
                          <i className="ri-image-add-line text-3xl text-white"></i>
                        </div>
                        <p className="text-base font-medium text-white mb-2">Click or drop an image here</p>
                        <p className="text-sm text-gray-400">JPG, JPEG, PNG or WEBP up to 10 MB</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-400 font-medium">Sample image</p>
                <div className="grid grid-cols-2 gap-3">
                  {sampleImages.map((src, index) => (
                    <button
                      key={index}
                      onClick={() => setUploadedImage(src)}
                      className="aspect-[2/3] rounded-xl overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-500 transition-all hover:scale-105 cursor-pointer"
                    >
                      <img src={src} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Choose Clothes */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Choose your favorite clothes</h3>
              
              {/* Category Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setClothesCategory('lady')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    clothesCategory === 'lady'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white'
                  }`}
                >
                  Lady
                </button>
                <button
                  onClick={() => setClothesCategory('man')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    clothesCategory === 'man'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white'
                  }`}
                >
                  Man
                </button>
                <button
                  onClick={() => setClothesCategory('custom')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    clothesCategory === 'custom'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white'
                  }`}
                >
                  Custom
                </button>
              </div>

              {/* Clothes Grid */}
              <div className="grid grid-cols-3 gap-3">
                {currentClothes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedClothes(item.id.toString())}
                    className={`relative aspect-[2/3] rounded-xl overflow-hidden border-2 transition-all ${
                      selectedClothes === item.id.toString()
                        ? 'border-cyan-500 shadow-lg shadow-cyan-500/30'
                        : 'border-gray-700/50 hover:border-cyan-500/50'
                    }`}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    {selectedClothes === item.id.toString() && (
                      <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                        <i className="ri-checkbox-circle-fill text-cyan-400 text-3xl"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Output Aspect Ratios */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 relative z-[30]">
              <h3 className="text-lg font-bold text-white mb-4">Output Aspect Ratios</h3>
              
              <div className="relative">
                <button
                  onClick={() => setShowAspectRatioDropdown(!showAspectRatioDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 transition-all"
                >
                  <span className="text-white font-medium">{aspectRatio}</span>
                  <i className={`ri-arrow-down-s-line text-cyan-400 text-xl transition-transform ${showAspectRatioDropdown ? 'rotate-180' : ''}`}></i>
                </button>
                
                {showAspectRatioDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[35]">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio.value}
                        onClick={() => {
                          setAspectRatio(ratio.value);
                          setShowAspectRatioDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-all hover:bg-slate-800/50 ${
                          aspectRatio === ratio.value ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-300'
                        }`}
                      >
                        <span className="font-medium">{ratio.label}</span>
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

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!uploadedImage || !selectedClothes || isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                !uploadedImage || !selectedClothes || isGenerating
                  ? 'bg-gray-700 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate</span>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-sm">
                    <i className="ri-flashlight-line"></i>
                    <span>Credits required: 15</span>
                  </div>
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Sample image</h3>
              
              <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700/50">
                <div className="text-center">
                  <i className="ri-image-line text-6xl text-gray-600 mb-4"></i>
                  <p className="text-gray-400">Your result will appear here</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <i className="ri-lightbulb-line text-cyan-400"></i>
                Tips for Best Results
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-cyan-400 mt-0.5"></i>
                  <span>Use clear, full-body photos for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-cyan-400 mt-0.5"></i>
                  <span>Ensure good lighting in your original photo</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-cyan-400 mt-0.5"></i>
                  <span>Choose clothes that match your body pose</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-cyan-400 mt-0.5"></i>
                  <span>Try different aspect ratios for various uses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
