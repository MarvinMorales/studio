import Header from '@/components/header';
import Footer from '@/components/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Calendar } from "lucide-react";

export default function TermsAndConditionsPage() {
  const sections = [
    {
      id: "info-relevante",
      title: "1. INFORMACIÓN RELEVANTE",
      content: [
        "Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios así como la compra de nuestros productos implicará que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todas los productos que son ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas o presentadas por una página web tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. En algunos casos, para adquirir un producto, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña.",
        "El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para la compra de alguno de nuestros productos. retailpointecuador.com no asume la responsabilidad en caso de que entregue dicha clave a terceros.",
        "Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura (en caso de existir) y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. En algunos casos puede que se requiera una verificación por medio de correo electrónico.",
        "Los precios de los productos ofrecidos en esta Tienda Online es válido solamente en las compras realizadas en este sitio web."
      ]
    },
    {
      id: "licencia",
      title: "2. LICENCIA",
      content: [
        "Retail Point a través de su sitio web concede una licencia para que los usuarios utilicen los productos que son vendidos en este sitio web de acuerdo a los Términos y Condiciones que se describen en este documento."
      ]
    },
    {
      id: "uso-no-autorizado",
      title: "3. USO NO AUTORIZADO",
      content: [
        "En caso de que aplique (para venta de software, templetes, u otro producto de diseño y programación) usted no puede colocar uno de nuestros productos, modificado o sin modificar, en un CD, sitio web o ningún otro medio y ofrecerlos para la redistribución o la reventa de ningún tipo."
      ]
    },
    {
      id: "propiedad",
      title: "4. PROPIEDAD",
      content: [
        "Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan sin ningún tipo de garantía, expresa o implícita. En ningún esta compañía será responsables de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos."
      ]
    },
    {
      id: "reembolso",
      title: "5. POLÍTICA DE REEMBOLSO Y GARANTÍA",
      content: [
        "En el caso de productos que sean mercancías irrevocables no-tangibles, no realizamos reembolsos después de que se envíe el producto, usted tiene la responsabilidad de entender antes de comprarlo. Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripción no se ajusta al producto. Hay algunos productos que pudieran tener garantía y posibilidad de reembolso pero este será especificado al comprar el producto. En tales casos la garantía solo cubrirá fallas de fábrica y sólo se hará efectiva cuando el producto se haya usado correctamente. La garantía no cubre averías o daños ocasionados por uso indebido. Los términos de la garantía están asociados a fallas de fabricación y funcionamiento en condiciones normales de los productos y sólo se harán efectivos estos términos si el equipo ha sido usado correctamente. Esto incluye:",
        "• De acuerdo a las especificaciones técnicas indicadas para cada producto.",
        "• En condiciones ambientales acorde con las especificaciones indicadas por el fabricante.",
        "• En uso específico para la función con que fue diseñado de fábrica.",
        "• En condiciones de operación eléctricas acorde con las especificaciones y tolerancias indicadas."
      ]
    },
    {
      id: "antifraude",
      title: "6. COMPROBACIÓN ANTIFRAUDE",
      content: [
        "La compra del cliente puede ser aplazada para la comprobación antifraude. También puede ser suspendida por más tiempo para una investigación más rigurosa, para evitar transacciones fraudulentas."
      ]
    },
    {
      id: "privacidad",
      title: "7. PRIVACIDAD",
      content: [
        "Este sitio web retailpointecuador.com garantiza que la <a href='/privacy-policy' class='text-primary hover:underline'>información personal</a> que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales.",
        "La suscripción a boletines de correos electrónicos publicitarios es voluntaria y podría ser seleccionada al momento de crear su cuenta.",
        "Retail Point reserva los derechos de cambiar o de modificar estos términos sin previo aviso."
      ]
    }
  ];

  const allSectionIds = sections.map(section => section.id);

  return (
    <div className="flex flex-col min-h-screen bg-secondary/40">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <FileText className="mx-auto h-12 w-12 text-primary mb-4" />
              <h1 className="text-4xl font-headline font-bold text-foreground mb-2">Términos y Condiciones</h1>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Última actualización: 24 de julio de 2024
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
              <p className="text-muted-foreground text-center">
                Por favor, lea estos Términos y Condiciones cuidadosamente antes de usar nuestro sitio web. Al acceder o utilizar nuestro sitio web, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al sitio web.
              </p>
            </div>

            <Accordion type="multiple" defaultValue={allSectionIds} className="w-full space-y-4">
              {sections.map((section, index) => (
                <AccordionItem key={section.id} value={section.id} className="bg-card shadow-sm rounded-lg">
                  <AccordionTrigger className="text-lg font-semibold px-6 py-4 hover:no-underline">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-4 text-muted-foreground">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph.startsWith('•') ? `<ul class="list-disc list-inside ml-4"><li>${paragraph.substring(1).trim()}</li></ul>` : paragraph }} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
