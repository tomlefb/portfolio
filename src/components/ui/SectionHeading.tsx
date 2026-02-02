import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  const alignment = {
    left: 'text-left',
    center: 'text-center mx-auto',
  };

  return (
    <div ref={ref} className={`max-w-3xl mb-12 md:mb-16 ${alignment[align]} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-4"
        style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}
      >
        <span className="w-8 h-0.5 bg-orange-500" />
        <span className="text-sm font-medium text-orange-600 uppercase tracking-wider">
          {title}
        </span>
      </motion.div>
      {subtitle && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 leading-tight"
        >
          {subtitle}
        </motion.h2>
      )}
    </div>
  );
}
