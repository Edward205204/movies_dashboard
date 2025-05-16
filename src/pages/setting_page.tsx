import { useState, useContext } from 'react';
import { Bell, Globe, Eye, Shield, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/context/theme-provider';
import { AppContext } from '@/context/app.context';

export default function SettingPage() {
  const { theme, setTheme } = useTheme();
  const { showPassword, setShowPassword } = useContext(AppContext);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('vi');

  return (
    <div className='w-full px-0 md:px-8 py-8 space-y-6'>
      <h2 className='text-3xl font-bold'>Settings</h2>

      <div className='grid gap-6'>
        {/* Interface */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Eye className='w-5 h-5' />
              Interface
            </CardTitle>
            <CardDescription>Customize application interface</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Dark Mode</Label>
                <p className='text-sm text-muted-foreground'>Switch between light and dark mode</p>
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

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Bell className='w-5 h-5' />
              Notifications
            </CardTitle>
            <CardDescription>Manage system notifications</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Enable Notifications</Label>
                <p className='text-sm text-muted-foreground'>Receive notifications about system activities</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Globe className='w-5 h-5' />
              Language
            </CardTitle>
            <CardDescription>Choose display language</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select language' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='vi'>Vietnamese</SelectItem>
                <SelectItem value='en'>English</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='w-5 h-5' />
              Security
            </CardTitle>
            <CardDescription>Customize security settings</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Show Password</Label>
                <p className='text-sm text-muted-foreground'>Display password as plain text</p>
              </div>
              <Switch checked={showPassword} onCheckedChange={setShowPassword} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
