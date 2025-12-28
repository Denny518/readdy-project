import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function WebApp() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState('HOME');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['AI_IMAGE', 'AI_VIDEO']);
  const [exploreFilter, setExploreFilter] = useState('All');
  
  // AI Image Generator states
  const [imageGenTab, setImageGenTab] = useState<'image-to-image' | 'text-to-image'>('image-to-image');
  const [selectedModel, setSelectedModel] = useState('GPT-4o');
  const [aspectRatio, setAspectRatio] = useState('3:2');
  const [outputFormat, setOutputFormat] = useState('PNG');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAspectRatioDropdown, setShowAspectRatioDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);

  // Image to Video states
  const [videoGenTab, setVideoGenTab] = useState<'image-to-video' | 'text-to-video'>('image-to-video');
  const [videoModel, setVideoModel] = useState('Seedance Pro fast');
  const [videoQuality, setVideoQuality] = useState('720p');
  const [videoDuration, setVideoDuration] = useState('5s');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [uploadedVideoImage, setUploadedVideoImage] = useState<string | null>(null);
  const [showVideoModelDropdown, setShowVideoModelDropdown] = useState(false);
  const [showVideoQualityDropdown, setShowVideoQualityDropdown] = useState(false);
  const [showVideoDurationDropdown, setShowVideoDurationDropdown] = useState(false);
  const [currentVideoExample, setCurrentVideoExample] = useState(0);

  // My Library states
  const [libraryTab, setLibraryTab] = useState<'video' | 'image'>('video');

  // AI Clothes Changer states
  const [clothesChangerImage, setClothesChangerImage] = useState<string | null>(null);
  const [selectedClothesCategory, setSelectedClothesCategory] = useState<'lady' | 'man' | 'custom'>('lady');
  const [selectedClothes, setSelectedClothes] = useState<string | null>(null);
  const [clothesAspectRatio, setClothesAspectRatio] = useState('3:4');
  const [showClothesRatioDropdown, setShowClothesRatioDropdown] = useState(false);

  // AI Character Generator states
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const [characterPrompt, setCharacterPrompt] = useState('');
  const [selectedCharacterStyle, setSelectedCharacterStyle] = useState('anime');
  const [characterGender, setCharacterGender] = useState<'male' | 'female' | 'any'>('any');
  const [characterAge, setCharacterAge] = useState('adult');
  const [showCharacterStyleDropdown, setShowCharacterStyleDropdown] = useState(false);
  const [showCharacterAgeDropdown, setShowCharacterAgeDropdown] = useState(false);

  // Image Enhancer states
  const [enhancerImage, setEnhancerImage] = useState<string | null>(null);
  const [enhancerModel, setEnhancerModel] = useState('Pollo Enhance 1.6');
  const [enhancerScale, setEnhancerScale] = useState('Original');
  const [showEnhancerModelDropdown, setShowEnhancerModelDropdown] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [publicVisibility, setPublicVisibility] = useState(true);
  const [copyProtection, setCopyProtection] = useState(false);
  const [showPublicTooltip, setShowPublicTooltip] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  // Background Remover states
  const [bgRemoverImage, setBgRemoverImage] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // 计算所需积分
  const requiredCredits = enhancerModel === 'Pollo Enhance 1.6' ? 10 : 25;

  // 处理高级功能点击
  const handlePremiumFeatureClick = () => {
    navigate('/pricing');
  };

  // 当切换菜单时,重置所有下拉菜单状态
  useEffect(() => {
    setShowModelDropdown(false);
    setShowAspectRatioDropdown(false);
    setShowFormatDropdown(false);
    setShowVideoModelDropdown(false);
    setShowVideoQualityDropdown(false);
    setShowVideoDurationDropdown(false);
    setShowClothesRatioDropdown(false);
    setShowCharacterStyleDropdown(false);
    setShowCharacterAgeDropdown(false);
    setShowEnhancerModelDropdown(false);
  }, [selectedMenu]);

  // Close all dropdowns when navigating
  useEffect(() => {
    const handleNavigation = () => {
      setShowModelDropdown(false);
      setShowAspectRatioDropdown(false);
      setShowFormatDropdown(false);
      setShowVideoModelDropdown(false);
      setShowVideoQualityDropdown(false);
      setShowVideoDurationDropdown(false);
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Close dropdowns when active section changes
  useEffect(() => {
    setShowModelDropdown(false);
    setShowAspectRatioDropdown(false);
    setShowFormatDropdown(false);
    setShowVideoModelDropdown(false);
    setShowVideoQualityDropdown(false);
    setShowVideoDurationDropdown(false);
  }, [selectedMenu]);

  // Models data for AI Image Generator
  const models = [
    { id: 'GPT-4o', name: 'GPT-4o', description: 'High quality AI model', isPro: true },
    { id: 'FLUX Pro', name: 'FLUX Pro', description: 'Professional image generation', isPro: true },
    { id: 'FLUX Dev', name: 'FLUX Dev', description: 'Development model', isPro: false },
    { id: 'Stable Diffusion XL', name: 'Stable Diffusion XL', description: 'Classic stable model', isPro: false },
    { id: 'Nano Banana Pro', name: 'Nano Banana Pro', description: 'Fast generation', isPro: true }
  ];

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleMenuClick = (menuId: string) => {
    // 如果点击 AI Image Effects,跳转到 Explore 页面并设置 Image Effects 分类
    if (menuId === 'AI_IMAGE_EFFECTS') {
      setSelectedMenu('EXPLORE');
      setExploreFilter('Image Effects');
      setIsMobileSidebarOpen(false); // 移动端关闭侧边栏
      return;
    }
    
    // 如果点击 AI Video Effects,跳转到 Explore 页面并设置 Video Effects 分类
    if (menuId === 'AI_VIDEO_EFFECTS') {
      setSelectedMenu('EXPLORE');
      setExploreFilter('Video Effects');
      setIsMobileSidebarOpen(false); // 移动端关闭侧边栏
      return;
    }
    
    // 如果点击 AI Video Generator,直接在 WebApp 内部显示内容
    if (menuId === 'AI_VIDEO_GENERATOR') {
      setSelectedMenu('AI_VIDEO_GENERATOR');
      setIsMobileSidebarOpen(false); // 移动端关闭侧边栏
      return;
    }
    
    setSelectedMenu(menuId);
    setIsMobileSidebarOpen(false); // 移动端关闭侧边栏
  };

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

  const handleVideoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedVideoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickActionClick = (actionId: string) => {
    switch (actionId) {
      case 'image-to-video':
        setSelectedMenu('AI_VIDEO_GENERATOR');
        setVideoGenTab('image-to-video');
        break;
      case 'text-to-video':
        setSelectedMenu('AI_VIDEO_GENERATOR');
        setVideoGenTab('text-to-video');
        break;
      case 'video-effects':
        setSelectedMenu('EXPLORE');
        setExploreFilter('Video Effects');
        break;
      case 'image-to-image':
        setSelectedMenu('AI_IMAGE_GENERATOR');
        setImageGenTab('image-to-image');
        break;
      case 'text-to-image':
        setSelectedMenu('AI_IMAGE_GENERATOR');
        setImageGenTab('text-to-image');
        break;
      case 'image-effects':
        setSelectedMenu('EXPLORE');
        setExploreFilter('Image Effects');
        break;
      case 'clothes-changer':
        setSelectedMenu('AI_CLOTHES_CHANGER');
        break;
      case 'face-swap':
        setSelectedMenu('FACE_SWAP_VIDEO');
        break;
      default:
        break;
    }
  };

  const handleClothesImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClothesChangerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCharacterImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacterImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhancerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEnhancerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBgRemoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgRemoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    {
      id: 'HOME',
      label: 'Home',
      icon: 'ri-home-4-line',
      type: 'single'
    },
    {
      id: 'EXPLORE',
      label: 'Explore',
      icon: 'ri-compass-3-line',
      type: 'single'
    },
    {
      id: 'AI_IMAGE',
      label: 'AI Image',
      icon: 'ri-image-line',
      type: 'group',
      submenu: [
        { id: 'AI_IMAGE_GENERATOR', label: 'AI Image Generator' },
        { id: 'AI_IMAGE_EFFECTS', label: 'AI Image Effects' }
      ]
    },
    {
      id: 'AI_VIDEO',
      label: 'AI Video',
      icon: 'ri-video-line',
      type: 'group',
      submenu: [
        { id: 'AI_VIDEO_GENERATOR', label: 'AI Video Generator' },
        { id: 'AI_VIDEO_EFFECTS', label: 'AI Video Effects' }
      ]
    },
    {
      id: 'AI_TOOL',
      label: 'AI Tool',
      icon: 'ri-tools-line',
      type: 'group',
      submenu: [
        { id: 'AI_IMAGE_TOOLS', label: 'AI Image Tools', isCategory: true },
        { id: 'AI_CLOTHES_CHANGER', label: 'AI Clothes Changer' },
        { id: 'AI_CHARACTER_GENERATOR', label: 'AI Character Generator' },
        { id: 'IMAGE_ENHANCER', label: 'Image Enhancer' },
        { id: 'IMAGE_UPSCALER', label: 'Image Upscaler' },
        { id: 'BACKGROUND_REMOVER', label: 'Background Remover' },
        { id: 'AI_VIDEO_TOOLS', label: 'AI Video Tools', isCategory: true },
        { id: 'AI_VIDEO_EXTENDER', label: 'AI Video Extender' },
        { id: 'LIP_SYNC_AI', label: 'Lip Sync AI' },
        { id: 'IMAGE_TO_ANIMATION', label: 'Image to Animation AI' },
        { id: 'VIDEO_UPSCALER', label: 'Video Upscaler' },
        { id: 'VIDEO_ENHANCER', label: 'Video Enhancer' },
        { id: 'FACE_SWAP_VIDEO', label: 'Face Swap Video' }
      ]
    },
    {
      id: 'MY_LIBRARY',
      label: 'My Library',
      icon: 'ri-folder-line',
      type: 'single'
    }
  ];

  const featureCards = [
    {
      title: 'Image to Video',
      icon: 'ri-image-line',
      video: 'https://images.anyrecover.com/litmediaen/assets/video/lit-video/feature_video_1.mp4',
      poster: 'https://images.anyrecover.com/litmediaen/assets/images/lit-video/feature_poster_1.webp'
    },
    {
      title: 'Text to Video',
      icon: 'ri-file-text-line',
      video: 'https://images.anyrecover.com/litmediaen/assets/video/lit-video/feature_video_2.mp4',
      poster: 'https://images.anyrecover.com/litmediaen/assets/images/lit-video/feature_poster_2.webp'
    },
    {
      title: 'Video Effects',
      icon: 'ri-magic-line',
      video: 'https://images.anyrecover.com/litmediaen/assets/video/lit-video/feature_video_3.mp4',
      poster: 'https://images.anyrecover.com/litmediaen/assets/images/lit-video/feature_poster_3.webp'
    },
    {
      title: 'Image Generate',
      icon: 'ri-image-add-line',
      video: 'https://images.anyrecover.com/litmediaen/assets/video/lit-video/feature_video_4.mp4',
      poster: 'https://images.anyrecover.com/litmediaen/assets/images/lit-video/feature_poster_4.webp'
    },
    {
      title: 'Face Swap',
      icon: 'ri-user-smile-line',
      video: 'https://images.anyrecover.com/litmediaen/assets/video/lit-video/feature_video_6.mp4',
      poster: 'https://images.anyrecover.com/litmediaen/assets/images/lit-video/feature_poster_6.webp'
    }
  ];

  const popularVideos = [
    {
      title: 'Kiss your lover',
      poster: 'https://app-images.litmedia.ai/upload/default/20251215/78a4f8bb2a32aa2efa5e3130cad2e521.webp',
      video: 'https://app-images.litmedia.ai/upload/admin/20251215/4ccfcb500d976144948c61f46887383f.mp4'
    },
    {
      title: 'Christmas',
      poster: 'https://app-images.litmedia.ai/upload/default/20251212/ad568002abb5a3fa9ebe3ab088c00dc2.webp',
      video: 'https://app-images.litmedia.ai/upload/admin/20251212/46b5f93db76865d1907354f72aaf2749.mp4'
    },
    {
      title: 'Group photo at the filming location',
      poster: 'https://app-images.litmedia.ai/upload/default/20251226/b7b371d4dc71efc4f327734147725f07.webp',
      video: 'https://app-images.litmedia.ai/upload/admin/20251226/97bda80f77c71e35e4e4dfbb87e7afff.mp4'
    },
    {
      title: 'Face Swap',
      poster: 'https://app-images.litmedia.ai/upload/default/20251226/45b8262e4026c1f107e7b44cac8068a8.webp',
      video: 'https://app-images.litmedia.ai/upload/admin/20251226/a45136c90071669ffa53111d0d9dc03b.mp4'
    }
  ];

  // Quick Actions
  const quickActions = [
    {
      id: 'image-to-video',
      title: 'Image to Video',
      description: 'Transform static images into dynamic videos',
      icon: 'ri-image-2-line',
      gradient: 'from-cyan-500 to-blue-600',
      image: 'https://readdy.ai/api/search-image?query=AI%20image%20to%20video%20transformation%20static%20photo%20becoming%20animated%20video%20motion%20graphics%20technology%20creative%20design%20simple%20dark%20background&width=400&height=300&seq=quick-img2vid-001&orientation=landscape'
    },
    {
      id: 'text-to-video',
      title: 'Text to Video',
      description: 'Create videos from text descriptions',
      icon: 'ri-file-text-line',
      gradient: 'from-purple-500 to-pink-600',
      image: 'https://readdy.ai/api/search-image?query=AI%20text%20to%20video%20generation%20words%20transforming%20into%20video%20content%20creative%20storytelling%20technology%20simple%20dark%20background&width=400&height=300&seq=quick-txt2vid-001&orientation=landscape'
    },
    {
      id: 'video-effects',
      title: 'Video Effects',
      description: 'Apply stunning effects to your videos',
      icon: 'ri-magic-line',
      gradient: 'from-orange-500 to-red-600',
      image: 'https://readdy.ai/api/search-image?query=video%20effects%20visual%20effects%20special%20effects%20cinematic%20filters%20colorful%20light%20effects%20modern%20technology%20simple%20dark%20background&width=400&height=300&seq=quick-vidfx-001&orientation=landscape'
    },
    {
      id: 'image-to-image',
      title: 'Image to Image',
      description: 'Transform images with AI',
      icon: 'ri-image-edit-line',
      gradient: 'from-green-500 to-emerald-600',
      image: 'https://readdy.ai/api/search-image?query=AI%20image%20transformation%20editing%20photo%20manipulation%20digital%20art%20creation%20modern%20technology%20creative%20design%20simple%20dark%20background&width=400&height=300&seq=quick-img2img-001&orientation=landscape'
    },
    {
      id: 'text-to-image',
      title: 'Text to Image',
      description: 'Generate images from text',
      icon: 'ri-image-add-line',
      gradient: 'from-blue-500 to-indigo-600',
      image: 'https://readdy.ai/api/search-image?query=AI%20text%20to%20image%20generation%20digital%20art%20creation%20colorful%20abstract%20artwork%20modern%20technology%20creative%20design%20simple%20dark%20background&width=400&height=300&seq=quick-txt2img-001&orientation=landscape'
    },
    {
      id: 'image-effects',
      title: 'Image Effects',
      description: 'Apply creative effects to images',
      icon: 'ri-contrast-2-line',
      gradient: 'from-pink-500 to-rose-600',
      image: 'https://readdy.ai/api/search-image?query=image%20effects%20filters%20visual%20effects%20photo%20editing%20colorful%20light%20effects%20artistic%20filters%20modern%20technology%20simple%20dark%20background&width=400&height=300&seq=quick-imgfx-001&orientation=landscape'
    },
    {
      id: 'clothes-changer',
      title: 'Clothes Changer',
      description: 'Change outfits with AI',
      icon: 'ri-shirt-line',
      gradient: 'from-amber-500 to-orange-600',
      image: 'https://readdy.ai/api/search-image?query=AI%20clothes%20changing%20fashion%20transformation%20outfit%20swap%20virtual%20try-on%20modern%20technology%20simple%20background&width=400&height=300&seq=quick-clothes-001&orientation=landscape'
    },
    {
      id: 'face-swap',
      title: 'Face Swap',
      description: 'Swap faces in photos and videos',
      icon: 'ri-user-smile-line',
      gradient: 'from-teal-500 to-cyan-600',
      image: 'https://readdy.ai/api/search-image?query=AI%20face%20swap%20technology%20facial%20recognition%20face%20replacement%20digital%20transformation%20modern%20AI%20technology%20simple%20dark%20background&width=400&height=300&seq=quick-faceswap-001&orientation=landscape'
    }
  ];

  // Trending Videos
  const trendingVideos = [
    {
      id: 1,
      title: 'Kiss your lover',
      video: 'https://public.readdy.ai/ai/video_res/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.mp4',
      thumbnail: 'https://public.readdy.ai/ai/img_res/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.jpg',
      tag: 'Hot',
      tagColor: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      title: 'Christmas',
      video: 'https://public.readdy.ai/ai/video_res/b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7.mp4',
      thumbnail: 'https://public.readdy.ai/ai/img_res/b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7.jpg',
      tag: 'New',
      tagColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'Taking photos on set',
      video: 'https://public.readdy.ai/ai/video_res/c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8.mp4',
      thumbnail: 'https://public.readdy.ai/ai/img_res/c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8.jpg',
      tag: 'Trending',
      tagColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'Face Swap',
      video: 'https://public.readdy.ai/ai/video_res/d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9.mp4',
      thumbnail: 'https://public.readdy.ai/ai/img_res/d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9.jpg',
      tag: 'Popular',
      tagColor: 'from-cyan-500 to-blue-500'
    }
  ];

  // Video Models
  const videoModels = [
    {
      id: 1,
      name: 'Sora 2',
      description: 'Next-gen video generation',
      thumbnail: 'https://public.readdy.ai/ai/img_res/sora2_model_preview.jpg',
      tag: 'Hot',
      tagColor: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      name: 'Seedance 1.5 Pro',
      description: 'Professional dance videos',
      thumbnail: 'https://public.readdy.ai/ai/img_res/seedance_model_preview.jpg',
      tag: 'New',
      tagColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      name: 'Wan 2.5',
      description: 'Advanced AI video',
      thumbnail: 'https://public.readdy.ai/ai/img_res/wan25_model_preview.jpg',
      tag: '75% off',
      tagColor: 'from-yellow-500 to-orange-500'
    },
    {
      id: 4,
      name: 'LoveAI 1.0',
      description: 'Romantic video effects',
      thumbnail: 'https://public.readdy.ai/ai/img_res/loveai_model_preview.jpg',
      tag: 'Popular',
      tagColor: 'from-pink-500 to-rose-500'
    },
    {
      id: 5,
      name: 'Veo 3.1 Fast',
      description: 'Lightning fast generation',
      thumbnail: 'https://public.readdy.ai/ai/img_res/veo31_model_preview.jpg',
      tag: 'Fast',
      tagColor: 'from-cyan-500 to-blue-500'
    },
    {
      id: 6,
      name: 'Vidu Q2 Pro',
      description: 'Professional quality',
      thumbnail: 'https://public.readdy.ai/ai/img_res/viduq2_model_preview.jpg',
      tag: 'Pro',
      tagColor: 'from-purple-500 to-indigo-500'
    }
  ];

  // Image Models
  const imageModels = [
    {
      id: 1,
      name: 'Nano Banana Pro',
      description: 'High-quality image generation',
      thumbnail: 'https://public.readdy.ai/ai/img_res/nanobanana_model_preview.jpg',
      tag: 'Hot',
      tagColor: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      name: 'Flux.1',
      description: 'Advanced image AI',
      thumbnail: 'https://public.readdy.ai/ai/img_res/flux1_model_preview.jpg',
      tag: 'New',
      tagColor: 'from-green-500 to-emerald-500'
    }
  ];

  const exploreCategories = ['All', 'Video Effects', 'Image Effects', 'Kiss your lover', 'Hot Dance', 'Christmas', 'Taking photos on set', 'Trending'];

  // Gallery items with more content
  const galleryItems = {
    all: [
      { id: 1, title: 'Innocent Kiss', views: 737, image: 'https://readdy.ai/api/search-image?query=romantic%20innocent%20kiss%20moment%20between%20couple%20tender%20loving%20embrace%20soft%20lighting%20intimate%20scene%20simple%20background&width=400&height=500&seq=innocent-kiss-001&orientation=portrait', category: 'Video Effects' },
      { id: 2, title: 'Diving III', views: 697, image: 'https://readdy.ai/api/search-image?query=underwater%20diving%20scene%20crystal%20clear%20water%20swimming%20motion%20dynamic%20movement%20ocean%20exploration%20simple%20background&width=400&height=500&seq=diving-three-001&orientation=portrait', category: 'Video Effects' },
      { id: 3, title: 'Squid Game', views: 171, image: 'https://readdy.ai/api/search-image?query=squid%20game%20inspired%20scene%20dramatic%20lighting%20intense%20atmosphere%20survival%20game%20aesthetic%20korean%20drama%20style%20simple%20background&width=400&height=500&seq=squid-game-001&orientation=portrait', category: 'Video Effects' },
      { id: 4, title: 'Live2D', views: 281, image: 'https://readdy.ai/api/search-image?query=live2d%20anime%20character%20animation%20cute%20kawaii%20style%20vibrant%20colors%20dynamic%20pose%20japanese%20animation%20aesthetic%20simple%20background&width=400&height=500&seq=live2d-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 5, title: 'Moto Dance', views: 325, image: 'https://readdy.ai/api/search-image?query=energetic%20motorcycle%20dance%20performance%20dynamic%20movement%20urban%20street%20style%20cool%20attitude%20action%20pose%20simple%20background&width=400&height=500&seq=moto-dance-001&orientation=portrait', category: 'Video Effects' },
      { id: 6, title: 'Wedding Dress', views: 8054, image: 'https://readdy.ai/api/search-image?query=elegant%20wedding%20dress%20bridal%20gown%20white%20lace%20beautiful%20bride%20romantic%20wedding%20photography%20simple%20background&width=400&height=500&seq=wedding-dress-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 7, title: 'Cosplay', views: 363, image: 'https://readdy.ai/api/search-image?query=anime%20cosplay%20costume%20detailed%20outfit%20character%20portrayal%20vibrant%20colors%20creative%20makeup%20fantasy%20style%20simple%20background&width=400&height=500&seq=cosplay-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 8, title: 'Maid Outfit', views: 523, image: 'https://readdy.ai/api/search-image?query=cute%20maid%20outfit%20costume%20kawaii%20style%20black%20and%20white%20dress%20anime%20inspired%20fashion%20simple%20background&width=400&height=500&seq=maid-outfit-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 9, title: 'Christmas Dress', views: 314, image: 'https://readdy.ai/api/search-image?query=festive%20christmas%20dress%20red%20and%20white%20outfit%20holiday%20fashion%20santa%20inspired%20costume%20winter%20celebration%20simple%20background&width=400&height=500&seq=christmas-dress-001&orientation=portrait', category: 'Image Effects' },
      { id: 10, title: 'Heartfelt Vow', views: 244, image: 'https://readdy.ai/api/search-image?query=emotional%20wedding%20vow%20moment%20couple%20holding%20hands%20romantic%20ceremony%20heartfelt%20expression%20love%20and%20commitment%20simple%20background&width=400&height=500&seq=heartfelt-vow-001&orientation=portrait', category: 'Video Effects' },
      { id: 11, title: 'Clay', views: 118, image: 'https://readdy.ai/api/search-image?query=clay%20animation%20style%203d%20character%20cute%20claymation%20aesthetic%20stop%20motion%20art%20playful%20design%20simple%20background&width=400&height=500&seq=clay-001&orientation=portrait', category: 'Image Effects' },
      { id: 12, title: 'Halo Soldier', views: 161, image: 'https://readdy.ai/api/search-image?query=halo%20soldier%20armor%20futuristic%20military%20suit%20sci-fi%20warrior%20master%20chief%20inspired%20gaming%20character%20simple%20background&width=400&height=500&seq=halo-soldier-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 13, title: 'Travel to the Jurassic', views: 89, image: 'https://readdy.ai/api/search-image?query=jurassic%20park%20adventure%20dinosaur%20era%20prehistoric%20landscape%20time%20travel%20adventure%20movie%20inspired%20scene%20simple%20background&width=400&height=500&seq=jurassic-001&orientation=portrait', category: 'Video Effects' },
      { id: 14, title: 'Back View Twerk', views: 740, image: 'https://readdy.ai/api/search-image?query=dynamic%20dance%20movement%20twerk%20performance%20energetic%20motion%20back%20view%20dance%20pose%20urban%20dance%20style%20simple%20background&width=400&height=500&seq=back-twerk-001&orientation=portrait', category: 'Video Effects' },
      { id: 15, title: 'Swing Swing', views: 788, image: 'https://readdy.ai/api/search-image?query=playful%20swing%20motion%20outdoor%20playground%20joyful%20movement%20carefree%20moment%20fun%20activity%20simple%20background&width=400&height=500&seq=swing-swing-001&orientation=portrait', category: 'Video Effects' },
      { id: 16, title: 'Jedi Knight', views: 172, image: 'https://readdy.ai/api/search-image?query=star%20wars%20jedi%20knight%20lightsaber%20warrior%20force%20user%20sci-fi%20character%20heroic%20pose%20simple%20background&width=400&height=500&seq=jedi-knight-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 17, title: 'Bodysuit', views: 174, image: 'https://readdy.ai/api/search-image?query=sleek%20bodysuit%20outfit%20form-fitting%20costume%20athletic%20wear%20modern%20fashion%20futuristic%20design%20simple%20background&width=400&height=500&seq=bodysuit-001&orientation=portrait', category: 'Image Effects' },
      { id: 18, title: 'Dance', views: 126, image: 'https://readdy.ai/api/search-image?query=energetic%20dance%20performance%20dynamic%20movement%20choreography%20artistic%20expression%20dance%20pose%20simple%20background&width=400&height=500&seq=dance-001&orientation=portrait', category: 'Video Effects' },
      { id: 19, title: 'Get Maserati', views: 65, image: 'https://readdy.ai/api/search-image?query=luxury%20maserati%20sports%20car%20elegant%20automobile%20premium%20vehicle%20automotive%20photography%20simple%20background&width=400&height=500&seq=maserati-001&orientation=portrait', category: 'Video Effects' },
      { id: 20, title: 'Pumpkin Headgear', views: 38, image: 'https://readdy.ai/api/search-image?query=halloween%20pumpkin%20headgear%20costume%20jack-o-lantern%20mask%20festive%20halloween%20outfit%20spooky%20decoration%20simple%20background&width=400&height=500&seq=pumpkin-head-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 21, title: 'Pick up your action figure', views: 46, image: 'https://readdy.ai/api/search-image?query=collectible%20action%20figure%20toy%20photography%20detailed%20figurine%20character%20model%20hobby%20collection%20simple%20background&width=400&height=500&seq=action-figure-001&orientation=portrait', category: 'Video Effects' },
      { id: 22, title: 'Gothic Style', views: 130, image: 'https://readdy.ai/api/search-image?query=gothic%20fashion%20style%20dark%20aesthetic%20victorian%20inspired%20outfit%20black%20clothing%20dramatic%20makeup%20simple%20background&width=400&height=500&seq=gothic-style-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 23, title: 'Sofa Kiss', views: 16611, image: 'https://readdy.ai/api/search-image?query=romantic%20couple%20kissing%20on%20sofa%20intimate%20moment%20cozy%20living%20room%20loving%20embrace%20tender%20scene%20simple%20background&width=400&height=500&seq=sofa-kiss-001&orientation=portrait', category: 'Video Effects', tag: 'LitAI 5' },
      { id: 24, title: 'Getting Fat', views: 151, image: 'https://readdy.ai/api/search-image?query=body%20transformation%20weight%20gain%20visual%20effect%20before%20and%20after%20comparison%20humorous%20scene%20simple%20background&width=400&height=500&seq=getting-fat-001&orientation=portrait', category: 'Video Effects' },
      { id: 25, title: 'Silent Hill', views: 126, image: 'https://readdy.ai/api/search-image?query=silent%20hill%20horror%20atmosphere%20foggy%20environment%20eerie%20scene%20psychological%20horror%20game%20inspired%20dark%20mood%20simple%20background&width=400&height=500&seq=silent-hill-001&orientation=portrait', category: 'Video Effects' },
      { id: 26, title: 'Cute Figure', views: 159, image: 'https://readdy.ai/api/search-image?query=adorable%20cute%20figure%20chibi%20style%20kawaii%20character%20miniature%20collectible%20toy%20photography%20simple%20background&width=400&height=500&seq=cute-figure-001&orientation=portrait', category: 'Image Effects' },
      { id: 27, title: 'Star Wars', views: 15, image: 'https://readdy.ai/api/search-image?query=star%20wars%20universe%20sci-fi%20scene%20galactic%20adventure%20space%20opera%20iconic%20characters%20epic%20saga%20simple%20background&width=400&height=500&seq=star-wars-001&orientation=portrait', category: 'Video Effects' },
      { id: 28, title: 'Friends', views: 2, image: 'https://readdy.ai/api/search-image?query=group%20of%20friends%20together%20friendship%20bonding%20happy%20moment%20social%20gathering%20casual%20hangout%20simple%20background&width=400&height=500&seq=friends-001&orientation=portrait', category: 'Video Effects' },
      { id: 29, title: 'S Family', views: 120, image: 'https://readdy.ai/api/search-image?query=family%20portrait%20group%20photo%20loving%20family%20members%20together%20family%20bonding%20warm%20atmosphere%20simple%20background&width=400&height=500&seq=s-family-001&orientation=portrait', category: 'Video Effects' },
      { id: 30, title: 'Dance Performance', views: 167, image: 'https://readdy.ai/api/search-image?query=professional%20dance%20performance%20stage%20show%20artistic%20movement%20choreographed%20routine%20performance%20art%20simple%20background&width=400&height=500&seq=dance-perf-001&orientation=portrait', category: 'Video Effects' },
      { id: 31, title: 'Lolita', views: 396, image: 'https://readdy.ai/api/search-image?query=lolita%20fashion%20style%20japanese%20street%20fashion%20cute%20frilly%20dress%20victorian%20inspired%20outfit%20kawaii%20aesthetic%20simple%20background&width=400&height=500&seq=lolita-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 32, title: 'Siberian Tiger', views: 154, image: 'https://readdy.ai/api/search-image?query=majestic%20siberian%20tiger%20powerful%20wild%20animal%20wildlife%20photography%20big%20cat%20predator%20nature%20scene%20simple%20background&width=400&height=500&seq=siberian-tiger-001&orientation=portrait', category: 'Image Effects' },
      { id: 33, title: 'Love Punch', views: 301, image: 'https://readdy.ai/api/search-image?query=playful%20love%20punch%20gesture%20cute%20couple%20interaction%20romantic%20comedy%20moment%20affectionate%20play%20simple%20background&width=400&height=500&seq=love-punch-001&orientation=portrait', category: 'Video Effects', tag: 'LitAI 5' },
      { id: 34, title: 'X-Ray Outfit', views: 252, image: 'https://readdy.ai/api/search-image?query=futuristic%20x-ray%20effect%20outfit%20transparent%20fashion%20sci-fi%20clothing%20innovative%20design%20tech-inspired%20simple%20background&width=400&height=500&seq=xray-outfit-001&orientation=portrait', category: 'Image Effects' },
      { id: 35, title: 'Intense French Kiss Pro', views: 21898, image: 'https://readdy.ai/api/search-image?query=passionate%20french%20kiss%20romantic%20couple%20intimate%20moment%20deep%20kiss%20loving%20embrace%20cinematic%20lighting%20simple%20background&width=400&height=500&seq=french-kiss-pro-001&orientation=portrait', category: 'Video Effects', tag: 'LitAI 5' },
      { id: 36, title: 'Anime Cosplay', views: 492, image: 'https://readdy.ai/api/search-image?query=detailed%20anime%20cosplay%20character%20costume%20accurate%20portrayal%20manga%20inspired%20outfit%20convention%20photography%20simple%20background&width=400&height=500&seq=anime-cosplay-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 37, title: 'Ken Figure', views: 115, image: 'https://readdy.ai/api/search-image?query=ken%20doll%20figure%20barbie%20boyfriend%20toy%20photography%20collectible%20doll%20fashion%20doll%20male%20figure%20simple%20background&width=400&height=500&seq=ken-figure-001&orientation=portrait', category: 'Image Effects' },
      { id: 38, title: 'Iron Man', views: 5, image: 'https://readdy.ai/api/search-image?query=iron%20man%20armor%20marvel%20superhero%20tony%20stark%20suit%20red%20and%20gold%20armor%20high-tech%20suit%20simple%20background&width=400&height=500&seq=iron-man-001&orientation=portrait', category: 'Video Effects' },
      { id: 39, title: 'Captain America', views: 3, image: 'https://readdy.ai/api/search-image?query=captain%20america%20shield%20marvel%20superhero%20steve%20rogers%20patriotic%20hero%20avengers%20character%20simple%20background&width=400&height=500&seq=captain-america-001&orientation=portrait', category: 'Video Effects' },
      { id: 40, title: 'Black Horse', views: 151, image: 'https://readdy.ai/api/search-image?query=majestic%20black%20horse%20powerful%20stallion%20equine%20beauty%20wild%20horse%20running%20elegant%20animal%20photography%20simple%20background&width=400&height=500&seq=black-horse-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' }
    ],
    videoEffects: [
      { id: 1, title: 'Innocent Kiss', views: 737, image: 'https://readdy.ai/api/search-image?query=romantic%20innocent%20kiss%20moment%20between%20couple%20tender%20loving%20embrace%20soft%20lighting%20intimate%20scene%20simple%20background&width=400&height=500&seq=innocent-kiss-001&orientation=portrait', category: 'Video Effects' },
      { id: 2, title: 'Diving III', views: 697, image: 'https://readdy.ai/api/search-image?query=underwater%20diving%20scene%20crystal%20clear%20water%20swimming%20motion%20dynamic%20movement%20ocean%20exploration%20simple%20background&width=400&height=500&seq=diving-three-001&orientation=portrait', category: 'Video Effects' },
      { id: 3, title: 'Squid Game', views: 171, image: 'https://readdy.ai/api/search-image?query=squid%20game%20inspired%20scene%20dramatic%20lighting%20intense%20atmosphere%20survival%20game%20aesthetic%20korean%20drama%20style%20simple%20background&width=400&height=500&seq=squid-game-001&orientation=portrait', category: 'Video Effects' },
      { id: 5, title: 'Moto Dance', views: 325, image: 'https://readdy.ai/api/search-image?query=energetic%20motorcycle%20dance%20performance%20dynamic%20movement%20urban%20street%20style%20cool%20attitude%20action%20pose%20simple%20background&width=400&height=500&seq=moto-dance-001&orientation=portrait', category: 'Video Effects' },
      { id: 10, title: 'Heartfelt Vow', views: 244, image: 'https://readdy.ai/api/search-image?query=emotional%20wedding%20vow%20moment%20couple%20holding%20hands%20romantic%20ceremony%20heartfelt%20expression%20love%20and%20commitment%20simple%20background&width=400&height=500&seq=heartfelt-vow-001&orientation=portrait', category: 'Video Effects' },
      { id: 13, title: 'Travel to the Jurassic', views: 89, image: 'https://readdy.ai/api/search-image?query=jurassic%20park%20adventure%20dinosaur%20era%20prehistoric%20landscape%20time%20travel%20adventure%20movie%20inspired%20scene%20simple%20background&width=400&height=500&seq=jurassic-001&orientation=portrait', category: 'Video Effects' },
      { id: 14, title: 'Back View Twerk', views: 740, image: 'https://readdy.ai/api/search-image?query=dynamic%20dance%20movement%20twerk%20performance%20energetic%20motion%20back%20view%20dance%20pose%20urban%20dance%20style%20simple%20background&width=400&height=500&seq=back-twerk-001&orientation=portrait', category: 'Video Effects' },
      { id: 15, title: 'Swing Swing', views: 788, image: 'https://readdy.ai/api/search-image?query=playful%20swing%20motion%20outdoor%20playground%20joyful%20movement%20carefree%20moment%20fun%20activity%20simple%20background&width=400&height=500&seq=swing-swing-001&orientation=portrait', category: 'Video Effects' },
      { id: 18, title: 'Dance', views: 126, image: 'https://readdy.ai/api/search-image?query=energetic%20dance%20performance%20dynamic%20movement%20choreography%20artistic%20expression%20dance%20pose%20simple%20background&width=400&height=500&seq=dance-001&orientation=portrait', category: 'Video Effects' },
      { id: 19, title: 'Get Maserati', views: 65, image: 'https://readdy.ai/api/search-image?query=luxury%20maserati%20sports%20car%20elegant%20automobile%20premium%20vehicle%20automotive%20photography%20simple%20background&width=400&height=500&seq=maserati-001&orientation=portrait', category: 'Video Effects' },
      { id: 21, title: 'Pick up your action figure', views: 46, image: 'https://readdy.ai/api/search-image?query=collectible%20action%20figure%20toy%20photography%20detailed%20figurine%20character%20model%20hobby%20collection%20simple%20background&width=400&height=500&seq=action-figure-001&orientation=portrait', category: 'Video Effects' },
      { id: 23, title: 'Sofa Kiss', views: 16611, image: 'https://readdy.ai/api/search-image?query=romantic%20couple%20kissing%20on%20sofa%20intimate%20moment%20cozy%20living%20room%20loving%20embrace%20tender%20scene%20simple%20background&width=400&height=500&seq=sofa-kiss-001&orientation=portrait', category: 'Video Effects', tag: 'LitAI 5' },
      { id: 24, title: 'Getting Fat', views: 151, image: 'https://readdy.ai/api/search-image?query=body%20transformation%20weight%20gain%20visual%20effect%20before%20and%20after%20comparison%20humorous%20scene%20simple%20background&width=400&height=500&seq=getting-fat-001&orientation=portrait', category: 'Video Effects' },
      { id: 25, title: 'Silent Hill', views: 126, image: 'https://readdy.ai/api/search-image?query=silent%20hill%20horror%20atmosphere%20foggy%20environment%20eerie%20scene%20psychological%20horror%20game%20inspired%20dark%20mood%20simple%20background&width=400&height=500&seq=silent-hill-001&orientation=portrait', category: 'Video Effects' },
      { id: 27, title: 'Star Wars', views: 15, image: 'https://readdy.ai/api/search-image?query=star%20wars%20universe%20sci-fi%20scene%20galactic%20adventure%20space%20opera%20iconic%20characters%20epic%20saga%20simple%20background&width=400&height=500&seq=star-wars-001&orientation=portrait', category: 'Video Effects' },
      { id: 28, title: 'Friends', views: 2, image: 'https://readdy.ai/api/search-image?query=group%20of%20friends%20together%20friendship%20bonding%20happy%20moment%20social%20gathering%20casual%20hangout%20simple%20background&width=400&height=500&seq=friends-001&orientation=portrait', category: 'Video Effects' },
      { id: 29, title: 'S Family', views: 120, image: 'https://readdy.ai/api/search-image?query=family%20portrait%20group%20photo%20loving%20family%20members%20together%20family%20bonding%20warm%20atmosphere%20simple%20background&width=400&height=500&seq=s-family-001&orientation=portrait', category: 'Video Effects' },
      { id: 30, title: 'Dance Performance', views: 167, image: 'https://readdy.ai/api/search-image?query=professional%20dance%20performance%20stage%20show%20artistic%20movement%20choreographed%20routine%20performance%20art%20simple%20background&width=400&height=500&seq=dance-perf-001&orientation=portrait', category: 'Video Effects' },
      { id: 33, title: 'Love Punch', views: 301, image: 'https://readdy.ai/api/search-image?query=playful%20love%20punch%20gesture%20cute%20couple%20interaction%20romantic%20comedy%20moment%20affectionate%20play%20simple%20background&width=400&height=500&seq=love-punch-001&orientation=portrait', category: 'Video Effects', tag: 'LitAI 5' },
      { id: 35, title: 'Intense French Kiss Pro', views: 21898, image: 'https://readdy.ai/api/search-image?query=passionate%20french%20kiss%20romantic%20couple%20intimate%20moment%20deep%20kiss%20loving%20embrace%20cinematic%20lighting%20simple%20background&width=400&height=500&seq=french-kiss-pro-001&orientation=portrait', category: 'Video Effects', tag: 'LitAI 5' },
      { id: 38, title: 'Iron Man', views: 5, image: 'https://readdy.ai/api/search-image?query=iron%20man%20armor%20marvel%20superhero%20tony%20stark%20suit%20red%20and%20gold%20armor%20high-tech%20suit%20simple%20background&width=400&height=500&seq=iron-man-001&orientation=portrait', category: 'Video Effects' },
      { id: 39, title: 'Captain America', views: 3, image: 'https://readdy.ai/api/search-image?query=captain%20america%20shield%20marvel%20superhero%20steve%20rogers%20patriotic%20hero%20avengers%20character%20simple%20background&width=400&height=500&seq=captain-america-001&orientation=portrait', category: 'Video Effects' }
    ],
    imageEffects: [
      { id: 4, title: 'Live2D', views: 281, image: 'https://readdy.ai/api/search-image?query=live2d%20anime%20character%20animation%20cute%20kawaii%20style%20vibrant%20colors%20dynamic%20pose%20japanese%20animation%20aesthetic%20simple%20background&width=400&height=500&seq=live2d-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 6, title: 'Wedding Dress', views: 8054, image: 'https://readdy.ai/api/search-image?query=elegant%20wedding%20dress%20bridal%20gown%20white%20lace%20beautiful%20bride%20romantic%20wedding%20photography%20simple%20background&width=400&height=500&seq=wedding-dress-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 7, title: 'Cosplay', views: 363, image: 'https://readdy.ai/api/search-image?query=anime%20cosplay%20costume%20detailed%20outfit%20character%20portrayal%20vibrant%20colors%20creative%20makeup%20fantasy%20style%20simple%20background&width=400&height=500&seq=cosplay-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 8, title: 'Maid Outfit', views: 523, image: 'https://readdy.ai/api/search-image?query=cute%20maid%20outfit%20costume%20kawaii%20style%20black%20and%20white%20dress%20anime%20inspired%20fashion%20simple%20background&width=400&height=500&seq=maid-outfit-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 9, title: 'Christmas Dress', views: 314, image: 'https://readdy.ai/api/search-image?query=festive%20christmas%20dress%20red%20and%20white%20outfit%20holiday%20fashion%20santa%20inspired%20costume%20winter%20celebration%20simple%20background&width=400&height=500&seq=christmas-dress-001&orientation=portrait', category: 'Image Effects' },
      { id: 11, title: 'Clay', views: 118, image: 'https://readdy.ai/api/search-image?query=clay%20animation%20style%203d%20character%20cute%20claymation%20aesthetic%20stop%20motion%20art%20playful%20design%20simple%20background&width=400&height=500&seq=clay-001&orientation=portrait', category: 'Image Effects' },
      { id: 12, title: 'Halo Soldier', views: 161, image: 'https://readdy.ai/api/search-image?query=halo%20soldier%20armor%20futuristic%20military%20suit%20sci-fi%20warrior%20master%20chief%20inspired%20gaming%20character%20simple%20background&width=400&height=500&seq=halo-soldier-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 16, title: 'Jedi Knight', views: 172, image: 'https://readdy.ai/api/search-image?query=star%20wars%20jedi%20knight%20lightsaber%20warrior%20force%20user%20sci-fi%20character%20heroic%20pose%20simple%20background&width=400&height=500&seq=jedi-knight-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 17, title: 'Bodysuit', views: 174, image: 'https://readdy.ai/api/search-image?query=sleek%20bodysuit%20outfit%20form-fitting%20costume%20athletic%20wear%20modern%20fashion%20futuristic%20design%20simple%20background&width=400&height=500&seq=bodysuit-001&orientation=portrait', category: 'Image Effects' },
      { id: 20, title: 'Pumpkin Headgear', views: 38, image: 'https://readdy.ai/api/search-image?query=halloween%20pumpkin%20headgear%20costume%20jack-o-lantern%20mask%20festive%20halloween%20outfit%20spooky%20decoration%20simple%20background&width=400&height=500&seq=pumpkin-head-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 22, title: 'Gothic Style', views: 130, image: 'https://readdy.ai/api/search-image?query=gothic%20fashion%20style%20dark%20aesthetic%20victorian%20inspired%20outfit%20black%20clothing%20dramatic%20makeup%20simple%20background&width=400&height=500&seq=gothic-style-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 26, title: 'Cute Figure', views: 159, image: 'https://readdy.ai/api/search-image?query=adorable%20cute%20figure%20chibi%20style%20kawaii%20character%20miniature%20collectible%20toy%20photography%20simple%20background&width=400&height=500&seq=cute-figure-001&orientation=portrait', category: 'Image Effects' },
      { id: 31, title: 'Lolita', views: 396, image: 'https://readdy.ai/api/search-image?query=lolita%20fashion%20style%20japanese%20street%20fashion%20cute%20frilly%20dress%20victorian%20inspired%20outfit%20kawaii%20aesthetic%20simple%20background&width=400&height=500&seq=lolita-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 32, title: 'Siberian Tiger', views: 154, image: 'https://readdy.ai/api/search-image?query=majestic%20siberian%20tiger%20powerful%20wild%20animal%20wildlife%20photography%20big%20cat%20predator%20nature%20scene%20simple%20background&width=400&height=500&seq=siberian-tiger-001&orientation=portrait', category: 'Image Effects' },
      { id: 34, title: 'X-Ray Outfit', views: 252, image: 'https://readdy.ai/api/search-image?query=futuristic%20x-ray%20effect%20outfit%20transparent%20fashion%20sci-fi%20clothing%20innovative%20design%20tech-inspired%20simple%20background&width=400&height=500&seq=xray-outfit-001&orientation=portrait', category: 'Image Effects' },
      { id: 36, title: 'Anime Cosplay', views: 492, image: 'https://readdy.ai/api/search-image?query=detailed%20anime%20cosplay%20character%20costume%20accurate%20portrayal%20manga%20inspired%20outfit%20convention%20photography%20simple%20background&width=400&height=500&seq=anime-cosplay-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' },
      { id: 37, title: 'Ken Figure', views: 115, image: 'https://readdy.ai/api/search-image?query=ken%20doll%20figure%20barbie%20boyfriend%20toy%20photography%20collectible%20doll%20fashion%20doll%20male%20figure%20simple%20background&width=400&height=500&seq=ken-figure-001&orientation=portrait', category: 'Image Effects' },
      { id: 40, title: 'Black Horse', views: 151, image: 'https://readdy.ai/api/search-image?query=majestic%20black%20horse%20powerful%20stallion%20equine%20beauty%20wild%20horse%20running%20elegant%20animal%20photography%20simple%20background&width=400&height=500&seq=black-horse-001&orientation=portrait', category: 'Image Effects', tag: 'LitAI 5' }
    ],
    kissYourLover: [
      { id: 1, title: 'Innocent Kiss', views: 737, image: 'https://readdy.ai/api/search-image?query=romantic%20innocent%20kiss%20moment%20between%20couple%20tender%20loving%20embrace%20soft%20lighting%20intimate%20scene%20simple%20background&width=400&height=500&seq=innocent-kiss-001&orientation=portrait', category: 'Kiss your lover' },
      { id: 23, title: 'Sofa Kiss', views: 16611, image: 'https://readdy.ai/api/search-image?query=romantic%20couple%20kissing%20on%20sofa%20intimate%20moment%20cozy%20living%20room%20loving%20embrace%20tender%20scene%20simple%20background&width=400&height=500&seq=sofa-kiss-001&orientation=portrait', category: 'Kiss your lover', tag: 'LitAI 5' },
      { id: 35, title: 'Intense French Kiss Pro', views: 21898, image: 'https://readdy.ai/api/search-image?query=passionate%20french%20kiss%20romantic%20couple%20intimate%20moment%20deep%20kiss%20loving%20embrace%20cinematic%20lighting%20simple%20background&width=400&height=500&seq=french-kiss-pro-001&orientation=portrait', category: 'Kiss your lover', tag: 'LitAI 5' },
      { id: 10, title: 'Heartfelt Vow', views: 244, image: 'https://readdy.ai/api/search-image?query=emotional%20wedding%20vow%20moment%20couple%20holding%20hands%20romantic%20ceremony%20heartfelt%20expression%20love%20and%20commitment%20simple%20background&width=400&height=500&seq=heartfelt-vow-001&orientation=portrait', category: 'Kiss your lover' },
      { id: 41, title: 'Sweet Kiss', views: 1523, image: 'https://readdy.ai/api/search-image?query=sweet%20romantic%20kiss%20couple%20in%20love%20tender%20moment%20beautiful%20lighting%20affectionate%20embrace%20simple%20background&width=400&height=500&seq=sweet-kiss-001&orientation=portrait', category: 'Kiss your lover' },
      { id: 42, title: 'Beach Kiss', views: 892, image: 'https://readdy.ai/api/search-image?query=romantic%20beach%20kiss%20sunset%20couple%20by%20ocean%20waves%20loving%20moment%20seaside%20romance%20simple%20background&width=400&height=500&seq=beach-kiss-001&orientation=portrait', category: 'Kiss your lover' }
    ],
    hotDance: [
      { id: 5, title: 'Moto Dance', views: 325, image: 'https://readdy.ai/api/search-image?query=energetic%20motorcycle%20dance%20performance%20dynamic%20movement%20urban%20street%20style%20cool%20attitude%20action%20pose%20simple%20background&width=400&height=500&seq=moto-dance-001&orientation=portrait', category: 'Hot Dance' },
      { id: 14, title: 'Back View Twerk', views: 740, image: 'https://readdy.ai/api/search-image?query=dynamic%20dance%20movement%20twerk%20performance%20energetic%20motion%20back%20view%20dance%20pose%20urban%20dance%20style%20simple%20background&width=400&height=500&seq=back-twerk-001&orientation=portrait', category: 'Hot Dance' },
      { id: 18, title: 'Dance', views: 126, image: 'https://readdy.ai/api/search-image?query=energetic%20dance%20performance%20dynamic%20movement%20choreography%20artistic%20expression%20dance%20pose%20simple%20background&width=400&height=500&seq=dance-001&orientation=portrait', category: 'Hot Dance' },
      { id: 30, title: 'Dance Performance', views: 167, image: 'https://readdy.ai/api/search-image?query=professional%20dance%20performance%20stage%20show%20artistic%20movement%20choreographed%20routine%20performance%20art%20simple%20background&width=400&height=500&seq=dance-perf-001&orientation=portrait', category: 'Hot Dance' },
      { id: 43, title: 'Hip Hop Dance', views: 654, image: 'https://readdy.ai/api/search-image?query=hip%20hop%20dance%20performance%20urban%20street%20dance%20energetic%20moves%20breakdance%20style%20dynamic%20choreography%20simple%20background&width=400&height=500&seq=hiphop-dance-001&orientation=portrait', category: 'Hot Dance' },
      { id: 44, title: 'Latin Dance', views: 478, image: 'https://readdy.ai/api/search-image?query=passionate%20latin%20dance%20salsa%20performance%20energetic%20movement%20colorful%20costume%20dance%20partner%20simple%20background&width=400&height=500&seq=latin-dance-001&orientation=portrait', category: 'Hot Dance' }
    ],
    christmas: [
      { id: 9, title: 'Christmas Dress', views: 314, image: 'https://readdy.ai/api/search-image?query=festive%20christmas%20dress%20red%20and%20white%20outfit%20holiday%20fashion%20santa%20inspired%20costume%20winter%20celebration%20simple%20background&width=400&height=500&seq=christmas-dress-001&orientation=portrait', category: 'Christmas' },
      { id: 45, title: 'Christmas Tree', views: 1245, image: 'https://readdy.ai/api/search-image?query=beautiful%20christmas%20tree%20decorated%20with%20lights%20ornaments%20and%20star%20festive%20holiday%20decoration%20winter%20celebration%20simple%20background&width=400&height=500&seq=christmas-tree-001&orientation=portrait', category: 'Christmas' },
      { id: 46, title: 'Santa Claus', views: 987, image: 'https://readdy.ai/api/search-image?query=santa%20claus%20with%20gifts%20red%20suit%20white%20beard%20jolly%20christmas%20character%20holiday%20spirit%20simple%20background&width=400&height=500&seq=santa-claus-001&orientation=portrait', category: 'Christmas' },
      { id: 47, title: 'Christmas Party', views: 756, image: 'https://readdy.ai/api/search-image?query=christmas%20party%20celebration%20festive%20gathering%20holiday%20decorations%20people%20celebrating%20winter%20party%20simple%20background&width=400&height=500&seq=christmas-party-001&orientation=portrait', category: 'Christmas' },
      { id: 48, title: 'Christmas Gifts', views: 623, image: 'https://readdy.ai/api/search-image?query=wrapped%20christmas%20gifts%20colorful%20presents%20ribbons%20and%20bows%20holiday%20gift%20boxes%20festive%20packaging%20simple%20background&width=400&height=500&seq=christmas-gifts-001&orientation=portrait', category: 'Christmas' },
      { id: 49, title: 'Christmas Snow', views: 891, image: 'https://readdy.ai/api/search-image?query=christmas%20snow%20scene%20winter%20wonderland%20snowy%20landscape%20festive%20atmosphere%20holiday%20season%20simple%20background&width=400&height=500&seq=christmas-snow-001&orientation=portrait', category: 'Christmas' }
    ],
    takingPhotos: [
      { id: 50, title: 'Studio Photoshoot', views: 1123, image: 'https://readdy.ai/api/search-image?query=professional%20studio%20photoshoot%20photography%20session%20lighting%20equipment%20camera%20setup%20model%20posing%20simple%20background&width=400&height=500&seq=studio-shoot-001&orientation=portrait', category: 'Taking photos on set' },
      { id: 51, title: 'Fashion Photography', views: 945, image: 'https://readdy.ai/api/search-image?query=fashion%20photography%20shoot%20model%20on%20set%20professional%20lighting%20stylish%20outfit%20photographer%20working%20simple%20background&width=400&height=500&seq=fashion-photo-001&orientation=portrait', category: 'Taking photos on set' },
      { id: 52, title: 'Portrait Session', views: 834, image: 'https://readdy.ai/api/search-image?query=portrait%20photography%20session%20professional%20setup%20studio%20lights%20camera%20equipment%20subject%20posing%20simple%20background&width=400&height=500&seq=portrait-session-001&orientation=portrait', category: 'Taking photos on set' },
      { id: 53, title: 'Commercial Shoot', views: 712, image: 'https://readdy.ai/api/search-image?query=commercial%20photography%20shoot%20product%20photography%20professional%20set%20lighting%20equipment%20crew%20working%20simple%20background&width=400&height=500&seq=commercial-shoot-001&orientation=portrait', category: 'Taking photos on set' },
      { id: 54, title: 'Behind the Scenes', views: 678, image: 'https://readdy.ai/api/search-image?query=behind%20the%20scenes%20photography%20crew%20at%20work%20film%20set%20production%20team%20camera%20equipment%20simple%20background&width=400&height=500&seq=behind-scenes-001&orientation=portrait', category: 'Taking photos on set' },
      { id: 55, title: 'Group Photo', views: 1456, image: 'https://readdy.ai/api/search-image?query=group%20photo%20session%20team%20photography%20multiple%20people%20posing%20together%20professional%20setup%20simple%20background&width=400&height=500&seq=group-photo-001&orientation=portrait', category: 'Taking photos on set' }
    ],
    trending: [
      { id: 23, title: 'Sofa Kiss', views: 16611, image: 'https://readdy.ai/api/search-image?query=romantic%20couple%20kissing%20on%20sofa%20intimate%20moment%20cozy%20living%20room%20loving%20embrace%20tender%20scene%20simple%20background&width=400&height=500&seq=sofa-kiss-001&orientation=portrait', category: 'Trending', tag: 'LitAI 5' },
      { id: 35, title: 'Intense French Kiss Pro', views: 21898, image: 'https://readdy.ai/api/search-image?query=passionate%20french%20kiss%20romantic%20couple%20intimate%20moment%20deep%20kiss%20loving%20embrace%20cinematic%20lighting%20simple%20background&width=400&height=500&seq=french-kiss-pro-001&orientation=portrait', category: 'Trending', tag: 'LitAI 5' },
      { id: 6, title: 'Wedding Dress', views: 8054, image: 'https://readdy.ai/api/search-image?query=elegant%20wedding%20dress%20bridal%20gown%20white%20lace%20beautiful%20bride%20romantic%20wedding%20photography%20simple%20background&width=400&height=500&seq=wedding-dress-001&orientation=portrait', category: 'Trending', tag: 'LitAI 5' },
      { id: 45, title: 'Christmas Tree', views: 1245, image: 'https://readdy.ai/api/search-image?query=beautiful%20christmas%20tree%20decorated%20with%20lights%20ornaments%20and%20star%20festive%20holiday%20decoration%20winter%20celebration%20simple%20background&width=400&height=500&seq=christmas-tree-001&orientation=portrait', category: 'Trending' },
      { id: 50, title: 'Studio Photoshoot', views: 1123, image: 'https://readdy.ai/api/search-image?query=professional%20studio%20photoshoot%20photography%20session%20lighting%20equipment%20camera%20setup%20model%20posing%20simple%20background&width=400&height=500&seq=studio-shoot-001&orientation=portrait', category: 'Trending' },
      { id: 14, title: 'Back View Twerk', views: 740, image: 'https://readdy.ai/api/search-image?query=dynamic%20dance%20movement%20twerk%20performance%20energetic%20motion%20back%20view%20dance%20pose%20urban%20dance%20style%20simple%20background&width=400&height=500&seq=back-twerk-001&orientation=portrait', category: 'Trending' }
    ]
  };

  // Video Grid - use galleryItems.all instead of exploreVideos
  const filteredExploreVideos = exploreFilter === 'All' 
    ? galleryItems.all 
    : exploreFilter === 'Video Effects'
    ? galleryItems.videoEffects
    : exploreFilter === 'Image Effects'
    ? galleryItems.imageEffects
    : exploreFilter === 'Kiss your lover'
    ? galleryItems.kissYourLover
    : exploreFilter === 'Hot Dance'
    ? galleryItems.hotDance
    : exploreFilter === 'Christmas'
    ? galleryItems.christmas
    : exploreFilter === 'Taking photos on set'
    ? galleryItems.takingPhotos
    : exploreFilter === 'Trending'
    ? galleryItems.trending
    : galleryItems.all.filter(item => item.category === exploreFilter);

  const renderHomeContent = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 px-4">
          Create Amazing <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">AI Content</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg px-4">Transform your ideas into stunning visuals with AI-powered tools</p>
      </div>

      {/* Quick Actions - Feature Cards */}
      <div>
        <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-0">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30">
              <i className="ri-magic-line text-cyan-400 text-lg md:text-xl"></i>
            </div>
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 px-4 md:px-0">
          {quickActions.map((feature, index) => (
            <div 
              key={index}
              onClick={() => handleQuickActionClick(feature.id)}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer bg-gray-900/50 backdrop-blur-sm"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-2 md:mb-3 shadow-lg`}>
                  <i className={`${feature.icon} text-white text-lg md:text-xl`}></i>
                </div>
                <h3 className="text-white font-bold text-xs md:text-sm mb-1">{feature.title}</h3>
                <button className="w-full mt-1 md:mt-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-semibold py-1.5 md:py-2 rounded-lg transition-all whitespace-nowrap">
                  Try Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Content */}
      <div>
        <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-0">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center border border-pink-500/30">
              <i className="ri-fire-line text-pink-400 text-lg md:text-xl"></i>
            </div>
            Trending Now
          </h2>
          <button 
            onClick={() => {
              setSelectedMenu('EXPLORE');
              setExploreFilter('Trending');
            }}
            className="text-cyan-400 hover:text-cyan-300 text-xs md:text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            View All
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4 md:px-0">
          {[
            { 
              title: 'Kiss your lover', 
              image: 'https://readdy.ai/api/search-image?query=romantic%20couple%20kissing%20love%20relationship%20intimate%20moment%20beautiful%20lighting%20emotional%20scene%20simple%20background&width=400&height=600&seq=trend-kiss-001&orientation=portrait',
              tag: 'Hot',
              tagColor: 'bg-rose-500'
            },
            { 
              title: 'Christmas', 
              image: 'https://readdy.ai/api/search-image?query=christmas%20holiday%20celebration%20festive%20decorations%20winter%20scene%20snow%20santa%20claus%20gifts%20colorful%20lights%20simple%20background&width=400&height=600&seq=trend-xmas-001&orientation=portrait',
              tag: 'New',
              tagColor: 'bg-emerald-500'
            },
            { 
              title: 'Taking photos on set', 
              image: 'https://readdy.ai/api/search-image?query=photography%20studio%20photoshoot%20professional%20camera%20photographer%20taking%20photos%20lighting%20equipment%20creative%20scene%20simple%20background&width=400&height=600&seq=trend-photo-001&orientation=portrait',
              tag: 'Trending',
              tagColor: 'bg-orange-500'
            },
            { 
              title: 'Face Swap', 
              image: 'https://readdy.ai/api/search-image?query=face%20swap%20effect%20digital%20transformation%20AI%20technology%20portrait%20editing%20creative%20effect%20modern%20technology%20simple%20background&width=400&height=600&seq=trend-swap-001&orientation=portrait',
              tag: 'Popular',
              tagColor: 'bg-amber-500'
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-2 md:top-3 right-2 md:right-3">
                  <span className={`${item.tagColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <h3 className="text-white font-bold text-xs md:text-sm mb-2">{item.title}</h3>
                <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold py-1.5 md:py-2 rounded-lg transition-all whitespace-nowrap">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Models Section */}
      <div>
        <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-0">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center border border-red-500/30">
              <i className="ri-cpu-line text-red-400 text-lg md:text-xl"></i>
            </div>
            AI Models
          </h2>
        </div>

        {/* Video Models */}
        <div className="mb-6 md:mb-8 px-4 md:px-0">
          <h3 className="text-base md:text-lg font-bold text-gray-300 mb-3 md:mb-4 flex items-center gap-2">
            <i className="ri-movie-line text-orange-400"></i>
            Video Models
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              { 
                name: 'Sora 2', 
                tag: 'Hot', 
                tagColor: 'bg-rose-500',
                description: 'Generate a more accurate and realistic physical world',
                logo: 'https://readdy.ai/api/search-image?query=OpenAI%20Sora%20logo%20official%20brand%20identity%20minimalist%20design%20AI%20video%20generation%20icon%20simple%20clean%20background&width=200&height=200&seq=logo-sora2-001&orientation=squarish'
              },
              { 
                name: 'Seedance 1.5 Pro', 
                tag: 'New', 
                tagColor: 'bg-emerald-500',
                description: 'Precise audio-visual alignment and cinematic narrative quality',
                logo: 'https://readdy.ai/api/search-image?query=Seedance%20AI%20logo%20official%20brand%20identity%20modern%20design%20video%20generation%20technology%20icon%20simple%20clean%20background&width=200&height=200&seq=logo-seedance-001&orientation=squarish'
              },
              { 
                name: 'Wan 2.5', 
                tag: '75% off', 
                tagColor: 'bg-amber-500',
                description: 'Ability to easily create high-quality videos in various styles',
                logo: 'https://readdy.ai/api/search-image?query=Wan%20AI%20logo%20official%20brand%20identity%20creative%20design%20video%20technology%20icon%20simple%20clean%20background&width=200&height=200&seq=logo-wan-001&orientation=squarish'
              },
              { 
                name: 'LoveAI 1.0', 
                tag: 'Popular', 
                tagColor: 'bg-pink-500',
                description: 'Create interactive videos between couples',
                logo: 'https://readdy.ai/api/search-image?query=LoveAI%20logo%20official%20brand%20identity%20heart%20design%20romantic%20AI%20technology%20icon%20simple%20clean%20background&width=200&height=200&seq=logo-loveai-001&orientation=squarish'
              },
              { 
                name: 'Veo 3.1 Fast', 
                tag: 'Fast', 
                tagColor: 'bg-orange-500',
                description: 'Cost-effective and fast-efficient',
                logo: 'https://readdy.ai/api/search-image?query=Google%20Veo%20logo%20official%20brand%20identity%20modern%20design%20fast%20AI%20video%20generation%20icon%20simple%20clean%20background&width=200&height=200&seq=logo-veo-001&orientation=squarish'
              },
              { 
                name: 'Vidu Q2 Pro', 
                tag: 'Pro', 
                tagColor: 'bg-red-500',
                description: 'Good at making subtle changes in facial expressions',
                logo: 'https://readdy.ai/api/search-image?query=Vidu%20AI%20logo%20official%20brand%20identity%20professional%20design%20video%20technology%20icon%20simple%20clean%20background&width=200&height=200&seq=logo-vidu-001&orientation=squarish'
              }
            ].map((model, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer bg-gray-900/50 backdrop-blur-sm"
              >
                <div className="p-4 md:p-6 flex flex-col h-full">
                  {/* Logo */}
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={model.logo}
                      alt={model.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Tag */}
                  <div className="flex justify-center mb-2 md:mb-3 flex-shrink-0">
                    <span className={`${model.tagColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                      {model.tag}
                    </span>
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-white font-bold text-xs md:text-sm mb-2 text-center flex-shrink-0">{model.name}</h3>
                  
                  {/* Description - 使用 flex-grow 让它占据剩余空间 */}
                  <p className="text-gray-400 text-xs text-center mb-3 md:mb-4 leading-relaxed flex-grow">{model.description}</p>
                  
                  {/* Button */}
                  <button className="w-full bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 backdrop-blur-sm text-white text-xs font-semibold py-1.5 md:py-2 rounded-lg transition-all whitespace-nowrap flex-shrink-0">
                    Use Model
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Models */}
        <div className="px-4 md:px-0">
          <h3 className="text-base md:text-lg font-bold text-gray-300 mb-3 md:mb-4 flex items-center gap-2">
            <i className="ri-image-line text-red-400"></i>
            Image Models
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              { 
                name: 'Nano Banana Pro', 
                tag: 'Hot', 
                tagColor: 'bg-rose-500',
                description: 'Supports up to 4K with industry-leading visual detail',
                logo: 'https://readdy.ai/api/search-image?query=Nano%20Banana%20AI%20logo%20official%20brand%20identity%20creative%20design%20image%20generation%20technology%20icon%20simple%20clean%20background&width=200&height=200&seq=logo-nano-001&orientation=squarish'
              },
              { 
                name: 'Flux.1', 
                tag: 'New', 
                tagColor: 'bg-emerald-500',
                description: 'Excellent Quality & Complex Scene Generation',
                logo: 'https://readdy.ai/api/search-image?query=Flux%20AI%20logo%20official%20brand%20identity%20modern%20design%20image%20generation%20technology%20icon%20simple%20clean%20background&width=200&height=200&seq=logo-flux-001&orientation=squarish'
              }
            ].map((model, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer bg-gray-900/50 backdrop-blur-sm"
              >
                <div className="p-4 md:p-6 flex flex-col h-full">
                  {/* Logo */}
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={model.logo}
                      alt={model.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Tag */}
                  <div className="flex justify-center mb-2 md:mb-3 flex-shrink-0">
                    <span className={`${model.tagColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                      {model.tag}
                    </span>
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-white font-bold text-xs md:text-sm mb-2 text-center flex-shrink-0">{model.name}</h3>
                  
                  {/* Description - 使用 flex-grow 让它占据剩余空间 */}
                  <p className="text-gray-400 text-xs text-center mb-3 md:mb-4 leading-relaxed flex-grow">{model.description}</p>
                  
                  {/* Button */}
                  <button className="w-full bg-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 backdrop-blur-sm text-white text-xs font-semibold py-1.5 md:py-2 rounded-lg transition-all whitespace-nowrap flex-shrink-0">
                    Use Model
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Get Started Banner */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 p-6 md:p-8 lg:p-12 mx-4 md:mx-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-white/90 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of creators using Pixwave AI to bring their ideas to life
          </p>
          <button className="bg-white text-cyan-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 whitespace-nowrap">
            Start for Free
          </button>
        </div>
      </div>
    </div>
  );

  const renderExploreContent = () => (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="mb-6 md:mb-8 px-4 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Explore</h1>
        <p className="text-sm md:text-base text-gray-400">Discover amazing AI-generated content</p>
      </div>

      {/* Category Filter */}
      <div className="relative px-4 md:px-0">
        <div className="flex gap-2 overflow-x-auto pb-4 category-filter-scrollbar">
          {exploreCategories.map((category) => (
            <button
              key={category}
              onClick={() => setExploreFilter(category)}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                exploreFilter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 px-4 md:px-0">
        {filteredExploreVideos.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {item.tag && (
                <div className="absolute top-2 md:top-3 right-2 md:right-3">
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <h3 className="text-white font-bold text-xs md:text-sm mb-1 truncate">{item.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <i className="ri-eye-line"></i>
                  {item.views}
                </span>
                <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-lg transition-all whitespace-nowrap">
                  Go Create
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAIImageGeneratorContent = () => (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Image Generator</h1>
        <p className="text-gray-400">Transform Text and Photos into Stunning Visuals</p>
      </div>

      {/* Nano Banana Pro Banner */}
      <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="ri-sparkling-line text-orange-400 text-2xl"></i>
          <span className="text-white font-medium">🎉 Nano Banana Pro Is Available Now!</span>
          <button className="text-orange-400 hover:text-orange-300 font-semibold underline transition-colors whitespace-nowrap">
            Try it
          </button>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-slate-800/30 p-1 rounded-xl border border-cyan-500/20 w-fit">
        <button
          onClick={() => setImageGenTab('image-to-image')}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
            imageGenTab === 'image-to-image'
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Image to Image
        </button>
        <button
          onClick={() => setImageGenTab('text-to-image')}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
            imageGenTab === 'text-to-image'
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Text to Image
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          {/* Models Selection */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 relative z-[30]">
            <h3 className="text-white font-bold text-base mb-4">Models</h3>
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <i className="ri-magic-line text-white text-sm"></i>
                  </div>
                  <span className="font-medium text-sm">{selectedModel}</span>
                </div>
                <i className={`ri-arrow-down-s-line transition-transform ${showModelDropdown ? 'rotate-180' : ''}`}></i>
              </button>
              
              {showModelDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[35] min-w-[280px]">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.id);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full p-4 transition-all text-left hover:bg-slate-800/80 ${
                        selectedModel === model.id ? 'bg-cyan-500/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-white font-semibold text-sm truncate">{model.name}</span>
                          {model.isPro && (
                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold flex-shrink-0">
                              PRO
                            </span>
                          )}
                        </div>
                        {selectedModel === model.id && (
                          <i className="ri-check-line text-cyan-400 text-xl flex-shrink-0 ml-2"></i>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{model.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Image Upload - Only for Image to Image */}
          {imageGenTab === 'image-to-image' && (
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="image-upload"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload" className="block cursor-pointer">
                <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 bg-slate-800/30 hover:bg-cyan-500/5 transition-all duration-300 p-8">
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
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-3">
                        <i className="ri-image-add-line text-2xl text-white"></i>
                      </div>
                      <p className="text-sm font-medium text-white mb-1">Click or drag an image here</p>
                      <p className="text-xs text-gray-400">JPG, JPEG, PNG or WEBP up to 10 MB</p>
                    </div>
                  )}
                </div>
              </label>

              {/* Or try with example */}
              <div className="space-y-3">
                <p className="text-xs text-gray-400 font-medium">Or try with example:</p>
                <div className="grid grid-cols-2 gap-3">
                  {sampleImages.map((src, index) => (
                    <button
                      key={index}
                      onClick={() => setUploadedImage(src)}
                      className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-500 transition-all hover:scale-105 cursor-pointer"
                    >
                      <img src={src} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Prompt Input */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-bold text-base mb-4">Prompt</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Please describe the image content"
              className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none text-sm"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-3">
              <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 text-xs font-medium rounded-lg transition-all whitespace-nowrap">
                Prompt Enhance
              </button>
              <span className="text-xs text-gray-500">{prompt.length}/1000</span>
            </div>
          </div>

          {/* Output Aspect Ratios - Dropdown */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-4 md:p-6 relative z-[30]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Output Aspect Ratios */}
              <div className="relative">
                <h3 className="text-white font-bold text-sm md:text-base mb-3 md:mb-4">Output Aspect Ratios</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowAspectRatioDropdown(!showAspectRatioDropdown)}
                    className="w-full flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white hover:border-cyan-500/50 transition-all text-sm"
                  >
                    <span className="font-medium">{aspectRatio}</span>
                    <i className={`ri-arrow-down-s-line transition-transform ${showAspectRatioDropdown ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {showAspectRatioDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[35]">
                      {[
                        { id: '5:2', label: '5:2' },
                        { id: '2:3', label: '2:3' },
                        { id: '1:1', label: '1:1' },
                        { id: '3:2', label: '3:2' },
                        { id: '16:9', label: '16:9' }
                      ].map((ratio) => (
                        <button
                          key={ratio.id}
                          onClick={() => {
                            setAspectRatio(ratio.id);
                            setShowAspectRatioDropdown(false);
                          }}
                          className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-left transition-all hover:bg-slate-800/50 text-sm ${
                            aspectRatio === ratio.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-300'
                          }`}
                        >
                          <span className="font-medium">{ratio.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Output Format */}
              <div className="relative">
                <h3 className="text-white font-bold text-sm md:text-base mb-3 md:mb-4">Output Format</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                    className="w-full flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white hover:border-cyan-500/50 transition-all text-sm"
                  >
                    <span className="font-medium">{outputFormat}</span>
                    <i className={`ri-arrow-down-s-line transition-transform ${showFormatDropdown ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {showFormatDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[35]">
                      {['PNG', 'JPG', 'WEBP'].map((format) => (
                        <button
                          key={format}
                          onClick={() => {
                            setOutputFormat(format);
                            setShowFormatDropdown(false);
                          }}
                          className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-left transition-all hover:bg-slate-800/50 text-sm ${
                            outputFormat === format ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-300'
                          }`}
                        >
                          <span className="font-medium">{format}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Options */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 space-y-4 relative z-10">
            {/* Public Visibility */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">Public Visibility</span>
                <div 
                  className="relative"
                  onMouseEnter={() => setShowPublicTooltip(true)}
                  onMouseLeave={() => setShowPublicTooltip(false)}
                >
                  <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                  {showPublicTooltip && (
                    <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-xl z-50">
                      <p className="text-xs text-gray-300">
                        Your image may be featured in our Explore feed. See terms for details.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">Copy Protection</span>
                <div 
                  className="relative"
                  onMouseEnter={() => setShowCopyTooltip(true)}
                  onMouseLeave={() => setShowCopyTooltip(false)}
                >
                  <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                  {showCopyTooltip && (
                    <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-xl z-50">
                      <p className="text-xs text-gray-300">
                        Keep your content private. Others won't see your uploads or prompts in the community.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
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
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Sample Image */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
            <h3 className="text-white font-bold text-base mb-4">Sample image</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 p-4 flex items-center">
                <p className="text-xs text-gray-800 leading-relaxed">
                  The image style is realistic. A young couple is hugging each other on the beach at sunset. The boy is wearing a white short-sleeved shirt and the girl is wearing a pink dress. Behind them is the sparkling sea and the orange sunset.
                </p>
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=romantic%20young%20couple%20hugging%20on%20beach%20at%20sunset%20boy%20wearing%20white%20shirt%20girl%20wearing%20pink%20dress%20sparkling%20sea%20orange%20sunset%20realistic%20photography%20simple%20background&width=400&height=500&seq=sample-couple-beach-001&orientation=portrait"
                  alt="Sample"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => {
              if (imageGenTab === 'image-to-image' && !uploadedImage) return;
              if (!prompt.trim()) return;
              setIsGenerating(true);
              setTimeout(() => setIsGenerating(false), 3000);
            }}
            disabled={(imageGenTab === 'image-to-image' && !uploadedImage) || !prompt.trim() || isGenerating}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
              (imageGenTab === 'image-to-image' && !uploadedImage) || !prompt.trim() || isGenerating
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
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-xs">
                  <i className="ri-flashlight-line"></i>
                  <span>Credits required: 10</span>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const videoExamples = [
    {
      title: 'Romantic Beach Scene',
      video: 'https://readdy.ai/api/search-image?query=romantic%20couple%20walking%20on%20beach%20at%20sunset%20waves%20crashing%20golden%20hour%20lighting%20cinematic%20video%20scene%20simple%20background&width=800&height=450&seq=video-example-1&orientation=landscape',
      prompt: 'A couple walking hand in hand on a beautiful beach at sunset, waves gently crashing, golden hour lighting'
    },
    {
      title: 'City Night Life',
      video: 'https://readdy.ai/api/search-image?query=bustling%20city%20street%20at%20night%20neon%20lights%20traffic%20urban%20nightlife%20cinematic%20video%20scene%20simple%20background&width=800&height=450&seq=video-example-2&orientation=landscape',
      prompt: 'Bustling city street at night with neon lights, cars passing by, vibrant urban atmosphere'
    },
    {
      title: 'Nature Wonder',
      video: 'https://readdy.ai/api/search-image?query=majestic%20mountain%20landscape%20flowing%20waterfall%20lush%20forest%20nature%20scenery%20cinematic%20video%20scene%20simple%20background&width=800&height=450&seq=video-example-3&orientation=landscape',
      prompt: 'Majestic mountain landscape with a flowing waterfall, surrounded by lush green forest'
    }
  ];

  const renderImageToVideoContent = () => (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Video Generator</h1>
        <p className="text-gray-400">Transform images into stunning videos with AI</p>
      </div>

      {/* Veo 3 Banner */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="ri-sparkling-line text-purple-400 text-2xl"></i>
          <span className="text-white font-medium">🎉 Veo 3 Is Available Now! 50% Off for a Limited Time!</span>
          <button className="text-purple-400 hover:text-purple-300 font-semibold underline transition-colors whitespace-nowrap">
            Try it
          </button>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-slate-800/30 p-1 rounded-xl border border-purple-500/20 w-fit">
        <button
          onClick={() => setVideoGenTab('image-to-video')}
          className={`px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            videoGenTab === 'image-to-video'
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Image to video
        </button>
        <button
          onClick={() => setVideoGenTab('text-to-video')}
          className={`px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            videoGenTab === 'text-to-video'
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Text to video
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          {/* Models Selection */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 relative z-[30]">
            <h3 className="text-white font-bold text-base mb-4">Models</h3>
            <div className="relative">
              <button
                onClick={() => setShowVideoModelDropdown(!showVideoModelDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <i className="ri-movie-line text-white text-sm"></i>
                  </div>
                  <span className="font-medium text-sm">{videoModel}</span>
                </div>
                <i className={`ri-arrow-down-s-line transition-transform ${showVideoModelDropdown ? 'rotate-180' : ''}`}></i>
              </button>
              
              {showVideoModelDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 overflow-hidden z-[35] min-w-[280px]">
                  {['Seedance Pro fast', 'Veo 3', 'Wan 2.5', 'Sora 2', 'Vidu Q2 Pro'].map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setVideoModel(model);
                        setShowVideoModelDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left transition-all hover:bg-slate-800/80 ${
                        videoModel === model ? 'bg-purple-500/10 text-purple-400' : 'text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                          <i className="ri-movie-line text-white text-xs"></i>
                        </div>
                        <span className="font-medium text-sm">{model}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Image Upload - Only for Image to Video */}
          {videoGenTab === 'image-to-video' && (
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="video-image-upload"
                onChange={handleVideoImageUpload}
              />
              <label htmlFor="video-image-upload" className="block cursor-pointer">
                <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 bg-slate-800/30 hover:bg-purple-500/5 transition-all duration-300 p-8">
                  {uploadedVideoImage ? (
                    <div className="relative">
                      <img src={uploadedVideoImage} alt="Uploaded" className="w-full h-48 object-cover rounded-lg" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setUploadedVideoImage(null);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                      >
                        <i className="ri-close-line text-white"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-3">
                        <i className="ri-image-add-line text-2xl text-white"></i>
                      </div>
                      <p className="text-sm font-medium text-white mb-1">Click or drag an image here</p>
                      <p className="text-xs text-gray-400">JPG, JPEG, PNG or WEBP up to 10 MB</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          )}

          {/* Prompt Input */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
            <h3 className="text-white font-bold text-base mb-4">Prompt</h3>
            <textarea
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              placeholder={videoGenTab === 'image-to-video' ? "Describe the motion and scene you want to create from the image..." : "Please describe the video content"}
              className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none text-sm"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-3">
              <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-purple-500/30 hover:border-purple-500/50 text-purple-400 text-xs font-medium rounded-lg transition-all whitespace-nowrap">
                Prompt Enhance
              </button>
              <span className="text-xs text-gray-500">{videoPrompt.length}/1000</span>
            </div>
          </div>

          {/* Quality and Duration */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 relative z-[30]">
            <div className="grid grid-cols-2 gap-4">
              {/* Quality */}
              <div className="relative">
                <h3 className="text-white font-bold text-base mb-4">Quality</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowVideoQualityDropdown(!showVideoQualityDropdown)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white hover:border-purple-500/50 transition-all"
                  >
                    <span className="font-medium text-sm">{videoQuality}</span>
                    <i className={`ri-arrow-down-s-line transition-transform ${showVideoQualityDropdown ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {showVideoQualityDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 overflow-hidden z-[35]">
                      {['480p', '720p', '1080p', '4K'].map((quality) => (
                        <button
                          key={quality}
                          onClick={() => {
                            setVideoQuality(quality);
                            setShowVideoQualityDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all hover:bg-slate-800/50 ${
                            videoQuality === quality ? 'bg-purple-500/10 text-purple-400' : 'text-gray-300'
                          }`}
                        >
                          <span className="font-medium text-sm">{quality}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div className="relative">
                <h3 className="text-white font-bold text-base mb-4">Duration</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowVideoDurationDropdown(!showVideoDurationDropdown)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white hover:border-purple-500/50 transition-all"
                  >
                    <span className="font-medium text-sm">{videoDuration}</span>
                    <i className={`ri-arrow-down-s-line transition-transform ${showVideoDurationDropdown ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {showVideoDurationDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 overflow-hidden z-[35]">
                      {['3s', '5s', '10s', '15s'].map((duration) => (
                        <button
                          key={duration}
                          onClick={() => {
                            setVideoDuration(duration);
                            setShowVideoDurationDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all hover:bg-slate-800/50 ${
                            videoDuration === duration ? 'bg-purple-500/10 text-purple-400' : 'text-gray-300'
                          }`}
                        >
                          <span className="font-medium text-sm">{duration}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Options */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 space-y-4 relative z-10">
            {/* Public Visibility */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">Public Visibility</span>
                <div 
                  className="relative"
                  onMouseEnter={() => setShowPublicTooltip(true)}
                  onMouseLeave={() => setShowPublicTooltip(false)}
                >
                  <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                  {showPublicTooltip && (
                    <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl z-50">
                      <p className="text-xs text-gray-300">
                        Your video may be featured in our Explore feed. See terms for details.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">Copy Protection</span>
                <div 
                  className="relative"
                  onMouseEnter={() => setShowCopyTooltip(true)}
                  onMouseLeave={() => setShowCopyTooltip(false)}
                >
                  <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                  {showCopyTooltip && (
                    <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl z-50">
                      <p className="text-xs text-gray-300">
                        Keep your content private. Others won't see your uploads or prompts in the community.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
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
        </div>

        {/* Right Panel - Video Preview */}
        <div className="space-y-6">
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
            <h3 className="text-white font-bold text-base mb-4">Example Videos</h3>
            
            <div className="relative">
              {/* Video Display */}
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-800/50 mb-4">
                <img 
                  src={videoExamples[currentVideoExample].video}
                  alt={videoExamples[currentVideoExample].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentVideoExample((prev) => (prev === 0 ? videoExamples.length - 1 : prev - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
              >
                <i className="ri-arrow-left-s-line text-white text-xl"></i>
              </button>
              <button
                onClick={() => setCurrentVideoExample((prev) => (prev === videoExamples.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
              >
                <i className="ri-arrow-right-s-line text-white text-xl"></i>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mb-4">
                {videoExamples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoExample(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentVideoExample === index ? 'bg-purple-500 w-6' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Video Info */}
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2">{videoExamples[currentVideoExample].title}</h4>
                <p className="text-gray-400 text-sm">{videoExamples[currentVideoExample].prompt}</p>
              </div>
            </div>
          </div>

          {/* Generate Button - Moved here */}
          <button
            onClick={() => {
              if (videoGenTab === 'image-to-video' && !uploadedVideoImage) return;
              if (!videoPrompt.trim()) return;
              // Generate video logic here
            }}
            disabled={(videoGenTab === 'image-to-video' && !uploadedVideoImage) || !videoPrompt.trim()}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
              (videoGenTab === 'image-to-video' && !uploadedVideoImage) || !videoPrompt.trim()
                ? 'bg-gray-700 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105'
            }`}
          >
            <span>Generate</span>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-xs">
              <i className="ri-flashlight-line"></i>
              <span>Credits required: 20</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderMyLibraryContent = () => {
    // Mock library data
    const libraryVideos = [
      {
        id: 1,
        thumbnail: 'https://readdy.ai/api/search-image?query=romantic%20couple%20dancing%20together%20elegant%20ballroom%20dance%20beautiful%20lighting%20cinematic%20scene%20simple%20background&width=400&height=600&seq=lib-video-1&orientation=portrait',
        title: 'Romantic Dance',
        date: '2024-01-15',
        duration: '5s',
        model: 'Veo 3'
      },
      {
        id: 2,
        thumbnail: 'https://readdy.ai/api/search-image?query=futuristic%20city%20skyline%20at%20night%20neon%20lights%20cyberpunk%20atmosphere%20urban%20landscape%20simple%20background&width=400&height=600&seq=lib-video-2&orientation=portrait',
        title: 'Cyberpunk City',
        date: '2024-01-14',
        duration: '10s',
        model: 'Sora 2'
      },
      {
        id: 3,
        thumbnail: 'https://readdy.ai/api/search-image?query=beautiful%20sunset%20over%20ocean%20waves%20crashing%20golden%20hour%20peaceful%20scene%20simple%20background&width=400&height=600&seq=lib-video-3&orientation=portrait',
        title: 'Ocean Sunset',
        date: '2024-01-13',
        duration: '8s',
        model: 'Wan 2.5'
      },
      {
        id: 4,
        thumbnail: 'https://readdy.ai/api/search-image?query=magical%20forest%20with%20glowing%20mushrooms%20fantasy%20landscape%20ethereal%20lighting%20mystical%20scene%20simple%20background&width=400&height=600&seq=lib-video-4&orientation=portrait',
        title: 'Magical Forest',
        date: '2024-01-12',
        duration: '6s',
        model: 'Veo 3'
      },
      {
        id: 5,
        thumbnail: 'https://readdy.ai/api/search-image?query=astronaut%20floating%20in%20space%20stars%20and%20galaxies%20cosmic%20scene%20beautiful%20universe%20simple%20background&width=400&height=600&seq=lib-video-5&orientation=portrait',
        title: 'Space Explorer',
        date: '2024-01-11',
        duration: '12s',
        model: 'Sora 2'
      },
      {
        id: 6,
        thumbnail: 'https://readdy.ai/api/search-image?query=cherry%20blossom%20trees%20in%20full%20bloom%20spring%20season%20pink%20petals%20falling%20peaceful%20garden%20simple%20background&width=400&height=600&seq=lib-video-6&orientation=portrait',
        title: 'Cherry Blossom',
        date: '2024-01-10',
        duration: '7s',
        model: 'Seedance Pro'
      }
    ];

    const libraryImages = [
      {
        id: 1,
        thumbnail: 'https://readdy.ai/api/search-image?query=portrait%20of%20elegant%20woman%20wearing%20red%20dress%20studio%20lighting%20professional%20photography%20simple%20background&width=400&height=600&seq=lib-img-1&orientation=portrait',
        title: 'Red Dress Portrait',
        date: '2024-01-15',
        resolution: '1024x1536',
        model: 'FLUX Pro'
      },
      {
        id: 2,
        thumbnail: 'https://readdy.ai/api/search-image?query=futuristic%20robot%20character%20metallic%20surface%20glowing%20eyes%20sci-fi%20design%20simple%20background&width=400&height=600&seq=lib-img-2&orientation=portrait',
        title: 'Sci-Fi Robot',
        date: '2024-01-14',
        resolution: '1024x1024',
        model: 'GPT-4o'
      },
      {
        id: 3,
        thumbnail: 'https://readdy.ai/api/search-image?query=fantasy%20dragon%20flying%20through%20clouds%20majestic%20creature%20epic%20scene%20simple%20background&width=400&height=600&seq=lib-img-3&orientation=portrait',
        title: 'Dragon Flight',
        date: '2024-01-13',
        resolution: '1536x1024',
        model: 'Stable Diffusion XL'
      },
      {
        id: 4,
        thumbnail: 'https://readdy.ai/api/search-image?query=cozy%20coffee%20shop%20interior%20warm%20lighting%20wooden%20furniture%20plants%20decoration%20simple%20background&width=400&height=600&seq=lib-img-4&orientation=portrait',
        title: 'Coffee Shop',
        date: '2024-01-12',
        resolution: '1024x1536',
        model: 'FLUX Dev'
      },
      {
        id: 5,
        thumbnail: 'https://readdy.ai/api/search-image?query=anime%20style%20character%20colorful%20hair%20big%20eyes%20kawaii%20aesthetic%20manga%20art%20simple%20background&width=400&height=600&seq=lib-img-5&orientation=portrait',
        title: 'Anime Character',
        date: '2024-01-11',
        resolution: '1024x1536',
        model: 'Nano Banana Pro'
      },
      {
        id: 6,
        thumbnail: 'https://readdy.ai/api/search-image?query=mountain%20landscape%20at%20dawn%20misty%20valleys%20golden%20sunlight%20nature%20photography%20simple%20background&width=400&height=600&seq=lib-img-6&orientation=portrait',
        title: 'Mountain Dawn',
        date: '2024-01-10',
        resolution: '1536x1024',
        model: 'FLUX Pro'
      },
      {
        id: 7,
        thumbnail: 'https://readdy.ai/api/search-image?query=luxury%20sports%20car%20sleek%20design%20metallic%20paint%20studio%20lighting%20automotive%20photography%20simple%20background&width=400&height=600&seq=lib-img-7&orientation=portrait',
        title: 'Sports Car',
        date: '2024-01-09',
        resolution: '1024x1024',
        model: 'GPT-4o'
      },
      {
        id: 8,
        thumbnail: 'https://readdy.ai/api/search-image?query=cute%20cat%20wearing%20wizard%20hat%20magical%20theme%20adorable%20pet%20portrait%20simple%20background&width=400&height=600&seq=lib-img-8&orientation=portrait',
        title: 'Wizard Cat',
        date: '2024-01-08',
        resolution: '1024x1024',
        model: 'Stable Diffusion XL'
      }
    ];

    const currentItems = libraryTab === 'video' ? libraryVideos : libraryImages;
    const isEmpty = currentItems.length === 0;

    return (
      <div className="space-y-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Library</h1>
          <p className="text-gray-400">View and manage your generated content</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-slate-800/30 p-1 rounded-xl border border-cyan-500/20 w-fit">
          <button
            onClick={() => setLibraryTab('video')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              libraryTab === 'video'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Video
          </button>
          <button
            onClick={() => setLibraryTab('image')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              libraryTab === 'image'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Image
          </button>
        </div>

        {/* Empty State */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl flex items-center justify-center mb-6 border border-gray-700">
              <i className={`${libraryTab === 'video' ? 'ri-video-line' : 'ri-image-line'} text-6xl text-gray-600`}></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              You haven't generated any {libraryTab === 'video' ? 'Videos' : 'Images'} yet.
            </h2>
            <p className="text-gray-400 mb-6">Tap to start your first one!</p>
            <button 
              onClick={() => {
                if (libraryTab === 'video') {
                  setSelectedMenu('AI_VIDEO_GENERATOR');
                } else {
                  setSelectedMenu('AI_IMAGE_GENERATOR');
                }
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 whitespace-nowrap"
            >
              Go Create
            </button>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="flex items-center justify-between bg-gray-900/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <i className="ri-file-list-line text-cyan-400"></i>
                  <span className="text-gray-300 text-sm">
                    Total: <span className="text-white font-semibold">{currentItems.length}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-calendar-line text-purple-400"></i>
                  <span className="text-gray-300 text-sm">
                    This Month: <span className="text-white font-semibold">{currentItems.length}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-500/50 text-gray-300 hover:text-white rounded-lg transition-all text-sm font-medium whitespace-nowrap">
                  <i className="ri-filter-line mr-2"></i>
                  Filter
                </button>
                <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-500/50 text-gray-300 hover:text-white rounded-lg transition-all text-sm font-medium whitespace-nowrap">
                  <i className="ri-sort-desc mr-2"></i>
                  Sort
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer bg-gray-900/50"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Play Icon for Videos */}
                    {libraryTab === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <i className="ri-play-fill text-3xl text-white ml-1"></i>
                        </div>
                      </div>
                    )}

                    {/* Top Right Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                        {libraryTab === 'video' ? item.duration : item.resolution}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="w-8 h-8 bg-black/50 backdrop-blur-sm hover:bg-cyan-500/80 rounded-full flex items-center justify-center transition-all">
                        <i className="ri-download-line text-white text-sm"></i>
                      </button>
                      <button className="w-8 h-8 bg-black/50 backdrop-blur-sm hover:bg-red-500/80 rounded-full flex items-center justify-center transition-all">
                        <i className="ri-delete-bin-line text-white text-sm"></i>
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-2 truncate">{item.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <i className="ri-calendar-line"></i>
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1 text-cyan-400">
                        <i className="ri-cpu-line"></i>
                        {item.model}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-6">
              <button className="px-8 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/30 hover:border-cyan-500/50 text-gray-300 hover:text-white rounded-xl transition-all font-medium whitespace-nowrap">
                Load More
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderClothesChangerContent = () => {
    const exampleImages = [
      'https://readdy.ai/api/search-image?query=professional%20fashion%20model%20portrait%20woman%20standing%20pose%20neutral%20background%20studio%20lighting%20full%20body%20shot%20simple%20clean%20background&width=300&height=400&seq=clothes-example-1&orientation=portrait',
      'https://readdy.ai/api/search-image?query=professional%20fashion%20model%20portrait%20man%20standing%20pose%20neutral%20background%20studio%20lighting%20full%20body%20shot%20simple%20clean%20background&width=300&height=400&seq=clothes-example-2&orientation=portrait',
      'https://readdy.ai/api/search-image?query=professional%20fashion%20model%20portrait%20woman%20elegant%20pose%20neutral%20background%20studio%20lighting%20full%20body%20shot%20simple%20clean%20background&width=300&height=400&seq=clothes-example-3&orientation=portrait'
    ];

    const clothesOptions = {
      lady: [
        { id: 'dress-1', name: 'Elegant Dress', image: 'https://readdy.ai/api/search-image?query=elegant%20red%20evening%20dress%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=lady-dress-1&orientation=portrait' },
        { id: 'dress-2', name: 'Summer Dress', image: 'https://readdy.ai/api/search-image?query=casual%20summer%20floral%20dress%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=lady-dress-2&orientation=portrait' },
        { id: 'dress-3', name: 'Business Suit', image: 'https://readdy.ai/api/search-image?query=professional%20business%20suit%20for%20women%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=lady-suit-1&orientation=portrait' },
        { id: 'dress-4', name: 'Casual Outfit', image: 'https://readdy.ai/api/search-image?query=casual%20jeans%20and%20blouse%20outfit%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=lady-casual-1&orientation=portrait' },
        { id: 'dress-5', name: 'Party Dress', image: 'https://readdy.ai/api/search-image?query=sparkly%20party%20cocktail%20dress%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=lady-party-1&orientation=portrait' },
        { id: 'dress-6', name: 'Winter Coat', image: 'https://readdy.ai/api/search-image?query=elegant%20winter%20coat%20for%20women%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=lady-coat-1&orientation=portrait' }
      ],
      man: [
        { id: 'suit-1', name: 'Business Suit', image: 'https://readdy.ai/api/search-image?query=professional%20business%20suit%20for%20men%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=man-suit-1&orientation=portrait' },
        { id: 'suit-2', name: 'Casual Shirt', image: 'https://readdy.ai/api/search-image?query=casual%20button-up%20shirt%20for%20men%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=man-shirt-1&orientation=portrait' },
        { id: 'suit-3', name: 'T-shirt & Jeans', image: 'https://readdy.ai/api/search-image?query=casual%20t-shirt%20and%20jeans%20outfit%20for%20men%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=man-casual-1&orientation=portrait' },
        { id: 'suit-4', name: 'Sports Wear', image: 'https://readdy.ai/api/search-image?query=athletic%20sports%20wear%20for%20men%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=man-sports-1&orientation=portrait' },
        { id: 'suit-5', name: 'Formal Tuxedo', image: 'https://readdy.ai/api/search-image?query=formal%20black%20tuxedo%20for%20men%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=man-tuxedo-1&orientation=portrait' },
        { id: 'suit-6', name: 'Winter Jacket', image: 'https://readdy.ai/api/search-image?query=winter%20jacket%20for%20men%20on%20white%20background%20fashion%20clothing%20product%20photography%20simple%20clean%20background&width=200&height=300&seq=man-jacket-1&orientation=portrait' }
      ],
      custom: [
        { id: 'custom-1', name: 'Upload Custom', image: 'https://readdy.ai/api/search-image?query=upload%20icon%20placeholder%20custom%20clothing%20design%20simple%20minimal%20background&width=200&height=300&seq=custom-upload-1&orientation=portrait' }
      ]
    };

    const currentClothes = selectedClothesCategory === 'lady' 
      ? clothesOptions.lady 
      : selectedClothesCategory === 'man' 
      ? clothesOptions.man 
      : clothesOptions.custom;

    return (
      <div className="space-y-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Clothes Changer</h1>
          <p className="text-gray-400">Swap clothes instantly with AI technology</p>
        </div>

        {/* Nano Banana Pro Banner */}
        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="ri-sparkling-line text-orange-400 text-2xl"></i>
            <span className="text-white font-medium">🎉 Nano Banana Pro Is Available Now!</span>
            <button className="text-orange-400 hover:text-orange-300 font-semibold underline transition-colors whitespace-nowrap">
              Try it
            </button>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Upload Image */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
              <h3 className="text-white font-bold text-base mb-4">Upload Image</h3>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="clothes-image-upload"
                onChange={handleClothesImageUpload}
              />
              <label htmlFor="clothes-image-upload" className="block cursor-pointer">
                <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 bg-slate-800/30 hover:bg-cyan-500/5 transition-all duration-300 p-8">
                  {clothesChangerImage ? (
                    <div className="relative">
                      <img src={clothesChangerImage} alt="Uploaded" className="w-full h-64 object-cover rounded-lg" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setClothesChangerImage(null);
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
                      <p className="text-sm font-medium text-white mb-1">Click or drag an image here</p>
                      <p className="text-xs text-gray-400">JPG, JPEG, PNG or WEBP up to 10 MB</p>
                    </div>
                  )}
                </div>
              </label>

              {/* Example Images */}
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-3">Or try with example:</p>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {exampleImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setClothesChangerImage(img)}
                      className="aspect-[2/3] md:aspect-[3/5] rounded-lg overflow-hidden border-2 border-gray-700 hover:border-cyan-500/50 transition-all"
                    >
                      <img src={img} alt={`Example ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clothes Selection */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
              <h3 className="text-white font-bold text-base mb-4">Choose Clothes</h3>
              
              {/* Category Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSelectedClothesCategory('lady')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedClothesCategory === 'lady'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-slate-800/50 text-gray-400 hover:text-white'
                  }`}
                >
                  Lady
                </button>
                <button
                  onClick={() => setSelectedClothesCategory('man')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedClothesCategory === 'man'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-slate-800/50 text-gray-400 hover:text-white'
                  }`}
                >
                  Man
                </button>
                <button
                  onClick={() => setSelectedClothesCategory('custom')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedClothesCategory === 'custom'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                      : 'bg-slate-800/50 text-gray-400 hover:text-white'
                  }`}
                >
                  Custom
                </button>
              </div>

              {/* Clothes Grid */}
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {currentClothes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedClothes(item.id.toString())}
                    className={`relative aspect-[2/3] md:aspect-[3/5] rounded-xl overflow-hidden border-2 transition-all ${
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

            {/* Output Aspect Ratio */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 relative z-[30]">
              <h3 className="text-white font-bold text-base mb-4">Output Aspect Ratio</h3>
              <div className="relative">
                <button
                  onClick={() => setShowClothesRatioDropdown(!showClothesRatioDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white hover:border-cyan-500/50 transition-all"
                >
                  <span className="font-medium">{clothesAspectRatio}</span>
                  <i className={`ri-arrow-down-s-line transition-transform ${showClothesRatioDropdown ? 'rotate-180' : ''}`}></i>
                </button>
                
                {showClothesRatioDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-[35]">
                    {['3:4', '1:1', '4:3', '16:9', '9:16'].map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => {
                          setClothesAspectRatio(ratio);
                          setShowClothesRatioDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-all hover:bg-slate-800/50 ${
                          clothesAspectRatio === ratio ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-300'
                        }`}
                      >
                        <span className="font-medium">{ratio}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Premium Options */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 space-y-4 relative z-10">
              {/* Public Visibility */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">Public Visibility</span>
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowPublicTooltip(true)}
                    onMouseLeave={() => setShowPublicTooltip(false)}
                  >
                    <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                    {showPublicTooltip && (
                      <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-xl z-50">
                        <p className="text-xs text-gray-300">
                          Your image may be featured in our Explore feed. See terms for details.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">Copy Protection</span>
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowCopyTooltip(true)}
                    onMouseLeave={() => setShowCopyTooltip(false)}
                  >
                    <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                    {showCopyTooltip && (
                      <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-xl z-50">
                        <p className="text-xs text-gray-300">
                          Keep your content private. Others won't see your uploads or prompts in the community.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
              <h3 className="text-white font-bold text-base mb-4">Preview</h3>
              <div className="aspect-[3/4] rounded-xl bg-slate-800/50 flex items-center justify-center border-2 border-dashed border-gray-700">
                {clothesChangerImage && selectedClothes ? (
                  <div className="relative w-full h-full">
                    <img src={clothesChangerImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end justify-center p-4">
                      <p className="text-white text-sm font-medium">AI will change the clothes in this image</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <i className="ri-image-line text-5xl text-gray-600 mb-3"></i>
                    <p className="text-gray-400 text-sm">Upload an image and select clothes to preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-white"></i>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Tips for Best Results</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0"></i>
                      <span>Use clear, well-lit photos with the person facing forward</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0"></i>
                      <span>Ensure the full body is visible in the image</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0"></i>
                      <span>Avoid images with complex backgrounds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0"></i>
                      <span>Higher resolution images produce better results</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={() => {
                if (!clothesChangerImage || !selectedClothes) return;
                setIsGenerating(true);
                setTimeout(() => setIsGenerating(false), 3000);
              }}
              disabled={!clothesChangerImage || !selectedClothes || isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                !clothesChangerImage || !selectedClothes || isGenerating
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
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-xs">
                    <i className="ri-flashlight-line"></i>
                    <span>Credits required: 15</span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

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

  const renderAICharacterGeneratorContent = () => {
    const characterStyles = [
      { 
        id: 'fantasy-warrior', 
        name: 'Fantasy Warrior',
        image: 'https://readdy.ai/api/search-image?query=fantasy%20warrior%20character%20design%20medieval%20armor%20sword%20shield%20heroic%20pose%20epic%20fantasy%20art%20style%20detailed%20illustration%20simple%20background&width=300&height=400&seq=char-style-fantasy-warrior-v2&orientation=portrait',
        prompt: 'A 27-year-old female elf fantasy warrior wearing silver-plated leather armor and a flowing emerald cloak, with braided auburn hair and armed with the longsword Dawnbringer. Personality: courageous, disciplined, stoic. Background: last guardian of the Whispering Forest, sworn to protect its ancient secrets. Special ability: Earthshatter Charge—a ground-pounding leap that creates a shockwave'
      },
      { 
        id: 'cyberpunk-hacker', 
        name: 'Cyberpunk Hacker',
        image: 'https://readdy.ai/api/search-image?query=cyberpunk%20hacker%20character%20design%20neon%20lights%20futuristic%20tech%20wear%20digital%20interface%20holographic%20display%20sci-fi%20art%20style%20simple%20background&width=300&height=400&seq=char-style-cyberpunk-hacker-v2&orientation=portrait',
        prompt: 'A 25-year-old cyberpunk hacker with neon blue hair and augmented reality glasses, wearing a black leather jacket with glowing circuit patterns. Personality: rebellious, tech-savvy, mysterious. Background: former corporate programmer turned underground hacker, fighting against mega-corporations. Special ability: Neural Override—can hack into any digital system through direct neural interface'
      },
      { 
        id: 'modern-urban', 
        name: 'Modern Urban Adventurer',
        image: 'https://readdy.ai/api/search-image?query=modern%20urban%20adventurer%20character%20design%20casual%20street%20wear%20backpack%20explorer%20contemporary%20style%20realistic%20art%20simple%20background&width=300&height=400&seq=char-style-urban-adventurer-v2&orientation=portrait',
        prompt: 'A 30-year-old urban explorer wearing practical street clothes, cargo pants, and a weathered backpack. Personality: curious, resourceful, adventurous. Background: documentary photographer who explores abandoned buildings and hidden urban locations. Special ability: Urban Navigation—can find hidden paths and shortcuts through any city environment'
      },
      { 
        id: 'steampunk', 
        name: 'Steampunk Inventor',
        image: 'https://readdy.ai/api/search-image?query=steampunk%20inventor%20character%20design%20victorian%20era%20goggles%20mechanical%20gears%20brass%20accessories%20vintage%20industrial%20style%20simple%20background&width=300&height=400&seq=char-style-steampunk-inventor-v2&orientation=portrait',
        prompt: 'A 35-year-old steampunk inventor with brass goggles, Victorian-era clothing, and mechanical arm enhancements. Personality: brilliant, eccentric, innovative. Background: renowned engineer who creates impossible machines powered by steam and clockwork. Special ability: Mechanical Mastery—can repair or modify any mechanical device instantly'
      },
      { 
        id: 'gothic-vampire', 
        name: 'Gothic Vampire',
        image: 'https://readdy.ai/api/search-image?query=gothic%20vampire%20character%20design%20dark%20elegant%20clothing%20pale%20skin%20red%20eyes%20mysterious%20atmosphere%20dark%20fantasy%20art%20style%20simple%20background&width=300&height=400&seq=char-style-gothic-vampire-v2&orientation=portrait',
        prompt: 'A centuries-old vampire with pale skin, crimson eyes, and elegant gothic attire. Personality: sophisticated, melancholic, charismatic. Background: ancient noble who has witnessed the rise and fall of empires, now seeking redemption. Special ability: Shadow Walk—can merge with shadows and travel through darkness'
      },
      { 
        id: 'post-apocalyptic', 
        name: 'Post-Apocalyptic Scavenger',
        image: 'https://readdy.ai/api/search-image?query=post%20apocalyptic%20scavenger%20character%20design%20rugged%20survival%20gear%20wasteland%20warrior%20torn%20clothing%20dystopian%20art%20style%20simple%20background&width=300&height=400&seq=char-style-post-apocalyptic-v2&orientation=portrait',
        prompt: 'A 28-year-old wasteland survivor wearing makeshift armor from scavenged materials, gas mask, and carrying a modified rifle. Personality: tough, pragmatic, loyal. Background: grew up in the ruins after the great collapse, expert at finding resources in the wasteland. Special ability: Wasteland Sense—can detect danger and resources in hostile environments'
      },
      { 
        id: 'ocean-explorer', 
        name: 'Ocean Explorer',
        image: 'https://readdy.ai/api/search-image?query=ocean%20explorer%20character%20design%20diving%20suit%20underwater%20equipment%20marine%20biologist%20nautical%20theme%20aquatic%20adventure%20art%20style%20simple%20background&width=300&height=400&seq=char-style-ocean-explorer-v2&orientation=portrait',
        prompt: 'A 32-year-old marine biologist in advanced diving gear with bioluminescent accents. Personality: calm, scientific, passionate about ocean life. Background: dedicated researcher exploring the deepest parts of the ocean, discovering new species. Special ability: Aquatic Adaptation—can breathe underwater and communicate with marine life'
      },
      { 
        id: 'space-explorer', 
        name: 'Space Explorer',
        image: 'https://readdy.ai/api/search-image?query=space%20explorer%20character%20design%20astronaut%20suit%20futuristic%20helmet%20cosmic%20background%20sci-fi%20space%20travel%20art%20style%20simple%20background&width=300&height=400&seq=char-style-space-explorer-v2&orientation=portrait',
        prompt: 'A 29-year-old astronaut in a sleek space suit with holographic displays and advanced life support systems. Personality: brave, analytical, optimistic. Background: elite pilot exploring uncharted star systems, searching for habitable worlds. Special ability: Zero-G Mastery—perfect control and navigation in zero gravity environments'
      },
      { 
        id: 'samurai', 
        name: 'Samurai',
        image: 'https://readdy.ai/api/search-image?query=samurai%20warrior%20character%20design%20traditional%20japanese%20armor%20katana%20sword%20honor%20code%20feudal%20japan%20martial%20arts%20style%20simple%20background&width=300&height=400&seq=char-style-samurai-warrior-v2&orientation=portrait',
        prompt: 'A 40-year-old samurai master wearing traditional armor and wielding a legendary katana. Personality: honorable, disciplined, wise. Background: last of an ancient warrior clan, upholding the code of bushido in a changing world. Special ability: Blade Dance—lightning-fast sword techniques that can deflect any attack'
      }
    ];

    return (
      <div className="space-y-6 relative">
        {/* Page Title */}
        <div className="mb-6 px-4 md:px-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">AI Character Generator</h1>
          <p className="text-sm md:text-base text-gray-400">Create unique characters from photos or text</p>
        </div>

        {/* Main Content */}
        <div className="px-4 md:px-0">
          {/* Top Section - Tabs and Model Selection */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-4 md:p-6 mb-6 relative z-[30] lg:z-[100]">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Tabs */}
              <div className="flex gap-2 bg-slate-800/30 p-1 rounded-xl border border-purple-500/20">
                <button
                  onClick={() => setImageGenTab('image-to-image')}
                  className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                    imageGenTab === 'image-to-image'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Image to Image
                </button>
                <button
                  onClick={() => setImageGenTab('text-to-image')}
                  className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                    imageGenTab === 'text-to-image'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Text to Image
                </button>
              </div>

              {/* Model Selection */}
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-xs">
                  <button
                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <i className="ri-cpu-line text-purple-400"></i>
                      <span className="font-medium text-sm">{selectedModel}</span>
                    </div>
                    <i className={`ri-arrow-down-s-line transition-transform ${showModelDropdown ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {showModelDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 overflow-hidden z-[40] lg:z-[110]">
                      {['GPT-4o', 'FLUX Pro', 'FLUX Dev', 'Stable Diffusion XL'].map((model) => (
                        <button
                          key={model}
                          onClick={() => {
                            setSelectedModel(model);
                            setShowModelDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all hover:bg-slate-800/50 ${
                            selectedModel === model ? 'bg-purple-500/10 text-purple-400' : 'text-gray-300'
                          }`}
                        >
                          <span className="font-medium text-sm">{model}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Aspect Ratio */}
                <div className="relative">
                  <button
                    onClick={() => setShowAspectRatioDropdown(!showAspectRatioDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white hover:border-purple-500/50 transition-all"
                  >
                    <span className="font-medium text-sm">{aspectRatio}</span>
                    <i className={`ri-arrow-down-s-line transition-transform ${showAspectRatioDropdown ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {showAspectRatioDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 overflow-hidden z-[40] lg:z-[110] min-w-[120px]">
                      {['2:3', '1:1', '3:2', '16:9', '9:16'].map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => {
                            setAspectRatio(ratio);
                            setShowAspectRatioDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all hover:bg-slate-800/50 ${
                            aspectRatio === ratio ? 'bg-purple-500/10 text-purple-400' : 'text-gray-300'
                          }`}
                        >
                          <span className="font-medium text-sm">{ratio}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Two Columns */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Style Selection + Upload/Input */}
            <div className="space-y-6">
              {/* Choose image style */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
                <h3 className="text-white font-semibold text-base mb-4">Choose image style</h3>
                <div className="grid grid-cols-3 gap-3">
                  {characterStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedCharacterStyle(style.id)}
                      className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                        selectedCharacterStyle === style.id
                          ? 'border-purple-500 shadow-lg shadow-purple-500/30'
                          : 'border-gray-700/50 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img 
                          src={style.image}
                          alt={style.name}
                          className="w-full h-full object-cover"
                        />
                        {selectedCharacterStyle === style.id && (
                          <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                              <i className="ri-check-line text-white text-lg"></i>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-white text-xs font-medium text-center leading-tight">{style.name}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* 显示选中风格的提示词 */}
                {selectedCharacterStyle && (
                  <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                    <div className="flex items-start gap-2 mb-2">
                      <i className="ri-information-line text-purple-400 text-lg flex-shrink-0 mt-0.5"></i>
                      <h4 className="text-purple-300 font-semibold text-sm">Style Prompt</h4>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {characterStyles.find(s => s.id === selectedCharacterStyle)?.prompt}
                    </p>
                  </div>
                )}
              </div>

              {/* Upload/Input Area */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
                {imageGenTab === 'image-to-image' ? (
                  <>
                    <h3 className="text-white font-semibold text-base mb-4">Drag and drop an image</h3>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      id="character-image-upload"
                      onChange={handleCharacterImageUpload}
                    />
                    <label htmlFor="character-image-upload" className="block cursor-pointer">
                      <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 bg-slate-800/30 hover:bg-purple-500/5 transition-all duration-300 p-12">
                        {characterImage ? (
                          <div className="relative">
                            <img src={characterImage} alt="Uploaded" className="w-full h-64 object-contain rounded-lg" />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setCharacterImage(null);
                              }}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                            >
                              <i className="ri-close-line text-white"></i>
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-4">
                              <i className="ri-image-add-line text-3xl text-purple-400"></i>
                            </div>
                            <p className="text-base font-medium text-white mb-2">Drag and drop an image</p>
                            <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all whitespace-nowrap">
                              Choose a file
                            </button>
                            <p className="text-xs text-gray-400 mt-3">File size limit: 32MB</p>
                          </div>
                        )}
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <h3 className="text-white font-semibold text-base mb-4">Describe your character</h3>
                    <textarea
                      value={characterPrompt}
                      onChange={(e) => setCharacterPrompt(e.target.value)}
                      placeholder="A 27-year-old female elf fantasy warrior wearing silver-plated leather armor and a flowing emerald cloak, with braided auburn hair and armed with the longsword Dawnbringer. Personality: courageous, disciplined, stoic. Background: last guardian of the Whispering Forest, sworn to protect its ancient secrets. Special ability: Earthshatter Charge—a ground-pounding leap that creates a shockwave"
                      className="w-full h-48 px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none text-sm leading-relaxed"
                      maxLength={1000}
                    />
                    <div className="flex justify-end mt-2">
                      <span className="text-xs text-gray-500">{characterPrompt.length}/1000</span>
                    </div>
                  </>
                )}
              </div>

              {/* Premium Options */}
              <div className="bg-gray-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 space-y-4 relative z-10">
                {/* Public Visibility */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">Public Visibility</span>
                    <div 
                      className="relative"
                      onMouseEnter={() => setShowPublicTooltip(true)}
                      onMouseLeave={() => setShowPublicTooltip(false)}
                    >
                      <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                      {showPublicTooltip && (
                        <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl z-50">
                          <p className="text-xs text-gray-300">
                            Your image may be featured in our Explore feed. See terms for details.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">Copy Protection</span>
                    <div 
                      className="relative"
                      onMouseEnter={() => setShowCopyTooltip(true)}
                      onMouseLeave={() => setShowCopyTooltip(false)}
                    >
                      <i className="ri-question-line text-gray-400 text-sm cursor-help"></i>
                      {showCopyTooltip && (
                        <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl z-50">
                          <p className="text-xs text-gray-300">
                            Keep your content private. Others won't see your uploads or prompts in the community.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                onClick={() => {
                  if (imageGenTab === 'image-to-image' && !characterImage) return;
                  if (imageGenTab === 'text-to-image' && !characterPrompt.trim()) return;
                  setIsGenerating(true);
                  setTimeout(() => setIsGenerating(false), 3000);
                }}
                disabled={(imageGenTab === 'image-to-image' && !characterImage) || (imageGenTab === 'text-to-image' && !characterPrompt.trim()) || isGenerating}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                  (imageGenTab === 'image-to-image' && !characterImage) || (imageGenTab === 'text-to-image' && !characterPrompt.trim()) || isGenerating
                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105'
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
                      <span>Credits required: 10</span>
                    </div>
                  </>
                )}
              </button>
            </div>

            {/* Right Column - Preview */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-base">Preview</h3>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-purple-500/30 hover:border-purple-500/50 transition-all">
                    <i className="ri-download-line text-purple-400"></i>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-purple-500/30 hover:border-purple-500/50 transition-all">
                    <i className="ri-share-line text-purple-400"></i>
                  </button>
                </div>
              </div>

              <div className="aspect-[3/4] rounded-xl bg-slate-800/50 border-2 border-dashed border-purple-500/30 flex items-center justify-center overflow-hidden mb-6">
                {characterImage || characterPrompt ? (
                  <div className="relative w-full h-full">
                    {characterImage ? (
                      <img src={characterImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                            <i className="ri-magic-line text-3xl text-purple-400"></i>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {characterPrompt.slice(0, 150)}...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                      <i className="ri-image-line text-3xl text-purple-400"></i>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {imageGenTab === 'image-to-image' 
                        ? 'Upload an image to see preview' 
                        : 'Enter a description to see preview'}
                    </p>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <i className="ri-lightbulb-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-2">Tips</h4>
                    <ul className="text-gray-300 text-xs space-y-1.5">
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-purple-400 mt-0.5 flex-shrink-0 text-xs"></i>
                        <span>Be specific about appearance, clothing, and personality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-purple-400 mt-0.5 flex-shrink-0 text-xs"></i>
                        <span>Include background story for more depth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-purple-400 mt-0.5 flex-shrink-0 text-xs"></i>
                        <span>Try different styles for varied results</span>
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
  };

  const renderImageEnhancerContent = () => {
    const sampleImage = 'https://readdy.ai/api/search-image?query=old%20vintage%20photograph%20with%20visible%20grain%20noise%20blur%20artifacts%20faded%20colors%20low%20resolution%20damaged%20photo%20quality%20needs%20enhancement%20restoration%20aged%20photograph%20simple%20background&width=400&height=600&seq=enhance-before-v3&orientation=portrait';
    const enhancedSampleImage = 'https://readdy.ai/api/search-image?query=crystal%20clear%20high%20resolution%20photograph%20vibrant%20colors%20sharp%20details%20perfect%20clarity%20professional%20quality%20enhanced%20restored%20photo%20ultra%20HD%20quality%20beautiful%20lighting%20simple%20background&width=400&height=600&seq=enhance-after-v3&orientation=portrait';

    return (
      <div className="space-y-6">
        {/* Page Title */}
        <div className="mb-6 px-4 md:px-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Image Enhancer</h1>
          <p className="text-sm md:text-base text-gray-400">Enhance your images with AI-powered technology</p>
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
                    {enhancerImage ? (
                      <div className="relative">
                        <img src={enhancerImage} alt="Uploaded" className="w-full h-64 object-contain rounded-lg" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setEnhancerImage(null);
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

              {/* Public Visibility & Copy Protection */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
                <div className="space-y-4">
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
                            Your video may be featured in our Explore feed. See terms for details.
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
                  if (!enhancerImage) return;
                  setIsEnhancing(true);
                  setTimeout(() => setIsEnhancing(false), 3000);
                }}
                disabled={!enhancerImage || isEnhancing}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                  !enhancerImage || isEnhancing
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
                      src={sampleImage}
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
                      src={enhancedSampleImage}
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
                        <span>Use high-quality source images for better enhancement</span>
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
  };

  const renderImageUpscalerContent = () => {
    const sampleImage = 'https://readdy.ai/api/search-image?query=low%20resolution%20pixelated%20blurry%20image%20poor%20quality%20needs%20upscaling%20small%20size%20compressed%20photo%20simple%20background&width=400&height=600&seq=upscale-before-v1&orientation=portrait';
    const upscaledSampleImage = 'https://readdy.ai/api/search-image?query=ultra%20high%20resolution%20crystal%20clear%20sharp%20image%20perfect%20quality%20upscaled%20large%20size%20professional%20photo%20simple%20background&width=400&height=600&seq=upscale-after-v1&orientation=portrait';

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
                    {enhancerImage ? (
                      <div className="relative">
                        <img src={enhancerImage} alt="Uploaded" className="w-full h-64 object-contain rounded-lg" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setEnhancerImage(null);
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

              {/* Public Visibility & Copy Protection */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
                <div className="space-y-4">
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
                            Your video may be featured in our Explore feed. See terms for details.
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
                  if (!enhancerImage) return;
                  setIsEnhancing(true);
                  setTimeout(() => setIsEnhancing(false), 3000);
                }}
                disabled={!enhancerImage || isEnhancing}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                  !enhancerImage || isEnhancing
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
                      src={sampleImage}
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
                      src={upscaledSampleImage}
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
  };

  const renderBackgroundRemoverContent = () => {
    const sampleBeforeImage = 'https://app-images.litmedia.ai/upload/default/20251215/78a4f8bb2a32aa2efa5e3130cad2e521.webp';
    const sampleAfterImage = 'https://app-images.litmedia.ai/upload/admin/20251215/4ccfcb500d976144948c61f46887383f.mp4';

    return (
      <div className="space-y-6">
        {/* Page Title */}
        <div className="mb-6 px-4 md:px-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Background Remover</h1>
          <p className="text-sm md:text-base text-gray-400">Remove backgrounds from images with AI</p>
        </div>

        <div className="px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Panel */}
            <div className="space-y-6">
              {/* Upload Image */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
                <h3 className="text-white font-bold text-base mb-4">Upload Image</h3>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="bg-remover-image-upload"
                  onChange={handleBgRemoverImageUpload}
                />
                <label htmlFor="bg-remover-image-upload" className="block cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 bg-slate-800/30 hover:bg-cyan-500/5 transition-all duration-300 p-8">
                    {bgRemoverImage ? (
                      <div className="relative">
                        <img src={bgRemoverImage} alt="Uploaded" className="w-full h-64 object-contain rounded-lg" />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setBgRemoverImage(null);
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <i className="ri-close-line text-white"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-4">
                          <i className="ri-image-add-line text-3xl text-cyan-400"></i>
                        </div>
                        <p className="text-base font-medium text-white mb-2">Click to upload an image</p>
                        <p className="text-xs text-gray-400">We accept JPEG, PNG and WEBP formats up to 15MB and 4096 × 4096 pixels</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              {/* Public Visibility & Copy Protection */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
                <div className="space-y-4">
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
              </div>

              {/* Credits Info */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-sm">
                  <i className="ri-information-line text-cyan-400"></i>
                  <span className="text-gray-300">
                    Credits required: <span className="text-white font-semibold">3 Credits</span>
                  </span>
                </div>
              </div>

              {/* Create Button */}
              <button
                onClick={() => {
                  if (!bgRemoverImage) return;
                  setIsRemoving(true);
                  setTimeout(() => setIsRemoving(false), 3000);
                }}
                disabled={!bgRemoverImage || isRemoving}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                  !bgRemoverImage || isRemoving
                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105'
                }`}
              >
                {isRemoving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
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
                  <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-gray-700 bg-[#2C3E50]">
                    <img 
                      src={sampleBeforeImage}
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
                  <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20 relative bg-transparent" style={{
                    backgroundImage: 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                  }}>
                    <img 
                      src={sampleBeforeImage}
                      alt="After"
                      className="w-full h-full object-cover"
                      style={{
                        mixBlendMode: 'normal'
                      }}
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
                        <span>Use images with clear subject-background separation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0 text-xs"></i>
                        <span>Higher resolution images produce better results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0 text-xs"></i>
                        <span>Avoid images with complex or similar-colored backgrounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-cyan-400 mt-0.5 flex-shrink-0 text-xs"></i>
                        <span>Works best with portraits and product photos</span>
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
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-900/50 backdrop-blur-xl border-r border-cyan-500/20 flex-col transition-all duration-300 fixed lg:relative inset-y-0 left-0 z-50 ${isMobileSidebarOpen ? 'flex' : 'hidden lg:flex'}`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-cyan-500/20">
          {!isSidebarCollapsed && (
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <i className="ri-magic-line text-lg text-white"></i>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Pixwave AI</span>
            </Link>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 hover:bg-gray-800/50 rounded-lg transition-colors hidden lg:block"
          >
            <i className={`${isSidebarCollapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} text-lg text-cyan-400`}></i>
          </button>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1.5 hover:bg-gray-800/50 rounded-lg transition-colors lg:hidden"
          >
            <i className="ri-close-line text-lg text-cyan-400"></i>
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
          {menuItems.map(menu => (
            <div key={menu.id} className="mb-1">
              {menu.type === 'single' ? (
                <button
                  onClick={() => handleMenuClick(menu.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                    selectedMenu === menu.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-cyan-400'
                  }`}
                >
                  <i className={`${menu.icon} text-lg flex-shrink-0`}></i>
                  {!isSidebarCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">{menu.label}</span>
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => toggleSubmenu(menu.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 ${
                      expandedMenus.includes(menu.id) ? 'text-cyan-400/70 text-xs font-semibold uppercase tracking-wider mt-2 mb-1 cursor-default' : 'text-gray-300 hover:bg-gray-800/50 hover:text-cyan-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`${menu.icon} text-lg flex-shrink-0`}></i>
                      {!isSidebarCollapsed && (
                        <span className="text-sm font-medium whitespace-nowrap">{menu.label}</span>
                      )}
                    </div>
                    {!isSidebarCollapsed && (
                      <i className={`ri-arrow-${expandedMenus.includes(menu.id) ? 'down' : 'right'}-s-line text-base transition-transform`}></i>
                    )}
                  </button>

                  {/* Submenu */}
                  {expandedMenus.includes(menu.id) && !isSidebarCollapsed && menu.submenu && (
                    <div className="ml-4 mt-1 mb-2 space-y-0.5">
                      {menu.submenu.map(subItem => (
                        <button
                          key={subItem.id}
                          onClick={() => !subItem.isCategory && handleMenuClick(subItem.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                            subItem.isCategory
                              ? 'text-cyan-400/70 text-xs font-semibold uppercase tracking-wider mt-2 mb-1 cursor-default'
                              : selectedMenu === subItem.id
                              ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 font-medium'
                              : 'text-gray-400 hover:bg-gray-800/30 hover:text-gray-200'
                          }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="px-3 pb-4 border-t border-cyan-500/20 pt-4 space-y-3">
          {!isSidebarCollapsed && (
            <>
              <Link
                to="/pricing"
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 group"
              >
                <i className="ri-vip-crown-line text-lg text-white"></i>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Plus Plan</div>
                  <div className="text-xs text-cyan-100">Get the full Pixwave</div>
                </div>
              </Link>
              
              <div>
                <div className="text-xs text-gray-400 mb-2 px-2">Follow us</div>
                <div className="flex items-center gap-2 px-2">
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-cyan-400 transition-all">
                    <i className="ri-twitter-x-line text-base"></i>
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-cyan-400 transition-all">
                    <i className="ri-instagram-line text-base"></i>
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-cyan-400 transition-all">
                    <i className="ri-youtube-line text-base"></i>
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-cyan-400 transition-all">
                    <i className="ri-discord-line text-base"></i>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 h-14 md:h-16 bg-gray-900/30 backdrop-blur-xl border-b border-cyan-500/20 flex items-center justify-between px-4 md:px-6">
          {/* Left Section - Mobile Menu + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <i className="ri-menu-line text-xl text-cyan-400"></i>
            </button>

            {/* Logo - Show on mobile */}
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <i className="ri-magic-line text-base text-white"></i>
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Pixwave AI</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3 h-full">
            <button className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-all text-xs md:text-sm font-medium whitespace-nowrap h-8 md:h-10 flex items-center">
              <i className="ri-login-box-line mr-1 md:mr-2"></i>
              <span>Login</span>
            </button>
            <button className="px-2 md:px-6 py-1.5 md:py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-lg transition-all text-xs md:text-sm font-bold whitespace-nowrap shadow-lg shadow-cyan-500/30 h-8 md:h-10 flex items-center">
              <span>Start for Free</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {selectedMenu === 'HOME' && renderHomeContent()}
            {selectedMenu === 'EXPLORE' && renderExploreContent()}
            {selectedMenu === 'AI_IMAGE_GENERATOR' && renderAIImageGeneratorContent()}
            {selectedMenu === 'AI_VIDEO_GENERATOR' && renderImageToVideoContent()}
            {selectedMenu === 'MY_LIBRARY' && renderMyLibraryContent()}
            {selectedMenu === 'AI_CLOTHES_CHANGER' && renderClothesChangerContent()}
            {selectedMenu === 'AI_CHARACTER_GENERATOR' && renderAICharacterGeneratorContent()}
            {selectedMenu === 'IMAGE_ENHANCER' && renderImageEnhancerContent()}
            {selectedMenu === 'IMAGE_UPSCALER' && renderImageUpscalerContent()}
            {selectedMenu === 'BACKGROUND_REMOVER' && renderBackgroundRemoverContent()}
            
            {selectedMenu !== 'HOME' && selectedMenu !== 'EXPLORE' && selectedMenu !== 'AI_IMAGE_GENERATOR' && selectedMenu !== 'AI_VIDEO_GENERATOR' && selectedMenu !== 'MY_LIBRARY' && selectedMenu !== 'AI_CLOTHES_CHANGER' && selectedMenu !== 'AI_CHARACTER_GENERATOR' && selectedMenu !== 'IMAGE_ENHANCER' && selectedMenu !== 'IMAGE_UPSCALER' && selectedMenu !== 'BACKGROUND_REMOVER' && (
              <div className="text-center py-12">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <i className="ri-tools-line text-5xl md:text-6xl text-cyan-400"></i>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
                  This feature is under development. Stay tuned for updates!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}