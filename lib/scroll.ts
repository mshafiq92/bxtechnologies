/**
 * Page reloads start at the top (owner decision 2026-11-12). Browsers normally restore the old
 * scroll position on reload; this inline script, run in <head> before first paint, turns that off
 * for reloads only. Back and forward keep their usual scroll restoration, and a reload of a URL
 * with a #section still lands on that section.
 */
export function scrollTopOnReloadScript(): string {
  return `try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"&&!location.hash){if("scrollRestoration" in history)history.scrollRestoration="manual";window.scrollTo(0,0);window.addEventListener("load",function(){window.scrollTo(0,0);setTimeout(function(){history.scrollRestoration="auto"},0)})}}catch(e){}`;
}
