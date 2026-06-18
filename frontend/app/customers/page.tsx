import { redirect } from "next/navigation";

export default function LegacyCustomersRedirectPage() {
  /*
   * Temporary compatibility route.
   * Customers now live under /admin/customers, but old links should not break.
   */
  redirect("/admin/customers");
}