const bcrypt = require("bcrypt")
const User = require("../models/User")


// Renderiza formulários
const showLoginForm = async (req, res) => {
    res.render("login", { message:"", type:"" });
};

const showRegisterForm = async (req, res) => {
    res.render("register", { message:"", type:"" })
}


const register = async (req, res) => {
    try {
        // Captura os dados do body
        const { email, password } = req.body

        // Valida se data, email, password são validos de enstão sendo enviados
        if (!email || !password) {
            return res.render("register", { message: "Preencha todos os campos", type: "danger" })
        }

        // Verifica se o e-mail já está cadastrado
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.render("register", { message: "Este e-mail ja foi usado", type: "danger"  })
        }

        // Hash da senha antes de criar e armazenar do banco de dados
        const hashPassword = await bcrypt.hash(password, 10)

        if (hashPassword) {
            // Cria o usuário no banco de dados
            await User.create({ email, password: hashPassword })
            return res.render("register", { message: "E-mail cadastrado com sucesso!", type: "success"  })
        }

        // Redireciona para a página register
        res.redirect("login")

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Verifique se o email e a senha foram fornecidos
        if (!email || !password) {
            return res.render("login", { message: "Email e senha são obrigatórios", type: "danger"  })
        }

        // Busque o usuário no banco de dados pelo email
        const user = await User.findOne({ email }).select('+password')

        // Verifica se o usuário existe
        if (!user) {
            return res.render("login", { message: "Usuário não encontrado", type: "danger" })
        }

        // Comparando a senha fornecida com a senha do usuário
        const isPasswordValid = await bcrypt.compare(password, user.password)

        // Verifique se as senhas coincidem
        if (!isPasswordValid) {
            return res.render("login", { message: "Email ou senha incorretos", type: "danger" })
        }

        // Login bem-sucedido
        res.redirect("/tasks") // Redireciona para pagina de tarefas

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

module.exports = {
    showLoginForm,
    showRegisterForm,
    register,
    login
};
