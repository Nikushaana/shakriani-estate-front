import FadeUp from "../../../components/animations/FadeUp";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Terms & Conditions | shakriani-estate.ge",
    description:
      "Read the Terms and Conditions for using Shakriani Estate website and services.",
    openGraph: {
      title: "Terms & Conditions | shakriani-estate.ge",
      description:
        "Read the Terms and Conditions for using Shakriani Estate website and services.",
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

  await getTranslations("main");

  return (
    <div className="pb-[40px]">
      <div className="bottom-curve bg-primary pt-70 max-md:pt-40"></div>

      <div className="my-40 max-md:my-20 flex flex-col items-center">
        <div className="max-w-340 w-full px-[16px] font-[family-name:var(--font-tribun)] text-primary">

          <FadeUp>
            <h1 className="text-primary max-md:text-[32px] text-[48px] font-extrabold tracking-[10px] mb-10 text-center">
              TERMS AND CONDITIONS
            </h1>

            <div className="text-[18px] max-md:text-[16px] leading-relaxed break-words">
              <pre className="whitespace-pre-wrap font-[inherit]">

{`Shakriani Estate

PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. BY ACCESSING OR USING THIS WEBSITE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE LEGALLY BOUND BY THESE TERMS. IF YOU DO NOT AGREE, YOU MUST IMMEDIATELY DISCONTINUE USE OF THE WEBSITE AND SUBMIT NO FURTHER INQUIRIES.

1. DEFINITIONS
1.1 “Shakriani Estate,” “Company,” “we,” “us,” or “our” means the legal entity operating the Website, with its registered address at [Insert Full Business Address], and includes its successors and assigns.
1.2 “Website” means the website located at [Insert Website URL], including all subpages, content, images, product listings, and functionality.
1.3 “User,” “you,” or “your” means any individual who accesses or uses the Website.
1.4 “Order Request” or “Inquiry” means the non-binding expression of interest submitted through the Website’s contact/order form specifying wine type, quantity, and any preferences, which does not constitute a purchase.
1.5 “Products” means the wines and any other goods displayed in the Website catalog and offered for sale by Shakriani Estate.
1.6 “Content” means all text, images, photographs, descriptions, data, logos, and other materials on the Website.
1.7 “Terms” means these Terms and Conditions as may be amended from time to time.

2. USE OF THE WEBSITE
2.1 Eligibility
You represent that you are of legal drinking age in your jurisdiction and have the legal capacity to enter into these Terms.

2.2 Permitted Purpose
The Website is provided solely for browsing our wine catalog, viewing product details (including price, ABV, vintage, and descriptions), and submitting non-binding Order Requests.

2.3 Prohibited Conduct
You agree not to use the Website unlawfully, scrape content, or misuse the platform.

2.4 Availability
We may suspend or modify the Website at any time without liability.

3. PRODUCT INFORMATION AND DISCLAIMERS
3.1 Product details are for informational purposes only.
3.2 Vintage may vary.
3.3 Images are illustrative only.
3.4 Prices and availability may change.
3.5 Errors may be corrected at any time.

4. ORDER REQUESTS
4.1 Requests are non-binding.
4.2 No online purchases.
4.3 We respond manually to inquiries.
4.4 Contract is formed only upon written confirmation.
4.5 We may refuse requests.
4.6 You are responsible for accurate data.

5. AGE RESTRICTIONS AND ALCOHOL
5.1 You must be of legal drinking age.
5.2 We may request verification.
5.3 Drink responsibly.
5.4 Alcohol may cause health risks.
5.5 We are not liable for misuse.

6. INTELLECTUAL PROPERTY
All content belongs to Shakriani Estate and may not be copied.

7. LIMITATION OF LIABILITY
We provide the Website “as is” and limit liability to the fullest extent permitted by law.

8. PRIVACY
Your data is handled according to our Privacy Policy.

9. THIRD-PARTY LINKS
We are not responsible for external websites.

10. INDEMNIFICATION
You agree to hold us harmless from misuse-related claims.

11. GOVERNING LAW
Governed by the laws of Georgia.

12. CHANGES
We may update these Terms at any time.

13. GENERAL PROVISIONS
Standard legal clauses apply.

14. CONTACT
Email: shakrianiestate@gmail.com
Phone: +995 599 977 718

© ${new Date().getFullYear()} Shakriani Estate. All rights reserved.`}

              </pre>
            </div>

          </FadeUp>
        </div>
      </div>
    </div>
  );
}