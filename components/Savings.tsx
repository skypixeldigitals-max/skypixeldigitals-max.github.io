"use client";

import { useState } from "react";

const PLAN = { name: "Signature", price: 32900 };
const rs = (n: number) => "Rs " + Math.round(n).toLocaleString("en-LK");
const million = (n: number) =>
  n >= 1_000_000 ? `Rs ${(n / 1_000_000).toFixed(2)} million` : rs(Math.round(n / 1000) * 1000);

/**
 * One multilingual guest relations officer vs the Signature plan.
 * Salary range: 2026 job ads on the south coast (Weligama Bay Marriott
 * Rs 70,000; Lanka Island Resorts Rs 60,000; Radisson Blu Galle Rs 80,000; Aitken Spence Russian language
 * specialist Rs 125,000). EPF 12% and ETF 3% are the employer's legal share.
 * Hours: Shop and Office Employees Act, 45 a week.
 */
export default function Savings() {
  const [salary, setSalary] = useState(80000);

  const staff = salary * 1.15;
  const savedYear = (staff - PLAN.price) * 12;
  const bestYear = (125000 * 1.15 - PLAN.price) * 12;

  return (
    <div className="mt-16 grid grid-cols-[1fr_1fr] gap-px border border-rule bg-rule max-md:grid-cols-1">
      {/* the hire */}
      <div className="bg-white p-10 max-md:p-6">
        <span className="eyebrow">Hiring one person</span>
        <label htmlFor="salary" className="mt-6 flex items-baseline justify-between">
          <span className="text-lead text-ink">Monthly salary</span>
          <span className="text-lead font-semibold text-ink">{rs(salary)}</span>
        </label>
        <input
          id="salary"
          type="range"
          min={60000}
          max={125000}
          step={5000}
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="mt-4 w-full accent-[#1b4235]"
        />
        <dl className="mt-6 divide-y divide-rule border-y border-rule text-body">
          <div className="flex justify-between py-3">
            <dt className="text-muted">EPF + ETF (15%)</dt>
            <dd>{rs(salary * 0.15)}</dd>
          </div>
          <div className="flex justify-between py-3 font-semibold">
            <dt>Cost to you</dt>
            <dd>{rs(staff)} / month</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-[1.7] text-muted">
          Works 45 hours a week. Speaks two or three languages.
        </p>
      </div>

      {/* the plan */}
      <div className="flex flex-col bg-forest p-10 text-white max-md:p-6">
        <span className="eyebrow">Leona Concierge {PLAN.name}</span>
        <p className="mt-6 flex items-baseline justify-between text-lead">
          <span>Monthly</span>
          <span className="font-semibold">{rs(PLAN.price)}</span>
        </p>
        <p className="mt-2 text-sm text-white/70">Works 168 hours a week. Speaks eleven languages.</p>

        <div className="mt-auto pt-10">
          <span className="text-sm text-white/70">You save</span>
          <p className="mt-1 font-display text-[3.6rem] leading-[1.05] text-gold max-md:text-[2.6rem]">
            {million(savedYear)}
          </p>
          <p className="mt-1 text-white/80">a year</p>
        </div>
      </div>

      <p className="col-span-full bg-paper px-10 py-5 text-[0.8rem] leading-[1.6] text-muted max-md:px-6">
        {`Up to ${million(bestYear)} a year. `}Salaries from 2026 job ads in Sri Lanka for staff who speak
        guests&apos; languages (Rs 60,000 to 125,000). EPF 12% and ETF 3% are the
        employer&apos;s legal share; 45 hours is the legal working week.
      </p>
    </div>
  );
}
