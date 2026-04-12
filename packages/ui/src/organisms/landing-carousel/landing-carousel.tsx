import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './landing-carousel.css';

export interface SliderSpecification {
  label: string;
  value: string;
}

export interface SliderAction {
  label: string;
  onClick?: () => void;
}

export interface SliderItem {
  id: number | string;
  image: string;
  alt: string;
  intro: {
    title: string;
    topic: string;
    description: string;
    ctaLabel: string;
  };
  detail: {
    title: string;
    description: string;
    specifications: SliderSpecification[];
    actions: SliderAction[];
  };
}

export interface LandingCarouselHandle {
  navigateTo: (id: string | number) => void;
}

export interface LandingCarouselProps {
  items: SliderItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDetailView?: boolean;
  className?: string;
  onActiveItemChange?: (item: SliderItem) => void;
}

export const LandingCarousel = React.forwardRef<
  LandingCarouselHandle,
  LandingCarouselProps
>(
  (
    {
      items: initialItems,
      autoPlay = false,
      autoPlayInterval = 3000,
      showDetailView = false,
      className = '',
      onActiveItemChange,
    },
    ref
  ) => {
    const [items, setItems] = useState<SliderItem[]>(initialItems);
    const [isNext, setIsNext] = useState(false);
    const [isPrevious, setIsPrevious] = useState(false);
    const [isClickable, setIsClickable] = useState(true);
    const [showDetail, setShowDetail] = useState(showDetailView);
    const unAcceptClick = useRef<number | null>(null);
    const autoPlayTimer = useRef<number | null>(null);

    // Notify parent of active item (index 1 is always active)
    useEffect(() => {
      if (onActiveItemChange && items.length > 1) {
        onActiveItemChange(items[1]);
      }
    }, [items, onActiveItemChange]);

    // Expose navigateTo via ref
    React.useImperativeHandle(ref, () => ({
      navigateTo: (id: string | number) => {
        setItems((currentItems) => {
          const targetIdx = currentItems.findIndex((item) => item.id === id);
          if (targetIdx === -1 || targetIdx === 1) return currentItems;
          // Rotate so target lands at index 1
          const newStart =
            (targetIdx - 1 + currentItems.length) % currentItems.length;
          return [
            ...currentItems.slice(newStart),
            ...currentItems.slice(0, newStart),
          ];
        });
        setIsNext(false);
        setIsPrevious(false);
        setIsNext(true);
      },
    }));

    const handleShowSlider = useCallback((type: 'next' | 'prev') => {
      setIsClickable(false);
      setIsNext(false);
      setIsPrevious(false);

      if (type === 'next') {
        setItems((currentItems) => {
          const [first, ...rest] = currentItems;
          return [...rest, first];
        });
        setIsNext(true);
      } else {
        setItems((currentItems) => {
          const last = currentItems[currentItems.length - 1];
          const rest = currentItems.slice(0, currentItems.length - 1);
          return [last, ...rest];
        });
        setIsPrevious(true);
      }

      if (unAcceptClick.current) clearTimeout(unAcceptClick.current);

      unAcceptClick.current = window.setTimeout(() => {
        setIsClickable(true);
      }, 2000);
    }, []);

    const handleNext = useCallback(() => {
      if (!isClickable) return;
      handleShowSlider('next');
    }, [isClickable, handleShowSlider]);

    const handlePrevious = useCallback(() => {
      if (!isClickable) return;
      handleShowSlider('prev');
    }, [isClickable, handleShowSlider]);

    const handleBackToIntro = useCallback(() => {
      setShowDetail(false);
    }, []);

    const handleSeeMore = useCallback(() => {
      setShowDetail((prev) => !prev);
    }, []);

    useEffect(() => {
      if (autoPlay && isClickable) {
        autoPlayTimer.current = window.setTimeout(() => {
          handleNext();
        }, autoPlayInterval);
      }

      return () => {
        if (autoPlayTimer.current) {
          clearTimeout(autoPlayTimer.current);
        }
      };
    }, [autoPlay, autoPlayInterval, handleNext, isClickable]);

    useEffect(() => {
      return () => {
        if (unAcceptClick.current) clearTimeout(unAcceptClick.current);
        if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
      };
    }, []);

    return (
      <div
        className={`landing-carousel${isNext ? ' next' : ''}${isPrevious ? ' previous' : ''} ${className}`}
        role="region"
        aria-label="Product carousel"
      >
        <div className="landing-carousel__list">
          {items.map((item, index) => (
            <div
              className="landing-carousel__item"
              key={item.id}
              aria-hidden={index !== 1}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="landing-carousel__image"
                loading={index < 3 ? 'eager' : 'lazy'}
              />
              <div
                className={`landing-carousel__intro${showDetail ? ' hidden' : ''}`}
              >
                <div className="landing-carousel__title">
                  {item.intro.title}
                </div>
                <div className="landing-carousel__topic">
                  {item.intro.topic}
                </div>
                <div className="landing-carousel__description">
                  {item.intro.description}
                </div>
                <button
                  className="landing-carousel__cta"
                  onClick={() => handleSeeMore()}
                  aria-label={`View details for ${item.intro.topic}`}
                >
                  {item.intro.ctaLabel}
                </button>
              </div>
              <div
                className={`landing-carousel__detail${showDetail ? ' visible' : ''}`}
              >
                <div className="landing-carousel__detail-title">
                  {item.detail.title}
                </div>
                <div className="landing-carousel__detail-description">
                  {item.detail.description}
                </div>
                <div className="landing-carousel__specifications">
                  {item.detail.specifications.map((spec, j) => (
                    <div key={j} className="landing-carousel__spec">
                      <p className="landing-carousel__spec-label">
                        {spec.label}
                      </p>
                      <p className="landing-carousel__spec-value">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="landing-carousel__actions">
                  {item.detail.actions.map((action, k) => (
                    <button
                      key={k}
                      className="landing-carousel__action-button"
                      onClick={action.onClick}
                      type="button"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="landing-carousel__controls">
          <button
            className="landing-carousel__control landing-carousel__control--prev"
            onClick={handlePrevious}
            disabled={!isClickable}
            aria-label="Previous slide"
            type="button"
          >
            <ChevronLeft size={20} className={'text-text'} />
          </button>
          <button
            className={`landing-carousel__control landing-carousel__control--back${showDetail ? ' visible' : ''}`}
            onClick={handleBackToIntro}
            aria-label="Back to overview"
            type="button"
          >
            Back &#8599;
          </button>
          <button
            className="landing-carousel__control landing-carousel__control--next"
            onClick={handleNext}
            disabled={!isClickable}
            aria-label="Next slide"
            type="button"
          >
            <ChevronRight size={20} className={'text-text'} />
          </button>
        </div>
      </div>
    );
  }
);

LandingCarousel.displayName = 'LandingCarousel';
