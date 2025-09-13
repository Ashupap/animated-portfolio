import { useState, useEffect, useCallback, useMemo } from "react";

/**
 * Performance monitoring hook for video playback
 */
export function useVideoPerformance() {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    isLowPerformanceDevice: false,
    hasSlowConnection: false,
    prefersReducedMotion: false,
    supportsWebP: false,
    supportsWebM: false,
    batteryLevel: 1,
    isChargingBattery: true,
  });

  const [shouldOptimize, setShouldOptimize] = useState(false);

  // Detect device and connection performance
  useEffect(() => {
    const detectCapabilities = async () => {
      const metrics = { ...performanceMetrics };

      // Check for reduced motion preference
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      metrics.prefersReducedMotion = reducedMotionQuery.matches;

      // Check connection quality
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        metrics.hasSlowConnection = 
          connection.effectiveType === 'slow-2g' || 
          connection.effectiveType === '2g' ||
          connection.downlink < 1.5;
      }

      // Check device performance indicators
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      const deviceMemory = (navigator as any).deviceMemory || 4;
      metrics.isLowPerformanceDevice = hardwareConcurrency < 4 || deviceMemory < 4;

      // Check video format support
      const video = document.createElement('video');
      metrics.supportsWebP = video.canPlayType('image/webp') !== '';
      metrics.supportsWebM = video.canPlayType('video/webm') !== '';

      // Check battery status (if available)
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          metrics.batteryLevel = battery.level;
          metrics.isChargingBattery = battery.charging;
        } catch (error) {
          // Battery API not available, use defaults
        }
      }

      setPerformanceMetrics(metrics);

      // Determine if we should optimize based on performance indicators
      setShouldOptimize(
        metrics.isLowPerformanceDevice ||
        metrics.hasSlowConnection ||
        metrics.prefersReducedMotion ||
        (metrics.batteryLevel < 0.2 && !metrics.isChargingBattery)
      );
    };

    detectCapabilities();

    // Listen for connection changes
    const handleConnectionChange = () => detectCapabilities();
    
    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', handleConnectionChange);
      return () => {
        (navigator as any).connection.removeEventListener('change', handleConnectionChange);
      };
    }
  }, []);

  const getOptimizedVideoSettings = useMemo(() => ({
    shouldUseVideo: !shouldOptimize && !performanceMetrics.prefersReducedMotion,
    shouldUseWebM: performanceMetrics.supportsWebM && !shouldOptimize,
    shouldPreload: !performanceMetrics.hasSlowConnection && performanceMetrics.batteryLevel > 0.5,
    qualityLevel: shouldOptimize ? 'low' : 'high',
    overlayComplexity: shouldOptimize ? 'simple' : 'full',
    enableStarfield: !shouldOptimize && !performanceMetrics.prefersReducedMotion,
    blurStrength: shouldOptimize ? 'low' : 'high',
  }), [shouldOptimize, performanceMetrics]);

  const reportPerformanceMetric = useCallback((metric: string, value: number) => {
    // In a real app, this could send to analytics
    if (import.meta.env.DEV) {
      console.log(`Video Performance Metric: ${metric} = ${value}`);
    }
  }, []);

  return {
    performanceMetrics,
    shouldOptimize,
    getOptimizedVideoSettings,
    reportPerformanceMetric,
  };
}

/**
 * Advanced intersection observer hook for video performance
 */
export function useAdvancedIntersectionObserver(options: {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  performanceOptimized?: boolean;
} = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  
  const observerRef = useCallback((node: Element | null) => {
    if (!node) return;

    const {
      threshold = [0, 0.1, 0.5, 1],
      rootMargin = "50px",
      triggerOnce = false,
      performanceOptimized = true,
    } = options;

    // Use single threshold for performance optimization on low-end devices
    const effectiveThreshold = performanceOptimized && 
      (navigator.hardwareConcurrency || 2) < 4 ? 0.1 : threshold;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);

        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(node);
        }
      },
      {
        threshold: effectiveThreshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => observer.unobserve(node);
  }, [options.threshold, options.rootMargin, options.triggerOnce, options.performanceOptimized]);

  return {
    observerRef,
    entry,
    isIntersecting,
    intersectionRatio,
    isFullyVisible: intersectionRatio >= 1,
    isPartiallyVisible: intersectionRatio > 0,
  };
}

/**
 * Video loading optimization hook
 */
export function useVideoLoadOptimization() {
  const [loadState, setLoadState] = useState<
    'idle' | 'loading' | 'loaded' | 'error' | 'fallback'
  >('idle');
  const [loadTime, setLoadTime] = useState<number>(0);
  const [retryCount, setRetryCount] = useState(0);
  const [shouldUseFallback, setShouldUseFallback] = useState(false);

  const { performanceMetrics } = useVideoPerformance();

  const startLoad = useCallback(() => {
    setLoadState('loading');
    setLoadTime(Date.now());
  }, []);

  const onLoadSuccess = useCallback(() => {
    const duration = Date.now() - loadTime;
    setLoadState('loaded');
    
    // Report load time for performance monitoring
    if (import.meta.env.DEV) {
      console.log(`Video loaded in ${duration}ms`);
    }
  }, [loadTime]);

  const onLoadError = useCallback(() => {
    const newRetryCount = retryCount + 1;
    setRetryCount(newRetryCount);

    // After 2 retries or on low performance devices, use fallback
    if (newRetryCount >= 2 || performanceMetrics.isLowPerformanceDevice) {
      setLoadState('fallback');
      setShouldUseFallback(true);
    } else {
      setLoadState('error');
      
      // Retry after delay
      setTimeout(() => {
        setLoadState('loading');
      }, 1000 * newRetryCount);
    }
  }, [retryCount, performanceMetrics.isLowPerformanceDevice]);

  const reset = useCallback(() => {
    setLoadState('idle');
    setRetryCount(0);
    setShouldUseFallback(false);
    setLoadTime(0);
  }, []);

  return {
    loadState,
    retryCount,
    shouldUseFallback,
    startLoad,
    onLoadSuccess,
    onLoadError,
    reset,
    isLoading: loadState === 'loading',
    isLoaded: loadState === 'loaded',
    hasError: loadState === 'error',
    shouldShowFallback: loadState === 'fallback' || shouldUseFallback,
  };
}

/**
 * Frame rate monitoring hook
 */
export function useFrameRateMonitor() {
  const [frameRate, setFrameRate] = useState<number>(60);
  const [isDroppingFrames, setIsDroppingFrames] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = Date.now();
    let animationId: number;

    const monitor = () => {
      frameCount++;
      const now = Date.now();

      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        setFrameRate(fps);
        setIsDroppingFrames(fps < 50);
        
        frameCount = 0;
        lastTime = now;
      }

      animationId = requestAnimationFrame(monitor);
    };

    // Only monitor in development or when explicitly enabled
    if (import.meta.env.DEV) {
      monitor();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return {
    frameRate,
    isDroppingFrames,
    performanceGrade: frameRate >= 55 ? 'good' : frameRate >= 45 ? 'fair' : 'poor',
  };
}

/**
 * Memory usage monitoring hook for video components
 */
export function useVideoMemoryMonitor() {
  const [memoryUsage, setMemoryUsage] = useState({
    used: 0,
    total: 0,
    percentage: 0,
  });

  useEffect(() => {
    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const used = memory.usedJSHeapSize / 1024 / 1024; // MB
        const total = memory.totalJSHeapSize / 1024 / 1024; // MB
        const percentage = Math.round((used / total) * 100);

        setMemoryUsage({ used, total, percentage });
      }
    };

    const interval = setInterval(checkMemory, 5000); // Check every 5 seconds
    checkMemory(); // Initial check

    return () => clearInterval(interval);
  }, []);

  const shouldReduceQuality = useMemo(() => {
    return memoryUsage.percentage > 80; // Reduce quality if memory usage > 80%
  }, [memoryUsage.percentage]);

  return {
    memoryUsage,
    shouldReduceQuality,
    isMemoryPressure: memoryUsage.percentage > 90,
  };
}