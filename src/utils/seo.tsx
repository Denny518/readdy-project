import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
}

export function SEO({ title, description, keywords, canonical, ogImage, schema }: SEOProps) {
  const location = useLocation();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  const fullUrl = canonical || `${siteUrl}${location.pathname}`;
  const defaultOgImage = `${siteUrl}/og-image.jpg`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullUrl;

    // Update Open Graph tags
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage || defaultOgImage, true);

    // Update Twitter tags
    updateMetaTag('twitter:url', fullUrl);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage || defaultOgImage);

    // Update last-modified
    const today = new Date().toISOString().split('T')[0];
    updateMetaTag('last-modified', today);

    // Add or update Schema.org JSON-LD
    if (schema) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, fullUrl, ogImage, schema]);

  return null;
}

// Schema.org generators
export const generateWebPageSchema = (title: string, description: string, url: string) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url || siteUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Pixwave AI',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Pixwave AI',
      url: siteUrl
    }
  };
};

export const generateWebSiteSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pixwave AI',
    description: 'Advanced free AI image generator. Create stunning images from text descriptions.',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

export const generateSoftwareApplicationSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pixwave AI Image Generator',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250'
    },
    description: 'Free AI image generator with unlimited generations. Create stunning images from text descriptions in seconds.',
    url: siteUrl,
    screenshot: `${siteUrl}/screenshot.jpg`,
    featureList: [
      'Unlimited free generations',
      'No login required',
      'Lightning-fast speed',
      'High-quality output',
      'Privacy protected',
      'Multiple AI models'
    ]
  };
};

export const generateFAQPageSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

export const generateProductSchema = (name: string, description: string, price: number, currency: string) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: `${siteUrl}/product-image.jpg`,
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: siteUrl
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '850'
    }
  };
};
