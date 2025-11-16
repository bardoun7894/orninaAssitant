# Design Document

## Overview

This design adds microphone mute/unmute functionality to the Voice Agent component. The feature leverages the ElevenLabs React SDK's conversation API to control audio stream transmission while maintaining an active WebRTC connection. The mute button will appear alongside the "END CALL" button during active conversations, providing users with quick access to microphone control.

## Architecture

### Component Structure

The mute functionality will be integrated into the existing `VoiceAgent` component (`components/voice-agent.tsx`). The component will manage:

1. Mute state tracking (boolean)
2. Audio stream control via ElevenLabs conversation API
3. UI rendering for mute/unmute button with appropriate icons
4. Button layout when conversation is active (mute button + end call button)

### State Management

- `isMuted`: Boolean state to track current microphone mute status
- `isActive`: Existing state that determines conversation status (already implemented)

### Integration Points

- **ElevenLabs SDK**: The `useConversation` hook provides methods to control audio transmission
- **Lucide React Icons**: Use `Mic` and `MicOff` icons for visual feedback
- **Existing Button Styles**: Maintain design consistency with current button styling

## Components and Interfaces

### VoiceAgent Component Updates

```typescript
interface VoiceAgentState {
  isActive: boolean;      // Existing - tracks conversation status
  isMuted: boolean;       // New - tracks microphone mute status
}

interface MuteButtonProps {
  isMuted: boolean;
  onClick: () => void;
}
```

### Button Layout

When `isActive === true`, render two buttons in a horizontal flex container:
1. Mute/Unmute button (icon-only, circular)
2. End Call button (existing)

### Visual Design

**Mute Button - Unmuted State:**
- Icon: `<Mic />` from lucide-react
- Background: `bg-white/10` with backdrop blur
- Border: `border-2 border-white/30`
- Text color: `text-white`
- Hover: Scale and brightness increase

**Mute Button - Muted State:**
- Icon: `<MicOff />` from lucide-react
- Background: `bg-red-500/20` with backdrop blur
- Border: `border-2 border-red-400/50`
- Text color: `text-red-300`
- Visual indicator: Pulsing animation or distinct red styling

**Button Dimensions:**
- Circular button: `w-14 h-14` (56px - exceeds 44px minimum touch target)
- Icon size: `w-6 h-6` (24px)
- Spacing between buttons: `gap-4`

## Data Models

No new data models required. The feature uses local component state.

## Error Handling

### Mute Operation Failures

1. **API Error**: If the ElevenLabs SDK fails to mute/unmute
   - Log error to console
   - Revert `isMuted` state to previous value
   - Show user-friendly alert (optional)

2. **Invalid State**: Attempting to mute when not connected
   - Button should only be visible when `isActive === true`
   - Defensive check in toggle handler

### Fallback Behavior

If the ElevenLabs SDK doesn't expose a direct mute method:
- Research SDK documentation for audio control methods
- Alternative: Use Web Audio API to control MediaStream tracks directly
- Document the approach in implementation

## Testing Strategy

### Manual Testing

1. **Mute Toggle During Conversation**
   - Start conversation
   - Click mute button → verify icon changes to MicOff and styling updates
   - Speak → verify AI doesn't respond to audio
   - Click unmute → verify icon changes to Mic and styling reverts
   - Speak → verify AI responds normally

2. **Visual States**
   - Verify mute button only appears during active conversation
   - Verify hover effects work correctly
   - Verify button layout (mute + end call) displays properly on mobile and desktop

3. **Edge Cases**
   - Mute → End call → Start new call → verify mute state resets to unmuted
   - Rapid mute/unmute toggling → verify state remains consistent

### Browser Testing

- Test on Chrome, Firefox, Safari
- Test on mobile devices (iOS Safari, Android Chrome)
- Verify touch targets are adequate on mobile

## Implementation Notes

### ElevenLabs SDK Research

The implementation requires investigating the `useConversation` hook API to determine:
1. Does it expose a `setMuted()` or similar method?
2. Can we access the underlying MediaStream to control tracks?
3. What's the recommended approach for muting in the SDK?

### Accessibility

- Use `aria-label` that reflects current state: "Mute microphone" or "Unmute microphone"
- Ensure keyboard navigation works (button should be focusable)
- Maintain sufficient color contrast for muted state

### Animation

- Smooth transition between muted/unmuted states (300ms duration)
- Optional: Add subtle pulse animation to muted button to draw attention
