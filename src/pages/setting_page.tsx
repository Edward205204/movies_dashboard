import { useState } from 'react';
import { Bell, Globe, Eye, Shield, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/context/theme-provider';

export default function SettingPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('vi');

  return (
    <div className='w-full px-0 md:px-8 py-8 space-y-6'>
      <h2 className='text-3xl font-bold'>Cài đặt</h2>

      <div className='grid gap-6'>
        {/* Giao diện */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Eye className='w-5 h-5' />
              Giao diện
            </CardTitle>
            <CardDescription>Tùy chỉnh giao diện ứng dụng</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Chế độ tối</Label>
                <p className='text-sm text-muted-foreground'>Chuyển đổi giữa chế độ sáng và tối</p>
              </div>
              <div className='flex items-center gap-2'>
                <Sun className='w-4 h-4' />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
                <Moon className='w-4 h-4' />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thông báo */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Bell className='w-5 h-5' />
              Thông báo
            </CardTitle>
            <CardDescription>Quản lý thông báo hệ thống</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Bật thông báo</Label>
                <p className='text-sm text-muted-foreground'>Nhận thông báo về các hoạt động trong hệ thống</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Ngôn ngữ */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Globe className='w-5 h-5' />
              Ngôn ngữ
            </CardTitle>
            <CardDescription>Chọn ngôn ngữ hiển thị</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Chọn ngôn ngữ' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='vi'>Tiếng Việt</SelectItem>
                <SelectItem value='en'>English</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Bảo mật */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='w-5 h-5' />
              Bảo mật
            </CardTitle>
            <CardDescription>Tùy chỉnh cài đặt bảo mật</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Hiển thị mật khẩu</Label>
                <p className='text-sm text-muted-foreground'>Hiển thị mật khẩu dưới dạng văn bản</p>
              </div>
              <Switch checked={showPassword} onCheckedChange={setShowPassword} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
