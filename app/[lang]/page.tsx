"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { getTranslation, type Language } from "../i18n/translations";
import { getAllRegions, getRegionConfig } from "../config/regions";

interface PageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default function RegionSelectionPage({ params }: PageProps) {
  const router = useRouter();
  const { lang } = use(params);
  const t = getTranslation(lang);
  const regions = getAllRegions();

  const switchLanguage = () => {
    const newLang = lang === "en" ? "zh" : "en";
    router.push(`/${newLang}`);
  };

  const selectRegion = (regionCode: string) => {
    router.push(`/${lang}/${regionCode}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a
              href={`/${lang}`}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition cursor-pointer"
            >
              UNI&CORE
            </a>
            <button
              onClick={switchLanguage}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 transition"
            >
              <span className="text-xl">{lang === "en" ? "🇨🇳" : "🇺🇸"}</span>
              <span className="font-medium">{lang === "en" ? "中文" : "English"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {lang === "zh" ? "选择您的市场" : "Select Your Market"}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            {lang === "zh"
              ? "UNI&CORE 韩式美容休闲吧加盟机会"
              : "UNI&CORE Korean Beauty Lounge Franchise Opportunities"}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {lang === "zh"
              ? "我们在多个城市提供加盟机会。选择您感兴趣的市场，了解详细的加盟信息、投资回报和支持计划。"
              : "We offer franchise opportunities in multiple cities. Select your market of interest to learn about detailed franchise information, investment returns, and support programs."}
          </p>
        </div>
      </section>

      {/* Region Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regions.map((regionCode) => {
              const region = getRegionConfig(regionCode);
              return (
                <div
                  key={regionCode}
                  onClick={() => selectRegion(regionCode)}
                  className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Card Header with Gradient */}
                  <div className="h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-2">
                          {regionCode === "san-francisco" && "🌉"}
                          {regionCode === "hong-kong" && "🏙️"}
                          {regionCode === "singapore" && "🦁"}
                          {regionCode === "china" && "🏮"}
                        </div>
                        <div className="text-2xl font-bold">{region.name[lang]}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">
                        {lang === "zh" ? "国家/地区" : "Country/Region"}
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        {region.country[lang]}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">
                        {lang === "zh" ? "货币" : "Currency"}
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        {region.currency}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-1">
                        {lang === "zh" ? "联系方式" : "Contact"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {region.email}
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 group-hover:from-purple-700 group-hover:to-pink-700">
                      {lang === "zh" ? "了解详情" : "Learn More"} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {lang === "zh" ? "为什么选择 UNI&CORE？" : "Why Choose UNI&CORE?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">
                {lang === "zh" ? "韩式高端体验" : "Premium Korean Experience"}
              </h3>
              <p className="text-gray-600">
                {lang === "zh"
                  ? "正宗的韩式美容护理和休闲服务"
                  : "Authentic Korean beauty care and leisure services"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">
                {lang === "zh" ? "高投资回报" : "High ROI"}
              </h3>
              <p className="text-gray-600">
                {lang === "zh"
                  ? "经验证的商业模式，稳定的收益"
                  : "Proven business model with stable returns"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">
                {lang === "zh" ? "全方位支持" : "Comprehensive Support"}
              </h3>
              <p className="text-gray-600">
                {lang === "zh"
                  ? "从选址到运营的全程指导"
                  : "Full guidance from site selection to operations"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            UNI&CORE
          </div>
          <p className="text-gray-400 mb-4">
            {lang === "zh"
              ? "韩式美容休闲吧 · 全球加盟机会"
              : "Korean Beauty Lounge · Global Franchise Opportunities"}
          </p>
          <div className="text-sm text-gray-500">
            &copy; 2026 UNI&CORE. {lang === "zh" ? "版权所有" : "All rights reserved"}.
          </div>
        </div>
      </footer>
    </main>
  );
}
