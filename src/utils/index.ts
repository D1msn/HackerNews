import {QUERY_KEYS} from "../constants";

export const openUrlInNewWindow = (
    url: string,
    focusWindow = false,
) => {
    const newWindow = window.open(url, '_blank')
    if (focusWindow) {
        newWindow?.focus()
    }
}

export const getDateString = (time: number) =>  new Date(time * 1000).toLocaleString() || ''

export const getQueryIdKey = (id: number, type: keyof typeof QUERY_KEYS) => [`${QUERY_KEYS[type]}${id}`]
