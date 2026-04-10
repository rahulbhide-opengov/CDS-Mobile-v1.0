# CDS Mobile Library -- Component Reference

> Comprehensive API reference for the OpenGov CDS Mobile Library.
> Built with React Native, Tamagui, and Expo.

**Version:** 1.0.0 | **Components:** 67 | **Last updated:** 2026-04-10

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Primitives](#1-primitives)
3. [Buttons](#2-buttons)
4. [Form Controls](#3-form-controls)
5. [Content](#4-content)
6. [Navigation](#5-navigation)
7. [Overlays and Feedback](#6-overlays-and-feedback)
8. [Data Display](#7-data-display)
9. [Platform Utilities](#8-platform-utilities)
10. [AI/Chat Patterns](#9-aichat-patterns)
11. [Design Tokens](#10-design-tokens)

---

## Getting Started

Wrap your application root with `CdsProvider` to enable theming:

```tsx
import { CdsProvider } from '@opengov/cds-config'

export default function App() {
  return (
    <CdsProvider theme="light">
      <YourApp />
    </CdsProvider>
  )
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'light' \| 'dark' \| 'light_high_contrast'` | `'light'` | Active color theme |
| `children` | `ReactNode` | -- | Application content |

---

## 1. Primitives

Low-level building blocks that all higher-level components are composed from.

**Package:** `@opengov/cds-primitives`

---

### Box

A general-purpose layout container built on Tamagui's `Stack`. Accepts all style props (padding, margin, backgroundColor, etc.) directly.

**Import**
```tsx
import { Box } from '@opengov/cds-primitives'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `SpaceToken` | -- | Inner spacing using token scale |
| `backgroundColor` | `string \| ColorToken` | -- | Background color |
| `borderRadius` | `RadiusToken` | -- | Corner radius |
| _...all Tamagui Stack props_ | | | |

**Usage Example**
```tsx
<Box padding="$4" backgroundColor="$background" borderRadius="$md">
  <Text>Content inside a box</Text>
</Box>
```

**Dos and Don'ts**
- Do use `Box` for custom layout wrappers that need arbitrary style props.
- Do use semantic token values (`$4`, `$background`) instead of raw numbers.
- Don't use `Box` where a more semantic component (Card, HStack) is appropriate.
- Don't nest many empty Box wrappers -- flatten your layout hierarchy.

**Accessibility**
- No required accessibility props. Add `accessibilityRole` when the Box has semantic meaning (e.g., `"region"`).

---

### Text

Styled text primitive with 16 typographic variants, weight overrides, and alignment options.

**Import**
```tsx
import { Text } from '@opengov/cds-primitives'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'display1'` through `'display4'` `'h1'` through `'h6'` `'body1'` `'body2'` `'body3'` `'caption'` `'overline'` | `'body2'` | Typographic preset |
| `weight` | `'light' \| 'regular' \| 'medium' \| 'semibold' \| 'bold'` | -- | Font weight override |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `secondary` | `boolean` | `false` | Applies secondary text color |
| `disabled` | `boolean` | `false` | Applies disabled text color |
| `color` | `string \| ColorToken` | `'$color'` | Text color override |

**Usage Example**
```tsx
<Text variant="h3">Page Title</Text>
<Text variant="body2" secondary>Supporting description text</Text>
<Text variant="caption" align="right">12:34 PM</Text>
```

**Dos and Don'ts**
- Do use `variant` to apply consistent typography across the application.
- Do prefer the `secondary` boolean over raw color values for muted text.
- Don't combine `variant` with manual `fontSize`/`lineHeight` -- the variant handles this.
- Don't use `display1`-`display4` for body content -- they are meant for hero sections.

**Accessibility**
- Screen readers read the text content automatically. No extra props needed unless the visual text differs from the intended reading.

---

### Pressable

Touchable container with a minimum 44x44pt touch target and built-in disabled state. All interactive components build on this primitive.

**Import**
```tsx
import { Pressable } from '@opengov/cds-primitives'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPress` | `() => void` | -- | Press callback |
| `onLongPress` | `() => void` | -- | Long-press callback |
| `disabled` | `boolean` | `false` | Disables interaction and applies 50% opacity |
| `hitSlop` | `Insets` | -- | Extends touch area beyond visible bounds |
| `accessibilityRole` | `string` | `'button'` | Semantic role |
| `accessibilityLabel` | `string` | -- | Screen reader label |

**Usage Example**
```tsx
<Pressable onPress={handleTap} accessibilityLabel="Open settings">
  <Icon name="settings" />
</Pressable>
```

**Dos and Don'ts**
- Do always provide `accessibilityLabel` when the pressable has no visible text.
- Do use `hitSlop` for small targets to meet the 44pt minimum touch area.
- Don't nest Pressable components -- it causes gesture conflicts on both platforms.
- Don't remove the minimum 44pt touch target without adding equivalent `hitSlop`.

**Platform Notes**
- The `cursor` and `pointerEvents` props have no visible effect on native but apply on web.

**Accessibility**
- **Required:** `accessibilityLabel` when there is no visible text child.
- Defaults to `role="button"`. The 44pt minimum touch target satisfies WCAG 2.5.8.

---

### HStack / VStack / ZStack

Directional layout containers for horizontal, vertical, and overlapping arrangements.

**Import**
```tsx
import { HStack, VStack, ZStack } from '@opengov/cds-primitives'
```

**Key Props -- HStack**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `SpaceToken` | -- | Spacing between children |
| `alignItems` | `FlexAlign` | `'center'` | Cross-axis alignment |

**Key Props -- VStack**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `SpaceToken` | -- | Spacing between children |
| `alignItems` | `FlexAlign` | `'stretch'` | Cross-axis alignment |

**Key Props -- ZStack**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fullscreen` | `boolean` | `false` | Fills parent with absolute positioning |

**Usage Example**
```tsx
<VStack gap="$3">
  <HStack gap="$2" justifyContent="space-between">
    <Text variant="h4">Title</Text>
    <Badge count={3} />
  </HStack>
  <Text variant="body2">Description text</Text>
</VStack>
```

**Dos and Don'ts**
- Do use `gap` for consistent spacing instead of margin on individual children.
- Do choose `HStack` for horizontal rows and `VStack` for vertical stacking.
- Don't use `ZStack` for simple overlays -- prefer `position="absolute"` on child elements when only one layer needs positioning.

---

### Center

Centers its children both horizontally and vertically.

**Import**
```tsx
import { Center } from '@opengov/cds-primitives'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flex` | `number` | -- | Flex grow factor |
| _...all Stack props_ | | | |

**Usage Example**
```tsx
<Center flex={1}>
  <CircularProgress />
  <Text variant="body2">Loading...</Text>
</Center>
```

**Dos and Don'ts**
- Do use `Center` for loading states, empty states, and splash screens.
- Don't nest `Center` inside `Center` -- one level is sufficient.

---

## 2. Buttons

**Package:** `@opengov/cds-components`

---

### Button

Primary interactive element with 7 visual variants, 3 sizes, loading state, and icon slots.

**Import**
```tsx
import { Button } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'secondaryAlt' \| 'tertiary' \| 'tertiaryAlt' \| 'destructive' \| 'destructiveAlt'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset (32/40/48px height) |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows spinner and disables press |
| `iconLeft` | `ReactNode` | -- | Icon before the label |
| `iconRight` | `ReactNode` | -- | Icon after the label |
| `fullWidth` | `boolean` | `false` | Stretches to fill container |
| `onPress` | `() => void` | -- | Press handler |
| `children` | `ReactNode` | -- | Button label (string or element) |
| `accessibilityLabel` | `string` | -- | Overrides the default label |
| `testID` | `string` | -- | Test identifier |

**Usage Example**
```tsx
<Button variant="primary" size="lg" onPress={handleSubmit}>
  Submit Application
</Button>
<Button variant="destructive" iconLeft={<TrashIcon />} onPress={handleDelete}>
  Delete Record
</Button>
```

**Dos and Don'ts**
- Do use `primary` for the single most important action on screen.
- Do use `loading` during async operations instead of disabling + custom spinner.
- Do use `destructive` or `destructiveAlt` for delete/remove actions.
- Don't place more than one `primary` button in the same view.
- Don't use `sm` size without ensuring the touch target meets 44pt (hitSlop is applied automatically).
- Don't override the disabled background color -- the component handles this per variant.

**Platform Notes**
- Focus ring (`outlineWidth: 2`) is visible on web/keyboard navigation only.
- `hitSlop` of 6px is automatically added for `sm` size buttons.

**Accessibility**
- **Required:** `accessibilityLabel` when `children` is not a plain string.
- Announces `"loading"` state via `accessibilityState.busy`.
- Role is set to `"button"` automatically.

---

### IconButton

Circular icon-only button with the same 7 variants and 3 sizes as Button.

**Import**
```tsx
import { IconButton } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| ... \| 'destructiveAlt'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Fixed dimensions (32/40/48px) |
| `disabled` | `boolean` | `false` | Disables interaction |
| `icon` | `ReactNode` | **required** | Icon element to render |
| `onPress` | `() => void` | -- | Press handler |
| `onLongPress` | `() => void` | -- | Long-press handler (useful for tooltip reveal) |
| `accessibilityLabel` | `string` | **required** | Screen reader label |

**Usage Example**
```tsx
<IconButton
  icon={<SettingsIcon />}
  variant="tertiary"
  accessibilityLabel="Open settings"
  onPress={openSettings}
/>
```

**Dos and Don'ts**
- Do always provide a descriptive `accessibilityLabel` -- this prop is required.
- Do use `onLongPress` to show a tooltip explaining the icon's purpose.
- Don't use IconButton for actions that need a visible text label.
- Don't use icons smaller than 18x18px inside the button.

**Accessibility**
- **Required:** `accessibilityLabel` (enforced by TypeScript -- there is no visible text).
- Appends `", disabled"` to the label automatically when disabled.

---

### ButtonGroup

Container for grouping related buttons horizontally or vertically with consistent spacing.

**Import**
```tsx
import { ButtonGroup } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `spacing` | `'compact' \| 'default' \| 'loose'` | `'default'` | Gap between buttons (0/8/16px) |
| `children` | `ReactNode` | -- | Button elements |

**Usage Example**
```tsx
<ButtonGroup spacing="compact">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>
```

**Dos and Don'ts**
- Do use `compact` spacing when buttons should appear visually connected (segmented).
- Do use consistent button variants within a group.
- Don't mix more than 2-3 buttons in a horizontal group on phone screens.

**Accessibility**
- Renders with `accessibilityRole="toolbar"`.

---

## 3. Form Controls

**Package:** `@opengov/cds-components`

---

### TextField

Text input with label, helper/error text, character count, leading/trailing icons, clearable state, and two visual variants.

**Import**
```tsx
import { TextField } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | -- | Label text above the input |
| `placeholder` | `string` | -- | Placeholder text |
| `value` | `string` | `''` | Controlled value |
| `onChangeText` | `(text: string) => void` | -- | Change handler |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | Visual style |
| `error` | `boolean` | `false` | Error state |
| `errorText` | `string` | -- | Error message (sets error state automatically) |
| `helperText` | `string` | -- | Helper message |
| `disabled` | `boolean` | `false` | Disables editing |
| `multiline` | `boolean` | `false` | Enables multi-line mode |
| `numberOfLines` | `number` | `1` | Visible lines when multiline |
| `maxLength` | `number` | -- | Maximum character count |
| `showCharacterCount` | `boolean` | `false` | Displays live character counter |
| `leadingIcon` | `ReactNode` | -- | Icon before the input |
| `trailingIcon` | `ReactNode` | -- | Icon after the input |
| `clearable` | `boolean` | `false` | Shows clear button when input has content |
| `secureTextEntry` | `boolean` | `false` | Password masking |
| `keyboardType` | `'default' \| 'email-address' \| 'numeric' \| 'phone-pad' \| 'url'` | `'default'` | Keyboard layout |
| `accessibilityLabel` | `string` | -- | Defaults to `label` prop value |
| `inputRef` | `Ref<TextInput>` | -- | Ref to the underlying TextInput |

**Usage Example**
```tsx
<TextField
  label="Email Address"
  placeholder="you@example.com"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  errorText={emailError}
/>
```

**Dos and Don'ts**
- Do always provide a `label` or `accessibilityLabel` for screen reader context.
- Do use `errorText` over `error` boolean -- it provides user guidance on fixing the issue.
- Do use `showCharacterCount` together with `maxLength` for constrained inputs.
- Don't use `placeholder` as a replacement for `label`.
- Don't set `secureTextEntry` on a multiline field.

**Platform Notes**
- The border color transitions are animated via `Animated.Value` for smooth focus/error feedback.
- On Android, the `filled` variant renders with a flat bottom-border style.

**Accessibility**
- **Required:** `label` or `accessibilityLabel`.
- Error text is announced via `accessibilityLiveRegion="polite"`.

---

### Checkbox

Toggle control with checked, unchecked, and indeterminate states in three sizes.

**Import**
```tsx
import { Checkbox } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `indeterminate` | `boolean` | `false` | Mixed/indeterminate state |
| `onChange` | `(checked: boolean) => void` | -- | Toggle callback |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Visual size (18/20/24px) |
| `disabled` | `boolean` | `false` | Disables interaction |
| `error` | `boolean` | `false` | Shows red border when unchecked |
| `label` | `string` | -- | Text label beside the checkbox |
| `accessibilityLabel` | `string` | -- | Defaults to `label` prop |

**Usage Example**
```tsx
<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="I agree to the terms and conditions"
/>
```

**Dos and Don'ts**
- Do provide a `label` or wrap with `FormControlLabel` for accessible labeling.
- Do use `indeterminate` for "select all" patterns where only some children are selected.
- Don't use a checkbox for binary on/off settings -- use `Switch` instead.

**Accessibility**
- **Required:** `label` or `accessibilityLabel`.
- Role is `"checkbox"`. States include `checked` (true/false/mixed) and `disabled`.
- Press scale animation provides tactile feedback.

---

### Radio

Single selection option for use within a radio group.

**Import**
```tsx
import { Radio } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | `false` | Whether this radio is selected |
| `onSelect` | `() => void` | -- | Selection callback |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Visual size (18/20/24px outer) |
| `disabled` | `boolean` | `false` | Disables interaction |
| `label` | `string` | -- | Text label beside the radio |
| `value` | `string` | -- | Value for radio group association |
| `accessibilityLabel` | `string` | -- | Defaults to `label` prop |

**Usage Example**
```tsx
<Radio selected={priority === 'high'} onSelect={() => setPriority('high')} label="High" />
<Radio selected={priority === 'low'} onSelect={() => setPriority('low')} label="Low" />
```

**Dos and Don'ts**
- Do use Radio for mutually exclusive selections within a group of 2-5 options.
- Do keep all radio options visible on screen -- don't put them behind a toggle.
- Don't use a single Radio alone -- always present at least 2 options.

**Accessibility**
- **Required:** `label` or `accessibilityLabel`.
- Role is `"radio"`. Announces `selected` state. Inner dot animates via spring.

---

### Switch

iOS-style toggle for binary on/off settings. Available in two sizes.

**Import**
```tsx
import { Switch } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the switch is toggled on |
| `onChange` | `(checked: boolean) => void` | -- | Toggle callback |
| `size` | `'sm' \| 'md'` | `'md'` | Track size (36x20 / 44x24px) |
| `disabled` | `boolean` | `false` | Disables interaction |
| `label` | `string` | -- | Text label beside the switch |
| `accessibilityLabel` | `string` | -- | Defaults to `label` prop |

**Usage Example**
```tsx
<Switch
  checked={notifications}
  onChange={setNotifications}
  label="Enable push notifications"
/>
```

**Dos and Don'ts**
- Do use Switch for settings that take effect immediately (no "save" step).
- Do place the label to the right of the switch (the default layout).
- Don't use Switch for form selections that require explicit submission -- use Checkbox.

**Platform Notes**
- Track color transitions between neutral300 (off) and primary (on) via spring animation.
- Thumb has a subtle drop shadow for depth.

**Accessibility**
- **Required:** `label` or `accessibilityLabel`.
- Role is `"switch"`. State includes `checked` and `disabled`.

---

### Slider

Range input with draggable thumb, tap-to-set, step snapping, and optional value label.

**Import**
```tsx
import { Slider } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | **required** | Current value |
| `onValueChange` | `(value: number) => void` | -- | Fires during drag |
| `onSlidingComplete` | `(value: number) => void` | -- | Fires on release |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Disables interaction |
| `showValue` | `boolean` | `false` | Shows value label above thumb while dragging |
| `trackColor` | `string` | `'#E0E0E0'` | Background track color |
| `fillColor` | `string` | `'#4B3FFF'` | Filled portion color |
| `accessibilityLabel` | `string` | `'Slider'` | Screen reader label |

**Usage Example**
```tsx
<Slider
  value={opacity}
  onValueChange={setOpacity}
  min={0}
  max={100}
  step={5}
  showValue
/>
```

**Dos and Don'ts**
- Do use `onSlidingComplete` for expensive operations (API calls) and `onValueChange` for UI updates.
- Do provide meaningful `min`/`max` bounds with appropriate `step` values.
- Don't set `step` to 0 -- the slider will lose snap behavior.

**Accessibility**
- Role is `"adjustable"`. Supports increment/decrement accessibility actions.
- Announces `accessibilityValue` with min, max, and current.

---

### FormLabel

Styled label for form fields with optional required asterisk indicator.

**Import**
```tsx
import { FormLabel } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Label text |
| `required` | `boolean` | `false` | Shows red asterisk |
| `error` | `boolean` | `false` | Applies error color |
| `disabled` | `boolean` | `false` | Applies disabled color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Font size preset |

**Usage Example**
```tsx
<FormLabel label="Email Address" required />
<TextField value={email} onChangeText={setEmail} />
```

**Accessibility**
- Announces `", required"` appended to the label when `required` is true.

---

### FormControlLabel

Wraps a form control (Checkbox, Radio, Switch) with a tappable text label. Tapping the label toggles the control.

**Import**
```tsx
import { FormControlLabel } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Label text |
| `labelPlacement` | `'end' \| 'start' \| 'top' \| 'bottom'` | `'end'` | Label position relative to control |
| `disabled` | `boolean` | `false` | Disables both label and control |
| `control` | `ReactElement` | **required** | The form control element |

**Usage Example**
```tsx
<FormControlLabel
  label="Receive weekly reports"
  control={<Checkbox checked={weekly} onChange={setWeekly} />}
/>
```

**Dos and Don'ts**
- Do use this wrapper instead of placing labels manually beside controls.
- Do use `labelPlacement="top"` for compact form layouts.
- Don't nest FormControlLabel inside another FormControlLabel.

---

## 4. Content

**Package:** `@opengov/cds-components`

---

### Link

Tappable text that opens a URL via `Linking.openURL` or triggers a custom callback.

**Import**
```tsx
import { Link } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | -- | URL to open |
| `onPress` | `() => void` | -- | Custom press handler (overrides `href`) |
| `variant` | `'default' \| 'subtle' \| 'inline'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Font size |
| `external` | `boolean` | `false` | Shows trailing external-link icon |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `children` | `ReactNode` | -- | Link text |

**Usage Example**
```tsx
<Link href="https://opengov.com/docs" external>
  View documentation
</Link>
```

**Dos and Don'ts**
- Do use `external` when the link opens in a browser outside the app.
- Do provide `accessibilityHint` for links that trigger navigation.
- Don't use Link for primary actions -- use Button instead.

**Accessibility**
- Role is `"link"`. Auto-generates `accessibilityHint` of `"Opens in external browser"` when `external` is true.

---

### Divider

Horizontal or vertical rule for separating content, with optional centered label text.

**Import**
```tsx
import { Divider } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Line direction |
| `spacing` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Margin around the divider (0/8/16/24px) |
| `color` | `string` | `'$borderColor'` | Line color override |
| `label` | `string` | -- | Centered text (horizontal only) |

**Usage Example**
```tsx
<Divider spacing="md" />
<Divider label="or" spacing="sm" />
```

**Accessibility**
- Renders with `role="separator"`. The `label` text is used as `accessibilityLabel`.

---

### Badge

Notification count indicator that overlays a child element or renders standalone.

**Import**
```tsx
import { Badge } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | -- | Numeric count for standard variant |
| `maxCount` | `number` | `99` | Upper bound before showing "N+" |
| `variant` | `'standard' \| 'dot'` | `'standard'` | Standard (count) or dot (indicator) |
| `color` | `'default' \| 'primary' \| 'error' \| 'success' \| 'warning'` | `'error'` | Background color |
| `visible` | `boolean` | `true` | Controls badge visibility |
| `children` | `ReactNode` | -- | Anchor element the badge overlays |

**Usage Example**
```tsx
<Badge count={5} color="error">
  <BellIcon />
</Badge>
<Badge variant="dot" color="success" />
```

**Dos and Don'ts**
- Do use `dot` variant for boolean presence indicators (online, new item).
- Do use `maxCount` to prevent large numbers from breaking layout.
- Don't place badges on text elements -- they are designed for icon overlays.

**Accessibility**
- Role is `"status"`. Auto-generates label like `"5 notifications"` or `"Notification indicator"`.

---

### Avatar

User identity element displaying an image, or initials as a fallback with a deterministic background color.

**Import**
```tsx
import { Avatar } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `source` | `{ uri: string }` | -- | Image source URI |
| `name` | `string` | -- | Full name for initials and background color |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Dimensions (24/32/40/56/72px) |
| `shape` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | Border radius style |
| `status` | `'online' \| 'offline' \| 'busy'` | -- | Status indicator dot |

**Usage Example**
```tsx
<Avatar
  source={{ uri: 'https://example.com/photo.jpg' }}
  name="Jane Smith"
  size="lg"
  status="online"
/>
```

**Dos and Don'ts**
- Do always provide `name` so the initials fallback renders correctly when the image fails.
- Do use `status` only for real-time presence indicators, not workflow statuses.
- Don't use `xs` size with the `status` dot -- it is too small to be legible.

**Accessibility**
- Role is `"image"`. Label defaults to `"Avatar for {name}"`. Status dot announces `"Online"`, `"Offline"`, or `"Busy"`.

---

### Chip

Compact status indicator or filter tag with five semantic color variants in filled and outlined styles.

**Import**
```tsx
import { Chip } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Display text |
| `variant` | `'neutral' \| 'positive' \| 'negative' \| 'warning' \| 'strong'` | `'neutral'` | Semantic color |
| `style` | `'filled' \| 'outlined'` | `'filled'` | Background or border style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height (24/32/36px) |
| `leadingIcon` | `ReactNode` | -- | Icon before the label |
| `closable` | `boolean` | `false` | Shows close/X button |
| `onClose` | `() => void` | -- | Close button handler |
| `selected` | `boolean` | `false` | Selected visual state |
| `onPress` | `() => void` | -- | Makes the chip tappable |
| `disabled` | `boolean` | `false` | Disables all interactions |

**Usage Example**
```tsx
<Chip label="Approved" variant="positive" />
<Chip label="Draft" closable onClose={handleRemove} />
```

**Dos and Don'ts**
- Do use semantic variants consistently (positive = success, negative = error).
- Do use `closable` for filter chips that users can remove.
- Don't put long text in chips -- keep labels under 20 characters.

**Accessibility**
- Role is `"button"` when pressable, `"text"` when static. Close button announces `"Remove"`.

---

### Card

Content container with three visual variants, four padding presets, and optional press-to-scale feedback.

**Import**
```tsx
import { Card } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | Visual style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Inner padding (0/8/16/24px) |
| `onPress` | `() => void` | -- | Makes the card tappable with scale feedback |
| `disabled` | `boolean` | `false` | Disables interaction and dims |
| `children` | `ReactNode` | -- | Card content |

**Sub-components:** `Card.Header`, `Card.Content`, `Card.Footer`

| Sub-component Prop | Type | Default | Description |
|--------------------|------|---------|-------------|
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | -- | Section padding override |

**Usage Example**
```tsx
<Card variant="outlined" onPress={navigateToDetail}>
  <Card.Header>
    <Text variant="h5">Permit #12345</Text>
  </Card.Header>
  <Card.Content>
    <Text variant="body2">Residential building permit</Text>
  </Card.Content>
</Card>
```

**Dos and Don'ts**
- Do use `Card.Header` / `Card.Content` / `Card.Footer` for structured layouts.
- Do use `elevated` for cards that float above the page background.
- Don't nest interactive elements (buttons, links) inside a pressable card.

**Accessibility**
- Pressable cards render with `role="button"`. Header sections render with `role="header"`.

---

## 5. Navigation

**Package:** `@opengov/cds-components`

---

### AppBar

Mobile top navigation bar with title, subtitle, leading icon, and up to 3 trailing action slots.

**Import**
```tsx
import { AppBar } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Primary title text |
| `subtitle` | `string` | -- | Subtitle below the title |
| `variant` | `'standard' \| 'prominent' \| 'dense'` | `'standard'` | Height variant (56/112/48px) |
| `leadingIcon` | `ReactNode` | -- | Back arrow or menu icon |
| `onLeadingPress` | `() => void` | -- | Leading icon press handler |
| `trailingActions` | `ReactNode[]` | -- | 1-3 trailing action elements |
| `transparent` | `boolean` | `false` | Transparent background |
| `elevated` | `boolean` | `false` | Adds drop shadow |

**Usage Example**
```tsx
<AppBar
  title="Permit Details"
  leadingIcon={<BackIcon />}
  onLeadingPress={goBack}
  trailingActions={[<SearchIcon />, <MoreIcon />]}
/>
```

**Dos and Don'ts**
- Do use `prominent` variant for top-level screens with large titles.
- Do limit trailing actions to 3 maximum.
- Don't use `transparent` without ensuring title text has sufficient contrast against the content behind.

**Platform Notes**
- Applies `paddingTop` of 44px (iOS) or 24px (Android) for the status bar safe area.

**Accessibility**
- Role is `"header"`. Leading icon announces `"Navigate back"`.

---

### BottomTabBar

Standard bottom tab navigation bar with icon, label, and badge support. Displays 3-5 items.

**Import**
```tsx
import { BottomTabBar } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BottomTabBarItem[]` | **required** | Array of 3-5 tab items |
| `activeKey` | `string` | **required** | Key of the active tab |
| `onSelect` | `(key: string) => void` | -- | Tab selection handler |
| `elevated` | `boolean` | `false` | Shadow instead of top border |

**BottomTabBarItem shape:**

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Unique tab identifier |
| `label` | `string` | Text label below icon |
| `icon` | `ReactNode` | Default icon element |
| `activeIcon` | `ReactNode` | Active-state icon (optional, e.g., filled variant) |
| `badge` | `number \| boolean` | Count badge or dot indicator |

**Usage Example**
```tsx
<BottomTabBar
  items={[
    { key: 'home', label: 'Home', icon: <HomeIcon /> },
    { key: 'tasks', label: 'Tasks', icon: <TaskIcon />, badge: 3 },
    { key: 'profile', label: 'Profile', icon: <ProfileIcon /> },
  ]}
  activeKey="home"
  onSelect={setActiveTab}
/>
```

**Dos and Don'ts**
- Do provide both `icon` and `activeIcon` for filled/outlined icon transitions.
- Do keep labels short (one word preferred).
- Don't use more than 5 tabs -- the labels become unreadable.

**Platform Notes**
- Adds bottom safe area padding (34px iOS, 0px Android) automatically.

**Accessibility**
- Role is `"tablist"` on the container, `"tab"` on each item. Badge counts are announced in the tab label.

---

### FloatingBottomNav

Glassmorphism pill-style floating bottom navigation bar from PLC Mobile. Active tab displays as a dark pill with icon + label.

**Import**
```tsx
import { FloatingBottomNav } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `FloatingBottomNavItem[]` | **required** | Navigation items (3-5) |
| `activeKey` | `string` | **required** | Active item key |
| `onSelect` | `(key: string) => void` | -- | Selection handler |
| `device` | `'mobile' \| 'tabletPortrait' \| 'tabletLandscape'` | `'mobile'` | Device variant for padding |

**Usage Example**
```tsx
<FloatingBottomNav
  items={[
    { key: 'home', label: 'Home', icon: <HomeIcon /> },
    { key: 'search', label: 'Search', icon: <SearchIcon /> },
  ]}
  activeKey="home"
  onSelect={setTab}
/>
```

**Dos and Don'ts**
- Do account for the floating nav height in your scroll content padding.
- Do use `device` prop on tablets for wider horizontal padding.
- Don't use FloatingBottomNav together with BottomTabBar -- choose one.

---

### Tab

Individual tab item with primary (underline) and secondary (filled pill) visual variants.

**Import**
```tsx
import { Tab } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Tab display text |
| `icon` | `ReactNode` | -- | Leading icon |
| `badge` | `number` | -- | Trailing badge count |
| `active` | `boolean` | `false` | Whether this tab is active |
| `onPress` | `() => void` | -- | Press handler |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Underline or pill indicator |

**Usage Example**
```tsx
<Tab label="Overview" active={tab === 'overview'} onPress={() => setTab('overview')} />
```

**Accessibility**
- Role is `"tab"`. Badge count is included in `accessibilityLabel`.

---

### TabBar

Horizontal container for `Tab` components. Supports fixed (even distribution) and scrollable modes.

**Import**
```tsx
import { TabBar } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | -- | Tab components |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Must match child Tab variants |
| `scrollable` | `boolean` | `false` | Enables horizontal scrolling |

**Usage Example**
```tsx
<TabBar variant="primary" scrollable>
  <Tab label="All" active onPress={handleTab} />
  <Tab label="Pending" onPress={handleTab} />
  <Tab label="Completed" onPress={handleTab} />
</TabBar>
```

**Dos and Don'ts**
- Do use `scrollable` when you have 4+ tabs or long labels.
- Do match the `variant` prop on TabBar with the variant on child Tab components.
- Don't mix `primary` and `secondary` Tab variants in the same TabBar.

---

### Breadcrumbs

Horizontal navigation trail with chevron separators and auto-collapsing for deep hierarchies.

**Import**
```tsx
import { Breadcrumbs } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | **required** | Ordered list from root to current |
| `separator` | `ReactNode` | chevron-right icon | Custom separator element |
| `maxItems` | `number` | `3` | Maximum visible items before ellipsis |

**BreadcrumbItem shape:** `{ label: string; onPress?: () => void }`

**Usage Example**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', onPress: goHome },
    { label: 'Permits', onPress: goPermits },
    { label: 'Application #123' },
  ]}
/>
```

**Dos and Don'ts**
- Do keep `maxItems` at 2-3 on phone screens.
- Don't use Breadcrumbs as the primary navigation method on mobile.

---

### NavigationPillList

Horizontal pill-style filter/navigation bar with selected state highlighting.

**Import**
```tsx
import { NavigationPillList } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `NavigationPillItem[]` | **required** | Items with key, label, optional icon |
| `activeKey` | `string` | **required** | Currently selected key |
| `onSelect` | `(key: string) => void` | **required** | Selection handler |

**Usage Example**
```tsx
<NavigationPillList
  items={[
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
  ]}
  activeKey="all"
  onSelect={setFilter}
/>
```

---

### SegmentedControl

iOS-style segmented control with a sliding white pill indicator that animates between segments.

**Import**
```tsx
import { SegmentedControl } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SegmentedControlItem[]` | **required** | 2-4 segment items |
| `activeKey` | `string` | **required** | Active segment key |
| `onSelect` | `(key: string) => void` | -- | Selection callback |
| `fullWidth` | `boolean` | `true` | Stretches to fill parent |

**Usage Example**
```tsx
<SegmentedControl
  items={[
    { key: 'day', label: 'Day' },
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
  ]}
  activeKey="week"
  onSelect={setView}
/>
```

**Dos and Don'ts**
- Do use for 2-4 mutually exclusive options that affect the same view.
- Do keep labels short (one word).
- Don't use for navigation between different screens -- use TabBar or BottomTabBar.

**Accessibility**
- Role is `"tablist"` on the container, `"tab"` on each segment.

---

### SegmentedTabs

Tab control with label-based or icon-only variants. Selected tab has a white background with shadow.

**Import**
```tsx
import { SegmentedTabs } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SegmentedTabItem[]` | **required** | Tab items with optional count/icon |
| `activeKey` | `string` | **required** | Active tab key |
| `onSelect` | `(key: string) => void` | -- | Selection handler |
| `variant` | `'default' \| 'iconOnly'` | `'default'` | Label or icon-only display |

**Usage Example**
```tsx
<SegmentedTabs
  items={[
    { key: 'scheduled', label: 'Scheduled', count: 4 },
    { key: 'missed', label: 'Missed', count: 1 },
  ]}
  activeKey="scheduled"
  onSelect={setFilter}
/>
```

---

## 6. Overlays and Feedback

**Package:** `@opengov/cds-components`

---

### BottomSheet

Gesture-aware modal sheet that slides up from the bottom with snap-point height control and swipe-to-dismiss.

**Import**
```tsx
import { BottomSheet } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Controls visibility |
| `onClose` | `() => void` | **required** | Called when the sheet should close |
| `snapPoint` | `'quarter' \| 'half' \| 'threeQuarter' \| 'full'` | `'half'` | Height (25%/50%/75%/90% of screen) |
| `showHandle` | `boolean` | `true` | Shows drag handle bar at top |
| `showBackdrop` | `boolean` | `true` | Shows dimmed backdrop overlay |
| `children` | `ReactNode` | -- | Sheet content |

**Usage Example**
```tsx
<BottomSheet visible={showSheet} onClose={() => setShowSheet(false)} snapPoint="threeQuarter">
  <FilterOptions />
</BottomSheet>
```

**Dos and Don'ts**
- Do use `half` or `threeQuarter` for most content -- `full` should be reserved for complex forms.
- Do keep the handle visible for discoverability of swipe-to-dismiss.
- Don't nest BottomSheets inside each other.

**Accessibility**
- Renders inside a `Modal` with `accessibilityViewIsModal`. Handle announces `"Swipe down to close"`.

---

### Dialog

Centered modal dialog with animated scale entrance, title, description, custom content, and action buttons.

**Import**
```tsx
import { Dialog } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Controls visibility |
| `onClose` | `() => void` | **required** | Close handler |
| `title` | `string` | -- | Title text |
| `description` | `string` | -- | Body text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Width (280/340/400px) |
| `actions` | `ReactNode` | -- | Action buttons at the bottom |
| `closeOnBackdrop` | `boolean` | `true` | Backdrop press dismisses |
| `children` | `ReactNode` | -- | Custom content between description and actions |

**Usage Example**
```tsx
<Dialog
  visible={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="Delete Record?"
  description="This action cannot be undone."
  actions={
    <>
      <Button variant="tertiary" onPress={() => setShowConfirm(false)}>Cancel</Button>
      <Button variant="destructive" onPress={handleDelete}>Delete</Button>
    </>
  }
/>
```

**Dos and Don'ts**
- Do keep dialog content concise -- two buttons maximum recommended.
- Do place the destructive action on the right.
- Don't use Dialog for complex forms -- use BottomSheet instead.

**Accessibility**
- Role is `"alert"`. Title serves as the accessible label for the dialog.

---

### Snackbar

Brief notification toast with auto-dismiss, swipe-to-dismiss, and optional action button.

**Import**
```tsx
import { Snackbar } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Controls visibility |
| `message` | `string` | **required** | Notification text |
| `variant` | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Background color |
| `position` | `'top' \| 'bottom'` | `'bottom'` | Screen position |
| `duration` | `number` | `4000` | Auto-dismiss (ms). Set to 0 to disable. |
| `onDismiss` | `() => void` | **required** | Dismiss handler |
| `action` | `{ label: string; onPress: () => void }` | -- | Action button |

**Usage Example**
```tsx
<Snackbar
  visible={saved}
  message="Changes saved successfully"
  variant="success"
  onDismiss={() => setSaved(false)}
  action={{ label: 'Undo', onPress: handleUndo }}
/>
```

**Dos and Don'ts**
- Do keep messages under 2 lines.
- Do use the action button for reversible operations (undo).
- Don't show multiple snackbars simultaneously -- queue them.

**Accessibility**
- Role is `"alert"` with `accessibilityLiveRegion="polite"` for screen reader announcement.

---

### Backdrop

Semi-transparent overlay with animated fade-in/out, used behind modals and drawers.

**Import**
```tsx
import { Backdrop } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Controls visibility |
| `onPress` | `() => void` | -- | Press handler for dismissal |
| `opacity` | `'light' \| 'medium' \| 'heavy'` | `'medium'` | Opacity level (0.3/0.5/0.7) |
| `animationDuration` | `number` | `200` | Fade duration in ms |
| `children` | `ReactNode` | -- | Content above the backdrop |

**Usage Example**
```tsx
<Backdrop visible={showMenu} onPress={closeMenu} opacity="medium">
  <DropdownMenu />
</Backdrop>
```

---

### Drawer

Side panel that slides in from the left or right edge with swipe-to-dismiss.

**Import**
```tsx
import { Drawer } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Controls visibility |
| `onClose` | `() => void` | **required** | Close handler |
| `anchor` | `'left' \| 'right'` | `'left'` | Edge the drawer slides from |
| `width` | `'sm' \| 'md' \| 'lg'` | `'md'` | Panel width (280/320/360px) |
| `children` | `ReactNode` | -- | Drawer content |

**Usage Example**
```tsx
<Drawer visible={showMenu} onClose={closeMenu} anchor="left">
  <NavigationMenu />
</Drawer>
```

**Dos and Don'ts**
- Do use `left` anchor for primary navigation drawers.
- Do use `right` anchor for contextual panels (filters, details).
- Don't put critical actions only inside a drawer -- they should be reachable from the main screen.

**Accessibility**
- Role is `"menu"`. Announces anchor direction in the label.

---

### Tooltip

Long-press-triggered informational overlay with directional arrow. Auto-dismisses after 3 seconds.

**Import**
```tsx
import { Tooltip } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | **required** | Tooltip text |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Direction relative to anchor |
| `children` | `ReactNode` | **required** | Anchor element |
| `delayMs` | `number` | `500` | Long-press delay before showing |

**Usage Example**
```tsx
<Tooltip content="Filter by date range" placement="bottom">
  <IconButton icon={<FilterIcon />} accessibilityLabel="Filter" />
</Tooltip>
```

**Dos and Don'ts**
- Do keep tooltip text under 80 characters.
- Do use tooltips for supplementary information, not critical instructions.
- Don't use tooltips on elements that already have visible labels.

**Platform Notes**
- On mobile, tooltips are activated via long-press (not hover).

---

### SearchBar

Mobile search input with leading icon, trailing clear button, and animated cancel button that slides in on focus.

**Import**
```tsx
import { SearchBar } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Controlled input value |
| `onChangeText` | `(text: string) => void` | -- | Change handler |
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height (36/44/48px) |
| `onCancel` | `() => void` | -- | Cancel button handler |
| `showCancel` | `boolean` | `false` | Forces cancel button visible |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |

**Usage Example**
```tsx
<SearchBar
  value={query}
  onChangeText={setQuery}
  onCancel={() => setQuery('')}
  placeholder="Search permits..."
/>
```

**Accessibility**
- Role is `"search"`. Clear button announces `"Clear search"`. Cancel button announces `"Cancel search"`.

---

### ActionSheet

iOS-style action list that slides up from the bottom with grouped options and a separated cancel button.

**Import**
```tsx
import { ActionSheet } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Controls visibility |
| `onClose` | `() => void` | **required** | Close handler |
| `title` | `string` | -- | Header title |
| `message` | `string` | -- | Header message |
| `options` | `ActionSheetOption[]` | **required** | Action items |
| `cancelLabel` | `string` | `'Cancel'` | Cancel button text |

**ActionSheetOption shape:** `{ label: string; onPress: () => void; destructive?: boolean; disabled?: boolean; icon?: ReactNode }`

**Usage Example**
```tsx
<ActionSheet
  visible={showActions}
  onClose={() => setShowActions(false)}
  title="Record Actions"
  options={[
    { label: 'Edit', onPress: handleEdit },
    { label: 'Delete', onPress: handleDelete, destructive: true },
  ]}
/>
```

**Dos and Don'ts**
- Do place destructive options last (before cancel).
- Do limit options to 6 maximum -- use a full screen for more.
- Don't use ActionSheet for navigation -- it is for contextual actions.

**Accessibility**
- Role is `"menu"` on the container, `"menuitem"` on each option.

---

## 7. Data Display

**Package:** `@opengov/cds-components`

---

### Table

Mobile-adapted data table built on FlatList. On phones (<768px), rows render as card-style key-value layouts. On tablets, rows render as condensed horizontal rows with a sticky header.

**Import**
```tsx
import { Table } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | **required** | Column definitions |
| `data` | `T[]` | **required** | Row data array |
| `keyExtractor` | `(item: T, index: number) => string` | **required** | Unique key for each row |
| `onRowPress` | `(item: T, index: number) => void` | -- | Row press handler |
| `striped` | `boolean` | `false` | Alternating row backgrounds |
| `sortColumn` | `string` | -- | Currently sorted column key |
| `sortDirection` | `'asc' \| 'desc'` | `'asc'` | Sort direction |
| `onSort` | `(column: string) => void` | -- | Sort handler |
| `emptyMessage` | `string` | `'No data to display'` | Empty state text |
| `loading` | `boolean` | `false` | Shows skeleton loading rows |

**TableColumn shape:** `{ key: string; title: string; width?: number | string; align?: 'left' | 'center' | 'right'; render?: (item, index) => ReactNode; sortable?: boolean }`

**Usage Example**
```tsx
<Table
  columns={[
    { key: 'name', title: 'Name', sortable: true },
    { key: 'status', title: 'Status', render: (item) => <Chip label={item.status} /> },
  ]}
  data={permits}
  keyExtractor={(item) => item.id}
  onRowPress={(item) => navigate(`/permits/${item.id}`)}
  striped
/>
```

**Platform Notes**
- Phone (< 768px): Each row renders as a card with label-value pairs stacked vertically.
- Tablet (>= 768px): Traditional horizontal row layout with column headers.

**Accessibility**
- Role is `"list"`. Row press targets announce `"Row N"`. Sort buttons announce `"Sort by {column}"`.

---

### CircularProgress

Circular progress indicator supporting determinate (0-100%) and indeterminate (spinning) modes.

**Import**
```tsx
import { CircularProgress } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | -- | Progress 0-100. Omit for indeterminate. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Diameter (24/36/48px) |
| `color` | `'primary' \| 'success' \| 'error' \| 'warning' \| 'neutral'` | `'primary'` | Arc color |
| `showValue` | `boolean` | `false` | Shows percentage in center (determinate only) |
| `strokeWidth` | `number` | -- | Overrides default stroke width |

**Usage Example**
```tsx
<CircularProgress value={75} color="success" showValue />
<CircularProgress size="sm" />  {/* Indeterminate spinner */}
```

**Accessibility**
- Role is `"progressbar"`. Announces `"Progress: 75 percent"` or `"Loading"` for indeterminate.

---

### LinearProgress

Horizontal progress bar supporting determinate and indeterminate modes.

**Import**
```tsx
import { LinearProgress } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | -- | Progress 0-100. Omit for indeterminate. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Track height (2/4/8px) |
| `color` | `'primary' \| 'success' \| 'error' \| 'warning' \| 'neutral'` | `'primary'` | Fill color |

**Usage Example**
```tsx
<LinearProgress value={45} color="primary" />
<LinearProgress size="sm" />  {/* Indeterminate shimmer */}
```

---

### SkeletonLoader

Animated placeholder for content that is loading. Supports pulse and wave animations.

**Import**
```tsx
import { SkeletonLoader } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | Shape |
| `width` | `number \| string` | -- | Width (circular defaults to height) |
| `height` | `number` | -- | Height (defaults: text=16, circular=40, rectangular/rounded=80) |
| `count` | `number` | `1` | Number of stacked items |
| `animation` | `'pulse' \| 'wave'` | `'pulse'` | Animation style |
| `spacing` | `number` | `8` | Gap between items when count > 1 |

**Usage Example**
```tsx
<SkeletonLoader variant="text" count={3} />
<SkeletonLoader variant="circular" width={48} height={48} />
<SkeletonLoader variant="rounded" height={120} animation="wave" />
```

**Dos and Don'ts**
- Do match skeleton dimensions to the real content layout.
- Do use `count` for list-like loading states.
- Don't show skeletons indefinitely -- add a timeout fallback.

---

### EmptyState

Centered placeholder for screens with no data. Includes icon slot, title, description, and optional action button.

**Import**
```tsx
import { EmptyState } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | -- | Illustration or icon element |
| `title` | `string` | **required** | Primary heading |
| `description` | `string` | -- | Supporting text |
| `action` | `{ label: string; onPress: () => void }` | -- | Action button |
| `compact` | `boolean` | `false` | Reduced padding for inline use |

**Usage Example**
```tsx
<EmptyState
  icon={<NoDataIllustration />}
  title="No permits found"
  description="Try adjusting your search or filters."
  action={{ label: 'Clear Filters', onPress: clearFilters }}
/>
```

---

### SwipeableRow

Horizontal swipe gesture handler that reveals action buttons on left and/or right sides.

**Import**
```tsx
import { SwipeableRow } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leftActions` | `SwipeableRowAction[]` | `[]` | Actions revealed on right swipe |
| `rightActions` | `SwipeableRowAction[]` | `[]` | Actions revealed on left swipe |
| `threshold` | `number` | `80` | Swipe distance to reveal (px) |
| `children` | `ReactNode` | -- | Row content |
| `onSwipeStart` | `() => void` | -- | Called when swipe begins |
| `onSwipeEnd` | `() => void` | -- | Called when row snaps closed |

**SwipeableRowAction shape:** `{ key: string; label: string; icon?: ReactNode; color: string; onPress: () => void }`

**Usage Example**
```tsx
<SwipeableRow
  rightActions={[
    { key: 'delete', label: 'Delete', color: '#CC2929', onPress: handleDelete },
  ]}
>
  <ListItemContent />
</SwipeableRow>
```

**Dos and Don'ts**
- Do limit actions to 2-3 per side.
- Do use red/destructive color for delete actions.
- Don't nest SwipeableRow inside a horizontal ScrollView.

---

### PullToRefresh

Wraps children in a ScrollView with the platform-native RefreshControl for pull-to-refresh behavior.

**Import**
```tsx
import { PullToRefresh } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `refreshing` | `boolean` | **required** | Whether the spinner is active |
| `onRefresh` | `() => void` | **required** | Refresh callback |
| `children` | `ReactNode` | -- | Scrollable content |
| `tintColor` | `string` | `'#4B3FFF'` | Spinner color |
| `progressViewOffset` | `number` | `0` | Spinner position offset (Android) |
| `progressBackgroundColor` | `string` | -- | Spinner background (Android) |

**Usage Example**
```tsx
<PullToRefresh refreshing={loading} onRefresh={fetchData}>
  <PermitList data={permits} />
</PullToRefresh>
```

**Platform Notes**
- iOS: Uses the native UIRefreshControl with `tintColor`.
- Android: Uses `colors` array (cycles through the `tintColor`) and supports `progressViewOffset` and `progressBackgroundColor`.

---

### Fab

Floating Action Button with circular or extended pill shape, three sizes, and three color schemes.

**Import**
```tsx
import { Fab } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | **required** | Icon element |
| `label` | `string` | -- | Text label (shown when `extended`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dimensions (40/56/72px) |
| `color` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Color scheme |
| `position` | `'bottomRight' \| 'bottomLeft' \| 'bottomCenter'` | `'bottomRight'` | Absolute position |
| `onPress` | `() => void` | -- | Press handler |
| `disabled` | `boolean` | `false` | Disables and dims |
| `extended` | `boolean` | `false` | Pill shape with icon + label |

**Usage Example**
```tsx
<Fab icon={<PlusIcon />} onPress={createNew} />
<Fab icon={<PlusIcon />} label="New Permit" extended />
```

**Dos and Don'ts**
- Do use one FAB per screen maximum.
- Do use `extended` variant when the action needs clarification beyond the icon.
- Don't position the FAB over important content or navigation elements.

---

### SpeedDial

Expandable FAB with multiple staggered action items that fan out upward.

**Import**
```tsx
import { SpeedDial } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | **required** | Main FAB icon (rotates 45deg when open) |
| `actions` | `SpeedDialAction[]` | **required** | 3-6 action items |
| `open` | `boolean` | -- | Controlled open state |
| `onToggle` | `(open: boolean) => void` | -- | Toggle handler |
| `position` | `'bottomRight' \| 'bottomLeft'` | `'bottomRight'` | Screen position |

**SpeedDialAction shape:** `{ key: string; icon: ReactNode; label: string; onPress: () => void; color?: string }`

**Usage Example**
```tsx
<SpeedDial
  icon={<PlusIcon />}
  actions={[
    { key: 'note', icon: <NoteIcon />, label: 'Add Note', onPress: addNote },
    { key: 'photo', icon: <CameraIcon />, label: 'Take Photo', onPress: takePhoto },
  ]}
/>
```

**Accessibility**
- Main FAB toggles between `"Open speed dial"` and `"Close speed dial"`. Each action is a labeled button.

---

## 8. Platform Utilities

**Package:** `@opengov/cds-components`

---

### SafeAreaWrapper

Applies device-specific safe area insets (notch, home indicator, status bar) as padding or margin.

**Import**
```tsx
import { SafeAreaWrapper } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `edges` | `('top' \| 'bottom' \| 'left' \| 'right')[]` | all edges | Which edges to protect |
| `mode` | `'padding' \| 'margin'` | `'padding'` | How insets are applied |
| `backgroundColor` | `string` | -- | Background color |

**Usage Example**
```tsx
<SafeAreaWrapper edges={['top', 'bottom']}>
  <MyScreen />
</SafeAreaWrapper>
```

**Dos and Don'ts**
- Do wrap your root screen layout with SafeAreaWrapper.
- Do use `edges` to protect only relevant edges (e.g., `['top']` for a screen with a BottomTabBar).
- Don't double-apply safe areas -- if AppBar already handles top inset, exclude `'top'` from edges.

**Platform Notes**
- Uses `react-native-safe-area-context` when available. Falls back to platform defaults: iOS 44px top / 34px bottom, Android 24px top.

---

### StatusBar

Declarative status bar theming component. Renders no visible UI -- place at the top of your screen.

**Import**
```tsx
import { StatusBar } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Icon/text color |
| `translucent` | `boolean` | `true` | Content renders under status bar (Android) |
| `hidden` | `boolean` | `false` | Hides the status bar |
| `backgroundColor` | `string` | -- | Background color (Android only) |
| `animated` | `boolean` | `true` | Animate style transitions |

**Usage Example**
```tsx
<StatusBar style="dark" />                    {/* Light background */}
<StatusBar style="light" backgroundColor="#1A1A1A" />  {/* Dark background */}
```

**Platform Notes**
- iOS: Controls text/icon color and visibility only.
- Android: Additionally supports `backgroundColor` and `translucent`.

---

### KeyboardAvoidingWrapper

Platform-aware wrapper around React Native's `KeyboardAvoidingView` with sensible defaults.

**Import**
```tsx
import { KeyboardAvoidingWrapper } from '@opengov/cds-components'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `behavior` | `'height' \| 'position' \| 'padding'` | iOS: `'padding'`, Android: `'height'` | Avoidance strategy |
| `keyboardVerticalOffset` | `number` | `0` | Extra offset for headers/tab bars |
| `enabled` | `boolean` | `true` | Enables/disables avoidance |
| `children` | `ReactNode` | -- | Content to push above keyboard |

**Usage Example**
```tsx
<KeyboardAvoidingWrapper keyboardVerticalOffset={64}>
  <TextField label="Email" />
  <TextField label="Password" secureTextEntry />
  <Button onPress={login}>Sign In</Button>
</KeyboardAvoidingWrapper>
```

**Dos and Don'ts**
- Do set `keyboardVerticalOffset` to your navigation header height.
- Do use `behavior="padding"` on iOS for the most reliable results.
- Don't nest multiple KeyboardAvoidingWrappers.

---

## 9. AI/Chat Patterns

**Package:** `@opengov/cds-patterns`

---

### ChatBubble

Conversational message bubble for OG Assist. User messages are right-aligned with brand color; assistant messages are left-aligned with neutral background.

**Import**
```tsx
import { ChatBubble } from '@opengov/cds-patterns'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | **required** | Message text |
| `sender` | `'user' \| 'assistant'` | `'assistant'` | Sender identity |
| `timestamp` | `string` | -- | Time string (e.g., "2:34 PM") |
| `status` | `'sending' \| 'sent' \| 'delivered' \| 'read'` | `'sent'` | Delivery status (user messages) |
| `loading` | `boolean` | `false` | Shows typing indicator (3 animated dots) |
| `avatar` | `ReactNode` | -- | Avatar element for assistant messages |
| `onLongPress` | `() => void` | -- | Long-press handler (copy, reply) |
| `onPress` | `() => void` | -- | Press handler |

**Usage Example**
```tsx
<ChatBubble sender="user" message="What permits do I need?" timestamp="2:34 PM" status="read" />
<ChatBubble sender="assistant" message="You'll need a building permit." avatar={<AiAvatar />} />
<ChatBubble sender="assistant" loading />  {/* Typing indicator */}
```

**Dos and Don'ts**
- Do use `loading` to show the typing indicator before the assistant responds.
- Do provide `avatar` for assistant messages for visual distinction.
- Don't use `status` on assistant messages -- it is only relevant for user messages.

**Accessibility**
- Announces sender, message, and timestamp. Long-press hint is provided when `onLongPress` is set.

---

### ChatInput

Message composer bar with expandable multi-line input (up to 5 lines), attachment button, character counter, and send button.

**Import**
```tsx
import { ChatInput } from '@opengov/cds-patterns'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Controlled input value |
| `onChangeText` | `(text: string) => void` | -- | Change handler |
| `onSend` | `(message: string) => void` | -- | Fires with trimmed message |
| `onAttach` | `() => void` | -- | Attachment button handler |
| `placeholder` | `string` | `'Type a message...'` | Placeholder |
| `maxLength` | `number` | -- | Character limit (shows counter) |
| `disabled` | `boolean` | `false` | Disables input and send |
| `showAttachment` | `boolean` | `true` | Shows attachment button |

**Usage Example**
```tsx
<ChatInput
  value={message}
  onChangeText={setMessage}
  onSend={handleSend}
  onAttach={pickFile}
  maxLength={500}
/>
```

**Dos and Don'ts**
- Do place ChatInput at the bottom of the screen inside a KeyboardAvoidingWrapper.
- Do use `maxLength` for API-constrained message lengths.
- Don't set `showAttachment` to true without providing an `onAttach` handler.

---

### ChatTopBar

Conversation header for OG Assist chat with back button, avatar, title/subtitle, online indicator, and trailing actions.

**Import**
```tsx
import { ChatTopBar } from '@opengov/cds-patterns'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Header title (e.g., "OG Assist") |
| `subtitle` | `string` | -- | Subtitle (auto-generates from `online` if omitted) |
| `avatar` | `ReactNode` | -- | Avatar element with optional online dot |
| `onBack` | `() => void` | -- | Back button handler (hides button when omitted) |
| `trailingActions` | `ReactNode[]` | -- | Up to 2 trailing action elements |
| `online` | `boolean` | -- | Online presence indicator |

**Usage Example**
```tsx
<ChatTopBar
  title="OG Assist"
  avatar={<AiAvatar />}
  online
  onBack={goBack}
/>
```

---

### AiDisclaimer

AI-generated content disclaimer with inline or banner variant, icon, optional "Learn more" link, and dismissible option.

**Import**
```tsx
import { AiDisclaimer } from '@opengov/cds-patterns'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'inline' \| 'banner'` | `'inline'` | Visual layout |
| `dismissible` | `boolean` | `false` | Shows close button |
| `onDismiss` | `() => void` | -- | Dismiss handler |
| `onLearnMore` | `() => void` | -- | Learn more handler |
| `message` | `string` | Standard AI disclaimer text | Custom message |

**Usage Example**
```tsx
<AiDisclaimer dismissible onDismiss={hideDisclaimer} onLearnMore={showDetails} />
```

---

### FileCard

File attachment preview card with color-coded type icon, file info, progress bar, and download/delete actions.

**Import**
```tsx
import { FileCard } from '@opengov/cds-patterns'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `string` | **required** | File name text |
| `fileSize` | `string` | -- | Human-readable size (e.g., "2.4 MB") |
| `fileType` | `string` | -- | Extension or MIME type (e.g., "pdf") |
| `thumbnailUri` | `string` | -- | Image preview URI |
| `progress` | `number` | -- | Upload/download progress (0-100) |
| `onPress` | `() => void` | -- | Card body press handler |
| `onDelete` | `() => void` | -- | Delete action handler |
| `onDownload` | `() => void` | -- | Download action handler |

**Usage Example**
```tsx
<FileCard
  fileName="Building_Plans.pdf"
  fileSize="2.4 MB"
  fileType="pdf"
  onDownload={downloadFile}
  onDelete={removeFile}
/>
```

---

### PageHeader

Mobile page header with title, subtitle, breadcrumbs slot, actions slot, and three size variants.

**Import**
```tsx
import { PageHeader } from '@opengov/cds-patterns'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Page title |
| `subtitle` | `string` | -- | Description text |
| `breadcrumbs` | `ReactNode` | -- | Breadcrumbs slot above title |
| `actions` | `ReactNode` | -- | Action buttons |
| `variant` | `'standard' \| 'prominent' \| 'compact'` | `'standard'` | Size variant |
| `bordered` | `boolean` | `true` | Shows bottom border |

**Usage Example**
```tsx
<PageHeader
  title="Permit Applications"
  subtitle="Manage all active applications"
  variant="prominent"
  actions={<Button size="sm">New Application</Button>}
/>
```

---

### DateStatus

Date display with a colored semantic status indicator dot.

**Import**
```tsx
import { DateStatus } from '@opengov/cds-patterns'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `string` | **required** | Date string to display |
| `status` | `'neutral' \| 'positive' \| 'negative' \| 'warning' \| 'info'` | **required** | Semantic status |
| `label` | `string` | -- | Optional label above the date |
| `showDot` | `boolean` | `true` | Shows the colored dot |

**Usage Example**
```tsx
<DateStatus date="Mar 15, 2026" status="negative" label="Due date" />
<DateStatus date="2 days ago" status="positive" label="Last updated" />
```

---

### SelectMenu

Dropdown selection with trigger button and BottomSheet-style option list. Supports single/multi-select, search, and grouped options.

**Import**
```tsx
import { SelectMenu } from '@opengov/cds-patterns'
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectMenuOption[]` | **required** | Available options |
| `value` | `string \| string[]` | -- | Selected value(s) |
| `onSelect` | `(value: string) => void` | **required** | Selection handler |
| `placeholder` | `string` | `'Select an option'` | Trigger placeholder |
| `label` | `string` | -- | Label above the trigger |
| `error` | `boolean` | `false` | Error state |
| `errorText` | `string` | -- | Error message |
| `disabled` | `boolean` | `false` | Disables interaction |
| `multiple` | `boolean` | `false` | Multi-select mode |
| `searchable` | `boolean` | `false` | Enables search filter |
| `groups` | `SelectMenuOptionGroup[]` | -- | Option group definitions |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger size (36/44/52px) |

**SelectMenuOption shape:** `{ value: string; label: string; description?: string; icon?: ReactNode; disabled?: boolean; group?: string }`

**Usage Example**
```tsx
<SelectMenu
  label="Department"
  options={[
    { value: 'planning', label: 'Planning' },
    { value: 'public_works', label: 'Public Works' },
  ]}
  value={department}
  onSelect={setDepartment}
  searchable
/>
```

**Dos and Don'ts**
- Do use `searchable` when there are more than 10 options.
- Do use `groups` for categorized option lists.
- Don't use SelectMenu for 2-3 options -- use Radio or SegmentedControl instead.

**Accessibility**
- Trigger role is `"combobox"`. Option role is `"menuitem"`. Selected state is announced.

---

## 10. Design Tokens

**Package:** `@opengov/cds-tokens`

All tokens are exported as TypeScript constants with associated type definitions.

```tsx
import { colors, fontSize, space, radii, shadows, breakpoints, animations } from '@opengov/cds-tokens'
```

---

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#4B3FFF` | Brand primary / interactive elements |
| `primaryLight` | `#6E64FF` | Lighter brand accent |
| `primaryDark` | `#3329CC` | Darker brand accent |
| `neutral50` | `#FAFAFA` | Lightest background |
| `neutral100` | `#F5F5F5` | Card/field backgrounds |
| `neutral200` | `#EEEEEE` | Borders |
| `neutral300` | `#E0E0E0` | Dividers / track backgrounds |
| `neutral400` | `#BDBDBD` | Placeholders / disabled text |
| `neutral500` | `#9E9E9E` | Secondary text |
| `neutral700` | `#616161` | Body text |
| `neutral1000` | `#212121` | Primary text |
| `red500` | `#FF3333` | Error / destructive |
| `red600` | `#CC2929` | Error badge / dark error |
| `jade500` | `#4CAF50` | Success |
| `jade700` | `#388E3C` | Success text |
| `amber500` | `#FFC107` | Warning |
| `amber700` | `#FFA000` | Warning text |
| `ogBlue500` | `#1E55FF` | Info / secondary brand |

Full palette includes OG Blue, Red, Teal, Jade, Amber, Rose, Pear, Port scales and 18 data visualization series colors.

---

### Typography

**Font Sizes**

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 12px | Caption, minimum readable |
| `sm` | 14px | Body 3, secondary text |
| `md` | 16px | Body 2, default body |
| `lg` | 20px | Body 1, Heading 6 |
| `xl` | 24px | Heading 5 |
| `2xl` | 28px | Heading 4 |
| `3xl` | 32px | Heading 3 |
| `4xl` | 40px | Display 4 |
| `5xl` | 48px | Display 3 |
| `6xl` | 56px | Display 2 |
| `7xl` | 64px | Display 1 |

**Font Weights**

| Token | Value |
|-------|-------|
| `light` | 300 |
| `regular` | 400 |
| `medium` | 500 |
| `semibold` | 600 |
| `bold` | 700 |

**Letter Spacing**

| Token | Value |
|-------|-------|
| `tighter` | -0.5 |
| `tight` | -0.25 |
| `normal` | 0 |
| `wide` | 0.25 |
| `wider` | 0.5 |
| `widest` | 1.0 |

---

### Spacing

Based on a 4px grid. Use the token name prefixed with `$` in Tamagui props.

| Token | Value | Example usage |
|-------|-------|---------------|
| `0` | 0px | -- |
| `px` | 1px | Hairline border |
| `0.5` | 2px | Micro spacing |
| `1` | 4px | Tight spacing |
| `2` | 8px | Default gap |
| `3` | 12px | Field padding |
| `4` | 16px | Section padding |
| `5` | 20px | -- |
| `6` | 24px | Component margin |
| `8` | 32px | Section margin |
| `10` | 40px | -- |
| `12` | 48px | Large spacing |
| `16` | 64px | -- |
| `20` | 80px | -- |
| `24` | 96px | -- |
| `30` | 120px | Maximum spacing |

Negative spacing tokens (`-1` through `-30`) are available for negative margins.

---

### Radii

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0 | Square corners |
| `sm` | 2px | Subtle rounding |
| `md` | 4px | CDS default (buttons, inputs) |
| `lg` | 8px | Cards |
| `xl` | 12px | Segmented controls |
| `2xl` | 16px | Bottom sheet corners |
| `3xl` | 24px | Large rounded containers |
| `full` | 9999px | Pill / circle |

---

### Shadows

| Token | Elevation | Usage |
|-------|-----------|-------|
| `none` | 0 | No shadow |
| `sm` | 1 | Subtle lift (1px offset) |
| `md` | 3 | Cards, dropdowns (2px offset) |
| `lg` | 6 | Floating elements (4px offset) |
| `xl` | 12 | Modals (8px offset) |
| `softSelected` | 2 | Soft selection indicator |
| `hardSelected` | 1 | Hard selection indicator |

Each shadow token provides: `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`, and `elevation` (Android).

---

### Breakpoints

| Token | Value | Usage |
|-------|-------|-------|
| `phone` | 0px | Phone screens |
| `tabletSmall` | 600px | Small tablets |
| `tablet` | 768px | Standard tablets (Table component threshold) |
| `tabletLarge` | 1024px | Large tablets / landscape |

---

### Animations

| Token | Value | Usage |
|-------|-------|-------|
| `fast` | 150ms | Micro-interactions (focus, hover) |
| `normal` | 250ms | Standard transitions |
| `slow` | 350ms | Complex animations |
| `spring` | damping: 20, stiffness: 300, mass: 0.8 | Physical spring animation |
| `easeInOut` | timing, 250ms | Standard easing |
