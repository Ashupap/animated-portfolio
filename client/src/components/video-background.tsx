import { useEffect, useRef, useState, memo } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { VideoAssetManager, VIDEO_CONFIG } from "@/lib/video-assets";

export interface VideoAsset {
  id: string;
  title: string;
  webm?: string;
  mp4: string;
  poster: string;
  duration?: number;
  theme: 'abstract' | 'professional' | 'corporate' | 'finance';
}

export interface VideoBackgroundProps {
  /** Video asset to display */
  asset: VideoAsset;
  /** Enable starfield animation overlay */
  enableStarfield?: boolean;
  /** Custom overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Custom overlay gradient */
  overlayGradient?: string;
  /** Show video controls (for debugging) */
  showControls?: boolean;
  /** Pause video when not visible */
  pauseOnHidden?: boolean;
  /** Force mobile fallback */
  forceMobileFallback?: boolean;
  /** Custom className */
  className?: string;
  /** Callback when video loads */
  onVideoLoad?: () => void;
  /** Callback when video fails to load */
  onVideoError?: (error: Error) => void;
}

const VideoBackground = memo(function VideoBackground({
  asset,
  enableStarfield = false,
  overlayOpacity = 0.4,
  overlayGradient,
  showControls = false,
  pauseOnHidden = true,
  forceMobileFallback = false,
  className = "",
  onVideoLoad,
  onVideoError,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldShowVideo, setShouldShowVideo] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentAsset, setCurrentAsset] = useState(asset);
  const [isRetrying, setIsRetrying] = useState(false);

  // Intersection observer for performance - fixed containerRef reference
  const { elementRef: containerRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "50px",
    triggerOnce: false,
  });

  // Reset state when asset changes
  useEffect(() => {
    setCurrentAsset(asset);
    setRetryCount(0);
    setHasError(false);
    setIsLoaded(false);
    setIsRetrying(false);
  }, [asset]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check if device supports video and is not mobile
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hasLowPerformance = 'connection' in navigator && 
      (navigator as any).connection?.effectiveType === 'slow-2g' || 
      (navigator as any).connection?.effectiveType === '2g';
    
    setShouldShowVideo(
      !forceMobileFallback && 
      !isMobile && 
      !hasLowPerformance && 
      !prefersReducedMotion &&
      'IntersectionObserver' in window
    );
  }, [forceMobileFallback, prefersReducedMotion]);

  // Video loading and error handling
  useEffect(() => {
    if (!shouldShowVideo || !videoRef.current) return;

    const video = videoRef.current;
    
    const handleLoadedData = () => {
      setIsLoaded(true);
      setHasError(false);
      onVideoLoad?.();
    };

    const handleError = (e: Event) => {
      const error = new Error(`Video failed to load: ${currentAsset.title}`);
      
      if (retryCount < VIDEO_CONFIG.MAX_RETRY_ATTEMPTS && !isRetrying) {
        // Retry with delay
        setIsRetrying(true);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          setHasError(false);
          setIsRetrying(false);
          // Force video reload by updating its src
          if (videoRef.current) {
            videoRef.current.load();
          }
        }, VIDEO_CONFIG.RETRY_DELAY * (retryCount + 1));
      } else {
        // Max retries reached, fallback to alternative asset
        if (currentAsset.id !== VideoAssetManager.getFallbackAsset().id) {
          setCurrentAsset(VideoAssetManager.getFallbackAsset());
          setRetryCount(0);
          setIsRetrying(false);
          setHasError(false);
        } else {
          // Even fallback failed, show poster only
          setHasError(true);
          setIsLoaded(false);
          onVideoError?.(error);
        }
      }
    };

    const handleCanPlay = () => {
      if (video.paused && isIntersecting) {
        video.play().catch(handleError);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [shouldShowVideo, currentAsset, onVideoLoad, onVideoError, isIntersecting, retryCount, isRetrying]);

  // Intersection-based play/pause
  useEffect(() => {
    if (!videoRef.current || !shouldShowVideo || !pauseOnHidden) return;

    const video = videoRef.current;
    
    if (isIntersecting && video.paused) {
      video.play().catch(console.warn);
    } else if (!isIntersecting && !video.paused) {
      video.pause();
    }
  }, [isIntersecting, shouldShowVideo, pauseOnHidden]);

  // Starfield animation
  useEffect(() => {
    if (!enableStarfield || !canvasRef.current || !isLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let isAnimating = false;
    const stars: Array<{x: number, y: number, radius: number, opacity: number, speed: number}> = [];

    // Initialize stars
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      if (!isAnimating) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.radius;
          star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!isAnimating && !prefersReducedMotion && (!pauseOnHidden || isIntersecting)) {
        isAnimating = true;
        animate();
      }
    };

    const stopAnimation = () => {
      if (isAnimating) {
        isAnimating = false;
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      }
    };

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Start animation based on current state
    startAnimation();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      stopAnimation();
    };
  }, [enableStarfield, isLoaded, prefersReducedMotion, isIntersecting, pauseOnHidden]);

  const defaultOverlayGradient = overlayGradient || 
    "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)";

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      data-testid="video-background-container"
    >
      {shouldShowVideo && !hasError ? (
        <>
          {/* Video Element */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            controls={showControls}
            poster={currentAsset.poster}
            preload="metadata"
            data-testid="video-background-video"
          >
            {currentAsset.webm && (
              <source src={currentAsset.webm} type="video/webm" />
            )}
            <source src={currentAsset.mp4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Starfield Canvas Overlay */}
          {enableStarfield && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none starfield-overlay"
              style={{ zIndex: 1 }}
              data-testid="starfield-canvas"
            />
          )}
        </>
      ) : null}

      {/* Poster Image Fallback (always rendered for immediate display) */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          shouldShowVideo && isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${currentAsset.poster})` }}
        data-testid="video-background-poster"
      />

      {/* Custom Overlay */}
      <div
        className="absolute inset-0 video-overlay"
        style={{
          background: defaultOverlayGradient,
          opacity: overlayOpacity,
          zIndex: 2,
        }}
        data-testid="video-background-overlay"
      />

      {/* Loading State */}
      {shouldShowVideo && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
});

export default VideoBackground;