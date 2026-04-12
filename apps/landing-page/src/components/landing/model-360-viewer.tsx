'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@staamina/ui/utils';
import { Info, Zap, Shield, Settings, Star } from 'lucide-react';

// Panel position type
type PanelPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'
  | 'bottom-center';

// Hotspot configuration type
export interface Hotspot {
  id: string;
  x: number; // Position X in percentage (0-100)
  y: number; // Position Y in percentage (0-100)
  frameStart: number; // First frame where hotspot is visible
  frameEnd: number; // Last frame where hotspot is visible
  icon: 'info' | 'zap' | 'shield' | 'settings' | 'star';
  title: string;
  description: string;
  features?: string[]; // Optional list of features/specs
  color?: string; // Optional custom color
  panelPosition?: PanelPosition; // Optional panel position for this hotspot
}

interface Model360ViewerProps {
  baseURL?: string;
  firstFrame?: number;
  lastFrame?: number;
  filePrefix?: string;
  fileExtension?: string;
  timestamp?: string;
  className?: string;
  autoPlayOnLoad?: boolean;
  hotspots?: Hotspot[];
}

const iconMap = {
  info: Info,
  zap: Zap,
  shield: Shield,
  settings: Settings,
  star: Star,
};

// Default hotspots for demo (positioned for the car model)
const defaultHotspots: Hotspot[] = [
  {
    id: 'engine',
    x: 35,
    y: 45,
    frameStart: 0,
    frameEnd: 15,
    icon: 'zap',
    title: 'Moteur Haute Performance',
    description:
      'Moteur électrique de dernière génération offrant une puissance exceptionnelle et une efficacité énergétique optimale.',
    color: '#f59e0b',
    panelPosition: 'bottom-left',
  },
  {
    id: 'wheels',
    x: 25,
    y: 70,
    frameStart: 10,
    frameEnd: 30,
    icon: 'settings',
    title: 'Jantes Alliage Premium',
    description:
      'Jantes en alliage léger 20 pouces avec système de freinage haute performance.',
    color: '#8b5cf6',
    panelPosition: 'top-left',
  },
  {
    id: 'safety',
    x: 50,
    y: 35,
    frameStart: 25,
    frameEnd: 45,
    icon: 'shield',
    title: 'Sécurité Avancée',
    description:
      'Système de sécurité à 360° avec capteurs et assistance à la conduite autonome.',
    color: '#10b981',
    panelPosition: 'bottom-center',
  },
  {
    id: 'design',
    x: 70,
    y: 40,
    frameStart: 40,
    frameEnd: 60,
    icon: 'star',
    title: 'Design Aérodynamique',
    description:
      'Carrosserie sculptée par le vent avec un coefficient de traînée de 0.21 Cx.',
    color: '#ec4899',
    panelPosition: 'bottom-left',
  },
  {
    id: 'tech',
    x: 55,
    y: 50,
    frameStart: 55,
    frameEnd: 75,
    icon: 'info',
    title: 'Technologie Connectée',
    description:
      'Interface intuitive avec écran OLED 15 pouces et connectivité 5G intégrée.',
    color: '#3b82f6',
    panelPosition: 'bottom-right',
  },
];

// Hotspot button component
function HotspotButton({
  hotspot,
  isActive,
  onActivate,
}: {
  hotspot: Hotspot;
  isActive: boolean;
  onActivate: () => void;
}) {
  const Icon = iconMap[hotspot.icon];
  const color = hotspot.color || '#8b5cf6';

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onActivate();
    },
    [onActivate]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={cn(
        'absolute z-20 transform -translate-x-1/2 -translate-y-1/2',
        'transition-all duration-200 ease-out cursor-pointer',
        'focus:outline-none',
        isActive ? 'scale-110' : 'hover:scale-105'
      )}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
      }}
      aria-label={`Voir les détails: ${hotspot.title}`}
    >
      {/* Subtle pulse ring */}
      {!isActive && (
        <span
          className="absolute inset-[-3px] rounded-full animate-pulse opacity-30"
          style={{ backgroundColor: color }}
        />
      )}

      {/* Main button */}
      <span
        className={cn(
          'relative flex items-center justify-center',
          'w-8 h-8 rounded-full',
          'backdrop-blur-sm transition-all duration-200',
          isActive ? 'ring-2 ring-white/50' : ''
        )}
        style={{
          backgroundColor: isActive ? color : `${color}99`,
          boxShadow: `0 2px 8px ${color}44`,
        }}
      >
        <Icon className="w-4 h-4 text-white/90" />
      </span>
    </button>
  );
}

// Get position classes based on panel position
function getPanelPositionClasses(position: PanelPosition): string {
  switch (position) {
    case 'bottom-right':
      return 'bottom-4 right-4 left-4 sm:left-auto sm:w-64';
    case 'bottom-left':
      return 'bottom-4 left-4 right-4 sm:right-auto sm:w-64';
    case 'top-right':
      return 'top-4 right-4 left-4 sm:left-auto sm:w-64';
    case 'top-left':
      return 'top-4 left-4 right-4 sm:right-auto sm:w-64';
    case 'bottom-center':
      return 'bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-72';
    default:
      return 'bottom-4 right-4 left-4 sm:left-auto sm:w-64';
  }
}

// Get animation classes based on panel position
function getPanelAnimationClasses(
  position: PanelPosition,
  isVisible: boolean
): string {
  if (!isVisible) {
    switch (position) {
      case 'top-right':
      case 'top-left':
        return 'opacity-0 -translate-y-4 scale-95';
      case 'bottom-center':
        return 'opacity-0 translate-y-4 scale-95';
      case 'bottom-left':
        return 'opacity-0 -translate-x-4 scale-95';
      default:
        return 'opacity-0 translate-x-4 scale-95';
    }
  }
  return 'opacity-100 translate-x-0 translate-y-0 scale-100';
}

// Compact Information Panel (overlay inside the viewer)
function InfoPanel({
  hotspot,
  isVisible,
  position = 'bottom-right',
}: {
  hotspot: Hotspot | null;
  isVisible: boolean;
  position?: PanelPosition;
}) {
  const color = hotspot?.color || '#8b5cf6';

  return (
    <div
      className={cn(
        'absolute z-30 pointer-events-auto',
        'transition-all duration-300 ease-out',
        getPanelPositionClasses(position),
        getPanelAnimationClasses(position, isVisible && !!hotspot)
      )}
    >
      {hotspot && (
        <div
          className={cn(
            'rounded-xl overflow-hidden',
            'bg-black/50 backdrop-blur-lg',
            'border border-white/[0.08]',
            'shadow-xl'
          )}
        >
          {/* Accent line */}
          <div
            className="h-0.5 w-full opacity-60"
            style={{
              background: `linear-gradient(90deg, ${color}, transparent)`,
            }}
          />

          {/* Content */}
          <div className="p-3.5">
            {/* Title */}
            <h3 className="text-white/95 font-medium text-sm leading-snug mb-1">
              {hotspot.title}
            </h3>

            {/* Description */}
            <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
              {hotspot.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function Model360Viewer({
  baseURL = 'https://s1.pixriot.com/433181dfa6/WebRotate360.com/imagerotator_examples/home-page-car/images/',
  firstFrame = 292,
  lastFrame = 371,
  filePrefix = 'SF109',
  fileExtension = 'webp',
  timestamp = '1731896515',
  className,
  autoPlayOnLoad = false,
  hotspots = defaultHotspots,
}: Model360ViewerProps) {
  const totalFrames = lastFrame - firstFrame + 1;

  const [images, setImages] = useState<(HTMLImageElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const viewerRef = useRef<HTMLDivElement>(null);
  const currentXRef = useRef(0);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const shouldAutoPlayRef = useRef(autoPlayOnLoad);

  // Get visible hotspots for current frame
  const visibleHotspots = hotspots.filter((hotspot) => {
    // Handle wrap-around case
    if (hotspot.frameStart <= hotspot.frameEnd) {
      return (
        currentFrame >= hotspot.frameStart && currentFrame <= hotspot.frameEnd
      );
    } else {
      // Wrap around (e.g., frameStart: 70, frameEnd: 10)
      return (
        currentFrame >= hotspot.frameStart || currentFrame <= hotspot.frameEnd
      );
    }
  });

  // Handle hotspot activation
  const handleHotspotActivate = useCallback(
    (hotspot: Hotspot) => {
      if (activeHotspot?.id === hotspot.id) {
        // Toggle off
        setIsPanelVisible(false);
        setTimeout(() => setActiveHotspot(null), 300);
      } else {
        // Activate new hotspot
        setActiveHotspot(hotspot);
        setIsPanelVisible(true);
      }
    },
    [activeHotspot]
  );

  // Close panel
  const closePanel = useCallback(() => {
    setIsPanelVisible(false);
    setTimeout(() => setActiveHotspot(null), 300);
  }, []);

  const startAutoPlay = useCallback(() => {
    setIsAutoPlaying(true);
    closePanel();
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 50);
  }, [totalFrames, closePanel]);

  // Load images
  useEffect(() => {
    const loadImages = async () => {
      let loadedCount = 0;

      // Create promises for parallel loading
      const imagePromises = Array.from(
        { length: totalFrames },
        async (_, index) => {
          const i = firstFrame + index;
          const img = new Image();
          const url = `${baseURL}${filePrefix}${i}.${fileExtension}?t=${timestamp}`;
          img.src = url;

          try {
            await new Promise<void>((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = () => reject();
            });
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
            return img;
          } catch (error) {
            console.warn(`Failed to load: ${url}`);
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
            return null;
          }
        }
      );

      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [
    baseURL,
    firstFrame,
    lastFrame,
    filePrefix,
    fileExtension,
    timestamp,
    totalFrames,
  ]);

  // Handle auto-play after loading
  useEffect(() => {
    if (isLoaded && shouldAutoPlayRef.current) {
      startAutoPlay();
      shouldAutoPlayRef.current = false;
    }
  }, [isLoaded, startAutoPlay]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
    setIsAutoPlaying(false);
  }, []);

  const handleFrameChange = useCallback(
    (deltaX: number) => {
      const sensitivity = 2;
      const frameDelta = Math.round(-deltaX / sensitivity);

      if (frameDelta !== 0) {
        setCurrentFrame((prev) => {
          let newFrame = prev + frameDelta;
          if (newFrame < 0) {
            newFrame = totalFrames + newFrame;
          } else if (newFrame >= totalFrames) {
            newFrame = newFrame - totalFrames;
          }
          return newFrame;
        });
      }
    },
    [totalFrames]
  );

  // Mouse events
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isLoaded) return;
      setIsDragging(true);
      currentXRef.current = e.clientX;
      stopAutoPlay();
    },
    [isLoaded, stopAutoPlay]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - currentXRef.current;
      currentXRef.current = e.clientX;
      handleFrameChange(deltaX);
    },
    [isDragging, handleFrameChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isLoaded) return;
      const touch = e.touches[0];
      setIsDragging(true);
      currentXRef.current = touch.clientX;
      stopAutoPlay();
    },
    [isLoaded, stopAutoPlay]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = touch.clientX - currentXRef.current;
      currentXRef.current = touch.clientX;
      handleFrameChange(deltaX);
    },
    [isDragging, handleFrameChange]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Wheel event
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!isLoaded) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? 1 : -1;
      setCurrentFrame((prev) => {
        let newFrame = prev + delta;
        if (newFrame < 0) {
          newFrame = totalFrames - 1;
        } else if (newFrame >= totalFrames) {
          newFrame = 0;
        }
        return newFrame;
      });
      stopAutoPlay();
    },
    [isLoaded, totalFrames, stopAutoPlay]
  );

  // Add global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  const currentImage = images[currentFrame];

  return (
    <div className={cn('relative w-full', className)}>
      {/* Viewer container */}
      <div
        ref={viewerRef}
        className={cn(
          'relative w-full aspect-[16/9] overflow-hidden',
          'select-none',
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
        onClick={closePanel}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="w-10 h-10 border-3 border-white/20 border-t-white/80 rounded-full animate-spin mb-3" />
            <p className="text-white/60 text-sm">{loadProgress}%</p>
          </div>
        )}

        {/* Image - Using img tag for 360 viewer with preloaded external images */}
        {isLoaded && currentImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentImage.src}
            alt={`360 view - frame ${currentFrame + 1}`}
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />
        )}

        {/* Hotspots */}
        {isLoaded &&
          !isDragging &&
          visibleHotspots.map((hotspot) => (
            <HotspotButton
              key={hotspot.id}
              hotspot={hotspot}
              isActive={activeHotspot?.id === hotspot.id}
              onActivate={() => {
                stopAutoPlay();
                handleHotspotActivate(hotspot);
              }}
            />
          ))}

        {/* Compact Info Panel - position based on hotspot config */}
        <InfoPanel
          hotspot={activeHotspot}
          isVisible={isPanelVisible}
          position={activeHotspot?.panelPosition}
        />

        {/* Drag hint overlay - only show when no hotspots visible and panel closed */}
        {isLoaded &&
          !isDragging &&
          !isAutoPlaying &&
          !isPanelVisible &&
          visibleHotspots.length === 0 && (
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
              <div className="bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <p className="text-white/50 text-xs flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                  Glissez pour pivoter
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
