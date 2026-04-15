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
} as const

// ---------------------------------------------------------------------------
// Inline SVG icons (compact)
// ---------------------------------------------------------------------------
const Ico = {
  chevD: (s = 16, c: string = C.slate) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: (s = 14, c: string = C.white) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowR: (s = 18, c: string = C.brand) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowL: (s = 18, c: string = C.brand) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  cal: (s = 18, c: string = C.slate) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  clock: (s = 16, c: string = C.slate) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/><path d="M12 6v6l4 2" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
}

// ---------------------------------------------------------------------------
// Component replicas
// ---------------------------------------------------------------------------

/** Select dropdown */
function CdsSelect({ variant = 'outlined', multiple, value, placeholder = 'Choose option', open, options }: {
  variant?: 'outlined' | 'filled'; multiple?: boolean; value?: string | string[]
  placeholder?: string; open?: boolean; options?: string[]
}) {
  const items = options || ['Option A', 'Option B', 'Option C', 'Option D']
  const vals = Array.isArray(value) ? value : value ? [value] : []
  const label = vals.length ? vals.join(', ') : placeholder
  const isFilled = variant === 'filled'
  return (
    <div style={{ position: 'relative', width: 260, fontFamily: F }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: C.textSec, marginBottom: 6 }}>Label</div>
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 12px', borderRadius: 4,
        backgroundColor: isFilled ? C.gray100 : C.white,
        border: `1px solid ${open ? C.brand : C.border}`,
        boxShadow: open ? `0 0 0 2px ${C.brandLight}` : 'none',
        cursor: 'pointer',
      }}>
        <span style={{ fontSize: 14, color: vals.length ? C.text : C.textDis }}>{label}</span>
        {Ico.chevD(16, open ? C.brand : C.slate)}
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          backgroundColor: C.white, borderRadius: 8,
          border: `1px solid ${C.border}`, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          zIndex: 10, overflow: 'hidden',
        }}>
          {items.map((item, i) => {
            const sel = vals.includes(item)
            return (
              <div key={i} style={{
                padding: '10px 12px', fontSize: 14, fontFamily: F,
                color: sel ? C.brand : C.text,
                backgroundColor: sel ? C.brandLight : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span>{item}</span>
                {multiple && (
                  <div style={{
                    width: 18, height: 18, borderRadius: 3,
                    backgroundColor: sel ? C.brand : 'transparent',
                    border: sel ? 'none' : `2px solid ${C.borderStrong}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {sel && Ico.check(12)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** DateTimePicker */
function CdsDateTimePicker({ mode = 'date' }: { mode?: 'date' | 'time' }) {
  const days = [28,29,30,...Array.from({length:31},(_,i)=>i+1),1]
  const cellS = { width: 34, height: 34, display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const, borderRadius: 17, fontSize: 13 }
  const TimeCol = ({ val, active }: { val: string; active?: boolean }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      {Ico.chevD(14, C.textSec)}
      <div style={{ fontSize: 28, fontWeight: 600, fontFamily: M, padding: '4px 12px', borderRadius: 8, color: active ? C.brand : C.text, backgroundColor: active ? C.brandLight : C.gray100 }}>{val}</div>
      {Ico.chevD(14, C.textSec)}
    </div>
  )
  return (
    <div style={{ width: 280, fontFamily: F, backgroundColor: C.white, borderRadius: 12, border: `1px solid ${C.border}`, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
      <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          {Ico.arrowL()}<span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>March 2025</span>{Ico.arrowR()}
        </div>
        {mode === 'date' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {['S','M','T','W','T','F','S'].map((d,i) => <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: C.textDis, padding: '4px 0', fontFamily: M }}>{d}</div>)}
          </div>
        )}
      </div>
      {mode === 'date' ? (
        <div style={{ padding: '8px 12px 16px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {days.map((d,i) => { const out = i<3||i>33, today = d===15&&!out, sel = d===22&&!out; return (
            <div key={i} style={{ ...cellS, fontWeight: today||sel ? 600 : 400, color: sel ? C.white : out ? C.textDis : today ? C.brand : C.text, backgroundColor: sel ? C.brand : today ? C.brandLight : 'transparent' }}>{d}</div>
          )})}
        </div>
      ) : (
        <div style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <TimeCol val="09" active /><span style={{ fontSize: 28, fontWeight: 600, color: C.text }}>:</span><TimeCol val="30" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginLeft: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, padding: '4px 10px', borderRadius: 6, backgroundColor: C.brand, color: C.white }}>AM</div>
            <div style={{ fontSize: 13, fontWeight: 500, padding: '4px 10px', borderRadius: 6, backgroundColor: C.gray100, color: C.textSec }}>PM</div>
          </div>
        </div>
      )}
    </div>
  )
}

/** OTP Input (6-digit) */
function CdsOTPInput({ filled = 3, error }: { filled?: number; error?: boolean }) {
  const digits = ['4','8','2','','','']
  const cursor = <div style={{ width: 1, height: 24, backgroundColor: C.brand, animation: 'cds-blink 1s infinite' }} />
  return (
    <div style={{ fontFamily: F }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 8 }}>Verification Code</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {digits.map((d, i) => {
          const has = i < filled, act = i === filled
          return (
            <div key={i} style={{ width: 44, height: 52, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `${act||error?2:1}px solid ${error&&has?C.error:act?C.brand:C.border}`, backgroundColor: has?(error?'#FCF7F7':C.brandLight):C.white, boxShadow: act?`0 0 0 2px ${C.brandLight}`:'none' }}>
              <span style={{ fontSize: 22, fontWeight: 600, fontFamily: M, color: error ? C.error : C.text }}>{d}</span>
              {act && cursor}
            </div>)
        })}
      </div>
      {error && <div style={{ fontSize: 12, color: C.error, marginTop: 6 }}>Invalid code. Please try again.</div>}
      <style>{`@keyframes cds-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}

/** PIN Input (4-digit dots) */
function CdsPinInput({ filled = 2 }: { filled?: number }) {
  const cursor = <div style={{ width: 1, height: 24, backgroundColor: C.brand, animation: 'cds-blink 1s infinite' }} />
  return (
    <div style={{ fontFamily: F }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 8 }}>Enter PIN</div>
      <div style={{ display: 'flex', gap: 12 }}>
        {[0,1,2,3].map(i => { const has = i < filled, act = i === filled; return (
          <div key={i} style={{ width: 48, height: 52, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `${act?2:1}px solid ${act?C.brand:C.border}`, backgroundColor: C.white, boxShadow: act?`0 0 0 2px ${C.brandLight}`:'none' }}>
            {has ? <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: C.text }} /> : act ? cursor : null}
          </div>)
        })}
      </div>
    </div>
  )
}

/** TransferList */
function CdsTransferList() {
  const TfBtn = ({ icon }: { icon: React.ReactNode }) => <div style={{ width: 36, height: 36, borderRadius: 4, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: C.white }}>{icon}</div>
  const Panel = ({ title, items, sel }: { title: string; items: string[]; sel: number[] }) => (
    <div style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '10px 12px', backgroundColor: C.bgSec, borderBottom: `1px solid ${C.border}`, fontSize: 13, fontWeight: 600, color: C.text, fontFamily: F }}>
        {title} <span style={{ fontWeight: 400, color: C.textSec }}>({items.length})</span>
      </div>
      {items.map((item, i) => { const on = sel.includes(i); return (
        <div key={i} style={{ padding: '10px 12px', fontSize: 14, fontFamily: F, color: C.text, display: 'flex', alignItems: 'center', gap: 10, backgroundColor: on ? C.brandLight : 'transparent', borderBottom: i < items.length-1 ? `1px solid ${C.border}` : 'none' }}>
          <div style={{ width: 18, height: 18, borderRadius: 3, backgroundColor: on ? C.brand : 'transparent', border: on ? 'none' : `2px solid ${C.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{on && Ico.check(12)}</div>
          <span>{item}</span>
        </div>)
      })}
    </div>
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 480, fontFamily: F }}>
      <Panel title="Available" items={['Engineering','Product','Design','Marketing']} sel={[0,2]} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><TfBtn icon={Ico.arrowR(16, C.brand)} /><TfBtn icon={Ico.arrowL(16, C.brand)} /></div>
      <Panel title="Assigned" items={['Sales','Support']} sel={[]} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Storybook Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Components/Inputs',
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
      title="Inputs"
      description="Specialized input components for selection, date/time picking, verification codes, and list transfers. Built for mobile-first touch interactions with CDS 37 Foundation tokens."
      badge="@opengov/cds-components"
      status="new"
    >

      <DocSection
        title="Select"
        description="Dropdown selection with single and multi-select support, outlined and filled variants."
      >
        <DocShowcase
          label="Outlined / Single"
          preview={
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <CdsSelect variant="outlined" value="" open={false} />
              <CdsSelect variant="outlined" value="Option B" open={false} />
            </div>
          }
          code={`<Select\n  label="Label"\n  placeholder="Choose option"\n  options={['Option A', 'Option B', 'Option C']}\n  variant="outlined"\n  onChange={(val) => console.log(val)}\n/>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Token']}
              rows={[
                ['Height', '44px', 'size.input.md'],
                ['Border radius', '4px', 'radius.xs'],
                ['Font size', '14px', 'font.body.md'],
                ['Dropdown radius', '8px', 'radius.sm'],
                ['Dropdown shadow', '0 8px 24px', 'elevation.md'],
              ]}
            />
          }
        />

        <DocShowcase
          label="Filled / Multi-select"
          preview={
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <CdsSelect variant="filled" multiple value={['Option A', 'Option C']} open />
            </div>
          }
          code={`<Select\n  label="Label"\n  variant="filled"\n  multiple\n  value={['Option A', 'Option C']}\n  options={['Option A', 'Option B', 'Option C', 'Option D']}\n  onChange={(vals) => console.log(vals)}\n/>`}
        />

        <PropsTable props={[
          { name: 'options', type: 'SelectOption[]', description: 'Array of selectable items', required: true },
          { name: 'value', type: 'string | string[]', description: 'Currently selected value(s)' },
          { name: 'variant', type: "'outlined' | 'filled'", default: "'outlined'", description: 'Visual style variant' },
          { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple selections' },
          { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text when empty' },
          { name: 'label', type: 'string', description: 'Field label displayed above the input' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
          { name: 'error', type: 'string', description: 'Error message text; shows error state when set' },
          { name: 'onChange', type: '(value: string | string[]) => void', description: 'Selection change handler', required: true },
          { name: 'searchable', type: 'boolean', default: 'false', description: 'Enables text filtering within dropdown' },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="DateTimePicker"
        description="Calendar modal with date and time selection modes. Touch-optimized grid and spinner controls."
      >
        <DocShowcase
          label="Date mode"
          preview={
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: F }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  {Ico.cal()}
                  <span style={{ fontSize: 14, fontWeight: 500, color: C.text }}>Select Date</span>
                </div>
                <CdsDateTimePicker mode="date" />
              </div>
            </div>
          }
          code={`<DateTimePicker\n  mode="date"\n  value={selectedDate}\n  onChange={setSelectedDate}\n  minDate="2025-01-01"\n  maxDate="2025-12-31"\n/>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Token']}
              rows={[
                ['Calendar width', '280px', 'size.calendar.width'],
                ['Cell size', '34px', 'size.calendar.cell'],
                ['Border radius', '12px', 'radius.md'],
                ['Selected bg', '#4B3FFF', 'color.brand.primary'],
                ['Today bg', '#EEF1FC', 'color.brand.light'],
                ['Shadow', '0 8px 24px', 'elevation.md'],
              ]}
            />
          }
        />

        <DocShowcase
          label="Time mode"
          preview={
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ fontFamily: F }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  {Ico.clock()}
                  <span style={{ fontSize: 14, fontWeight: 500, color: C.text }}>Select Time</span>
                </div>
                <CdsDateTimePicker mode="time" />
              </div>
            </div>
          }
          code={`<DateTimePicker\n  mode="time"\n  value={selectedTime}\n  onChange={setSelectedTime}\n  is24Hour={false}\n/>`}
        />

        <PropsTable props={[
          { name: 'mode', type: "'date' | 'time' | 'datetime'", default: "'date'", description: 'Picker mode' },
          { name: 'value', type: 'Date | string', description: 'Currently selected date/time' },
          { name: 'onChange', type: '(value: Date) => void', description: 'Change handler', required: true },
          { name: 'minDate', type: 'Date | string', description: 'Earliest selectable date' },
          { name: 'maxDate', type: 'Date | string', description: 'Latest selectable date' },
          { name: 'is24Hour', type: 'boolean', default: 'false', description: 'Use 24-hour time format' },
          { name: 'locale', type: 'string', default: "'en-US'", description: 'Locale for date formatting' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="OTPInput"
        description="6-digit verification code input with auto-advance, paste support, and error state."
      >
        <DocShowcase
          label="States"
          preview={
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <CdsOTPInput filled={3} />
              <CdsOTPInput filled={6} />
              <CdsOTPInput filled={4} error />
            </div>
          }
          code={`<OTPInput\n  length={6}\n  value={code}\n  onChange={setCode}\n  onComplete={(code) => verifyCode(code)}\n  autoFocus\n/>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Token']}
              rows={[
                ['Cell size', '44 x 52px', 'size.otp.cell'],
                ['Gap', '8px', 'space.sm'],
                ['Font size', '22px', 'font.heading.sm'],
                ['Font family', 'DM Mono', 'font.mono'],
                ['Border radius', '8px', 'radius.sm'],
                ['Focus ring', '2px brand', 'focus.ring'],
                ['Error border', '#D33423', 'color.error'],
              ]}
            />
          }
        />

        <PropsTable props={[
          { name: 'length', type: 'number', default: '6', description: 'Number of digit cells' },
          { name: 'value', type: 'string', description: 'Current OTP value' },
          { name: 'onChange', type: '(value: string) => void', description: 'Value change handler', required: true },
          { name: 'onComplete', type: '(code: string) => void', description: 'Fires when all digits are entered' },
          { name: 'error', type: 'boolean | string', default: 'false', description: 'Error state; string shows message' },
          { name: 'autoFocus', type: 'boolean', default: 'true', description: 'Auto-focus first cell on mount' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all cells' },
          { name: 'secureEntry', type: 'boolean', default: 'false', description: 'Mask digits after entry' },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="PinInput"
        description="4-digit PIN entry with masked dot display for secure authentication flows."
      >
        <DocShowcase
          label="States"
          preview={
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <CdsPinInput filled={0} />
              <CdsPinInput filled={2} />
              <CdsPinInput filled={4} />
            </div>
          }
          code={`<PinInput\n  length={4}\n  value={pin}\n  onChange={setPin}\n  onComplete={(pin) => authenticate(pin)}\n  secureEntry\n/>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Token']}
              rows={[
                ['Cell size', '48 x 52px', 'size.pin.cell'],
                ['Dot size', '12px', 'size.pin.dot'],
                ['Gap', '12px', 'space.md'],
                ['Border radius', '8px', 'radius.sm'],
                ['Focus ring', '2px brand', 'focus.ring'],
              ]}
            />
          }
        />

        <PropsTable props={[
          { name: 'length', type: 'number', default: '4', description: 'Number of PIN digits' },
          { name: 'value', type: 'string', description: 'Current PIN value' },
          { name: 'onChange', type: '(value: string) => void', description: 'Value change handler', required: true },
          { name: 'onComplete', type: '(pin: string) => void', description: 'Fires when all digits are entered' },
          { name: 'secureEntry', type: 'boolean', default: 'true', description: 'Show dots instead of digits' },
          { name: 'error', type: 'boolean | string', default: 'false', description: 'Error state; string shows message' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all cells' },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="TransferList"
        description="Two-panel list with selection checkboxes and transfer controls for managing item assignment."
      >
        <DocShowcase
          label="Default"
          preview={<CdsTransferList />}
          code={`<TransferList\n  leftTitle="Available"\n  rightTitle="Assigned"\n  leftItems={availableItems}\n  rightItems={assignedItems}\n  onChange={({ left, right }) => {\n    setAvailable(left)\n    setAssigned(right)\n  }}\n/>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Token']}
              rows={[
                ['Panel border radius', '8px', 'radius.sm'],
                ['Row height', '40px', 'size.list.row'],
                ['Checkbox size', '18px', 'size.checkbox'],
                ['Transfer button', '36px', 'size.button.sm'],
                ['Gap between panels', '12px', 'space.md'],
              ]}
            />
          }
        />

        <PropsTable props={[
          { name: 'leftItems', type: 'TransferItem[]', description: 'Items in the source panel', required: true },
          { name: 'rightItems', type: 'TransferItem[]', description: 'Items in the target panel', required: true },
          { name: 'leftTitle', type: 'string', default: "'Available'", description: 'Source panel heading' },
          { name: 'rightTitle', type: 'string', default: "'Selected'", description: 'Target panel heading' },
          { name: 'onChange', type: '(state: TransferState) => void', description: 'Transfer handler', required: true },
          { name: 'searchable', type: 'boolean', default: 'false', description: 'Enables search within panels' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all interaction' },
          { name: 'testID', type: 'string', description: 'Test identifier for automation' },
        ]} />
      </DocSection>

      <DocDivider />

      <DocSection
        title="Usage Guidelines"
        description="Best practices for specialized input components."
      >
        <DoDont
          dos={[
            'Use Select for 5+ options; use RadioGroup for fewer',
            'Provide clear labels and helper text for date/time pickers',
            'Auto-advance OTP cells on digit entry for faster completion',
            'Use PinInput with secureEntry for authentication flows',
            'Show item counts in TransferList panel headers',
          ]}
          donts={[
            'Use a Select when a simple Toggle or Checkbox suffices',
            'Allow date ranges wider than the user needs',
            'Disable paste functionality in OTP inputs',
            'Mix PIN and OTP inputs in the same flow',
            'Hide the transfer controls between panels',
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
