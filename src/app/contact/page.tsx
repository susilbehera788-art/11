import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mapImage = PlaceHolderImages.find((img) => img.id === 'contact-map');

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">
          Get In Touch
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We'd love to hear from you. Here's how you can reach us.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-muted-foreground">
                  Wankhede Stadium, D Road, Churchgate, Mumbai, Maharashtra 400020, India
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Mobile</h3>
                <p className="text-muted-foreground">+91 84804 47800</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">contact@bcc.example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Our Location</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.256860010908!2d72.82298731538006!3d18.92203926210284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e0181a6f1b%3A0x29ce11045e433c2a!2sWankhede%20Stadium!5e0!3m2!1sen!2sin!4v1678886363333!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Company Location on Google Maps"
                    ></iframe>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
