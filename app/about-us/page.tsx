import AboutUsHeader from "../components/about us/aboutUsHeader";
import Awards from "../components/about us/awards";

export default function page() {
  return (
    <div className="font-[family-name:var(--font-tribun)]">
      {/* header part */}
      <AboutUsHeader />
      {/* awards */}
      <Awards />
    </div>
  );
}
