import { VideoAsset } from "@/components/video-background";

/**
 * Video Asset Manifest for Finance Professional Website
 * 
 * This system manages video backgrounds with appropriate fallbacks
 * and themes suitable for financial services and professional consulting.
 */

export const VIDEO_ASSETS: Record<string, VideoAsset> = {
  // Primary hero background - Abstract financial data/charts
  hero_primary: {
    id: "hero_primary",
    title: "Abstract Financial Data Flow",
    mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
    duration: 30,
    theme: "finance",
  },

  // Alternative 1 - Professional corporate environment
  hero_corporate: {
    id: "hero_corporate", 
    title: "Modern Corporate Environment",
    mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
    duration: 25,
    theme: "corporate",
  },

  // Alternative 2 - Abstract technology/data visualization
  hero_abstract: {
    id: "hero_abstract",
    title: "Abstract Data Visualization",
    mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
    duration: 20,
    theme: "abstract",
  },

  // Professional consultation/meeting
  hero_professional: {
    id: "hero_professional",
    title: "Professional Consultation",
    mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    poster: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
    duration: 35,
    theme: "professional",
  },
};

/**
 * Backup/fallback video URLs for reliability
 */
export const BACKUP_VIDEO_ASSETS: Record<string, VideoAsset> = {
  // Simpler, more reliable video sources as fallbacks
  hero_simple_abstract: {
    id: "hero_simple_abstract",
    title: "Simple Abstract Background",
    mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
    duration: 10,
    theme: "abstract",
  },

  hero_simple_professional: {
    id: "hero_simple_professional", 
    title: "Simple Professional Background",
    mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
    duration: 15,
    theme: "professional",
  },
};

/**
 * Video asset configuration and management utilities
 */
export class VideoAssetManager {
  private static defaultAsset: VideoAsset = VIDEO_ASSETS.hero_primary;
  private static fallbackAsset: VideoAsset = BACKUP_VIDEO_ASSETS.hero_simple_abstract;

  /**
   * Get video asset by ID with fallback handling
   */
  static getAsset(assetId: string): VideoAsset {
    return VIDEO_ASSETS[assetId] || BACKUP_VIDEO_ASSETS[assetId] || this.defaultAsset;
  }

  /**
   * Get all assets by theme
   */
  static getAssetsByTheme(theme: VideoAsset['theme']): VideoAsset[] {
    return Object.values(VIDEO_ASSETS).filter(asset => asset.theme === theme);
  }

  /**
   * Get recommended asset for hero section
   */
  static getHeroAsset(): VideoAsset {
    return this.getAsset('hero_primary');
  }

  /**
   * Get fallback asset when primary fails
   */
  static getFallbackAsset(): VideoAsset {
    return this.fallbackAsset;
  }

  /**
   * Validate video asset URLs (for development/testing)
   */
  static async validateAsset(asset: VideoAsset): Promise<boolean> {
    try {
      // Check if poster image loads
      const img = new Image();
      img.src = asset.poster;
      
      return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        
        // Timeout after 5 seconds
        setTimeout(() => resolve(false), 5000);
      });
    } catch (error) {
      console.warn('Video asset validation failed:', asset.id, error);
      return false;
    }
  }

  /**
   * Preload critical video assets
   */
  static async preloadAsset(asset: VideoAsset): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      // Preload poster image
      const img = new Image();
      img.src = asset.poster;

      // For video, we'll rely on the video element's preload="metadata"
      // to avoid downloading entire video files unnecessarily
      
    } catch (error) {
      console.warn('Asset preload failed:', asset.id, error);
    }
  }

  /**
   * Get responsive poster image URL with size optimization
   */
  static getOptimizedPoster(asset: VideoAsset, width = 1920, quality = 80): string {
    // For Unsplash images, we can add query parameters for optimization
    if (asset.poster.includes('unsplash.com')) {
      return `${asset.poster}&w=${width}&q=${quality}&fm=webp`;
    }
    
    return asset.poster;
  }
}

/**
 * Default configuration for video backgrounds
 */
export const VIDEO_CONFIG = {
  // Performance settings
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: "50px",
  
  // Overlay settings  
  DEFAULT_OVERLAY_OPACITY: 0.4,
  HERO_OVERLAY_GRADIENT: "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(37, 99, 235, 0.2) 40%, rgba(0,0,0,0.5) 100%)",
  
  // Starfield settings
  STARFIELD_STAR_COUNT: 50,
  STARFIELD_SPEED_RANGE: [0.1, 0.6],
  STARFIELD_SIZE_RANGE: [0.5, 2.5],
  STARFIELD_OPACITY_RANGE: [0.2, 1.0],
  
  // Mobile breakpoint
  MOBILE_BREAKPOINT: 768,
  
  // Error retry settings
  MAX_RETRY_ATTEMPTS: 2,
  RETRY_DELAY: 1000,
} as const;

export default VideoAssetManager;