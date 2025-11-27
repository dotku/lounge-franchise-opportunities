"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { getTranslation, type Language } from "../i18n/translations";

interface PageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default function Home({ params }: PageProps) {
  const router = useRouter();
  const { lang } = use(params);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = getTranslation(lang);

  const switchLanguage = () => {
    const newLang = lang === "en" ? "zh" : "en";
    router.push(`/${newLang}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language: lang,
        }),
      });

      if (response.ok) {
        alert(t.contact.successMessage);
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const error = await response.json();
        alert(lang === "zh"
          ? "发送失败，请稍后重试或直接联系我们。"
          : "Failed to send. Please try again or contact us directly.");
        console.error("Form submission error:", error);
      }
    } catch (error) {
      alert(lang === "zh"
        ? "发送失败，请稍后重试或直接联系我们。"
        : "Failed to send. Please try again or contact us directly.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              UNI&CORE
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#overview" className="text-gray-700 hover:text-purple-600 transition">{t.nav.market}</a>
              <a href="#products" className="text-gray-700 hover:text-purple-600 transition">{t.nav.products}</a>
              <a href="#packages" className="text-gray-700 hover:text-purple-600 transition">{t.nav.packages}</a>
              <a href="#founder-club" className="text-gray-700 hover:text-purple-600 transition">{t.nav.founderClub}</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition">{t.nav.contact}</a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={switchLanguage}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 transition"
              >
                <span className="font-semibold">{lang === "en" ? "🇺🇸 EN" : "🇨🇳 中文"}</span>
              </button>
              <a href="#contact" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition">
                {t.nav.getStarted}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t.hero.title}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-12">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#packages" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition">
                {t.hero.cta1}
              </a>
              <a href="#founder-club" className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition">
                {t.hero.cta2}
              </a>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
                <div className="text-gray-600">{t.hero.stat1}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-pink-600 mb-2">4-6 {t.hero.weeks}</div>
                <div className="text-gray-600">{t.hero.stat2}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">95%+</div>
                <div className="text-gray-600">{t.hero.stat3}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section id="overview" className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-12">{t.market.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-purple-900">{t.market.card1Title}</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t.market.card1Item1}</li>
                <li>• {t.market.card1Item2}</li>
                <li>• {t.market.card1Item3}</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-4 text-pink-900">{t.market.card2Title}</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t.market.card2Item1}</li>
                <li>• {t.market.card2Item2}</li>
                <li>• {t.market.card2Item3}</li>
                <li>• {t.market.card2Item4}</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-4 text-purple-900">{t.market.card3Title}</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t.market.card3Item1}</li>
                <li>• {t.market.card3Item2}</li>
                <li>• {t.market.card3Item3}</li>
                <li>• {t.market.card3Item4}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-12">{t.solution.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-600">{t.solution.challengesTitle}</h3>
              <ul className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span className="text-gray-700">{t.solution[`challenge${i}` as keyof typeof t.solution]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-600">{t.solution.advantagesTitle}</h3>
              <ul className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{t.solution[`advantage${i}` as keyof typeof t.solution]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="products" className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-4">{t.products.title}</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">{t.products.subtitle}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: "D10", title: "derma10Title", desc: "derma10Desc", items: ["derma10Item1", "derma10Item2", "derma10Item3"] },
              { id: "DH", title: "dermaHomeTitle", desc: "dermaHomeDesc", items: ["dermaHomeItem1", "dermaHomeItem2", "dermaHomeItem3"] },
              { id: "HL", title: "hyperloopTitle", desc: "hyperloopDesc", items: ["hyperloopItem1", "hyperloopItem2", "hyperloopItem3"] },
            ].map((product, idx) => (
              <div key={idx} className={`bg-white border-2 ${idx === 1 ? 'border-pink-200' : 'border-purple-200'} rounded-2xl p-8 hover:shadow-xl transition`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${idx === 1 ? 'from-pink-500 to-purple-500' : 'from-purple-500 to-pink-500'} rounded-xl mb-6 flex items-center justify-center text-white text-2xl font-bold`}>
                  {product.id}
                </div>
                <h3 className="text-2xl font-bold mb-4">{t.products[product.title as keyof typeof t.products]}</h3>
                <p className="text-gray-600 mb-4">{t.products[product.desc as keyof typeof t.products]}</p>
                <ul className="space-y-2 text-gray-700">
                  {product.items.map((item, i) => (
                    <li key={i}>• {t.products[item as keyof typeof t.products]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Customers */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-12">{t.targets.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💅", num: 1, title: "target1Title", detail: "target1Pain", solution: "target1Solution" },
              { icon: "👁️", num: 2, title: "target2Title", detail: "target2Pain", solution: "target2Solution" },
              { icon: "🏪", num: 3, title: "target3Title", detail: "target3Area", solution: "target3Solution" },
              { icon: "✨", num: 4, title: "target4Title", detail: "target4Area", solution: "target4Solution" },
            ].map((target, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl mb-3">{target.icon}</div>
                <h4 className="text-xl font-bold mb-2">{t.targets[target.title as keyof typeof t.targets]}</h4>
                <p className="text-sm text-gray-600 mb-2">{t.targets[target.detail as keyof typeof t.targets]}</p>
                <p className="text-sm text-green-600 font-semibold">{t.targets[target.solution as keyof typeof t.targets]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Packages */}
      <section id="packages" className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-4">{t.packages.title}</h2>
          <p className="text-center text-gray-600 mb-12">{t.packages.subtitle}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Package A */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="text-sm font-semibold text-purple-600 mb-2">{t.packages.planALabel}</div>
              <h3 className="text-3xl font-bold mb-2">{t.packages.planATitle}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">$7,500</div>
              <ul className="space-y-3 mb-8">
                {["planAItem1", "planAItem2", "planAItem3", "planAItem4"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{t.packages[item as keyof typeof t.packages]}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mb-4">
                <strong>{t.packages.idealFor}</strong> {t.packages.planAIdeal}
              </p>
              <a href="#contact" className="block w-full bg-gray-800 text-white text-center px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition">
                {t.nav.getStarted}
              </a>
            </div>

            {/* Package B - Featured */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                {t.packages.mostPopular}
              </div>
              <div className="text-sm font-semibold mb-2 opacity-90">{t.packages.planBLabel}</div>
              <h3 className="text-3xl font-bold mb-2">{t.packages.planBTitle}</h3>
              <div className="text-4xl font-bold mb-6">$15,000-$22,000</div>
              <ul className="space-y-3 mb-8">
                {["planBItem1", "planBItem2", "planBItem3", "planBItem4", "planBItem5"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-yellow-300 mr-2">✓</span>
                    <span>{t.packages[item as keyof typeof t.packages]}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm mb-4 opacity-90">
                <strong>{t.packages.idealFor}</strong> {t.packages.planBIdeal}
              </p>
              <p className="text-sm mb-4 font-semibold">{t.packages.planBRoi}</p>
              <a href="#contact" className="block w-full bg-white text-purple-600 text-center px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                {t.packages.startNow}
              </a>
            </div>

            {/* Package C */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="text-sm font-semibold text-purple-600 mb-2">{t.packages.planCLabel}</div>
              <h3 className="text-3xl font-bold mb-2">{t.packages.planCTitle}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">$30,000-$45,000</div>
              <ul className="space-y-3 mb-8">
                {["planCItem1", "planCItem2", "planCItem3", "planCItem4", "planCItem5", "planCItem6"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{t.packages[item as keyof typeof t.packages]}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mb-4">
                <strong>{t.packages.idealFor}</strong> {t.packages.planCIdeal}
              </p>
              <a href="#contact" className="block w-full bg-gray-800 text-white text-center px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition">
                {t.packages.contactUs}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Model */}
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-4">{t.profit.title}</h2>
          <p className="text-center text-gray-600 mb-12">{t.profit.subtitle}</p>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {[
                { value: "$150", label: "avgClient", sub: "sfPrice", color: "purple" },
                { value: "3", label: "dailyClients", sub: "standardOps", color: "pink" },
                { value: "$13,500", label: "monthlyRevenue", sub: "stableIncome", color: "purple" },
                { value: "4-6", label: "roiWeeks", sub: "actualCases", color: "pink" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-5xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
                  <div className="text-gray-600">{t.profit[stat.label as keyof typeof t.profit]}</div>
                  <div className="text-sm text-gray-500 mt-1">{t.profit[stat.sub as keyof typeof t.profit]}</div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
              <p className="text-gray-700 leading-relaxed">{t.profit.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Club */}
      <section id="founder-club" className="py-16 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.founder.title}</h2>
            <p className="text-xl text-gray-700">{t.founder.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "🗺️", title: "benefit1Title", desc: "benefit1Desc" },
              { icon: "⚡", title: "benefit2Title", desc: "benefit2Desc" },
              { icon: "📱", title: "benefit3Title", desc: "benefit3Desc" },
              { icon: "🎉", title: "benefit4Title", desc: "benefit4Desc" },
              { icon: "🏆", title: "benefit5Title", desc: "benefit5Desc" },
              { icon: "⭐", title: "benefit6Title", desc: "benefit6Desc", highlight: true },
            ].map((benefit, idx) => (
              <div key={idx} className={`bg-white p-8 rounded-xl shadow-lg ${benefit.highlight ? 'border-4 border-yellow-400' : ''}`}>
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{t.founder[benefit.title as keyof typeof t.founder]}</h3>
                <p className="text-gray-600">{t.founder[benefit.desc as keyof typeof t.founder]}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-6">{t.founder.limitedTitle}</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { value: "20", label: "totalSpots" },
                { value: "11", label: "remainingSpots" },
                { value: "⏰", label: "firstCome" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-6xl font-bold mb-2">{stat.value}</div>
                  <div className="text-xl">{t.founder[stat.label as keyof typeof t.founder]}</div>
                </div>
              ))}
            </div>
            <p className="text-lg mb-6">{t.founder.benefits}</p>
            <a href="#contact" className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition">
              {t.founder.joinNow}
            </a>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center mb-12">{t.support.title}</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-purple-900">{t.support.operationsTitle}</h3>
                <ul className="space-y-3">
                  {["item1", "item2", "item3", "item4"].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span className="text-gray-700">{t.support[item as keyof typeof t.support]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-pink-900">{t.support.systemTitle}</h3>
                <p className="text-gray-700 mb-4">{t.support.systemDesc}</p>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-sm text-gray-600 italic">"{t.support.quote}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-8">{t.success.title}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "🇰🇷", title: "korean", desc: "koreanDesc" },
              { icon: "🌉", title: "local", desc: "localDesc" },
              { icon: "🎯", title: "support", desc: "supportDesc" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{t.success[item.title as keyof typeof t.success]}</h3>
                <p className="text-white/90">{t.success[item.desc as keyof typeof t.success]}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <p className="text-2xl md:text-3xl font-bold mb-4">{t.success.tagline}</p>
            <p className="text-xl mb-8">{t.success.cta}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">{t.contact.title}</h2>
            <p className="text-center text-gray-600 mb-12">{t.contact.subtitle}</p>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-6">{t.contact.infoTitle}</h3>
                  <div className="space-y-4">
                    {[
                      { icon: "👤", label: "person", value: "Xianji Li" },
                      { icon: "📧", label: "emailLabel", value: "xianji.li@unincore.us", link: "mailto:xianji.li@unincore.us" },
                      { icon: "📱", label: "phoneLabel", value: "(415) 351-6363", link: "tel:+14153516363" },
                    ].map((contact, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-2xl">{contact.icon}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{t.contact[contact.label as keyof typeof t.contact]}</div>
                          {contact.link ? (
                            <a href={contact.link} className="text-purple-600 hover:underline">{contact.value}</a>
                          ) : (
                            <div className="text-gray-600">{contact.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: "name", type: "text", label: "nameLabel", placeholder: "namePlaceholder" },
                    { name: "email", type: "email", label: "emailLabel", placeholder: "emailPlaceholder" },
                    { name: "phone", type: "tel", label: "phoneLabel", placeholder: "phonePlaceholder" },
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label htmlFor={field.name} className="block text-sm font-semibold mb-2">
                        {t.contact[field.label as keyof typeof t.contact]} *
                      </label>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                        placeholder={t.contact[field.placeholder as keyof typeof t.contact] as string}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? (lang === "zh" ? "发送中..." : "Sending...")
                      : t.contact.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                UNI&CORE
              </h3>
              <p className="text-gray-400">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  { href: "#overview", label: "marketOverview" },
                  { href: "#products", label: "products" },
                  { href: "#packages", label: "packages" },
                  { href: "#founder-club", label: "founderClub" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-white transition">
                      {t.footer[link.label as keyof typeof t.footer]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.contact}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Xianji Li</li>
                <li>xianji.li@unincore.us</li>
                <li>(415) 351-6363</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 UNI&CORE. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
