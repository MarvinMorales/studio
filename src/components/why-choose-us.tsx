import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { websiteData } from "@/lib/data";

const { whyChooseUs } = websiteData;

export default function WhyChooseUs() {
  if (!whyChooseUs.showThisSection) {
    return null;
  }

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">{whyChooseUs.title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            {whyChooseUs.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.cards.map((card, index) => (
            <Card key={index} className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{card.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
