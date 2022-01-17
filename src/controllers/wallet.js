const Wallet = require("../models/Wallet");
const {StatusCodes} =require('http-status-codes')
const passport =require('../middleware/passport')
const { BadRequestError, NotFoundError } = require('../errors')

const create= (req, res) => {
  // Validate request
  if (!req.body.usersId) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //creating of card
  const wallet = {
    usersId: req.body.usersId,
    income: req.body.income,
    spent: req.body.spent
  };

  //  Saving  Life Style  card
  Wallet.create(wallet)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Error while trying to create a wallet"
      });
    });
};
const getAllWallets = async(req, res) => {
  const usersId = req.query.usersId;
  const condition = usersId? { usersId: { [Op.like]: `%${usersId}%` } } : null;

  Wallet.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Some error occurred while retrieving wallet."
      });
    });
};
const getWallet=(req, res) => {
  const id = req.params.id;

  Wallet.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving wallet with id=" + id
      });
    });
};
const updateWallet= (req, res) => {
    const id = req.params.id;
  
    Wallet.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Wallet was updated successfully."
          });
        } else {
          res.status(StatusCodes.BAD_REQUEST).send({ message: `Cannot update wallet with id=${id}. Maybe wallet was not found or req.body is empty!`});
        }
      })
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Error updating wallet with id=" + id
        });
      });
  };
  
  const deleteWallet = (req, res) => {
    const id = req.params.id;
  
    Wallet.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({ message: "LifeStyle wallet  was deleted successfully!" });
        } else {
          res.status(StatusCodes.NOT_FOUND).send({message: `Cannot delete wallet with id=${id}. Maybe wallet card was not found!`
          });
        }
      })
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Could not delete wallet with id=" + id
        });
      });
    };
  
  const deleteAll = (req, res) => {
      Wallet.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ 
            message: `${nums} wallets were deleted successfully!` });
        })
        .catch(err => {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message:
              err.message || "Some error occurred while removing all LifeStyle cards."
          });
        });
    };
  

module.exports={
  create,
  getAllWallets,
  getWallet,
  updateWallet,
  deleteWallet,
  deleteAll
}
