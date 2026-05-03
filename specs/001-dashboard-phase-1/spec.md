# Feature Specification: Dashboard UI Phase 1

**Feature Branch**: `001-dashboard-phase-1`
**Created**: 2026-05-03
**Status**: Draft
**Input**: User description: "Dashboard UI Phase 1 — ShadCN setup, dashboard route, top bar, dark mode, sidebar and main area placeholders"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Dashboard Shell (Priority: P1)

A developer opens the app and lands on the dashboard page. They see a fully styled
top bar with the DevStash logo, a search input, and action buttons. Below the top bar,
the layout shows a sidebar placeholder and a main content placeholder. The page renders
in dark mode by default.

**Why this priority**: This is the foundation all future dashboard phases build on.
Without a working dashboard route and layout scaffold, no subsequent UI work can proceed.

**Independent Test**: Navigate to `/dashboard` in a browser and verify the page loads
with a visible top bar, sidebar area, and main content area in dark mode.

**Acceptance Scenarios**:

1. **Given** the app is running, **When** a user navigates to `/dashboard`,
   **Then** the page renders without errors and displays the dashboard layout.
2. **Given** the dashboard page, **When** it loads, **Then** the top bar contains
   the DevStash logo/name, a search input field, a "New Collection" button, and a "New Item" button.
3. **Given** the dashboard page, **When** it loads, **Then** the background and text
   colors reflect dark mode (dark background, light text) by default.
4. **Given** the dashboard page, **When** it loads, **Then** the sidebar area displays
   an `h2` reading "Sidebar" and the main area displays an `h2` reading "Main".

---

### Edge Cases

- Navigating to `/` should not break; only `/dashboard` is in scope for this phase.
- The search input and action buttons are display-only — no interactions required yet.
- No authentication gate is required in this phase; the route is publicly accessible.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST expose a `/dashboard` route that renders the dashboard page.
- **FR-002**: The dashboard page MUST include a persistent top bar spanning the full width.
- **FR-003**: The top bar MUST display the DevStash brand name/logo on the left side.
- **FR-004**: The top bar MUST include a search input field (display-only, no functionality).
- **FR-005**: The top bar MUST include a "New Collection" button and a "New Item" button
  (display-only, no functionality).
- **FR-006**: The dashboard layout MUST include a sidebar placeholder containing an `h2`
  with the text "Sidebar".
- **FR-007**: The dashboard layout MUST include a main content placeholder containing
  an `h2` with the text "Main".
- **FR-008**: The application MUST default to dark mode; no user toggle is required in this phase.
- **FR-009**: ShadCN UI MUST be initialized with the Nova style preset, Neutral base color,
  Default radius, and Lucide icon library; at minimum the Button and Input components
  must be installed and available for use.
- **FR-010**: The application MUST use Inter as the primary typeface for both headings and body text.
- **FR-011**: The search input in the top bar MUST be horizontally centered between the brand name and the action buttons.
- **FR-012**: All Lucide icon imports MUST be centralized through a single `src/components/icons.tsx` re-export file; no component MAY import directly from `lucide-react`.
- **FR-013**: The top bar brand area MUST display a DevStash logo using the ShadCN Avatar component with "DS" initials as fallback, paired with the "DevStash" wordmark.

### Key Entities

- **Dashboard Layout**: Full-page structure consisting of top bar + sidebar + main content area.
- **Top Bar**: Fixed/sticky header containing brand, search, and action controls.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Navigating to `/dashboard` consistently returns a rendered page with no console errors.
- **SC-002**: The top bar, sidebar placeholder, and main content placeholder are all visible
  when the page first loads on a desktop viewport.
- **SC-003**: The page renders in dark mode by default without any user action.
- **SC-004**: The ShadCN Button and Input components render correctly within the top bar
  with no visual regressions.

## Clarifications

### Session 2026-05-03

- Q: What font and ShadCN style preset should be used for the dashboard? → A: Nova style (already default), Neutral base color, Inter font (heading + body), Default radius, Lucide icons.
- Q: How should the top bar search be positioned, and how should icons be managed? → A: Search centered between brand and buttons; all icon imports centralized via `src/components/icons.tsx`.
- Q: How should the DevStash brand/logo be rendered in the top bar? → A: ShadCN Avatar component with "DS" initials fallback, next to the "DevStash" wordmark.

## Assumptions

- This is phase 1 of 3; sidebar navigation and main content grid are out of scope.
- The dashboard is accessible without authentication during development.
- Desktop viewport is the primary target; responsive behaviour is not required in this phase.
- The ShadCN theme will be configured for dark mode as the default; light mode toggle comes later.
- The root route (`/`) is not redirected to `/dashboard` in this phase.
