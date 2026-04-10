import React from 'react'
import type { Preview } from '@storybook/react'
import { CdsProvider } from '@opengov/cds-config'

const preview: Preview = {
  decorators: [
    (Story) => (
      <CdsProvider theme="light">
        <Story />
      </CdsProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
