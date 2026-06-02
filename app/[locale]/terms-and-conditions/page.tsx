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
        <div className="max-w-340 w-full space-y-10 px-[16px] font-[family-name:var(--font-tribun)] text-primary font-normal text-[20px] leading-relaxed">
          <FadeUp>
            <h1 className="text-primary max-md:text-[36px] text-[48px] font-extrabold tracking-[20px] mb-10">
              TERMS AND CONDITIONS
            </h1>

            <div className="space-y-8 whitespace-pre-line">
              <p>
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
The Website is provided solely for browsing our wine catalog, viewing product details (including price, ABV, vintage, and descriptions), and submitting non-binding Order Requests. Any other use is prohibited.

2.3 Prohibited Conduct
You agree not to: (a) use the Website unlawfully; (b) attempt unauthorized access; (c) copy, scrape, or reproduce Content without consent; (d) disrupt Website functionality; (e) submit false or misleading information; (f) use the Website to promote excessive or underage drinking.

2.4 Availability
We may suspend, modify, or discontinue the Website at any time without notice and shall bear no liability for any unavailability

3. PRODUCT INFORMATION AND DISCLAIMERS
3.1 General Information
All product listings, descriptions, ABV, vintage years, and prices are provided for informational purposes only and do not constitute a binding offer to sell.

3.2 Vintage Variation
Wine is an agricultural product subject to vintage variation. The vintage displayed is indicative; the actual vintage supplied (if any sale is later confirmed) may differ due to stock rotation. We reserve the right to substitute equivalent or superior vintages without notice.

3.3 Product Images
Images are for illustration only. Actual labels, packaging, and bottle appearance may vary slightly due to production changes or display settings. No guarantee is given that the Product will exactly match the visual representation.

3.4 Pricing and Availability
Prices are in [Insert Currency] and may change without notice. All Products are offered subject to availability, which is confirmed only upon our separate written acceptance. We do not guarantee that any item will be in stock.

3.5 Errors
We reserve the right to correct any typographical errors, inaccuracies, or omissions in product descriptions, pricing, or availability at any time without liability.

4. ORDER REQUESTS
4.1 Non-Binding Inquiry
Submitting an Order Request is an expression of interest only. No contract of sale is formed at that point, and we are under no obligation to supply.

4.2 No Online Transactions
The Website does not support direct online purchases, automatic confirmations, or payment processing. All transactions are finalized off-line.

4.3 Review and Response
We will review your Order Request and respond separately, typically by email or telephone. Our response may confirm availability, provide a final price, request additional information, or decline the request at our sole discretion.

4.4 Formation of Contract
A binding sale contract arises only when we issue a formal written order confirmation expressly accepting your Inquiry, subject to these Terms and any supplementary conditions contained therein.

4.5 Right to Refuse
We may reject any Order Request, limit quantities, or impose conditions without reason and without liability.

4.6 Accuracy of Information
You are responsible for the completeness and accuracy of the details you submit. We are not liable for any failure to respond caused by incorrect information.

5. AGE RESTRICTIONS AND ALCOHOL CONSUMPTION
5.1 Legal Drinking Age
You confirm that you are of legal age to purchase and consume alcohol in your jurisdiction. We do not supply to minors.

5.2 Age Verification
We may require proof of age and identity at any stage. Failure to provide satisfactory verification will result in immediate cancellation of any pending order without liability.

5.3 Responsible Consumption
Shakriani Estate advocates moderate, responsible drinking. Information on ABV is supplied to assist informed choices and compliance with health guidelines.

5.4 Health Warning
Alcohol consumption may impair abilities and cause health risks. Do not drink and drive. We make no health representations, and consumers should consult relevant guidelines.

5.5 Misuse Disclaimer
To the fullest extent permitted by law, Shakriani Estate accepts no liability for loss, injury, or damage caused by the misuse, excessive consumption, or improper storage of our wines, whether by you or any third party.

6. INTELLECTUAL PROPERTY RIGHTS
6.1 Ownership
All Content, including text, images, logos, and trade dress, is the exclusive property of Shakriani Estate or its licensors and is protected by intellectual property laws.

6.2 Trademarks
All marks appearing on the Website are owned by us or third parties. No license is granted, and any unauthorized use is strictly prohibited.

6.3 Limited License
We grant you a revocable, non-exclusive, non-transferable license to access the Website for personal, non-commercial browsing and inquiry submission only. All other rights are reserved.

6.4 Restrictions
You may not reproduce, modify, distribute, or create derivative works from any Content without our prior written consent.

7. LIMITATION OF LIABILITY
7.1 No Warranties
The Website and all Content are provided “as is” without any warranties, express or implied.

7.2 Exclusion of Damages
We are not liable for indirect or consequential damages.

7.3 Aggregate Liability
Our liability is limited to the amount paid (or nominal amount if no purchase).

7.4 Legal Exceptions
Nothing excludes liability that cannot legally be limited.

7.5 Consumer Rights
You retain all statutory rights.

8. PRIVACY AND DATA USE
Your data is governed by our Privacy Policy.

9. THIRD-PARTY LINKS
We are not responsible for external sites.

10. INDEMNIFICATION
You agree to hold us harmless from claims arising from misuse.

11. GOVERNING LAW AND DISPUTES
Governed by laws of Georgia.

12. CHANGES TO TERMS
We may update Terms at any time.

13. GENERAL PROVISIONS
Entire agreement, severability, waiver, force majeure, assignment, headings apply.

14. CONTACT INFORMATION
Email: shakrianiestate@gmail.com
Telephone: +995 599 977 718

© ${new Date().getFullYear()} Shakriani Estate. All rights reserved.`}
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
