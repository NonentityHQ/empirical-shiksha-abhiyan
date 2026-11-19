import type { ComponentType } from "react";
import {
  BarChart3, BookOpen, Brain, Brush, CalendarDays, Check, Clock, Crown, Droplet, Flame, GraduationCap,
  Heart, Home, LayoutGrid, Laptop, Leaf, Lightbulb, Mail, MapPin, Phone, Play, Recycle, School, Search,
  ShieldCheck, Sprout, Images, ArrowLeft, Star, Target, Trash2, TreeDeciduous, Trophy, User, Users, Zap, ArrowRight,
  type LucideProps,
} from "lucide-react";

/* Every icon on the site now comes from lucide-react. Same names as before, so no page needs to change. */
export const ICONS: Record<string, ComponentType<LucideProps>> = {
  book: BookOpen, broom: Brush, leaf: Leaf, heart: Heart, users: Users, drop: Droplet, pin: MapPin,
  school: School, cap: GraduationCap, laptop: Laptop, trophy: Trophy, chart: BarChart3, trash: Trash2,
  target: Target, sprout: Sprout, user: User, calendar: CalendarDays, brain: Brain, play: Play, home: Home,
  phone: Phone, mail: Mail, grid: LayoutGrid, star: Star, bulb: Lightbulb, arrow: ArrowRight, crown: Crown,
  flame: Flame, bolt: Zap, search: Search, shield: ShieldCheck, clock: Clock, tree: TreeDeciduous,
  check: Check, recycle: Recycle, images: Images, back: ArrowLeft,
};
export const AREA_ICON: Record<string, string> = { shiksha: "book", swachhata: "broom", paryavaran: "leaf", swasthya: "heart" };

export const AIcon = ({ n, s = 22, duo = false }: { n: string; s?: number; duo?: boolean }) => {
  const Cmp = ICONS[n] ?? Star;
  return <Cmp size={s} strokeWidth={duo ? 1.6 : 2} fill="none" aria-hidden />;
};
