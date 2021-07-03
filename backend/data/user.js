import bcrypt from 'bcrypjs'

const user = [
    {
        name: 'Admin User',
        email:'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: 'true'
    },
    {
        name: ' Tommy Shelby',
        email:'tommy@email.com',
        password: bcrypt.hashSync('123456',10)
    },
    {
        name: ' John Shelby',
        email:'john@email.com',
        password: bcrypt.hashSync('123456',10) 
    }
]

export default user