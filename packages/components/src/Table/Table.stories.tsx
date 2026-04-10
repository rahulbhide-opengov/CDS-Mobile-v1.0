import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { Table, type TableProps, type TableColumn } from './Table'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Table> = {
  title: 'Advanced/Table',
  component: Table,
  argTypes: {
    striped: { control: 'boolean' },
    loading: { control: 'boolean' },
    emptyMessage: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Table>

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="h5" color="$colorSecondary">
      {children}
    </Text>
  )
}

// ---------------------------------------------------------------------------
// Shared data types and sample data
// ---------------------------------------------------------------------------

interface PermitRow {
  id: string
  address: string
  type: string
  status: string
  date: string
  value: string
}

const PERMIT_DATA: PermitRow[] = [
  { id: 'P-001', address: '142 Oak St', type: 'New Construction', status: 'Approved', date: 'Mar 15, 2026', value: '$450,000' },
  { id: 'P-002', address: '88 Pine Ave', type: 'Addition', status: 'Under Review', date: 'Mar 22, 2026', value: '$85,000' },
  { id: 'P-003', address: '310 Elm Dr', type: 'Renovation', status: 'Approved', date: 'Feb 28, 2026', value: '$120,000' },
  { id: 'P-004', address: '27 Maple Ln', type: 'Demolition', status: 'Pending', date: 'Apr 1, 2026', value: '$35,000' },
  { id: 'P-005', address: '501 Birch Ct', type: 'Commercial', status: 'Under Review', date: 'Apr 5, 2026', value: '$1,200,000' },
  { id: 'P-006', address: '73 Cedar Blvd', type: 'Residential', status: 'Approved', date: 'Jan 10, 2026', value: '$290,000' },
  { id: 'P-007', address: '195 Walnut Way', type: 'Addition', status: 'Denied', date: 'Feb 14, 2026', value: '$65,000' },
  { id: 'P-008', address: '422 Spruce Rd', type: 'New Construction', status: 'Pending', date: 'Apr 8, 2026', value: '$780,000' },
]

const BASIC_COLUMNS: TableColumn<PermitRow>[] = [
  { key: 'id', title: 'Permit #', width: 80 },
  { key: 'address', title: 'Address' },
  { key: 'type', title: 'Type' },
  { key: 'status', title: 'Status' },
  { key: 'date', title: 'Date' },
]

// ---------------------------------------------------------------------------
// 1. BasicTable
// ---------------------------------------------------------------------------

export const BasicTable: Story = {
  name: 'Basic Table',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Basic Table</SectionLabel>
      <Table
        columns={BASIC_COLUMNS}
        data={PERMIT_DATA}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. Sortable
// ---------------------------------------------------------------------------

function SortableDemo() {
  const [sortColumn, setSortColumn] = useState<string>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const sortableColumns: TableColumn<PermitRow>[] = [
    { key: 'id', title: 'Permit #', width: 80, sortable: true },
    { key: 'address', title: 'Address', sortable: true },
    { key: 'type', title: 'Type', sortable: true },
    { key: 'status', title: 'Status', sortable: true },
    { key: 'date', title: 'Date', sortable: true },
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedData = [...PERMIT_DATA].sort((a, b) => {
    const aVal = (a as any)[sortColumn] as string
    const bVal = (b as any)[sortColumn] as string
    const cmp = aVal.localeCompare(bVal)
    return sortDirection === 'asc' ? cmp : -cmp
  })

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Sortable Table</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Tap a column header to sort. Tap again to reverse direction.
      </Text>

      <Box padding="$2" borderRadius={4} backgroundColor="#F5F5F5">
        <Text variant="caption" color="$colorSecondary">
          Sorting by: {sortColumn} ({sortDirection})
        </Text>
      </Box>

      <Table
        columns={sortableColumns}
        data={sortedData}
        keyExtractor={(item) => item.id}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </VStack>
  )
}

export const Sortable: Story = {
  name: 'Sortable',
  render: () => <SortableDemo />,
}

// ---------------------------------------------------------------------------
// 3. Striped
// ---------------------------------------------------------------------------

export const Striped: Story = {
  name: 'Striped',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Striped Rows</SectionLabel>
      <Table
        columns={BASIC_COLUMNS}
        data={PERMIT_DATA}
        keyExtractor={(item) => item.id}
        striped
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. WithRowPress
// ---------------------------------------------------------------------------

function RowPressDemo() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Pressable Rows</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Tap a row to select it.
      </Text>

      {selected && (
        <Box padding="$3" borderRadius={8} backgroundColor="#EBF0FF">
          <Text variant="body3" color="#1E55FF">
            Selected: {selected}
          </Text>
        </Box>
      )}

      <Table
        columns={BASIC_COLUMNS}
        data={PERMIT_DATA}
        keyExtractor={(item) => item.id}
        onRowPress={(item) => setSelected(`${item.id} -- ${item.address}`)}
      />
    </VStack>
  )
}

export const WithRowPress: Story = {
  name: 'With Row Press',
  render: () => <RowPressDemo />,
}

// ---------------------------------------------------------------------------
// 5. Loading
// ---------------------------------------------------------------------------

export const Loading: Story = {
  name: 'Loading',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Loading Skeleton</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Shows animated shimmer rows while data is being fetched.
      </Text>
      <Table
        columns={BASIC_COLUMNS}
        data={[]}
        keyExtractor={(item) => item.id}
        loading
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. EmptyTable
// ---------------------------------------------------------------------------

export const EmptyTable: Story = {
  name: 'Empty Table',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Default Empty Message</SectionLabel>
      <Table
        columns={BASIC_COLUMNS}
        data={[]}
        keyExtractor={(item) => item.id}
      />

      <SectionLabel>Custom Empty Message</SectionLabel>
      <Table
        columns={BASIC_COLUMNS}
        data={[]}
        keyExtractor={(item) => item.id}
        emptyMessage="No permits found matching your search criteria."
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 7. WideTable
// ---------------------------------------------------------------------------

interface WideRow {
  id: string
  name: string
  department: string
  type: string
  status: string
  submittedDate: string
  reviewDate: string
  approver: string
  value: string
  district: string
}

const WIDE_COLUMNS: TableColumn<WideRow>[] = [
  { key: 'id', title: 'ID', width: 70 },
  { key: 'name', title: 'Project Name', width: 160 },
  { key: 'department', title: 'Department', width: 140 },
  { key: 'type', title: 'Type', width: 120 },
  { key: 'status', title: 'Status', width: 100 },
  { key: 'submittedDate', title: 'Submitted', width: 110 },
  { key: 'reviewDate', title: 'Review Date', width: 110 },
  { key: 'approver', title: 'Approver', width: 120 },
  { key: 'value', title: 'Est. Value', width: 100, align: 'right' },
  { key: 'district', title: 'District', width: 90 },
]

const WIDE_DATA: WideRow[] = [
  { id: 'W-001', name: 'Oak Street Renovation', department: 'Public Works', type: 'Construction', status: 'Active', submittedDate: 'Jan 15, 2026', reviewDate: 'Feb 1, 2026', approver: 'J. Martinez', value: '$2.1M', district: 'D-3' },
  { id: 'W-002', name: 'Cedar Park Expansion', department: 'Parks & Rec', type: 'Development', status: 'Pending', submittedDate: 'Feb 20, 2026', reviewDate: 'Mar 10, 2026', approver: 'S. Chen', value: '$850K', district: 'D-1' },
  { id: 'W-003', name: 'Downtown Fiber Install', department: 'IT', type: 'Infrastructure', status: 'Approved', submittedDate: 'Mar 5, 2026', reviewDate: 'Mar 25, 2026', approver: 'R. Patel', value: '$3.4M', district: 'D-5' },
  { id: 'W-004', name: 'Library HVAC Upgrade', department: 'Facilities', type: 'Maintenance', status: 'Active', submittedDate: 'Dec 10, 2025', reviewDate: 'Jan 8, 2026', approver: 'L. Thompson', value: '$425K', district: 'D-2' },
  { id: 'W-005', name: 'Waterfront Trail Phase 2', department: 'Parks & Rec', type: 'Development', status: 'Under Review', submittedDate: 'Apr 1, 2026', reviewDate: 'Apr 20, 2026', approver: 'M. Johnson', value: '$1.7M', district: 'D-4' },
]

export const WideTable: Story = {
  name: 'Wide Table (Many Columns)',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Wide Table with Horizontal Scroll</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        10 columns demonstrating horizontal scroll behavior on tablet and card layout on phone.
      </Text>
      <Table
        columns={WIDE_COLUMNS}
        data={WIDE_DATA}
        keyExtractor={(item) => item.id}
        striped
      />
    </VStack>
  ),
}
