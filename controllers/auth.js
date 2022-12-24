import { db  } from '../connectDB.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    const verificationQuery = "SELECT * FROM users WHERE username = ?";

    db.query(verificationQuery, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err)

        if(data.length) return res.status(409).json("Usuario ja existe")

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO users (`username`, `email`, `pass`, `nome`) VALUES (?)";

        const reqValues = [req.body.username, req.body.email, hashedPassword, req.body.name]
    
        db.query(insertQuery, [reqValues], (err, data) => {
            if(err) return res.status(500).json(err)

            return res.status(200).json("Usuario criado com sucesso")
        } )
    })

    
    
}

export const login = (req, res) => {
    const verificationQuery = "SELECT * FROM users WHERE username = ?";

    db.query(verificationQuery, [req.body.username], (err, data) => {
        if(err) return res.status(500).json(err)

        if(data.length === 0) return res.status(404).json("Uusario nao existe")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].pass);

        if(!checkPassword) return res.status(400).json("Usuario ou senha incorretos")

        const token = jwt.sign({id: data[0].id}, "secretkey");
        const {password, ...others}= data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others)
    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("Deslogado")
}