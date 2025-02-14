import { useState } from 'react';
import MatrixDisplay, { TextItem } from 'dot-matrix-display';

function App() {
  const [savedTexts, setSavedTexts] = useState<TextItem[]>([
    { pattern: "RETRO", secondary_text: "DISPLAY" },
    { pattern: "GITHUB", secondary_text: "github.com/PPraneesh/dot-matrix-display" }
  ]);
  const [newText, setNewText] = useState<TextItem>({ pattern: "", secondary_text: "" });
  const [duration, setDuration] = useState(2000);
  const [matrixKey, setMatrixKey] = useState(0);

  const updateNewText = (field: keyof TextItem, value: string) => {
    setNewText({ ...newText, [field]: value });
  };

  function addNewText() {
    if (newText.pattern.trim() || newText.secondary_text.trim()) {
      setSavedTexts([...savedTexts, newText]);
      setNewText({ pattern: "", secondary_text: "" });
      setMatrixKey(prev => prev + 1);
    }
  }
  const updateSavedText = (index: number, field: keyof TextItem, value: string) => {
    const updated = [...savedTexts];
    updated[index][field] = value;
    setSavedTexts(updated);
  };

  function removeSavedText(index: number) {
    const updatedTexts = savedTexts.filter((_, i) => i !== index);
    setSavedTexts(updatedTexts);
    setMatrixKey(prev => prev + 1);
  }

  const matrixDisplaySnippet = `import MatrixDisplay from 'dot-matrix-display';

const texts = [
  { pattern: "RETRO", secondary_text: "DISPLAY" },
  { pattern: "GITHUB", secondary_text: "github.com/PPraneesh/dot-matrix-display" }
];

<MatrixDisplay texts={texts} duration={2000} />;`;

  const copyCode = () => {
    navigator.clipboard.writeText(matrixDisplaySnippet);
  };

  const displayTexts = savedTexts.filter(
    t => t.pattern.trim() || t.secondary_text.trim()
  );

  const textsToDisplay = (displayTexts.length > 0 ? displayTexts : [{ pattern: "", secondary_text: "" }])
    .map(text => ({
      pattern: text.pattern || "",
      secondary_text: text.secondary_text || ""
    }));

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Dot Matrix Display Controller</h1>
        <p className="subtitle">Create your own retro text animations</p>
      </header>

      <div className="display-preview">
        <MatrixDisplay
          key={matrixKey}
          texts={textsToDisplay}
          duration={duration}
        />
      </div>

      <div className="control-panel">
        <h1>The Controls</h1>
        <div className="duration-control">
          <label htmlFor="duration">Animation Duration (ms):</label>
          <div className="slider-container">
            <input
              id="duration"
              type="range"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1000"
              max="8000"
              step="100"
            />
            <span className="duration-value">{duration}ms</span>
          </div>
        </div>

        <div className="text-entries">
          <h2>Add New Text</h2>
          <div className="text-entry">
            <div className="input-group">
              <input
                type="text"
                placeholder="Main Text"
                value={newText.pattern}
                onChange={(e) => updateNewText('pattern', e.target.value)}
              />
              <input
                type="text"
                placeholder="Secondary Text"
                value={newText.secondary_text}
                onChange={(e) => updateNewText('secondary_text', e.target.value)}
              />
              <button
                className="add-button"
                onClick={addNewText}
                disabled={!(newText.pattern.trim() || newText.secondary_text.trim())}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="text-entries">
          <h2>Saved Texts</h2>
          {savedTexts.map((text, index) => (
            <div className="text-entry" key={index}>
              <div className="input-group">
                <input
                  type="text"
                  value={text.pattern}
                  onChange={(e) => updateSavedText(index, 'pattern', e.target.value)}
                />
                <input
                  type="text"
                  value={text.secondary_text}
                  onChange={(e) => updateSavedText(index, 'secondary_text', e.target.value)}
                />
                <button
                  className="add-button red-button"
                  onClick={() => removeSavedText(index)}
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
        <div className="code-section">
          <h2>MatrixDisplay Component Code</h2>
          <pre className="code-block">
            <code>{matrixDisplaySnippet}</code>
          </pre>
          <button className='copy-code' onClick={copyCode}>Copy Code</button>
        </div>

      <footer className="footer">
        <div>
          <p>
            Developed by <a href="https://parshipraneesh.me" target="_blank" rel="noopener noreferrer">Praneesh</a>
          </p>
        </div>
        <div className="github-URL">
          <a  href="https://github.com/PPraneesh/dot-matrix-display" target="_blank" rel="noopener noreferrer">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style={{ marginRight: '8px' }}
            >
              <path
                fill="currentColor"
                d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              />
            </svg> GitHub Repository
          </a> 
        </div>
      </footer>
    </div>
  );
}

export default App;
