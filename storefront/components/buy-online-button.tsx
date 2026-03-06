import { ExternalLinkIcon } from "lucide-react";
import { Button, type buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";

const BuyOnlineButton = ({
  size,
  className,
}: {
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
}) => {
  return (
    <Button asChild size={size} className={className}>
      <a
        href="https://www.prodavnicaalata.rs/proizvodjaci/sg-tools/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Kupi online
        <ExternalLinkIcon />
      </a>
    </Button>
  );
};

export default BuyOnlineButton;
