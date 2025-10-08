// Script to help systematically replace hardcoded colors with theme system
// This provides a reference for all the color replacements needed

const colorMappings = {
  // Text colors
  'text-zinc-900 dark:text-white': 'themeColors.text.primary',
  'text-zinc-800 dark:text-white': 'themeColors.text.primaryHeading', 
  'text-zinc-700 dark:text-gray-100': 'themeColors.text.tertiary',
  'text-zinc-600 dark:text-gray-200': 'themeColors.text.secondary',
  'text-zinc-500 dark:text-gray-300': 'themeColors.text.muted',
  'text-gray-600 dark:text-gray-400': 'themeColors.text.subtle',
  'text-gray-500 dark:text-gray-400': 'themeColors.text.caption',
  'text-gray-900 dark:text-white': 'themeColors.text.primary',
  'text-gray-800 dark:text-gray-200': 'themeColors.text.inputLabel',
  'text-zinc-600 dark:text-gray-300': 'themeColors.text.inputLabelAlt',
  
  // Background colors
  'bg-zinc-50/50 dark:bg-slate-800': 'themeColors.background.card',
  'bg-white dark:bg-slate-800': 'themeColors.background.cardSolid',
  'bg-zinc-100 dark:bg-slate-700': 'themeColors.background.muted',
  'bg-zinc-100/70 dark:bg-slate-800': 'themeColors.background.subtle',
  'bg-gray-100 dark:bg-gray-800': 'themeColors.tag.background',
  
  // Border colors
  'border-zinc-200/60 dark:border-slate-700': 'themeColors.border.card',
  'border-zinc-200 dark:border-slate-700': 'themeColors.border.secondary',
  'border-gray-200 dark:border-gray-700': 'themeColors.border.divider',
  
  // Interactive colors
  'hover:bg-zinc-50 dark:hover:bg-slate-800': 'themeColors.background.hover',
  'hover:bg-zinc-100 dark:hover:bg-slate-800': 'themeColors.background.hoverLight',
  'hover:text-blue-600 dark:hover:text-blue-400': 'themeColors.interactive.hoverText',
  
  // Tag colors
  'bg-zinc-100 dark:bg-gray-800 text-zinc-600 dark:text-gray-300': 'themeColors.tag.background + " " + themeColors.tag.text',
  
  // Special elements
  'bg-blue-600 dark:bg-blue-500': 'themeColors.special.timeline',
  'text-gray-600 dark:text-gray-400': 'themeColors.special.scrollDown'
};

// Components that need updates (as reference)
const componentsToUpdate = [
  'components/sections/About.tsx',
  'components/sections/Skills.tsx', 
  'components/sections/Experience.tsx',
  'components/sections/Projects.tsx',
  'components/sections/Contact.tsx'
];

console.log('Color mappings for systematic replacement:');
Object.entries(colorMappings).forEach(([hardcoded, themed]) => {
  console.log(`"${hardcoded}" -> "${themed}"`);
});

console.log('\nComponents to update:', componentsToUpdate);