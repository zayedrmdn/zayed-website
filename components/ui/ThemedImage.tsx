// components/ui/ThemedImage.tsx
"use client";
import Image, { ImageProps } from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemedImageProps extends Omit<ImageProps, 'src'> {
  lightSrc: string;
  darkSrc: string;
  fallbackSrc?: string;
}

// Method 1: Using useTheme with proper hydration handling
export function ThemedImage({ 
  lightSrc, 
  darkSrc, 
  fallbackSrc, 
  alt,
  ...props 
}: ThemedImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let src: string;
  
  if (!mounted) {
    // Use fallback or transparent image during hydration
    src = fallbackSrc || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  } else {
    src = resolvedTheme === 'dark' ? darkSrc : lightSrc;
  }

  return <Image {...props} src={src} alt={alt} />;
}

// Method 2: CSS-based approach (no hydration issues)
export function ThemedImageCSS({ 
  lightSrc, 
  darkSrc, 
  alt, 
  className = "",
  ...props 
}: ThemedImageProps) {
  return (
    <>
      {/* Light theme image */}
      <div className="block dark:hidden" data-hide-on-theme="dark">
        <Image {...props} src={lightSrc} alt={alt} className={className} />
      </div>
      
      {/* Dark theme image */}
      <div className="hidden dark:block" data-hide-on-theme="light">
        <Image {...props} src={darkSrc} alt={alt} className={className} />
      </div>
    </>
  );
}

// Method 3: Background image approach
interface ThemedBackgroundProps {
  lightSrc: string;
  darkSrc: string;
  className?: string;
  children?: React.ReactNode;
}

export function ThemedBackground({ 
  lightSrc, 
  darkSrc, 
  className = "",
  children 
}: ThemedBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const backgroundImage = mounted 
    ? `url(${resolvedTheme === 'dark' ? darkSrc : lightSrc})`
    : 'none';

  return (
    <div 
      className={`bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage }}
    >
      {children}
    </div>
  );
}

export default ThemedImage;