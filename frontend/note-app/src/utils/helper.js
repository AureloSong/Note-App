export const validateEmail= (email) => {
    const regex = /[^\s@]+[^\s@]+\.[^/s@]+$/;
    return regex.test(email)
}

export const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
}