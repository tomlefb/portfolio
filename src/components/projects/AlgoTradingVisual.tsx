import { motion } from 'framer-motion';
import { Database, Brain, LineChart, Zap, Activity } from 'lucide-react';

interface AlgoTradingVisualProps {
  showDetails?: boolean;
}

export function AlgoTradingVisual({ showDetails = false }: AlgoTradingVisualProps) {
  const steps = [
    {
      icon: Database,
      label: 'Données MT5',
      color: 'from-blue-500 to-blue-600',
      delay: 0,
    },
    {
      icon: Brain,
      label: 'Analyse LLM',
      color: 'from-purple-500 to-purple-600',
      delay: 0.2,
    },
    {
      icon: LineChart,
      label: 'Stratégie',
      color: 'from-orange-500 to-orange-600',
      delay: 0.4,
    },
    {
      icon: Zap,
      label: 'Exécution',
      color: 'from-green-500 to-green-600',
      delay: 0.6,
    },
    {
      icon: Activity,
      label: 'Monitoring',
      color: 'from-cyan-500 to-cyan-600',
      delay: 0.8,
    },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Flowing data lines animation */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <motion.path
          d="M 0 50 Q 25 30 50 50 T 100 50"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        />
        <motion.path
          d="M 0 60 Q 35 40 50 60 T 100 60"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="0.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatType: 'loop' }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pipeline visualization */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className={`flex items-center ${showDetails ? 'gap-3 md:gap-6' : 'gap-2 md:gap-4'}`}>
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: step.delay, duration: 0.4 }}
              className="flex items-center"
            >
              {/* Step node */}
              <div className="relative group">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(249, 115, 22, 0)',
                      '0 0 0 8px rgba(249, 115, 22, 0.1)',
                      '0 0 0 0 rgba(249, 115, 22, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: step.delay,
                  }}
                  className={`${
                    showDetails ? 'w-14 h-14 md:w-16 md:h-16' : 'w-10 h-10 md:w-12 md:h-12'
                  } rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                >
                  <step.icon
                    className="text-white"
                    size={showDetails ? 24 : 18}
                  />
                </motion.div>

                {/* Label */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: step.delay + 0.2 }}
                  className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap ${
                    showDetails ? 'text-xs' : 'text-[10px]'
                  } font-medium text-white/80`}
                >
                  {step.label}
                </motion.span>
              </div>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: step.delay + 0.3, duration: 0.3 }}
                  className={`${
                    showDetails ? 'w-6 md:w-10' : 'w-4 md:w-6'
                  } h-0.5 bg-gradient-to-r from-white/40 to-white/20 mx-1 origin-left`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-500 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Title overlay for card view */}
      {!showDetails && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-900 to-transparent p-4">
          <p className="text-xs text-white/60 text-center">
            Pipeline de trading automatisé
          </p>
        </div>
      )}
    </div>
  );
}
