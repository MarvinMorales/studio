import Header from '@/components/header';
import Footer from '@/components/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Calendar } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "intro",
      title: "Introducción",
      content: [
        "La presente Política de Privacidad establece los términos en que One Security usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo, esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios."
      ]
    },
    {
      id: "info-recogida",
      title: "Información que es recogida",
      content: [
        "Nuestro sitio web podrá recoger información personal, por ejemplo: Nombre, información de contacto como su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación."
      ]
    },
    {
      id: "uso-info",
      title: "Uso de la información recogida",
      content: [
        "Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularly para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios. Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.",
        "One Security está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado."
      ]
    },
    {
      id: "cookies",
      title: "Cookies",
      content: [
        "Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.",
        "Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo, las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente. Usted puede aceptar o negar el uso de cookies, sin embargo, la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios."
      ]
    },
    {
      id: "enlaces-terceros",
      title: "Enlaces a Terceros",
      content: [
        "Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas."
      ]
    },
    {
      id: "control-info",
      title: "Control de su información personal",
      content: [
        "En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web. Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico. En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.",
        "Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.",
        "One Security Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento."
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
              <h1 className="text-4xl font-headline font-bold text-foreground mb-2">Política de Privacidad</h1>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Última actualización: 24 de julio de 2024
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
              <p className="text-muted-foreground text-center">
                Por favor, lea esta Política de Privacidad cuidadosamente. Al acceder o utilizar nuestro sitio web, usted acepta estar sujeto a los términos aquí descritos.
              </p>
            </div>

            <Accordion type="multiple" defaultValue={allSectionIds} className="w-full space-y-4">
              {sections.map((section) => (
                <AccordionItem key={section.id} value={section.id} className="bg-card shadow-sm rounded-lg">
                  <AccordionTrigger className="text-lg font-semibold px-6 py-4 hover:no-underline">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-4 text-muted-foreground">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
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
