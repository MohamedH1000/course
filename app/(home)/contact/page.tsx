"use client"
import React from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const ContactPage = () => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary animate-fade-in">
            {t("contact.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-200">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card animate-scale-in">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">
                {t("contact.info.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {t("contact.info.center")}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {t("contact.info.country")}
                  <br />
                  {t("contact.info.address")}
                  <br />
                  {t("contact.info.building")}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {t("contact.info.phone_title")}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {t("contact.info.customer_service")}
                  <br />
                  {t("contact.info.partnerships")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card animate-scale-in delay-200">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">
                {t("contact.form.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg font-semibold">
                    {t("contact.form.name")}
                  </Label>
                  <Input
                    id="name"
                    placeholder={t("contact.form.name.placeholder")}
                    className="bg-input border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-semibold">
                    {t("contact.form.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("contact.form.email.placeholder")}
                    className="bg-input border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-lg font-semibold">
                    {t("contact.form.message")}
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder={t("contact.form.message.placeholder")}
                    className="bg-input border-border focus:ring-primary"
                  />
                </div>
                <div className="text-right">
                  <Button
                    type="submit"
                    className="btn-primary text-lg px-8 py-3 animate-glow"
                  >
                    {t("contact.form.submit")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContactPage