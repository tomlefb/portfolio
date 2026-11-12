import type { ProjectSection } from '../../types';
import { Diagram } from '../diagrams/Diagram';

interface SectionBlockProps {
  section: ProjectSection;
  color: string;
}

export function SectionBlock({ section, color }: SectionBlockProps) {
  return (
    <section className="pj-section">
      <h2 className="title-md">{section.title}</h2>
      <div className="pj-section__text">
        {section.body && <p>{section.body}</p>}
        {section.items && (
          <ul>
            {section.items.map((item) => (
              <li key={item.lead}>
                <strong>{item.lead}.</strong> {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
      {section.diagram && (
        <div className="pj-section__diagram">
          <Diagram id={section.diagram} color={color} />
        </div>
      )}
    </section>
  );
}
