import Container from "@/components/container";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper";
import { base, heading } from "@/constants/fonts";
import { pick } from "@/lib/pick";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Link from "next/link";
import "./globals.css";

async function NotFound() {
  const messages = await getMessages();

  return (
    <html>
      <body
        className={cn(
          "min-h-screen text-foreground font-base antialiased dark",
          base.variable,
          heading.variable,
        )}
      >
        <NextIntlClientProvider
          messages={pick(messages, ["nav", "languageSwitcher", "whereToBuy"])}
        >
          <Navbar />

          <main>
            <Wrapper className="py-16 sm:py-24 ">
              <div className="h-[50vh] flex flex-col items-center justify-center w-full z-10">
                <Container delay={0.1}>
                  <h2 className="text-balance leading-tight! text-center text-5xl md:text-6xl font-semibold tracking-tight w-full">
                    Page Not Found!
                  </h2>
                </Container>

                <Container delay={0.2}>
                  <p className="text-base md:text-lg font-normal text-center text-balance text-muted-foreground max-w-3xl mx-auto mt-4">
                    We couldn&apos;t find the page you were looking for. Check
                    the URL to make sure it&apos;s correct and try again.
                  </p>
                </Container>
                <Container className="mt-4 sm:mt-6 md:mt-8" delay={0.3}>
                  <Button asChild variant={"secondary"}>
                    <Link href={"/"}>
                      <ArrowLeft /> Back to homepage
                    </Link>
                  </Button>
                </Container>
              </div>
            </Wrapper>
          </main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default NotFound;
