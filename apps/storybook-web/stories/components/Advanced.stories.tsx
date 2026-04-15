import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DocPage, DocSection, DocShowcase, SpecTable, PropsTable,
  DoDont, DocDivider,
} from '../.shared/DocLayout'

// ---------------------------------------------------------------------------
// CDS 37 palette
// ---------------------------------------------------------------------------
const F = "'DM Sans', system-ui"
const M = "'DM Mono', 'SF Mono', monospace"
const C = {
  brand: '#4B3FFF', brandDark: '#19009B', brandLight: '#EEF1FC',
  error: '#D33423', success: '#037730', warning: '#885604',
  text: 'rgba(0,0,0,0.87)', textSec: 'rgba(0,0,0,0.6)', textDis: 'rgba(0,0,0,0.38)',
  border: '#DDDEDE', borderStrong: '#C8C9CA',
  bgSec: '#F8F8F8', gray100: '#F2F2F2', white: '#FFFFFF', slate: '#546574',
  // Data visualization palette
  viz1: '#4B3FFF', viz2: '#0E6F7F', viz3: '#037730', viz4: '#885604', viz5: '#D33423',
  viz1Light: 'rgba(75, 63, 255, 0.12)', viz2Light: 'rgba(14, 111, 127, 0.12)',
} as const

// ---------------------------------------------------------------------------
// Inline SVG icons (compact)
// ---------------------------------------------------------------------------
const Ico = {
  chevR: (s = 14, c: string = C.textSec) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chevD: (s = 14, c: string = C.textSec) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  file: (s = 14, c: string = C.slate) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={c} strokeWidth="2" strokeLinejoin="round"/><path d="M14 2v6h6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  folder: (s = 14, c: string = C.brand) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke={c} strokeWidth="2" strokeLinejoin="round"/></svg>,
  img: (s = 32) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}><rect x="3" y="3" width="18" height="18" rx="2" stroke={C.slate} strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" fill={C.slate}/><path d="M21 15l-5-5L5 21" stroke={C.slate} strokeWidth="1.5" strokeLinecap="round"/></svg>,
}

// ---------------------------------------------------------------------------
// Component replicas
// ---------------------------------------------------------------------------

/** TreeView */
function CdsTreeView() {
  const tree = [
    { label: 'src', icon: 'folder', open: true, children: [
      { label: 'components', icon: 'folder', open: true, children: [
        { label: 'Button.tsx', icon: 'file' },
        { label: 'Select.tsx', icon: 'file' },
        { label: 'Input.tsx', icon: 'file' },
      ]},
      { label: 'hooks', icon: 'folder', open: false, children: [
        { label: 'useTheme.ts', icon: 'file' },
      ]},
      { label: 'App.tsx', icon: 'file' },
    ]},
    { label: 'tests', icon: 'folder', open: false, children: [
      { label: 'Button.test.tsx', icon: 'file' },
    ]},
    { label: 'package.json', icon: 'file' },
  ]

  type Node = { label: string; icon: string; open?: boolean; children?: Node[] }

  const renderNode = (node: Node, depth: number): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0
    const isOpen = node.open
    return (
      <div key={node.label + depth}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 8px', paddingLeft: 8 + depth * 20,
          borderRadius: 4, cursor: hasChildren ? 'pointer' : 'default',
          fontFamily: F, fontSize: 13, color: C.text,
          backgroundColor: node.label === 'Button.tsx' ? C.brandLight : 'transparent',
        }}>
          {hasChildren ? (
            isOpen ? Ico.chevD(12, C.textSec) : Ico.chevR(12, C.textSec)
          ) : (
            <span style={{ width: 12 }} />
          )}
          {node.icon === 'folder' ? Ico.folder() : Ico.file()}
          <span style={{ fontWeight: node.label === 'Button.tsx' ? 600 : 400, color: node.label === 'Button.tsx' ? C.brand : C.text }}>{node.label}</span>
        </div>
        {hasChildren && isOpen && node.children!.map(child => renderNode(child, depth + 1))}
      </div>
    )
  }

  return (
    <div style={{ width: 260, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 4px', backgroundColor: C.white }}>
      {tree.map(node => renderNode(node, 0))}
    </div>
  )
}

/** Container */
function CdsContainer({ maxWidth = 960, label }: { maxWidth?: number; label?: string }) {
  return (
    <div style={{ border: `2px dashed ${C.border}`, borderRadius: 8, padding: 24, textAlign: 'center', backgroundColor: C.bgSec, width: '100%' }}>
      <div style={{
        maxWidth, margin: '0 auto', padding: 20, borderRadius: 8,
        border: `1px solid ${C.brand}33`, backgroundColor: C.white,
        fontFamily: F, fontSize: 13, color: C.textSec,
      }}>
        <div style={{ fontSize: 11, fontFamily: M, color: C.brand, fontWeight: 600, marginBottom: 4 }}>
          Container
        </div>
        <div style={{ fontFamily: M, fontSize: 12, color: C.textDis }}>
          maxWidth: {maxWidth}px
        </div>
        {label && <div style={{ marginTop: 8, fontSize: 13, color: C.textSec }}>{label}</div>}
      </div>
    </div>
  )
}

/** ImageList */
function CdsImageList({ cols = 2 }: { cols?: 2 | 3 }) {
  const items = cols === 2
    ? [{ w: 1, h: 1 }, { w: 1, h: 1.3 }, { w: 1, h: 0.8 }, { w: 1, h: 1 }]
    : [{ w: 1, h: 1 }, { w: 1, h: 1 }, { w: 1, h: 1 }, { w: 1, h: 1 }, { w: 1, h: 1 }, { w: 1, h: 1 }]
  const colors = [C.brandLight, '#F1FAFC', '#EFFDF1', '#FDF7F4', '#FCF7F7', C.gray100]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8, width: cols === 2 ? 280 : 320 }}>
      {items.map((item, i) => (
        <div key={i} style={{
          borderRadius: 8, backgroundColor: colors[i % colors.length],
          aspectRatio: `${item.w} / ${item.h}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${C.border}`,
          overflow: 'hidden',
        }}>
          {Ico.img()}
        </div>
      ))}
    </div>
  )
}

/** BarChart */
function CdsBarChart() {
  const data = [{l:'Q1',v:72},{l:'Q2',v:95},{l:'Q3',v:58},{l:'Q4',v:84},{l:'Q5',v:67}]
  const colors = [C.viz1, C.viz2, C.viz3, C.viz4, C.viz5]
  const max = Math.max(...data.map(d => d.v)), chartH = 160
  return (
    <div style={{ width: 340, fontFamily: F }}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: chartH, paddingRight: 8, width: 30 }}>
          {[100,75,50,25,0].map(v => <span key={v} style={{ fontSize: 10, fontFamily: M, color: C.textDis, textAlign: 'right' }}>{v}</span>)}
        </div>
        <div style={{ flex: 1, position: 'relative', height: chartH, borderLeft: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          {[0,25,50,75].map(v => <div key={v} style={{ position: 'absolute', left: 0, right: 0, bottom: `${v}%`, height: 1, borderBottom: `1px dashed ${C.border}` }} />)}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', height: '100%', padding: '0 8px', gap: 12, position: 'relative', zIndex: 1 }}>
            {data.map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 600, fontFamily: M, color: colors[i] }}>{d.v}</span>
                <div style={{ width: '100%', maxWidth: 36, height: `${(d.v/max)*100}%`, minHeight: 4, backgroundColor: colors[i], borderRadius: '4px 4px 0 0' }} />
              </div>))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingLeft: 38, marginTop: 6 }}>
        {data.map((d, i) => <span key={i} style={{ fontSize: 11, fontFamily: M, color: C.textSec, flex: 1, textAlign: 'center' }}>{d.l}</span>)}
      </div>
    </div>
  )
}

/** LineChart */
function CdsLineChart() {
  const dataset1 = [20, 45, 35, 70, 55, 82, 68]
  const dataset2 = [40, 30, 50, 38, 65, 48, 75]
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const max = 100
  const w = 340
  const h = 180
  const padL = 36
  const padR = 12
  const padT = 12
  const padB = 24
  const cw = w - padL - padR
  const ch = h - padT - padB

  const toX = (i: number) => padL + (i / (labels.length - 1)) * cw
  const toY = (v: number) => padT + ch - (v / max) * ch

  const pathD = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ')
  const fillD = (data: number[]) =>
    pathD(data) + ` L${toX(data.length - 1).toFixed(1)},${(padT + ch).toFixed(1)} L${padL},${(padT + ch).toFixed(1)} Z`

  return (
    <div style={{ fontFamily: F }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={padL} y1={toY(v)} x2={w - padR} y2={toY(v)} stroke={C.border} strokeWidth="1" strokeDasharray={v === 0 ? '' : '4 4'} />
            <text x={padL - 6} y={toY(v) + 4} textAnchor="end" fill={C.textDis} fontSize="10" fontFamily={M}>{v}</text>
          </g>
        ))}
        {/* X labels */}
        {labels.map((l, i) => (
          <text key={i} x={toX(i)} y={h - 4} textAnchor="middle" fill={C.textSec} fontSize="10" fontFamily={M}>{l}</text>
        ))}
        {/* Dataset 2 fill + line */}
        <path d={fillD(dataset2)} fill={C.viz2Light} />
        <path d={pathD(dataset2)} fill="none" stroke={C.viz2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dataset 1 fill + line */}
        <path d={fillD(dataset1)} fill={C.viz1Light} />
        <path d={pathD(dataset1)} fill="none" stroke={C.viz1} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dots - dataset 1 */}
        {dataset1.map((v, i) => (
          <circle key={`d1-${i}`} cx={toX(i)} cy={toY(v)} r={3.5} fill={C.white} stroke={C.viz1} strokeWidth="2" />
        ))}
        {/* Dots - dataset 2 */}
        {dataset2.map((v, i) => (
          <circle key={`d2-${i}`} cx={toX(i)} cy={toY(v)} r={3.5} fill={C.white} stroke={C.viz2} strokeWidth="2" />
        ))}
      </svg>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 20, marginTop: 8, paddingLeft: padL }}>
        {[{ label: 'Revenue', color: C.viz1 }, { label: 'Expenses', color: C.viz2 }].map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: F, color: C.textSec }}>
            <div style={{ width: 12, height: 3, borderRadius: 2, backgroundColor: s.color }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Storybook Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Components/Advanced',
  parameters: { layout: 'fullscreen' },
}
export default meta

// ---------------------------------------------------------------------------
// Overview Story
// ---------------------------------------------------------------------------

export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Advanced"
      description="Complex layout, hierarchical display, and data visualization components. Built with CDS 37 tokens for consistent theming across mobile and tablet breakpoints."
      badge="@opengov/cds-components"
      status="new"
    >

      <DocSection
        title="TreeView"
        description="Hierarchical expandable tree for displaying nested data structures with expand/collapse controls."
      >
        <DocShowcase
          label="File browser"
          preview={<CdsTreeView />}
          code={`<TreeView\n  data={[\n    { id: '1', label: 'src', children: [\n      { id: '2', label: 'components', children: [\n        { id: '3', label: 'Button.tsx' },\n        { id: '4', label: 'Select.tsx' },\n      ]},\n    ]},\n  ]}\n  onSelect={(node) => console.log(node)}\n  expandedIds={['1', '2']}\n/>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Token']}
              rows={[
                ['Row height', '32px', 'size.tree.row'],
                ['Indent per level', '20px', 'space.tree.indent'],
                ['Icon size', '14px', 'size.icon.sm'],
                ['Border radius', '8px (container)', 'radius.sm'],
                ['Selected bg', '#EEF1FC', 'color.brand.light'],
                ['Font size', '13px', 'font.body.sm'],
              ]}
            />
          }
        />

        <PropsTable props={[
          { name: 'data', type: 'TreeNode[]', description: 'Nested tree data structure', required: true },
          { name: 'expandedIds', type: 'string[]', description: 'Array of currently expanded node IDs' },
          { name: 'selectedId', type: 'string', description: 'Currently selected node ID' },
          { name: 'onSelect', type: '(node: TreeNode) => void', description: 'Node selection handler' },
          { name: 'onExpand', type: '(id: string, expanded: boolean) => void', description: 'Expand/collapse handler' },
          { name: 'renderIcon', type: '(node: TreeNode) => ReactNode', description: 'Custom icon renderer per node' },
          { name: 'indentPx', type: 'number', default: '20', description: 'Pixels of indent per nesting level' },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="Container"
        description="Responsive width wrapper that constrains content to a maximum width with centered alignment."
      >
        <DocShowcase
          label="Breakpoints"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <CdsContainer maxWidth={320} label="Mobile (sm)" />
              <CdsContainer maxWidth={600} label="Tablet (md)" />
              <CdsContainer maxWidth={960} label="Desktop (lg)" />
            </div>
          }
          code={`<Container maxWidth="sm">\n  <Text>Constrained to mobile width</Text>\n</Container>\n\n<Container maxWidth="md">\n  <Text>Constrained to tablet width</Text>\n</Container>\n\n<Container maxWidth="lg">\n  <Text>Constrained to desktop width</Text>\n</Container>`}
          specs={
            <SpecTable
              headers={['Breakpoint', 'Max Width', 'Token']}
              rows={[
                ['sm', '320px', 'breakpoint.sm'],
                ['md', '600px', 'breakpoint.md'],
                ['lg', '960px', 'breakpoint.lg'],
                ['xl', '1280px', 'breakpoint.xl'],
                ['fluid', '100%', 'n/a'],
              ]}
            />
          }
        />

        <PropsTable props={[
          { name: 'maxWidth', type: "'sm' | 'md' | 'lg' | 'xl' | 'fluid' | number", default: "'lg'", description: 'Maximum width constraint' },
          { name: 'centered', type: 'boolean', default: 'true', description: 'Center container horizontally' },
          { name: 'paddingX', type: 'number', default: '16', description: 'Horizontal padding in pixels' },
          { name: 'children', type: 'ReactNode', description: 'Content to constrain', required: true },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="ImageList"
        description="Responsive image grid with configurable column count, aspect ratios, and gap spacing."
      >
        <DocShowcase
          label="Column layouts"
          preview={
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, fontFamily: M, color: C.textDis, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>2-Column</div>
                <CdsImageList cols={2} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, fontFamily: M, color: C.textDis, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>3-Column</div>
                <CdsImageList cols={3} />
              </div>
            </div>
          }
          code={`<ImageList\n  cols={2}\n  gap={8}\n  items={[\n    { uri: 'https://example.com/img1.jpg', alt: 'Photo 1' },\n    { uri: 'https://example.com/img2.jpg', alt: 'Photo 2' },\n  ]}\n  onPress={(item) => openViewer(item)}\n/>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Token']}
              rows={[
                ['Gap', '8px', 'space.sm'],
                ['Border radius', '8px', 'radius.sm'],
                ['Placeholder bg', 'token-based', 'color.surface.secondary'],
                ['Columns (mobile)', '2', 'layout.grid.sm'],
                ['Columns (tablet)', '3', 'layout.grid.md'],
              ]}
            />
          }
        />

        <PropsTable props={[
          { name: 'items', type: 'ImageItem[]', description: 'Array of image data objects', required: true },
          { name: 'cols', type: 'number', default: '2', description: 'Number of grid columns' },
          { name: 'gap', type: 'number', default: '8', description: 'Gap between items in pixels' },
          { name: 'aspectRatio', type: 'number', description: 'Force aspect ratio on all items' },
          { name: 'onPress', type: '(item: ImageItem) => void', description: 'Image tap handler' },
          { name: 'borderRadius', type: 'number', default: '8', description: 'Corner radius per image' },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="BarChart"
        description="Vertical bar chart with CDS data visualization colors, grid lines, and value labels."
      >
        <DocShowcase
          label="Quarterly data"
          preview={<CdsBarChart />}
          code={`<BarChart\n  data={[\n    { label: 'Q1', value: 72, color: '$viz1' },\n    { label: 'Q2', value: 95, color: '$viz2' },\n    { label: 'Q3', value: 58, color: '$viz3' },\n    { label: 'Q4', value: 84, color: '$viz4' },\n    { label: 'Q5', value: 67, color: '$viz5' },\n  ]}\n  yAxisMax={100}\n  showGrid\n  showValues\n/>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Token']}
              rows={[
                ['Bar max width', '36px', 'size.chart.bar'],
                ['Bar radius', '4px (top)', 'radius.xs'],
                ['Grid line', 'dashed, 1px', 'border.dashed'],
                ['Value font', 'DM Mono 11px', 'font.mono.sm'],
                ['Color 1', '#4B3FFF', 'color.viz.1'],
                ['Color 2', '#0E6F7F', 'color.viz.2'],
                ['Color 3', '#037730', 'color.viz.3'],
                ['Color 4', '#885604', 'color.viz.4'],
                ['Color 5', '#D33423', 'color.viz.5'],
              ]}
            />
          }
        />

        <PropsTable props={[
          { name: 'data', type: 'BarDataPoint[]', description: 'Array of data points with labels and values', required: true },
          { name: 'yAxisMax', type: 'number', description: 'Maximum Y-axis value; auto-calculated if omitted' },
          { name: 'showGrid', type: 'boolean', default: 'true', description: 'Show horizontal grid lines' },
          { name: 'showValues', type: 'boolean', default: 'true', description: 'Show value labels above bars' },
          { name: 'height', type: 'number', default: '160', description: 'Chart area height in pixels' },
          { name: 'onPress', type: '(point: BarDataPoint) => void', description: 'Bar tap handler' },
          { name: 'animate', type: 'boolean', default: 'true', description: 'Animate bars on mount' },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="LineChart"
        description="Multi-dataset line chart with area fill, data point dots, and interactive legend."
      >
        <DocShowcase
          label="Two datasets"
          preview={<CdsLineChart />}
          code={`<LineChart\n  datasets={[\n    { label: 'Revenue', data: [20, 45, 35, 70, 55, 82, 68], color: '$viz1' },\n    { label: 'Expenses', data: [40, 30, 50, 38, 65, 48, 75], color: '$viz2' },\n  ]}\n  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}\n  showDots\n  showFill\n  yAxisMax={100}\n/>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Token']}
              rows={[
                ['Line width', '2px', 'size.chart.line'],
                ['Dot radius', '3.5px', 'size.chart.dot'],
                ['Dot stroke', '2px white', 'color.surface'],
                ['Fill opacity', '12%', 'opacity.chart.fill'],
                ['Grid line', 'dashed, 1px', 'border.dashed'],
                ['Legend dot', '12 x 3px', 'size.chart.legend'],
              ]}
            />
          }
        />

        <PropsTable props={[
          { name: 'datasets', type: 'LineDataset[]', description: 'Array of datasets with label, data, and color', required: true },
          { name: 'labels', type: 'string[]', description: 'X-axis labels', required: true },
          { name: 'yAxisMax', type: 'number', description: 'Maximum Y-axis value; auto-calculated if omitted' },
          { name: 'showDots', type: 'boolean', default: 'true', description: 'Show data point circles' },
          { name: 'showFill', type: 'boolean', default: 'true', description: 'Show area fill below lines' },
          { name: 'showGrid', type: 'boolean', default: 'true', description: 'Show horizontal grid lines' },
          { name: 'height', type: 'number', default: '180', description: 'Chart height in pixels' },
          { name: 'onPress', type: '(point: DataPoint) => void', description: 'Data point tap handler' },
          { name: 'animate', type: 'boolean', default: 'true', description: 'Animate lines on mount' },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="Usage Guidelines"
        description="Best practices for advanced layout and visualization components."
      >
        <DoDont
          dos={[
            'Use TreeView for genuinely hierarchical data (files, org charts)',
            'Wrap page content in Container for consistent max-widths',
            'Use the CDS data viz color palette for all chart colors',
            'Provide onPress handlers on chart data points for drill-down',
            'Use ImageList cols={2} on mobile, cols={3} on tablet',
          ]}
          donts={[
            'Nest TreeView beyond 4-5 levels on mobile screens',
            'Use Container with fixed pixel widths that break on small screens',
            'Mix custom hex colors with the CDS viz palette in charts',
            'Render more than 10 bars in a BarChart on mobile viewports',
            'Omit alt text on ImageList items',
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
