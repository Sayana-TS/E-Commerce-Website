import jwt from 'jsonwebtoken'

const generateToken =  async(res, userId) => {

    const token = jwt.sign({userId : userId}, process.env.JWT_SECRET, {expiresIn : '30d'})

    res.cookie('jwt', token, {
        httpOnly : true,
        secure : false,
        sameSite : 'strict',
        maxAge : 30 * 24 * 60 * 60 * 1000
    })
}


export default generateToken