
const authentication = require('./authentication')
const providingAccount = require('./providingAccount')

const executiveBoard = {
    register: authentication.register,
    login: authentication.login,
    providingFactoryAccount: providingAccount.factory,
    providingAgencyAccount: providingAccount.agency,
    providingInsuranceAccount: providingAccount.insurance
}
module.exports = executiveBoard