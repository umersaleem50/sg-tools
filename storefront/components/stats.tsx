import Container from "./container";
import Section from "./section";
import Wrapper from "./wrapper";

export interface StatsProps {
  stats: Array<{ label: string; value: string | number }>;
}

const Stats = ({ stats }: StatsProps) => {
  return (
    <Section>
      <Wrapper>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-8 w-full">
          {stats.map((stat, index) => (
            <Container key={index} delay={index}>
              <div className="flex flex-col items-center justify-center text-center">
                <h4 className="text-4xl lg:text-5xl font-bold font-heading">
                  {stat.value}
                </h4>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            </Container>
          ))}
        </div>
      </Wrapper>
    </Section>
  );
};

export default Stats;
