import type { CSSProperties } from 'react';
import type { Timeline as TimelineData } from '../../types';

interface TimelineProps {
  data: TimelineData;
  caption: string;
  todayLabel: string;
  ongoingLabel: string;
  /** Date du jour en année décimale ; calculée si absente. */
  today?: number;
}

function decimalYear(date: Date): number {
  return date.getFullYear() + (date.getMonth() + date.getDate() / 31) / 12;
}

/**
 * Frise du parcours : deux lignes (formation, expérience) sur un axe en années.
 * Horizontale sur grand écran, verticale sur mobile : les positions sont données en
 * fractions (--a, --b) et chaque orientation les applique à sa dimension.
 */
export function Timeline({ data, caption, todayLabel, ongoingLabel, today }: TimelineProps) {
  const span = data.end - data.start;
  const at = (year: number) => Math.min(1, Math.max(0, (year - data.start) / span));
  const now = at(today ?? decimalYear(new Date()));
  const years = Array.from({ length: Math.floor(data.end) - Math.ceil(data.start) + 1 }, (_, i) => Math.ceil(data.start) + i);
  const pos = (from: number, to: number, extra: Record<string, string> = {}) =>
    ({ '--a': at(from), '--b': at(to), ...extra }) as CSSProperties;

  return (
    <figure className="tl" aria-label={caption} style={{ '--now': now } as CSSProperties}>
      <div className="tl__axis" aria-hidden="true">
        {years.map((year) => (
          <span key={year} className="tl__year" style={pos(year, year)}>
            {year}
          </span>
        ))}
        <span className="tl__today">{todayLabel}</span>
      </div>
      <span className="tl__now" aria-hidden="true" />

      <div className="tl__lanes">
        {data.lanes.map((lane) => (
          <section key={lane.kind} className="tl__lane">
            <h2 className="tl__lane-title">{lane.label}</h2>
            <ol className="tl__track">
              {years.map((year) => (
                <li key={`grid-${year}`} className="tl__grid" style={pos(year, year)} aria-hidden="true" />
              ))}
              {data.bars
                .filter((bar) => bar.lane === lane.kind)
                .map((bar) => {
                  const done = bar.ongoing ? (now - at(bar.from)) / (at(bar.to) - at(bar.from)) : 1;
                  return (
                    <li
                      key={bar.title}
                      className={`tl__bar${bar.ongoing ? ' tl__bar--ongoing' : ''}${bar.upcoming ? ' tl__bar--next' : ''}`}
                      data-testid={bar.upcoming ? 'tl-next' : 'tl-bar'}
                      data-ongoing={bar.ongoing ? 'true' : undefined}
                      style={pos(bar.from, bar.to, { '--done': `${(Math.max(0, Math.min(1, done)) * 100).toFixed(1)}%` })}
                    >
                      <span className="tl__label">
                        <span className="tl__title">{bar.title}</span>
                        <span className="tl__detail">
                          {bar.detail}
                          {bar.ongoing && ` · ${ongoingLabel}`}
                        </span>
                      </span>
                    </li>
                  );
                })}
              {lane.kind === 'experience' &&
                data.stages.map((stage, index) => (
                  <li
                    key={stage.title}
                    className="tl__stage"
                    data-testid="tl-stage"
                    style={pos(stage.from, stage.to, { '--row': String(index) })}
                  >
                    <span className="tl__tick" aria-hidden="true" />
                    <span className="tl__stage-label">
                      <span className="tl__title">{stage.title}</span>
                      <span className="tl__detail">{stage.detail}</span>
                    </span>
                  </li>
                ))}
            </ol>
          </section>
        ))}
      </div>
    </figure>
  );
}
