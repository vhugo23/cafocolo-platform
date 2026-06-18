import { redirect } from "next/navigation";

export default function LegacyProjectsRedirectPage() {
  /*
   * Temporary compatibility route.
   * Projects now live under /admin/projects, but old links should not break.
   */
  redirect("/admin/projects");
}