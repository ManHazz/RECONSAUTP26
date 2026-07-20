import React from "react";
import data from "@/data/footer.json";

const Footer = () => {
  const details = data.footer_details;
  const colors = details.colors; // 🎨 new colors object

  return (
    <footer
      id="contact"
      className={`w-full scroll-mt-20`}
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <div className="flex flex-col items-center justify-center max-h-fit xl:max-w-full w-full pt-8">
        <div className="flex gap-8 px-3 xl:gap-28 lg:gap-12 flex-col sm:flex-row sm:flex-wrap sm:gap-8 sm:justify-center md:gap-5 justify-center mt-8 md:mt-14 xl:px-0 md:px-7 max-w-xl sm:max-w-3xl md:max-w-7xl">
          {/* Logo & Description Section */}
          <div className="flex flex-col gap-4 lg:gap-6 md:gap-4 items-center sm:items-start text-center sm:text-left">
            {(data.logo || details.logo) && (
              <img
                src={data.logo || details.logo}
                alt={`${details.title} Logo`}
                className="h-16 md:h-24 lg:h-28 object-contain mb-2"
              />
            )}

            <div className="flex items-center space-x-3 md:-ml-2">
              <span className="text-xl md:text-2xl lg:text-3xl font-bold">
                {details.title}
              </span>
            </div>

            <div
              className="max-w-[280px] text-sm md:text-base leading-6 tracking-[0.02em] font-normal"
              style={{ color: colors.subtext }}
            >
              {details.simple_desc}
            </div>

            {/* UPDATED: Added justify-center md:justify-start for the social icons */}
            <div className="flex gap-4 max-w-[200px] justify-center sm:justify-start w-full">
              {details.socials.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={item.icon}
                    alt="social"
                    className="w-6 h-6 hover:opacity-75 cursor-pointer"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:gap-4 gap-2 items-center sm:items-start text-center sm:text-left">
            <h3
              className="text-lg md:text-xl font-semibold"
              style={{ color: colors.highlight }}
            >
              Quick Links
            </h3>
            {details.site_quick_links.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm md:text-base transition-colors"
                style={{ color: colors.text }}
                onMouseOver={(e) => (e.target.style.color = colors.highlight)}
                onMouseOut={(e) => (e.target.style.color = colors.text)}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Additional Info / Services */}
          <div className="flex flex-col md:gap-4 gap-2 items-center sm:items-start text-center sm:text-left">
            <h3
              className="text-lg md:text-xl font-semibold"
              style={{ color: colors.highlight }}
            >
              {details.add_info.title}
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:gap-3 text-left">
              {details.add_info.links.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-sm md:text-base transition-colors"
                  style={{ color: colors.text }}
                  onMouseOver={(e) => (e.target.style.color = colors.highlight)}
                  onMouseOut={(e) => (e.target.style.color = colors.text)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col md:gap-4 gap-2 items-center sm:items-start text-center sm:text-left">
            <h3
              className="text-lg md:text-xl font-semibold"
              style={{ color: colors.highlight }}
            >
              Contact Us
            </h3>
            <p className="text-sm md:text-base">
              {details.contacts.location_street}
              <br />
              {details.contacts.location_state}
            </p>
            <p className="text-sm md:text-base mt-2">
              Phone: {details.contacts.phone}
              <br />
              Email: {details.contacts.email}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="w-full mt-12 pt-6 mb-5 border-t"
          style={{ borderColor: colors.border }}
        >
          <div
            className="flex flex-col md:flex-row justify-between items-center px-5 max-w-7xl mx-auto text-sm gap-4"
            style={{ color: colors.muted }}
          >
            <div className="text-center md:text-left">
              {details.copyright.statement} {details.copyright.year}
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
              {details.policies.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="transition-colors"
                  style={{ color: colors.text }}
                  onMouseOver={(e) => (e.target.style.color = colors.highlight)}
                  onMouseOut={(e) => (e.target.style.color = colors.text)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
