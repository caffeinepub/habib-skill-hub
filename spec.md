# Game Site

## Current State
Game rewards platform with user auth, games dashboard, balance tracking, and withdrawal requests on Motoko backend.

## Requested Changes (Diff)

### Add
- `userId` returned on login so frontend can store it
- `handlePlay` / Earn Reward button on dashboard that credits user balance when clicked
- `target="_blank"` on Play Now links

### Modify
- Dashboard shows both "Play Now" link and "Earn Reward" button per game card
- Login stores userId in addition to token and balance

### Remove
- Nothing removed

## Implementation Plan
1. Update Motoko backend: ensure login returns userId, add earnReward endpoint that credits balance
2. Update frontend: Login stores userId, Dashboard has Play Now + Earn Reward buttons
