import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileLanguageMenu, setShowMobileLanguageMenu] = useState(false);
  const [showExploreMenu, setShowExploreMenu] = useState(false);
  const [showMobileExploreMenu, setShowMobileExploreMenu] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowLanguageMenu(false);
    setShowMobileLanguageMenu(false);
  };

  const getCurrentLanguageLabel = () => {
    const langMap: { [key: string]: string } = {
      'en': 'English',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano',
      'es': 'Español',
      'pt': 'Português',
      'zh-TW': '繁體中文',
      'ja': '日本語',
      'ko': '한국어'
    };
    return langMap[i18n.language] || 'English';
  };

  const exploreMenuItems = {
    styles: [
      { name: 'Sketch', link: '/ai-sketch-generator', image: 'https://readdy.ai/api/search-image?query=pencil%20sketch%20drawing%20style%20portrait%20artistic%20black%20and%20white%20line%20art%20hand%20drawn%20illustration%20simple%20background&width=100&height=80&seq=style-sketch-menu&orientation=landscape' },
      { name: 'Dramatic', link: '#', image: 'https://static.readdy.ai/image/dde33ddc58c1763275b70dd673b7720c/8af728a9b5c65b4037b1b06467630087.jpeg' },
      { name: 'Plushie', link: '#', image: 'https://readdy.ai/api/search-image?query=cute%20plushie%20toy%20style%20soft%20fabric%20texture%20adorable%20kawaii%20character%20stuffed%20animal%20aesthetic%20simple%20background&width=100&height=80&seq=style-plushie-menu&orientation=landscape' },
      { name: 'Doodle', link: '#', image: 'https://readdy.ai/api/search-image?query=playful%20doodle%20art%20style%20hand%20drawn%20cartoon%20whimsical%20illustration%20colorful%20sketchy%20lines%20fun%20artistic%20simple%20background&width=100&height=80&seq=style-doodle-menu&orientation=landscape' },
      { name: 'Inkwork', link: '#', image: 'https://readdy.ai/api/search-image?query=traditional%20ink%20drawing%20style%20black%20ink%20brush%20strokes%20calligraphy%20art%20asian%20ink%20painting%20technique%20simple%20background&width=100&height=80&seq=style-inkwork-menu&orientation=landscape' },
      { name: 'Pop Art', link: '#', image: 'https://readdy.ai/api/search-image?query=vibrant%20pop%20art%20style%20portrait%20bold%20colors%20halftone%20dots%20comic%20book%20aesthetic%20andy%20warhol%20inspired%20bright%20contrasting%20colors%20simple%20background&width=100&height=80&seq=style-popart-menu&orientation=landscape' },
      { name: 'Ornament', link: '#', image: 'https://readdy.ai/api/search-image?query=decorative%20ornament%20style%20intricate%20patterns%20detailed%20embellishments%20elegant%20design%20ornate%20artistic%20elements%20simple%20background&width=100&height=80&seq=style-ornament-menu&orientation=landscape' },
      { name: 'Sugar Cookie', link: '#', image: 'https://readdy.ai/api/search-image?query=sugar%20cookie%20style%20sweet%20pastel%20colors%20soft%20rounded%20shapes%20cute%20bakery%20aesthetic%20frosted%20cookie%20design%20simple%20background&width=100&height=80&seq=style-cookie-menu&orientation=landscape' },
      { name: 'Art School', link: '#', image: 'https://readdy.ai/api/search-image?query=art%20school%20painting%20style%20classical%20technique%20fine%20art%20education%20academic%20drawing%20traditional%20artistic%20method%20simple%20background&width=100&height=80&seq=style-artschool-menu&orientation=landscape' },
      { name: 'Fisheye', link: '#', image: 'https://readdy.ai/api/search-image?query=fisheye%20lens%20effect%20wide%20angle%20distortion%20curved%20perspective%20spherical%20view%20creative%20photography%20simple%20background&width=100&height=80&seq=style-fisheye-menu&orientation=landscape' },
      { name: '3D Glam Doll', link: '#', image: 'https://readdy.ai/api/search-image?query=3D%20glam%20doll%20style%20glossy%20smooth%20surfaces%20fashion%20doll%20aesthetic%20glamorous%20makeup%20stylized%20character%20simple%20background&width=100&height=80&seq=style-glamdoll-menu&orientation=landscape' },
      { name: 'Baseball Bobblehead', link: '#', image: 'https://readdy.ai/api/search-image?query=baseball%20bobblehead%20toy%20style%20oversized%20head%20small%20body%20collectible%20figurine%20sports%20memorabilia%20simple%20background&width=100&height=80&seq=style-bobblehead-menu&orientation=landscape' }
    ],
    ideas: [
      { name: 'What would I look like as a K-Pop star?', link: '#', image: 'https://readdy.ai/api/search-image?query=kpop%20idol%20style%20portrait%20colorful%20hair%20trendy%20fashion%20korean%20pop%20star%20aesthetic%20stage%20performance%20look%20simple%20background&width=100&height=80&seq=idea-kpop-menu&orientation=landscape' },
      { name: 'Me as The Girl with a Pearl', link: '#', image: 'https://readdy.ai/api/search-image?query=girl%20with%20pearl%20earring%20painting%20style%20vermeer%20inspired%20classical%20portrait%20dutch%20golden%20age%20art%20masterpiece%20simple%20dark%20background&width=100&height=80&seq=idea-pearl-menu&orientation=landscape' },
      { name: 'Style me', link: '#', image: 'https://readdy.ai/api/search-image?query=fashion%20styling%20portrait%20trendy%20outfit%20modern%20style%20personal%20styling%20fashion%20makeover%20contemporary%20look%20simple%20background&width=100&height=80&seq=idea-style-menu&orientation=landscape' },
      { name: 'Give us a matching outfit', link: '#', image: 'https://readdy.ai/api/search-image?query=matching%20couple%20outfits%20coordinated%20fashion%20coordinating%20colors%20couple%20style%20relationship%20goals%20simple%20background&width=100&height=80&seq=idea-matching-menu&orientation=landscape' },
      { name: 'Turn into a keychain', link: '#', image: 'https://readdy.ai/api/search-image?query=cute%20keychain%20charm%20style%20miniature%20accessory%20kawaii%20design%20small%20collectible%20portable%20decoration%20simple%20background&width=100&height=80&seq=idea-keychain-menu&orientation=landscape' }
    ],
    transform: [
      { name: 'Create a holiday card', link: '#', image: 'https://readdy.ai/api/search-image?query=festive%20holiday%20greeting%20card%20design%20seasonal%20celebration%20decorative%20border%20warm%20wishes%20christmas%20card%20style%20simple%20background&width=100&height=80&seq=transform-holiday-menu&orientation=landscape' },
      { name: 'Holiday portrait', link: '#', image: 'https://readdy.ai/api/search-image?query=holiday%20portrait%20photography%20festive%20background%20seasonal%20decorations%20christmas%20theme%20family%20photo%20warm%20lighting%20simple%20background&width=100&height=80&seq=transform-portrait-menu&orientation=landscape' },
      { name: 'Create an album cover', link: '#', image: 'https://readdy.ai/api/search-image?query=music%20album%20cover%20artwork%20artistic%20design%20bold%20typography%20modern%20aesthetic%20eye-catching%20visual%20elements%20simple%20background&width=100&height=80&seq=transform-album-menu&orientation=landscape' },
      { name: 'Create a professional product photo', link: '#', image: 'https://readdy.ai/api/search-image?query=professional%20product%20photography%20clean%20studio%20lighting%20commercial%20quality%20minimalist%20composition%20elegant%20presentation%20white%20background%20simple%20background&width=100&height=80&seq=transform-product-menu&orientation=landscape' },
      { name: 'Create a professional job photo', link: '#', image: 'https://readdy.ai/api/search-image?query=professional%20business%20headshot%20corporate%20portrait%20confident%20expression%20formal%20attire%20studio%20lighting%20high%20quality%20simple%20background&width=100&height=80&seq=transform-job-menu&orientation=landscape' },
      { name: 'Redecorate my room', link: '#', image: 'https://readdy.ai/api/search-image?query=interior%20design%20room%20makeover%20modern%20furniture%20elegant%20decor%20natural%20lighting%20architectural%20rendering%20clean%20aesthetic%20simple%20background&width=100&height=80&seq=transform-room-menu&orientation=landscape' }
    ],
    fixEnhance: [
      { name: 'Remove people in the background', link: '#', image: 'https://readdy.ai/api/search-image?query=photo%20editing%20remove%20background%20people%20clean%20background%20object%20removal%20before%20and%20after%20comparison%20simple%20background&width=100&height=80&seq=fix-removepeople-menu&orientation=landscape' },
      { name: 'Remove background', link: '#', image: 'https://readdy.ai/api/search-image?query=background%20removal%20transparent%20background%20cutout%20image%20isolated%20subject%20clean%20extraction%20white%20background%20simple%20background&width=100&height=80&seq=fix-removebg-menu&orientation=landscape' },
      { name: 'Restore an old photo', link: '#', image: 'https://readdy.ai/api/search-image?query=photo%20restoration%20vintage%20photo%20repair%20old%20photograph%20enhancement%20damaged%20photo%20fix%20before%20and%20after%20restoration%20simple%20background&width=100&height=80&seq=fix-restore-menu&orientation=landscape' }
    ]
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <div className="w-full px-4 md:px-6 py-4 md:py-5">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <Link className="flex items-center gap-2 md:gap-3 group cursor-pointer flex-shrink-0" to="/">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110">
              <i className="ri-magic-line text-lg md:text-xl text-white"></i>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Pixwave AI</span>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <Link className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap" to="/ai-image-editor">
              AI Photo Editor
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap" to="/webapp">
              Web App
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
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
                  <div className="mb-8">
                    <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <i className="ri-palette-line"></i>
                      Styles
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                      {exploreMenuItems.styles.map((item) => (
                        <Link 
                          key={item.name}
                          to={item.link}
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
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <i className="ri-lightbulb-line"></i>
                      Ideas
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {exploreMenuItems.ideas.map((item) => (
                        <Link 
                          key={item.name}
                          to={item.link}
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
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <i className="ri-magic-line"></i>
                      Transform
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                      {exploreMenuItems.transform.map((item) => (
                        <Link 
                          key={item.name}
                          to={item.link}
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
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <i className="ri-tools-line"></i>
                      Fix & Enhance
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {exploreMenuItems.fixEnhance.map((item) => (
                        <Link 
                          key={item.name}
                          to={item.link}
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
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap" to="/">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link className="text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group whitespace-nowrap" to="/pricing">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="hidden md:block relative">
              <button 
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="text-sm text-gray-300 hover:text-cyan-400 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <i className="ri-global-line"></i>
                {getCurrentLanguageLabel()}
                <i className={`ri-arrow-down-s-line transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`}></i>
              </button>
              {showLanguageMenu && (
                <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-xl shadow-cyan-500/20 overflow-hidden min-w-[140px]">
                  {[
                    { code: 'en', flag: '🇺🇸', label: 'English' },
                    { code: 'fr', flag: '🇫🇷', label: 'Français' },
                    { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
                    { code: 'it', flag: '🇮🇹', label: 'Italiano' },
                    { code: 'es', flag: '🇪🇸', label: 'Español' },
                    { code: 'pt', flag: '🇵🇹', label: 'Português' },
                    { code: 'zh-TW', flag: '🇹🇼', label: '繁體中文' },
                    { code: 'ja', flag: '🇯🇵', label: '日本語' },
                    { code: 'ko', flag: '🇰🇷', label: '한국어' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="hidden md:block relative px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 whitespace-nowrap overflow-hidden group">
              <span className="relative z-10">Sign in</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-cyan-500/30 hover:bg-slate-700/50 transition-all duration-300 flex-shrink-0"
            >
              <i className={`${showMobileMenu ? 'ri-close-line' : 'ri-menu-line'} text-xl text-cyan-400`}></i>
            </button>
          </div>
        </nav>

        {showMobileMenu && (
          <div className="lg:hidden mt-4 pb-4 border-t border-cyan-500/20 pt-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link className="text-sm text-gray-300 hover:text-cyan-400 transition-colors py-2" to="/ai-image-editor" onClick={() => setShowMobileMenu(false)}>
                AI Photo Editor
              </Link>
              
              <Link className="text-sm text-gray-300 hover:text-cyan-400 transition-colors py-2" to="/webapp" onClick={() => setShowMobileMenu(false)}>
                Web App
              </Link>
              
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
                    <div>
                      <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 sticky top-0 bg-slate-900 py-2 z-10">
                        <i className="ri-palette-line"></i>
                        Styles
                      </h4>
                      <ul className="space-y-1 pl-4">
                        {['Sketch', 'Dramatic', 'Plushie', 'Doodle', 'Inkwork', 'Pop Art', 'Ornament', 'Sugar Cookie', 'Art School', 'Fisheye', '3D Glam Doll', 'Baseball Bobblehead'].map((item) => (
                          <li key={item}>
                            <Link to={item === 'Sketch' ? '/ai-sketch-generator' : '#'} className="text-sm text-gray-300 hover:text-cyan-400 transition-colors block py-1" onClick={() => { setShowMobileExploreMenu(false); setShowMobileMenu(false); }}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>

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
                            <Link href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors block py-1" onClick={() => { setShowMobileExploreMenu(false); setShowMobileMenu(false); }}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>

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
                            <Link href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors block py-1" onClick={() => { setShowMobileExploreMenu(false); setShowMobileMenu(false); }}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>

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
                            <Link href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors block py-1" onClick={() => { setShowMobileExploreMenu(false); setShowMobileMenu(false); }}>{item}</Link>
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
              
              <div className="pt-3 border-t border-cyan-500/20 relative">
                <button
                  onClick={() => setShowMobileLanguageMenu(!showMobileLanguageMenu)}
                  className="w-full flex items-center justify-between px-4 py-2 text-left text-sm rounded-lg transition-colors text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-2">
                    <i className="ri-global-line text-base"></i>
                    <span>{getCurrentLanguageLabel()}</span>
                  </div>
                  <i className={`ri-arrow-down-s-line transition-transform ${showMobileLanguageMenu ? 'rotate-180' : ''}`}></i>
                </button>
                
                {showMobileLanguageMenu && (
                  <div className="mt-2 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-xl shadow-cyan-500/20 overflow-hidden max-h-[40vh] overflow-y-auto">
                    {[
                      { code: 'en', flag: '🇺🇸', label: 'English' },
                      { code: 'fr', flag: '🇫🇷', label: 'Français' },
                      { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
                      { code: 'it', flag: '🇮🇹', label: 'Italiano' },
                      { code: 'es', flag: '🇪🇸', label: 'Español' },
                      { code: 'pt', flag: '🇵🇹', label: 'Português' },
                      { code: 'zh-TW', flag: '🇹🇼', label: '繁體中文' },
                      { code: 'ja', flag: '🇯🇵', label: '日本語' },
                      { code: 'ko', flag: '🇰🇷', label: '한국어' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setShowMobileMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="pt-3 border-t border-cyan-500/20">
                <button className="w-full px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
