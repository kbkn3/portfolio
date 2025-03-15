import type { TimelineItem } from "~/lib/timeline-data";
import { getActionType } from "~/lib/timeline-utils";

interface ActionIconProps {
  type: TimelineItem["type"];
}

// アクションに応じたアイコンを表示するコンポーネント
const ActionIcon = ({ type }: ActionIconProps) => {
  const actionType = getActionType(type);
  
  switch (actionType) {
    case "post":
      return (
        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <title>投稿</title>
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      );
    case "released":
      return (
        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <title>リリース</title>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case "others":
      return (
        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
          <title>その他</title>
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      );
  }
};

// Twitterアイコン
export const TwitterIcon = () => (
  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
    <title>Twitter</title>
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
  </svg>
);

export default ActionIcon; 