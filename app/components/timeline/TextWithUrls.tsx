import type { ReactNode } from "react";

interface TextWithUrlsProps {
  text: string;
}

// URLを検出してリンクカラーで表示するコンポーネント
const TextWithUrls = ({ text }: TextWithUrlsProps) => {
  // URLを検出する正規表現
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  if (!text) return null;
  
  // URLを含まないテキストはそのまま返す
  if (!urlRegex.test(text)) return <>{text}</>;
  
  // 正規表現をリセット
  urlRegex.lastIndex = 0;
  
  // テキストをURLで分割し、URLを青色で表示
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  
  // biome-ignore lint/suspicious/noAssignInExpressions: 正規表現の一般的な使用方法
  while ((match = urlRegex.exec(text)) !== null) {
    // URLの前のテキスト
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
    }
    
    // URL部分
    parts.push(
      <span key={`url-${match.index}`} className="text-blue-400 break-all">
        {match[0]}
      </span>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // 残りのテキスト
  if (lastIndex < text.length) {
    parts.push(
      <span key={`text-${lastIndex}`}>
        {text.substring(lastIndex)}
      </span>
    );
  }
  
  return <>{parts}</>;
};

export default TextWithUrls; 