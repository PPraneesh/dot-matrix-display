export interface TextItem {
    pattern: string;
    secondary_text: string;
}
  
export interface MatrixDisplayProps {
    texts: TextItem[];
    duration?: number; // Duration in milliseconds, optional with default
}
type BinaryMatrix = number[][];
export type CharacterMap = { [key: string]: BinaryMatrix };
export type Pattern = number[][];
export type CharPattern = number[][];
