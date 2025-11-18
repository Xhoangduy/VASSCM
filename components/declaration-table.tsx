"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, FileEdit, Trash2, Search, Filter, Download, Plus } from 'lucide-react'
import { cn } from "@/lib/utils"

type Declaration = {
  id: string
  declarationNumber: string
  date: string
  type: "QC" | "TC" | "CCK"
  company: string
  status: "pending" | "processing" | "approved" | "rejected" | "cancelled"
  lane: "green" | "yellow" | "red"
  port: string
}

const mockData: Declaration[] = [
  {
    id: "1",
    declarationNumber: "QC2024001234",
    date: "2024-01-15",
    type: "QC",
    company: "Công ty TNHH ABC",
    status: "processing",
    lane: "yellow",
    port: "Lào Cai"
  },
  {
    id: "2",
    declarationNumber: "TC2024001235",
    date: "2024-01-14",
    type: "TC",
    company: "Công ty CP XYZ",
    status: "approved",
    lane: "green",
    port: "Hải Phòng"
  },
  {
    id: "3",
    declarationNumber: "QC2024001236",
    date: "2024-01-14",
    type: "QC",
    company: "Công ty TNHH DEF",
    status: "pending",
    lane: "red",
    port: "Mộc Bài"
  },
  {
    id: "4",
    declarationNumber: "CCK2024001237",
    date: "2024-01-13",
    type: "CCK",
    company: "Tập đoàn GHI",
    status: "processing",
    lane: "yellow",
    port: "Tân Sơn Nhất"
  },
  {
    id: "5",
    declarationNumber: "QC2024001238",
    date: "2024-01-13",
    type: "QC",
    company: "Công ty TNHH JKL",
    status: "approved",
    lane: "green",
    port: "Lạng Sơn"
  },
]

const statusLabels = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  approved: "Đã phê duyệt",
  rejected: "Từ chối",
  cancelled: "Đã hủy"
}

const statusColors = {
  pending: "bg-warning text-warning-foreground",
  processing: "bg-info text-info-foreground",
  approved: "bg-success text-success-foreground",
  rejected: "bg-destructive text-destructive-foreground",
  cancelled: "bg-muted text-muted-foreground"
}

const laneLabels = {
  green: "Luồng Xanh",
  yellow: "Luồng Vàng",
  red: "Luồng Đỏ"
}

const laneColors = {
  green: "bg-success text-success-foreground",
  yellow: "bg-warning text-warning-foreground",
  red: "bg-destructive text-destructive-foreground"
}

export function DeclarationTable({ onNewDeclaration }: { onNewDeclaration?: () => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [laneFilter, setLaneFilter] = useState<string>("all")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Danh sách tờ khai quá cảnh, trung chuyển, chuyển khẩu</CardTitle>
            <CardDescription>Quản lý tờ khai quá cảnh, trung chuyển và chuyển khẩu</CardDescription>
          </div>
          <Button 
            className="gap-2 bg-primary hover:bg-primary/90"
            onClick={onNewDeclaration}
          >
            <Plus className="h-4 w-4" />
            Khai báo mới
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo số tờ khai, công ty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
              <SelectItem value="processing">Đang xử lý</SelectItem>
              <SelectItem value="approved">Đã phê duyệt</SelectItem>
              <SelectItem value="rejected">Từ chối</SelectItem>
            </SelectContent>
          </Select>
          <Select value={laneFilter} onValueChange={setLaneFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Luồng kiểm tra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả luồng</SelectItem>
              <SelectItem value="green">Luồng Xanh</SelectItem>
              <SelectItem value="yellow">Luồng Vàng</SelectItem>
              <SelectItem value="red">Luồng Đỏ</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Xuất Excel
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Số tờ khai</TableHead>
                <TableHead className="font-semibold">Ngày khai</TableHead>
                <TableHead className="font-semibold">Loại</TableHead>
                <TableHead className="font-semibold">Doanh nghiệp</TableHead>
                <TableHead className="font-semibold">Cửa khẩu</TableHead>
                <TableHead className="font-semibold">Luồng</TableHead>
                <TableHead className="font-semibold">Trạng thái</TableHead>
                <TableHead className="text-right font-semibold">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((declaration) => (
                <TableRow key={declaration.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-primary">
                    {declaration.declarationNumber}
                  </TableCell>
                  <TableCell>{declaration.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {declaration.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{declaration.company}</TableCell>
                  <TableCell>{declaration.port}</TableCell>
                  <TableCell>
                    <Badge className={cn("font-medium", laneColors[declaration.lane])}>
                      {laneLabels[declaration.lane]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("font-medium", statusColors[declaration.status])}>
                      {statusLabels[declaration.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Hiển thị 1-5 trong tổng số 248 tờ khai
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Trước</Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Sau</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
