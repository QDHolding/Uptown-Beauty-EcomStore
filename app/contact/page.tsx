"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import gsap from "gsap"

export default function ContactPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(
      formRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    )

    tl.from(
      infoRef.current,
      {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )

    // Add loaded class for page transition
    const pageElement = document.querySelector(".page-transition")
    if (pageElement) {
      pageElement.classList.add("loaded")
    }

    return () => {
      tl.kill()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    setIsSubmitting(false)

    // Reset form
    e.currentTarget.reset()
  }

  return (
    <main className="page-transition">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 ref={titleRef} className="text-4xl font-bold tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Have questions about our products or want to learn more about our non-profit work? We'd love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="Your email" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" name="subject" placeholder="What's this about?" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" name="message" placeholder="Your message" rows={6} required />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div ref={infoRef} className="lg:col-span-1">
            <div className="bg-muted p-6 rounded-lg h-full">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Fashion Avenue
                      <br />
                      Los Angeles, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-muted-foreground">hello@uptownlaboutique.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-muted-foreground">(213) 555-1234</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium mb-2">Store Hours</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>10am - 7pm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>11am - 6pm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>12pm - 5pm</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52861.675258756!2d-118.40952349577714!3d34.09060048860779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf07045279bf%3A0xf67a9a6797bdfae4!2sHollywood%2C%20Los%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1709507636387!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

