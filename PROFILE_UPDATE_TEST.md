# Profile Update Flow Test

## Test Cases to Verify Profile Updates Propagate to Tables

### Student Profile Update Test
1. **Navigate to Student Dashboard**
   - Go to Profile section
   - Click "Edit Profile"
   - Update the name from "Tejo" to "Tejo Updated"
   - Update email if desired
   - Click "Save Changes"

2. **Verify Updates Propagate**
   - Check that success message appears
   - Verify name in sidebar updates to "Tejo Updated"
   - Verify email in sidebar updates (if changed)
   - Navigate to Admin Dashboard → Students section
   - Check that the student table shows updated information

### Admin Profile Update Test
1. **Navigate to Admin Dashboard**
   - Go to Profile section
   - Update admin information
   - Click "Save Changes"

2. **Verify Updates**
   - Check that success message appears
   - Verify any tables/components showing admin info are updated

### Event System Test
The system uses custom events to propagate profile changes:

```javascript
// Profile update triggers this event
window.dispatchEvent(new CustomEvent('profileUpdated', { 
    detail: { studentId, profileData } 
}));

// Components listen for this event
window.addEventListener('profileUpdated', handleProfileUpdate);
```

### API Integration Test
1. **Backend Required**: The profile components now make API calls to:
   - `studentAPI.getById(id)` - Fetch profile data
   - `studentAPI.update(id, data)` - Update profile data

2. **Fallback Behavior**: If API calls fail, components:
   - Show error messages
   - Fall back to default/existing data
   - Continue to work with local state

### Files Modified
- `src/pages/StudentPages/profile.jsx` - Added API integration and event dispatch
- `src/pages/AdminPages/profile.jsx` - Added API integration and event dispatch  
- `src/pages/AdminPages/students.jsx` - Added API integration and event listening
- `src/dashboard/StudentDashboard.jsx` - Added event listening for profile updates

### Expected Behavior
✅ **BEFORE**: Profile updates only saved locally with console.log(), no API calls, no table updates
✅ **AFTER**: Profile updates save to backend API, dispatch events, and update all related components

### Known Limitations
- Mock data is used as fallback if API is not available
- Admin profile uses studentAPI temporarily (should use adminAPI in production)
- Some table data may still be mock data (charts, statistics)
