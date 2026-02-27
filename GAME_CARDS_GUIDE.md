# Game Card System - Usage Guide

## Overview
The game card system is now set up with shadcn/ui utilities and a reusable `GameCard` component.

## How to Add New Games

### 1. Add Game Image
Place your game image in the `public/images/` directory:
```
public/images/your-game.png
```

### 2. Update the Games Array
Open `app/page.jsx` and add your game to the `games` array:

```javascript
const games = [
  {
    title: "Snake",
    image: "/images/snake.png",
    href: "/games/snake",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    title: "Your New Game",
    image: "/images/your-game.png",
    href: "/games/your-game",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
];
```

### 3. Create Game Route
Create a new directory and page for your game:
```
app/games/your-game/page.jsx
```

## GameCard Component Props

- `title` (string, required): The game name displayed below the card
- `image` (string, optional): Path to game image (e.g., "/images/snake.png")
- `href` (string, required): Navigation route (e.g., "/games/snake")
- `gradient` (string, optional): CSS gradient as fallback if no image
- `className` (string, optional): Additional CSS classes

## Features

✅ **Reusable Component**: One component handles all game cards
✅ **Image Support**: Uses Next.js Image component for optimization
✅ **Fallback Gradient**: Shows gradient if no image provided
✅ **Responsive**: Works on all screen sizes
✅ **shadcn/ui**: Uses modern utility functions (cn, clsx, tailwind-merge)
✅ **Hover Effects**: Smooth animations on hover

## Example Gradients

- Purple: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Pink: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
- Blue: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- Green: `linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)`
- Orange: `linear-gradient(135deg, #fa709a 0%, #fee140 100%)`
