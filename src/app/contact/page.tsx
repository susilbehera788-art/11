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
                  e/35, sector-9, cda, cuttack. 753014
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
                <p className="text-muted-foreground">susil.behera@lotuss.work</p>
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
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3741.050329023485!2d85.8295697750731!3d20.48000308115598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDI4JzQ4LjAiTiA4NcKwNDknNDguOSJF!5e0!3m2!1sen!2sus!4v1719504789523!5m2!1sen!2sus"
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
