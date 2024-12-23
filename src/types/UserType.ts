interface User{
    email: string,
    roles: { id: number, name: string }[],
    enabled: boolean
}

export default User;