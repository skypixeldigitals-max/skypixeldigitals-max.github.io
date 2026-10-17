"use client";

import { useState } from "react";

const PLAN = { name: "Signature", price: 32900 };
const rs = (n: number) => "Rs " + Math.round(n).toLocaleString("en-LK");

/**
 * Receptionist vs plan. EPF 12% and ETF 3% are the employer's statutory share;
 * the bonus is one month's salary spread over the year, as is usual locally.
 */
export default function Savings() {
  const [salary, setSalary] = useState(100000);
  const [allDay, setAllDay] = useState(true);

  const epf = salary * 0.12;
  const etf = salary * 0.03;
  const bonus = salary / 12;
  const perPerson = salary + epf + etf + bonus;
  const people = allDay ? 3 : 1;
  const staff = perPerson * people;
  const saved = staff - PLAN.price;

  const rows: [string, number][] = [
    ["Salary", salary],
    ["EPF, employer's 12%", epf],
    ["ETF, employer's 3%", etf],
    ["Yearly bonus, spread monthly", bonus],
  ];

  return (
    <div className="mt-16 grid grid-cols-[1.1fr_1fr] gap-px border border-rule bg-rule max-md:grid-cols-1">
      {/* the receptionist */}
      <div className="bg-white p-10 max-md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="h-title text-blue-deep">A multilingual receptionist</h3>
          <div role="radiogroup" aria-label="Hours covered" className="flex rounded-sm border border-rule p-1 text-[0.68rem] font-semibold tracking-[0.16em] uppercase">
            {[
              [false, "Day shift"],
              [true, "24 hours"],
            ].map(([v, label]) => (
              <button
                key={String(v)}
                type="button"
                role="radio"
                aria-checked={allDay === v}
                onClick={() => setAllDay(v as boolean)}
                className={`cursor-pointer rounded-[2px] px-4 py-2 transition ${allDay === v ? "bg-forest text-white" : "text-muted hover:text-ink"}`}
              >
                {label as string}
              </button>
            ))}
          </div>
        </div>

        <label htmlFor="salary" className="mt-9 block text-[0.68rem] font-semibold tracking-[0.24em] text-muted uppercase">
          Monthly salary · {rs(salary)}
        </label>
        <input
          id="salary"
          type="range"
          min={80000}
          max={150000}
          step={5000}
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="mt-4 w-full accent-[#1b4235]"
        />
        <div className="mt-1 flex justify-between text-sm text-muted">
          <span>Rs 80,000</span>
          <span>Rs 150,000</span>
        </div>

        <dl className="mt-8 divide-y divide-rule border-y border-rule text-body">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between py-3">
              <dt className="text-muted">{k}</dt>
              <dd>{rs(v)}</dd>
            </div>
          ))}
          <div className="flex justify-between py-3 font-semibold">
            <dt>{allDay ? "Per person, × 3 to cover nights" : "One person, day shift only"}</dt>
            <dd>{rs(perPerson)}</dd>
          </div>
        </dl>
        <p className="mt-6 flex items-baseline justify-between">
          <span className="text-lead text-ink">Every month</span>
          <span className="text-[2rem] font-semibold tracking-tight text-ink">{rs(staff)}</span>
        </p>
        <p className="mt-4 text-sm leading-[1.7] text-muted">
          Before leave cover, sick days, meals, uniforms, training and gratuity. And one
          person speaks two or three languages, not eleven.
        </p>
      </div>

      {/* the plan */}
      <div className="flex flex-col bg-forest p-10 text-white max-md:p-6">
        <h3 className="h-title">Leona Concierge</h3>
        <p className="mt-2 text-sm text-white/70">{PLAN.name} plan, 24 hours, 11 languages</p>
        <p className="mt-9 text-[2rem] font-semibold tracking-tight">{rs(PLAN.price)}</p>
        <p className="text-sm text-white/70">a month, no EPF, no ETF, no days off</p>

        <div className="mt-auto border-t border-white/15 pt-8 max-md:mt-10">
          <span className="eyebrow">You keep</span>
          <p className="mt-3 font-display text-[3.4rem] leading-none text-gold max-md:text-[2.6rem]">{rs(saved)}</p>
          <p className="mt-2 text-white/80">a month, {rs(saved * 12)} a year</p>
        </div>
      </div>
    </div>
  );
}
