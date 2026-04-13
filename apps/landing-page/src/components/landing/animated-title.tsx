'use client';
import { useEffect, useState } from 'react';

interface AnimatedTitleProps {
  messages: string[];
  className?: string;
  align?: 'left' | 'center';
}

type Phase = 'idle' | 'exiting' | 'resetting' | 'entering';

export function AnimatedTitle({
  messages,
  className = '',
  align = 'center',
}: AnimatedTitleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');

  // Idle: wait 2.4s then start exit
  useEffect(() => {
    if (phase !== 'idle' || messages.length <= 1) return;
    const timer = setTimeout(() => setPhase('exiting'), 2400);
    return () => clearTimeout(timer);
  }, [currentIndex, phase, messages.length]);

  // Exiting: word slides up — after 380ms, advance index and reset position
  useEffect(() => {
    if (phase !== 'exiting') return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
      setPhase('resetting');
    }, 380);
    return () => clearTimeout(timer);
  }, [phase, messages.length]);

  // Resetting: new word positioned below with no transition — wait one paint cycle
  useEffect(() => {
    if (phase !== 'resetting') return;
    const timer = setTimeout(() => setPhase('entering'), 20);
    return () => clearTimeout(timer);
  }, [phase]);

  // Entering: word slides in — after 380ms, back to idle
  useEffect(() => {
    if (phase !== 'entering') return;
    const timer = setTimeout(() => setPhase('idle'), 380);
    return () => clearTimeout(timer);
  }, [phase]);

  const getWordStyle = (): React.CSSProperties => {
    const transition =
      'transform 380ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 380ms ease';
    switch (phase) {
      case 'idle':
        return { transform: 'translateY(0)', opacity: 1, transition };
      case 'exiting':
        return { transform: 'translateY(-115%)', opacity: 0, transition };
      case 'resetting':
        return {
          transform: 'translateY(115%)',
          opacity: 0,
          transition: 'none',
        };
      case 'entering':
        return { transform: 'translateY(0)', opacity: 1, transition };
    }
  };

  return (
    <span
      className="relative inline-grid"
      style={{ overflow: 'hidden', verticalAlign: 'bottom' }}
      aria-live="polite"
      aria-label={messages[currentIndex]}
    >
      {messages.map((msg, i) => (
        <span
          key={i}
          className={`row-start-1 col-start-1 invisible whitespace-nowrap ${className}`}
          aria-hidden="true"
        >
          {msg}
        </span>
      ))}
      <span
        className={`absolute inset-0 flex items-center ${align === 'left' ? 'justify-start' : 'justify-center'} whitespace-nowrap ${className}`}
        style={getWordStyle()}
      >
        {messages[currentIndex]}
      </span>
    </span>
  );
}
