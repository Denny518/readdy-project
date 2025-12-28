import { SEO } from '../../utils/seo';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy - Pixwave AI"
        description="Learn about how Pixwave AI protects your privacy and handles your data. Our commitment to user privacy and data security."
        keywords="privacy policy, data protection, user privacy, Pixwave AI"
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
              <h1 className="text-5xl font-black text-white mb-4">Privacy Policy</h1>
              <p className="text-gray-400 text-lg">Last updated: January 15, 2025</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-cyan-500/20 p-8 md:p-12 shadow-2xl space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-information-line text-cyan-400"></i>
                  </div>
                  1. Overview
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Welcome to Pixwave AI. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices regarding data collection, usage, and protection when you use our AI-powered image generation platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-shield-check-line text-cyan-400"></i>
                  </div>
                  2. Information We Do Not Collect
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We believe in minimal data collection. We do not:
                </p>
                <ul className="list-none space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Require mandatory user registration or account creation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Store your text prompts or generated images permanently</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Collect personally identifiable information without consent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Use tracking cookies for advertising purposes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-close-circle-line text-red-400 mt-1"></i>
                    <span>Share your data with third-party advertisers</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-database-line text-cyan-400"></i>
                  </div>
                  3. Information We Process
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To provide our services, we temporarily process:
                </p>
                <ul className="list-none space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-cyan-400 mt-1"></i>
                    <span>Text prompts submitted for image generation (processed in real-time)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-cyan-400 mt-1"></i>
                    <span>Generated images during the creation process</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-cyan-400 mt-1"></i>
                    <span>Anonymous usage statistics for service improvement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-cyan-400 mt-1"></i>
                    <span>Technical data such as IP addresses for security purposes</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-settings-line text-cyan-400"></i>
                  </div>
                  4. How We Use Information
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Any information we process is used exclusively for:
                </p>
                <ul className="list-none space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <i className="ri-arrow-right-s-line text-purple-400 mt-1"></i>
                    <span>Generating AI images based on your text descriptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-arrow-right-s-line text-purple-400 mt-1"></i>
                    <span>Enhancing service performance and quality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-arrow-right-s-line text-purple-400 mt-1"></i>
                    <span>Maintaining platform security and preventing abuse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-arrow-right-s-line text-purple-400 mt-1"></i>
                    <span>Analyzing usage patterns to improve user experience</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-cyan-400"></i>
                  </div>
                  5. Data Retention Policy
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement a strict no-storage policy for user-generated content. All text prompts and generated images are processed in real-time and automatically deleted immediately after generation is complete. We do not maintain any permanent database of user content or creative work.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-lock-line text-cyan-400"></i>
                  </div>
                  6. Security Measures
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement industry-standard security measures to protect against unauthorized access, alteration, disclosure, or destruction of data. Our platform operates on secure, encrypted connections (HTTPS/TLS), and we regularly update our security protocols to address emerging threats.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-cyan-400"></i>
                  </div>
                  7. Children's Privacy
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Our service is not directed to individuals under the age of 13. We do not knowingly collect or process personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately so we can take appropriate action.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-refresh-line text-cyan-400"></i>
                  </div>
                  8. Policy Updates
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify users of any material changes by posting the updated policy on this page with a new "Last updated" date. Continued use of our service after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-user-settings-line text-cyan-400"></i>
                  </div>
                  9. Your Rights
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Since we do not collect or store personal data, there is typically no user data to access, correct, delete, or export. However, you have the right to:
                </p>
                <ul className="list-none space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line text-cyan-400 mt-1"></i>
                    <span>Request information about our data practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line text-cyan-400 mt-1"></i>
                    <span>Opt out of optional data collection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line text-cyan-400 mt-1"></i>
                    <span>Contact us with privacy concerns</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-mail-line text-cyan-400"></i>
                  </div>
                  10. Contact Us
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
                  <p className="text-cyan-300 font-semibold mb-2">Email:</p>
                  <a href="mailto:privacy@pixwave.ai" className="text-white hover:text-cyan-400 transition-colors text-lg">
                    privacy@pixwave.ai
                  </a>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-scales-line text-cyan-400"></i>
                  </div>
                  11. Legal Basis
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We process the minimal required information based on our legitimate interests in providing and improving the service while maintaining user privacy and security. Our practices comply with applicable data protection regulations including GDPR and CCPA.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
