interface CalloutProps {
  emoji?: string | null;
  text?: string | null;
  children: React.ReactNode;
}

export const Callout = ({ emoji = null, text = null, children }: CalloutProps) => (
  <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-start p-3 my-6 text-base rounded-lg shadow-sm">
    {emoji && <span className="block w-6 text-center mr-2 scale-[1.2]">{emoji}</span>}
    <span className="block grow text-neutral-800 dark:text-neutral-200">{text ?? children}</span>
  </div>
);
