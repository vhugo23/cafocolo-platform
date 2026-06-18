import { redirect } from "next/navigation";

export default function LegacyLeadsRedirectPage() {
  /*
   * Temporary compatibility route.
   * Leads now live under /admin/leads, but old links should not break.
   */
  redirect("/admin/leads");
}