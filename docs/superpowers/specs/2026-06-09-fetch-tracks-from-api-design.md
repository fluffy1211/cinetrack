# Design: Fetch Tracks from API

**Date:** 2026-06-09

## Goal

Replace hardcoded track data in `App` with live data from `TrackService.getTracks()`.

## Approach

Inject `TrackService` into `App`. Initialize `tracks` signal as empty array. In the constructor, subscribe to `getTracks()` and set the signal. No loading or error states — keep it simple.

## Changes

- **`src/app/app.ts`**: Inject `TrackService`, replace hardcoded signal with empty init, add constructor subscription. Remove `onTrackSubmitted` only if no longer needed (keep if `TrackForm` still emits).

## No Changes

- `TrackList`, `TrackCard`, `app.html` — all unchanged.
- `TrackService` — already implemented.

## Data Flow

```
App (constructor)
  → TrackService.getTracks()
  → HTTP GET /tracks
  → tracks signal set
  → TrackList renders cards
```
