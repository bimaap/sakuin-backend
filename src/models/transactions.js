const { prisma } = require("../../prisma/constants/config");

exports.getTransactions = async (req, cb) => {
    let transactions, allTransactions;
    try {
        let limit = parseInt(req.query.limit)? parseInt(req.query.limit):6
        let page = parseInt(req.query.page)? parseInt(req.query.page):1

        allTransactions = await prisma.transactions.findMany({
            where: {
                sender_id: {
                    contains: req.authResult.id,
                },
            },
        });

        transactions = await prisma.transactions.findMany({
            skip: page == 1? 0: ((page-1)*limit),
            take: limit,
            where: {
                OR: [
                    { sender_id: { contains: req.authResult.id }},
                    { receiver_id: { contains: req.authResult.id }},
                ]
            },
            orderBy: {
                id: 'asc',
            },
        })

        const pageInfo = {}

        pageInfo.totalData = allTransactions.length
        pageInfo.totalPage = Math.ceil(allTransactions.length/limit)
        pageInfo.currentPage = page
        pageInfo.nextPage = page == Math.ceil(allTransactions.length/limit)? null : (page+1)
        pageInfo.prevPage = page == 1? null : (page-1)

        return cb(null, 'All transactions data', transactions, pageInfo)
    } catch (error) {
        return cb(error.message)
    }
}

exports.getTransactionById = async (req, cb) => {
    let transaction;
    try {
        transaction = await prisma.transactions.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        });
        
        if(!transaction){
            return cb('Transaction not found')
        }

        return cb(null, 'Transaction data', transaction)
    } catch (error) {
        return cb(error.message)
    }
}

exports.postTransfer = async (req, cb) => {
    let transfer, user, receiver;
    try {
        user = await prisma.users.findUnique({
            where:{
                id: req.authResult.id
            }
        });

        receiver = await prisma.users.findUnique({
            where:{
                id: req.params.id
            }
        });

        if(!receiver) return cb('Receiver not found')

        if(parseInt(user.balance) < parseInt(req.body.amount)) return cb('Not enough money')

        transfer = await prisma.transactions.create({
            data: {
                sender_id: req.authResult.id,
                receiver_id: req.params.id,
                status: 'Success',
                amount: req.body.amount,
                notes: req.body.notes,
                type: 'Transfer',
                date: String(Date.now()),
                sender_name: `${user.first_name} ${user.last_name}`,
                sender_image: user.image,
                receiver_name: `${receiver.first_name} ${receiver.last_name}`,
                receiver_image: receiver.image
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

        await prisma.users.update({
            where: {
              id: req.params.id
            },
            data: {
              balance: parseInt(receiver.balance) + parseInt(req.body.amount)
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