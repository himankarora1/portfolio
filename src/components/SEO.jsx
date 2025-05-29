// components/SEO.jsx - Complete SEO Enhancement System
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateSEOData, contentData } from '../utils/contentManager';

const SEO = ({ 
  title,
  description,
  keywords,
  image,
  canonical,
  article = false,
  schema,
  noindex = false,
  author,
  publishDate,
  modifiedDate
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Generate page-specific SEO data
  const getSEOData = () => {
    if (currentPath.startsWith('/tech')) {
      return generateSEOData('tech');
    } else if (currentPath.startsWith('/artist')) {
      return generateSEOData('artist');
    } else {
      return generateSEOData('home');
    }
  };

  const seoData = getSEOData();
  const pageTitle = title || seoData.title;
  const pageDescription = description || seoData.description;
  const pageImage = image || seoData.image;
  const pageKeywords = keywords || seoData.keywords;
  const canonicalUrl = canonical || `${seoData.url}${currentPath}`;
  const pageAuthor = author || contentData.personal.name;
  
  // Generate JSON-LD schema
  const generateSchema = () => {
    if (schema) return schema;

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": contentData.personal.name,
      "url": contentData.meta.site_url,
      "image": pageImage,
      "description": pageDescription,
      "jobTitle": currentPath.startsWith('/tech') ? "Full Stack Developer" : "Full Stack Developer & Content Creator",
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "Northeastern University",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Boston",
          "addressRegion": "MA",
          "addressCountry": "US"
        }
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Northeastern University"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": contentData.personal.location.split(', ')[0],
        "addressRegion": contentData.personal.location.split(', ')[1],
        "addressCountry": "US"
      },
      "email": contentData.personal.email,
      "sameAs": [
        contentData.social.github,
        contentData.social.linkedin,
        contentData.social.youtube_music,
        contentData.social.instagram,
        contentData.social.x_twitter
      ],
      "knowsAbout": [
        "Web Development",
        "React",
        "Python",
        "Machine Learning",
        "Data Analysis",
        "Full Stack Development",
        "JavaScript",
        "Node.js",
        "AWS",
        "Content Creation",
        "Music Production"
      ]
    };

    // Add tech-specific schema
    if (currentPath.startsWith('/tech')) {
      return {
        ...baseSchema,
        "@type": ["Person", "SoftwareApplication"],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Full Stack Developer",
          "occupationLocation": {
            "@type": "City",
            "name": "Boston, MA"
          },
          "skills": contentData.meta.keywords.slice(2, 8) // Take relevant tech skills
        },
        "makesOffer": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Stack Development Services",
            "description": "Professional web development, machine learning, and data analysis services"
          }
        }
      };
    }

    // Add artist-specific schema
    if (currentPath.startsWith('/artist')) {
      return {
        ...baseSchema,
        "@type": ["Person", "MusicGroup"],
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "Content Creator"
          },
          {
            "@type": "Occupation", 
            "name": "Musician"
          }
        ],
        "genre": ["Gaming", "Music Production", "Educational Content"],
        "memberOf": {
          "@type": "Organization",
          "name": "YouTube Creator Community"
        }
      };
    }

    // Article schema for blog posts
    if (article) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": pageTitle,
        "description": pageDescription,
        "image": pageImage,
        "author": {
          "@type": "Person",
          "name": pageAuthor,
          "url": contentData.meta.site_url
        },
        "publisher": {
          "@type": "Person",
          "name": contentData.personal.name,
          "logo": {
            "@type": "ImageObject",
            "url": `${contentData.meta.site_url}/images/logo.png`
          }
        },
        "datePublished": publishDate || new Date().toISOString(),
        "dateModified": modifiedDate || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      };
    }

    return baseSchema;
  };

  // Generate breadcrumb schema
  const generateBreadcrumbSchema = () => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    if (pathSegments.length === 0) return null;

    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": contentData.meta.site_url
      }
    ];

    let currentUrl = contentData.meta.site_url;
    pathSegments.forEach((segment, index) => {
      currentUrl += `/${segment}`;
      breadcrumbs.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segment.charAt(0).toUpperCase() + segment.slice(1),
        "item": currentUrl
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    };
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={pageAuthor} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={contentData.meta.site_name} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific OG tags */}
      {article && (
        <>
          <meta property="article:author" content={pageAuthor} />
          {publishDate && <meta property="article:published_time" content={publishDate} />}
          {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:creator" content="@himankarora" />
      <meta name="twitter:site" content="@himankarora" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={contentData.personal.name} />

      {/* Language and Geo Tags */}
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="US-MA" />
      <meta name="geo.placename" content="Boston" />
      <meta name="geo.position" content="42.3601;-71.0589" />
      <meta name="ICBM" content="42.3601, -71.0589" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://github.com" />
      <link rel="dns-prefetch" href="https://linkedin.com" />
      <link rel="dns-prefetch" href="https://instagram.com" />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href={contentData.meta.favicon} />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(generateSchema())}
      </script>

      {/* Breadcrumb Schema */}
      {generateBreadcrumbSchema() && (
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema())}
        </script>
      )}

      {/* Performance hints */}
      {currentPath === '/' && (
        <>
          <link rel="preload" href="/images/hero-bg.jpg" as="image" />
          <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        </>
      )}

      {/* Additional page-specific preloads */}
      {currentPath.startsWith('/tech') && (
        <link rel="preload" href="/images/tech-bg.jpg" as="image" />
      )}

      {currentPath.startsWith('/artist') && (
        <link rel="preload" href="/images/artist-bg.jpg" as="image" />
      )}
    </Helmet>
  );
};

export default SEO;