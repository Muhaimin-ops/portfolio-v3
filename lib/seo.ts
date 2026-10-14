const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = configuredSiteUrl
  ? configuredSiteUrl.replace(/\/+$/, "")
  : "https://muhaimin.dev";

export const personId = `${siteUrl}/#person`;
