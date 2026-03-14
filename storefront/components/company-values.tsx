import CompanyGallery from "./company-gallery";
import CompanyTimeline from "./company-timeline";
import Section from "./section";
import Wrapper from "./wrapper";

function CompanyValues() {
  return (
    <Section>
      <Wrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <CompanyTimeline />
          <CompanyGallery />
        </div>
      </Wrapper>
    </Section>
  );
}

export default CompanyValues;
