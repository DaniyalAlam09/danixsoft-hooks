import Sidebar from '@/components/layout/sidebar';

/**
 * Documentation shell: persistent left rail alongside the content.
 * Marketing routes live in the sibling (marketing) group and render full width.
 */
export default function DocsGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[100rem]">
      <Sidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
