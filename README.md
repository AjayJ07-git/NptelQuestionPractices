# NPTEL Practice Questions Website

A modern, interactive web application for practicing NPTEL course questions with advanced features like question shuffling, progress tracking, and detailed answer review.

## Features

### 🎯 Core Functionality
- **Week Selection**: Easy navigation between different weeks (Week 1-12)
- **Interactive Quiz Interface**: Clean, modern UI for taking quizzes
- **Real-time Progress Tracking**: Visual progress bar and question counter
- **Score Calculation**: Instant scoring with percentage calculation
- **Time Tracking**: Automatic time recording for quiz sessions

### 🔀 Shuffling Features
- **Question Shuffling**: Randomize the order of all questions
- **Option Shuffling**: Randomize options within individual questions
- **Smart Answer Tracking**: Maintains correct answers even after shuffling

### 📊 Results & Review
- **Animated Score Display**: Beautiful score animation on completion
- **Detailed Results**: Shows correct/incorrect answers and time taken
- **Answer Review**: Comprehensive review of all questions with:
  - Correct answers highlighted in green
  - User's incorrect answers highlighted in red
  - Clear indication of right vs wrong choices

### 🎮 User Experience
- **Navigation Controls**: Previous/Next buttons with smart state management
- **Keyboard Shortcuts**: 
  - Arrow keys for navigation
  - Number keys (1-4) for selecting options
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Fade-in effects and hover animations
- **Toast Notifications**: Success messages for shuffling operations

### 🔧 Additional Features
- **Retry Functionality**: Start over with the same or shuffled questions
- **Back Navigation**: Easy return to week selection
- **Confirmation Dialogs**: Prevents accidental actions
- **Auto-save Ready**: Infrastructure for saving progress (can be enabled)

## Current Content

### Week 1: Assignment 1 (8 Questions)
1. Absolute value inequality: |x + 1| < 5
2. Irrational number properties
3. Logical implications with equations
4. Proposition conditions (necessary/sufficient)
5. Mathematical statement validity
6. Logical negation of statements
7. Geometric shape relationships
8. Undefined mathematical expressions

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with:
  - CSS Grid and Flexbox layouts
  - CSS Variables and animations
  - Responsive design principles
  - Gradient backgrounds and shadows
- **Vanilla JavaScript**: Pure JS with:
  - ES6+ features (arrow functions, destructuring, etc.)
  - Local storage capabilities
  - Event handling and DOM manipulation
  - Functional programming patterns

## Getting Started

1. **Clone or Download** the repository
2. **Open `index.html`** in any modern web browser
3. **Select Week 1** to start practicing
4. **Navigate** through questions using buttons or keyboard shortcuts
5. **Use shuffle features** to randomize your practice session
6. **Submit** when ready and review your performance

## File Structure

```
├── index.html          # Main HTML structure
├── style.css           # Comprehensive styling
├── script.js           # All JavaScript functionality
└── README.md           # This documentation
```

## How to Add New Weeks

To add questions for other weeks:

1. **Open `script.js`**
2. **Create a new question array** (similar to `week1Questions`)
3. **Update the `selectWeek()` function** to handle the new week
4. **Modify the week card** in HTML to make it available

### Question Format
```javascript
{
    id: 1,
    question: "Your question text here",
    options: [
        "Option 1",
        "Option 2", 
        "Option 3",
        "Option 4"
    ],
    correctAnswer: 0  // Index of correct option (0-based)
}
```

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Features Roadmap

- [ ] Question categories and filtering
- [ ] Performance analytics over time
- [ ] Export results to PDF
- [ ] Dark/Light theme toggle
- [ ] Difficulty levels
- [ ] Hint system
- [ ] Timed quiz mode
- [ ] User accounts and progress saving

## Customization

### Styling
- Modify `style.css` to change colors, fonts, or layout
- CSS variables are used for easy theme customization
- Responsive breakpoints can be adjusted in media queries

### Functionality
- Add new question types in `script.js`
- Implement additional shuffle algorithms
- Add new navigation patterns or keyboard shortcuts

## Contributing

To contribute new questions or features:

1. Follow the existing code structure
2. Ensure responsive design compatibility
3. Test on multiple browsers
4. Maintain accessibility standards

## License

This project is open source and available for educational use.

---

**Built with ❤️ for NPTEL learners**