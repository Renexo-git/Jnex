class Demo extends Model {

    /**
     * Class constructor.
     * @access public
     */
    constructor() {
        super();
        this.book = this.sequelize.define("book", {
          code: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
          },
          category: {
            type: Sequelize.STRING
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
          },
          author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
          },
          year: {
            type: Sequelize.STRING
          },
          publishing_company: {
            type: Sequelize.STRING
          }
        });
        this.book.sync();
    }

    /**
     * Count records in the database.
     * @access public
     */
    count() {
        return this.book.findAndCountAll();
    }

    /**
     * Select records in the database.
     * @param {Object} data
     * @access public
     */
    get(data) {
        return data
        ? this.book.findAll({ where: data })
        : this.book.findAll();
    }

    /**
     * Creates multiple lines at once.
     *
     * @param {Object} data
     * @access public
     */
    insertMultiple(data) {
        return this.book.bulkCreate(data);
    }

    /**
     * Create and update records.
     * @param {Object} data
     * @access public
     */
    put(data) {
        if (data.id) {
            return this.book.update(data, {
                where: { id: data.id }
            }).then(result => result ? true : false).catch(error => {
                this.error(error["message"]);
                return false;
            });
        }
        return this.book.create(data).then(result => result ? true : false)
        .catch(error => {
            this.error(error["message"]);
            return false;
        });
    }

    /**
     * Delete records in the database by ID.
     * @param {Object} data
     * @access public
     */
    del(data) {
        return this.book.destroy({
            where: {
                id: { // Route: /demo/book/del/?id=1,2,3...
                    [Sequelize.Op.in]: data.id.split(",").map(item => item)
                }
            }
        }).then(result => result ? true : false).catch(error => {
            this.error(error["message"]);
            return false;
        });
    }
}
module.exports = Demo;
