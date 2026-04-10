import React, { useState, useCallback } from 'react'
import { ScrollView, View, StyleSheet, useWindowDimensions } from 'react-native'
import { CdsProvider, type CdsTheme } from '@opengov/cds-config'
import { Text, VStack, HStack, Box, Center } from '@opengov/cds-primitives'
import {
  Button,
  IconButton,
  ButtonGroup,
  TextField,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Badge,
  Avatar,
  Chip,
  Card,
  Link,
  Divider,
  Tab,
  TabBar,
  SegmentedControl,
  SegmentedTabs,
  Dialog,
  Snackbar,
  CircularProgress,
  LinearProgress,
  SkeletonLoader,
  EmptyState,
  Fab,
  SearchBar,
  Breadcrumbs,
} from '@opengov/cds-components'
import {
  ChatBubble,
  ChatInput,
  AiDisclaimer,
  PageHeader,
} from '@opengov/cds-patterns'
import {
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  AddIcon,
  EditIcon,
  DeleteIcon,
  CheckCircleIcon,
  WarningIcon,
  StarIcon,
  PersonIcon,
  SendIcon,
  InfoIcon,
  NotificationsIcon,
  FilterIcon,
  CalendarIcon,
  ChevronRightIcon,
} from '@opengov/cds-icons'
import { colors } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Brand configurations for white-label demo
// ---------------------------------------------------------------------------

type BrandKey = 'opengov' | 'govblue' | 'civicgreen'

const BRANDS: Record<BrandKey, { name: string; primary: string; accent: string }> = {
  opengov: { name: 'OpenGov', primary: '#4B3FFF', accent: '#6E64FF' },
  govblue: { name: 'GovBlue', primary: '#1565C0', accent: '#1E88E5' },
  civicgreen: { name: 'CivicGreen', primary: '#2E7D32', accent: '#43A047' },
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <VStack gap="$3" paddingVertical="$6">
      <VStack gap="$1">
        <Text
          fontSize="$xl"
          fontWeight="$bold"
          color="$color"
          accessibilityRole="header"
        >
          {title}
        </Text>
        <Text fontSize="$sm" color="$colorSubtle">
          {description}
        </Text>
      </VStack>
      <Divider spacing="sm" />
      {children}
    </VStack>
  )
}

// ---------------------------------------------------------------------------
// Subsection label
// ---------------------------------------------------------------------------

function SubLabel({ children }: { children: string }) {
  return (
    <Text
      fontSize="$xs"
      fontWeight="$semibold"
      color="$colorSubtle"
      textTransform="uppercase"
      letterSpacing={0.5}
      paddingTop="$2"
    >
      {children}
    </Text>
  )
}

// ---------------------------------------------------------------------------
// Color swatch helper
// ---------------------------------------------------------------------------

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <VStack alignItems="center" gap="$1" width={72}>
      <Box
        width={48}
        height={48}
        borderRadius="$lg"
        backgroundColor={hex}
        borderWidth={1}
        borderColor="$borderColor"
      />
      <Text fontSize={10} color="$colorSubtle" textAlign="center" numberOfLines={1}>
        {name}
      </Text>
      <Text fontSize={9} color="$colorDisabled" textAlign="center">
        {hex}
      </Text>
    </VStack>
  )
}

// ---------------------------------------------------------------------------
// Responsive grid helper
// ---------------------------------------------------------------------------

function WrapRow({ children, gap = 12 }: { children: React.ReactNode; gap?: number }) {
  return (
    <View style={[styles.wrapRow, { gap }]}>
      {children}
    </View>
  )
}

// ---------------------------------------------------------------------------
// Main showcase component
// ---------------------------------------------------------------------------

export default function ShowcasePage() {
  const { width } = useWindowDimensions()
  const isNarrow = width < 768

  // Global theme state
  const [theme, setTheme] = useState<CdsTheme>('light')
  const isDark = theme === 'dark'

  // Form control states
  const [textValue, setTextValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [checkboxA, setCheckboxA] = useState(true)
  const [checkboxB, setCheckboxB] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [switchOn, setSwitchOn] = useState(true)
  const [sliderValue, setSliderValue] = useState(40)

  // Tab states
  const [activeTab, setActiveTab] = useState('tab1')
  const [segmentKey, setSegmentKey] = useState('day')
  const [segTabKey, setSegTabKey] = useState('all')

  // Overlay trigger states
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarVariant, setSnackbarVariant] = useState<'default' | 'success' | 'error' | 'warning' | 'info'>('success')

  // Chat state
  const [chatText, setChatText] = useState('')

  // White-label brand state
  const [activeBrand, setActiveBrand] = useState<BrandKey>('opengov')

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const containerPadding = isNarrow ? 16 : 48
  const maxContentWidth = 1120

  return (
    <CdsProvider theme={theme}>
      <View
        style={[
          styles.root,
          { backgroundColor: isDark ? '#121212' : '#FFFFFF' },
        ]}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: containerPadding },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.contentWrapper, { maxWidth: maxContentWidth }]}>

            {/* ============================================================= */}
            {/* HERO SECTION                                                  */}
            {/* ============================================================= */}
            <VStack
              gap="$4"
              paddingVertical="$10"
              alignItems="center"
            >
              {/* Theme toggle -- top right */}
              <HStack
                width="100%"
                justifyContent="flex-end"
                paddingBottom="$2"
              >
                <Button
                  variant="secondaryAlt"
                  size="sm"
                  onPress={toggleTheme}
                >
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </Button>
              </HStack>

              {/* Branding mark */}
              <Box
                width={64}
                height={64}
                borderRadius="$2xl"
                backgroundColor={BRANDS[activeBrand].primary}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="$2xl" fontWeight="$bold" color="white">
                  CDS
                </Text>
              </Box>

              <VStack alignItems="center" gap="$2">
                <Text
                  fontSize={isNarrow ? '$3xl' : '$4xl'}
                  fontWeight="$bold"
                  color="$color"
                  textAlign="center"
                >
                  OpenGov CDS Mobile
                </Text>

                {/* Version badge */}
                <HStack gap="$2" alignItems="center">
                  <Chip label="v0.1.0" variant="neutral" size="sm" />
                  <Chip label="React Native" variant="positive" size="sm" />
                  <Chip label="Tamagui" variant="strong" size="sm" />
                </HStack>

                <Text
                  fontSize="$md"
                  color="$colorSubtle"
                  textAlign="center"
                  maxWidth={560}
                  paddingTop="$2"
                >
                  A comprehensive mobile design system built on Tamagui and Expo,
                  porting the OpenGov CDS 37 specification to React Native.
                  64 components across 7 packages, with full dark mode and
                  white-label theming support.
                </Text>
              </VStack>

              <Divider spacing="lg" />
            </VStack>

            {/* ============================================================= */}
            {/* 1. DESIGN TOKENS                                              */}
            {/* ============================================================= */}
            <Section
              title="Design Tokens"
              description="Foundation-level primitives: color palette, typography scale, spacing, and border radius values."
            >
              {/* Color Palette */}
              <SubLabel>Brand & Primary Colors</SubLabel>
              <WrapRow>
                <Swatch name="Primary" hex={colors.primary} />
                <Swatch name="Primary Lt" hex={colors.primaryLight} />
                <Swatch name="Primary Dk" hex={colors.primaryDark} />
                <Swatch name="OG Blue 500" hex={colors.ogBlue500} />
                <Swatch name="OG Blue 300" hex={colors.ogBlue300} />
                <Swatch name="OG Blue 700" hex={colors.ogBlue700} />
              </WrapRow>

              <SubLabel>Semantic Colors</SubLabel>
              <WrapRow>
                <Swatch name="Success" hex={colors.jade500} />
                <Swatch name="Error" hex={colors.red500} />
                <Swatch name="Warning" hex={colors.amber500} />
                <Swatch name="Teal" hex={colors.teal500} />
                <Swatch name="Rose" hex={colors.rose500} />
                <Swatch name="Port" hex={colors.port500} />
              </WrapRow>

              <SubLabel>Neutral Scale</SubLabel>
              <WrapRow>
                <Swatch name="50" hex={colors.neutral50} />
                <Swatch name="100" hex={colors.neutral100} />
                <Swatch name="200" hex={colors.neutral200} />
                <Swatch name="300" hex={colors.neutral300} />
                <Swatch name="400" hex={colors.neutral400} />
                <Swatch name="500" hex={colors.neutral500} />
                <Swatch name="700" hex={colors.neutral700} />
                <Swatch name="1000" hex={colors.neutral1000} />
              </WrapRow>

              {/* Typography Scale */}
              <SubLabel>Typography Scale</SubLabel>
              <VStack gap="$2" paddingTop="$1">
                <Text fontSize="$7xl" fontWeight="$bold" color="$color">Display 1 (64px)</Text>
                <Text fontSize="$5xl" fontWeight="$bold" color="$color">Display 3 (48px)</Text>
                <Text fontSize="$3xl" fontWeight="$bold" color="$color">Heading 3 (32px)</Text>
                <Text fontSize="$xl" fontWeight="$semibold" color="$color">Heading 5 (24px)</Text>
                <Text fontSize="$lg" fontWeight="$medium" color="$color">Body 1 / H6 (20px)</Text>
                <Text fontSize="$md" color="$color">Body 2 -- Default (16px)</Text>
                <Text fontSize="$sm" color="$colorSubtle">Body 3 -- Secondary (14px)</Text>
                <Text fontSize="$xs" color="$colorSubtle">Caption (12px)</Text>
              </VStack>

              {/* Spacing / Radius */}
              <SubLabel>Spacing & Border Radius</SubLabel>
              <HStack gap="$3" flexWrap="wrap" alignItems="flex-end" paddingTop="$1">
                {[4, 8, 12, 16, 24, 32, 48].map((s) => (
                  <VStack key={s} alignItems="center" gap="$1">
                    <Box
                      width={s}
                      height={s}
                      backgroundColor={colors.primary}
                      borderRadius={2}
                    />
                    <Text fontSize={10} color="$colorSubtle">{s}px</Text>
                  </VStack>
                ))}
              </HStack>
              <HStack gap="$3" flexWrap="wrap" alignItems="center" paddingTop="$3">
                {[
                  { label: 'none', r: 0 },
                  { label: 'sm', r: 2 },
                  { label: 'md', r: 4 },
                  { label: 'lg', r: 8 },
                  { label: 'xl', r: 12 },
                  { label: '2xl', r: 16 },
                  { label: 'full', r: 9999 },
                ].map(({ label, r }) => (
                  <VStack key={label} alignItems="center" gap="$1">
                    <Box
                      width={40}
                      height={40}
                      backgroundColor={colors.ogBlue100}
                      borderRadius={r}
                      borderWidth={2}
                      borderColor={colors.ogBlue500}
                    />
                    <Text fontSize={10} color="$colorSubtle">{label}</Text>
                  </VStack>
                ))}
              </HStack>
            </Section>

            {/* ============================================================= */}
            {/* 2. BUTTONS                                                    */}
            {/* ============================================================= */}
            <Section
              title="Buttons"
              description="All 7 CDS 37 variants (primary, secondary, secondaryAlt, tertiary, tertiaryAlt, destructive, destructiveAlt), 3 sizes, icon buttons, and button groups."
            >
              <SubLabel>All Variants (Medium Size)</SubLabel>
              <WrapRow>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="secondaryAlt">Secondary Alt</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="tertiaryAlt">Tertiary Alt</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="destructiveAlt">Destructive Alt</Button>
              </WrapRow>

              <SubLabel>Sizes</SubLabel>
              <HStack gap="$3" alignItems="center" flexWrap="wrap">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </HStack>

              <SubLabel>With Icons</SubLabel>
              <WrapRow>
                <Button
                  variant="primary"
                  iconLeft={<AddIcon size={18} color="white" />}
                >
                  Create New
                </Button>
                <Button
                  variant="secondary"
                  iconRight={<ChevronRightIcon size={18} color={colors.primary} />}
                >
                  Continue
                </Button>
                <Button
                  variant="destructive"
                  iconLeft={<DeleteIcon size={18} color="white" />}
                >
                  Delete
                </Button>
              </WrapRow>

              <SubLabel>States</SubLabel>
              <HStack gap="$3" flexWrap="wrap">
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button variant="secondary" disabled>Disabled Outline</Button>
                <Button variant="destructive" loading>Deleting...</Button>
              </HStack>

              <SubLabel>Icon Buttons</SubLabel>
              <HStack gap="$3" alignItems="center" flexWrap="wrap">
                <IconButton
                  icon={<AddIcon size={20} color="white" />}
                  variant="primary"
                  accessibilityLabel="Add item"
                />
                <IconButton
                  icon={<EditIcon size={20} color={colors.primary} />}
                  variant="secondary"
                  accessibilityLabel="Edit"
                />
                <IconButton
                  icon={<SearchIcon size={20} color={colors.neutral700} />}
                  variant="tertiaryAlt"
                  accessibilityLabel="Search"
                />
                <IconButton
                  icon={<DeleteIcon size={20} color="white" />}
                  variant="destructive"
                  accessibilityLabel="Delete"
                />
                <IconButton
                  icon={<SettingsIcon size={20} color={colors.neutral400} />}
                  variant="tertiary"
                  disabled
                  accessibilityLabel="Settings (disabled)"
                />
              </HStack>

              <SubLabel>Button Group</SubLabel>
              <VStack gap="$3">
                <ButtonGroup>
                  <Button variant="secondary" size="sm">Left</Button>
                  <Button variant="secondary" size="sm">Center</Button>
                  <Button variant="secondary" size="sm">Right</Button>
                </ButtonGroup>
                <ButtonGroup spacing="compact">
                  <Button variant="secondary" size="sm">Compact A</Button>
                  <Button variant="secondary" size="sm">Compact B</Button>
                  <Button variant="secondary" size="sm">Compact C</Button>
                </ButtonGroup>
              </VStack>
            </Section>

            {/* ============================================================= */}
            {/* 3. FORM CONTROLS                                              */}
            {/* ============================================================= */}
            <Section
              title="Form Controls"
              description="Text fields, checkboxes, radio buttons, switches, sliders, and search bar."
            >
              <SubLabel>Text Fields</SubLabel>
              <VStack gap="$3" maxWidth={420}>
                <TextField
                  label="Full Name"
                  placeholder="Enter your name"
                  value={textValue}
                  onChangeText={setTextValue}
                />
                <TextField
                  label="Email"
                  placeholder="user@opengov.com"
                  variant="filled"
                />
                <TextField
                  label="Password"
                  placeholder="Enter password"
                  error
                  errorText="Password must be at least 8 characters"
                />
                <TextField
                  label="Department"
                  placeholder="Disabled field"
                  disabled
                />
              </VStack>

              <SubLabel>Search Bar</SubLabel>
              <Box maxWidth={420}>
                <SearchBar
                  value={searchValue}
                  onChangeText={setSearchValue}
                  placeholder="Search components..."
                />
              </Box>

              <SubLabel>Checkboxes</SubLabel>
              <VStack gap="$2">
                <Checkbox
                  checked={checkboxA}
                  onChange={setCheckboxA}
                  label="Receive email notifications"
                />
                <Checkbox
                  checked={checkboxB}
                  onChange={setCheckboxB}
                  label="Agree to terms and conditions"
                />
                <Checkbox
                  checked={false}
                  disabled
                  label="Disabled option"
                />
                <Checkbox
                  checked
                  indeterminate
                  label="Indeterminate (mixed)"
                />
              </VStack>

              <SubLabel>Radio Buttons</SubLabel>
              <VStack gap="$2">
                <Radio
                  selected={radioValue === 'option1'}
                  onSelect={() => setRadioValue('option1')}
                  label="Standard delivery (3-5 days)"
                  value="option1"
                />
                <Radio
                  selected={radioValue === 'option2'}
                  onSelect={() => setRadioValue('option2')}
                  label="Express delivery (1-2 days)"
                  value="option2"
                />
                <Radio
                  selected={radioValue === 'option3'}
                  onSelect={() => setRadioValue('option3')}
                  label="Same-day delivery"
                  value="option3"
                />
                <Radio
                  selected={false}
                  disabled
                  label="Not available in your area"
                />
              </VStack>

              <SubLabel>Switches</SubLabel>
              <VStack gap="$2">
                <Switch
                  checked={switchOn}
                  onChange={setSwitchOn}
                  label="Enable notifications"
                />
                <Switch
                  checked={false}
                  label="Dark mode auto-switch"
                />
                <Switch
                  checked
                  disabled
                  label="System default (locked)"
                />
              </VStack>

              <SubLabel>Slider</SubLabel>
              <VStack gap="$1" maxWidth={360}>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  min={0}
                  max={100}
                  step={5}
                  showValue
                />
                <Text fontSize="$xs" color="$colorSubtle">
                  Value: {sliderValue}
                </Text>
              </VStack>
            </Section>

            {/* ============================================================= */}
            {/* 4. CONTENT                                                    */}
            {/* ============================================================= */}
            <Section
              title="Content"
              description="Badges, avatars, chips, cards, links, and dividers for displaying and organizing information."
            >
              <SubLabel>Badges</SubLabel>
              <HStack gap="$6" flexWrap="wrap" alignItems="center">
                <Badge count={3} color="primary">
                  <IconButton
                    icon={<NotificationsIcon size={22} color={colors.neutral700} />}
                    variant="tertiaryAlt"
                    accessibilityLabel="Notifications, 3 new"
                  />
                </Badge>
                <Badge count={12} color="error">
                  <IconButton
                    icon={<HomeIcon size={22} color={colors.neutral700} />}
                    variant="tertiaryAlt"
                    accessibilityLabel="Home, 12 alerts"
                  />
                </Badge>
                <Badge count={99} maxCount={99} color="success">
                  <IconButton
                    icon={<PersonIcon size={22} color={colors.neutral700} />}
                    variant="tertiaryAlt"
                    accessibilityLabel="People, 99 online"
                  />
                </Badge>
                <Badge variant="dot" color="warning">
                  <IconButton
                    icon={<SettingsIcon size={22} color={colors.neutral700} />}
                    variant="tertiaryAlt"
                    accessibilityLabel="Settings, update available"
                  />
                </Badge>
              </HStack>

              <SubLabel>Avatars</SubLabel>
              <HStack gap="$3" flexWrap="wrap" alignItems="flex-end">
                <Avatar name="Alice Johnson" size="sm" />
                <Avatar name="Bob Smith" size="md" />
                <Avatar name="Charlie Davis" size="lg" />
                <Avatar name="Diana Ross" size="lg" status="online" />
                <Avatar name="Eva Green" size="md" shape="square" />
                <Avatar size="md" />
              </HStack>

              <SubLabel>Chips</SubLabel>
              <WrapRow>
                <Chip label="Neutral" variant="neutral" />
                <Chip label="Positive" variant="positive" />
                <Chip label="Negative" variant="negative" />
                <Chip label="Warning" variant="warning" />
                <Chip label="Strong" variant="strong" />
                <Chip
                  label="Closable"
                  variant="neutral"
                  closable
                  onClose={() => {}}
                />
                <Chip
                  label="With Icon"
                  variant="positive"
                  leadingIcon={<CheckCircleIcon size={14} color={colors.jade700} />}
                />
                <Chip label="Selected" variant="strong" selected />
              </WrapRow>

              <SubLabel>Cards</SubLabel>
              <WrapRow gap={16}>
                <Box width={isNarrow ? '100%' : 320}>
                  <Card variant="elevated" padding="md">
                    <VStack gap="$2">
                      <HStack gap="$2" alignItems="center">
                        <Avatar name="Sarah Chen" size="sm" />
                        <VStack>
                          <Text fontSize="$sm" fontWeight="$semibold" color="$color">
                            Budget Report Q4
                          </Text>
                          <Text fontSize="$xs" color="$colorSubtle">
                            Sarah Chen -- 2 hours ago
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="$sm" color="$color">
                        The quarterly budget analysis shows a 12% increase in
                        revenue compared to the previous quarter.
                      </Text>
                      <HStack gap="$2" paddingTop="$1">
                        <Chip label="Finance" variant="strong" size="sm" />
                        <Chip label="Q4 2025" variant="neutral" size="sm" />
                      </HStack>
                    </VStack>
                  </Card>
                </Box>
                <Box width={isNarrow ? '100%' : 320}>
                  <Card variant="outlined" padding="md">
                    <VStack gap="$2">
                      <Text fontSize="$sm" fontWeight="$semibold" color="$color">
                        Permit Application #4821
                      </Text>
                      <HStack gap="$2" alignItems="center">
                        <Chip label="Pending Review" variant="warning" size="sm" />
                        <Text fontSize="$xs" color="$colorSubtle">Due in 3 days</Text>
                      </HStack>
                      <Text fontSize="$sm" color="$colorSubtle">
                        Building permit for commercial renovation at
                        456 Main St, Suite 200.
                      </Text>
                      <HStack gap="$2" paddingTop="$1">
                        <Button variant="primary" size="sm">Review</Button>
                        <Button variant="tertiary" size="sm">Details</Button>
                      </HStack>
                    </VStack>
                  </Card>
                </Box>
                <Box width={isNarrow ? '100%' : 320}>
                  <Card variant="filled" padding="md">
                    <VStack gap="$2">
                      <HStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$sm" fontWeight="$semibold" color="$color">
                          Quick Stats
                        </Text>
                        <Chip label="Live" variant="positive" size="sm" />
                      </HStack>
                      <HStack gap="$4">
                        <VStack>
                          <Text fontSize="$2xl" fontWeight="$bold" color="$color">
                            1,247
                          </Text>
                          <Text fontSize="$xs" color="$colorSubtle">Active permits</Text>
                        </VStack>
                        <VStack>
                          <Text fontSize="$2xl" fontWeight="$bold" color="$color">
                            89%
                          </Text>
                          <Text fontSize="$xs" color="$colorSubtle">Approval rate</Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </Card>
                </Box>
              </WrapRow>

              <SubLabel>Links</SubLabel>
              <VStack gap="$2">
                <Link variant="default" size="md">
                  Default link style
                </Link>
                <Link variant="subtle" size="md">
                  Subtle link style
                </Link>
                <Link variant="inline" size="sm">
                  Inline link within text
                </Link>
                <Link variant="default" size="md" external>
                  External link with icon
                </Link>
                <Link variant="default" disabled>
                  Disabled link
                </Link>
              </VStack>

              <SubLabel>Dividers</SubLabel>
              <VStack gap="$3">
                <Divider />
                <Divider label="OR" />
                <Divider spacing="lg" />
              </VStack>
            </Section>

            {/* ============================================================= */}
            {/* 5. NAVIGATION                                                 */}
            {/* ============================================================= */}
            <Section
              title="Navigation"
              description="Tabs, segmented controls, segmented tabs, and breadcrumbs for navigating content."
            >
              <SubLabel>Tab Bar (Primary)</SubLabel>
              <TabBar variant="primary">
                <Tab
                  label="Overview"
                  active={activeTab === 'tab1'}
                  onPress={() => setActiveTab('tab1')}
                  icon={<HomeIcon size={16} />}
                  variant="primary"
                />
                <Tab
                  label="Permits"
                  active={activeTab === 'tab2'}
                  onPress={() => setActiveTab('tab2')}
                  badge={5}
                  variant="primary"
                />
                <Tab
                  label="Reports"
                  active={activeTab === 'tab3'}
                  onPress={() => setActiveTab('tab3')}
                  variant="primary"
                />
                <Tab
                  label="Settings"
                  active={activeTab === 'tab4'}
                  onPress={() => setActiveTab('tab4')}
                  icon={<SettingsIcon size={16} />}
                  variant="primary"
                />
              </TabBar>

              <SubLabel>Segmented Control</SubLabel>
              <Box maxWidth={360}>
                <SegmentedControl
                  items={[
                    { key: 'day', label: 'Day' },
                    { key: 'week', label: 'Week' },
                    { key: 'month', label: 'Month' },
                    { key: 'year', label: 'Year' },
                  ]}
                  activeKey={segmentKey}
                  onSelect={setSegmentKey}
                />
              </Box>

              <SubLabel>Segmented Tabs</SubLabel>
              <Box maxWidth={400}>
                <SegmentedTabs
                  items={[
                    { key: 'all', label: 'All', icon: <HomeIcon size={16} /> },
                    { key: 'active', label: 'Active', icon: <CheckCircleIcon size={16} /> },
                    { key: 'pending', label: 'Pending', icon: <CalendarIcon size={16} /> },
                  ]}
                  activeKey={segTabKey}
                  onSelect={setSegTabKey}
                />
              </Box>

              <SubLabel>Breadcrumbs</SubLabel>
              <Breadcrumbs
                items={[
                  { label: 'Home', onPress: () => {} },
                  { label: 'Permits', onPress: () => {} },
                  { label: 'Commercial' },
                ]}
              />
            </Section>

            {/* ============================================================= */}
            {/* 6. OVERLAYS & FEEDBACK                                        */}
            {/* ============================================================= */}
            <Section
              title="Overlays & Feedback"
              description="Dialogs, snackbars, and interactive overlay triggers. Press buttons to see overlays in action."
            >
              <SubLabel>Dialog</SubLabel>
              <Button variant="secondary" onPress={() => setDialogOpen(true)}>
                Open Dialog
              </Button>
              <Dialog
                visible={dialogOpen}
                onClose={() => setDialogOpen(false)}
                title="Confirm Submission"
                description="Are you sure you want to submit this permit application? This action cannot be undone."
                actions={
                  <HStack gap="$2">
                    <Button
                      variant="tertiary"
                      size="sm"
                      onPress={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onPress={() => setDialogOpen(false)}
                    >
                      Submit
                    </Button>
                  </HStack>
                }
              />

              <SubLabel>Snackbar Variants</SubLabel>
              <WrapRow>
                {(['success', 'error', 'warning', 'info', 'default'] as const).map(
                  (variant) => (
                    <Button
                      key={variant}
                      variant="secondaryAlt"
                      size="sm"
                      onPress={() => {
                        setSnackbarVariant(variant)
                        setSnackbarVisible(true)
                      }}
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Button>
                  )
                )}
              </WrapRow>
              <Snackbar
                visible={snackbarVisible}
                message={`This is a ${snackbarVariant} notification message.`}
                variant={snackbarVariant}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
              />
            </Section>

            {/* ============================================================= */}
            {/* 7. DATA DISPLAY                                               */}
            {/* ============================================================= */}
            <Section
              title="Data Display"
              description="Progress indicators, skeleton loaders, and empty states."
            >
              <SubLabel>Circular Progress</SubLabel>
              <HStack gap="$6" alignItems="center" flexWrap="wrap">
                <CircularProgress value={75} color="primary" showValue />
                <CircularProgress value={45} color="success" showValue size="lg" />
                <CircularProgress color="primary" size="sm" />
                <CircularProgress value={90} color="error" showValue size="md" />
              </HStack>

              <SubLabel>Linear Progress</SubLabel>
              <VStack gap="$3" maxWidth={480}>
                <VStack gap="$1">
                  <HStack justifyContent="space-between">
                    <Text fontSize="$xs" color="$colorSubtle">Budget utilization</Text>
                    <Text fontSize="$xs" fontWeight="$semibold" color="$color">68%</Text>
                  </HStack>
                  <LinearProgress value={68} color="primary" />
                </VStack>
                <VStack gap="$1">
                  <HStack justifyContent="space-between">
                    <Text fontSize="$xs" color="$colorSubtle">Permit processing</Text>
                    <Text fontSize="$xs" fontWeight="$semibold" color="$color">92%</Text>
                  </HStack>
                  <LinearProgress value={92} color="success" />
                </VStack>
                <VStack gap="$1">
                  <HStack justifyContent="space-between">
                    <Text fontSize="$xs" color="$colorSubtle">Loading data...</Text>
                  </HStack>
                  <LinearProgress color="primary" />
                </VStack>
              </VStack>

              <SubLabel>Skeleton Loader</SubLabel>
              <VStack gap="$3" maxWidth={360}>
                <HStack gap="$3" alignItems="center">
                  <SkeletonLoader variant="circular" width={48} height={48} />
                  <VStack gap="$1" flex={1}>
                    <SkeletonLoader variant="text" width="60%" />
                    <SkeletonLoader variant="text" width="40%" />
                  </VStack>
                </HStack>
                <SkeletonLoader variant="rectangular" width="100%" height={120} />
                <SkeletonLoader variant="text" count={3} />
              </VStack>

              <SubLabel>Empty State</SubLabel>
              <Box
                maxWidth={400}
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$lg"
                padding="$4"
              >
                <EmptyState
                  icon={<SearchIcon size={48} color={colors.neutral400} />}
                  title="No results found"
                  description="Try adjusting your search terms or filters to find what you are looking for."
                  action={{
                    label: 'Clear Filters',
                    onPress: () => {},
                  }}
                />
              </Box>
            </Section>

            {/* ============================================================= */}
            {/* 8. AI / CHAT                                                  */}
            {/* ============================================================= */}
            <Section
              title="AI / Chat Patterns"
              description="Chat bubbles, input, and AI content disclaimer for OG Assist integration."
            >
              <SubLabel>Chat Conversation</SubLabel>
              <VStack
                gap="$2"
                maxWidth={480}
                padding="$3"
                backgroundColor="$backgroundStrong"
                borderRadius="$lg"
              >
                <ChatBubble
                  message="Hi, I need help finding information about building permits for commercial properties."
                  sender="user"
                  timestamp="2:30 PM"
                  status="read"
                />
                <ChatBubble
                  message="I can help you with that! Commercial building permits in your jurisdiction require submitting a site plan, construction documents, and a completed application form. Would you like me to walk you through the process?"
                  sender="assistant"
                  timestamp="2:31 PM"
                  avatar={
                    <Avatar name="OG Assist" size="sm" />
                  }
                />
                <ChatBubble
                  message="Yes, please. What documents do I need to gather first?"
                  sender="user"
                  timestamp="2:32 PM"
                  status="delivered"
                />
                <ChatBubble
                  message=""
                  sender="assistant"
                  loading
                  avatar={
                    <Avatar name="OG Assist" size="sm" />
                  }
                />
              </VStack>

              <SubLabel>Chat Input</SubLabel>
              <Box maxWidth={480}>
                <ChatInput
                  value={chatText}
                  onChangeText={setChatText}
                  placeholder="Ask OG Assist..."
                  onSend={() => setChatText('')}
                  showAttachment
                />
              </Box>

              <SubLabel>AI Disclaimer</SubLabel>
              <VStack gap="$3" maxWidth={480}>
                <AiDisclaimer variant="inline" dismissible />
                <AiDisclaimer variant="banner" />
              </VStack>
            </Section>

            {/* ============================================================= */}
            {/* 9. FAB & ACTIONS                                              */}
            {/* ============================================================= */}
            <Section
              title="Floating Actions"
              description="Floating action buttons in various sizes and configurations."
            >
              <HStack gap="$4" flexWrap="wrap" alignItems="flex-end">
                <Box width={56} height={56} position="relative">
                  <Fab
                    icon={<AddIcon size={20} color="white" />}
                    size="sm"
                    position="bottomRight"
                  />
                </Box>
                <Box width={64} height={64} position="relative">
                  <Fab
                    icon={<AddIcon size={24} color="white" />}
                    size="md"
                    position="bottomRight"
                  />
                </Box>
                <Box width={72} height={72} position="relative">
                  <Fab
                    icon={<AddIcon size={24} color="white" />}
                    size="lg"
                    position="bottomRight"
                  />
                </Box>
                <Box width={180} height={64} position="relative">
                  <Fab
                    icon={<EditIcon size={20} color="white" />}
                    label="New Permit"
                    extended
                    position="bottomRight"
                  />
                </Box>
                <Box width={64} height={64} position="relative">
                  <Fab
                    icon={<AddIcon size={24} color={colors.neutral700} />}
                    color="secondary"
                    position="bottomRight"
                  />
                </Box>
              </HStack>
            </Section>

            {/* ============================================================= */}
            {/* 10. PAGE HEADER PATTERN                                       */}
            {/* ============================================================= */}
            <Section
              title="Page Header"
              description="Compound header pattern with breadcrumbs, title, subtitle, and actions."
            >
              <Box
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$lg"
                overflow="hidden"
              >
                <PageHeader
                  title="Commercial Permits"
                  subtitle="Manage all commercial building and renovation permits"
                  breadcrumbs={
                    <Breadcrumbs
                      items={[
                        { label: 'Dashboard', onPress: () => {} },
                        { label: 'Permits', onPress: () => {} },
                        { label: 'Commercial' },
                      ]}
                    />
                  }
                  actions={
                    <HStack gap="$2">
                      <Button variant="secondaryAlt" size="sm" iconLeft={<FilterIcon size={16} />}>
                        Filter
                      </Button>
                      <Button variant="primary" size="sm" iconLeft={<AddIcon size={16} color="white" />}>
                        New Permit
                      </Button>
                    </HStack>
                  }
                  bordered
                />
              </Box>
            </Section>

            {/* ============================================================= */}
            {/* 11. WHITE-LABEL DEMO                                          */}
            {/* ============================================================= */}
            <Section
              title="White-Label Theming"
              description="Toggle between brand themes to see how the design system adapts to different government agencies."
            >
              <SubLabel>Select Brand</SubLabel>
              <HStack gap="$3" flexWrap="wrap">
                {(Object.keys(BRANDS) as BrandKey[]).map((key) => {
                  const brand = BRANDS[key]
                  const isActive = activeBrand === key
                  return (
                    <Button
                      key={key}
                      variant={isActive ? 'primary' : 'secondaryAlt'}
                      size="md"
                      onPress={() => setActiveBrand(key)}
                    >
                      {brand.name}
                    </Button>
                  )
                })}
              </HStack>

              <SubLabel>Brand Preview</SubLabel>
              <Box
                padding="$4"
                borderRadius="$lg"
                borderWidth={2}
                borderColor={BRANDS[activeBrand].primary}
              >
                <VStack gap="$3">
                  <HStack gap="$3" alignItems="center">
                    <Box
                      width={40}
                      height={40}
                      borderRadius="$lg"
                      backgroundColor={BRANDS[activeBrand].primary}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="$sm" fontWeight="$bold" color="white">
                        {BRANDS[activeBrand].name.charAt(0)}
                      </Text>
                    </Box>
                    <VStack>
                      <Text fontSize="$lg" fontWeight="$bold" color="$color">
                        {BRANDS[activeBrand].name}
                      </Text>
                      <Text fontSize="$xs" color="$colorSubtle">
                        {BRANDS[activeBrand].primary}
                      </Text>
                    </VStack>
                  </HStack>

                  <Divider />

                  <HStack gap="$3" flexWrap="wrap">
                    <Swatch name="Primary" hex={BRANDS[activeBrand].primary} />
                    <Swatch name="Accent" hex={BRANDS[activeBrand].accent} />
                  </HStack>

                  <HStack gap="$2" flexWrap="wrap">
                    <Box
                      paddingHorizontal={16}
                      paddingVertical={8}
                      borderRadius="$md"
                      backgroundColor={BRANDS[activeBrand].primary}
                    >
                      <Text fontSize="$sm" fontWeight="$medium" color="white">
                        Primary Action
                      </Text>
                    </Box>
                    <Box
                      paddingHorizontal={16}
                      paddingVertical={8}
                      borderRadius="$md"
                      borderWidth={1}
                      borderColor={BRANDS[activeBrand].primary}
                    >
                      <Text
                        fontSize="$sm"
                        fontWeight="$medium"
                        color={BRANDS[activeBrand].primary}
                      >
                        Secondary Action
                      </Text>
                    </Box>
                    <Box
                      paddingHorizontal={16}
                      paddingVertical={8}
                      borderRadius="$md"
                      backgroundColor={BRANDS[activeBrand].accent}
                    >
                      <Text fontSize="$sm" fontWeight="$medium" color="white">
                        Accent
                      </Text>
                    </Box>
                  </HStack>

                  <Text fontSize="$sm" color="$colorSubtle">
                    The CDS Mobile system supports custom brand tokens, allowing
                    any government agency to adopt the component library while
                    maintaining their visual identity. Theme tokens cascade through
                    all components automatically.
                  </Text>
                </VStack>
              </Box>
            </Section>

            {/* ============================================================= */}
            {/* FOOTER                                                        */}
            {/* ============================================================= */}
            <VStack
              gap="$2"
              alignItems="center"
              paddingVertical="$10"
            >
              <Divider spacing="md" />
              <Text fontSize="$xs" color="$colorSubtle" textAlign="center">
                OpenGov CDS Mobile -- Component Design System
              </Text>
              <Text fontSize="$xs" color="$colorDisabled" textAlign="center">
                64 components across 7 packages. Built with Tamagui + Expo.
              </Text>
              <Text fontSize="$xs" color="$colorDisabled" textAlign="center">
                Ported from CDS 37 specification for React Native.
              </Text>
            </VStack>

          </View>
        </ScrollView>
      </View>
    </CdsProvider>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: '100%' as unknown as number,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  contentWrapper: {
    width: '100%',
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
})
