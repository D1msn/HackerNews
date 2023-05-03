export const PAGES = {
    HOME: '/',
    NEWS_DETAIL: '/:id'
}

export const BASE_URL = 'https://hacker-news.firebaseio.com/v0'
export const AUTO_UPDATE_FEED_MC = 60000

export const SANITIZER_CONFIG = {
    ALLOWED_TAGS: ['div', 'span', 'a', 'p', 'h2', 'h3', 'br'],
    ALLOWED_ATTR: ['href'],
}

export const QUERY_KEYS = {
    PROJECTS: 'projects',
    DETAIL: 'detailPage_',
    STORY: 'story_',
    COMMENT: 'comment_',
}
