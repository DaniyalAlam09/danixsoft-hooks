/**
 * Marketing shell: no sidebar, so landing, guide and comparison pages get the
 * full viewport for their own layout.
 */
export default function MarketingGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}
