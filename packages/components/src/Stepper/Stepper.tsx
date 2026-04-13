/**
 * Stepper -- CDS 37 step progress indicator
 *
 * Displays a series of steps with circles, connectors, labels, and optional
 * descriptions. Supports horizontal and vertical orientations, with a compact
 * variant that hides labels for space-constrained layouts.
 *
 * Features:
 *   - Completed steps: blurple700 fill, white check icon
 *   - Active step: blurple700 border (2px), blurple700 number
 *   - Upcoming steps: gray400 border, gray500 number
 *   - Connector line changes color on completion (gray400 -> blurple700)
 *   - Compact variant hides labels/descriptions
 *   - Disabled steps at 38% opacity
 *   - Full accessibility: step state announcements
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useMemo } from 'react'
import { styled, Stack, Text as TamaguiText } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'
import Svg, { Path } from 'react-native-svg'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Step circle diameter */
const CIRCLE_SIZE = 24

/** Connector line thickness */
const CONNECTOR_THICKNESS = 1

/** CDS 37: disabled state uses 38% opacity */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StepDef {
  /** Label text for this step. */
  label: string
  /** Optional description text below the label. */
  description?: string
  /** Optional custom icon to display instead of the step number. */
  icon?: React.ReactNode
  /** Whether this step is disabled. */
  disabled?: boolean
}

export type StepperOrientation = 'horizontal' | 'vertical'
export type StepperVariant = 'standard' | 'compact'

export interface StepperProps {
  /** Array of step definitions. */
  steps: StepDef[]
  /** The index of the currently active step (0-indexed). */
  activeStep: number
  /** Layout orientation. Defaults to "horizontal". */
  orientation?: StepperOrientation
  /** Display variant. Compact hides labels and descriptions. Defaults to "standard". */
  variant?: StepperVariant
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Additional test ID. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Check icon for completed steps
// ---------------------------------------------------------------------------

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
        fill={primitive.white}
      />
    </Svg>
  )
}

// ---------------------------------------------------------------------------
// Step circle
// ---------------------------------------------------------------------------

const StepCircle = styled(Stack, {
  name: 'StepCircle',
  width: CIRCLE_SIZE,
  height: CIRCLE_SIZE,
  borderRadius: CIRCLE_SIZE / 2,
  alignItems: 'center',
  justifyContent: 'center',
  // Prevent shrinking in flex layouts
  flexShrink: 0,

  variants: {
    state: {
      completed: {
        backgroundColor: primitive.blurple700,
        borderWidth: 0,
      },
      active: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: primitive.blurple700,
      },
      upcoming: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: primitive.gray400,
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Step number text
// ---------------------------------------------------------------------------

const StepNumber = styled(TamaguiText, {
  name: 'StepNumber',
  fontFamily: '$body',
  fontSize: 11,
  lineHeight: 14,
  fontWeight: '500',
  userSelect: 'none',

  variants: {
    state: {
      completed: {
        color: primitive.white,
      },
      active: {
        color: primitive.blurple700,
      },
      upcoming: {
        color: primitive.gray500,
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Step label text
// ---------------------------------------------------------------------------

const StepLabel = styled(TamaguiText, {
  name: 'StepLabel',
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 20,

  variants: {
    state: {
      completed: {
        fontWeight: '400',
        color: primitive.slate700,
      },
      active: {
        fontWeight: '500',
        color: primitive.slate700,
      },
      upcoming: {
        fontWeight: '400',
        color: primitive.gray500,
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Step description text
// ---------------------------------------------------------------------------

const StepDescription = styled(TamaguiText, {
  name: 'StepDescription',
  fontFamily: '$body',
  fontSize: 12,
  lineHeight: 16,
  fontWeight: '400',
  color: primitive.gray500,
})

// ---------------------------------------------------------------------------
// Internal helper -- determine step state
// ---------------------------------------------------------------------------

type StepState = 'completed' | 'active' | 'upcoming'

function getStepState(stepIndex: number, activeStep: number): StepState {
  if (stepIndex < activeStep) return 'completed'
  if (stepIndex === activeStep) return 'active'
  return 'upcoming'
}

// ---------------------------------------------------------------------------
// Horizontal connector
// ---------------------------------------------------------------------------

function HorizontalConnector({ completed }: { completed: boolean }) {
  return (
    <Stack
      flex={1}
      height={CONNECTOR_THICKNESS}
      backgroundColor={completed ? primitive.blurple700 : primitive.gray400}
      marginHorizontal={8}
      alignSelf="center"
    />
  )
}

// ---------------------------------------------------------------------------
// Vertical connector
// ---------------------------------------------------------------------------

function VerticalConnector({ completed }: { completed: boolean }) {
  return (
    <Stack
      width={CONNECTOR_THICKNESS}
      flex={1}
      minHeight={24}
      backgroundColor={completed ? primitive.blurple700 : primitive.gray400}
      marginLeft={CIRCLE_SIZE / 2 - CONNECTOR_THICKNESS / 2}
      marginVertical={4}
    />
  )
}

// ---------------------------------------------------------------------------
// Single step -- horizontal layout
// ---------------------------------------------------------------------------

function HorizontalStep({
  step,
  index,
  state,
  isLast,
  showLabel,
  testID,
}: {
  step: StepDef
  index: number
  state: StepState
  isLast: boolean
  showLabel: boolean
  testID?: string
}) {
  const a11yLabel = useMemo(() => {
    const stateLabel = state === 'completed' ? 'Completed' : state === 'active' ? 'Current' : 'Upcoming'
    return `Step ${index + 1}: ${step.label}, ${stateLabel}`
  }, [step.label, index, state])

  return (
    <Stack
      flex={1}
      flexDirection="row"
      alignItems="center"
      opacity={step.disabled ? DISABLED_OPACITY : 1}
      testID={testID}
    >
      {/* Step circle + label column */}
      <Stack alignItems="center" gap={4}>
        <StepCircle
          state={state}
          accessibilityRole="text"
          accessibilityLabel={a11yLabel}
        >
          {state === 'completed' ? (
            step.icon ?? <CheckIcon />
          ) : (
            step.icon ?? <StepNumber state={state}>{String(index + 1)}</StepNumber>
          )}
        </StepCircle>

        {showLabel && (
          <Stack alignItems="center" maxWidth={80}>
            <StepLabel state={state} textAlign="center" numberOfLines={2}>
              {step.label}
            </StepLabel>
            {step.description != null && (
              <StepDescription textAlign="center" numberOfLines={1}>
                {step.description}
              </StepDescription>
            )}
          </Stack>
        )}
      </Stack>

      {/* Connector to next step */}
      {!isLast && (
        <HorizontalConnector completed={state === 'completed'} />
      )}
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Single step -- vertical layout
// ---------------------------------------------------------------------------

function VerticalStep({
  step,
  index,
  state,
  isLast,
  showLabel,
  testID,
}: {
  step: StepDef
  index: number
  state: StepState
  isLast: boolean
  showLabel: boolean
  testID?: string
}) {
  const a11yLabel = useMemo(() => {
    const stateLabel = state === 'completed' ? 'Completed' : state === 'active' ? 'Current' : 'Upcoming'
    return `Step ${index + 1}: ${step.label}, ${stateLabel}`
  }, [step.label, index, state])

  return (
    <Stack
      opacity={step.disabled ? DISABLED_OPACITY : 1}
      testID={testID}
    >
      {/* Circle + label row */}
      <Stack flexDirection="row" alignItems="center" gap={12}>
        <StepCircle
          state={state}
          accessibilityRole="text"
          accessibilityLabel={a11yLabel}
        >
          {state === 'completed' ? (
            step.icon ?? <CheckIcon />
          ) : (
            step.icon ?? <StepNumber state={state}>{String(index + 1)}</StepNumber>
          )}
        </StepCircle>

        {showLabel && (
          <Stack flex={1}>
            <StepLabel state={state} numberOfLines={1}>
              {step.label}
            </StepLabel>
            {step.description != null && (
              <StepDescription numberOfLines={2} marginTop={2}>
                {step.description}
              </StepDescription>
            )}
          </Stack>
        )}
      </Stack>

      {/* Vertical connector to next step */}
      {!isLast && (
        <VerticalConnector completed={state === 'completed'} />
      )}
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Stepper component
// ---------------------------------------------------------------------------

export const Stepper = React.memo(function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  variant = 'standard',
  accessibilityLabel,
  testID,
}: StepperProps) {
  const showLabels = variant === 'standard'
  const isHorizontal = orientation === 'horizontal'

  const a11yLabel = accessibilityLabel ?? `Step ${activeStep + 1} of ${steps.length}`

  if (steps.length === 0) {
    return null
  }

  return (
    <Stack
      flexDirection={isHorizontal ? 'row' : 'column'}
      alignItems={isHorizontal ? 'flex-start' : 'stretch'}
      accessibilityRole="progressbar"
      accessibilityLabel={a11yLabel}
      accessibilityValue={{
        min: 1,
        max: steps.length,
        now: activeStep + 1,
      }}
      testID={testID}
    >
      {steps.map((step, index) => {
        const state = getStepState(index, activeStep)
        const isLast = index === steps.length - 1
        const itemTestID = testID ? `${testID}-step-${index}` : undefined

        if (isHorizontal) {
          return (
            <HorizontalStep
              key={index}
              step={step}
              index={index}
              state={state}
              isLast={isLast}
              showLabel={showLabels}
              testID={itemTestID}
            />
          )
        }

        return (
          <VerticalStep
            key={index}
            step={step}
            index={index}
            state={state}
            isLast={isLast}
            showLabel={showLabels}
            testID={itemTestID}
          />
        )
      })}
    </Stack>
  )
})

Stepper.displayName = 'Stepper'
