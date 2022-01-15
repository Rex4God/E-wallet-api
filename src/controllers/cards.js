const Card = require("../models/Card");
const {StatusCodes, METHOD_FAILURE} =require('http-status-codes')
//const passport =require('../middleware/passport')
const { BadRequestError, NotFoundError } = require('../errors')

const create= async(req, res) => {
  // Validate request
  if (!req.body.createdBy) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //creating of card
  const card = {
    createdBy: req.body.createdBy,
    cardType: req.body.cardType,
    amount: req.body.amount
  };

  //  Saving  Life Style  card
  Card.create(card)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Error while trying to create a Lifestyle Card"
      });
    });
};
const getAllCards = async(req, res) => {
  const createdBy = req.query.createdBy;
  const condition = createdBy? { createdBy: { [Op.like]: `%${createdBy}%` } } : null;

  Card.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Some error occurred while retrieving Life Style Cards."
      });
    });
};
const getCard =async (req, res) => {
  const id = req.params.id;

  Card.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
        err.message `Error retrieving cards with id=${id}`
      });
    });
};
const updateCard= (req, res) => {
  const id = req.params.id;

  Card.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: success,
          message: "LifeStyle Card was updated successfully."
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).send({ message: `Cannot update Life Style Card with id=${id}. Maybe Card was not found or req.body is empty!`});
      }
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Error updating Life Card with id=" + id
      });
    });
};

const deleteCard = (req, res) => {
  const id = req.params.id;

  Card.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: success,
          message: "LifeStyle Card  was deleted successfully!"
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).send({message: `Cannot delete Lifestyle Card with id=${id}. Maybe lifestyle card was not found!`
        });
      }
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Could not delete lifestyle card  with id=" + id
      });
    });
  };

const deleteAll = (req, res) => {
    Card.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({
          message: `${nums} Lifestyle Cards were deleted successfully!` });
      })
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message:
            err.message || "Some error occurred while removing all LifeStyle cards."
        });
      });
  };

  const cardType = (req, res) => {
    res.send([
      {
        cardType: "LifeStyle Pro",
        cost: 9000
      },
      {
        cardType: "LifeStyle Premium",
        cost: 1000
      },
      {
        cardType: "LifeStyle Business",
        cost: 1200
      }
    ]);
  }


module.exports={
  create,
  getAllCards,
  getCard,
  updateCard,
  deleteCard,
  deleteAll,
  cardType
}
