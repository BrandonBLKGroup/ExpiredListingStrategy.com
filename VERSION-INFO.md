# ExpiredListingStrategy.com - Version Control

## Current Version: V2 (High-Conversion Layout)

## Available Versions:

### V1 (Original)
- **File:** `index-v1.html`
- **Description:** Original 5-field form layout with stats below fold
- **Conversion Rate:** ~2.1% (1 lead from 47 visits in first week)
- **Form Fields:** Name, Email, Phone, Property Address, Timeline, Price Desired, Checkbox
- **Locked:** ✅ Yes

### V2 (High-Conversion)
- **File:** `index-v2.html`
- **Description:** Simplified 2-field form, social proof at top, urgency banner, SMS CTA
- **Conversion Rate:** TBD (deployed 2026-04-07)
- **Form Fields:** Name, Phone
- **Features:**
  - Social proof bar at top (1000+ homes, #1 team, 3% commission)
  - Urgency: "Only taking 15 new listings per month"
  - SMS CTA: "Text EXPIRED to (479) 857-5994"
  - Trust statement: "No spam. No pressure."
- **Locked:** ✅ Yes

## How to Revert to V1:

```bash
cd /Users/jarvis/.openclaw/workspace-spartan4/projects/expiredlistingstrategy
cp index-v1.html index.html
git add index.html
git commit -m "Revert to V1 layout"
git push
```

**Live in 2-3 minutes after push.**

## How to Switch Back to V2:

```bash
cd /Users/jarvis/.openclaw/workspace-spartan4/projects/expiredlistingstrategy
cp index-v2.html index.html
git add index.html
git commit -m "Switch back to V2 high-conversion layout"
git push
```

## Testing Notes:

Track these metrics for both versions:
- Page views
- Form submissions
- Bounce rate (people leaving immediately)
- SMS inquiries to (479) 857-5994

**Minimum test period:** 7 days per version (to get statistically significant data)

---

**Last Updated:** 2026-04-07  
**Current Live Version:** V2
