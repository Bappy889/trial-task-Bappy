// components/TruncatedText.tsx
import React from "react";
import { truncateText } from "../utils/truncateText";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength }) => {
  return <span className="truncate">{truncateText(text, maxLength)}</span>;
};

export default TruncatedText;
