import type { ElementType, ReactNode } from 'react';

interface BigTitleProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

/** Titre géant condensé, la signature typographique du site. */
export function BigTitle({ as: Tag = 'h2', children, className = '' }: BigTitleProps) {
  return <Tag className={`title-xl ${className}`}>{children}</Tag>;
}
