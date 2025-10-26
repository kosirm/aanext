# AA Hrvatska Quasar Migration - Plan Index

## 📋 Documentation Overview

This folder contains a comprehensive working plan for migrating the AA Hrvatska website from Mobirise to Quasar framework. All documents are ready for review and discussion.

---

## 📄 Documents

### 1. **PLAN_SUMMARY.md** ⭐ START HERE
**Executive summary of the entire project**
- What we're building
- Key features
- 7 implementation phases
- Success criteria
- Questions to discuss

**Read this first to understand the big picture.**

---

### 2. **WORKING_PLAN.md**
**Detailed working plan with full context**
- Current state analysis (old site)
- New site architecture
- All 7 pages breakdown
- Implementation phases
- Key considerations
- Timeline estimate

**Read this for comprehensive project details.**

---

### 3. **IMPLEMENTATION_ROADMAP.md**
**Task-by-task breakdown for developers**
- Phase 1: Foundation & Setup
- Phase 2: Layout & Navigation
- Phase 3: Core Pages
- Phase 4: Literatura Page (priority)
- Phase 5: Service Worker & PWA
- Phase 6: Mobile & Electron
- Phase 7: PDF Generator Update
- Testing & deployment checklists

**Use this as the actual implementation guide.**

---

### 4. **COMPARISON.md**
**Old site vs new site feature comparison**
- Architecture comparison
- Features comparison
- Development experience
- Code quality
- Performance
- Accessibility
- Data management
- Migration path
- Risk assessment

**Read this to understand improvements and benefits.**

---

### 5. **DISCUSSION_POINTS.md**
**Questions for review and discussion**
- Timeline & priorities
- Features & functionality
- Technical decisions
- Data & content
- Deployment & hosting
- Testing & quality
- Documentation & maintenance
- Future enhancements
- Budget & resources
- Risk mitigation

**Use this to provide feedback and make decisions.**

---

## 🎯 Quick Start

### For Project Managers
1. Read **PLAN_SUMMARY.md** (5 min)
2. Review **COMPARISON.md** (10 min)
3. Discuss **DISCUSSION_POINTS.md** (20 min)

### For Developers
1. Read **PLAN_SUMMARY.md** (5 min)
2. Study **WORKING_PLAN.md** (20 min)
3. Use **IMPLEMENTATION_ROADMAP.md** (ongoing)

### For Decision Makers
1. Read **PLAN_SUMMARY.md** (5 min)
2. Review **COMPARISON.md** (10 min)
3. Check **DISCUSSION_POINTS.md** (15 min)
4. Approve or provide feedback

---

## 📊 Project Overview

### Current State
- **Framework**: Mobirise (visual editor)
- **Pages**: 7 (4 main + 3 additional)
- **Features**: PWA, service worker, basic styling
- **Issues**: Limited customization, hard to maintain

### Target State
- **Framework**: Quasar v2 + Vue 3 + TypeScript
- **Pages**: 7 (same, improved)
- **Features**: PWA, dark/light mode, bookmarks, font size, mobile app, desktop app
- **Benefits**: Professional codebase, easy to maintain, unlimited customization

### Timeline
- **Phase 1-2**: Foundation & Layout (2-3 days)
- **Phase 3**: Core Pages (2-3 days)
- **Phase 4**: Literatura Page (3-4 days) ⭐ PRIORITY
- **Phase 5**: PWA & Service Worker (2-3 days)
- **Phase 6**: Mobile & Electron (2-3 days)
- **Phase 7**: PDF Generator (1-2 days)
- **Total**: 10-15 days

---

## 🔑 Key Features

### User Features
✅ Dark/light mode toggle  
✅ Font size adjustment (3 sizes)  
✅ Sobriety badge with date input  
✅ Book reader with bookmarks  
✅ Offline support (PWA)  
✅ Mobile app installation  
✅ Desktop app (Electron)  

### Developer Features
✅ TypeScript for type safety  
✅ Vue 3 components  
✅ Pinia state management  
✅ Service worker toggle for development  
✅ Hot module replacement  
✅ Unified book JSON format  
✅ Simplified PDF generator  

---

## 📱 Deployment Targets

1. **Web (PWA)**: Netlify (same as current)
2. **Mobile App**: TWA (Android) - thin wrapper around PWA
3. **Desktop App**: Electron
4. **Offline Support**: Service worker with Workbox

---

## 🛠️ Work.sh Commands

```bash
# Development
w q                    # Dev without service worker (default)
w q -d                 # Dev without service worker (explicit)
w q -ds                # Dev with service worker

# Building
w q build              # Production build
w q build pwa          # PWA build
w q build electron     # Electron build
```

---

## 📚 Data Unification

### Current Issue
- Dnevna razmatranja: Calendar-based JSON format
- Books: Chapter-based JSON format
- PDF generator: 2 separate generators

### Solution
- Unified JSON format for all books
- Single book reader component
- Single PDF generator
- Simplified maintenance

---

## ✅ Success Criteria

- [ ] All 7 pages functional and styled
- [ ] PWA installable and works offline
- [ ] Dark/light mode toggle working
- [ ] Sobriety calculator functional
- [ ] Book reader with bookmarks working
- [ ] Service worker toggle in work.sh
- [ ] Mobile app (TWA) buildable
- [ ] Electron app buildable
- [ ] Unified book JSON format
- [ ] PDF generator updated

---

## 🚀 Next Steps

### Immediate (Today)
1. ✅ Review all documentation
2. ✅ Provide feedback on DISCUSSION_POINTS.md
3. ✅ Approve or suggest modifications
4. ✅ Confirm timeline and priorities

### Short Term (This Week)
1. Begin Phase 1: Foundation & Setup
2. Set up Quasar configuration
3. Create theme system
4. Build core components

### Medium Term (Next 2 Weeks)
1. Complete Phase 2-3: Layout & Core Pages
2. Build all 7 pages
3. Implement navigation system
4. Test responsive design

### Long Term (Weeks 3-4)
1. Complete Phase 4: Literatura Page
2. Unify book JSON format
3. Build book reader with bookmarks
4. Complete Phase 5-7: PWA, Mobile, PDF

---

## 📞 Questions & Feedback

Please provide feedback on:

1. **Timeline**: Is 10-15 days realistic?
2. **Priorities**: Should we prioritize Literatura page?
3. **Features**: Any features to add/remove?
4. **Technical**: Any technical concerns?
5. **Deployment**: Any deployment concerns?
6. **Budget**: Any budget constraints?

See **DISCUSSION_POINTS.md** for detailed questions.

---

## 📖 How to Use This Plan

### For Approval
1. Read PLAN_SUMMARY.md
2. Review COMPARISON.md
3. Discuss DISCUSSION_POINTS.md
4. Approve or provide feedback

### For Implementation
1. Study WORKING_PLAN.md
2. Follow IMPLEMENTATION_ROADMAP.md
3. Check off tasks as completed
4. Update progress regularly

### For Maintenance
1. Keep documentation updated
2. Document any changes
3. Update roadmap as needed
4. Plan Phase 2 enhancements

---

## 📝 Document Status

| Document | Status | Purpose |
|----------|--------|---------|
| PLAN_SUMMARY.md | ✅ Ready | Executive summary |
| WORKING_PLAN.md | ✅ Ready | Detailed plan |
| IMPLEMENTATION_ROADMAP.md | ✅ Ready | Task breakdown |
| COMPARISON.md | ✅ Ready | Feature comparison |
| DISCUSSION_POINTS.md | ✅ Ready | Questions & feedback |
| PLAN_INDEX.md | ✅ Ready | This file |

---

## 🎓 Learning Resources

### Quasar Documentation
- https://quasar.dev/
- https://quasar.dev/docs/

### Vue 3 Documentation
- https://vuejs.org/

### TypeScript Documentation
- https://www.typescriptlang.org/

### Pinia Documentation
- https://pinia.vuejs.org/

---

## 📞 Contact & Support

For questions or clarifications:
1. Review the relevant documentation
2. Check DISCUSSION_POINTS.md
3. Provide feedback
4. Schedule discussion if needed

---

## 🎉 Ready to Begin?

All documentation is complete and ready for review. 

**Next action**: Review PLAN_SUMMARY.md and provide feedback on DISCUSSION_POINTS.md.

Once approved, we can begin Phase 1 implementation immediately.

---

**Last Updated**: 2025-10-25  
**Status**: Ready for Review  
**Next Review**: After feedback received

