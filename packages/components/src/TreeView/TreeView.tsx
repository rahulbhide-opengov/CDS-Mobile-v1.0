/**
 * TreeView -- CDS 37 Figma-accurate implementation
 *
 * Hierarchical expandable tree for navigation and selection.
 *
 * Features:
 *   - Recursive tree rendering with configurable indent (24px per level)
 *   - Expand/collapse with animated chevron rotation (90deg)
 *   - Single or multi-select via selected prop
 *   - Optional connector lines (vertical + horizontal, 1px gray300)
 *   - Accessible: role="list", items are "button" with expanded state
 *   - LayoutAnimation for expand/collapse transitions
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable as RNPressable,
  UIManager,
  View,
} from 'react-native'
import { Text as TamaguiText } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NODE_HEIGHT = 40
const INDENT_PER_LEVEL = 24
const CHEVRON_SIZE = 20
const ICON_SIZE = 20
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38
const CONNECTOR_WIDTH = 1

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TreeNode {
  /** Unique identifier for this node */
  id: string
  /** Display label for this node */
  label: string
  /** Optional icon element rendered before the label */
  icon?: React.ReactNode
  /** Child nodes -- presence indicates this is a branch node */
  children?: TreeNode[]
  /** Whether this node is disabled */
  disabled?: boolean
}

export interface TreeViewProps {
  /** Hierarchical tree data */
  data: TreeNode[]
  /** Called when a leaf node (or any node) is pressed */
  onNodePress?: (node: TreeNode) => void
  /** Called when a branch node is expanded or collapsed */
  onNodeToggle?: (node: TreeNode, expanded: boolean) => void
  /** Enable multi-select mode. When false, only one node can be selected. */
  multiSelect?: boolean
  /** Array of node IDs that are expanded by default */
  defaultExpanded?: string[]
  /** Array of currently selected node IDs (controlled) */
  selected?: string[]
  /** Show connector lines between parent and child nodes */
  showConnectors?: boolean
  /** Accessibility label for the tree container */
  accessibilityLabel?: string
  /** Test ID for testing */
  testID?: string
}

// ---------------------------------------------------------------------------
// Chevron icon with animated rotation
// ---------------------------------------------------------------------------

function AnimatedChevron({ expanded, color }: { expanded: boolean; color: string }) {
  const rotateAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [expanded, rotateAnim])

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  })

  return (
    <Animated.View
      style={{
        width: CHEVRON_SIZE,
        height: CHEVRON_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: rotation }],
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
          marginLeft: -2,
        }}
      />
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// TreeNodeRow component
// ---------------------------------------------------------------------------

interface TreeNodeRowProps {
  node: TreeNode
  level: number
  isExpanded: boolean
  isSelected: boolean
  hasChildren: boolean
  showConnectors: boolean
  isLastChild: boolean
  onPress: () => void
  onToggle: () => void
}

const TreeNodeRow = React.memo(function TreeNodeRow({
  node,
  level,
  isExpanded,
  isSelected,
  hasChildren,
  showConnectors,
  isLastChild,
  onPress,
  onToggle,
}: TreeNodeRowProps) {
  const [isPressed, setIsPressed] = useState(false)
  const indent = level * INDENT_PER_LEVEL

  const backgroundColor = isSelected
    ? primitive.blurple50
    : isPressed
      ? primitive.gray50
      : 'transparent'

  const textColor = isSelected ? primitive.blurple700 : primitive.slate900
  const iconColor = isSelected ? primitive.blurple700 : primitive.slate700
  const chevronColor = node.disabled ? primitive.gray400 : primitive.slate700

  return (
    <View style={{ opacity: node.disabled ? DISABLED_OPACITY : 1 }}>
      {/* Connector lines */}
      {showConnectors && level > 0 && (
        <>
          {/* Vertical connector from parent */}
          <View
            style={{
              position: 'absolute',
              left: indent - INDENT_PER_LEVEL + CHEVRON_SIZE / 2,
              top: 0,
              bottom: isLastChild ? NODE_HEIGHT / 2 : 0,
              width: CONNECTOR_WIDTH,
              backgroundColor: primitive.gray300,
            }}
          />
          {/* Horizontal connector to this node */}
          <View
            style={{
              position: 'absolute',
              left: indent - INDENT_PER_LEVEL + CHEVRON_SIZE / 2,
              top: NODE_HEIGHT / 2,
              width: INDENT_PER_LEVEL - CHEVRON_SIZE / 2,
              height: CONNECTOR_WIDTH,
              backgroundColor: primitive.gray300,
            }}
          />
        </>
      )}

      <RNPressable
        onPress={() => {
          if (node.disabled) return
          if (hasChildren) {
            onToggle()
          }
          onPress()
        }}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        disabled={node.disabled}
        accessibilityRole="button"
        accessibilityLabel={node.label}
        accessibilityState={{
          selected: isSelected,
          expanded: hasChildren ? isExpanded : undefined,
          disabled: node.disabled,
        }}
        accessibilityHint={
          hasChildren
            ? isExpanded
              ? 'Double-tap to collapse'
              : 'Double-tap to expand'
            : undefined
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: NODE_HEIGHT,
          paddingLeft: indent,
          paddingRight: 12,
          backgroundColor,
        }}
      >
        {/* Chevron (only for branch nodes) */}
        {hasChildren ? (
          <AnimatedChevron expanded={isExpanded} color={chevronColor} />
        ) : (
          <View style={{ width: CHEVRON_SIZE }} />
        )}

        {/* Icon */}
        {node.icon != null && (
          <View
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              marginLeft: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Clone icon with color if it accepts a color prop, otherwise render as-is */}
            {React.isValidElement(node.icon)
              ? React.cloneElement(node.icon as React.ReactElement<{ color?: string }>, {
                  color: iconColor,
                })
              : node.icon}
          </View>
        )}

        {/* Label */}
        <TamaguiText
          fontSize={14}
          fontWeight={isSelected ? '500' : '400'}
          lineHeight={18}
          letterSpacing={0.17}
          color={textColor}
          marginLeft={8}
          numberOfLines={1}
          flex={1}
        >
          {node.label}
        </TamaguiText>
      </RNPressable>
    </View>
  )
})

// ---------------------------------------------------------------------------
// Recursive tree renderer
// ---------------------------------------------------------------------------

interface TreeBranchProps {
  nodes: TreeNode[]
  level: number
  expandedSet: Set<string>
  selectedSet: Set<string>
  showConnectors: boolean
  onNodePress: (node: TreeNode) => void
  onNodeToggle: (node: TreeNode) => void
}

function TreeBranch({
  nodes,
  level,
  expandedSet,
  selectedSet,
  showConnectors,
  onNodePress,
  onNodeToggle,
}: TreeBranchProps) {
  return (
    <>
      {nodes.map((node, index) => {
        const hasChildren = node.children != null && node.children.length > 0
        const isExpanded = expandedSet.has(node.id)
        const isSelected = selectedSet.has(node.id)
        const isLastChild = index === nodes.length - 1

        return (
          <React.Fragment key={node.id}>
            <TreeNodeRow
              node={node}
              level={level}
              isExpanded={isExpanded}
              isSelected={isSelected}
              hasChildren={hasChildren}
              showConnectors={showConnectors}
              isLastChild={isLastChild}
              onPress={() => onNodePress(node)}
              onToggle={() => onNodeToggle(node)}
            />
            {hasChildren && isExpanded && (
              <TreeBranch
                nodes={node.children!}
                level={level + 1}
                expandedSet={expandedSet}
                selectedSet={selectedSet}
                showConnectors={showConnectors}
                onNodePress={onNodePress}
                onNodeToggle={onNodeToggle}
              />
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

// ---------------------------------------------------------------------------
// TreeView component
// ---------------------------------------------------------------------------

export const TreeView = React.memo(function TreeView({
  data,
  onNodePress,
  onNodeToggle,
  multiSelect = false,
  defaultExpanded,
  selected,
  showConnectors = false,
  accessibilityLabel,
  testID,
}: TreeViewProps) {
  // ---- Expanded state (internal, uncontrolled) ----------------------------
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpanded ?? []),
  )

  // ---- Selected set (controlled) ------------------------------------------
  const selectedSet = useMemo(() => new Set(selected ?? []), [selected])

  // ---- Handlers -----------------------------------------------------------
  const handleNodePress = useCallback(
    (node: TreeNode) => {
      if (node.disabled) return
      onNodePress?.(node)
    },
    [onNodePress],
  )

  const handleNodeToggle = useCallback(
    (node: TreeNode) => {
      if (node.disabled) return

      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity,
        ),
      )

      setExpandedIds((prev) => {
        const next = new Set(prev)
        const willExpand = !next.has(node.id)
        if (willExpand) {
          next.add(node.id)
        } else {
          next.delete(node.id)
        }
        onNodeToggle?.(node, willExpand)
        return next
      })
    },
    [onNodeToggle],
  )

  // ---- Render --------------------------------------------------------------
  return (
    <View
      accessibilityRole="list"
      accessibilityLabel={accessibilityLabel ?? 'Tree view'}
      testID={testID}
    >
      <TreeBranch
        nodes={data}
        level={0}
        expandedSet={expandedIds}
        selectedSet={selectedSet}
        showConnectors={showConnectors}
        onNodePress={handleNodePress}
        onNodeToggle={handleNodeToggle}
      />
    </View>
  )
})

TreeView.displayName = 'TreeView'
