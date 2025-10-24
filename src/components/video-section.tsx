export default function VideoSection() {
    return (
      <section id="video" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Tecnología que Inspira Confianza</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                En OneSecurity Vision, no solo vendemos productos; ofrecemos tranquilidad. Nuestra misión es proporcionar soluciones de seguridad robustas, innovadoras y fáciles de usar que protejan a las personas, las propiedades y los datos.
              </p>
               <p className="mt-4 text-muted-foreground md:text-lg">
                Descubre cómo nuestra tecnología de vanguardia está marcando la diferencia en la protección de hogares y empresas en todo el mundo.
              </p>
            </div>
            <div className="order-1 md:order-2 aspect-video rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/LR_jS3iSdzc?rel=0&showinfo=0&autoplay=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    );
}
