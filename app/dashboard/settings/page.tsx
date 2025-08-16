"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/components/language-provider"
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Camera,
  Save,
  Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const { user } = useAuth()
  const { t, isRTL, language, setLanguage } = useLanguage()

  return (
    <div className={cn("space-y-6", isRTL ? "rtl" : "ltr")}>
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t("dashboard.settings")}</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { id: 'profile', label: t("dashboard.profile"), icon: User },
                { id: 'notifications', label: t("dashboard.notifications"), icon: Bell },
                { id: 'privacy', label: 'Privacy & Security', icon: Shield },
                { id: 'appearance', label: 'Appearance', icon: Palette },
                { id: 'language', label: 'Language & Region', icon: Globe }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
                      isRTL ? "flex-row-reverse text-right" : "",
                      "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                "flex items-center gap-2",
                isRTL ? "flex-row-reverse" : ""
              )}>
                <User className="h-5 w-5" />
                {t("dashboard.personal_information")}
              </CardTitle>
              <CardDescription>
                {t("dashboard.personal_info_desc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className={cn(
                "flex items-center gap-6",
                isRTL ? "flex-row-reverse" : ""
              )}>
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className={cn(
                    "flex items-center gap-2",
                    isRTL ? "flex-row-reverse" : ""
                  )}>
                    <Camera className="h-4 w-4" />
                    {t("dashboard.change_photo")}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Personal Information Form */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    defaultValue={user?.name?.split(' ')[0]} 
                    className={cn(isRTL ? "text-right" : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    defaultValue={user?.name?.split(' ').slice(1).join(' ')} 
                    className={cn(isRTL ? "text-right" : "")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">{t("dashboard.email")}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email} 
                    className={cn(isRTL ? "text-right" : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    className={cn(isRTL ? "text-right" : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="gmt">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className={cn(
                "flex items-center gap-2",
                isRTL ? "flex-row-reverse" : ""
              )}>
                <Save className="h-4 w-4" />
                {t("dashboard.update_profile")}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                "flex items-center gap-2",
                isRTL ? "flex-row-reverse" : ""
              )}>
                <Bell className="h-5 w-5" />
                {t("dashboard.notifications")}
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: t("dashboard.course_updates"),
                  description: "Get notified about new lessons and course updates",
                  defaultChecked: true
                },
                {
                  title: t("dashboard.course_recommendations"),
                  description: "Receive personalized course recommendations",
                  defaultChecked: true
                },
                {
                  title: "Assignment Reminders",
                  description: "Get reminded about upcoming assignment deadlines",
                  defaultChecked: true
                },
                {
                  title: t("dashboard.marketing_emails"),
                  description: "Receive promotional emails and special offers",
                  defaultChecked: false
                },
                {
                  title: "Weekly Progress Report",
                  description: "Get a weekly summary of your learning progress",
                  defaultChecked: true
                }
              ].map((notification, index) => (
                <div key={index} className={cn(
                  "flex items-center justify-between space-x-2",
                  isRTL ? "flex-row-reverse space-x-reverse" : ""
                )}>
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">
                      {notification.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                  <Switch defaultChecked={notification.defaultChecked} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                "flex items-center gap-2",
                isRTL ? "flex-row-reverse" : ""
              )}>
                <Globe className="h-5 w-5" />
                Language & Region
              </CardTitle>
              <CardDescription>
                Set your language and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">{t("dashboard.preferred_language")}</Label>
                <Select value={language} onValueChange={(value: "en" | "ar") => setLanguage(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية (Arabic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="ae">United Arab Emirates</SelectItem>
                    <SelectItem value="sa">Saudi Arabia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={cn(
                "flex items-center justify-between p-4 border border-destructive/20 rounded-lg",
                isRTL ? "flex-row-reverse" : ""
              )}>
                <div>
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive" size="sm" className={cn(
                  "flex items-center gap-2",
                  isRTL ? "flex-row-reverse" : ""
                )}>
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}