import { Stack } from 'expo-router'
import { CdsProvider } from '@opengov/cds-config'

export default function Layout() {
  return (
    <CdsProvider theme="light">
      <Stack screenOptions={{ headerShown: false }} />
    </CdsProvider>
  )
}
