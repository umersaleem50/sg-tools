import type { VariantProps } from "class-variance-authority";
import { ExternalLinkIcon } from "lucide-react";
import { Button, type buttonVariants } from "./ui/button";

const BuyOnlineButton = ({
  size,
  variant,
  className,
}: {
  size?: VariantProps<typeof buttonVariants>["size"];
  variant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
}) => {
  return (
    <Button asChild size={size} variant={variant} className={className}>
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
