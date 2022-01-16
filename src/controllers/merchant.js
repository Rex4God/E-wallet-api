const Merchants = require("../models/Merchants");
const {StatusCodes} =require('http-status-codes')
const passport =require('../middleware/passport')
const { BadRequestError, NotFoundError } = require('../errors');
const Wallet = require("../models/Wallet");

const create= async(req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //creating of card
  const merchant = {
    usersId: req.body.usersId,
    merchantName: req.body.merchantName,
    merchantTransaction: req.body.merchantTransaction,
    amount: req.body.amount,
  };

  //  Saving  Life Style  card
  Merchants.create(merchant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Error while trying to create Merchants detail"
      });
    });
};
const getAllMerchantTransactions = async(req, res) => {
  const usersId = req.query.usersId;
  const condition = usersId ?{ usersId: { [Op.like]: `%${usersId}%` } } : null;

  Merchants.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Some error occurred while retrieving Merchants Details."
      });
    });
};
const getTransaction=async (req, res) => {
  const id = req.params.id;

  Merchants.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving Merchants Details with id=" + id
      });
    });
};
const updateMerchant= (req, res) => {
    const id = req.params.id;
  
    Wallet.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Merchant was updated successfully."
          });
        } else {
          res.status(StatusCodes.BAD_REQUEST).send({ message: `Cannot update merchant with id=${id}. Maybe meerchant was not found or req.body is empty!`});
        }
      })
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Error updating merchant with id=" + id
        });
      });
  };
  
  const deleteMerchant = (req, res) => {
    const id = req.params.id;
  
    Wallet.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(StatusCodes.success).send({ message: "merchant  was deleted successfully!" });
        } else {
          res.status(StatusCodes.NOT_FOUND).send({message: `Cannot delete merchant with id=${id}. Maybe merchant card was not found!`
          });
        }
      })
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Could not delete merchant with id=" + id
        });
      });
    };
  
  const deleteAll = (req, res) => {
      Merchants.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ 
            message: `${nums} Merchants were deleted successfully!` });
        })
        .catch(err => {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message:
              err.message || "Some error occurred while removing all merchants details."
          });
        });
    };

module.exports={
  create,
  getAllMerchantTransactions,
  getTransaction,
  deleteAll,
  updateMerchant,
  deleteMerchant
}
