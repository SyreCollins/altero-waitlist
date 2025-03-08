
import { useEffect, useState, useRef, RefObject } from 'react';

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.1 }
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [options]);

  return [ref, isInView];
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(Number((currentScrollY / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScroll);
    
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return progress;
}

export function useLazyLoadImage() {
  useEffect(() => {
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        // Fix type errors by properly casting Element to HTMLImageElement
        const imgElement = img as HTMLImageElement;
        if (imgElement.dataset.src) {
          imgElement.src = imgElement.dataset.src;
        }
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
      document.body.appendChild(script);
    }
  }, []);
}
