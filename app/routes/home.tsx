import type { Route } from "./+types/home";
import CurriculumPage from './page';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Carlos Schneider" },
    { name: "description", content: "Carlos' home page" },
  ];
}

export default function Home() {
  return <CurriculumPage />;
}
