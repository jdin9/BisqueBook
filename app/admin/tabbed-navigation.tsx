'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabbedNavigationProps = {
  tabs: Tab[];
};

export default function TabbedNavigation({ tabs }: TabbedNavigationProps) {
  const firstTabId = useMemo(() => tabs[0]?.id ?? '', [tabs]);
  const [activeTab, setActiveTab] = useState(firstTabId);

  if (!tabs.length) return null;

  return (
    <div className="space-y-4">
      <div role="tablist" aria-label="Admin sections" className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={
                'rounded-md px-4 py-2 text-sm font-medium ring-1 ring-slate-200 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 ' +
                (isActive ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100')
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div>
        {tabs.map((tab) =>
          tab.id === activeTab ? (
            <div key={tab.id} role="tabpanel" className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
