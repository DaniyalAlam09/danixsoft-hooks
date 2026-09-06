import SidebarNav from './sidebar-nav';

/** Desktop-only left rail. */
export default function Sidebar() {
  return (
    <aside className="sticky top-(--header-h) hidden h-[calc(100vh-var(--header-h))] w-64 shrink-0 border-r border-border px-4 py-6 lg:block xl:w-68">
      <SidebarNav />
    </aside>
  );
}
