import { CONTACT_CARDS } from "@/constants";
import Container from "../container";
import Wrapper from "../wrapper";

const ContactHero = () => {
  return (
    <div className="relative z-0 w-full h-full">
      <div className="absolute -top-16 inset-x-0 -z-10 mx-auto w-3/4 h-32 lg:h-60 rounded-full blur-[5rem] bg-[radial-gradient(86.02%_172.05%_at_50%_-40%,rgba(18,139,135,1)_0%,rgba(5,5,5,0)_80%)]"></div>

      <Wrapper className="py-20">
        <div className="flex flex-col items-center justify-center w-full z-10">
          <Container delay={0.1}>
            <h2 className="text-balance !leading-[1.25] text-center text-4xl md:text-6xl font-semibold tracking-tight mt-6 w-full">
              Let's Start a Conversation
            </h2>
          </Container>

          <Container delay={0.2}>
            <p className="text-base md:text-lg font-normal text-center text-balance text-muted-foreground max-w-3xl mx-auto mt-4">
              Have questions or want to learn more? We're here to help. Reach
              out to our team and let's discuss how we can support your needs
            </p>
          </Container>

          <Container delay={0.3} className="w-full">
            <div className="flex flex-col md:flex-row justify-center gap-6 w-full mt-10">
              {CONTACT_CARDS.map((card, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0A0A0A] border border-border/50"
                >
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <card.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default ContactHero;
