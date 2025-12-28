import { Link } from 'react-router-dom';

export default function Footer() {
  return (
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
  );
}
