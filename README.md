# Beautiful Countdown Timer ⏰

A smooth and elegant countdown timer built with TypeScript, featuring delicate colors and beautiful animations. Perfect for GitHub Pages deployment.

## ✨ Features

- **Beautiful Design**: Clean, modern interface with glass-morphism effects
- **Smooth Animations**: Gentle transitions and hover effects
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **TypeScript**: Type-safe code with modern ES features
- **GitHub Pages Ready**: Automatic deployment with GitHub Actions
- **Customizable**: Easy to modify target date and styling

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/yourusername/countdown.git
cd countdown
npm install
```

### 2. Customize Your Countdown

Edit the target date in `src/countdown.ts`:

```typescript
// Change this to your desired date
private readonly TARGET_DATE = new Date('2025-01-01T00:00:00').getTime();
```

### 3. Build and Test Locally

```bash
# Build TypeScript
npm run build

# Serve locally (requires Python)
npm run serve
```

Visit `http://localhost:8000` to see your countdown timer.

### 4. Deploy to GitHub Pages

1. **Enable GitHub Pages**: Go to your repository settings → Pages → Source: GitHub Actions
2. **Push to main branch**: The GitHub Action will automatically build and deploy
3. **Access your timer**: Visit `https://yourusername.github.io/countdown/`

## 🎨 Customization

### Change Target Date

In `src/countdown.ts`, modify the `TARGET_DATE`:

```typescript
private readonly TARGET_DATE = new Date('2025-12-31T23:59:59').getTime();
```

### Customize Colors

Edit `src/style.css` to change the color scheme:

```css
body {
    background: linear-gradient(135deg, #your-color 0%, #your-color 100%);
}
```

### Modify Text

Update the title and subtitle in `index.html`:

```html
<h1 class="title">Your Custom Title</h1>
<p class="subtitle">Your custom subtitle</p>
```

## 📁 Project Structure

```
countdown/
├── index.html              # Main HTML file
├── src/
│   ├── countdown.ts         # TypeScript countdown logic
│   └── style.css           # Styles and animations
├── dist/                   # Compiled JavaScript (auto-generated)
├── .github/workflows/      # GitHub Actions deployment
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🛠️ Development

```bash
# Watch mode for development
npm run dev

# Clean build directory
npm run clean

# Build for production
npm run build
```

## 🎯 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2018+ features
- CSS Grid and Flexbox
- Backdrop-filter support recommended

## 📝 License

MIT License - feel free to use for any project!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

Made with ❤️ for beautiful countdowns 