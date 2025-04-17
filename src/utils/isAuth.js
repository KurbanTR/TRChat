const isAuth = () => {
    const token = localStorage.getItem('token')
    return Boolean(token)
}

export default isAuth