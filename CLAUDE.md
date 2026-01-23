# CLAUDE.md - AI Assistant Guide for Driver's Ed Quiz Project

## Project Overview

This is an interactive web-based quiz/game application designed to help users prepare for the Massachusetts Learner's Permit (Driver's Theory) Test. The application covers all aspects that may appear on the official test in an engaging, interactive format.

### Project Goals
- Comprehensive coverage of Massachusetts driving laws, road signs, and traffic rules
- Engaging user experience with game-like elements
- Progress tracking and performance analytics
- Mobile-responsive design for studying on-the-go
- Immediate feedback and explanations for learning

## Technology Stack

### Frontend
- **HTML5**: Semantic markup for content structure
- **CSS3**: Modern styling with Flexbox/Grid for responsive layouts
- **Vanilla JavaScript**: Interactive quiz logic, state management
- **Optional Enhancements**:
  - React.js for component-based architecture (if complexity grows)
  - Chart.js for progress visualization
  - LocalStorage API for persisting user progress

### Development Tools
- Git for version control
- Modern browser developer tools for testing
- Optional: Build tools (Webpack/Vite) if using a framework

## Repository Structure

```
Driver-s-Ed/
├── index.html              # Main entry point
├── assets/
│   ├── css/
│   │   ├── styles.css     # Main stylesheet
│   │   ├── animations.css # Animation effects
│   │   └── responsive.css # Mobile responsiveness
│   ├── js/
│   │   ├── app.js         # Main application logic
│   │   ├── quiz.js        # Quiz engine and state management
│   │   ├── questions.js   # Question database
│   │   ├── ui.js          # UI rendering and updates
│   │   └── storage.js     # LocalStorage persistence
│   ├── images/
│   │   ├── signs/         # Road sign images
│   │   └── scenarios/     # Traffic scenario images
│   └── audio/             # Optional sound effects
├── data/
│   ├── questions.json     # Structured question database
│   └── categories.json    # Quiz categories and topics
├── tests/
│   └── test.html          # Manual testing interface
├── docs/
│   ├── MA-DRIVING-RULES.md # Massachusetts-specific rules reference
│   └── CONTRIBUTING.md     # Contribution guidelines
├── CLAUDE.md              # This file
└── README.md              # User-facing documentation
```

## Massachusetts Driver's Test Content Areas

The quiz must comprehensively cover these topics based on the MA RMV Driver's Manual:

### 1. Traffic Signs (20-25% of test)
- Regulatory signs (stop, yield, speed limit, etc.)
- Warning signs (curves, intersections, etc.)
- Guide signs (route markers, destinations)
- Construction and maintenance signs
- Sign shapes, colors, and meanings

### 2. Traffic Laws and Rules (30-35% of test)
- Right-of-way rules
- Speed limits (different zones)
- Parking regulations
- Passing rules
- School bus laws
- Emergency vehicle laws
- Cell phone and texting laws
- Seat belt and child restraint laws

### 3. Road Markings and Signals (15-20% of test)
- Lane markings (solid, dashed, double lines)
- Traffic signals and meanings
- Railroad crossings
- Crosswalks and stop lines
- Turn lanes and arrows

### 4. Safe Driving Practices (20-25% of test)
- Following distance (2-3 second rule)
- Blind spots and mirror usage
- Adverse weather driving
- Night driving
- Defensive driving techniques
- Impaired driving dangers
- Fatigue and distraction

### 5. Vehicle Operation (5-10% of test)
- Starting, stopping, and turning
- Hand signals
- Vehicle inspection basics
- Dashboard warning indicators

## Development Workflow

### Setting Up Development
```bash
# Clone and navigate to repository
git clone <repo-url>
cd Driver-s-Ed

# Create feature branch
git checkout -b claude/<feature-name>-<session-id>

# Open index.html in browser to test
# Or use a local server:
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Making Changes
1. **Read existing code** before making modifications
2. **Test thoroughly** in browser after each change
3. **Validate** that quiz logic works correctly
4. **Check responsive design** on different screen sizes
5. **Verify** question accuracy against official MA RMV manual

### Committing and Pushing
```bash
# Stage specific files
git add <files>

# Commit with descriptive message
git commit -m "Add: [feature description]

Detailed explanation of changes.

https://claude.ai/code/session_<id>"

# Push to feature branch
git push -u origin claude/<branch-name>
```

## Code Conventions

### JavaScript
- Use ES6+ features (const/let, arrow functions, template literals)
- Modular organization: separate concerns into different files
- Clear function naming: `shuffleQuestions()`, `updateScore()`, `renderQuestion()`
- Comment complex logic, especially quiz algorithms
- Handle edge cases: empty states, completed quizzes, invalid inputs

### HTML
- Semantic elements: `<main>`, `<section>`, `<article>`, `<nav>`
- Accessibility: proper ARIA labels, alt text for images, keyboard navigation
- Form best practices: labels, validation, clear error messages

### CSS
- Mobile-first responsive design
- CSS custom properties (variables) for theming
- BEM or similar naming convention for classes
- Avoid !important unless absolutely necessary
- Smooth animations and transitions for better UX

### Quiz Question Format
```javascript
{
  "id": "unique-id",
  "category": "traffic-signs",
  "question": "What does an octagonal sign mean?",
  "options": [
    "Stop",
    "Yield",
    "Speed Limit",
    "Warning"
  ],
  "correctAnswer": 0,
  "explanation": "An octagonal (8-sided) sign is always a stop sign. It's the only sign with this shape.",
  "image": "assets/images/signs/stop-sign.jpg",
  "difficulty": "easy",
  "tags": ["signs", "shapes", "regulatory"]
}
```

## Testing Requirements

Before considering any feature complete:

1. **Functionality Testing**
   - Quiz starts correctly
   - Questions display properly with all options
   - Answer selection works
   - Correct/incorrect feedback appears
   - Score tracking is accurate
   - Quiz completion triggers properly
   - Progress saves and restores

2. **Content Accuracy**
   - All questions match current MA RMV guidelines
   - Explanations are clear and correct
   - Images match questions (if used)
   - No duplicate questions in same session

3. **Cross-Browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Chrome Mobile)

4. **Responsive Design**
   - Test on mobile (320px+), tablet (768px+), desktop (1024px+)
   - Touch targets are large enough (44x44px minimum)
   - Text is readable without zooming

5. **Accessibility**
   - Keyboard navigation works
   - Screen reader compatible
   - Sufficient color contrast (WCAG AA minimum)

## Key Features to Implement

### Core Features (MVP)
- [ ] Question display with multiple choice answers
- [ ] Answer validation and feedback
- [ ] Score tracking
- [ ] Question randomization
- [ ] Category-based quiz modes
- [ ] Progress indicator
- [ ] Results summary with performance breakdown

### Enhanced Features
- [ ] Practice mode vs. Test mode
- [ ] Timed quiz option (simulates real test)
- [ ] Bookmark difficult questions for review
- [ ] Performance analytics and weak area identification
- [ ] Study mode with explanations before quiz
- [ ] Achievement system or gamification elements
- [ ] Print certificate of completion

### Advanced Features
- [ ] User accounts and progress sync
- [ ] Leaderboard
- [ ] Flashcard study mode
- [ ] Interactive road scenario simulations
- [ ] Voice-over option for accessibility
- [ ] Offline support (PWA)

## Common Pitfalls to Avoid

1. **Don't hardcode questions in JavaScript**: Use a separate JSON file or data structure
2. **Don't skip mobile testing**: Many users will study on phones
3. **Don't use outdated information**: Always reference current MA RMV manual
4. **Don't make UI too complex**: Simple, clear design is better for learning
5. **Don't ignore accessibility**: This is an educational tool for everyone
6. **Don't save sensitive data**: No personal information should be stored without consent
7. **Don't overwrite git history**: Always work on feature branches

## Resources

### Official References
- [Massachusetts RMV Driver's Manual](https://www.mass.gov/info-details/drivers-manual)
- [MA RMV Practice Permit Test](https://atlas-myrmv.massdot.state.ma.us/myrmv/_/)
- [Massachusetts General Laws - Motor Vehicles](https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXIV)

### Design Inspiration
- Duolingo (gamification, progress tracking)
- Quizlet (flashcards, study modes)
- Driving-Tests.org (similar domain)

## Performance Targets

- Initial page load: < 2 seconds
- Question transition: < 200ms
- Smooth animations at 60fps
- Works on 3G networks
- Accessible score of 90+ (Lighthouse)

## Git Branch Strategy

- **Branch naming**: `claude/feature-name-<session-id>`
- **Never push to main** without explicit permission
- **Commit frequently** with clear messages
- **Test before pushing**: Ensure code works

## AI Assistant Guidelines

When working on this project:

1. **Always read before modifying**: Never propose changes without reading existing code
2. **Test thoroughly**: Open the application in a browser and verify it works
3. **Check question accuracy**: Cross-reference with official MA RMV documentation
4. **Think about the learner**: This is an educational tool - clarity matters
5. **Mobile-first mindset**: Many users will be studying on their phones
6. **Accessibility is not optional**: Follow WCAG guidelines
7. **Don't over-engineer**: Keep it simple and maintainable
8. **Security awareness**: Even client-side apps should follow best practices
9. **Progressive enhancement**: Basic functionality should work everywhere

## Current Development Status

**Project Phase**: Initial Setup
**Last Updated**: 2026-01-23

### Completed
- Repository initialized
- CLAUDE.md created with comprehensive guidelines

### In Progress
- N/A

### Planned
- Create project structure
- Implement core quiz engine
- Add Massachusetts-specific question database
- Design responsive UI
- Implement progress tracking
- Add gamification elements
- Comprehensive testing

## Questions or Issues?

When encountering problems:
1. Check browser console for errors
2. Verify file paths and imports
3. Test in a clean browser session (disable extensions)
4. Review this document for conventions
5. Check git status and branch

## Changelog

### 2026-01-23
- Initial CLAUDE.md creation
- Documented project structure and conventions
- Established MA Driver's Test content areas
- Defined development workflow and testing requirements
