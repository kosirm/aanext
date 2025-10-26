# Discussion Points - Questions for Review

Please review and provide feedback on the following points before we begin implementation.

---

## 1. Timeline & Priorities

### Question 1.1: Timeline Feasibility
**Estimated: 10-15 days**

- Is this timeline realistic for your needs?
- Do you have any hard deadlines?
- Should we prioritize certain phases?

**Recommendation**: Start with Phase 1-2 (foundation), then Phase 4 (Literatura) as priority.

---

### Question 1.2: Phase Priorities
**Current order**: Foundation → Layout → Core Pages → Literatura → PWA → Mobile → PDF

- Should we prioritize Literatura page first (most complex)?
- Should we delay Mobile/Electron until later?
- Should we focus on PWA first?

**Recommendation**: Keep current order, but start Literatura early in parallel.

---

## 2. Features & Functionality

### Question 2.1: Dark Mode Implementation
**Proposed**: Toggle in left drawer, auto-detect system preference

- Do you want auto-detect system preference?
- Should dark mode be default or light?
- Any specific color scheme for dark mode?

**Recommendation**: Auto-detect with manual override, light mode default.

---

### Question 2.2: Sobriety Calculator
**Proposed**: Input date in left drawer, show days in badge

- Should it show years/months/days or just total days?
- Should it show milestones (30 days, 1 year, etc.)?
- Should it have a reset button?

**Recommendation**: Show all (years/months/days), highlight milestones, include reset.

---

### Question 2.3: Book Reader Features
**Proposed**: Bookmarks, font size (3 sizes), navigation

- Should we support more than 3 font sizes?
- Should bookmarks show a preview?
- Should we add search functionality?
- Should we add text highlighting?

**Recommendation**: Keep 3 sizes for now, add search/highlight in Phase 2.

---

### Question 2.4: Calendar Component
**Proposed**: Desktop only, hide on mobile

- Should we show a mini calendar on mobile?
- Should we show available dates only?
- Should we highlight today's date?

**Recommendation**: Hide on mobile, show available dates, highlight today.

---

## 3. Technical Decisions

### Question 3.1: Service Worker Toggle
**Proposed**: `w q -d` (no SW), `w q -ds` (with SW)

- Is this command structure clear?
- Should we add more options?
- Should we add a UI toggle in the app?

**Recommendation**: Keep command structure, add UI toggle in settings.

---

### Question 3.2: State Management
**Proposed**: Pinia stores for preferences, navigation, books, UI

- Should we use localStorage for all preferences?
- Should we sync preferences across tabs?
- Should we add cloud sync (future)?

**Recommendation**: localStorage for now, add cloud sync in Phase 2.

---

### Question 3.3: Routing
**Proposed**: Vue Router with hash mode (#/)

- Should we use history mode (/) instead?
- Will this affect Netlify deployment?
- Should we add 404 handling?

**Recommendation**: Keep hash mode for PWA compatibility, add 404 page.

---

### Question 3.4: Build Targets
**Proposed**: PWA, TWA (Android), Electron

- Should we add iOS support (Capacitor)?
- Should we build APK or AAB for Android?
- Should we publish to app stores?

**Recommendation**: Start with PWA + TWA, add iOS later if needed.

---

## 4. Data & Content

### Question 4.1: Book JSON Unification
**Proposed**: Single format for all books

```json
{
  "id": "book-id",
  "title": "Book Title",
  "cover": "path/to/cover.png",
  "entries": [
    {
      "id": "entry-id",
      "date": "1.1.",
      "title": "Entry Title",
      "header": "Header text",
      "text": "Full text",
      "source": "Source reference"
    }
  ]
}
```

- Does this format work for all books?
- Should we add more fields (author, category, etc.)?
- Should we add metadata (version, updated date)?

**Recommendation**: Use proposed format, add metadata in Phase 2.

---

### Question 4.2: Content Migration
**Proposed**: Copy all content from old site as-is

- Should we update any content?
- Should we fix OCR errors now or later?
- Should we add new content?

**Recommendation**: Copy as-is, fix errors in Phase 2, add new content later.

---

### Question 4.3: Video Integration
**Proposed**: Use Plyr (same as old site)

- Should we use YouTube embeds instead?
- Should we host videos locally?
- Should we add video controls?

**Recommendation**: Keep Plyr, use YouTube embeds, add controls.

---

### Question 4.4: Maps Integration
**Proposed**: Google Maps embeds (same as old site)

- Should we use offline maps?
- Should we add map clustering?
- Should we add directions?

**Recommendation**: Keep Google Maps, add offline fallback, add directions in Phase 2.

---

## 5. Deployment & Hosting

### Question 5.1: Deployment Strategy
**Proposed**: Deploy to Netlify (same as old site)

- Should we use staging environment?
- Should we keep old site running during migration?
- Should we use DNS switching or file replacement?

**Recommendation**: Use staging, keep old site, switch DNS after testing.

---

### Question 5.2: Domain & SSL
**Proposed**: Keep aahrvatska.org, use Netlify SSL

- Should we use custom domain?
- Should we set up redirects?
- Should we keep www subdomain?

**Recommendation**: Keep aahrvatska.org, set up redirects, drop www.

---

### Question 5.3: Analytics & Monitoring
**Proposed**: Keep existing analytics

- Should we add error tracking (Sentry)?
- Should we add performance monitoring?
- Should we add user analytics?

**Recommendation**: Keep existing, add Sentry in Phase 2.

---

## 6. Testing & Quality

### Question 6.1: Testing Strategy
**Proposed**: Manual testing for now

- Should we add automated tests?
- Should we add E2E tests?
- Should we add visual regression tests?

**Recommendation**: Manual for Phase 1-4, add automated in Phase 5.

---

### Question 6.2: Browser Testing
**Proposed**: Test on Chrome, Firefox, Safari, Edge

- Should we test on older browsers?
- Should we test on mobile browsers?
- Should we use BrowserStack?

**Recommendation**: Test modern browsers, mobile browsers, use BrowserStack if needed.

---

### Question 6.3: Performance Testing
**Proposed**: Lighthouse scores

- What's the target Lighthouse score?
- Should we optimize for mobile?
- Should we measure Core Web Vitals?

**Recommendation**: Target 90+, optimize for mobile, measure Core Web Vitals.

---

## 7. Documentation & Maintenance

### Question 7.1: Documentation
**Proposed**: README, component docs, API docs

- Should we add JSDoc comments?
- Should we add Storybook for components?
- Should we add deployment guide?

**Recommendation**: Add JSDoc, skip Storybook for now, add deployment guide.

---

### Question 7.2: Maintenance Plan
**Proposed**: Regular updates, bug fixes, feature additions

- Who will maintain the code?
- How often should we update dependencies?
- Should we have a release schedule?

**Recommendation**: Plan for quarterly updates, monthly security patches.

---

## 8. Future Enhancements

### Question 8.1: Phase 2 Features
**Proposed**: Search, text highlighting, cloud sync, analytics

- What features are most important?
- Should we add user accounts?
- Should we add community features?

**Recommendation**: Prioritize search, highlighting, analytics.

---

### Question 8.2: Internationalization
**Proposed**: Currently Croatian only

- Should we add English translation?
- Should we add other languages?
- Should we use i18n framework?

**Recommendation**: Add English in Phase 2, use i18n framework.

---

## 9. Budget & Resources

### Question 9.1: Development Resources
**Proposed**: Single developer (me)

- Do you have additional developers?
- Should we hire external help?
- What's the budget?

**Recommendation**: Proceed with single developer, hire if needed.

---

### Question 9.2: Hosting & Services
**Proposed**: Netlify (free tier)

- Should we upgrade to paid tier?
- Should we use CDN?
- What's the budget?

**Recommendation**: Start with free tier, upgrade if needed.

---

## 10. Risk Mitigation

### Question 10.1: Backup Strategy
**Proposed**: Keep old site running, backup all data

- Should we version control everything?
- Should we have disaster recovery plan?
- Should we have rollback plan?

**Recommendation**: Yes to all, use git for version control.

---

### Question 10.2: User Communication
**Proposed**: Announce migration, provide feedback channel

- Should we notify users before migration?
- Should we provide feedback form?
- Should we have support email?

**Recommendation**: Yes to all, add feedback form in Phase 2.

---

## Summary of Recommendations

✅ **Proceed with migration**  
✅ **Keep current timeline (10-15 days)**  
✅ **Prioritize Literatura page**  
✅ **Use proposed technical stack**  
✅ **Copy content as-is, improve later**  
✅ **Deploy to Netlify with staging**  
✅ **Add automated tests in Phase 5**  
✅ **Plan for Phase 2 enhancements**  

---

## Next Steps

1. **Review** this document
2. **Provide feedback** on any points
3. **Approve** the plan
4. **Begin Phase 1** implementation

Please let me know your thoughts on these points!

