import { useState, useEffect, useCallback } from 'react';

export default function useTypewriter(phrases, {
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
} = {}) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing
      if (text.length < current.length) {
        return typingSpeed;
      }
      // Done typing — pause then start deleting
      setIsDeleting(true);
      return pauseDuration;
    }

    // Deleting
    if (text.length > 0) {
      return deletingSpeed;
    }
    // Done deleting — move to next phrase
    setIsDeleting(false);
    setPhraseIndex((prev) => (prev + 1) % phrases.length);
    return typingSpeed;
  }, [text, phraseIndex, isDeleting, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    const current = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        }
      }
    }, tick());

    return () => clearTimeout(timeout);
  }, [text, phraseIndex, isDeleting, phrases, tick]);

  return text;
}
