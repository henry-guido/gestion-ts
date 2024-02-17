import type * as HeroIcons from '@heroicons/react/24/outline'
export type IconName = keyof typeof HeroIcons

export default interface Link {
  title: string
  icon: IconName
  path: string
  variant: 'default' | 'ghost'
}