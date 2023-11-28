const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/

async function register(req, res) {
    const { email, firstName, lastName, password, passwordConfirm } = req.body

    if (!email || !firstName || !lastName || !password || !passwordConfirm) return res.status(422).json({ message: 'Invalid or blank fields' })
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Invalid email!' })
    if (password !== passwordConfirm) return res.status(422).json({ message: 'Passwords do not match!' })

    const userExists = await User.exists({ email })

    if (userExists) return res.status(409).json({ message: 'This email is already registered!' })

    try {
        let hashedPassword = await bcrypt.hash(password, 10)

        await User.create({ email, firstName, lastName, password: hashedPassword, refreshToken: null })

        return res.sendStatus(201)
    } catch (err) {
        console.log("UserCreate Error:", err)
        return res.status(400).json({ message: 'Could not register the user' })
    }

}
async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) return res.status(422).json({ message: 'There are blank fields' })
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Invalid email!' })

    const user = await User.findOne({ email })

    if (!user) return res.status(401).json({ message: 'Email or password is incorrect!' })

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) return res.status(401).json({ message: 'Email or password is incorrect!' })

    const accessToken = jwt.sign(
        {
            userId: user.userId,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1800s'
        }
    )

    const refreshToken = jwt.sign(
        {
            userId: user.userId,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1d'
        }
    )

    user.refreshToken = refreshToken
    await user.save()

    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    res.json({ accessToken: accessToken })

}
async function logout(req, res) {
    const cookies = req.cookies

    if (!cookies.refreshToken) return res.sendStatus(204)

    const refreshToken = cookies.refreshToken
    const user = await User.findOne({ refreshToken: refreshToken })

    if (!user) {
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }

    user.refreshToken = null
    await user.save()

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true})
    res.sendStatus(204)
}

async function refresh(req, res) {
    const cookies = req.cookies
    if (!cookies.refreshToken) return res.sendStatus(401)

    const refreshToken = cookies.refreshToken

    const user = await User.findOne({ refreshToken: refreshToken })

    if (!user) return res.status(403).json({ message: "User not found" })

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.userId !== decoded.userId) return res.sendStatus(403)

            const accessToken = jwt.sign(
                { userId: decoded.userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1800s' }
            )

            res.json({ accessToken: accessToken })
        }
    )
}
async function user(req, res) {
    const user = req.user

    return res.status(200).json(user)
}

module.exports = { register, login, logout, refresh, user }