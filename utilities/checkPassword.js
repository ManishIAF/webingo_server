import bcrypt from "bcrypt";

const checkPassword = async(password, hashedPassword) => {

    const isPasswordCorrect = await bcrypt.compare(
        password,
        hashedPassword
    )

    return isPasswordCorrect;

}

export default checkPassword;