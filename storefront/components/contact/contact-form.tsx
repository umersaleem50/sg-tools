"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendContactEmail } from "@/app/kontakt/actions";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import Container from "../container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Wrapper from "../wrapper";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    const result = await sendContactEmail(data);

    if (result.success) {
      toast.success("Poruka je uspešno poslata!");
      reset();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="w-full">
      <Wrapper>
        <Container delay={0.2}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-3xl mx-auto w-full space-y-6"
          >
            <div className="space-y-3">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="petar@primer.rs"
                className="bg-[#0A0A0A] border-border/50"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="message">Kako možemo da ti pomognemo?</Label>
              <Textarea
                id="message"
                placeholder="Reci nam šta ti treba..."
                className="min-h-[150px] bg-[#0A0A0A] border-border/50 resize-none"
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-sm text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Šalje se...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Pošalji poruku
                </>
              )}
            </Button>
          </form>
        </Container>
      </Wrapper>
    </div>
  );
};

export default ContactForm;
