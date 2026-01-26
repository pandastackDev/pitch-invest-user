/**
 * Get the list of allowed admin emails from environment variables
 * @returns Array of lowercase email addresses
 */
export const getAllowedEmails = (): string[] => {
	const envEmails = import.meta.env.VITE_ALLOWED_ADMIN_EMAILS;
	
	if (!envEmails) {
		console.warn('⚠️ VITE_ALLOWED_ADMIN_EMAILS not set in .env file. No emails will be allowed to sign in.');
		return [];
	}

	// Split by comma, trim whitespace, convert to lowercase
	return envEmails
		.split(',')
		.map((email: string) => email.trim().toLowerCase())
		.filter((email: string) => email.length > 0);
};

/**
 * Check if an email is in the allowed list
 * @param email - Email address to check
 * @returns true if email is allowed, false otherwise
 */
export const isEmailAllowed = (email: string | null | undefined): boolean => {
	if (!email) return false;
	
	const allowedEmails = getAllowedEmails();
	const emailLowerCase = email.trim().toLowerCase();
	
	return allowedEmails.includes(emailLowerCase);
};
