import { motion } from "framer-motion";
import { ArrowRight, Play, Clock, Award, TrendingUp, DollarSign, Users, Shield, BarChart3, Target, Briefcase, FileText, ExternalLink, Eye, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState, useEffect, useRef } from "react";

// Professional finance portfolio items with actual video content
const portfolioItems = [
  {
    id: "financial-restructuring",
    type: "featured",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    category: "Corporate Finance",
    impact: "$50M Impact",
    title: "Fortune 500 Financial Restructuring",
    duration: "12:30",
    description: "Led comprehensive financial restructuring for a multinational corporation, resulting in 35% cost reduction and improved cash flow management across 12 global offices.",
    detailedDescription: "A complete case study showcasing strategic financial planning, debt restructuring, and operational optimization for a Fortune 500 company. This project involved analyzing complex financial statements, negotiating with creditors, and implementing cost-cutting measures while maintaining operational efficiency.",
    tags: ["Financial Modeling", "Cost Optimization", "Process Improvement"],
    metrics: [
      { label: "Cost Reduction", value: "35%" },
      { label: "Cash Flow Improvement", value: "$50M" },
      { label: "Project Duration", value: "8 months" },
    ],
    icon: TrendingUp,
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "ma-due-diligence",
    type: "standard",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    category: "M&A Advisory",
    impact: "$125M Deal",
    title: "M&A Due Diligence Analysis",
    duration: "8:45",
    description: "Comprehensive financial due diligence for $125M acquisition, identifying key risks and value optimization opportunities.",
    detailedDescription: "Deep-dive analysis covering financial statements, tax structures, legal compliance, and market positioning. The analysis identified potential cost synergies and risk mitigation strategies, ultimately securing favorable deal terms for the client.",
    tags: ["Due Diligence", "Risk Assessment", "Valuation"],
    metrics: [
      { label: "Deal Value", value: "$125M" },
      { label: "Risk Mitigation", value: "89%" },
      { label: "Timeline", value: "6 weeks" },
    ],
    icon: Briefcase,
    span: "col-span-1",
  },
  {
    id: "startup-scaling",
    type: "standard",
    thumbnail: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    category: "Startup Growth",
    impact: "300% ROI",
    title: "Tech Startup Scaling Strategy",
    duration: "15:20",
    description: "Developed financial framework for rapid scaling, achieving 300% ROI and successful Series B funding.",
    detailedDescription: "Comprehensive growth strategy covering financial planning, investor relations, and operational scaling. The project included building financial models, preparing investor presentations, and establishing financial controls for rapid growth phases.",
    tags: ["Investment Strategy", "Growth Planning", "Investor Relations"],
    metrics: [
      { label: "ROI Achieved", value: "300%" },
      { label: "Funding Raised", value: "$15M" },
      { label: "Growth Rate", value: "250%" },
    ],
    icon: Target,
    span: "col-span-1",
  },
  {
    id: "risk-framework",
    type: "compact",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    category: "Risk Management",
    impact: "Zero Violations",
    title: "Enterprise Risk Assessment Framework",
    duration: "6:15",
    description: "Implemented comprehensive risk management system ensuring 100% regulatory compliance.",
    detailedDescription: "End-to-end risk management solution including compliance monitoring, internal controls, and crisis management protocols. The framework has maintained zero regulatory violations over 24 months.",
    tags: ["Risk Assessment", "Compliance", "Internal Controls"],
    metrics: [
      { label: "Compliance Rate", value: "100%" },
      { label: "Risk Reduction", value: "78%" },
      { label: "Implementation", value: "4 months" },
    ],
    icon: Shield,
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "cost-optimization",
    type: "standard",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1586863977290-70024218daba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    category: "Manufacturing",
    impact: "$25M Savings",
    title: "Manufacturing Cost Optimization",
    duration: "10:30",
    description: "Supply chain and operations optimization delivering $25M in annual cost savings.",
    detailedDescription: "Comprehensive analysis of manufacturing operations, supply chain efficiency, and cost structures. Implemented lean principles and technology solutions to achieve sustainable cost reductions.",
    tags: ["Cost Analysis", "Operational Efficiency", "Supply Chain"],
    metrics: [
      { label: "Annual Savings", value: "$25M" },
      { label: "Efficiency Gain", value: "42%" },
      { label: "ROI Timeline", value: "18 months" },
    ],
    icon: BarChart3,
    span: "col-span-1",
  },
  {
    id: "tax-strategy",
    type: "standard",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    category: "Tax Planning",
    impact: "$8M Savings",
    title: "Multi-Jurisdictional Tax Strategy",
    duration: "9:45",
    description: "Strategic tax planning across 15 jurisdictions, achieving $8M in annual tax optimization.",
    detailedDescription: "Complex tax strategy implementation covering transfer pricing, international tax planning, and compliance optimization. The strategy reduced effective tax rate while maintaining full regulatory compliance.",
    tags: ["Tax Optimization", "International Tax", "Compliance"],
    metrics: [
      { label: "Tax Savings", value: "$8M" },
      { label: "Jurisdictions", value: "15" },
      { label: "Compliance Rate", value: "100%" },
    ],
    icon: FileText,
    span: "col-span-1",
  },
  {
    id: "portfolio-optimization",
    type: "featured",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    category: "Investment Advisory",
    impact: "45% Returns",
    title: "Investment Portfolio Optimization",
    duration: "14:15",
    description: "Comprehensive portfolio restructuring delivering 45% annual returns through strategic asset allocation.",
    detailedDescription: "Complete investment portfolio analysis and optimization including risk assessment, asset allocation modeling, and performance monitoring. The strategy outperformed market benchmarks by 15% annually.",
    tags: ["Portfolio Management", "Risk Analysis", "Performance Optimization"],
    metrics: [
      { label: "Annual Returns", value: "45%" },
      { label: "Portfolio Value", value: "$85M" },
      { label: "Risk Reduction", value: "32%" },
    ],
    icon: DollarSign,
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "team-development",
    type: "compact",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    category: "Team Development",
    impact: "95% Satisfaction",
    title: "Finance Team Training Program",
    duration: "7:30",
    description: "Comprehensive training program improving team capabilities and achieving 95% satisfaction ratings.",
    detailedDescription: "Structured finance team development program covering technical skills, process improvement, and leadership development. The program resulted in improved team performance and reduced turnover.",
    tags: ["Training", "Team Development", "Process Improvement"],
    metrics: [
      { label: "Satisfaction Rate", value: "95%" },
      { label: "Team Members", value: "45" },
      { label: "Retention Rate", value: "92%" },
    ],
    icon: Users,
    span: "col-span-1",
  },
];

// Video modal component for mobile/detailed viewing
function VideoModal({ item, isOpen, onClose }: { item: typeof portfolioItems[0], isOpen: boolean, onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        modalVideoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-strong border border-border/20"
        aria-describedby="portfolio-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-serif gradient-text">
            {item.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Actual Video Player */}
          <div 
            className="relative aspect-video rounded-lg overflow-hidden group"
            role="region"
            aria-label={`Video player for ${item.title} case study`}
          >
            <video
              ref={modalVideoRef}
              src={item.videoUrl}
              poster={item.videoPlaceholder}
              className="w-full h-full object-cover"
              controls
              playsInline
              onEnded={handleVideoEnded}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              aria-label={`${item.title} video presentation`}
              data-testid={`modal-video-${item.id}`}
            >
              <track kind="captions" src="" label="English" default />
              Your browser does not support the video tag.
            </video>
            
            {/* Custom Play/Pause Overlay */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                onClick={toggleVideo}
                role="button"
                aria-label={`Play ${item.title} video presentation`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleVideo();
                  }
                }}
                data-testid={`play-button-modal-${item.id}`}
              >
                <div className="glass p-4 rounded-full hover-glow">
                  <Play className="w-12 h-12 text-white fill-current" aria-hidden="true" />
                </div>
              </div>
            )}
            
            {/* Duration Badge */}
            <div 
              className="absolute top-4 right-4 glass px-3 py-1 rounded-lg flex items-center text-white text-sm"
              aria-label={`Video duration: ${item.duration}`}
            >
              <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{item.duration}</span>
            </div>
          </div>
          
          {/* Project Details */}
          <div className="space-y-6" id="portfolio-modal-description">
            <div className="flex items-center justify-between">
              <span 
                className="bg-accent/20 text-accent border border-accent/30 px-4 py-2 rounded-lg font-medium"
                role="button"
                aria-label={`Project category: ${item.category}`}
              >
                {item.category}
              </span>
              <span 
                className="text-2xl font-bold gradient-text-static"
                aria-label={`Project impact: ${item.impact}`}
              >
                {item.impact}
              </span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg">
              {item.detailedDescription}
            </p>
            
            {/* Metrics Grid */}
            <div 
              className="grid grid-cols-3 gap-4"
              role="group"
              aria-label="Project performance metrics"
            >
              {item.metrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="glass-light p-4 rounded-lg text-center"
                  role="article"
                  aria-label={`${metric.label}: ${metric.value}`}
                >
                  <div className="text-2xl font-bold gradient-text-static mb-1" aria-label={metric.value}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span key={index} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Individual portfolio card component
function PortfolioCard({ item, index, hasIntersected }: { item: typeof portfolioItems[0], index: number, hasIntersected: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile and motion preferences
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    mediaQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Lazy load video when in view (performance optimization)
  useEffect(() => {
    const currentCard = cardRef.current;
    if (!currentCard) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoInView(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current && !videoRef.current.src) {
          videoRef.current.src = item.videoUrl;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentCard);
    return () => observer.disconnect();
  }, [item.videoUrl]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMobile && !prefersReducedMotion && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silently handle autoplay failures
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isMobile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const renderCard = () => {
    const baseClasses = "glass-strong rounded-2xl shadow-xl hover-lift hover-glow border border-border/20 relative overflow-hidden cursor-pointer transition-all duration-500";
    
    switch (item.type) {
      case "featured":
        return (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`${baseClasses} ${item.span} min-h-[400px]`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title} case study. ${item.description} Project impact: ${item.impact}`}
            aria-describedby={`card-description-${item.id}`}
            data-testid={`portfolio-card-${item.id}`}
          >
            {/* Background Video with Overlay */}
            <div className="absolute inset-0">
              <video
                ref={videoRef}
                src={isVideoInView ? item.videoUrl : ''}
                poster={item.thumbnail}
                className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                muted
                playsInline
                loop
                preload="none"
                aria-label={`${item.title} - ${item.category} case study video featuring ${item.impact} impact`}
                data-testid={`video-${item.id}`}
              >
                Your browser does not support the video tag.
              </video>
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-90' : 'opacity-70'}`} />
            </div>
            
            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-end text-white">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="glass bg-accent/30 text-accent border border-accent/50 px-3 py-1 rounded-lg text-sm font-medium">
                    {item.category}
                  </span>
                  <div className="flex items-center glass px-3 py-1 rounded-lg text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.duration}
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold font-serif mb-2">{item.title}</h3>
                <div className="text-accent font-semibold text-lg mb-3">{item.impact}</div>
              </div>
              
              {/* Description */}
              <p 
                className="text-white/90 mb-6 leading-relaxed"
                id={`card-description-${item.id}`}
              >
                {item.description}
              </p>
              
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {item.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="glass-light p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-accent">{metric.value}</div>
                    <div className="text-xs text-white/70">{metric.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Action */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="glass p-3 rounded-full hover-glow transition-all duration-300 group"
                  aria-label={isMobile ? "View case study details" : "Play video presentation"}
                  tabIndex={-1}
                >
                  {isMobile ? <Eye className="w-5 h-5" aria-hidden="true" /> : <Play className="w-5 h-5 fill-current" aria-hidden="true" />}
                </button>
              </div>
            </div>
            
            {/* Hover Play Overlay */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none"
              >
                <div className="glass p-6 rounded-full">
                  <Play className="w-12 h-12 text-white fill-current" />
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      
      case "compact":
        return (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`${baseClasses} ${item.span} min-h-[280px]`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title} case study. ${item.description} Project impact: ${item.impact}`}
            data-testid={`portfolio-card-${item.id}`}
          >
            {/* Video Thumbnail */}
            <div className="relative h-40 overflow-hidden">
              <video
                ref={videoRef}
                src={isVideoInView ? item.videoUrl : ''}
                poster={item.thumbnail}
                className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                muted
                playsInline
                loop
                preload="none"
                aria-label={`${item.title} case study video`}
                data-testid={`video-${item.id}`}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass p-3 rounded-full opacity-80 hover:opacity-100 transition-opacity">
                  {isMobile ? <Eye className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white fill-current" />}
                </div>
              </div>
              
              {/* Duration */}
              <div className="absolute top-3 right-3 glass px-2 py-1 rounded text-white text-xs flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {item.duration}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-accent/20 text-accent border border-accent/30 px-2 py-1 rounded text-xs font-medium">
                  {item.category}
                </span>
                <span className="text-accent font-semibold text-sm">{item.impact}</span>
              </div>
              
              <h3 className="text-xl font-bold font-serif mb-2">{item.title}</h3>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      
      case "standard":
      default:
        return (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`${baseClasses} ${item.span} min-h-[350px]`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title} case study. ${item.description} Project impact: ${item.impact}`}
            data-testid={`portfolio-card-${item.id}`}
          >
            {/* Video Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <video
                ref={videoRef}
                src={isVideoInView ? item.videoUrl : ''}
                poster={item.thumbnail}
                className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                muted
                playsInline
                loop
                preload="none"
                aria-label={`${item.title} case study video`}
                data-testid={`video-${item.id}`}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass p-4 rounded-full opacity-80 hover:opacity-100 transition-opacity">
                  {isMobile ? <Eye className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white fill-current" />}
                </div>
              </div>
              
              {/* Duration */}
              <div className="absolute top-3 right-3 glass px-3 py-1 rounded-lg text-white text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {item.duration}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-accent/20 text-accent border border-accent/30 px-3 py-1 rounded-lg text-sm font-medium">
                  {item.category}
                </span>
                <span className="text-accent font-semibold">{item.impact}</span>
              </div>
              
              <h3 className="text-2xl font-bold font-serif mb-3">{item.title}</h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <>
      {renderCard()}
      <VideoModal 
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default function PortfolioSection() {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section id="portfolio" className="py-20 bg-muted" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 gradient-text">Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing successful financial transformations and strategic implementations across diverse industries and business scales through interactive case studies and video presentations.
          </p>
        </motion.div>

        {/* MiladiCode-style Dynamic Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-12">
          {portfolioItems.map((item, index) => (
            <PortfolioCard 
              key={item.id}
              item={item}
              index={index}
              hasIntersected={hasIntersected}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center glass-strong p-8 rounded-2xl shadow-xl border border-border/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-primary via-accent to-primary"></div>
          <div className="relative">
            <h3 className="text-2xl font-bold font-serif mb-4 gradient-text">Interested in Learning More?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Each case study demonstrates our comprehensive approach to financial problem-solving. Contact us to discuss how these proven strategies can be applied to your business challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="glass bg-primary/20 text-primary border border-primary/30 px-8 py-3 rounded-xl font-semibold hover-lift hover-glow transition-all duration-300 shadow-lg"
                data-testid="button-contact-portfolio"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Schedule Consultation
              </Button>
              <Button 
                variant="outline"
                className="glass border-2 border-accent/30 text-accent px-8 py-3 rounded-xl font-semibold hover-lift transition-all duration-300 shadow-lg"
                data-testid="button-view-all-cases"
              >
                View All Case Studies
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}