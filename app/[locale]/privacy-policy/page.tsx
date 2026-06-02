import OrderForm from "@/components/main page/orderForm";
import FadeUp from "../../../components/animations/FadeUp";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Privacy Policy | shakriani-estate.ge",
    description:
      "Learn how Shakriani Estate collects, uses, and protects your personal data.",
    openGraph: {
      title: "Privacy Policy | shakriani-estate.ge",
      description:
        "Learn how Shakriani Estate collects, uses, and protects your personal data.",
      images: [
        {
          url: "/media/SmallLogo.svg",
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("main");

  return (
    <div className="pb-[40px]">
      <div className="bottom-curve bg-primary pt-70 max-md:pt-40"></div>

      {/* privacy policy */}
      <div className="my-40 max-md:my-20 flex flex-col items-center">
        <div className="max-w-340 w-full space-y-10 px-[16px] font-[family-name:var(--font-tribun)] text-primary font-normal text-[20px] leading-relaxed">
          <FadeUp>
            <h1 className="text-primary max-md:text-[36px] text-[48px] font-extrabold tracking-[20px] mb-10">
              PRIVACY POLICY
            </h1>

            <div className="space-y-8">
              {/* INTRO */}
              <p>
                <strong>Shakriani Estate</strong> ("Company," "we," "us," or
                "our") is committed to protecting the privacy and personal
                information of visitors to its website located at https://shakriani-estate.ge (the "Website"). This Privacy Policy describes how we
                collect, use, process, disclose, and safeguard the personal data
                you provide when browsing our wine catalog, viewing product
                details, and submitting inquiries or order requests through our
                contact/order form.
                <br />
                <br />
                By accessing or using the Website, you expressly confirm that
                you have read, understood, and agree to the practices described
                in this Privacy Policy. If you do not agree, you must stop using
                the Website immediately.
              </p>

              {/* SECTION 1 */}
              <Section title="1. INFORMATION WE COLLECT">
                <p>
                  <strong>1.1 Information You Provide Voluntarily</strong>
                  <br />
                  We may collect your name, email, phone number, order
                  inquiries, and any messages submitted through forms.
                </p>

                <p>
                  <strong>1.2 Automatically Collected Information</strong>
                  <br />
                  We collect IP address, browser type, device information, pages
                  visited, and usage behavior via cookies and logs.
                </p>

                <p>
                  <strong>1.3 Minors’ Data</strong>
                  <br />
                  This Website is intended for legal drinking age users only. We
                  do not knowingly collect data from minors.
                </p>
              </Section>

              {/* SECTION 2 */}
              <Section title="2. LEGAL BASES FOR PROCESSING">
                <p>
                  We process personal data based on pre-contractual necessity,
                  legitimate interests, consent, and legal obligations.
                </p>
              </Section>

              {/* SECTION 3 */}
              <Section title="3. PURPOSES OF PROCESSING">
                <p>
                  We use your data to respond to inquiries, manage orders,
                  improve the Website, analyze usage, and comply with legal
                  obligations.
                </p>
              </Section>

              {/* SECTION 4 */}
              <Section title="4. COOKIES AND TRACKING TECHNOLOGIES">
                <p>
                  We use cookies for functionality, analytics, and
                  personalization. You can disable cookies in your browser
                  settings.
                </p>
              </Section>

              {/* SECTION 5 */}
              <Section title="5. DISCLOSURE OF PERSONAL INFORMATION">
                <p>
                  We do not sell your data. We may share it with service
                  providers, legal authorities, or during business transfers.
                </p>
              </Section>

              {/* SECTION 6 */}
              <Section title="6. DATA RETENTION">
                <p>
                  We retain personal data only as long as necessary for legal
                  and business purposes.
                </p>
              </Section>

              {/* SECTION 7 */}
              <Section title="7. DATA SECURITY">
                <p>
                  We use security measures such as encryption and access
                  controls, but no system is fully secure.
                </p>
              </Section>

              {/* SECTION 8 */}
              <Section title="8. YOUR RIGHTS">
                <p>
                  You may access, correct, delete, restrict, or object to
                  processing of your data, and withdraw consent at any time.
                </p>
              </Section>

              {/* SECTION 9 */}
              <Section title="9. INTERNATIONAL DATA TRANSFERS">
                <p>
                  Your data may be transferred internationally with appropriate
                  safeguards.
                </p>
              </Section>

              {/* SECTION 10 */}
              <Section title="10. THIRD-PARTY LINKS">
                <p>
                  We are not responsible for third-party websites linked from
                  our Website.
                </p>
              </Section>

              {/* SECTION 11 */}
              <Section title="11. CONTACT INFORMATION">
                <p>
                  Shakriani Estate
                  <br />
                  Email: shakrianiestate@gmail.com
                  <br />
                  Phone: +995 599 977 718
                </p>
              </Section>

              {/* SECTION 12 */}
              <Section title="12. CHANGES TO THIS POLICY">
                <p>
                  We may update this Privacy Policy from time to time. Continued
                  use means acceptance of changes.
                </p>
              </Section>

              {/* SECTION 13 */}
              <Section title="13. GOVERNING LAW">
                <p>This policy is governed by the laws of Georgia.</p>
              </Section>

              <p className="text-sm opacity-70 pt-10">
                © {new Date().getFullYear()} Shakriani Estate. All rights reserved.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-[24px] font-bold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
