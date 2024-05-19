export const areValidUserCredential = (userInput: any) => {
    if (!userInput) return false;

    const { user, password } = userInput;
    if (!(user && password)) return false;

    return true;
};

export const isAuthorized = async (
    userRegistered: any,
    userInput: any,
    bcrypt: any
) => {
    if (!userRegistered) return false;

    const hash = userRegistered.password ?? "";
    const matched = await bcrypt.compare(userInput.password, hash);

    return matched;
};
