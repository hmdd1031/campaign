import {
  Key,
  ShieldCheck,
  FileWarning,
  Laptop,
  Smartphone,
  Wifi,
  Eye,
  MapPin,
  UserX,
  Link2,
  Search,
  RefreshCw,
} from "lucide-react";

export const ICON_MAP = {
  Key,
  ShieldCheck,
  FileWarning,
  Laptop,
  Smartphone,
  Wifi,
  Eye,
  MapPin,
  UserX,
  Link2,
  Search,
  RefreshCw,
};

export function getIcon(name) {
  return ICON_MAP[name] || Key;
}
