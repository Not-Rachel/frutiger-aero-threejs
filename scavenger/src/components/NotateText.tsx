import { useState, type ReactNode } from "react";
import { RoughNotation, type types } from "react-rough-notation";
interface NotateTextProps {
  children: ReactNode;
  type?: types;
}

function NotateText({ children, type = "underline" }: NotateTextProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="rotate-5"
    >
      <div className="-rotate-5">
        <RoughNotation
          type={type}
          show={isHovering}
          strokeWidth={2}
          iterations={3}
          padding={0}
        >
          {children}
        </RoughNotation>
      </div>
    </div>
  );
}
export default NotateText;
