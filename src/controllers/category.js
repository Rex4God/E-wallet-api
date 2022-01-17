const Category = require("../models/Category");
const {StatusCodes} =require('http-status-codes')
const passport =require('../middleware/passport')
const { BadRequestError, NotFoundError } = require('../errors')

const create= async(req, res) => {
  // Validate request
  if (!req.body.usersId) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //creating of card
  const category = {
    usersId: req.body.usersId,
    categoryName: req.body.categoryName,
    amount: req.body.amount,
  };

  //  Saving  Life Style  card
  Category.create(category)
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
const getAllCategory = async(req, res) => {
  const usersId = req.query.usersId;
  const condition = usersId? { usersId: { [Op.like]: `%${usersId}%` } } : null;

  Category.findAll({ where: condition })
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
const getCategory=async (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving categories with id=" + id
      });
    });
};
const updateCategory= (req, res) => {
    const id = req.params.id;
  
    Category.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.status(StatusCodes.BAD_REQUEST).send({ message: `Cannot update category with id=${id}. Maybe Category was not found or req.body is empty!`});
        }
      })
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Error updating category with id=" + id
        });
      });
  };
  
  const deleteCategory = (req, res) => {
    const id = req.params.id;
  
    Category.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
        res.send({ message: "Category  was deleted successfully!" });
        } else {
          res.status(StatusCodes.NOT_FOUND).send({message: `Cannot delete Category with id=${id}. Maybe category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Could not delete category with id=" + id
        });
      });
    };
  
  const deleteAll = (req, res) => {
      Category.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ 
            message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message:
              err.message || "Some error occurred while removing all Categories."
          });
        });
    }

module.exports={
  create,
  getAllCategory,
  getCategory,
  deleteAll,
  updateCategory,
  deleteCategory
}
