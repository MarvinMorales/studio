
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Building } from "lucide-react";
import { websiteData } from "@/lib/data";

const formSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { businessInformation } = websiteData;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    const subject = `Nuevo mensaje de contacto de ${values.firstName} ${values.lastName}`;
    const body = `
      Nombre: ${values.firstName}
      Apellido: ${values.lastName}
      Email: ${values.email}
      Teléfono: ${values.phone || "No proporcionado"}
      
      Mensaje:
      ${values.message}
    `;
    const mailtoLink = `mailto:${businessInformation.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/40">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-headline font-bold text-foreground mb-2">Contáctanos</h1>
              <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Estamos aquí para ayudarte. Completa el formulario o utiliza la información de contacto para comunicarte con nosotros.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-card p-8 rounded-lg shadow-lg">
                <h2 className="font-headline text-2xl font-bold mb-6">Información de Contacto</h2>
                <ul className="space-y-6 text-muted-foreground">
                  <li className="flex items-start">
                    <Building className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-foreground">Oficina Principal</h3>
                        <span>{businessInformation.address}</span>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-6 w-6 mr-4 text-primary flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <a href={`mailto:${businessInformation.contactEmail}`} className="hover:text-primary transition-colors">{businessInformation.contactEmail}</a>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-6 w-6 mr-4 text-primary flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-foreground">Teléfono</h3>
                        <a href={`tel:${businessInformation.whatsappNumber}`} className="hover:text-primary transition-colors">{businessInformation.whatsappNumber}</a>
                    </div>
                  </li>
                </ul>
                 <div className="mt-8 rounded-lg overflow-hidden shadow-md">
                   <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.969874836691!2d-79.88891562590215!3d-2.158580737409225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d6d7a2729377d%3A0x60959f63548b2513!2sOne%20Security!5e0!3m2!1ses!2sec!4v1721865389332!5m2!1ses!2sec"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                 </div>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-lg">
                 <h2 className="font-headline text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Teléfono (Opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Escribe tu consulta aquí..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" size="lg">Enviar Mensaje</Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    