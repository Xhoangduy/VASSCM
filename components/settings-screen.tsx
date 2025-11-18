"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Save, User, Bell, Shield, Database, Globe, Clock } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

export function SettingsScreen() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Cài đặt hệ thống</CardTitle>
          <CardDescription>Quản lý cấu hình và tham số hệ thống hải quan</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Hồ sơ</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Thông báo</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Bảo mật</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="gap-2">
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">Hệ thống</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Tùy chọn</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Thông tin cán bộ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Họ và tên *</Label>
                      <Input id="full-name" defaultValue="Nguyễn Văn A" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employee-id">Mã cán bộ *</Label>
                      <Input id="employee-id" defaultValue="CB2024001" disabled />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" defaultValue="canbo@customs.gov.vn" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" defaultValue="0901234567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Đơn vị</Label>
                      <Select defaultValue="lao-cai">
                        <SelectTrigger id="department">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lao-cai">Chi cục HQ Lào Cai</SelectItem>
                          <SelectItem value="lang-son">Chi cục HQ Lạng Sơn</SelectItem>
                          <SelectItem value="moc-bai">Chi cục HQ Mộc Bài</SelectItem>
                          <SelectItem value="hai-phong">Chi cục HQ Hải Phòng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Chức vụ</Label>
                      <Input id="position" defaultValue="Chuyên viên" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Chữ ký số</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Chứng thư số hiện tại</p>
                          <p className="text-sm text-muted-foreground">Hết hạn: 31/12/2025</p>
                        </div>
                      </div>
                      <Button variant="outline">Cập nhật</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Hủy</Button>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Thông báo email</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Tờ khai mới</p>
                        <p className="text-sm text-muted-foreground">Nhận thông báo khi có tờ khai mới chờ xử lý</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Phân luồng kiểm tra</p>
                        <p className="text-sm text-muted-foreground">Thông báo kết quả phân luồng tự động</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Cảnh báo vi phạm</p>
                        <p className="text-sm text-muted-foreground">Cảnh báo khi phát hiện vi phạm hoặc bất thường</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Báo cáo hàng ngày</p>
                        <p className="text-sm text-muted-foreground">Tổng hợp hoạt động hàng ngày</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Thông báo trên hệ thống</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Âm thanh thông báo</p>
                        <p className="text-sm text-muted-foreground">Phát âm thanh khi có thông báo mới</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Thông báo trình duyệt</p>
                        <p className="text-sm text-muted-foreground">Hiển thị thông báo desktop</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Hủy</Button>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Lưu cài đặt
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Đổi mật khẩu</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mật khẩu hiện tại *</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">Mật khẩu mới *</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Xác nhận mật khẩu mới *</Label>
                      <Input id="confirm-password" type="password" />
                    </div>

                    <Button className="gap-2">
                      <Shield className="h-4 w-4" />
                      Đổi mật khẩu
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Xác thực hai yếu tố (2FA)</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Trạng thái 2FA</p>
                        <p className="text-sm text-muted-foreground">Chưa kích hoạt</p>
                      </div>
                      <Button variant="outline">Kích hoạt</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Lịch sử đăng nhập</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg text-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">01/15/2024 09:30</p>
                          <p className="text-muted-foreground">IP: 192.168.1.100</p>
                        </div>
                      </div>
                      <span className="text-muted-foreground">Chrome, Windows</span>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg text-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">01/14/2024 15:20</p>
                          <p className="text-muted-foreground">IP: 192.168.1.100</p>
                        </div>
                      </div>
                      <span className="text-muted-foreground">Chrome, Windows</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Cấu hình phân luồng</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="green-threshold">Ngưỡng luồng xanh (điểm rủi ro)</Label>
                      <Input id="green-threshold" type="number" defaultValue="30" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yellow-threshold">Ngưỡng luồng vàng (điểm rủi ro)</Label>
                      <Input id="yellow-threshold" type="number" defaultValue="60" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="auto-approval">Tự động phê duyệt luồng xanh</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger id="auto-approval">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Bật</SelectItem>
                          <SelectItem value="disabled">Tắt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="review-time">Thời gian kiểm tra tối đa (giờ)</Label>
                      <Input id="review-time" type="number" defaultValue="24" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Quản lý danh mục</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Quản lý danh sách cửa khẩu
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Quản lý tuyến đường vận chuyển
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Quản lý mã HS Code
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Quản lý danh sách doanh nghiệp
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Hủy</Button>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Lưu cấu hình
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Giao diện</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="language">Ngôn ngữ</Label>
                        <Select defaultValue="vi">
                          <SelectTrigger id="language">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vi">Tiếng Việt</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Múi giờ</Label>
                        <Select defaultValue="vn">
                          <SelectTrigger id="timezone">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vn">GMT+7 (Việt Nam)</SelectItem>
                            <SelectItem value="utc">UTC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date-format">Định dạng ngày</Label>
                        <Select defaultValue="dd-mm-yyyy">
                          <SelectTrigger id="date-format">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="items-per-page">Số bản ghi mỗi trang</Label>
                        <Select defaultValue="20">
                          <SelectTrigger id="items-per-page">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Tùy chọn hiển thị</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Hiển thị hướng dẫn</p>
                        <p className="text-sm text-muted-foreground">Hiện tooltip hướng dẫn sử dụng</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Chế độ sidebar</p>
                        <p className="text-sm text-muted-foreground">Hiện thanh bên mặc định</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Animation</p>
                        <p className="text-sm text-muted-foreground">Hiệu ứng chuyển động</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Hủy</Button>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Lưu tùy chọn
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
