const logger = require("../utils/logger");
const { AppError } = require("../middleware/error.middleware");
const { Blog } = require("../models");

class SEOService {
  constructor() {
    this.defaultMetaTags = {
      title: "Online Therapy Clinic - Professional Mental Health Services",
      description:
        "Access professional mental health services online. Connect with licensed therapists for personalized therapy sessions.",
      keywords: [
        "online therapy",
        "mental health",
        "counseling",
        "psychotherapy",
        "telehealth",
      ],
    };
  }

  async generateMetaTags(content, type = "page") {
    try {
      logger.info("Generating meta tags for:", { type, contentId: content.id });

      let metaTags = {
        title: "",
        description: "",
        keywords: [],
      };

      switch (type) {
        case "blog":
          metaTags = await this._generateBlogMetaTags(content);
          break;
        case "therapist":
          metaTags = this._generateTherapistMetaTags(content);
          break;
        case "service":
          metaTags = this._generateServiceMetaTags(content);
          break;
        default:
          metaTags = this.defaultMetaTags;
      }

      logger.info("Meta tags generated successfully:", {
        type,
        contentId: content.id,
      });
      return metaTags;
    } catch (error) {
      logger.error("Failed to generate meta tags:", error);
      throw new AppError("Failed to generate meta tags", 500);
    }
  }

  async _generateBlogMetaTags(blog) {
    const title = blog.metaTitle || `${blog.title} - Online Therapy Blog`;
    const description =
      blog.metaDescription || this._truncateText(blog.content, 160);
    const keywords = blog.seoKeywords || this._extractKeywords(blog.content);

    return {
      title,
      description,
      keywords: [...new Set([...keywords, ...this.defaultMetaTags.keywords])],
    };
  }

  _generateTherapistMetaTags(therapist) {
    const title = `${therapist.firstName} ${
      therapist.lastName
    } - ${therapist.specialization.join(", ")} Therapist`;
    const description = `Connect with ${therapist.firstName} ${
      therapist.lastName
    }, a specialized ${therapist.specialization.join(
      ", "
    )} therapist. ${therapist.bio.substring(0, 100)}...`;
    const keywords = [
      ...therapist.specialization,
      "online therapy",
      "therapist",
      therapist.firstName,
      therapist.lastName,
    ];

    return { title, description, keywords };
  }

  _generateServiceMetaTags(service) {
    const title = `${service.name} - Online Therapy Services`;
    const description = `${service.name}: ${service.description.substring(
      0,
      150
    )}...`;
    const keywords = [
      service.name,
      "online therapy",
      "mental health services",
      ...service.tags,
    ];

    return { title, description, keywords };
  }

  _truncateText(text, length) {
    return text.length > length ? text.substring(0, length) + "..." : text;
  }

  _extractKeywords(content) {
    // Simple keyword extraction - can be enhanced with NLP
    const words = content.toLowerCase().split(/\W+/);
    const wordFreq = {};

    words.forEach((word) => {
      if (word.length > 3) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    return Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  async generateSitemap() {
    try {
      logger.info("Generating sitemap");

      const blogs = await Blog.findAll({
        where: { status: "published" },
        attributes: ["slug", "updatedAt"],
      });

      const sitemap = {
        pages: [
          { url: "/", priority: 1.0 },
          { url: "/about", priority: 0.8 },
          { url: "/services", priority: 0.8 },
          { url: "/therapists", priority: 0.9 },
          { url: "/contact", priority: 0.7 },
        ],
        blogs: blogs.map((blog) => ({
          url: `/blog/${blog.slug}`,
          lastmod: blog.updatedAt,
          priority: 0.6,
        })),
      };

      logger.info("Sitemap generated successfully");
      return sitemap;
    } catch (error) {
      logger.error("Failed to generate sitemap:", error);
      throw new AppError("Failed to generate sitemap", 500);
    }
  }

  async generateRobotsTxt() {
    return `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${process.env.BASE_URL}/sitemap.xml
    `.trim();
  }
}

module.exports = new SEOService();
