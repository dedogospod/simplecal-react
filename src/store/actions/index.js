export const setAuthUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const setDays = (days) => {
    return {
        type: 'SET_DAYS',
        payload: days
    }
}

export const setDay = (day) => {
    return {
        type: 'SET_DAY',
        payload: day
    }
}

export const setEntries = (entries) => {
    return {
        type: 'SET_ENTRIES',
        payload: entries
    }
}

export const setIntervals = (intervals) => {
    return {
        type: 'SET_INTERVALS',
        payload: intervals
    }
}

export const setSelectedInterval = (interval) => {
    return {
        type: 'SET_SELECTED_INTERVAL',
        payload: interval
    }
}