import React, { useEffect } from 'react'
import type { Preview } from '@storybook/react'

// Global font loader — ensures DM Sans is available in all stories
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000&display=swap'

function FontDecorator(Story: React.ComponentType) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.querySelector(`link[href="${FONTS_URL}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS_URL
    document.head.appendChild(link)
  }, [])

  return <Story />
}

const preview: Preview = {
  decorators: [FontDecorator],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile (390)', styles: { width: '390px', height: '844px' } },
        tablet: { name: 'Tablet (768)', styles: { width: '768px', height: '1024px' } },
        tabletLandscape: { name: 'Tablet Landscape', styles: { width: '1024px', height: '768px' } },
        desktop: { name: 'Desktop (1440)', styles: { width: '1440px', height: '900px' } },
      },
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Foundations', ['Color Palette', 'Semantic Colors', 'Typography', 'Text Styles'],
          'Components', ['Button'],
        ],
      },
    },
  },
}

export default preview
