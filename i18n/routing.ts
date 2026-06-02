import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ['ka', 'en', 'ru'],
    defaultLocale: 'en',
    localePrefix: 'as-needed',
    localeDetection: false
})