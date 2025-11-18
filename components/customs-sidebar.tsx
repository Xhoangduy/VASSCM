"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileText, Package, CheckCircle, AlertCircle, BarChart3, Settings, Home, ClipboardList, Search, FileEdit, Trash2, Eye, ChevronRight } from 'lucide-react'
import { useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function CustomsSidebar({ className, activeTab = "dashboard", onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: Home },
    { id: "declarations", label: "Danh sách tờ khai", icon: FileText },
    { id: "new-declaration", label: "Khai báo mới", icon: ClipboardList },
    { id: "search", label: "Tra cứu", icon: Search },
    { id: "review", label: "Kiểm tra hồ sơ", icon: CheckCircle },
    { id: "inspection", label: "Kiểm tra thực tế", icon: Eye },
    { id: "monitoring", label: "Giám sát lô hàng", icon: Package },
    { id: "reports", label: "Báo cáo thống kê", icon: BarChart3 },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ]

  return (
    <div className={cn(
      "bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
                <Package className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Hải Quan VN</h2>
                <p className="text-xs text-sidebar-foreground/70">Quản lý quá cảnh, trung chuyển, chuyển khẩu</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronRight className={cn("h-4 w-4 transition-transform", !collapsed && "rotate-180")} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 transition-colors",
                  isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                  !isActive && "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                  collapsed && "justify-center px-2"
                )}
                onClick={() => onTabChange?.(item.id)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-sidebar-accent-foreground">CB</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Cán bộ HQ</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">canbo@customs.gov.vn</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
