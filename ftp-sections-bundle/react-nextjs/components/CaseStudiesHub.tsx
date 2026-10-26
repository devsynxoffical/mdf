import React from "react";
import Link from "next/link";

interface CaseStudiesHubProps {
  leadGenHref?: string;
  ecomHref?: string;
}

export default function CaseStudiesHub({
  leadGenHref = "/case-leadgen",
  ecomHref = "/case-ecom",
}: CaseStudiesHubProps) {
  return (
    <div className="box">
      <header className="cshero">
        <h1 className="h1 d">
          Case <span className="it">studies</span>
        </h1>
        <p className="lead">
          Two libraries of real, verified results. Pick the one that matches your
          business.
        </p>
      </header>

      <div className="hub">
        <Link className="hc lg" href={leadGenHref}>
          <div className="fan">
            <img
              src="/img/lg/Dd9D3rnSCMT.webp"
              alt="Lead generation case study proof"
              loading="lazy"
              style={{ "--r": "-8deg", "--x": "-30%" } as React.CSSProperties}
            />
            <img
              src="/img/lg/DdN7bs-xSg7.webp"
              alt="Lead generation case study proof"
              loading="lazy"
              style={{ "--r": "0deg", "--x": "0%" } as React.CSSProperties}
            />
            <img
              src="/img/lg/DbHD8X3ksnz.webp"
              alt="Lead generation case study proof"
              loading="lazy"
              style={{ "--r": "8deg", "--x": "30%" } as React.CSSProperties}
            />
          </div>
          <div className="hb">
            <span className="ht">QualifiedLeadsX&trade;</span>
            <h2>Lead generation</h2>
            <div className="hn">
              <b>125</b>
              <span>case studies</span>
            </div>
            <p>
              Booked calls, verified leads and lower cost per lead for service
              businesses, agencies, coaches and local trades.
            </p>
            <div className="hch">
              <span>Roofing</span>
              <span>Legal / MVA</span>
              <span>Mortgage</span>
              <span>MedSpa</span>
              <span>Coaching</span>
              <span>Low-ticket</span>
            </div>
            <span className="btn hbtn">
              Explore lead gen cases <i>&#8599;</i>
            </span>
          </div>
        </Link>

        <Link className="hc ec" href={ecomHref}>
          <div className="fan">
            <img
              src="/img/cs2/C9b-l3yS6GW.webp"
              alt="eCommerce case study proof"
              loading="lazy"
              style={{ "--r": "-8deg", "--x": "-30%" } as React.CSSProperties}
            />
            <img
              src="/img/cs2/C9RU-C9yhfU.webp"
              alt="eCommerce case study proof"
              loading="lazy"
              style={{ "--r": "0deg", "--x": "0%" } as React.CSSProperties}
            />
            <img
              src="/img/cs2/C83tKltSXUp.webp"
              alt="eCommerce case study proof"
              loading="lazy"
              style={{ "--r": "8deg", "--x": "30%" } as React.CSSProperties}
            />
          </div>
          <div className="hb">
            <span className="ht">Brand Scaling Hacks</span>
            <h2>eCommerce & DTC</h2>
            <div className="hn">
              <b>126</b>
              <span>case studies</span>
            </div>
            <p>
              Direct-response creative engines, paid ads and conversion funnels
              scaling consumer brands from 5 to 7 figures.
            </p>
            <div className="hch">
              <span>Apparel</span>
              <span>Supplements</span>
              <span>Jewelry</span>
              <span>Skincare</span>
              <span>Home & Living</span>
              <span>DTC</span>
            </div>
            <span className="btn hbtn">
              Explore ecom cases <i>&#8599;</i>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
