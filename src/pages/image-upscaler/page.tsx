import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImageUpscaler() {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [enhancerModel, setEnhancerModel] = useState('Pollo Enhance 1.6');
  const [enhancerScale, setEnhancerScale] = useState('Original');
  const [showEnhancerModelDropdown, setShowEnhancerModelDropdown] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
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

  const handleEnhancerImageUpload = handleImageUpload;

  // 计算所需积分
  const requiredCredits = enhancerModel === 'Pollo Enhance 1.6' ? 10 : 25;

  // 处理高级功能点击
  const handlePremiumFeatureClick = () => {
    navigate('/pricing');
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="mb-6 px-4 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Image Upscaler</h1>
        <p className="text-sm md:text-base text-gray-400">Upscale your images with AI-powered technology</p>
      </div>

      <div className="px-4 md:px-0">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Model Selection */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 relative z-[30]">
              <h3 className="text-white font-bold text-base mb-4">Model</h3>
              <div className="relative">
                <button
                  onClick={() => setShowEnhancerModelDropdown(!showEnhancerModelDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                      <i className="ri-magic-line text-white text-sm"></i>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{enhancerModel}</div>
                      <div className="text-xs text-gray-400">
                        {enhancerModel === 'Pollo Enhance 1.6' ? 'Faster and cheaper' : 'Higher quality'}
                      </div>
                    </div>
                  </div>
                  <i className={`ri-arrow-down-s-line transition-transform ${showEnhancerModelDropdown ? 'rotate-180' : ''}`}></i>
                </button>
                
                {showEnhancerModelDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[35]">
                    {[
                      { id: 'Pollo Enhance 1.6', name: 'Pollo Enhance 1.6', description: 'Faster and cheaper' },
                      { id: 'Pollo Enhance Pro', name: 'Pollo Enhance Pro', description: 'Higher quality' }
                    ].map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setEnhancerModel(model.id);
                          setShowEnhancerModelDropdown(false);
                        }}
                        className={`w-full p-4 transition-all text-left hover:bg-slate-800/80 ${
                          enhancerModel === model.id ? 'bg-cyan-500/10' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-semibold text-sm mb-1">{model.name}</div>
                            <div className="text-xs text-gray-400">{model.description}</div>
                          </div>
                          {enhancerModel === model.id && (
                            <i className="ri-check-line text-cyan-400 text-xl"></i>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Upload Image */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
              <h3 className="text-white font-bold text-base mb-4">Upload Image</h3>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="enhancer-image-upload"
                onChange={handleEnhancerImageUpload}
              />
              <label htmlFor="enhancer-image-upload" className="block cursor-pointer">
                <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 bg-slate-800/30 hover:bg-cyan-500/5 transition-all duration-300 p-8">
                  {uploadedImage ? (
                    <div className="relative">
                      <img src={uploadedImage} alt="Uploaded" className="w-full h-64 object-contain rounded-lg" />
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
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-3">
                        <i className="ri-image-add-line text-2xl text-white"></i>
                      </div>
                      <p className="text-sm font-medium text-white mb-1">Click to upload an image</p>
                      <p className="text-xs text-gray-400">We accept JPEG, PNG and WEBP formats up to 10MB × 4096 × 4096 pixels</p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Scale Selection */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
              <h3 className="text-white font-bold text-base mb-4">Scale</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {['Original', '2X', '4X', '8X', '16X'].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setEnhancerScale(scale)}
                    className={`px-3 md:px-4 py-3 rounded-xl font-medium transition-all text-sm ${
                      enhancerScale === scale
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                        : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-cyan-500/20'
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Options */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 space-y-4 relative z-10">
              {/* Public Visibility */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-white text-sm font-medium">Public Visibility</span>
                  <div className="relative group flex-shrink-0">
                    <button className="w-4 h-4 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors">
                      <i className="ri-question-line text-xs text-gray-400"></i>
                    </button>
                    <div className="absolute left-0 bottom-full mb-2 w-56 sm:w-64 p-3 bg-slate-900 border border-cyan-500/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Your image may be featured in our Explore feed. See terms for details.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <i className="ri-vip-crown-line text-yellow-500 text-base"></i>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={publicVisibility}
                      onChange={(e) => {
                        e.preventDefault();
                        navigate('/pricing');
                      }}
                    />
                    <div 
                      onClick={() => navigate('/pricing')}
                      className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all cursor-pointer ${
                        publicVisibility 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600' 
                          : 'bg-slate-700'
                      }`}
                    ></div>
                  </label>
                </div>
              </div>

              {/* Copy Protection */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-white text-sm font-medium">Copy Protection</span>
                  <div className="relative group flex-shrink-0">
                    <button className="w-4 h-4 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors">
                      <i className="ri-question-line text-xs text-gray-400"></i>
                    </button>
                    <div className="absolute left-0 bottom-full mb-2 w-56 sm:w-64 p-3 bg-slate-900 border border-cyan-500/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Keep your content private. Others won't see your uploads or prompts in the community.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <i className="ri-vip-crown-line text-yellow-500 text-base"></i>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={copyProtection}
                      onChange={(e) => {
                        e.preventDefault();
                        navigate('/pricing');
                      }}
                    />
                    <div 
                      onClick={() => navigate('/pricing')}
                      className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all cursor-pointer ${
                        copyProtection 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600' 
                          : 'bg-slate-700'
                      }`}
                    ></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Credits Info */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/20">
              <div className="flex items-center gap-2 text-sm">
                <i className="ri-information-line text-cyan-400"></i>
                <span className="text-gray-300">
                  Credits required: <span className="text-white font-semibold">{requiredCredits} Credits</span>
                </span>
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={() => {
                if (!uploadedImage) return;
                setIsEnhancing(true);
                setTimeout(() => setIsEnhancing(false), 3000);
              }}
              disabled={!uploadedImage || isEnhancing}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                !uploadedImage || isEnhancing
                  ? 'bg-gray-700 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105'
              }`}
            >
              {isEnhancing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Upscaling...</span>
                </>
              ) : (
                <span>Create</span>
              )}
            </button>
          </div>

          {/* Right Panel - Sample Image */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-bold text-base mb-4">Sample Image</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="space-y-2">
                <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-gray-700">
                  <img 
                    src="https://readdy.ai/api/search-image?query=low%20resolution%20pixelated%20image%20small%20size%20blurry%20details%20poor%20quality%20needs%20upscaling%20simple%20background&width=200&height=300&seq=upscale-before-sample&orientation=portrait"
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg">
                  <i className="ri-arrow-left-line text-cyan-400"></i>
                  <span className="text-white text-sm font-medium">Before</span>
                </div>
              </div>

              {/* After */}
              <div className="space-y-2">
                <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                  <img 
                    src="https://readdy.ai/api/search-image?query=high%20resolution%20sharp%20image%20large%20size%20crystal%20clear%20details%20excellent%20quality%20upscaled%20enhanced%20simple%20background&width=400&height=600&seq=upscale-after-sample&orientation=portrait"
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg">
                  <span className="text-white text-sm font-medium">After</span>
                  <i className="ri-arrow-right-line text-cyan-400"></i>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-2">Tips for Best Results</h4>
                  <ul className="text-gray-300 text-xs space-y-1.5">
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0 text-xs"></i>
                      <span>Use high-quality source images for better upscaling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0 text-xs"></i>
                      <span>Original scale maintains the image dimensions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0 text-xs"></i>
                      <span>Higher scales increase resolution and file size</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0 text-xs"></i>
                      <span>Processing time increases with higher scales</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
