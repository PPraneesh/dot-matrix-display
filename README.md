# Dot Matrix Display

A React component that creates a dot matrix display effect for transitioning between text patterns. Perfect for creating retro-style animated displays or information boards.

Try it out [here](https://ppraneesh.github.io/dot-matrix-display/).

## Installation

```bash
npm install dot-matrix-display
```

## Usage

```jsx
import MatrixDisplay from 'dot-matrix-display';

const App = () => {
  const texts = [
    {
      pattern: "HELLO",
      secondary_text: "Welcome Message"
    },
    {
      pattern: "WORLD",
      secondary_text: "Second Message"
    }
  ];

  return (
    <MatrixDisplay 
      texts={texts} 
      duration={5000} // Optional: defaults to 5000ms
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| texts | TextItem[] | Required | Array of text items to display |
| duration | number | 5000 | Time in milliseconds between transitions |

### TextItem Interface

```typescript
import { TextItem } from 'dot-matrix-display';

const App = () => {
  const texts:TextItem = [
    {
      pattern: "HELLO",
      secondary_text: "Welcome Message"
    },
    {
      pattern: "WORLD",
      secondary_text: "Second Message"
    }
  ];

  return (
    <MatrixDisplay 
      texts={texts} 
      duration={5000} // Optional: defaults to 5000ms
    />
  );
};
```

### Pattern Constraints

- Maximum length: 6 characters
- Supported characters: A-Z, a-z, and space

## Features

- Smooth transition effects between texts
- Customizable transition timing
- Supports only A-Z, a-z and space
- Secondary text display
- Retro dot matrix display style
- Responsive design

## Styling

The component comes with default styling that can be customized using CSS. The main classes are:

- `.facts-wrapper`: Container for the entire component
- `.pattern-grid`: Grid container for the dot matrix
- `.pattern-row`: Individual rows in the matrix
- `.pattern-cell`: Individual dots (active/inactive states)
- `.facts-secondary-text`: Style for the secondary text

## License

MIT
