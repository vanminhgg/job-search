const client = require("../config/elasticSearch");
const moment = require("moment");
const fs = require("fs");

exports.indexData = async (req, res) => {
  const results = JSON.parse(fs.readFileSync("jobs.json", "utf8"));

  try {
    await client.indices.delete({
      index: "job",
    });
    results.forEach(async (results) => {
      let salaryValue = results.salary;

      // let dateFormat = new Date(results.date);
      // dateFormat = moment(dateFormat).format("YYYY-MM-DD");

      if (salaryValue === "Thương lượng") {
        salaryValue = 0;
      } else {
        if (salaryValue.startsWith("Từ")) {
          salaryValue = parseInt(salaryValue.split("Từ $")[1]);
        } else {
          salaryValue = parseInt(salaryValue.replace("$", "").split(" - ")[0]);
        }
      }
      (jobObject = {
        title: results.title,
        company: results.company,
        location: results.location,
        date: new Date(results.date),
        expire: results.expire,
        salary: results.salary,
        sortSalary: salaryValue,
        benefits: results.benefits,
        url: results.url,
        level: results.level,
        category: results.category,
        skill: results.skill,
        profileLanguage: results.profileLanguage,
        description: results.description,
      }),
        await client.index({
          index: "job",
          body: jobObject,
        });
    });
    res.json("index success");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.search = async (req, res) => {
  const benefits = req.body.benefits;
  const location = req.body.location;
  const categories = req.body.categories;
  const level = req.body.level;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const minSalary = req.body.minSalary;
  const maxSalary = req.body.maxSalary;
  const page = req.body.page;
  const keyWord = req.params.keyWord;
  const sortType = req.body.sortType;
  let curPage = 1;
  if (page) {
    curPage = page;
  }

  let startDate = new Date("1999-01-01");
  let endDate = new Date(Date.now());
  if (fromDate) {
    startDate = new Date(fromDate);
  }
  if (toDate) {
    endDate = new Date(toDate);
  }
  let sort = [];

  if (sortType) {
    if (sortType === "descDate") {
      sort = {
        date: {
          order: "desc",
        },
      };
    } else if (sortType === "descSalary") {
      sort = {
        sortSalary: {
          order: "desc",
        },
      };
    } else if (sortType === "ascSalary") {
      sort = {
        sortSalary: {
          order: "asc",
        },
      };
    } else {
      sort = {
        date: {
          order: "asc",
        },
      };
    }
  }

  const objectSearch = {
    index: "job",
    body: {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: keyWord,
                fields: ["title^4", "category^3", "skill^2", "description^1"],
              },
            },
          ],
          should: [],
          filter: [
            {
              range: {
                date: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
            {
              range: {
                sortSalary: {
                  gte: minSalary,
                  lte: maxSalary,
                },
              },
            },
          ],
        },
      },
      sort,
      from: (curPage - 1) * 9,
      size: 9,
    },
  };

  if (location) {
    objectSearch.body.query.bool.filter.push({
      bool: {
        should: location.map((item) => ({
          match: {
            location: item,
          },
        })),
        minimum_should_match: 1,
      },
    });
  }
  if (benefits) {
    objectSearch.body.query.bool.filter.push({
      bool: {
        should: benefits.map((item) => ({
          match: {
            benefits: item,
          },
        })),
        minimum_should_match: 1,
      },
    });
  }
  if (categories) {
    objectSearch.body.query.bool.filter.push({
      bool: {
        should: categories.map((item) => ({
          match: {
            category: item,
          },
        })),
        minimum_should_match: 1,
      },
    });
  }
  if (level) {
    objectSearch.body.query.bool.must.push({
      match: {
        level: level,
      },
    });
  }
  const body = await client.search(objectSearch);
  res.json({
    count: body.hits.total.value,
    data: body.hits.hits,
  });
};
exports.getAllBenefits = async (req, res) => {
  try {
    const response = await client.search({
      index: "job",
      body: {
        aggs: {
          benefitAggregation: {
            terms: {
              field: "benefits.keyword",
              size: 100,
            },
          },
        },
        size: 0,
      },
    });

    const benefits = response.aggregations.benefitAggregation.buckets.map(
      (bucket) => bucket.key
    );

    res.json(benefits);
  } catch (error) {
    console.error("Error retrieving benefits:", error);
    res.json([]);
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const response = await client.search({
      index: "job",
      body: {
        aggs: {
          locationAggregation: {
            terms: {
              field: "location.keyword",
              size: 100,
            },
          },
        },
        size: 0,
      },
    });

    const locations = response.aggregations.locationAggregation.buckets.map(
      (bucket) => bucket.key
    );

    const distinctLocations = [
      ...new Set(
        locations.flatMap((location) =>
          location.split(", ").map((l) => l.trim())
        )
      ),
    ];

    res.json(distinctLocations);
  } catch (error) {
    console.error("Error retrieving locations:", error);
    res.json([]);
  }
};
exports.getAllSkill = async (req, res) => {
  try {
    const response = await client.search({
      index: "job",
      body: {
        aggs: {
          skills: {
            terms: {
              field: "skill.keyword",
              size: 100,
            },
          },
        },
        size: 0,
      },
    });

    console.log(response);
    const skill = response.aggregations.skills.buckets.map(
      (bucket) => bucket.key
    );

    res.json(skill);
  } catch (error) {
    console.error("Error retrieving benefits:", error);
    res.json([]);
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const response = await client.search({
      index: "job",
      body: {
        aggs: {
          categories: {
            terms: {
              field: "category.keyword",
              size: 100,
            },
          },
        },
        size: 0,
      },
    });

    console.log(response);
    const category = response.aggregations.categories.buckets.map(
      (bucket) => bucket.key
    );

    res.json(category);
  } catch (error) {
    console.error("Error retrieving benefits:", error);
    res.json([]);
  }
};

exports.getAllLevel = async (req, res) => {
  try {
    const response = await client.search({
      index: "job",
      body: {
        aggs: {
          levels: {
            terms: {
              field: "level.keyword",
              size: 100,
            },
          },
        },
        size: 0,
      },
    });

    console.log(response);
    const level = response.aggregations.levels.buckets.map(
      (bucket) => bucket.key
    );

    res.json(level);
  } catch (error) {
    console.error("Error retrieving benefits:", error);
    res.json([]);
  }
};
