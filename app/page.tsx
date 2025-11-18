"use client"

import { useState } from "react"
import { CustomsSidebar } from "@/components/customs-sidebar"
import { DeclarationTable } from "@/components/declaration-table"
import { DeclarationForm } from "@/components/declaration-form"
import { DashboardStats } from "@/components/dashboard-stats"
import { ReviewScreen } from "@/components/review-screen"
import { InspectionScreen } from "@/components/inspection-screen"
import { MonitoringScreen } from "@/components/monitoring-screen"
import { SearchScreen } from "@/components/search-screen"
import { ReportsScreen } from "@/components/reports-screen"
import { SettingsScreen } from "@/components/settings-screen"
import { CancelDeclarationScreen } from "@/components/cancel-declaration-screen"
import { ApprovalScreen } from "@/components/approval-screen"
import { Button } from "@/components/ui/button"
import { Bell, User } from 'lucide-react'

export default function CustomsManagement() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <CustomsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {activeTab === "dashboard" && "Tổng quan hệ thống"}
                {activeTab === "declarations" && "Danh sách tờ khai"}
                {activeTab === "new-declaration" && "Khai báo tờ khai mới"}
                {activeTab === "search" && "Tra cứu tờ khai"}
                {activeTab === "review" && "Kiểm tra hồ sơ"}
                {activeTab === "inspection" && "Kiểm tra thực tế"}
                {activeTab === "monitoring" && "Giám sát lô hàng"}
                {activeTab === "reports" && "Báo cáo thống kê"}
                {activeTab === "settings" && "Cài đặt hệ thống"}
                {activeTab === "cancel" && "Hủy tờ khai"}
                {activeTab === "approval" && "Phê duyệt tờ khai"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Hệ thống quản lý hàng quá cảnh, trung chuyển, chuyển khẩu
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <DashboardStats />
              <DeclarationTable onNewDeclaration={() => setActiveTab("new-declaration")} />
            </div>
          )}
          
          {activeTab === "declarations" && (
            <DeclarationTable onNewDeclaration={() => setActiveTab("new-declaration")} />
          )}
          
          {activeTab === "new-declaration" && <DeclarationForm />}
          
          {activeTab === "search" && <SearchScreen />}
          
          {activeTab === "review" && <ReviewScreen />}
          
          {activeTab === "inspection" && <InspectionScreen />}
          
          {activeTab === "monitoring" && <MonitoringScreen />}
          
          {activeTab === "reports" && <ReportsScreen />}
          
          {activeTab === "settings" && <SettingsScreen />}
          
          {activeTab === "cancel" && <CancelDeclarationScreen />}
          
          {activeTab === "approval" && <ApprovalScreen />}
        </main>
      </div>
    </div>
  )
}
