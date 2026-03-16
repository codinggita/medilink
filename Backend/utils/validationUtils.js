const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );
};

const validateRegistration = (data) => {
    const errors = [];
    if (!data.name) errors.push('Name is required');
    if (!data.email || !validateEmail(data.email)) errors.push('Valid email is required');
    if (!data.password || data.password.length < 6) errors.push('Password must be at least 6 characters');
    if (!data.role || !['doctor', 'patient'].includes(data.role)) errors.push('Valid role is required');
    if (!data.phoneNumber) errors.push('Phone number is required');
    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = { validateRegistration };
