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
     * Sample data.
     * @access public
     */
    data() {
        this.bulkCreate([{
            code: "A001",
            category: "Tecnologia",
            title: "Banco de Dados",
            author: "L.S",
            year: "2001",
            publishing_company: "Ed"
        },
        {
            code: "A002",
            category: "Tecnologia",
            title: "Redes",
            author: "A.B",
            year: "2003",
            publishing_company: "Ed"
        },
        {
            code: "A003",
            category: "Tecnologia",
            title: "Programação",
            author: "F.G",
            year: "2004",
            publishing_company: "Ed"
        },
        {
            code: "A004",
            category: "Administração",
            title: "Finanças",
            author: "T.R",
            year: "2006",
            publishing_company: "Ed"
        },
        {
            code: "A005",
            category: "Administração",
            title: "Planejamento",
            author: "F.S",
            year: "2002",
            publishing_company: "Ed"
        },
        {
            code: "A006",
            category: "Contabilidade",
            title: "Impostos",
            author: "D.R",
            year: "2010",
            publishing_company: "Ed"
        },
        {
            code: "A007",
            category: "Contabilidade",
            title: "Fluxo de Caixa",
            author: "Q.S",
            year: "2008",
            publishing_company: "Ed"
        },
        {
            code: "A008",
            category: "Contabilidade",
            title: "Fiscal",
            author: "K.L",
            year: "2015",
            publishing_company: "Ed"
        },
        {
            code: "A009",
            category: "Engenharia",
            title: "Eletrônica",
            author: "B.M",
            year: "2018",
            publishing_company: "Ed"
        },
        {
            code: "A010",
            category: "Engenharia",
            title: "Sistemas",
            author: "C.E",
            year: "2012",
            publishing_company: "Ed"
        },
        {
            code: "A011",
            category: "Engenharia",
            title: "Elétrica",
            author: "F.G",
            year: "2003",
            publishing_company: "Ed"
        },
        {
            code: "A012",
            category: "Engenharia",
            title: "Software",
            author: "R.N",
            year: "2021",
            publishing_company: "Ed"
        }]);
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
module.exports = Demo;
