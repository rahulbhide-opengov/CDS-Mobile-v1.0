import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { FileCard, type FileCardProps } from './FileCard'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof FileCard> = {
  title: 'Patterns/FileCard',
  component: FileCard,
  argTypes: {
    fileName: { control: 'text' },
    fileSize: { control: 'text' },
    fileType: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
}

export default meta
type Story = StoryObj<typeof FileCard>

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
// 1. DocumentFile
// ---------------------------------------------------------------------------

export const DocumentFile: Story = {
  name: 'Document File',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>PDF Document</SectionLabel>
      <FileCard
        fileName="Q4_Budget_Report_2025.pdf"
        fileSize="2.4 MB"
        fileType="pdf"
        onPress={() => {}}
        onDownload={() => {}}
      />

      <SectionLabel>Word Document</SectionLabel>
      <FileCard
        fileName="Meeting_Minutes_March.docx"
        fileSize="156 KB"
        fileType="docx"
        onPress={() => {}}
        onDownload={() => {}}
      />

      <SectionLabel>Text File</SectionLabel>
      <FileCard
        fileName="notes.txt"
        fileSize="4 KB"
        fileType="txt"
        onPress={() => {}}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. ImageWithThumbnail
// ---------------------------------------------------------------------------

export const ImageWithThumbnail: Story = {
  name: 'Image with Thumbnail',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Image with Thumbnail Preview</SectionLabel>
      <FileCard
        fileName="site_photo_001.jpg"
        fileSize="3.1 MB"
        fileType="jpg"
        thumbnailUri="https://picsum.photos/200"
        onPress={() => {}}
        onDownload={() => {}}
      />

      <SectionLabel>PNG Image with Thumbnail</SectionLabel>
      <FileCard
        fileName="floor_plan_v2.png"
        fileSize="1.8 MB"
        fileType="png"
        thumbnailUri="https://picsum.photos/201"
        onPress={() => {}}
        onDownload={() => {}}
        onDelete={() => {}}
      />

      <SectionLabel>Image without Thumbnail (type icon fallback)</SectionLabel>
      <FileCard
        fileName="diagram.svg"
        fileSize="42 KB"
        fileType="svg"
        onPress={() => {}}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. SpreadsheetFile
// ---------------------------------------------------------------------------

export const SpreadsheetFile: Story = {
  name: 'Spreadsheet File',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Excel Spreadsheet</SectionLabel>
      <FileCard
        fileName="Revenue_Analysis_FY26.xlsx"
        fileSize="845 KB"
        fileType="xlsx"
        onPress={() => {}}
        onDownload={() => {}}
      />

      <SectionLabel>CSV File</SectionLabel>
      <FileCard
        fileName="permit_export_2026-04-10.csv"
        fileSize="128 KB"
        fileType="csv"
        onPress={() => {}}
        onDownload={() => {}}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. UploadingWithProgress
// ---------------------------------------------------------------------------

function UploadProgressDemo() {
  const [progress, setProgress] = useState(35)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Upload in Progress</SectionLabel>
      <FileCard
        fileName="annual_report_2025.pdf"
        fileSize="12.4 MB"
        fileType="pdf"
        progress={progress}
      />

      <SectionLabel>Progress Controls</SectionLabel>
      <HStack gap="$2" flexWrap="wrap">
        {[0, 25, 50, 75, 100].map((p) => (
          <Box
            key={p}
            paddingHorizontal="$3"
            paddingVertical="$2"
            borderRadius={8}
            backgroundColor={progress === p ? '#EBF0FF' : '#F5F5F5'}
            onPress={() => setProgress(p)}
          >
            <Text
              variant="body3"
              color={progress === p ? '#1E55FF' : '#616161'}
              fontWeight={progress === p ? '$semibold' : '$regular'}
            >
              {p}%
            </Text>
          </Box>
        ))}
      </HStack>

      <SectionLabel>Various Progress States</SectionLabel>
      <FileCard
        fileName="starting_upload.docx"
        fileSize="2.1 MB"
        fileType="docx"
        progress={0}
      />
      <FileCard
        fileName="halfway_done.xlsx"
        fileSize="4.7 MB"
        fileType="xlsx"
        progress={50}
      />
      <FileCard
        fileName="almost_complete.pdf"
        fileSize="8.3 MB"
        fileType="pdf"
        progress={95}
      />
    </VStack>
  )
}

export const UploadingWithProgress: Story = {
  name: 'Uploading with Progress',
  render: () => <UploadProgressDemo />,
}

// ---------------------------------------------------------------------------
// 5. WithActions
// ---------------------------------------------------------------------------

function ActionsDemo() {
  const [lastAction, setLastAction] = useState('')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Download Only</SectionLabel>
      <FileCard
        fileName="report_final.pdf"
        fileSize="5.2 MB"
        fileType="pdf"
        onPress={() => setLastAction('Opened report_final.pdf')}
        onDownload={() => setLastAction('Download: report_final.pdf')}
      />

      <SectionLabel>Delete Only</SectionLabel>
      <FileCard
        fileName="draft_v1.docx"
        fileSize="340 KB"
        fileType="docx"
        onPress={() => setLastAction('Opened draft_v1.docx')}
        onDelete={() => setLastAction('Delete: draft_v1.docx')}
      />

      <SectionLabel>Both Actions</SectionLabel>
      <FileCard
        fileName="budget_summary.xlsx"
        fileSize="1.1 MB"
        fileType="xlsx"
        onPress={() => setLastAction('Opened budget_summary.xlsx')}
        onDownload={() => setLastAction('Download: budget_summary.xlsx')}
        onDelete={() => setLastAction('Delete: budget_summary.xlsx')}
      />

      {lastAction !== '' && (
        <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9">
          <Text variant="body3" color="#388E3C">
            {lastAction}
          </Text>
        </Box>
      )}
    </VStack>
  )
}

export const WithActions: Story = {
  name: 'With Actions',
  render: () => <ActionsDemo />,
}

// ---------------------------------------------------------------------------
// 6. AllFileTypes
// ---------------------------------------------------------------------------

export const AllFileTypes: Story = {
  name: 'All File Types',
  render: () => (
    <VStack gap="$3" padding="$4">
      <SectionLabel>All Supported File Categories</SectionLabel>

      <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
        Documents
      </Text>
      <FileCard fileName="proposal.pdf" fileSize="1.2 MB" fileType="pdf" onPress={() => {}} />
      <FileCard fileName="letter.docx" fileSize="89 KB" fileType="docx" onPress={() => {}} />

      <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
        Spreadsheets
      </Text>
      <FileCard fileName="finances.xlsx" fileSize="420 KB" fileType="xlsx" onPress={() => {}} />
      <FileCard fileName="data_export.csv" fileSize="56 KB" fileType="csv" onPress={() => {}} />

      <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
        Presentations
      </Text>
      <FileCard fileName="deck_q4.pptx" fileSize="8.5 MB" fileType="pptx" onPress={() => {}} />

      <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
        Images
      </Text>
      <FileCard fileName="photo.jpg" fileSize="3.4 MB" fileType="jpg" onPress={() => {}} />
      <FileCard fileName="screenshot.png" fileSize="980 KB" fileType="png" onPress={() => {}} />

      <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
        Video
      </Text>
      <FileCard fileName="demo_recording.mp4" fileSize="45.2 MB" fileType="mp4" onPress={() => {}} />

      <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
        Audio
      </Text>
      <FileCard fileName="meeting_audio.mp3" fileSize="12.8 MB" fileType="mp3" onPress={() => {}} />

      <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
        Archives
      </Text>
      <FileCard fileName="project_files.zip" fileSize="24.1 MB" fileType="zip" onPress={() => {}} />

      <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
        Code
      </Text>
      <FileCard fileName="config.json" fileSize="2 KB" fileType="json" onPress={() => {}} />

      <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
        Unknown Type
      </Text>
      <FileCard fileName="data.xyz" fileSize="100 KB" fileType="xyz" onPress={() => {}} />
    </VStack>
  ),
}
