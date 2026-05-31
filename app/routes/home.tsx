import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Carlos Schneider" },
    { name: "description", content: "Carlos' home page" },
  ];
}

export default function Home() {
  return <Welcome />;
}
