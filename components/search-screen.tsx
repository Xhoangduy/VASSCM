"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, FileText, Calendar, Building2, MapPin } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type SearchResult = {
  id: string
  declarationNumber: string
  date: string
  type: "QC" | "TC" | "CCK"
  company: string
  status: "pending" | "processing" | "approved" | "rejected" | "cancelled"
  lane: "green" | "yellow" | "red"
  port: string
}

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

export function SearchScreen() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    // Mock search results
    const mockResults: SearchResult[] = [
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
        declarationNumber: "QC2024001235",
        date: "2024-01-14",
        type: "QC",
        company: "Công ty TNHH ABC",
        status: "approved",
        lane: "green",
        port: "Lào Cai"
      },
    ]
    setSearchResults(mockResults)
    setHasSearched(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Tra cứu tờ khai</CardTitle>
          <CardDescription>Tìm kiếm thông tin tờ khai quá cảnh, trung chuyển và chuyển khẩu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="search-number" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Số tờ khai
                </Label>
                <Input 
                  id="search-number" 
                  placeholder="VD: QC2024001234"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-company" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Doanh nghiệp
                </Label>
                <Input 
                  id="search-company" 
                  placeholder="Tên hoặc mã số doanh nghiệp"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-type">Loại tờ khai</Label>
                <Select>
                  <SelectTrigger id="search-type">
                    <SelectValue placeholder="Tất cả loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="QC">Quá cảnh (QC)</SelectItem>
                    <SelectItem value="TC">Trung chuyển (TC)</SelectItem>
                    <SelectItem value="CCK">Chuyển khẩu (CCK)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-from-date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Từ ngày
                </Label>
                <Input 
                  id="search-from-date" 
                  type="date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-to-date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Đến ngày
                </Label>
                <Input 
                  id="search-to-date" 
                  type="date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-port" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Cửa khẩu
                </Label>
                <Select>
                  <SelectTrigger id="search-port">
                    <SelectValue placeholder="Chọn cửa khẩu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả cửa khẩu</SelectItem>
                    <SelectItem value="lao-cai">Chi cục HQ Lào Cai</SelectItem>
                    <SelectItem value="lang-son">Chi cục HQ Lạng Sơn</SelectItem>
                    <SelectItem value="moc-bai">Chi cục HQ Mộc Bài</SelectItem>
                    <SelectItem value="hai-phong">Chi cục HQ Hải Phòng</SelectItem>
                    <SelectItem value="tan-thanh">Chi cục HQ Tân Thanh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-status">Trạng thái</Label>
                <Select>
                  <SelectTrigger id="search-status">
                    <SelectValue placeholder="Tất cả trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="processing">Đang xử lý</SelectItem>
                    <SelectItem value="approved">Đã phê duyệt</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-lane">Luồng kiểm tra</Label>
                <Select>
                  <SelectTrigger id="search-lane">
                    <SelectValue placeholder="Tất cả luồng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả luồng</SelectItem>
                    <SelectItem value="green">Luồng Xanh</SelectItem>
                    <SelectItem value="yellow">Luồng Vàng</SelectItem>
                    <SelectItem value="red">Luồng Đỏ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-container">Số container</Label>
                <Input 
                  id="search-container" 
                  placeholder="Số container"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSearch} className="gap-2">
                <Search className="h-4 w-4" />
                Tìm kiếm
              </Button>
              <Button variant="outline">Xóa bộ lọc</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Kết quả tìm kiếm</CardTitle>
            <CardDescription>
              Tìm thấy {searchResults.length} tờ khai phù hợp
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchResults.length > 0 ? (
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
                    {searchResults.map((result) => (
                      <TableRow key={result.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium text-primary">
                          {result.declarationNumber}
                        </TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {result.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{result.company}</TableCell>
                        <TableCell>{result.port}</TableCell>
                        <TableCell>
                          <Badge className={cn("font-medium", laneColors[result.lane])}>
                            {laneLabels[result.lane]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("font-medium", statusColors[result.status])}>
                            {statusLabels[result.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                              <FileText className="h-4 w-4" />
                              Chi tiết
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Không tìm thấy kết quả phù hợp</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Vui lòng thử lại với các tiêu chí tìm kiếm khác
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
