export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="web-layout">{children}</div>
  );
}