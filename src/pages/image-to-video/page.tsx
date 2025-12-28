import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 定义模型数据
const models = [
  {
    id: 'seedance-pro-fast',
    name: 'Seedance Pro fast',
    description: 'Fast generation, good quality',
    icon: 'ri-rocket-line'
  },
  {
    id: 'veo-3',
    name: 'Veo 3',
    description: 'Latest model, best quality',
    icon: 'ri-star-line'
  },
  {
    id: 'runway-gen3',
    name: 'Runway Gen-3',
    description: 'Professional video generation',
    icon: 'ri-movie-line'
  }
];

// 辅助函数
const getQualityDisplayName = (quality: string) => {
  return quality.toUpperCase();
};

const getQualityCredits = (quality: string) => {
  const credits: Record<string, number> = {
    '480p': 10,
    '720p': 15,
    '1080p': 25,
    '4k': 40
  };
  return credits[quality] || 10;
};

export default function ImageToVideo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'image-to-video' | 'text-to-video'>('image-to-video');
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [quality, setQuality] = useState('480p');
  const [duration, setDuration] = useState('5s');
  const [showQualityDropdown, setShowQualityDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [publicVisibility, setPublicVisibility] = useState(false);
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

  const handleGenerate = () => {
    if (activeTab === 'image-to-video' && !uploadedImage) return;
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  const handleQualityChange = (newQuality: string) => {
    setQuality(newQuality);
    setShowQualityDropdown(false);
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    setShowDurationDropdown(false);
  };

  const handlePremiumFeatureClick = () => {
    navigate('/pricing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-b border-orange-500/20 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="ri-sparkling-line text-orange-400 text-xl"></i>
            <span className="text-white text-sm font-medium">
              🎉 Veo 3 — <span className="text-orange-400 font-semibold">50% Off</span> All Models. Start Creating Now and Make Your Videos Shine!
            </span>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 bg-slate-800/30 p-1 rounded-xl border border-purple-500/20 w-fit mb-8">
          <button
            onClick={() => setActiveTab('image-to-video')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'image-to-video'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Image to video
          </button>
          <button
            onClick={() => setActiveTab('text-to-video')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'text-to-video'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Text to video
          </button>
        </div>

        <div className="grid lg:grid-cols-[420px,1fr] gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Models Selection - 超高层级 */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 relative z-[100]">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-cpu-line text-cyan-400"></i>
                Models
              </h3>
              
              <div className="relative z-[100]">
                <button
                  onClick={() => setShowModelDropdown(!showModelDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <i className={`${selectedModel.icon} text-white text-lg`}></i>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold text-sm">{selectedModel.name}</div>
                      <div className="text-gray-400 text-xs">{selectedModel.description}</div>
                    </div>
                  </div>
                  <i className={`ri-arrow-down-s-line text-cyan-400 text-xl transition-transform ${showModelDropdown ? 'rotate-180' : ''}`}></i>
                </button>
                
                {showModelDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[10000]">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setShowModelDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-all text-left ${
                          selectedModel.id === model.id
                            ? 'bg-cyan-500/20 border-l-4 border-cyan-500'
                            : 'hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <i className={`${model.icon} text-white text-lg`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-sm">{model.name}</div>
                          <div className="text-gray-400 text-xs truncate">{model.description}</div>
                        </div>
                        {selectedModel.id === model.id && (
                          <i className="ri-check-line text-cyan-400 text-xl flex-shrink-0"></i>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload - Only for Image to Video */}
            {activeTab === 'image-to-video' && (
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 relative z-10">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="video-image-upload"
                  onChange={handleImageUpload}
                />
                <label htmlFor="video-image-upload" className="block cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 bg-slate-800/30 hover:bg-purple-500/5 transition-all duration-300 p-8">
                    {uploadedImage ? (
                      <div className="relative">
                        <img src={uploadedImage} alt="Uploaded" className="w-full h-48 object-cover rounded-lg" />
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
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                          <i className="ri-image-add-line text-3xl text-white"></i>
                        </div>
                        <p className="text-sm font-medium text-white mb-1">Click or drop an image here</p>
                        <p className="text-xs text-gray-400">JPG, JPEG, or PNG up to 10 MB</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            )}

            {/* Prompt Input */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 relative z-10">
              <h3 className="text-white font-bold text-base mb-4">Prompt</h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Please describe the video content"
                className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none text-sm"
              />
              <div className="flex justify-end items-center mt-3">
                <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-purple-500/30 hover:border-purple-500/50 text-purple-400 text-xs font-medium rounded-lg transition-all whitespace-nowrap">
                  Prompt Enhance
                </button>
              </div>
            </div>

            {/* Quality Selection */}
            <div className={`relative transition-all ${showQualityDropdown ? 'z-[10000]' : 'z-[100]'}`}>
              <label className="block text-sm font-medium text-gray-300 mb-3">Quality</label>
              <div className="relative z-[100]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQualityDropdown(!showQualityDropdown);
                  }}
                  className="w-full p-4 rounded-xl border-2 border-cyan-500/30 bg-slate-900/50 hover:border-cyan-500/50 transition-all text-left relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold">{getQualityDisplayName(quality)}</span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                        <i className="ri-flashlight-line"></i>
                        {getQualityCredits(quality)}
                      </span>
                    </div>
                    <i className={`ri-arrow-down-s-line text-gray-400 transition-transform ${showQualityDropdown ? 'rotate-180' : ''}`}></i>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showQualityDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[10000]">
                    {/* 720p Quality */}
                    <button
                      type="button"
                      onClick={() => handleQualityChange('720p')}
                      className={`w-full p-4 transition-all text-left hover:bg-slate-800/80 ${
                        quality === '720p' ? 'bg-cyan-500/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">720p</span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                            <i className="ri-flashlight-line"></i>
                            {getQualityCredits('720p')}
                          </span>
                        </div>
                        {quality === '720p' && (
                          <i className="ri-check-line text-cyan-400 text-xl"></i>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">Standard quality, fast generation</p>
                    </button>

                    {/* 480p Quality */}
                    <button
                      type="button"
                      onClick={() => handleQualityChange('480p')}
                      className={`w-full p-4 transition-all text-left hover:bg-slate-800/80 border-t border-cyan-500/10 ${
                        quality === '480p' ? 'bg-purple-500/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">480p</span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                            <i className="ri-flashlight-line"></i>
                            {getQualityCredits('480p')}
                          </span>
                        </div>
                        {quality === '480p' && (
                          <i className="ri-check-line text-purple-400 text-xl"></i>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">Basic quality, fastest generation</p>
                    </button>

                    {/* 1080p Quality */}
                    <button
                      type="button"
                      onClick={() => handleQualityChange('1080p')}
                      className={`w-full p-4 transition-all text-left hover:bg-slate-800/80 border-t border-cyan-500/10 ${
                        quality === '1080p' ? 'bg-purple-500/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">1080p</span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                            <i className="ri-flashlight-line"></i>
                            {getQualityCredits('1080p')}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">
                            VIP
                          </span>
                        </div>
                        {quality === '1080p' && (
                          <i className="ri-check-line text-purple-400 text-xl"></i>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">High quality, detailed output</p>
                    </button>

                    {/* 4K Quality */}
                    <button
                      type="button"
                      onClick={() => handleQualityChange('4k')}
                      className={`w-full p-4 transition-all text-left hover:bg-slate-800/80 border-t border-cyan-500/10 ${
                        quality === '4k' ? 'bg-pink-500/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">4K</span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold">
                            <i className="ri-flashlight-line"></i>
                            {getQualityCredits('4k')}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">
                            VIP
                          </span>
                        </div>
                        {quality === '4k' && (
                          <i className="ri-check-line text-pink-400 text-xl"></i>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">Ultra HD, professional quality</p>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Duration Selection */}
            <div className={`relative transition-all ${showDurationDropdown ? 'z-[10000]' : 'z-[90]'}`}>
              <label className="block text-sm font-medium text-gray-300 mb-3">Duration</label>
              <div className="relative z-[90]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDurationDropdown(!showDurationDropdown);
                  }}
                  className="w-full p-4 rounded-xl border-2 border-cyan-500/30 bg-slate-900/50 hover:border-cyan-500/50 transition-all text-left relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{duration}</span>
                    <i className={`ri-arrow-down-s-line text-gray-400 transition-transform ${showDurationDropdown ? 'rotate-180' : ''}`}></i>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showDurationDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[10000]">
                    {['5s', '3s', '10s', '15s'].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => handleDurationChange(dur)}
                        className={`w-full p-4 transition-all text-left hover:bg-slate-800/80 ${
                          duration === dur ? 'bg-cyan-500/10' : ''
                        } ${dur !== '5s' ? 'border-t border-cyan-500/10' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">{dur}</span>
                          {duration === dur && (
                            <i className="ri-check-line text-cyan-400 text-xl"></i>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Premium Options */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 space-y-4 relative z-10">
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
                      <div className="absolute left-0 bottom-full mb-2 w-56 sm:w-64 p-3 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl z-50">
                        <p className="text-xs text-gray-300 leading-relaxed">
                          Your video may be featured in our Explore feed. See terms for details.
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
                      publicVisibility ? 'bg-purple-600' : 'bg-gray-600'
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
                      <div className="absolute left-0 bottom-full mb-2 w-56 sm:w-64 p-3 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl z-50">
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
                      copyProtection ? 'bg-purple-600' : 'bg-gray-600'
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
              disabled={(activeTab === 'image-to-video' && !uploadedImage) || !prompt.trim() || isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 relative z-10 ${
                (activeTab === 'image-to-video' && !uploadedImage) || !prompt.trim() || isGenerating
                  ? 'bg-gray-700 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105'
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
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs">
                    <i className="ri-flashlight-line"></i>
                    <span>Credits required: 20</span>
                  </div>
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Sample Video */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 relative z-10">
            <h3 className="text-white font-bold text-xl mb-6 text-center">Sample Video</h3>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              <video
                className="w-full h-full object-cover"
                poster="https://images.anyrecover.com/litmediaen/assets/images/lit-video/feature_poster_1.webp"
                controls
                loop
              >
                <source src="https://images.anyrecover.com/litmediaen/assets/video/lit-video/feature_video_1.mp4" type="video/mp4" />
              </video>
              
              {/* Navigation Arrows */}
              <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                <i className="ri-arrow-left-s-line text-white text-xl"></i>
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                <i className="ri-arrow-right-s-line text-white text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
