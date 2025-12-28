
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function AIBackgroundRemover() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string>('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProcessedUrl('');
    }
  };

  const handleRemoveBackground = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessedUrl(previewUrl);
      setIsProcessing(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (processedUrl) {
      const link = document.createElement('a');
      link.href = processedUrl;
      link.download = 'background-removed.png';
      link.click();
    }
  };

  const exampleImages = [
    {
      original: 'https://readdy.ai/api/search-image?query=professional%20business%20person%20standing%20in%20office%20environment%20with%20clean%20simple%20background%20corporate%20attire%20confident%20pose%20natural%20lighting%20high%20quality%20portrait%20photography%20style&width=400&height=500&seq=bg-remover-example-1&orientation=portrait',
      removed: 'https://readdy.ai/api/search-image?query=professional%20business%20person%20standing%20isolated%20on%20pure%20white%20background%20transparent%20background%20effect%20corporate%20attire%20confident%20pose%20studio%20lighting%20cutout%20style%20clean%20edges&width=400&height=500&seq=bg-remover-example-2&orientation=portrait'
    },
    {
      original: 'https://readdy.ai/api/search-image?query=beautiful%20product%20photography%20luxury%20watch%20on%20wooden%20table%20with%20natural%20background%20soft%20lighting%20elegant%20composition%20high%20end%20commercial%20photography%20style&width=400&height=500&seq=bg-remover-example-3&orientation=portrait',
      removed: 'https://readdy.ai/api/search-image?query=luxury%20watch%20isolated%20on%20pure%20white%20background%20transparent%20background%20effect%20product%20photography%20studio%20lighting%20clean%20professional%20cutout%20style%20sharp%20details&width=400&height=500&seq=bg-remover-example-4&orientation=portrait'
    },
    {
      original: 'https://readdy.ai/api/search-image?query=cute%20pet%20dog%20sitting%20in%20living%20room%20with%20furniture%20background%20natural%20indoor%20lighting%20adorable%20expression%20home%20environment%20casual%20pet%20photography%20style&width=400&height=500&seq=bg-remover-example-5&orientation=portrait',
      removed: 'https://readdy.ai/api/search-image?query=cute%20pet%20dog%20sitting%20isolated%20on%20pure%20white%20background%20transparent%20background%20effect%20adorable%20expression%20studio%20lighting%20clean%20cutout%20style%20professional%20pet%20photography&width=400&height=500&seq=bg-remover-example-6&orientation=portrait'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            AI Background Remover
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Remove backgrounds from images instantly with AI. Perfect for product photos, portraits, and professional designs. No manual editing required.
          </p>
          
          {/* Upload Area */}
          <div className="max-w-2xl mx-auto">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 bg-gray-50 hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <i className="ri-upload-cloud-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Image</h3>
                  <p className="text-gray-500 mb-4">Drag and drop or click to browse</p>
                  <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all whitespace-nowrap">
                    Choose File
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      {previewUrl && (
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Original */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="ri-image-line mr-2 text-purple-600"></i>
                  Original Image
                </h3>
                <div className="w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
                  <img src={previewUrl} alt="Original" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Processed */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="ri-scissors-cut-line mr-2 text-pink-600"></i>
                  Background Removed
                </h3>
                <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden relative">
                  {isProcessing ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Processing...</p>
                      </div>
                    </div>
                  ) : processedUrl ? (
                    <img src={processedUrl} alt="Processed" className="w-full h-full object-contain" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <p>Click "Remove Background" to process</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleRemoveBackground}
                disabled={isProcessing || !selectedFile}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isProcessing ? 'Processing...' : 'Remove Background'}
              </button>
              {processedUrl && (
                <button
                  onClick={handleDownload}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:shadow-lg transition-all whitespace-nowrap"
                >
                  <i className="ri-download-line mr-2"></i>
                  Download
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Examples Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">See the Magic in Action</h2>
            <p className="text-xl text-gray-600">AI-powered background removal with pixel-perfect precision</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {exampleImages.map((example, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-100">
                    <img src={example.original} alt={`Example ${index + 1} Original`} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                    Before
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                    <img src={example.removed} alt={`Example ${index + 1} Removed`} className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium">
                    After
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our AI Background Remover?</h2>
            <p className="text-xl text-gray-600">Professional results in seconds</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-flashlight-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Remove backgrounds in seconds with our advanced AI technology. No waiting, no hassle.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-focus-3-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Pixel-Perfect Precision</h3>
              <p className="text-gray-600">AI-powered edge detection ensures clean, professional results every time.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-image-edit-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Multiple Use Cases</h3>
              <p className="text-gray-600">Perfect for e-commerce, portraits, social media, and professional designs.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-download-cloud-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">High-Quality Output</h3>
              <p className="text-gray-600">Download images in high resolution with transparent backgrounds (PNG format).</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy Protected</h3>
              <p className="text-gray-600">Your images are processed securely and never stored on our servers.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-smartphone-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Works Everywhere</h3>
              <p className="text-gray-600">Use on any device - desktop, tablet, or mobile. No app installation required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perfect For Every Need</h2>
            <p className="text-xl text-gray-600">From e-commerce to social media, we've got you covered</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-shopping-bag-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">E-commerce</h3>
              <p className="text-gray-600 text-sm">Create professional product photos with clean white backgrounds</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-user-smile-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Portraits</h3>
              <p className="text-gray-600 text-sm">Remove distracting backgrounds from profile pictures and headshots</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-instagram-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Social Media</h3>
              <p className="text-gray-600 text-sm">Create eye-catching posts and stories with transparent backgrounds</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-palette-line text-xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Design Projects</h3>
              <p className="text-gray-600 text-sm">Prepare images for graphic design, presentations, and marketing materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to perfect results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Image</h3>
              <p className="text-gray-600">Choose any image from your device or drag and drop it into the upload area</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">AI Processing</h3>
              <p className="text-gray-600">Our AI automatically detects and removes the background in seconds</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Download Result</h3>
              <p className="text-gray-600">Download your image with a transparent background in high quality PNG format</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-3">What image formats are supported?</h3>
              <p className="text-gray-600">We support all common image formats including JPG, PNG, WEBP, and more. The output is always in PNG format with a transparent background.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Is there a file size limit?</h3>
              <p className="text-gray-600">You can upload images up to 10MB in size. For best results, we recommend using high-quality images with clear subjects.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-3">How accurate is the AI background removal?</h3>
              <p className="text-gray-600">Our AI is trained on millions of images and achieves professional-grade accuracy. It works especially well with clear subjects and good contrast.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Can I use the images commercially?</h3>
              <p className="text-gray-600">Yes! You have full rights to use the processed images for any purpose, including commercial projects.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Do you store my images?</h3>
              <p className="text-gray-600">No, we respect your privacy. Images are processed in real-time and are not stored on our servers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Remove Backgrounds?</h2>
          <p className="text-xl mb-8 opacity-90">Start creating professional images with transparent backgrounds today</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all whitespace-nowrap"
          >
            Get Started Free
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
