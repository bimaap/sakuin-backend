const { prisma } = require("../../prisma/constants/config");

exports.getTransactions = async (req, cb) => {
    let transactions;
    try {
        transactions = await prisma.transactions.findMany({
            where: {
                sender_id: {
                    contains: req.authResult.id,
                },
            },
        });
        return cb(null, 'All transactions data', transactions)
    } catch (error) {
        return cb(error.message)
    }
}

exports.postTransfer = async (req, cb) => {
    let transfer, user;
    try {
        user = await prisma.users.findUnique({
            where:{
                id: req.authResult.id
            }
        });

        if(parseInt(user.balance) < parseInt(req.body.amount)) return cb('Not enough money')

        transfer = await prisma.transactions.create({
            data: {
                sender_id: req.authResult.id,
                receiver_id: req.params.id,
                status: 'Success',
                amount: req.body.amount,
                notes: req.body.notes,
                type: 'Transfer',
                date: String(Date.now())
            }
        });

        await prisma.users.update({
            where: {
              id: req.authResult.id
            },
            data: {
              balance: parseInt(user.balance) - parseInt(req.body.amount)
            },
        })

        return cb(null, 'Transfer success', transfer)
    } catch (error) {
        return cb(error.message)
    }
}

exports.postTopup = async (req, cb) => {
    let topup, user;
    try {
        topup = await prisma.transactions.create({
            data: {
                sender_id: req.authResult.id,
                receiver_id: 'mitra_topup',
                status: 'Success',
                amount: req.body.amount,
                notes: 'Topup',
                type: 'Topup',
                date: String(Date.now())
            }
        });

        user = await prisma.users.findUnique({
            where:{
                id: req.authResult.id
            }
        });

        await prisma.users.update({
            where: {
              id: req.authResult.id
            },
            data: {
              balance: parseInt(user.balance) + parseInt(req.body.amount)
            },
        })

        return cb(null, 'Topup success', topup)
    } catch (error) {
        return cb(error.message)
    }
}