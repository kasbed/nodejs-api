import * as bcrypt from 'bcrypt';

const hashPassword =  (password: string) :string => {
    const salt = bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(password, salt);
}

const isValidPassword = (password: string, hashedPassword :string) :boolean => (bcrypt.compareSync(password, hashedPassword))


export {hashPassword, isValidPassword}