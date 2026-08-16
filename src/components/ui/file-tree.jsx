import React, { createContext, useContext, useState } from "react";
import { Folder, FolderOpen, FileCode, ChevronRight, File } from "lucide-react";
import { cn } from "@/lib/utils";

const TreeContext = createContext({
  selectedId: null,
  selectItem: () => {},
  expandedIds: new Set(),
  toggleExpand: () => {},
});

export const Tree = ({
  elements = [],
  initialSelectedId = null,
  initialExpandedIds = ["src", "components", "api"],
  className,
  onSelect,
}) => {
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [expandedIds, setExpandedIds] = useState(new Set(initialExpandedIds));

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectItem = (id) => {
    setSelectedId(id);
    if (onSelect) onSelect(id);
  };

  return (
    <TreeContext.Provider
      value={{ selectedId, selectItem, expandedIds, toggleExpand }}
    >
      <div
        className={cn(
          "rounded-2xl border border-white/10 bg-zinc-950/80 p-4 font-mono text-xs text-zinc-300 select-none shadow-xl",
          className
        )}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">
          <span>Project Architecture Blueprint</span>
          <span className="text-blue-400">Interactive Tree</span>
        </div>
        <div className="space-y-1">
          {elements.map((item) => (
            <TreeItem key={item.id} item={item} level={0} />
          ))}
        </div>
      </div>
    </TreeContext.Provider>
  );
};

const TreeItem = ({ item, level = 0 }) => {
  const { selectedId, selectItem, expandedIds, toggleExpand } = useContext(TreeContext);
  const isFolder = item.type === "folder" || Array.isArray(item.children);
  const isExpanded = expandedIds.has(item.id);
  const isSelected = selectedId === item.id;

  const handleClick = () => {
    if (isFolder) {
      toggleExpand(item.id);
    }
    selectItem(item.id);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{ paddingLeft: `${level * 16 + 6}px` }}
        className={cn(
          "flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors duration-150 group",
          isSelected
            ? "bg-blue-600/20 text-blue-300 font-medium"
            : "hover:bg-white/5 text-zinc-400 hover:text-zinc-200"
        )}
      >
        {isFolder ? (
          <>
            <ChevronRight
              className={cn(
                "w-3.5 h-3.5 text-zinc-500 transition-transform duration-200",
                isExpanded && "rotate-90 text-blue-400"
              )}
            />
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 text-zinc-400 group-hover:text-blue-400" />
            )}
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <FileCode className="w-4 h-4 text-emerald-400" />
          </>
        )}

        <span className="truncate">{item.name}</span>

        {item.tag && (
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-500">
            {item.tag}
          </span>
        )}
      </div>

      {isFolder && isExpanded && item.children && (
        <div className="relative">
          <div
            style={{ left: `${level * 16 + 14}px` }}
            className="absolute top-0 bottom-0 w-[1px] bg-white/10"
          />
          {item.children.map((child) => (
            <TreeItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
