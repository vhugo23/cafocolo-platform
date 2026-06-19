import { redirect } from "next/navigation";

export default function LegacyPublicSiteRedirectPage() {
  /*
   * Temporary compatibility route.
   * The public homepage now lives at /.
   * /site redirects to / so older links still work.
   */
  redirect("/");
}