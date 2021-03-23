class Demo extends Model {

    /**
     * Class constructor.
     * @access public
     */
    constructor() {
        super();
        this.define("demo", {
          first_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
          },
          last_name: {
            type: Sequelize.STRING
          },
          user_name: {
            type: Sequelize.STRING
          },
          city: {
            type: Sequelize.STRING
          },
          state: {
            type: Sequelize.STRING
          },
          cep: {
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
     * Count records in the database.
     * @access public
     */
    countRecord() {
        return this.findAndCountAll();
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
}
