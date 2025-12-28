import { SEO } from '../../utils/seo';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function TermsOfServicePage() {
  return (
    <>
      <SEO
        title="Terms of Service - Pixwave AI"
        description="Read the Terms of Service for Pixwave AI. Learn about user obligations, service usage guidelines, and our commitment to providing quality AI image generation services."
        keywords="terms of service, user agreement, service terms, Pixwave AI"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-1/4 right-0 animate-pulse"></div>
        </div>

        <Header />

        {/* Main Content */}
        <main className="relative pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-black text-white mb-4">Terms of Service</h1>
              <p className="text-gray-400 text-lg">Last updated: January 15, 2025</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-cyan-500/20 p-8 md:p-12 shadow-2xl space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-file-text-line text-cyan-400"></i>
                  </div>
                  1. Agreement to Terms
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Welcome to Pixwave AI. By accessing or using our AI-powered image generation platform at pixwave.ai ("the Service"), you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully before using the Service. If you do not agree with any part of these Terms, you must not use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-service-line text-cyan-400"></i>
                  </div>
                  2. Service Description
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Pixwave AI is an advanced AI image generation platform that transforms text descriptions into high-quality visual content. Our service utilizes cutting-edge artificial intelligence models to create images across various styles including photorealistic, artistic, and abstract formats. Users can generate images from text prompts without mandatory registration, though premium features may require account creation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-user-follow-line text-cyan-400"></i>
                  </div>
                  3. User Responsibilities
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  By using our Service, you agree to:
                </p>
                <ul className="list-none space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line text-cyan-400 mt-1"></i>
                    <span>Use the Service in compliance with all applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line text-cyan-400 mt-1"></i>
                    <span>Not attempt to circumvent any usage limitations or security measures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line text-cyan-400 mt-1"></i>
                    <span>Not use the Service for any illegal, harmful, or unauthorized purposes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line text-cyan-400 mt-1"></i>
                    <span>Not interfere with or disrupt the Service, servers, or networks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line text-cyan-400 mt-1"></i>
                    <span>Not generate content that violates intellectual property rights or contains harmful material</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line text-cyan-400 mt-1"></i>
                    <span>Maintain the confidentiality of your account credentials if you create an account</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-copyright-line text-cyan-400"></i>
                  </div>
                  4. Intellectual Property and Usage Rights
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Images generated through our Service are subject to the following terms:
                </p>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-4">
                  <h3 className="text-white font-semibold mb-3">Free Plan Users:</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You may use generated images for personal, non-commercial purposes. Attribution to Pixwave AI is appreciated but not required.
                  </p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3">Premium Plan Users:</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You receive full commercial usage rights for all images generated, including the ability to use them in client work, products, marketing materials, and resale. However, you acknowledge that certain prompts or outputs may be subject to third-party intellectual property rights.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-shield-user-line text-cyan-400"></i>
                  </div>
                  5. Privacy and Data Protection
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Our privacy practices are outlined in our Privacy Policy, which is incorporated into these Terms by reference. We do not store user prompts or generated images permanently, and we do not require user registration for basic service access. We are committed to protecting your privacy and maintaining the security of any information we process.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-server-line text-cyan-400"></i>
                  </div>
                  6. Service Availability
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  While we strive to maintain continuous service availability and optimal performance, we do not guarantee uninterrupted or error-free access to the Service. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice, for maintenance, updates, or other operational reasons.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-alert-line text-cyan-400"></i>
                  </div>
                  7. Content Guidelines and Prohibited Uses
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You agree not to generate or attempt to generate:
                </p>
                <ul className="list-none space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Content that violates any applicable laws or regulations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Hateful, discriminatory, or offensive content targeting individuals or groups</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Content that infringes on intellectual property rights of others</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Sexually explicit, pornographic, or adult content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Content intended to harass, abuse, threaten, or harm others</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Misleading or deceptive content, including deepfakes without disclosure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Content promoting violence, illegal activities, or dangerous behavior</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-error-warning-line text-cyan-400"></i>
                  </div>
                  8. Disclaimer of Warranties
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. We make no guarantees regarding the accuracy, quality, or suitability of generated images for any particular purpose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-shield-cross-line text-cyan-400"></i>
                  </div>
                  9. Limitation of Liability
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  To the maximum extent permitted by law, Pixwave AI and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-refresh-line text-cyan-400"></i>
                  </div>
                  10. Changes to Terms
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify or update these Terms at any time at our sole discretion. We will notify users of material changes by posting the updated Terms on this page with a new "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Terms. We encourage you to review these Terms periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-forbid-line text-cyan-400"></i>
                  </div>
                  11. Termination
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including but not limited to breach of these Terms. Upon termination, your right to use the Service will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-scales-3-line text-cyan-400"></i>
                  </div>
                  12. Governing Law
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Pixwave AI operates, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-mail-line text-cyan-400"></i>
                  </div>
                  13. Contact Information
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us at:
                </p>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
                  <p className="text-cyan-300 font-semibold mb-2">Email:</p>
                  <a href="mailto:support@pixwave.ai" className="text-white hover:text-cyan-400 transition-colors text-lg">
                    support@pixwave.ai
                  </a>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
