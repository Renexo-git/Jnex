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
     * Creates multiple lines at once.
     * @access public
     */
    data() {
        this.book.bulkCreate([{
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
     * @param {Object} query
     * @access public
     */
    select(query) {
        if (query) {
            return this.book.findAll({ where: query });
        }
        return this.book.findAll();
    }

    /**
     * Count records in the database.
     * @access public
     */
    count() {
        return this.book.findAndCountAll();
    }

    /**
     * Create and update records.
     * @param {Object} query
     * @access public
     */
    insert(query) {
        if (query.id) {
            return this.book.update(query, {
                where: { id: query.id }
            }).then(result => {
                if (result) {
                    return true;
                } else {
                    return false;
                }
            }).catch(error => {
                this.error(error["message"]);
                return false;
            });
        }
        return this.book.create(query).then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            this.error(error["message"]);
            return false;
        });
    }

    /**
     * Delete records in the database by ID.
     * @param {Object} query
     * @access public
     */
    destroy(query) {
        return this.book.destroy({
            where: {
                id: { // Route: /demo/book/del/?id=1,2,3...
                    [Sequelize.Op.in]: query.id.split(",").map(item => item)
                }
            }
        }).then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            this.error(error["message"]);
            return false;
        });
    }
}
module.exports = Demo;
