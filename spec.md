# Game Site

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- User authentication (signup/login) with email and password
- Games listing with title, genre, reward amount, and play URL
- User balance tracking
- Withdrawal request system (user requests withdrawal of balance via a method)
- Dashboard page showing all available games
- Login and Signup pages

### Modify
N/A

### Remove
N/A

## Implementation Plan
- Backend (Motoko): User profiles with balance, game records, withdrawal records
- Auth via Caffeine authorization component
- Games: list games, add games (admin)
- Withdrawals: request withdrawal, deduct balance, track status
- Frontend: Login, Signup, Dashboard pages with React Router
- Dashboard shows game cards with Play Now links and reward info
- User can see their balance and request withdrawals
