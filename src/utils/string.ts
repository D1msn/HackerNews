export const getFullNameStringAcronym = (
    fullName?: string | null,
    length = 2,
): string =>
    fullName
        ? fullName
            .split(' ')
            .slice(0, length)
            .map((partName) => partName[0])
            .join('')
            .toUpperCase()
        : '?'
