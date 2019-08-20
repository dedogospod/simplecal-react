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