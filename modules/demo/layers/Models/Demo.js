class Demo extends Model {

    /**
     * Class constructor.
     * @access public
     */
    constructor() {
        super();
        this.define("book", {
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
        this.sync();
    }

    /**
     * Select records in the database.
     * @param {String} query
     * @access public
     */
    selectRecord(query = "") {
        if (query) {
            return this.findAll({
                where: query
            });
        }
        return this.findAll();
    }

    /**
     * Insert and update records.
     * @param {Array} data
     * @access public
     */
    putRecord(data) {
        if (data.id) {
            return this.update(data, {
                where: {
                    id: data.id
                }
            });
        }
        return this.create(data);
    }

    /**
     * Delete records in the database by ID.
     * @param {String} id "1,2,3..."
     * @access public
     */
    deleteRecord(id) {
        return this.destroy({
            where: {
                id: {
                    [Sequelize.Op.in]: id.split(",").map(item => item)
                }
            }
        });
    }

    /**
     * Count records in the database.
     * @access public
     */
    countRecord() {
        return this.findAndCountAll();
    }
}
